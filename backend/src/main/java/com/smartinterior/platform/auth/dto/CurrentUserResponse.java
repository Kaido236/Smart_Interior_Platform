package com.smartinterior.platform.auth.dto;

import com.smartinterior.platform.user.User;
import com.smartinterior.platform.user.UserRole;

public record CurrentUserResponse(Long id, String fullName, String email, UserRole role) {

    public static CurrentUserResponse from(User user) {
        return new CurrentUserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole()
        );
    }
}
