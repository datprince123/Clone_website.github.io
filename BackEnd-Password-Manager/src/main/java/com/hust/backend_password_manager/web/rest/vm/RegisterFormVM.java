package com.hust.backend_password_manager.web.rest.vm;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hust.backend_password_manager.web.rest.validate.Password;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@AllArgsConstructor
@Getter
@Setter
public class RegisterFormVM  implements Serializable {
    @Schema(example = "vu.pn194411@sis.hust.edu.vn")
        @Email
        @NotNull
    String email;

    @Password
    @Schema(example = "12345678")
    @NotNull
    String password;
    @Schema(example = "dsafsdafawefasefasdfe")
    private String salt;
    @JsonIgnore
    private String secret;
}
