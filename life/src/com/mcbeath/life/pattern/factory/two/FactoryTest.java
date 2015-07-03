package com.mcbeath.life.pattern.factory.two;

import com.mcbeath.life.pattern.factory.common.Sender;

/**
 * 多个工厂方法模式测试
 * @author HUANGHAITAO062
 *
 */
public class FactoryTest {
     public static void main(String[] args) {
		SendFactory factory = new SendFactory();
		Sender mailSender = factory.createMailInstance();
		mailSender.send();
		Sender smsSender = factory.createSmsInstance();
		smsSender.send();
	}
}
