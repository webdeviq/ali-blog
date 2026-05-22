package com.ali.blog.service;

public interface EmailService {

    void sendEmail(String to, String subject, String body);
}