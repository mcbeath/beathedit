package com.mcbeath.life.pattern.singleton;

public class Singleton2 {
	/* 持有私有静态实例，防止被引用，此处赋值为null，目的是实现延迟加载 */  
	private static Singleton2 instance = null;
	
	/*私有构造方法防止被实例化*/
	private Singleton2() {
	}
	
	/*静态工厂方法创建实例*/
	private static synchronized void syncInit(){
		if(instance == null){
			instance = new Singleton2();
		}
	}
	
	public static Singleton2 getInstance(){
		if(instance == null){
			syncInit();
		}
		return instance;
	}
}
