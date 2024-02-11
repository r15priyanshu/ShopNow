package com.shopnow.usermicroservice.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopnow.usermicroservice.entities.Customer;
import com.shopnow.usermicroservice.services.CustomerService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/cms")
@Slf4j
public class CustomerController {

	@Value("${custom.message}")
	private String customMessage;

	@Autowired
	CustomerService customerService;

	@PostMapping("/login")
	public ResponseEntity<Customer> doLogin(@RequestBody Customer customer) {
		Customer loggedinuser = customerService.doLogin(customer.getEmail(), customer.getPassword());
		return new ResponseEntity<>(loggedinuser, HttpStatus.OK);
	}


	@PostMapping("/customers")
	public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
		Customer addedcustomer = customerService.addCustomer(customer);
		return new ResponseEntity<Customer>(addedcustomer, HttpStatus.CREATED);
	}

	@GetMapping("/customers")
	public ResponseEntity<List<Customer>> getAllCustomers() {
		List<Customer> allCustomers = customerService.getAllCustomers();
		return new ResponseEntity<List<Customer>>(allCustomers, HttpStatus.OK);
	}

	@DeleteMapping("/customers/{cid}")
	public ResponseEntity<Customer> deleteCustomerById(@PathVariable("cid") Integer cid) {
		Customer foundCustomer = customerService.deleteCustomerById(cid);
		return new ResponseEntity<Customer>(foundCustomer, HttpStatus.OK);
	}
	
	@PutMapping("/customers/{cid}")
	public ResponseEntity<Customer> updateCustomerById(@PathVariable("cid") Integer cid,@RequestBody Customer customer) {
		Customer updatedCustomer = customerService.updateCustomerById(cid,customer);
		return new ResponseEntity<Customer>(updatedCustomer, HttpStatus.OK);
	}
	
	@GetMapping("/customers/{cid}")
	public ResponseEntity<Customer> getCustomerById(@PathVariable("cid") Integer cid) {
		Customer foundCustomer = customerService.getCustomerById(cid);
		return new ResponseEntity<Customer>(foundCustomer, HttpStatus.OK);
	}
	
	@GetMapping("/test")
	public ResponseEntity<String> getCustomMessage() {
		log.info(customMessage);
		return new ResponseEntity<String>(customMessage, HttpStatus.OK);
	}
}
