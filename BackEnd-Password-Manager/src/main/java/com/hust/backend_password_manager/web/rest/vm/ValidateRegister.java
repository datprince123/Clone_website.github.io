package com.hust.backend_password_manager.web.rest.vm;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ValidateRegister {
    String token;
    Integer otp;
}
