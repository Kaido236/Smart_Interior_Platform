package com.smartinterior.platform.auth;

import com.smartinterior.platform.auth.dto.AuthResponse;
import com.smartinterior.platform.auth.dto.CurrentUserResponse;
import com.smartinterior.platform.auth.dto.LoginRequest;
import com.smartinterior.platform.auth.dto.RegisterRequest;
import com.smartinterior.platform.common.exception.EmailAlreadyExistsException;
import com.smartinterior.platform.common.exception.InvalidCredentialsException;
import com.smartinterior.platform.common.exception.UserDisabledException;
import com.smartinterior.platform.security.JwtService;
import com.smartinterior.platform.user.User;
import com.smartinterior.platform.user.UserRepository;
import com.smartinterior.platform.user.UserRole;
import com.smartinterior.platform.user.UserStatus;
import java.util.Locale;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private static final String INVALID_CREDENTIALS_MESSAGE = "Invalid email or password";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            UserDetailsService userDetailsService,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtService = jwtService;
    }

    @Transactional
    public CurrentUserResponse register(RegisterRequest request) {
        String email = normalizeEmail(request.email());
        if (userRepository.existsByEmail(email)) {
            throw new EmailAlreadyExistsException("Email already exists");
        }

        User user = new User();
        user.setFullName(request.fullName().trim());
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setPhone(normalizeNullable(request.phone()));
        user.setRole(UserRole.CUSTOMER);
        user.setStatus(UserStatus.ACTIVE);

        User savedUser = userRepository.save(user);
        return CurrentUserResponse.from(savedUser);
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        String email = normalizeEmail(request.email());
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new InvalidCredentialsException(INVALID_CREDENTIALS_MESSAGE));

        if (user.getStatus() == UserStatus.DISABLED) {
            throw new UserDisabledException("User disabled");
        }

        authenticate(email, request.password());

        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        String accessToken = jwtService.generateToken(userDetails);
        return AuthResponse.bearer(accessToken, CurrentUserResponse.from(user));
    }

    @Transactional(readOnly = true)
    public CurrentUserResponse getCurrentUser(String email) {
        User user = userRepository.findByEmail(normalizeEmail(email))
                .orElseThrow(() -> new InvalidCredentialsException("Invalid or expired token"));

        if (user.getStatus() == UserStatus.DISABLED) {
            throw new UserDisabledException("User disabled");
        }

        return CurrentUserResponse.from(user);
    }

    private void authenticate(String email, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (DisabledException exception) {
            throw new UserDisabledException("User disabled");
        } catch (AuthenticationException exception) {
            throw new InvalidCredentialsException(INVALID_CREDENTIALS_MESSAGE);
        }
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }

    private String normalizeNullable(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }
}
