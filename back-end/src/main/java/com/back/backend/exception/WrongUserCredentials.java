package com.back.backend.exception;

import org.springframework.http.HttpStatus;

import java.util.Objects;

public class WrongUserCredentials extends RuntimeException {
    private String message;
    private HttpStatus status;

    public WrongUserCredentials(String message, HttpStatus status) {
        this.message = message;
        this.status = status;
    }

    public WrongUserCredentials(String message) {
        this.message = message;
    }

    public WrongUserCredentials(HttpStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "WrongUserCredentials{" +
                "message='" + message + '\'' +
                ", status=" + status +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WrongUserCredentials that = (WrongUserCredentials) o;
        return Objects.equals(message, that.message) && status == that.status;
    }

    @Override
    public int hashCode() {
        return Objects.hash(message, status);
    }
}
