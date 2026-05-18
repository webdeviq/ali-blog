package com.ali.blog.dto;

import java.time.Instant;

public class SubscriberResponse {

    private Long id;
    private String email;
    private Instant subscribedAt;


    public SubscriberResponse(Long id, String email, Instant subscribedAt) {
        this.id = id;
        this.email = email;
        this.subscribedAt = subscribedAt;
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
