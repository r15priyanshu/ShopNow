package com.shopnow.ordermicroservice.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopnow.ordermicroservice.entities.CartItem;
import com.shopnow.ordermicroservice.services.CartService;

@RestController
@RequestMapping("/oms")
public class CartController {

	@Autowired
	CartService cartService;

	@PostMapping("/carts/product/{pid}/customer/{cid}")
	public ResponseEntity<CartItem> addToCart(@PathVariable("pid") Integer pid, @PathVariable("cid") Integer cid) {
		CartItem addedToCart = cartService.addToCart(pid, cid);
		return new ResponseEntity<CartItem>(addedToCart, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/carts/{cartitemid}")
	public ResponseEntity<CartItem> deleteFromCart( @PathVariable("cartitemid") Integer cartitemid) {
		CartItem deletedCartItem = cartService.deleteFromCart(cartitemid);
		return new ResponseEntity<CartItem>(deletedCartItem, HttpStatus.OK);
	}

	@GetMapping("/carts/customer/{cid}")
	public ResponseEntity<List<CartItem>> getAllCartItemsByCustomerId(@PathVariable("cid") Integer cid) {
		System.out.println("BOKA");
		List<CartItem> allItemsInCartByCustomerId = cartService.getAllItemsInCartByCustomerId(cid);
		return new ResponseEntity<>(allItemsInCartByCustomerId, HttpStatus.OK);
	}
}
