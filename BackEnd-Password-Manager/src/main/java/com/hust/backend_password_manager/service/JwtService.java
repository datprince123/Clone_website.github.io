package com.hust.backend_password_manager.service;


import com.hust.backend_password_manager.entity.AccountBean;
import com.hust.backend_password_manager.entity.password_manager_entity.Account;
import com.hust.backend_password_manager.repository.password_manager_repository.AccountRepository;
import com.hust.backend_password_manager.web.rest.vm.RegisterFormVM;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.*;
import java.util.function.Function;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class JwtService {

    public static final  String LOGIN = "LOGIN";
    public static final  String REGISTER = "REGISTER";

    public static final  String FORGOT_PASSWORD = "FORGOT_PASSWORD";
    public static final  String TOKEN = "TOKEN";
    public static final  String REMOVE_COUNTDOWN = "REMOVE_COUNTDOWN";

    private final AccountBean accountBean ;



    @Value("${application.security.jwt.secret-key}")
    private String secretKey;

    @Value("${application.security.jwt.expiration}")
    private long jwtExpiration;
    @Value("${application.security.jwt.expirationRegister}")
    private long jwtExpirationRegister;


    private final  AccountRepository accountRepository;


    public String extractEmail(String token) {
        Claims body =  extractAllClaims(token);
        return (String) body.get("email");
    }

    public RegisterFormVM getRegisterForm(String token){
        Claims claims = extractAllClaims(token);
        return new RegisterFormVM( (String) claims.get("email") ,(String) claims.get("password"), (String) claims.get("salt"),( String) claims.get("secret") );
    }


    public Collection<? extends GrantedAuthority> getAuthorities(String token){
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        String email  = extractEmail(token);
        if(email == null){
            return authorities;
        }
        Account account = accountRepository.findOneByEmail(email);
        if (account == null ) return authorities;
        if(account.getIsAdmin() && account.getIsActive()) authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if(Boolean.FALSE.equals(account.getIsAdmin()) && Boolean.TRUE.equals(account.getIsActive()) ) authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        BeanUtils.copyProperties(account, accountBean);
        log.info(accountBean.toString());

        return authorities;
    }


    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken( Map<String, Object> claims, String subject) {
            return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationRegister))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateToken(
            Map<String, Object> extraClaims,
            Account account
    ) {
        return buildToken(extraClaims, account, jwtExpiration);
    }

    public String generateToken(
            Map<String, Object> extraClaims
    ) {
        return buildToken(extraClaims, new Account(), jwtExpirationRegister);
    }



    public String generateOtpLoginToken(
            Map<String, Object> extraClaims
    ) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(LOGIN)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationRegister))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();

    }

    public String generate(
            Map<String, Object> extraClaims, String subject
    ) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationRegister))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();

    }




    //
    public String getSubject (String token){
        Claims claims = extractAllClaims(token);
        return claims.getSubject();
    }

    public String generateUserToken(
            Map<String, Object> extraClaims
    ) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(TOKEN)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }


    public String generateRegisterToken(
            Map<String, Object> extraClaims
    ) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(REGISTER)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationRegister))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(
            String token , String subject
    ) {
        return (this.validateToken(token) && this.getSubject(token).equals(subject) );
    }




    private String buildToken(
            Map<String, Object> extraClaims,
            Account account,
            long expiration
    ) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(account.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(authToken);

            return true;
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");

        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");

        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");

        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
        }
        return  false;
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
