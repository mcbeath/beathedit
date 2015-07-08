package com.mcbeath.life.pattern.factory.three;

import com.mcbeath.life.pattern.factory.common.MailSender;
import com.mcbeath.life.pattern.factory.common.Sender;
import com.mcbeath.life.pattern.factory.common.SmsSender;

/**
 * 静态抽象工厂方法
 * @author HUANGHAITAO062
 *
 */
public class SendFactory {
	 public static Sender createInstance(String type){
	    	if("sms".equals(type)){
	    		return new SmsSender();
	    	}else if("mail".equals(type)){
	    		return new MailSender();
	    	}else{
	    		System.out.println("对象类型错误!");
	    		return null;
	    	}
	   }
}
