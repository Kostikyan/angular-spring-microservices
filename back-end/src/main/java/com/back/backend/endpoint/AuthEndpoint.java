package com.back.backend.endpoint;

import com.back.backend.dto.CredentialsDto;
import com.back.backend.dto.RegisterRequestDto;
import com.back.backend.dto.UserDto;
import com.back.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthEndpoint {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody CredentialsDto credentials) {
        UserDto login = authService.login(credentials);
        if(login != null) {
            return ResponseEntity.ok(login);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody RegisterRequestDto registerDto) {
        return ResponseEntity.ok(authService.register(registerDto));
    }
}
