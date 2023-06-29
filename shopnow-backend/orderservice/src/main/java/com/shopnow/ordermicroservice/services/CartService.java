package com.shopnow.ordermicroservice.services;

import java.util.List;

import com.shopnow.ordermicroservice.entities.CartItem;

public interface CartService {
	CartItem addToCart(Integer productid,Integer customerid);
	CartItem deleteFromCart(Integer cartitemid);
	List<CartItem> getAllItemsInCartByCustomerId(Integer customerid);
}
