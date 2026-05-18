package com.ali.blog.controller;

import com.ali.blog.dto.SubscriberResponse;
import com.ali.blog.service.NewsletterService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/newsletter")
public class AdminNewsletterController {

    private final NewsletterService newsletterService;

    public AdminNewsletterController(NewsletterService newsletterService) {
        this.newsletterService = newsletterService;
    }

    @GetMapping("/subscribers")
    public List<SubscriberResponse> getSubscribers() {
        return newsletterService.getSubscribers();
    }



}
