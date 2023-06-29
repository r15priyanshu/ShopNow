package com.shopnow.ordermicroservice.external.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ProductDto {

	private Integer pid;
	private String name;
	private String description;
	private String productimage;
	private int price;
	private CategoryDto category;
}
