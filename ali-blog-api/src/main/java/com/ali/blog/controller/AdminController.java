package com.ali.blog.controller;


import com.ali.blog.dto.AdminProfileResponse;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping("/me")
    public AdminProfileResponse getCurrentAdmin(Authentication authentication) {
        return new AdminProfileResponse(authentication.getName());
    }

}
