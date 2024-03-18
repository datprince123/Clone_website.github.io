package com.hust.backend_password_manager.aspect;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import com.hust.backend_password_manager.aspect.annotation.LogInServer;
import org.springframework.stereotype.Component;

import java.lang.reflect.Array;
import java.util.Arrays;

@Aspect
@Component
@Slf4j
@RequiredArgsConstructor
public class ServerLogAspect {

    private final HttpServletRequest request;

    @Pointcut("@annotation(com.hust.backend_password_manager.aspect.annotation.LogInServer)")
    public void loggingPointCut(){}


    @After("loggingPointCut()")
    public void affter(JoinPoint joinPoint){
        log.info("Ip:{} Method: {} end ", request.getRemoteHost(), joinPoint.getSignature().toString() );
    }

    @AfterThrowing(value = "loggingPointCut()" , throwing = "ex")
    public void afterThrow(JoinPoint joinPoint, Throwable ex){
        log.info("Ip: {} method {} throw exception with message {}",request.getRemoteHost() , joinPoint.getSignature().toString() ,ex.getMessage() );
    }


    @Before("loggingPointCut()")
    public void before(JoinPoint joinPoint){
        log.info("Ip:{} method {} start ",request.getRemoteHost(), joinPoint.getSignature().toString());
    }
}
