package com.hust.backend_password_manager.repository.password_manager_repository;

import com.hust.backend_password_manager.entity.password_manager_entity.SubAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubAccountRepository extends JpaRepository<SubAccount,Long> {
    List<SubAccount> findSubAccountByAccId(Long accId);


}
