package com.shopnow.ordermicroservice.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.shopnow.ordermicroservice.entities.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
	List<Order> findOrdersByCustomerid(Integer cid);
}
