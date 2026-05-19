package com.ali.blog.repository;

import com.ali.blog.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    Optional<Post> findBySlug(String slug);

    boolean existsBySlug(String slug);

    Page<Post> findByPublishedTrue(Pageable pageable);

    Optional<Post> findBySlugAndPublishedTrue(String slug);

    Page<Post> findByCategorySlugAndPublishedTrue(String categorySlug, Pageable pageable);

    Page<Post> findByPublishedTrueAndTitleContainingIgnoreCaseOrPublishedTrueAndContentContainingIgnoreCase(String title, String content,  Pageable pageable);

    Page<Post> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(String title, String content, Pageable pageable);



}
