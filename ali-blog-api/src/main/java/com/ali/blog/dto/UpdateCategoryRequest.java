package com.ali.blog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UpdateCategoryRequest {

    @NotBlank
    @Size(max = 80)
    private String name;

    public UpdateCategoryRequest() {
    }

    public String getName() {
        return name;
    }
}