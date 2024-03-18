package com.hust.backend_password_manager.web.rest.vm;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubAccountVM {

    private Long id;

    @NotBlank(message = "url không được trống")
    @NotNull(message = "url không được trống")
    @Size(max = 1024 , message = "url quá dài ")
    private String url;

    private String desc;
    @NotBlank(message = "Tài khoản không được trống")
    @NotNull(message = "Tài khoản không được trống")
    private String subUserName;
    @NotBlank
    @NotNull(message = "Mật khẩu không được trống")
    private String subUserPwdEncrypt;

}
