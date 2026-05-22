package com.ali.blog.config;

import com.ali.blog.entity.AdminUser;
import com.ali.blog.entity.Category;
import com.ali.blog.entity.Post;
import com.ali.blog.repository.AdminUserRepository;
import com.ali.blog.repository.CategoryRepository;
import com.ali.blog.repository.PostRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class ProductionDataSeeder implements CommandLineRunner {

    private final AdminUserRepository adminUserRepository;
    private final CategoryRepository categoryRepository;
    private final PostRepository postRepository;
    private final PasswordEncoder passwordEncoder;
    private final String adminEmail;
    private final String adminPassword;

    public ProductionDataSeeder(
            AdminUserRepository adminUserRepository,
            CategoryRepository categoryRepository,
            PostRepository postRepository,
            PasswordEncoder passwordEncoder,
            @Value("${admin.email}") String adminEmail,
            @Value("${admin.password}") String adminPassword
    ) {
        this.adminUserRepository = adminUserRepository;
        this.categoryRepository = categoryRepository;
        this.postRepository = postRepository;
        this.passwordEncoder = passwordEncoder;
        this.adminEmail = adminEmail;
        this.adminPassword = adminPassword;
    }

    @Override
    public void run(String... args) {
        seedAdmin();
        seedCategories();
    }

    private void seedAdmin() {
        if (adminUserRepository.findByEmail(adminEmail).isPresent()) {
            return;
        }

        AdminUser adminUser = new AdminUser(
                adminEmail,
                passwordEncoder.encode(adminPassword)
        );

        adminUserRepository.save(adminUser);
    }

    private void seedCategories() {
        createCategoryIfMissing("Java", "java");
        createCategoryIfMissing("React", "react");
        createCategoryIfMissing("CSharp", "csharp");
        createCategoryIfMissing("Typescript", "typescript");
        createCategoryIfMissing("Navis", "navis");
        createCategoryIfMissing("Spring Boot", "spring-boot");
        createCategoryIfMissing("Backend", "backend");
        createCategoryIfMissing("Frontend", "frontend");
        createCategoryIfMissing("Architecture", "architecture");
        createCategoryIfMissing("SQL", "sql");
        createCategoryIfMissing("Dev Journal", "dev-journal");
    }

    private void createCategoryIfMissing(String name, String slug) {
        if (categoryRepository.existsBySlug(slug)) {
            return;
        }

        categoryRepository.save(new Category(name, slug));
    }
}