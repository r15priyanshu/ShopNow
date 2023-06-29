package com.shopnow.productmicroservice.services;

import java.util.List;

import com.shopnow.productmicroservice.entities.Category;

public interface CategoryService {

	List<Category> getAllCategories();
	Category addCategory(Category category);
	Category deleteCategoryById(Integer categoryid);
}
