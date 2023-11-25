package com.back.backend.service.impl;

import com.back.backend.config.UserAuthProvider;
import com.back.backend.dto.CredentialsDto;
import com.back.backend.dto.RegisterRequestDto;
import com.back.backend.dto.UserDto;
import com.back.backend.entity.User;
import com.back.backend.exception.RegistrationByExistingMail;
import com.back.backend.exception.WrongUserCredentials;
import com.back.backend.mapper.UserMapper;
import com.back.backend.service.AuthService;
import com.back.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final UserAuthProvider userAuthProvider;

    @Override
    public UserDto login(CredentialsDto credentials) {
        String credentialsEmail = credentials.getEmail();

        Optional<User> byEmail = userService.findByEmail(credentialsEmail);
        if (byEmail.isEmpty()) {
            throw new WrongUserCredentials("Wrong email", HttpStatus.BAD_REQUEST);
        }

        User user = byEmail.get();
        if (passwordEncoder.matches(user.getPassword(), credentials.getPassword())) {
            throw new WrongUserCredentials("Wrong password", HttpStatus.BAD_REQUEST);
        }

        // map to dto and set token
        UserDto userDto = userMapper.userToDto(user);
        userDto.setToken(userAuthProvider.createToken(userDto));

        return userDto;
    }

    @Override
    public UserDto register(RegisterRequestDto registerData) {
        String email = registerData.getEmail();

        Optional<User> byEmail = userService.findByEmail(email);
        if (byEmail.isPresent()) {
            throw new RegistrationByExistingMail("Email already in use", HttpStatus.CONFLICT);
        }

        User save = userService.save(registerData);

        // map to dto and set token
        UserDto userDto = userMapper.userToDto(save);
        save.setToken(userAuthProvider.createToken(userDto));

        return userDto;
    }
}
