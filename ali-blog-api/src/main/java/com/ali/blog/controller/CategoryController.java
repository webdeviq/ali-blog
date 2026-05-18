package com.ali.blog.controller;


import com.ali.blog.dto.*;
import com.ali.blog.service.CategoryService;
import com.ali.blog.service.PostService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CategoryController {

    private final CategoryService categoryService;
    private final PostService postService;

    public CategoryController(CategoryService categoryService, PostService postService) {
        this.categoryService = categoryService;
        this.postService = postService;

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

    @GetMapping("/api/categories/{slug}/categories")
    public PagedResponse<PostResponse> getPostsByCategory(@PathVariable String slug, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return postService.getPublishedPostsByCategory(slug, page, size);
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
