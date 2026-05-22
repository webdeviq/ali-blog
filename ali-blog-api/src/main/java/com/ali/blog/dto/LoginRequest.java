package com.ali.blog.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class LoginRequest {

    // LoginRequest
    @NotBlank
    @Email
    @Size(max = 320)
    private String email;

    @NotBlank
    @Size(min = 8, max = 100)
    private String password;

    public LoginRequest() {
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
