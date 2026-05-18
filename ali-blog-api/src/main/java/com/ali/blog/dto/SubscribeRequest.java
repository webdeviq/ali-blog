package com.ali.blog.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SubscribeRequest {

    @NotBlank
    @Email
    @Size(max = 320)
    private String email;

    public SubscribeRequest() {
    }

    public String getEmail() {
        return email;
    }


}
