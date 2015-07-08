package com.mcbeath.life.pattern.factory.one;

import com.mcbeath.life.pattern.factory.common.Sender;

public class FactoryTest {

	public static void main(String[] args) {
		SendFactory factory = new SendFactory();
		Sender sender = factory.createInstance("sms");
		sender.send();
		Sender sender2 = factory.createInstance("mail");
		sender2.send();

	}

}
