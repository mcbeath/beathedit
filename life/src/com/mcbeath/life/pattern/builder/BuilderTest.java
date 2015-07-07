package com.mcbeath.life.pattern.builder;

/**
 * 建造者模式测试
 * 
 * 
 * @author HUANGHAITAO062
 *
 */
public class BuilderTest {
     public static void main(String[] args) {
		Builder builder = new ConcreteBuilder();
		Director director = new Director(builder);
		director.construct();
		Product product = builder.getResult();
	}
}
