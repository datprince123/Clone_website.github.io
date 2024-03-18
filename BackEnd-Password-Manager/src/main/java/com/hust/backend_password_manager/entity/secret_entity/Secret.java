package com.hust.backend_password_manager.entity.secret_entity;

import jakarta.persistence.*;
import lombok.Data;
import org.checkerframework.checker.units.qual.C;


@Entity
@Table(name = "secret")
@Data
public class Secret {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "`acc_id`")
    private Long accId;

    private String salt;

    @Column(name = "`secret_key`")
    private String secretKey;

    @Column(name = "`master_passowrd`")
    private String masterPasword;

}
