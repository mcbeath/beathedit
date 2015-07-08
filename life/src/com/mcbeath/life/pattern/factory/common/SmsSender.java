package com.mcbeath.life.pattern.factory.common;

public class SmsSender implements Sender {

	@Override
	public void send() {
		System.out.println("SemsSender.send()");
	}

}
