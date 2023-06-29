package com.shopnow.ordermicroservice.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ShippingDetailsDto {
	private String fullname;
	private String mobile;
	private String address;
	private String paymenttype;
	private String email;
}
