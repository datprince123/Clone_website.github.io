package com.hust.backend_password_manager.web.rest.validate;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = PasswordValidate.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface Password{

    String message() default "Mật khẩu không đúng định dạng";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
