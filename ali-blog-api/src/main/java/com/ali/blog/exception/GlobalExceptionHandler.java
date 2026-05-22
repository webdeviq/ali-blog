package com.ali.blog.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception exception) {
        Map<String, Object> body = Map.of(
                "timestamp", Instant.now(),
                "status", HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "error", "Internal Server Error",
                "message", "An unexpected error occurred"
        );

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleResourceNotFound(ResourceNotFoundException exception) {
        Map<String, Object> body = Map.of("timestamp", Instant.now(), "status", HttpStatus.NOT_FOUND.value(), "error", "Not Found", "message", exception.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<Map<String, Object>> handleDuplicateReResource(DuplicateResourceException exception) {
        Map<String, Object> body = Map.of("timestamp", Instant.now(), "status", HttpStatus.CONFLICT.value(), "error", "Conflict", "message", exception.getMessage());

        return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationErrors(MethodArgumentNotValidException exception) {
        Map<String, Object> validationErrors = new HashMap<>();

        exception.getBindingResult().getFieldErrors().forEach(error -> validationErrors.put(error.getField(), error.getDefaultMessage()));

        Map<String, Object> body = Map.of("timestamp", Instant.now(), "status", HttpStatus.BAD_REQUEST.value(), "error", "Bad Request", "message", "Validation failed", "validationErrors", validationErrors);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }


}
