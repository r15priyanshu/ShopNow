package com.shopnow.productmicroservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shopnow.productmicroservice.entities.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Integer>{

}
