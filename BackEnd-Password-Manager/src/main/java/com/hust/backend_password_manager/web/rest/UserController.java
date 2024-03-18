package com.hust.backend_password_manager.web.rest;

import com.hust.backend_password_manager.aspect.annotation.LogInServer;
import com.hust.backend_password_manager.service.AccountService;
import com.hust.backend_password_manager.service.SubAccountService;
import com.hust.backend_password_manager.web.rest.vm.ChangeMasterPasswordVM;
import com.hust.backend_password_manager.web.rest.vm.SubAccountVM;
import com.hust.backend_password_manager.web.rest.vm.UserUnlockAccountVM;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final AccountService accountService;
    private final SubAccountService subAccountService;


    @PostMapping("/subAccount")
    public ResponseEntity<Object> addSubAccount(
        @RequestBody SubAccountVM subAccountVM
        ) {
        subAccountService.addSubAccount(subAccountVM);

        return ResponseEntity.ok("Thêm thành công");
    }


    @PutMapping("/subAccount")
    public ResponseEntity<Object> editSubAccount(
        @RequestBody SubAccountVM subAccountVM
    ) {
        subAccountService.editSubAccount(subAccountVM );
        return ResponseEntity.ok("Sửa thành công");
    }


    @DeleteMapping("/subAccount")
    public ResponseEntity<Object> deleteSubAccount(
        @RequestParam Integer id
    ) {
        subAccountService.deleteSubAccount(id);
        return ResponseEntity.ok("Xóa thành công");
    }


    @GetMapping("/getUserInfo")
    public ResponseEntity<Object> getUserInfor(
    ) {

        return ResponseEntity.ok( accountService.getAccountInfo());
    }

    @GetMapping("/subAccountList")
    public ResponseEntity<Object> getSubAccList(
            @NonNull HttpServletRequest request
            ) {

        return ResponseEntity.ok( subAccountService.getSubAccountList(request));
    }
    @GetMapping("/secretKey")
    @LogInServer
    public ResponseEntity<Object> getSecret(
            @NonNull HttpServletRequest request
    ) {

        return ResponseEntity.ok( subAccountService.getSecret(request));
    }
    @PostMapping("/masterKey")
    @LogInServer
    public ResponseEntity<Object> setMasterKey(
        @RequestParam String masterKey
    ){
        accountService.saveMasterKey(masterKey);
        return  ResponseEntity.ok().body("");
    }

    @GetMapping("/checkMasterKey")
    public ResponseEntity<Object> checkMasterKey(
        @RequestParam String masterKey

    ) {
        accountService.checkMasterKey(masterKey);
        return ResponseEntity.ok("");

    }

    @PutMapping("/changeMasterKey")
    @LogInServer
    public ResponseEntity<Object> changeMasterKey(
        @RequestBody ChangeMasterPasswordVM changeMasterPasswordVM
        ) {
        subAccountService.changeMasterKey(changeMasterPasswordVM);
        return ResponseEntity.ok("");
    }


    @GetMapping("/backupMasterkey")
    public ResponseEntity<Object> backupMasterkey(
            @RequestParam String masterkey
    ) {
        return ResponseEntity.ok(subAccountService.backupMasterkey(masterkey));
    }

    @GetMapping("/recoveryMasterkey")
    public ResponseEntity<Object> recoveryMasterkey(
            @RequestParam String masterkeyEnc
    ) {
        return ResponseEntity.ok().body(subAccountService.recoveryMasterKey(masterkeyEnc));
    }


    @PostMapping("/removeCountdown")
    @LogInServer
    public ResponseEntity<Object> removeCountDown(
            @RequestBody UserUnlockAccountVM userUnlockAccountVM
            ) {
        accountService.userRemoveCountdown(userUnlockAccountVM.getEmail());
        return ResponseEntity.ok().body("Mời bạn check email ");
    }

    @GetMapping("/removeCountdown/validate")
    @LogInServer
    public ResponseEntity<Object> removeCountDownValidate(
        @Parameter String token
    ) {
        accountService.userRemoveCountdownValidate(token);
        return ResponseEntity.ok().body("Xóa thời gian khóa thành công");
    }
}
