package com.ali.blog.entity;


import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "newsletter_subscribers")
public class NewsletterSubscriber {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 320)
    private String email;

    @Column(nullable = false, updatable = false)
    private Instant subscribedAt;

    protected NewsletterSubscriber() {
    }

    public NewsletterSubscriber(String email) {
        this.email = email;
    }

    @PrePersist
    private void onCreate() {
        this.subscribedAt = Instant.now();
    }

    public Long getId() {
        return id;
    }


    public String getEmail() {
        return email;
    }


    public Instant getSubscribedAt() {
        return subscribedAt;
    }


}
