package com.back.backend.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.back.backend.dto.UserDto;
import com.back.backend.entity.User;
import com.back.backend.entity.enums.Role;
import com.back.backend.mapper.UserMapper;
import com.back.backend.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class UserAuthProvider {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Value("${jwt.secret}")
    private String secretKey;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(UserDto userDto) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 3_600_000);

        return JWT.create()
                .withIssuer(userDto.getEmail())
                .withIssuedAt(new Date())
                .withExpiresAt(validity)
                .withClaim("name", userDto.getName())
                .withClaim("role", userDto.getRole().ordinal())
                .withClaim("surname", userDto.getSurname())
                .sign(Algorithm.HMAC256(secretKey));
    }

    public Authentication validateToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        JWTVerifier verifier = JWT.require(algorithm).build();

        DecodedJWT decoded = verifier.verify(token);

        UserDto employee = UserDto.builder()
                .email(decoded.getIssuer())
                .name(decoded.getClaim("firstname").asString())
                .surname(decoded.getClaim("lastname").asString())
                .role(decoded.getClaim("role").as(Role.class))
                .build();

        return new UsernamePasswordAuthenticationToken(employee, null, AuthorityUtils.createAuthorityList(employee.getRole().name()));
    }

    public Authentication validateTokenStrong(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        JWTVerifier verifier = JWT.require(algorithm).build();

        DecodedJWT decoded = verifier.verify(token);

        Optional<User> byUsername = userRepository.findByEmail(decoded.getIssuer());
        if (byUsername.isEmpty()) throw new RuntimeException("Unknown user");

        return new UsernamePasswordAuthenticationToken(
                userMapper.userToDto(byUsername.get()),
                null,
                AuthorityUtils.createAuthorityList(byUsername.get().getRole().name()));
    }
}