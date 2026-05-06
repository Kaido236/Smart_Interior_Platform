package com.smartinterior.platform.auth.dto;

public record AuthResponse(String accessToken, String tokenType, CurrentUserResponse user) {

    public static AuthResponse bearer(String accessToken, CurrentUserResponse user) {
        return new AuthResponse(accessToken, "Bearer", user);
    }
}
