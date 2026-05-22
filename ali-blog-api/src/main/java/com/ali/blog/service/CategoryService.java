package com.ali.blog.service;

import com.ali.blog.dto.CategoryResponse;
import com.ali.blog.dto.CreateCategoryRequest;
import com.ali.blog.dto.UpdateCategoryRequest;
import com.ali.blog.entity.Category;
import com.ali.blog.exception.DuplicateResourceException;
import com.ali.blog.exception.ResourceNotFoundException;
import com.ali.blog.repository.CategoryRepository;
import com.ali.blog.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final PostRepository postRepository;

    public CategoryService(CategoryRepository categoryRepository, PostRepository postRepository) {
        this.categoryRepository = categoryRepository;
        this.postRepository = postRepository;
    }

    public List<CategoryResponse> getCategories() {
        return categoryRepository.findAll().stream().map(this::toResponse).toList();
    }

    public CategoryResponse createCategory(CreateCategoryRequest request) {
        String slug = createSlug(request.getName());

        if (categoryRepository.existsBySlug(slug)) {
            throw new DuplicateResourceException("Category slug already exists: " + slug);
        }

        Category category = new Category(request.getName(), slug);
        Category savedCategory = categoryRepository.save(category);

        return toResponse(savedCategory);
    }

    public CategoryResponse updateCategory(String slug, UpdateCategoryRequest request) {
        Category category = categoryRepository.findBySlug(slug).orElseThrow(() -> new ResourceNotFoundException("Category not found with slug: " + slug));

        String updatedSlug = createSlug(request.getName());

        if (!category.getSlug().equals(updatedSlug) && categoryRepository.existsBySlug(updatedSlug)) {
            throw new DuplicateResourceException("Category slug already exists: " + updatedSlug);
        }

        category.update(request.getName(), updatedSlug);

        Category savedCategory = categoryRepository.save(category);

        return toResponse(savedCategory);
    }

    public void deleteCategory(String slug) {
        Category category = categoryRepository.findBySlug(slug).orElseThrow(() -> new ResourceNotFoundException("Category not found with slug: " + slug));

        if (postRepository.existsByCategorySlug(slug)) {
            throw new DuplicateResourceException("Category cannot be deleted because it is assigned to one or more posts.");
        }

        categoryRepository.delete(category);
    }

    private String createSlug(String value) {
        return value.toLowerCase().trim().replaceAll("[^a-z0-9\\s-]", "").replaceAll("\\s+", "-").replaceAll("-+", "-");
    }

    private CategoryResponse toResponse(Category category) {
        return new CategoryResponse(category.getId(), category.getName(), category.getSlug());
    }
}