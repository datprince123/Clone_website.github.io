package com.hust.backend_password_manager.entity.password_manager_entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "sub_account")
@Setter
@Getter
public class SubAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long accId;

    private String url;

    @Column(name = "`desc`")
    private String desc;

    @Column(name = "`sub_user_name`")
    private String subUserName;

    @Column(name = "`sub_user_pwd_encrypt`", length = 1024)
    private String subUserPwdEncrypt ;

    @Column(name = "`create_date_time`")
    private Date createDateTime;

    @Column(name = "`last-update_date_time`")
    private Date lastUpdateDateTime;

    @PrePersist
    protected void onCreate() {
        this.createDateTime = new Date();
        this.lastUpdateDateTime = new Date();

    }
    @PreUpdate
    protected void onUpdate() {
        this.lastUpdateDateTime = new Date();
    }

    @PostLoad
    protected void onPostLoad() {
       if(this.url == null){
           this.url = "";
       }
        if(this.desc == null){
            this.desc = "";
        }

    }

}
