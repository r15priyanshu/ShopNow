package com.shopnow.ordermicroservice.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopnow.ordermicroservice.dtos.ShippingDetailsDto;
import com.shopnow.ordermicroservice.entities.Order;
import com.shopnow.ordermicroservice.services.OrderService;

@RestController
@RequestMapping("/oms")
public class OrderController {
	
	@Autowired
	OrderService orderService;

	@PostMapping("/orders/customer/{cid}")
	public ResponseEntity<List<Order>> createOrder(@PathVariable("cid") Integer cid,@RequestBody ShippingDetailsDto shippingDetailsDto)
	{
		List<Order> createdOrders = orderService.createOrder(cid,shippingDetailsDto);
		return new ResponseEntity<>(createdOrders,HttpStatus.CREATED);
	}
	
	@GetMapping("/orders")
	public ResponseEntity<List<Order>> getAllOrders()
	{
		List<Order> allOrders = orderService.getAllOrders();
		return new ResponseEntity<>(allOrders,HttpStatus.OK);
	}
	
	@GetMapping("/orders/{oid}")
	public ResponseEntity<Order> getOrderById(@PathVariable("oid") Integer oid)
	{
		Order foundOrder = orderService.getOrderById(oid);
		return new ResponseEntity<>(foundOrder,HttpStatus.OK);
	}
	
	@GetMapping("/orders/customer/{cid}")
	public ResponseEntity<List<Order>> getAllOrdersByCustomerId(@PathVariable("cid") Integer cid)
	{
		List<Order> allOrdersByCustomerId = orderService.getAllOrdersByCustomerId(cid);
		return new ResponseEntity<>(allOrdersByCustomerId,HttpStatus.OK);
	}
}
