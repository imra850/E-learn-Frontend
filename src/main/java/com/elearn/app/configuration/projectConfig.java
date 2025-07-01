package com.elearn.app.configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "streaming application",
                description = "created by imran",
                version = "1.0",
                contact = @Contact(
                        name = "imran",
                        email = "stream@gmail.com"
                ),
                license = @License(
                        url = "https://streamingapp.com",
                        name = "Apache License 2.0"
                )

        ),
        security = @SecurityRequirement(name = "jwtscheme")




)

@SecurityScheme(name = "jwtscheme",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT"

)
public class projectConfig {

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }
}
