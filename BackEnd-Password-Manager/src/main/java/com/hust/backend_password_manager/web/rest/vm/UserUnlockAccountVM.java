package com.hust.backend_password_manager.web.rest.vm;

import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class UserUnlockAccountVM {
    @Email
    String email;
}
