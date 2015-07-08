package com.mcbeath.life.pattern.factory.three;

import com.mcbeath.life.pattern.factory.common.Sender;

/**
 * 静态工厂方法模式
 * @author HUANGHAITAO062
 *
 */
public class FactoryTest {

	public static void main(String[] args) {
		Sender sender = SendFactory.createInstance("sms");
        sender.send();
	}

}
