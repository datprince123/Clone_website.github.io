package com.hust.backend_password_manager.service;

import com.hust.backend_password_manager.service.dto.ResponseData;


public class ResponseService {

    ResponseService(){
        throw new IllegalStateException("Utility class");
    }
    public static ResponseData generateResponse(Object data, String message){
        return new ResponseData(message,data);

    }
}



