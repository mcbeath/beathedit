package com.mcbeath.life.pattern.adapter.obj;

import com.mcbeath.life.pattern.adapter.comm.Source;
import com.mcbeath.life.pattern.adapter.comm.Targetable;

public class AdapterTest {
    public static void main(String[] args) {
		Source source =  new Source();
		Targetable target = new Wrapper(source);
		target.method1();
		target.method2();
	}
}
