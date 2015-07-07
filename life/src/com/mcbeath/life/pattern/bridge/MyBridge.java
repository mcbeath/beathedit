package com.mcbeath.life.pattern.bridge;

public class MyBridge extends Bridge{
    public void method(){
    	getSource().method();
    }
}
