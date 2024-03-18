package com.hust.backend_password_manager.config;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    private static final String ADMIN_ROLE = "ADMIN";
    private static final String[] WHITE_LIST_URL = {"/api/v1/auth/**",
            "/v2/api-docs/**",
            "/v3/api-docs",
            "/v3/api-docs/**",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui/**",
            "/webjars/**",
            "/swagger-ui.html",
            "/test/**",
//            "/user/**",
            "/account/register**",
            "/account/register/validate",
            "/account/login/validate",
            "/account/login",
            "/account/changePassowrd",
            "/account/forgotPassword/Validate",
            "/account/forgotPassword",
            "/user/removeCountdown",
            "/user/removeCountdown/validate",


    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(req ->
                        req.requestMatchers(WHITE_LIST_URL)
                                .permitAll()
                                .requestMatchers("/admin/**").hasRole(ADMIN_ROLE)
                                .requestMatchers("/user/**").hasAnyRole("USER",ADMIN_ROLE)
                                .requestMatchers("/account/**").hasAnyRole("USER",ADMIN_ROLE)
                                .anyRequest()
                                .authenticated()
                ).addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
        ;

        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }



}
