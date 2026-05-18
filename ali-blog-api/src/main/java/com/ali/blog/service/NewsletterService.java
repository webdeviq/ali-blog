package com.ali.blog.service;

import com.ali.blog.dto.SubscribeRequest;
import com.ali.blog.dto.SubscriberResponse;
import com.ali.blog.dto.UnsubscribeRequest;
import com.ali.blog.entity.NewsletterSubscriber;
import com.ali.blog.exception.DuplicateResourceException;
import com.ali.blog.exception.ResourceNotFoundException;
import com.ali.blog.repository.NewsletterSubscriberRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsletterService {

    private final NewsletterSubscriberRepository subscriberRepository;

    public NewsletterService(NewsletterSubscriberRepository subscriberRepository) {
        this.subscriberRepository = subscriberRepository;
    }

    public void subscribe(SubscribeRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        if (subscriberRepository.existsByEmail(email)) {
            throw new DuplicateResourceException("Email is already subscribed.");
        }

        NewsletterSubscriber subscriber = new NewsletterSubscriber(email);
        subscriberRepository.save(subscriber);
    }

    public List<SubscriberResponse> getSubscribers() {
        return subscriberRepository.findAll().stream().map(this::toResponse).toList();
    }

    private SubscriberResponse toResponse(NewsletterSubscriber subscriber) {
        return new SubscriberResponse(subscriber.getId(), subscriber.getEmail(), subscriber.getSubscribedAt());
    }

    public void unsubscribe(UnsubscribeRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        NewsletterSubscriber subscriber = subscriberRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("Email is not subscribed."));

        subscriberRepository.delete(subscriber);
    }

}
