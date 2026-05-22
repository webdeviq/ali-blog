package com.ali.blog.service;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ResendEmailService implements EmailService {

    private final Resend resend;
    private final String fromEmail;

    public ResendEmailService(
            @Value("${resend.api-key}") String apiKey,
            @Value("${app.mail.from}") String fromEmail
    ) {
        this.resend = new Resend(apiKey);
        this.fromEmail = fromEmail;
    }

    @Override
    public void sendEmail(String to, String subject, String body) {
        CreateEmailOptions params = CreateEmailOptions.builder()
                .from(fromEmail)
                .to(to)
                .subject(subject)
                .text(body)
                .build();

        try {
            resend.emails().send(params);
        } catch (ResendException exception) {
            throw new RuntimeException("Failed to send email with Resend", exception);
        }
    }
}