package com.shopnow.usermicroservice.configs;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;

@Configuration
@OpenAPIDefinition(info = @Info(title = "SHOPNOW USER-MICROSERVICE", description = "THE PROJECT HANDLES ALL USER RELATED OPERATIONS...!!", version = "1.1", summary = "THIS IS SUMMARY..!!", contact = @Contact(email = "anandpriyanshu6@gmail.com", name = "PRIYANSHU ANAND", url = "https://www.linkedin.com/in/r15priyanshu/")))
public class SwaggerConfiguration {

}
