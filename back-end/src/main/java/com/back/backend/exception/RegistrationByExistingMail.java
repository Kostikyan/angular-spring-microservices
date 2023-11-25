package com.back.backend.exception;

import org.springframework.http.HttpStatus;

public class RegistrationByExistingMail extends RuntimeException {
    public RegistrationByExistingMail(String message, HttpStatus status) {
        throw new RegistrationByExistingMail(message, status);
    }

    public RegistrationByExistingMail(String message) {
        throw new RegistrationByExistingMail(message);
    }

    public RegistrationByExistingMail(HttpStatus status) {
        throw new RegistrationByExistingMail(status);
    }
}