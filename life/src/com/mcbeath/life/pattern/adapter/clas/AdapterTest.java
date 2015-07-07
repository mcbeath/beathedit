package com.mcbeath.life.pattern.adapter.clas;

import com.mcbeath.life.pattern.adapter.comm.Targetable;

public class AdapterTest {
    public static void main(String[] args) {
		Targetable target = new Adapter();
		target.method1();
		target.method2();
	}
}
