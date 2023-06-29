package com.shopnow.productmicroservice.dtos;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApiResponse {
	private String message;
	private LocalDateTime timestamp;
	private HttpStatus status;
	private int statuscode;

	public ApiResponse(String message, LocalDateTime timestamp, HttpStatus status, int statuscode) {
		super();
		this.message = message;
		this.timestamp = timestamp;
		this.status = status;
		this.statuscode = statuscode;
	}
}