package com.hust.backend_password_manager.repository.secret_repository;

import com.hust.backend_password_manager.entity.secret_entity.Secret;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SecretRepository extends JpaRepository<Secret,Long> {
    String findSaltByAccId(Long accId);

    Secret findByAccId(Long accId);


}
