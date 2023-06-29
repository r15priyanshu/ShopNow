package com.shopnow.usermicroservice.external.dtos;

import java.util.Date;

import lombok.Data;

@Data
public class Order {
	private long orderid;
	private long productid;
	private long customerid;
	private Date orderdate;
}
