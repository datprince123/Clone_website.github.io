package com.hust.backend_password_manager.service;

import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.Cache;
import com.hust.backend_password_manager.web.rest.vm.ForgotPasswordVM;
import com.hust.backend_password_manager.web.rest.vm.RegisterFormVM;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class CacheService {
    private final HttpServletRequest request;

    private Cache<String,RegisterFormVM> cacheOtp = Caffeine.newBuilder().expireAfterWrite(50, TimeUnit.SECONDS).build();

    private Cache<String,Boolean> cacheToken = Caffeine.newBuilder().expireAfterWrite(60*60*24*30L, TimeUnit.SECONDS).build();

    private Cache<String, ForgotPasswordVM> cacheForgotPassworf = Caffeine.newBuilder().expireAfterWrite(60*60*24*30L , TimeUnit.SECONDS).build();

    private Cache<String,Integer> loginCache = Caffeine.newBuilder().expireAfterWrite(60*5L, TimeUnit.SECONDS).build();

    public RegisterFormVM getRegisterFormVM(String token) {
        return cacheOtp.getIfPresent(token);
    }

    public void putRegisterFormVM(String token, RegisterFormVM registerFormVM) {
        cacheOtp.put(token,registerFormVM);
    }

    public void evictRegisterFormVM(String token) {
        cacheOtp.invalidate(token);
    }


    public void putToken(String token){
        cacheToken.put(token, true);
    }


    public Boolean validateToken(String token){
        return cacheToken.getIfPresent(token);
    }

    public void evictToken(String token) {
        cacheToken.invalidate(token);
    }

    public  void  put(ForgotPasswordVM forgotPasswordVM){

            cacheForgotPassworf.put(forgotPasswordVM.getEmail(),forgotPasswordVM);

    }

    public ForgotPasswordVM  getForgotPasswordVM(String email){
           return cacheForgotPassworf.getIfPresent(email);
    }
    public void  evictForgotPasswordVM(String email){
         cacheForgotPassworf.invalidate(email);
    }


    public void loginFailed(String email){
        String host = request.getRemoteHost();
        Integer times = loginCache.getIfPresent(email+ host);
        if(times == null){
            times =1;
        }else if(times <= 5){
            times++;
        }else {
            return;
        }
        loginCache.put(email+host, times);
    }


    public boolean canLogin(String email){
        String host = request.getRemoteHost();
        Integer times = loginCache.getIfPresent(email + host);
        if(times == null){
            return true;
        }else return times <= 5;
    }

    public void removeCountdown(String email){
        loginCache.asMap().keySet().removeIf(key-> key.contains(email));
    }

    public void removeCountdownIp(String email){
        String host = request.getRemoteHost();
        loginCache.invalidate(email + host);
    }


}
