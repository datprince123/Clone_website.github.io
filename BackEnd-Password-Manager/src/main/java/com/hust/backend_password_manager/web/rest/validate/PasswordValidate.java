package com.hust.backend_password_manager.web.rest.validate;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class PasswordValidate implements ConstraintValidator<Password,String> {

    @Override
    public void initialize(Password password) {
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext constraintValidatorContext) {
        String pattern = "^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}\\[\\]:;<>,.?~\\\\-])(.{12,})$";
        return Pattern.matches(pattern, password);
    }


}
