package com.mcbeath.life.pattern.factory.two;

import com.mcbeath.life.pattern.factory.common.MailSender;
import com.mcbeath.life.pattern.factory.common.Sender;
import com.mcbeath.life.pattern.factory.common.SmsSender;

/**
 * 多个工厂方法模式
 * @author HUANGHAITAO062
 *
 */
public class SendFactory {
    /**
     * 创建短信实例
     * @return
     */
    public Sender createSmsInstance(){
    	 return new SmsSender();
     }
    
    /**
     * 创建邮件实例
     * @return
     */
    public Sender createMailInstance(){
    	return new MailSender();
    }
}
