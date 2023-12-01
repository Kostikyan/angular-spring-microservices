package com.back.backend.service;

import com.back.backend.dto.EditUserRequestDto;
import com.back.backend.dto.RegisterRequestDto;
import com.back.backend.dto.UserDto;
import com.back.backend.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> findAll();

    User findById(Long id);

    User save(RegisterRequestDto dto);

    Optional<User> findByEmail(String email);

    UserDto edit(EditUserRequestDto dto);

    UserDto changeProfilePicture(MultipartFile file, int id);
}
