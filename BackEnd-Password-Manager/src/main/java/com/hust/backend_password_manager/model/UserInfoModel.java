package com.hust.backend_password_manager.model;

import lombok.Data;

@Data
public class UserInfoModel {
    String email;
    String salt;
    Boolean setupMasterKey;
    Boolean isAdmin;
}
