package com.ali.blog.service;

import com.ali.blog.dto.SubscribeRequest;
import com.ali.blog.dto.SubscriberResponse;
import com.ali.blog.dto.UnsubscribeRequest;
import com.ali.blog.entity.NewsletterSubscriber;
import com.ali.blog.exception.ResourceNotFoundException;
import com.ali.blog.repository.NewsletterSubscriberRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsletterService {

    private final NewsletterSubscriberRepository subscriberRepository;
    private final EmailService emailService;
    private final String frontendUrl;

    public NewsletterService(NewsletterSubscriberRepository subscriberRepository, EmailService emailService, @Value("${app.frontend.url}") String frontendUrl) {
        this.subscriberRepository = subscriberRepository;
        this.emailService = emailService;
        this.frontendUrl = frontendUrl;
    }

    public void subscribe(SubscribeRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        if (subscriberRepository.existsByEmail(email)) {
            return;
        }

        NewsletterSubscriber subscriber = new NewsletterSubscriber(email);
        NewsletterSubscriber savedSubscriber = subscriberRepository.save(subscriber);

        String unsubscribeUrl = frontendUrl + "/unsubscribe?token=" + savedSubscriber.getUnsubscribeToken();

        try {
            emailService.sendEmail(email, "Welcome to Ali's Dev Journal", "Hi there,\n\n" + "Thank you for subscribing to Ali's Dev Journal.\n\n" + "This is where I share my journey as a developer, including notes, lessons learned, project updates, backend/frontend development, Java, Spring Boot, React, TypeScript, and real-world coding experiences.\n\n" + "You will receive occasional email updates related to new content and developer notes.\n\n" + "Thanks again for joining. I am happy to have you here.\n\n" + "Best regards,\n" + "Ali\n\n" + "If you ever want to unsubscribe, you can use this link:\n" + unsubscribeUrl);
        } catch (Exception exception) {
            System.out.println(exception.getMessage());
        }
    }

    public List<SubscriberResponse> getSubscribers() {
        return subscriberRepository.findAll().stream().map(this::toResponse).toList();
    }

    public void unsubscribe(UnsubscribeRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        NewsletterSubscriber subscriber = subscriberRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("Email is not subscribed."));

        subscriberRepository.delete(subscriber);
    }

    public void unsubscribeByToken(String token) {
        NewsletterSubscriber subscriber = subscriberRepository.findByUnsubscribeToken(token).orElseThrow(() -> new ResourceNotFoundException("Invalid unsubscribe token."));
        subscriberRepository.delete(subscriber);
    }

    public void notifySubscribersAboutNewPost(String title, String excerpt, String postUrl) {
        List<NewsletterSubscriber> subscribers = subscriberRepository.findAll();
        for (NewsletterSubscriber subscriber : subscribers) {
            String unsubscribeUrl = frontendUrl + "/unsubscribe?token=" + subscriber.getUnsubscribeToken();

            try {
                emailService.sendEmail(subscriber.getEmail(), "New post on FullStackIQ: " + title, "Hi there,\n\n" + "I just published a new post on FullStackIQ.\n\n" + title + "\n\n" + excerpt + "\n\n" + "Read it here:\n" + postUrl + "\n\n" + "Best regards,\n" + "Ali\n\n" + "If you ever want to unsubscribe, you can use this link:\n" + unsubscribeUrl);
            } catch (Exception exception) {
                System.out.println(exception.getMessage());
            }
        }
    }

    private SubscriberResponse toResponse(NewsletterSubscriber subscriber) {
        return new SubscriberResponse(subscriber.getId(), subscriber.getEmail(), subscriber.getSubscribedAt());
    }
}