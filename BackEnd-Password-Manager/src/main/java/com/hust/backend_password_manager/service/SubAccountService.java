package com.hust.backend_password_manager.service;

import com.hust.backend_password_manager.config.AesUtil;
import com.hust.backend_password_manager.entity.AccountBean;
import com.hust.backend_password_manager.entity.password_manager_entity.Account;
import com.hust.backend_password_manager.entity.password_manager_entity.SubAccount;
import com.hust.backend_password_manager.entity.secret_entity.Secret;
import com.hust.backend_password_manager.repository.password_manager_repository.AccountRepository;
import com.hust.backend_password_manager.repository.password_manager_repository.SubAccountRepository;
import com.hust.backend_password_manager.repository.secret_repository.SecretRepository;
import com.hust.backend_password_manager.web.rest.err.MyError;
import com.hust.backend_password_manager.web.rest.vm.ChangeMasterPasswordVM;
import com.hust.backend_password_manager.web.rest.vm.SubAccountVM;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class SubAccountService {
    private final SubAccountRepository subAccountRepository;
    private final AccountService accountService;
    private final AccountBean accountBean;

    private final AesUtil aesUtil;
    private final AccountRepository accountRepository;
    private final JwtService jwtService;
    private final SecretRepository secretRepository;
    private final PasswordEncoder passwordEncoder;

    public void addSubAccount(SubAccountVM subAccount){
        Account account = new Account();
        BeanUtils.copyProperties(accountBean,account);
        SubAccount subAcc = new SubAccount();
        BeanUtils.copyProperties(subAccount, subAcc ,"id");
        subAcc.setAccId(account.getId());
        subAccountRepository.save(subAcc);
    }


    public void editSubAccount(SubAccountVM subAccount){
        Account account = new Account();
        BeanUtils.copyProperties(accountBean,account);
        SubAccount subAcc = subAccountRepository.findById(subAccount.getId()).orElse(null);
        if(subAcc == null){
            throw new MyError("Tài Khoản con Không tồn tại");
        }
        if(!account.getId().equals(subAcc.getAccId())){
            throw new MyError("Bạn không có quyền chỉnh tài khoản này");
        }
        BeanUtils.copyProperties(subAccount, subAcc,"id");
        subAccountRepository.save(subAcc);
    }

    public void deleteSubAccount(Integer id ){
        Account account = new Account();
        BeanUtils.copyProperties(accountBean,account);
        SubAccount subAcc = subAccountRepository.findById((long) id).orElse(null);
        if(subAcc == null){
            throw new MyError("Tài Khoản con Không tồn tại");
        }
        if(!account.getId().equals(subAcc.getAccId())){
            throw new MyError("Bạn không có quyền chỉnh tài khoản này");
        }
        subAccountRepository.delete(subAcc);
    }
    public List<SubAccount> getSubAccountList(HttpServletRequest request){
        String authHeader = request.getHeader("Authorization");
        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);
        Account account = accountRepository.findOneByEmail(email);
        return subAccountRepository.findSubAccountByAccId(account.getId());
    }
    public Object getSecret(HttpServletRequest request){
        String authHeader = request.getHeader("Authorization");
        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);
        Account account = accountRepository.findOneByEmail(email);
        Secret secret = secretRepository.findByAccId(account.getId());
        if(secret == null){
            throw new MyError("Them salt vo trc");

        }
        return Map.of("email", email, "secret", secret.getSecretKey());

    }

    public void changeMasterKey(ChangeMasterPasswordVM changeMasterPasswordVM){
        if(changeMasterPasswordVM.getCurrentMasterPassword().equals(changeMasterPasswordVM.getNewMasterPassword())){
            throw new MyError("MasterPassword phải khác nhau");
        }

        Secret secret = secretRepository.findByAccId(accountBean.getId());
        if(!passwordEncoder.matches(changeMasterPasswordVM.getCurrentMasterPassword(), secret.getMasterPasword())){
            throw new MyError("Master key không chính xác ");
        }
        List<SubAccount> subAccountList = subAccountRepository.findSubAccountByAccId(accountBean.getId());
        Iterator<SubAccount> iterator = subAccountList.iterator();
        while (iterator.hasNext()){
            SubAccount subAccount = iterator.next();
            String newPasswordEncrypt = aesUtil.changeNewMasterKey(subAccount.getSubUserPwdEncrypt(), secret.getSalt(), changeMasterPasswordVM.getCurrentMasterPassword(), changeMasterPasswordVM.getNewMasterPassword() );
            subAccount.setSubUserPwdEncrypt(newPasswordEncrypt);
        }
        subAccountRepository.saveAll(subAccountList);
        secret.setMasterPasword(passwordEncoder.encode(changeMasterPasswordVM.getNewMasterPassword()));
        secretRepository.save(secret);

    }


    public String backupMasterkey(String masterkey){
        Secret secret = secretRepository.findByAccId(accountBean.getId());
        String masterKeyHash = secret.getMasterPasword();
        String saltString = secret.getSalt();
        return aesUtil.encrypt(saltString,saltString,masterKeyHash, masterkey);
    }

    public String recoveryMasterKey(String masterkeyEnc){
        Secret secret = secretRepository.findByAccId(accountBean.getId());
        String masterKeyHash = secret.getMasterPasword();
        String saltString = secret.getSalt();
        return aesUtil.decrypt(saltString,saltString,masterKeyHash, masterkeyEnc);
    }
}
