package com.ali.blog.entity;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 180)
    private String title;

    @Column(nullable = false, unique = true, length = 220)
    private String slug;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false, length = 300)
    private String excerpt;

    @Column(nullable = false)
    private boolean published = false;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private Instant updatedAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;


    protected Post() {
    }

    public Post(String title, String slug, String content, String excerpt, Category category) {
        this.title = title;
        this.slug = slug;
        this.content = content;
        this.excerpt = excerpt;
        this.category = category;
    }

    @PrePersist
    private void onCreate() {
        Instant now = Instant.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    private void onUpdate() {
        this.updatedAt = Instant.now();
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

    public Category getCategory() {
        return category;
    }

    public void updateContent(String title, String slug, String content, String excerpt, Category category) {
        this.title = title;
        this.slug = slug;
        this.content = content;
        this.excerpt = excerpt;
        this.category = category;

    }

    public void publish() {
        this.published = true;
    }


    public void unpublish() {
        this.published = false;
    }


}