package com.mcbeath.life.pattern.adapter.interfac;

/**
 * 类的适配器模式：当希望将一个类转换成满足另一个新接口的类时，可以使用类的适配器模式，创建一个新类，继承原有的类，实现新的接口即可。

对象的适配器模式：当希望将一个对象转换成满足另一个新接口的对象时，可以创建一个Wrapper类，持有原类的一个实例，在Wrapper类的方法中，调用实例的方法就行。

接口的适配器模式：当不希望实现一个接口中所有的方法时，可以创建一个抽象类Wrapper，实现所有方法，我们写别的类的时候，继承抽象类即可。


 * @author HUANGHAITAO062
 *
 */
public class WrapperTest {
    
	public static void main(String[] args) {
		SourceSub1 sub1 = new SourceSub1();
	    SourceSub2 sub2 = new SourceSub2();
	    sub1.method1();
	    sub1.method2();
	    sub2.method1();
	    sub2.method2();
	}
    
}
