package com.shopnow.productmicroservice;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.shopnow.productmicroservice.services.FileService;

@SpringBootTest
class ProductserviceApplicationTests {

	@Autowired
	FileService fileService;
	
	@Test
	void test() {
		
	}

}
