package com.shopnow.usermicroservice.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.shopnow.usermicroservice.entities.Customer;
import com.shopnow.usermicroservice.external.dtos.Order;
import com.shopnow.usermicroservice.external.services.OrderServiceExternal;
import com.shopnow.usermicroservice.repositories.CustomerRepository;
import com.shopnow.usermicroservice.services.exceptions.CustomException;

@Service
public class CustomerServiceImpl implements CustomerService {
	
	private Logger logger=LoggerFactory.getLogger(getClass());
	
	@Autowired
	CustomerRepository customerRepository;
	
	@Autowired
	OrderServiceExternal orderServiceExternal;

	@Override
	public Customer addCustomer(Customer customer) {
		if(customerRepository.findCustomerByEmail(customer.getEmail()).isPresent())
			throw new CustomException("Email already registered : "+customer.getEmail(), HttpStatus.BAD_REQUEST);
		return customerRepository.save(customer);
	}

	@Override
	public List<Customer> getAllCustomers() {
		return customerRepository.findAll();
	}

	@Override
	public Customer deleteCustomerById(Integer id) {
		Customer foundCustomer = customerRepository.findById(id).orElseThrow(()->new CustomException("Customer not found with id:"+id,HttpStatus.NOT_FOUND));
		customerRepository.delete(foundCustomer);
		return foundCustomer;
	}

	@Override
	public Customer getCustomerById(Integer id) {
		Customer foundCustomer = customerRepository.findById(id).orElseThrow(()->new CustomException("Customer not found with id:"+id,HttpStatus.NOT_FOUND));
		return foundCustomer;
	}

	@Override
	public Customer doLogin(String email, String password) {
		Customer foundCustomer = customerRepository.findCustomerByEmailAndPassword(email, password).orElseThrow(()->new CustomException("Invalid Credentials !!",HttpStatus.BAD_REQUEST));
		return foundCustomer;
	}

	@Override
	public Customer updateCustomerById(Integer cid, Customer customer) {
		Customer foundCustomer = customerRepository.findById(cid).orElseThrow(()->new CustomException("Customer not found with id:"+cid,HttpStatus.NOT_FOUND));
		
		foundCustomer.setFullname(customer.getFullname());
		foundCustomer.setAddress(customer.getAddress());
		foundCustomer.setMobile(customer.getMobile());
		foundCustomer.setPassword(customer.getPassword());
		
		Customer updatedCustomer = customerRepository.save(foundCustomer);
		return updatedCustomer;
	}
	
}
