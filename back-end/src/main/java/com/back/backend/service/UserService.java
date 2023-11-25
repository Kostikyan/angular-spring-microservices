package com.back.backend.service;

import com.back.backend.dto.RegisterRequestDto;
import com.back.backend.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> findAll();

    Optional<User> findById(Long id);

    User save(RegisterRequestDto dto);

    Optional<User> findByEmail(String email);
}
