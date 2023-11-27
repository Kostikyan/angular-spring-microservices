package com.back.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EditUserRequestDto {
    private int id;
    private String name;
    private String surname;
    private String phone;
}
