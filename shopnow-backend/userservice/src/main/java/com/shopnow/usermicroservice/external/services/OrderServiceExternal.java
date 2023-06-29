package com.shopnow.usermicroservice.external.services;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.shopnow.usermicroservice.external.dtos.Order;

@FeignClient(name = "ORDER-MICROSERVICE", path = "/oms")
public interface OrderServiceExternal {

	@GetMapping("/orders/customer/{cid}")
	public List<Order> getAllOrdersByCustomerId(@PathVariable("cid") Integer cid);
}
