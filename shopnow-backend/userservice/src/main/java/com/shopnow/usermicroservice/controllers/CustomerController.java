package com.shopnow.usermicroservice.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import com.shopnow.usermicroservice.services.exceptions.CustomException;

import io.github.resilience4j.ratelimiter.annotation.RateLimiter;

@RestController
@RequestMapping("/cms")
public class CustomerController {

	@Value("${custom.message}")
	private String customMessage;

	@Autowired
	CustomerService customerService;
	
	private Logger logger=LoggerFactory.getLogger(getClass());

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
	
	// Below controller url method is responsible to call external microservices
	// internally , therefore we will create circuitBreaker for it and will create a
	// callback method with same return type of this method which will then be
	// called when this url will not get response from the other microservice or the
	// microservice is down
	
	//@CircuitBreaker(name = "getCustomerByIdCircuitBreaker",fallbackMethod = "getCustomerByIdFallback")
	//@Retry(name = "getCustomerByIdRetry",fallbackMethod = "getCustomerByIdFallback")
	@RateLimiter(name = "getCustomerByIdRateLimiter",fallbackMethod = "getCustomerByIdFallback" )
	@GetMapping("/customers/{cid}")
	public ResponseEntity<Customer> getCustomerById(@PathVariable("cid") Integer cid) {
		Customer foundCustomer = customerService.getCustomerById(cid);
		return new ResponseEntity<Customer>(foundCustomer, HttpStatus.OK);
	}
	
	public ResponseEntity<Customer> getCustomerByIdFallback(@PathVariable("cid") Integer cid,Exception e) {
		CustomException exception;
		if(e instanceof CustomException) {
			exception=(CustomException)e;
			throw CustomException.builder().message(exception.getMessage()).status(exception.getStatus()).timestamp(exception.getTimestamp()).build();
		}
			
		
		logger.warn("SOMETHING WENT WRONG WHILE CALLING EXTERNAL MICROSERVICE, CALLING fallback method  getCustomerByIdFallback()",e.getMessage());
		Customer fallbackCustomer = Customer.builder().cid(-1).address(null).email("Fall Back Email").mobile("9999900000").fullname("Fall Back name").build();
		return new ResponseEntity<Customer>(fallbackCustomer, HttpStatus.SERVICE_UNAVAILABLE);
	}
	
	@GetMapping("/test")
	public ResponseEntity<String> getCustomMessage() {
		return new ResponseEntity<String>(customMessage, HttpStatus.OK);
	}
}
