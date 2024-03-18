package com.hust.backend_password_manager.entity.password_manager_entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "backup_key")
@Data
public class BackupKey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long accId;

    @Column(name = "`key_encrypt`")
    private String keyEncrypt;
    private String salt;

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

    }
    @PreUpdate
    protected void onUpdate() {
        this.lastUpdateDateTime = new Date();
    }


}
