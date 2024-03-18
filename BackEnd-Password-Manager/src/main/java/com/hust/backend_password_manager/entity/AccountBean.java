package com.hust.backend_password_manager.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

import java.util.Date;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@RequestScope
@Component
public class AccountBean {


    private Long id;

    private String email;

    private String password;

    private Boolean isActive;

    private Boolean enableTowFactoryAuth;

    private Boolean allowRestoreMasterKey;

    private Boolean isAdmin;

    private Date createDateTime;

    private Date lastUpdateDateTime;

    @Override
    public String toString() {
        return email+ "   "+id+"      "+password+isActive;
    }

}
