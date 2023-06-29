package com.shopnow.usermicroservice.services;

import java.util.List;

import com.shopnow.usermicroservice.entities.Customer;

public interface CustomerService {

	Customer addCustomer(Customer customer);
	Customer updateCustomerById(Integer cid,Customer customer);
	Customer getCustomerById(Integer id);
	List<Customer> getAllCustomers();
	Customer deleteCustomerById(Integer id);
	Customer doLogin(String email,String password);
}
