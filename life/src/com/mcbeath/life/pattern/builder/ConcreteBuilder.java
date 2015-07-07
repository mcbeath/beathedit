package com.mcbeath.life.pattern.builder;

public class ConcreteBuilder implements Builder {
    Part parta,partB,partC;
	@Override
	public void buildPartA() {
        System.out.println("ConcreteBuilder.buildPartA()");
	}

	@Override
	public void buildPartB() {
        System.out.println("ConcreteBuilder.buildPartB()");
	}

	@Override
	public void buildPartC() {
		System.out.println("ConcreteBuilder.buildPartC()");

	}

	@Override
	public void buildPartD() {
		System.out.println("ConcreteBuilder.buildPartD()");

	}

	@Override
	public Product getResult() {
		System.out.println("ConcreteBuilder.getResult()");
		return null;
	}

}
