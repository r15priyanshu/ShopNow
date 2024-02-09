package com.shopnow.productmicroservice.controllers;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.List;

//import org.hibernate.engine.jdbc.StreamUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shopnow.productmicroservice.entities.Product;
import com.shopnow.productmicroservice.exceptions.CustomException;
import com.shopnow.productmicroservice.services.FileService;
import com.shopnow.productmicroservice.services.ProductService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/pms")
public class ProductController {

	@Value("${shopnow.images.productimages}")
	private String productimagepath;

	@Autowired
	ProductService productService;

	@Autowired
	ObjectMapper objectMapper;

	@Autowired
	FileService fileService;

//	@PostMapping("/products/category/{categoryid}")
//	public ResponseEntity<Product> createProduct(@RequestBody Product product,@PathVariable("categoryid") Integer categoryid) {
//		Product addedProduct = productService.addProduct(product,categoryid);
//		return new ResponseEntity<Product>(addedProduct, HttpStatus.CREATED);
//	}

	@PostMapping("/products/category/{categoryid}")
	public ResponseEntity<Product> createProductWithImage(@RequestParam("product") String product,
			@PathVariable("categoryid") Integer categoryid, @RequestParam("productimage") MultipartFile file) {

		Product newProduct = null;
		try {
			// CONVERTING STRING FORM OF JSON INTO ENTITY CLASS
			newProduct = objectMapper.readValue(product, Product.class);
		} catch (JsonProcessingException e) {
			throw new CustomException("Error While Parsing JSON String to Product.class Entity",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

		Product createdProduct = productService.addProduct(newProduct, categoryid, file);

		return new ResponseEntity<Product>(createdProduct, HttpStatus.CREATED);
	}

	// serve product Image
	@GetMapping(value = "/images/serveimage/{imagename}", produces = MediaType.IMAGE_JPEG_VALUE)
	public void serveImage(@PathVariable("imagename") String imagename, HttpServletResponse response) {
		try {
			InputStream is = fileService.serveImage(productimagepath, imagename);
			response.setContentType(MediaType.IMAGE_JPEG_VALUE);
			StreamUtils.copy(is, response.getOutputStream());
		} catch (FileNotFoundException e) {
			throw new CustomException("File Not Found with the name:" + imagename, HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@GetMapping("/products/category/{categoryid}")
	public ResponseEntity<List<Product>> getAllProductsByCategoryId(@PathVariable("categoryid") Integer categoryid) {
		List<Product> products = productService.getAllProductsByCategoryId(categoryid);
		return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
	}

	@GetMapping("/products")
	public ResponseEntity<List<Product>> getAllProducts() {
		List<Product> allProducts = productService.getAllProducts();
		return new ResponseEntity<List<Product>>(allProducts, HttpStatus.OK);
	}

	@GetMapping("/products/{pid}")
	public ResponseEntity<Product> getProductById(@PathVariable("pid") Integer pid) {
		Product foundProduct = productService.getProductById(pid);
		return new ResponseEntity<Product>(foundProduct, HttpStatus.OK);
	}

	@DeleteMapping("/products/{pid}")
	public ResponseEntity<Product> deleteProductById(@PathVariable("pid") Integer pid) {
		Product deletedProduct = productService.deleteProductById(pid);
		return new ResponseEntity<Product>(deletedProduct, HttpStatus.OK);
	}
}
