package com.back.backend.exception;

import org.springframework.http.HttpStatus;

public class WrongUserCredentials extends RuntimeException {
    public WrongUserCredentials(String message, HttpStatus status) {
        throw new WrongUserCredentials(message, status);
    }

    public WrongUserCredentials(String message) {
        throw new WrongUserCredentials(message);
    }

    public WrongUserCredentials(HttpStatus status) {
        throw new WrongUserCredentials(status);
    }
}
