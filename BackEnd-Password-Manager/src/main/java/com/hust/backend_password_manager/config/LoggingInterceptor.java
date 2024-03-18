package com.hust.backend_password_manager.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
public class LoggingInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        // Log request details before handling the request
        log.info("Request URL: {}" , request.getRequestURL());
        log.info("Request Method: {}" , request.getMethod());
        return true;
    }

    // Other overridden methods postHandle and afterCompletion can also be used for logging
}
