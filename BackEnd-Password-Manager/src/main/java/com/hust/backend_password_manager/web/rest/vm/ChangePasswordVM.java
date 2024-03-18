package com.hust.backend_password_manager.web.rest.vm;

import com.hust.backend_password_manager.web.rest.validate.Password;
import lombok.Data;

@Data
public class ChangePasswordVM {
    @Password
    private String currentPassword;
    @Password
    private String newPassword;
}
