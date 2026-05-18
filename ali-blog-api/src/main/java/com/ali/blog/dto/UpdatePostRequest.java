package com.ali.blog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UpdatePostRequest {

    @NotBlank
    @Size(max = 180)
    private String title;

    @NotBlank
    private String content;

    @NotBlank
    @Size(max = 300)
    private String excerpt;

    @NotBlank
    private String categorySlug;


    public UpdatePostRequest() {
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getExcerpt() {
        return excerpt;
    }

    public String getCategorySlug() {
        return categorySlug;
    }

}
