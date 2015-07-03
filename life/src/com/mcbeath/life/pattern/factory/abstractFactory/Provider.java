package com.mcbeath.life.pattern.factory.abstractFactory;

import com.mcbeath.life.pattern.factory.common.Sender;

public interface Provider {
	
	/**
	 * 创建实例
	 * @return
	 */
	public Sender create();
}
