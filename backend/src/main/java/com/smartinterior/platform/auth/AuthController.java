package com.smartinterior.platform.auth;

import com.smartinterior.platform.auth.dto.AuthResponse;
import com.smartinterior.platform.auth.dto.CurrentUserResponse;
import com.smartinterior.platform.auth.dto.LoginRequest;
import com.smartinterior.platform.auth.dto.RegisterRequest;
import com.smartinterior.platform.common.ApiResponse;
import jakarta.validation.Valid;
import java.security.Principal;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<CurrentUserResponse>> register(@Valid @RequestBody RegisterRequest request) {
        CurrentUserResponse response = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success("Register successfully", response));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successfully", response));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<CurrentUserResponse>> me(Principal principal) {
        CurrentUserResponse response = authService.getCurrentUser(principal.getName());
        return ResponseEntity.ok(ApiResponse.success("Get current user successfully", response));
    }
}
