package com.shopnow.apigateway.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;

@Configuration
public class CorsConfig {
	@Bean
    public CorsWebFilter corsWebFilter() {
        return new CorsWebFilter(exchange -> {
            CorsConfiguration corsConfig = new CorsConfiguration();
            corsConfig.addAllowedOriginPattern("*");
            corsConfig.addAllowedMethod("*");
            corsConfig.addAllowedHeader("*");
            corsConfig.setAllowCredentials(true);
            return corsConfig;
        });
    }
}
