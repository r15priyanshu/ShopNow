package com.shopnow.usermicroservice;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import com.shopnow.usermicroservice.external.dtos.Order;
import com.shopnow.usermicroservice.external.services.OrderServiceExternal;

@SpringBootTest
class UserserviceApplicationTests {
	
	private Logger logger = LoggerFactory.getLogger(UserserviceApplicationTests.class);

	@Autowired
	OrderServiceExternal orderServiceExternal;

	@Test
	void test() {
		
	}

}
