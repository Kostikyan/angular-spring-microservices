package com.back.backend.service.impl;

import com.back.backend.dto.RegisterRequestDto;
import com.back.backend.entity.User;
import com.back.backend.entity.enums.Role;
import com.back.backend.mapper.UserMapper;
import com.back.backend.repository.UserRepository;
import com.back.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;


    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User save(RegisterRequestDto dto) {
        User user = userMapper.mapRegister(dto);
        user.setRole(Role.USER);
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
