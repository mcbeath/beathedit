package com.mcbeath.life.pattern.adapter.obj;

import com.mcbeath.life.pattern.adapter.comm.Source;
import com.mcbeath.life.pattern.adapter.comm.Targetable;

public class Wrapper implements Targetable {

	private Source source;
	
	public Wrapper(Source source){
		super();
		this.source = source;
	}
	
	@Override
	public void method1() {
		source.method1();
	}

	@Override
	public void method2() {
		System.out.println("Wrapper.method2()");
	}
  
}
