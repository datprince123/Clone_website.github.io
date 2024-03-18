package com.hust.backend_password_manager.service;

import com.hust.backend_password_manager.repository.password_manager_repository.AccountRepository;
import com.hust.backend_password_manager.repository.secret_repository.SecretRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.aerogear.security.otp.Totp;
import org.jboss.aerogear.security.otp.api.Clock;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;


@Service
@Slf4j
@RequiredArgsConstructor
public class TwoFactorAuth {


    private final AccountRepository account;



    private final SecretRepository secretRepository;


    public Boolean validateOTP(String secret,String otp){
        Totp totp = new Totp(secret, new Clock(30));
        return totp.verify(otp);
    }

    public  String generateRandomSecret() {
        SecureRandom random = new SecureRandom();
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        StringBuilder sb = new StringBuilder(16);

        for (int i = 0; i < 16; i++) {
            int randomIndex = random.nextInt(characters.length());
            sb.append(characters.charAt(randomIndex));
        }

        return sb.toString();
    }
}

