package com.elearn.app.configuration.security;

import com.elearn.app.dtos.CustomMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
@EnableWebSecurity(debug = true)
public class SecurityConfig {

    private AuthenticationEntryPoint authenticationEntryPoint;

    private JwtAuthenticationFilter authenticationFilter;

    public SecurityConfig(AuthenticationEntryPoint authenticationEntryPoint, JwtAuthenticationFilter authenticationFilter) {
        this.authenticationEntryPoint = authenticationEntryPoint;
        this.authenticationFilter = authenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration
    ) throws Exception {
        return configuration.getAuthenticationManager();
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

//        http
//                .csrf(AbstractHttpConfigurer::disable)
//                .cors(AbstractHttpConfigurer::disable)
//                .authorizeHttpRequests(auth ->
//                        auth
//                                .requestMatchers(HttpMethod.GET, "/api/v1/**").hasAnyRole("GUEST","ADMIN")
//                                .requestMatchers(HttpMethod.POST, "/api/v1/**").hasRole("ADMIN")
//                                .requestMatchers(HttpMethod.PUT, "/api/v1/**").hasRole("ADMIN")
//                                .requestMatchers(HttpMethod.DELETE, "/api/v1/**").hasRole("ADMIN")
//                                .anyRequest().authenticated()
//                );

        http.
                csrf(AbstractHttpConfigurer::disable);
//        http
//                        .cors(AbstractHttpConfigurer::disable);

        http
                .cors(cors->{
                    CorsConfiguration configuration=new CorsConfiguration();
                    configuration.setAllowedOrigins(List.of("http://localhost:5173","http://localhost:5550"));
                    configuration.addAllowedMethod("*");
                    configuration.addAllowedHeader("*");
                    configuration.setAllowCredentials(true);

                    UrlBasedCorsConfigurationSource corsConfigurationSource=new UrlBasedCorsConfigurationSource();
                    corsConfigurationSource.registerCorsConfiguration("/**",configuration);

                    cors.configurationSource(corsConfigurationSource);
                });

                http
                                .authorizeHttpRequests(auth->
                                    auth.
                                            requestMatchers("/v3/api-docs/**","/swagger-ui/**","/swagger-resources/**").permitAll()
                                                .requestMatchers("/api/v1/auth/login").permitAll()
                                            .requestMatchers(HttpMethod.POST, "/api/v1/users").permitAll()

                                            .requestMatchers(HttpMethod.GET,"/api/v1/**").hasAnyRole("GUEST","ADMIN")
                                            .requestMatchers(HttpMethod.POST,"/api/v1/**").hasRole("ADMIN")
                                            .requestMatchers(HttpMethod.PUT,"/api/v1/**").hasRole("ADMIN")
                                            .requestMatchers(HttpMethod.DELETE,"/api/v1/**").hasRole("ADMIN")
                                            .anyRequest().authenticated()
                                        );

        http.addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);
        http.sessionManagement(e->e.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.exceptionHandling(e->e.authenticationEntryPoint(authenticationEntryPoint).accessDeniedHandler((request, response, accessDeniedException) ->
                {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);

                    CustomMessage customMessage=new CustomMessage();
                    customMessage.setMessage(accessDeniedException.getMessage());
                    customMessage.setSuccess(false);

                   String stringWriter= new ObjectMapper().writeValueAsString(customMessage);
                   response.getWriter().println(stringWriter);

                }

                ));

//        http.httpBasic(hbasic->hbasic.authenticationEntryPoint(authenticationEntryPoint));


//        http.exceptionHandling(ex->{
//            ex.authenticationEntryPoint(authenticationEntryPoint);
//        });
                 // Enable Basic Authentication

        return http.build();
    }
}
