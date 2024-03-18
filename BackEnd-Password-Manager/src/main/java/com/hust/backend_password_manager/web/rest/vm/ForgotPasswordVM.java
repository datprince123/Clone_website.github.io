package com.hust.backend_password_manager.web.rest.vm;

import com.hust.backend_password_manager.web.rest.validate.Password;
import jakarta.validation.constraints.Email;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ForgotPasswordVM {
    @Email
    String email;
    @Password
    String newPassword;
}
