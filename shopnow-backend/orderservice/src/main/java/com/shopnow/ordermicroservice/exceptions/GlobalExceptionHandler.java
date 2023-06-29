package com.shopnow.ordermicroservice.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.shopnow.ordermicroservice.dtos.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(CustomException.class)
	public ResponseEntity<ApiResponse> handleCustomException(CustomException e) {
		ApiResponse response = ApiResponse.builder().message(e.getMessage()).status(e.getStatus())
				.statuscode(e.getStatus().value()).timestamp(e.getTimestamp()).build();

		return new ResponseEntity<ApiResponse>(response, e.getStatus());
	}
}
