package com.hust.backend_password_manager.entity.password_manager_entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

import java.util.Date;

@Entity
@Table(name = "account")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@RequestScope(proxyMode = ScopedProxyMode.DEFAULT)
@Component
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    @JsonIgnore
    private String password;

    @Column(name = "`is_active`")
    private Boolean isActive;

    @JsonIgnore
    @Column(name = "`enable_two_factory_auth`")
    private Boolean enableTwoFactoryAuth;

    @JsonIgnore
    @Column(name = "`allow_restore_masterkey`")
    private Boolean allowRestoreMasterKey;

    @JsonIgnore
    @Column(name = "`is_admin`")
    private Boolean isAdmin;

    @JsonIgnore
    @Column(name = "`create_date_time`")
    private Date createDateTime;

    @JsonIgnore
    @Column(name = "`last-update_date_time`")
    private Date lastUpdateDateTime;



    @PrePersist
    protected void onCreate() {
        this.createDateTime = new Date();
        this.lastUpdateDateTime = new Date();
        this.isActive = true;
        this.enableTwoFactoryAuth = false;
        this.allowRestoreMasterKey= false;
        this.isAdmin = false;
    }
    @PreUpdate
    protected void onUpdate() {
        this.lastUpdateDateTime = new Date();
    }


}
