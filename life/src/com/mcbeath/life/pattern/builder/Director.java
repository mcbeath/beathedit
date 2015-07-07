package com.mcbeath.life.pattern.builder;

public class Director {
    private Builder builder;
    public Director(Builder builder){
    	this.builder = builder;
    }
    //将各个部件组成复杂的对象
    public void construct(){
    	builder.buildPartA();
    	builder.buildPartB();
    	builder.buildPartC();
    	builder.buildPartD();
    }
}
