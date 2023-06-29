package com.shopnow.ordermicroservice.services;

import java.util.List;

import com.shopnow.ordermicroservice.dtos.ShippingDetailsDto;
import com.shopnow.ordermicroservice.entities.Order;

public interface OrderService {
	
	List<Order> createOrder(Integer cid,ShippingDetailsDto shippingDetailsDto);
	Order getOrderById(Integer oid);
	List<Order> getAllOrders();
	List<Order> getAllOrdersByCustomerId(Integer cid);
}
