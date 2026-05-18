package com.ali.blog.repository;

import com.ali.blog.entity.NewsletterSubscriber;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NewsletterSubscriberRepository extends JpaRepository<NewsletterSubscriber, Long> {

    boolean existsByEmail(String email);

    Optional<NewsletterSubscriber> findByEmail(String email);


}
