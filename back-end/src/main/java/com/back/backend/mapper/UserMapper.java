package com.back.backend.mapper;

import com.back.backend.dto.RegisterRequestDto;
import com.back.backend.dto.UserDto;
import com.back.backend.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User dtoToUser(UserDto userDto);

    UserDto userToDto(User user);

    User mapRegister(RegisterRequestDto registerRequestDto);
}
