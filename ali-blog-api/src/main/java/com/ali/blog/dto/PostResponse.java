package com.ali.blog.dto;

import java.time.Instant;

public class PostResponse {

    private Long id;
    private String title;
    private String slug;
    private String content;
    private String excerpt;
    private boolean published;
    private Instant createdAt;
    private Instant updatedAt;
    private String categoryName;
    private String categorySlug;


    public PostResponse(Long id, String title, String slug, String content, String excerpt, boolean published, Instant createdAt, Instant updatedAt, String categoryName, String categorySlug) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.content = content;
        this.excerpt = excerpt;
        this.published = published;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.categoryName = categoryName;
        this.categorySlug = categorySlug;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getSlug() {
        return slug;
    }

    public String getContent() {
        return content;
    }

    public String getExcerpt() {
        return excerpt;
    }

    public boolean isPublished() {
        return published;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public String getCategorySlug() {
        return categorySlug;
    }
}