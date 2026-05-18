package com.ali.blog.service;

import com.ali.blog.dto.LoginRequest;
import com.ali.blog.dto.LoginResponse;
import com.ali.blog.entity.AdminUser;
import com.ali.blog.exception.ResourceNotFoundException;
import com.ali.blog.repository.AdminUserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(AdminUserRepository adminUserRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {
        AdminUser adminUser = adminUserRepository.findByEmail(request.getEmail()).orElseThrow(() -> new ResourceNotFoundException("Invalid email or password."));

        boolean passwordMatches = passwordEncoder.matches(request.getPassword(), adminUser.getPasswordHash());

        if (!passwordMatches) {
            throw new ResourceNotFoundException("Invalid email or password.");
        }
        String token = jwtService.generateToken(adminUser.getEmail());

        return new LoginResponse(token);
    }

}
