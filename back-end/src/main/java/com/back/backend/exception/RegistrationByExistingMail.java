package com.back.backend.exception;

import org.springframework.http.HttpStatus;

import java.util.Objects;

public class RegistrationByExistingMail extends RuntimeException {

    private String message;
    private HttpStatus status;

    public RegistrationByExistingMail(String message, HttpStatus status) {
        this.message = message;
        this.status = status;
    }

    public RegistrationByExistingMail(String message) {
        this.message = message;
    }

    public RegistrationByExistingMail(HttpStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "RegistrationByExistingMail{" +
                "message='" + message + '\'' +
                ", status=" + status +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RegistrationByExistingMail that = (RegistrationByExistingMail) o;
        return Objects.equals(message, that.message) && status == that.status;
    }

    @Override
    public int hashCode() {
        return Objects.hash(message, status);
    }
}