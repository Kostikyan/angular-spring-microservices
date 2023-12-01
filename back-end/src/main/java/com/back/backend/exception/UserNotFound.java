package com.back.backend.exception;

import org.springframework.http.HttpStatus;

import java.util.Objects;

public class UserNotFound extends RuntimeException {

    private String message;
    private HttpStatus status;


    public UserNotFound(String message, HttpStatus status) {
        this.message = message;
        this.status = status;
    }

    public UserNotFound(String message) {
        this.message = message;
    }

    public UserNotFound(HttpStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "UserNotFound{" +
                "message='" + message + '\'' +
                ", status=" + status +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserNotFound that = (UserNotFound) o;
        return Objects.equals(message, that.message) && status == that.status;
    }

    @Override
    public int hashCode() {
        return Objects.hash(message, status);
    }
}
