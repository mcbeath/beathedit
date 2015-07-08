package com.mcbeath.life.pattern.adapter.clas;

import com.mcbeath.life.pattern.adapter.comm.Source;
import com.mcbeath.life.pattern.adapter.comm.Targetable;

public class Adapter extends Source implements Targetable{

	@Override
	public void method2() {
        System.out.println("Adapter.method2()");		
	}

}
