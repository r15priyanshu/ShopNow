package com.shopnow.ordermicroservice.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.shopnow.ordermicroservice.dtos.ShippingDetailsDto;
import com.shopnow.ordermicroservice.entities.CartItem;
import com.shopnow.ordermicroservice.entities.Order;
import com.shopnow.ordermicroservice.exceptions.CustomException;
import com.shopnow.ordermicroservice.external.dtos.ProductDto;
import com.shopnow.ordermicroservice.external.services.ProductServiceExternal;
import com.shopnow.ordermicroservice.repositories.OrderRepository;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	OrderRepository orderRepository;

	@Autowired
	CartService cartService;

	@Autowired
	ProductServiceExternal productServiceExternal;

	// This method will fetch each items in the cart and create orders for each of
	// them and
	// ultimately remove items from the cart
	@Override
	public List<Order> createOrder(Integer cid, ShippingDetailsDto shippingDetailsDto) {
		List<CartItem> allItemsInCartByCustomerId = cartService.getAllItemsInCartByCustomerId(cid);
		if (allItemsInCartByCustomerId.isEmpty())
			throw new CustomException("No items in the cart for customer with id:" + cid, HttpStatus.NOT_FOUND);

		List<Order> createdOrders = allItemsInCartByCustomerId.stream().map((item) -> {

			// creating new order
			Order newOrder = Order.builder().productid(item.getProductid()).customerid(cid)
					.orderdate(LocalDateTime.now()).fullname(shippingDetailsDto.getFullname())
					.address(shippingDetailsDto.getAddress()).email(shippingDetailsDto.getEmail())
					.paymenttype(shippingDetailsDto.getPaymenttype()).mobile(shippingDetailsDto.getPaymenttype())
					.build();
			orderRepository.save(newOrder);
			// now delete the cart item after order is placed
			cartService.deleteFromCart(item.getCartitemid());
			return newOrder;
		}).collect(Collectors.toList());
		return createdOrders;
	}

	@Override
	public List<Order> getAllOrders() {
		List<Order> allOrders = orderRepository.findAll();
		return allOrders;
	}

	@Override
	public Order getOrderById(Integer oid) {
		Order foundOrder = orderRepository.findById(oid)
				.orElseThrow(() -> new CustomException("Order not found with id:" + oid, HttpStatus.NOT_FOUND));
		return foundOrder;
	}

	@Override
	public List<Order> getAllOrdersByCustomerId(Integer cid) {
		List<Order> allOrders = orderRepository.findOrdersByCustomerid(cid);
		allOrders = allOrders.stream().map((order) -> {
			ProductDto product = productServiceExternal.getProductById(order.getProductid()).getBody();
			order.setProduct(product);
			return order;
		}).collect(Collectors.toList());
		return allOrders;
	}
}
