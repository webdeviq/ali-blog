package com.ali.blog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateCategoryRequest {

    @NotBlank
    @Size(max = 80)
    private String name;

    public CreateCategoryRequest() {
    }

    public String getName() {
        return name;
    }
}
