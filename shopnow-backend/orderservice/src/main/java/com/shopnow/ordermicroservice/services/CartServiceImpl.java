package com.shopnow.ordermicroservice.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.shopnow.ordermicroservice.entities.CartItem;
import com.shopnow.ordermicroservice.exceptions.CustomException;
import com.shopnow.ordermicroservice.external.services.ProductServiceExternal;
import com.shopnow.ordermicroservice.repositories.CartRepository;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	CartRepository cartRepository;

	@Autowired
	ProductServiceExternal productServiceExternal;

	@Override
	public CartItem addToCart(Integer productid, Integer customerid) {
		CartItem newItemInCart = CartItem.builder().addedtocartdate(LocalDateTime.now()).customerid(customerid)
				.productid(productid).build();
		CartItem productAddedToCart = cartRepository.save(newItemInCart);
		return productAddedToCart;
	}

	@Override
	public CartItem deleteFromCart(Integer cartitemid) {
		CartItem item = cartRepository.findById(cartitemid).orElseThrow(()->new CustomException("CartItem not found with id:"+cartitemid, HttpStatus.NOT_FOUND));
		cartRepository.delete(item);
		return item;
	}

	@Override
	public List<CartItem> getAllItemsInCartByCustomerId(Integer customerid) {
		List<CartItem> allItemsInCart = cartRepository.findCartByCustomerid(customerid);
		// fetch product details from product external microservice for each of the
		// items in the cart

		List<CartItem> allItemsInCartWithProductDetails = allItemsInCart.stream().map((item) -> {
			item.setProduct(productServiceExternal.getProductById(item.getProductid()));
			return item;
		}).collect(Collectors.toList());
		return allItemsInCartWithProductDetails;
	}

}
