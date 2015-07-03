package com.mcbeath.life.pattern.factory.abstractFactory;

import com.mcbeath.life.pattern.factory.common.Sender;
import com.mcbeath.life.pattern.factory.common.SmsSender;

public class SendSmsFactory implements Provider {

	@Override
	public Sender create() {
		return new SmsSender();
	}

}
