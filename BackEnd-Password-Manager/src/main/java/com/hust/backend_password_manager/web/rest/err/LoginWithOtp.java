package com.hust.backend_password_manager.web.rest.err;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class LoginWithOtp extends RuntimeException{
    final String token;
}
