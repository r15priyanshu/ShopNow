package com.shopnow.ordermicroservice;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.shopnow.ordermicroservice.external.dtos.ProductDto;
import com.shopnow.ordermicroservice.external.services.ProductServiceExternal;

@SpringBootTest
class OrderserviceApplicationTests {

	@Autowired
	ProductServiceExternal productServiceExternal;

	@Test
	void contextLoads() {
	}

	@Test
	void getProductByProductId() {
		ProductDto productById = productServiceExternal.getProductById(1).getBody();
	}

}
