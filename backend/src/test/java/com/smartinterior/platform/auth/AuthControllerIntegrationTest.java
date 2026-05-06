package com.smartinterior.platform.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.not;
import static org.hamcrest.Matchers.blankOrNullString;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartinterior.platform.security.CustomUserDetails;
import com.smartinterior.platform.security.JwtService;
import com.smartinterior.platform.user.User;
import com.smartinterior.platform.user.UserRepository;
import com.smartinterior.platform.user.UserRole;
import com.smartinterior.platform.user.UserStatus;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    @Test
    void register_whenValidRequest_returnsUserAndStoresBcryptPassword() throws Exception {
        Map<String, String> request = Map.of(
                "fullName", "Nguyen Van A",
                "email", "a@example.com",
                "password", "12345678",
                "phone", "0987654321"
        );

        mockMvc.perform(post("/api/auth/register")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Register successfully"))
                .andExpect(jsonPath("$.data.id").isNumber())
                .andExpect(jsonPath("$.data.fullName").value("Nguyen Van A"))
                .andExpect(jsonPath("$.data.email").value("a@example.com"))
                .andExpect(jsonPath("$.data.role").value("CUSTOMER"))
                .andExpect(jsonPath("$.data.passwordHash").doesNotExist());

        User savedUser = userRepository.findByEmail("a@example.com").orElseThrow();
        assertThat(savedUser.getPasswordHash()).isNotEqualTo("12345678");
        assertThat(passwordEncoder.matches("12345678", savedUser.getPasswordHash())).isTrue();
        assertThat(savedUser.getRole()).isEqualTo(UserRole.CUSTOMER);
        assertThat(savedUser.getStatus()).isEqualTo(UserStatus.ACTIVE);
    }

    @Test
    void register_whenEmailExists_returnsConflict() throws Exception {
        createUser("a@example.com", "12345678", UserStatus.ACTIVE);

        Map<String, String> request = Map.of(
                "fullName", "Nguyen Van A",
                "email", "a@example.com",
                "password", "12345678"
        );

        mockMvc.perform(post("/api/auth/register")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Email already exists"))
                .andExpect(jsonPath("$.data").doesNotExist());
    }

    @Test
    void register_whenPasswordTooShort_returnsValidationError() throws Exception {
        Map<String, String> request = Map.of(
                "fullName", "Nguyen Van A",
                "email", "a@example.com",
                "password", "123"
        );

        mockMvc.perform(post("/api/auth/register")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message", containsString("Password must be between 8 and 100 characters")))
                .andExpect(jsonPath("$.data").doesNotExist());
    }

    @Test
    void login_whenCredentialsAreValid_returnsAccessTokenAndUser() throws Exception {
        createUser("a@example.com", "12345678", UserStatus.ACTIVE);

        Map<String, String> request = Map.of(
                "email", "a@example.com",
                "password", "12345678"
        );

        MvcResult result = mockMvc.perform(post("/api/auth/login")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Login successfully"))
                .andExpect(jsonPath("$.data.accessToken", not(blankOrNullString())))
                .andExpect(jsonPath("$.data.tokenType").value("Bearer"))
                .andExpect(jsonPath("$.data.user.email").value("a@example.com"))
                .andExpect(jsonPath("$.data.user.role").value("CUSTOMER"))
                .andReturn();

        String accessToken = readJson(result).at("/data/accessToken").asText();
        assertThat(jwtService.extractUsername(accessToken)).isEqualTo("a@example.com");
    }

    @Test
    void login_whenPasswordIsWrong_returnsUnauthorized() throws Exception {
        createUser("a@example.com", "12345678", UserStatus.ACTIVE);

        Map<String, String> request = Map.of(
                "email", "a@example.com",
                "password", "wrong-password"
        );

        mockMvc.perform(post("/api/auth/login")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Invalid email or password"))
                .andExpect(jsonPath("$.data").doesNotExist());
    }

    @Test
    void login_whenUserIsDisabled_returnsForbidden() throws Exception {
        createUser("a@example.com", "12345678", UserStatus.DISABLED);

        Map<String, String> request = Map.of(
                "email", "a@example.com",
                "password", "12345678"
        );

        mockMvc.perform(post("/api/auth/login")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("User disabled"))
                .andExpect(jsonPath("$.data").doesNotExist());
    }

    @Test
    void me_whenTokenIsValid_returnsCurrentUser() throws Exception {
        User user = createUser("a@example.com", "12345678", UserStatus.ACTIVE);
        String accessToken = jwtService.generateToken(new CustomUserDetails(user));

        mockMvc.perform(get("/api/auth/me")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Get current user successfully"))
                .andExpect(jsonPath("$.data.id").value(user.getId()))
                .andExpect(jsonPath("$.data.fullName").value("Nguyen Van A"))
                .andExpect(jsonPath("$.data.email").value("a@example.com"))
                .andExpect(jsonPath("$.data.role").value("CUSTOMER"));
    }

    @Test
    void me_whenTokenIsMissing_returnsUnauthorized() throws Exception {
        mockMvc.perform(get("/api/auth/me"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Unauthorized"))
                .andExpect(jsonPath("$.data").doesNotExist());
    }

    private User createUser(String email, String password, UserStatus status) {
        User user = new User();
        user.setFullName("Nguyen Van A");
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(password));
        user.setPhone("0987654321");
        user.setRole(UserRole.CUSTOMER);
        user.setStatus(status);
        return userRepository.save(user);
    }

    private JsonNode readJson(MvcResult result) throws Exception {
        return objectMapper.readTree(result.getResponse().getContentAsString());
    }
}
