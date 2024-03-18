package com.hust.backend_password_manager.web.rest;

import com.hust.backend_password_manager.web.rest.err.LoginWithOtp;
import com.hust.backend_password_manager.web.rest.err.MyError;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.Map;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler({ MyError.class})
    public ResponseEntity<Object> handleException(MyError e) {
        log.info("vo handler");
        Map<String,Object> response = Map.of("errors", e.getMessage());
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler({ LoginWithOtp.class})
    public ResponseEntity<Object> handleLogin(LoginWithOtp e) {
        log.info("vo handler");
        Map<String,Object> response = Map.of("msg" , "Thành công, Nhập otp" , "data" , Map.of("token", e.getToken()));
        return ResponseEntity.accepted().body(response);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationExceptions(
        MethodArgumentNotValidException ex) {
        log.info("hello");
        StringBuilder errorsMsg = new StringBuilder(); // Initialize errorsMsg before using it to concatenate values
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errorsMsg.append(fieldName).append(" : ").append(errorMessage); // Concatenate with proper formatting
        });
        return ResponseEntity.badRequest().body(Map.of("errors", errorsMsg));
    }
}
