package com.shopnow.ordermicroservice.entities;

import java.time.LocalDateTime;

import com.shopnow.ordermicroservice.external.dtos.ProductDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "cartitems")
public class CartItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer cartitemid;
	private Integer productid;
	private Integer customerid;
	private LocalDateTime addedtocartdate;

	@Transient
	private ProductDto product;
}
