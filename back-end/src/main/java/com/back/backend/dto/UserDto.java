package com.back.backend.dto;

import com.back.backend.entity.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UserDto {
    private Long id;
    private Role role;
    private String name;
    private String surname;
    private String phone;
    private String email;
    private String token;
}
