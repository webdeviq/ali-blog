package com.ali.blog.controller;

import com.ali.blog.dto.MessageResponse;
import com.ali.blog.dto.SubscribeRequest;
import com.ali.blog.dto.UnsubscribeRequest;
import com.ali.blog.service.NewsletterService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/newsletter")
public class NewsletterController {

    private final NewsletterService newsletterService;

    public NewsletterController(NewsletterService newsletterService) {
        this.newsletterService = newsletterService;
    }

    @PostMapping("/subscribe")
    public MessageResponse subscribe(@Valid @RequestBody SubscribeRequest request) {

        newsletterService.subscribe(request);
        return new MessageResponse("Subscription successful.");
    }

    @PostMapping("/unsubscribe")
    public MessageResponse unsubscribe(@Valid @RequestBody UnsubscribeRequest request) {
        newsletterService.unsubscribe(request);
        return new MessageResponse("Unsubscription successful.");
    }

}
