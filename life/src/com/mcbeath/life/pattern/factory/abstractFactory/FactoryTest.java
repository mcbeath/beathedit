package com.mcbeath.life.pattern.factory.abstractFactory;

import com.mcbeath.life.pattern.factory.common.Sender;

/**
 * 抽象工厂方法模式
 * 理念是不在原工厂方法增加代码，其它类型发送信息，则只需做一个实现类，实现Sender接口，同时做一个工厂类，实现Provider接口
 * @author HUANGHAITAO062
 * http://www.cnblogs.com/maowang1991/archive/2013/04/15/3023236.html
 *
 */
public class FactoryTest {

	public static void main(String[] args) {
        Provider provider = new SendMailFactory();
        Sender sender = provider.create();
        sender.send();
	}

}
