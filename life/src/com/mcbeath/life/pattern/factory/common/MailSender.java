package com.mcbeath.life.pattern.factory.common;

public class MailSender implements Sender {

	@Override
	public void send() {
		System.out.println("MailSender.send()");
	}

}
