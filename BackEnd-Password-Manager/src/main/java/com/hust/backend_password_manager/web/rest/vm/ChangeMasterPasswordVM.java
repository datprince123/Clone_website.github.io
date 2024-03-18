package com.hust.backend_password_manager.web.rest.vm;

import com.hust.backend_password_manager.web.rest.validate.Password;
import lombok.Data;

@Data
public class ChangeMasterPasswordVM {
    @Password
    private String currentMasterPassword;
    @Password
    private String newMasterPassword;
}
