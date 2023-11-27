package com.back.backend.endpoint;

import com.back.backend.dto.EditUserRequestDto;
import com.back.backend.dto.UserDto;
import com.back.backend.mapper.UserMapper;
import com.back.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserEndpoint {
    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping("/{id}")
    public UserDto findById(@PathVariable int id) {
        return userMapper.userToDto(userService.findById((long) id));
    }

    @PostMapping("/edit")
    public UserDto edit(@RequestBody EditUserRequestDto editUserRequestDto) {
        return userService.edit(editUserRequestDto);
    }
}
