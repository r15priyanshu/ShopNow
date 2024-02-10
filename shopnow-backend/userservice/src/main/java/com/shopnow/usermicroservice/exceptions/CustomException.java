package com.shopnow.usermicroservice.exceptions;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class CustomException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	private String message;
	private HttpStatus status;
	private LocalDateTime timestamp;

	public CustomException() {
	}

	public CustomException(String message, HttpStatus status) {
		this.status = status;
		this.message = message;
		this.timestamp = LocalDateTime.now();
	}
}
