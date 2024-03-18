package com.hust.backend_password_manager.service.dto;

import lombok.Getter;

@Getter
public class ResponseData {
    String message;
    Object data;

    public ResponseData(String message, Object data) {
        this.message = message;
        this.data = data;
    }
}