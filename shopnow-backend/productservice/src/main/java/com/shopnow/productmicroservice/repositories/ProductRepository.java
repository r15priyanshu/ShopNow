package com.shopnow.productmicroservice.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopnow.productmicroservice.entities.Category;
import com.shopnow.productmicroservice.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

	List<Product> findProductByCategory(Category category);
}
