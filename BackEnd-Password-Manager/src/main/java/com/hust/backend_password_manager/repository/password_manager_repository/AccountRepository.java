package com.hust.backend_password_manager.repository.password_manager_repository;

import com.hust.backend_password_manager.entity.password_manager_entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account,Long> {

    Account findOneByEmail(String email);

}
