package com.shopnow.ordermicroservice.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopnow.ordermicroservice.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {
	List<Order> findOrdersByCustomerid(Integer cid);
}
