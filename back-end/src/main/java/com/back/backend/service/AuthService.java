package com.back.backend.service;

import com.back.backend.dto.CredentialsDto;
import com.back.backend.dto.RegisterRequestDto;
import com.back.backend.dto.UserDto;

public interface AuthService {
    UserDto login(CredentialsDto credentials);

    UserDto register(RegisterRequestDto registerData);
}
