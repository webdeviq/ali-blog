package com.ali.blog.controller;

import com.ali.blog.dto.AdminProfileResponse;
import com.ali.blog.dto.SubscriberResponse;
import com.ali.blog.service.NewsletterService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final NewsletterService newsletterService;

    public AdminController(NewsletterService newsletterService) {
        this.newsletterService = newsletterService;
    }

    @GetMapping("/me")
    public AdminProfileResponse getCurrentAdmin(Authentication authentication) {
        return new AdminProfileResponse(authentication.getName());
    }

    @GetMapping("/newsletter/subscribers")
    public List<SubscriberResponse> getSubscribers() {
        return newsletterService.getSubscribers();
    }
}