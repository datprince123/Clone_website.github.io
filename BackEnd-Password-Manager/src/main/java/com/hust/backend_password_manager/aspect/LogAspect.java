package com.hust.backend_password_manager.aspect;

import com.hust.backend_password_manager.aspect.annotation.LogHistory;
import com.hust.backend_password_manager.aspect.annotation.LogInServer;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Aspect
@Slf4j
@Component
public class LogAspect {
    @Autowired
    HttpServletRequest request;

    @Pointcut("@annotation( com.hust.backend_password_manager.aspect.annotation.LogHistory)")
    public void loggingPointCut(){}


    @AfterThrowing(value = "loggingPointCut()", throwing = "ex")
    public void beforeThrow(JoinPoint joinPoint ,Throwable ex){
        log.info("have error throw {} 1 {}",joinPoint.getTarget() ,joinPoint.toString() );
    }


}
