package com.mcbeath.life.pattern.builder;

public interface Builder {
    //创建部件A
	void buildPartA();
	//创建部件B
	void buildPartB();
	//创建部件C
	void buildPartC();
	//创建部件D
	void buildPartD();
	
	//返回组装成品的结果
	Product getResult();
}
