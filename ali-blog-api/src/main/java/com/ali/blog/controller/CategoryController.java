package com.ali.blog.controller;

import com.ali.blog.dto.CategoryResponse;
import com.ali.blog.dto.CreateCategoryRequest;
import com.ali.blog.dto.UpdateCategoryRequest;
import com.ali.blog.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/api/categories")
    public List<CategoryResponse> getCategories() {
        return categoryService.getCategories();
    }

    @PostMapping("/api/admin/categories")
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse createCategory(@Valid @RequestBody CreateCategoryRequest request) {
        return categoryService.createCategory(request);
    }

    @PutMapping("/api/admin/categories/{slug}")
    public CategoryResponse updateCategory(@PathVariable String slug, @Valid @RequestBody UpdateCategoryRequest request) {
        return categoryService.updateCategory(slug, request);
    }

    @DeleteMapping("/api/admin/categories/{slug}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCategory(@PathVariable String slug) {
        categoryService.deleteCategory(slug);
    }
}