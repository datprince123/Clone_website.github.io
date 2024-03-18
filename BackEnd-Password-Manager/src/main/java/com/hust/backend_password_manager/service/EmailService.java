package com.hust.backend_password_manager.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailService {


    private final JavaMailSender emailSender;

    public void sendRemoveCountdownUrl(
            String to, String token) {
        String text = "http://localhost:8080/user/removeCountdown/validate?token="+ URLEncoder.encode(token);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("passwordmanager@gmail.com");
        message.setTo(to);
        message.setSubject("Xác nhận kích hoạt tài khoản");
        message.setText(text);
        emailSender.send(message);
        log.info(text);
    }


    public void sendActiveUrl(
        String to, String token) {
        String text = "http://localhost:8080/account/register/validate?token="+ URLEncoder.encode(token);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Xác nhận kích hoạt tài khoản");
        message.setText(text);
        emailSender.send(message);
        log.info(text);
    }


    public void sendValidateForgotPasswordUrl(
            String to, String token) {
        String text = "http://localhost:8080/account/forgotPassword/Validate?token="+ URLEncoder.encode(token);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Xác nhận khôi phục mật khẩu");
        message.setText(text);
        emailSender.send(message);
        log.info(text);
    }



    @Bean
    public SimpleMailMessage templateSimpleMessage() {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setText(
                "This is the test email template for your email:\n%s\n");
        return message;
    }
}
