package com.mcbeath.life.pattern.decorator;

/**
 * 1、需要扩展一个类的功能。
   2、动态的为一个对象增加功能，而且还能动态撤销。（继承不能做到这一点，继承的功能是静态的，不能动态增删。）

 * @author HUANGHAITAO062
 *
 */
public class DecoratorTest {
    public static void main(String[] args) {
		Sourceable source = new Source();
		Sourceable decor = new Decorator(source);
		decor.method();
	}
}
