package com.shopnow.ordermicroservice.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shopnow.ordermicroservice.entities.CartItem;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Integer> {

	List<CartItem> findCartByCustomerid(Integer customerid);
}
