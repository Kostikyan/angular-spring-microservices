package com.back.backend.exception;

import org.springframework.http.HttpStatus;

public class UserNotFound extends RuntimeException {
    public UserNotFound(String message, HttpStatus status) {
        throw new UserNotFound(message, status);
    }

    public UserNotFound(String message) {
        throw new UserNotFound(message);
    }

    public UserNotFound(HttpStatus status) {
        throw new UserNotFound(status);
    }
}
