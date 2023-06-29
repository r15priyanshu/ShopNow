package com.shopnow.productmicroservice.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.shopnow.productmicroservice.entities.Category;
import com.shopnow.productmicroservice.exceptions.CustomException;
import com.shopnow.productmicroservice.repositories.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public List<Category> getAllCategories() {

		return categoryRepository.findAll();
	}

	@Override
	public Category addCategory(Category category) {

		return categoryRepository.save(category);
	}

	@Override
	public Category deleteCategoryById(Integer categoryid) {
		Category foundCategory = categoryRepository.findById(categoryid).orElseThrow(()->new CustomException("Category not found with id:"+categoryid,HttpStatus.NOT_FOUND));
		categoryRepository.delete(foundCategory);
		return foundCategory;
	}

}
