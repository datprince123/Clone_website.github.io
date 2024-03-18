package com.hust.backend_password_manager.web.rest.vm;

import com.hust.backend_password_manager.web.rest.validate.Password;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;




@Getter
@Setter
public class LoginFormVM  {
    @Schema(example = "vu.pn194411@sis.hust.edu.vn")
    @Email
    private String email;
    @Schema(example = "12345678")
    @NonNull
    @Password
    private String password;

    public LoginFormVM(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
