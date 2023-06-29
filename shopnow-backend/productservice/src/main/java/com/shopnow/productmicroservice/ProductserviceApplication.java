package com.shopnow.productmicroservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

import com.shopnow.productmicroservice.entities.Category;
import com.shopnow.productmicroservice.repositories.CategoryRepository;

@SpringBootApplication
@EnableEurekaClient
public class ProductserviceApplication implements ApplicationRunner {

	@Autowired
	private CategoryRepository categoryRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(ProductserviceApplication.class, args);
	}

	@Override
	public void run(ApplicationArguments args) throws Exception {
		
	}
}
