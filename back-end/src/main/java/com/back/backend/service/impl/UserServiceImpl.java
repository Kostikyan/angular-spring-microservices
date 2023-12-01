package com.back.backend.service.impl;

import com.back.backend.dto.EditUserRequestDto;
import com.back.backend.dto.RegisterRequestDto;
import com.back.backend.dto.UserDto;
import com.back.backend.entity.User;
import com.back.backend.entity.enums.Role;
import com.back.backend.exception.UserNotFound;
import com.back.backend.mapper.UserMapper;
import com.back.backend.repository.UserRepository;
import com.back.backend.service.UserService;
import com.back.backend.util.ImageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Value("${user.profile.profile-picture.path}")
    private String path;


    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findById(Long id) {
        Optional<User> byId = userRepository.findById(id);
        if (byId.isEmpty()) {
            throw new UserNotFound("Wrong user id: " + id, HttpStatus.NOT_FOUND);
        }
        return byId.get();
    }

    @Override
    public User save(RegisterRequestDto dto) {
        User user = userMapper.mapRegister(dto);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(Role.USER);

        return userRepository.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public UserDto edit(EditUserRequestDto dto) {
        Optional<User> byId = userRepository.findById((long) dto.getId());
        if (byId.isEmpty()) {
            throw new UserNotFound(HttpStatus.NOT_FOUND);
        }

        User user = byId.get();
        user.setName(dto.getName());
        user.setSurname(dto.getSurname());
        user.setPhone(dto.getPhone());

        return userMapper.userToDto(userRepository.save(user));
    }

    @Override
    public UserDto changeProfilePicture(MultipartFile file, int id) {
        Optional<User> byId = userRepository.findById((long) id);
        if (byId.isEmpty()) {
            throw new UserNotFound(HttpStatus.NOT_FOUND);
        }

        String imageName = ImageUtil.uploadImage(file, path);

        User user = byId.get();
        user.setProfilePicture(imageName);

        User saved = userRepository.save(user);

        return userMapper.userToDto(saved);
    }


}
