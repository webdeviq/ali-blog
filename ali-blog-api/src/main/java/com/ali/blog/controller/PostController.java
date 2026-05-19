package com.ali.blog.controller;


import com.ali.blog.dto.CreatePostRequest;
import com.ali.blog.dto.PagedResponse;
import com.ali.blog.dto.PostResponse;
import com.ali.blog.dto.UpdatePostRequest;
import com.ali.blog.service.PostService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }


    @GetMapping("/api/posts")
    public PagedResponse<PostResponse> getPosts(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return postService.getPosts(page, size);
    }


    @GetMapping("/api/posts/{slug}")
    public PostResponse getPostBySlug(@PathVariable String slug) {
        return postService.getPostBySlug(slug);
    }

    @PostMapping("/api/admin/posts")
    @ResponseStatus(HttpStatus.CREATED)
    public PostResponse createPost(@Valid @RequestBody CreatePostRequest request) {
        return postService.createPost(request);
    }

    @PutMapping("/api/admin/posts/{slug}")
    public PostResponse updatePost(@PathVariable String slug, @Valid @RequestBody UpdatePostRequest request) {
        return postService.updatePost(slug, request);
    }

    @PatchMapping("/api/admin/posts/{slug}/publish")
    public PostResponse publishPost(@PathVariable String slug) {
        return postService.publishPost(slug);
    }

    @PatchMapping("/api/admin/posts/{slug}/unpublish")
    public PostResponse unpublishPost(@PathVariable String slug) {
        return postService.unpublishPost(slug);
    }


    @DeleteMapping("/api/admin/posts/{slug}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePost(@PathVariable String slug) {
        postService.deletePost(slug);
    }


    @GetMapping("/api/admin/posts")
    public PagedResponse<PostResponse> getAdminPosts(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return postService.getAdminPosts(page, size);
    }


    @GetMapping("/api/admin/posts/{slug}")
    public PostResponse getAdminPostBySlug(@PathVariable String slug) {
        return postService.getAdminPostBySlug(slug);
    }

    @GetMapping("/api/posts/search")
    public PagedResponse<PostResponse> searchPosts(@RequestParam String query, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return postService.searchPublishedPosts(query, page, size);
    }


    @GetMapping("/api/admin/posts/search")
    public PagedResponse<PostResponse> searchAdminPosts(@RequestParam String query, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return postService.searchAdminPosts(query, page, size);
    }


    @GetMapping("/api/categories/{slug}/posts")
    public PagedResponse<PostResponse> getPostsByCategory(@PathVariable String slug, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return postService.getPublishedPostsByCategory(slug, page, size);
    }

}
