package com.mcbeath.life.pattern.factory.abstractFactory;

import com.mcbeath.life.pattern.factory.common.MailSender;
import com.mcbeath.life.pattern.factory.common.Sender;

public class SendMailFactory implements Provider {

	@Override
	public Sender create() {
		return new MailSender();
	}

}
