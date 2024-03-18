package com.hust.backend_password_manager.web.rest;

import com.hust.backend_password_manager.aspect.annotation.LogInServer;
import com.hust.backend_password_manager.service.AccountService;
import com.hust.backend_password_manager.web.rest.vm.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@LogInServer
public class AdminController {

    private final AccountService accountService;
    @GetMapping("/userList")
    public ResponseEntity<Object> getUserList(
    ) {
        return ResponseEntity.ok().body(accountService.getUserList());
    }

    @PutMapping("/userDetail")
    public ResponseEntity<Object> editUserDetail(
            @RequestBody User user
    ) {

        accountService.editUser(user);
        return ResponseEntity.ok("Thành công");
    }


    @PutMapping("/userDetail/removeCountdown")
    public ResponseEntity<Object> editUserDetail(
            @RequestParam String email
    ) {

        accountService.removeCountdown(email);
        return ResponseEntity.ok("Thành công");
    }



}
