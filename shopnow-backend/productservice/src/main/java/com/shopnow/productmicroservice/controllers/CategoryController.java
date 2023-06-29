package com.shopnow.productmicroservice.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopnow.productmicroservice.entities.Category;
import com.shopnow.productmicroservice.services.CategoryService;

@RestController
@RequestMapping("/pms")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;
	
	@GetMapping("/categories")
	public ResponseEntity<List<Category>> getAllCategories()
	{
		List<Category> allCategories = categoryService.getAllCategories();
		return new ResponseEntity<List<Category>>(allCategories,HttpStatus.OK);
	}
	
	@PostMapping("/categories")
	public ResponseEntity<Category> addCategory(@RequestBody Category category){
		Category addedCategory = categoryService.addCategory(category);
		return new ResponseEntity<Category>(addedCategory,HttpStatus.CREATED);
	}
	
	@DeleteMapping("/categories/{categoryid}")
	public ResponseEntity<Category> deleteCategoryById(@PathVariable("categoryid") Integer categoryid)
	{
		Category deletedCategory = categoryService.deleteCategoryById(categoryid);
		return new ResponseEntity<Category>(deletedCategory,HttpStatus.OK);
	}
}
