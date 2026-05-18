package com.ali.blog.service;


import com.ali.blog.dto.CreatePostRequest;
import com.ali.blog.dto.PagedResponse;
import com.ali.blog.dto.PostResponse;
import com.ali.blog.dto.UpdatePostRequest;
import com.ali.blog.entity.Category;
import com.ali.blog.entity.Post;
import com.ali.blog.exception.DuplicateResourceException;
import com.ali.blog.exception.ResourceNotFoundException;
import com.ali.blog.repository.CategoryRepository;
import com.ali.blog.repository.PostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;



@Service
public class PostService {

    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;

    public PostService(PostRepository postRepository, CategoryRepository categoryRepository) {
        this.postRepository = postRepository;
        this.categoryRepository = categoryRepository;
    }

    public PagedResponse<PostResponse> getPosts(int page, int size) {
        int safePage = normalizePageNumber(page);
        int safeSize = normalizePageSize(size);
        Page<Post> postPage = postRepository.findByPublishedTrue(PageRequest.of(safePage, safeSize, Sort.by(Sort.Direction.DESC, "createdAt")));

        List<PostResponse> posts = postPage.getContent().stream().map(this::toResponse).toList();

        return new PagedResponse<>(posts, postPage.getNumber(), postPage.getSize(), postPage.getTotalElements(), postPage.getTotalPages(), postPage.isLast());
    }

    public PostResponse getPostBySlug(String slug) {
        Post post = postRepository.findBySlugAndPublishedTrue(slug).orElseThrow(() -> new ResourceNotFoundException("Post not found with slug: " + slug));
        return toResponse(post);
    }

    private PostResponse toResponse(Post post) {
        return new PostResponse(post.getId(), post.getTitle(), post.getSlug(), post.getContent(), post.getExcerpt(), post.isPublished(), post.getCreatedAt(), post.getUpdatedAt(), post.getCategory().getName(), post.getCategory().getSlug());
    }

    public PostResponse createPost(CreatePostRequest request) {
        String slug = createSlug(request.getTitle());

        if (postRepository.existsBySlug(slug)) {
            throw new DuplicateResourceException("Post slug already exists: " + slug);
        }

        Category category = categoryRepository.findBySlug(request.getCategorySlug()).orElseThrow(() -> new ResourceNotFoundException("Category not found with slug: " + request.getCategorySlug()));

        Post post = new Post(request.getTitle(), slug, request.getContent(), request.getExcerpt(), category);
        Post savedPost = postRepository.save(post);

        return toResponse(savedPost);
    }

    public PostResponse updatePost(String slug, UpdatePostRequest request) {
        Post post = postRepository.findBySlug(slug).orElseThrow(() -> new ResourceNotFoundException("Post not found with slug: " + slug));

        String updatedSlug = createSlug(request.getTitle());
        if (!post.getSlug().equals(updatedSlug) && postRepository.existsBySlug(updatedSlug)) {
            throw new DuplicateResourceException("Post slug already exists: " + updatedSlug);
        }

        Category category = categoryRepository.findBySlug(request.getCategorySlug()).orElseThrow(() -> new ResourceNotFoundException("Category not found with slug: " + request.getCategorySlug()));

        post.updateContent(request.getTitle(), updatedSlug, request.getContent(), request.getExcerpt(), category);
        Post savedPost = postRepository.save(post);

        return toResponse(savedPost);
    }

    private String createSlug(String title) {
        return title.toLowerCase().trim().replaceAll("[^a-z0-9\\s-]", "").replaceAll("\\s+", "-").replaceAll("-+", "-");
    }

    private int normalizePageNumber(int page) {
        return Math.max(page, 0);
    }

    private int normalizePageSize(int size) {
        if (size < 1) {
            return 10;
        }

        return Math.min(size, 50);
    }

    public PostResponse publishPost(String slug) {
        Post post = postRepository.findBySlug(slug).orElseThrow(() -> new ResourceNotFoundException("Post not found with slug: " + slug));
        post.publish();
        Post savedPost = postRepository.save(post);

        return toResponse(savedPost);
    }

    public PostResponse unpublishPost(String slug) {
        Post post = postRepository.findBySlug(slug).orElseThrow(() -> new ResourceNotFoundException("Post not found with slug: " + slug));

        post.unpublish();
        Post savedPost = postRepository.save(post);

        return toResponse(savedPost);
    }

    public void deletePost(String slug) {
        Post post = postRepository.findBySlug(slug).orElseThrow(() -> new ResourceNotFoundException("Post not found with slug: " + slug));
        postRepository.delete(post);
    }

    public PagedResponse<PostResponse> getAdminPosts(int page, int size) {
        int safePage = normalizePageNumber(page);
        int safeSize = normalizePageSize(size);

        Page<Post> postPage = postRepository.findAll(PageRequest.of(safePage, safeSize, Sort.by(Sort.Direction.DESC, "createdAt")));

        List<PostResponse> posts = postPage.getContent().stream().map(this::toResponse).toList();

        return new PagedResponse<>(posts, postPage.getNumber(), postPage.getSize(), postPage.getTotalElements(), postPage.getTotalPages(), postPage.isLast());
    }

    public PostResponse getAdminPostBySlug(String slug) {
        Post post = postRepository.findBySlug(slug).orElseThrow(() -> new ResourceNotFoundException("Post not found with slug: " + slug));

        return toResponse(post);
    }

    public PagedResponse<PostResponse> searchPublishedPosts(String search, int page, int size) {
        int safePage = normalizePageNumber(page);
        int safeSize = normalizePageSize(size);

        Page<Post> postPage = postRepository.findByPublishedTrueAndTitleContainingIgnoreCaseOrPublishedTrueAndContentContainingIgnoreCase(search, search, PageRequest.of(safePage, safeSize, Sort.by(Sort.Direction.DESC, "createdAt")));
        List<PostResponse> posts = postPage.getContent().stream().map(this::toResponse).toList();

        return new PagedResponse<>(posts, postPage.getNumber(), postPage.getSize(), postPage.getTotalElements(), postPage.getTotalPages(), postPage.isLast());
    }

    public PagedResponse<PostResponse> searchAdminPosts(String search, int page, int size) {
        int safePage = normalizePageNumber(page);
        int safeSize = normalizePageSize(size);

        Page<Post> postPage = postRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(search, search, PageRequest.of(safePage, safeSize, Sort.by(Sort.Direction.DESC, "createdAt")));

        List<PostResponse> posts = postPage.getContent().stream().map(this::toResponse).toList();

        return new PagedResponse<>(posts, postPage.getNumber(), postPage.getSize(), postPage.getTotalElements(), postPage.getTotalPages(), postPage.isLast());
    }

    public PagedResponse<PostResponse> getPublishedPostsByCategory(String categorySlug, int page, int size) {
        int safePage = normalizePageNumber(page);
        int safeSize = normalizePageSize(size);

        Page<Post> postPage = postRepository.findByCategorySlugAndPublishedTrue(categorySlug, PageRequest.of(safePage, safeSize, Sort.by(Sort.Direction.DESC, "createdAt")));

        List<PostResponse> posts = postPage.getContent().stream().map(this::toResponse).toList();

        return new PagedResponse<>(posts, postPage.getNumber(), postPage.getSize(), postPage.getTotalElements(), postPage.getTotalPages(), postPage.isLast());
    }

}