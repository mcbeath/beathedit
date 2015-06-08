package com.mcbeath.life.spring.event;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class Animal implements ApplicationContextAware {
	private ApplicationContext ac;
	private String name;

	private int age;

	public String speak() {

		ac.publishEvent(new AnimalSpeakEvent(this, this.name));
		return " 我的名字是;" + this.name + ",我的年龄是:" + this.age;
	}

	public void setApplicationContext(ApplicationContext arg0)
			throws BeansException {
		this.ac = arg0;
	}

	// Getet和Seter省略

}