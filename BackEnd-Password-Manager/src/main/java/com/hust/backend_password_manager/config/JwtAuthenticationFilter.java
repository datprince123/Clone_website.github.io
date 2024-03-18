package com.hust.backend_password_manager.config;

import com.hust.backend_password_manager.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {


    private final JwtService jwtService;


    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String token;
        logger.info(request.getRemoteAddr());
        logger.info(request.getRemoteHost());
        logger.info(request.getRemoteUser());
        logger.info(request.getRemotePort());
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            if(!jwtService.validateToken(token) || !jwtService.getSubject(token).equals( JwtService.TOKEN)) {
                filterChain.doFilter(request, response);
                return;
            }
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    jwtService.extractEmail(token),
                    null,
                    jwtService.getAuthorities(token)
            );
            authToken.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
            );
            SecurityContextHolder.getContext().setAuthentication(authToken);
            filterChain.doFilter(request, response);
            return;
        }

        filterChain.doFilter(request, response);

    }
}
