package com.hust.backend_password_manager.repository.password_manager_repository;

import com.hust.backend_password_manager.entity.password_manager_entity.BackupKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BackupKeyRepository extends JpaRepository<BackupKey,Long> {
}
