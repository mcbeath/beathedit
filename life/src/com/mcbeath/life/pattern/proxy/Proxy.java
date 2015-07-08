package com.mcbeath.life.pattern.proxy;

public class Proxy implements Sourceable {
    
	private Source source;
	
	public Proxy(){
		super();
		this.source = new Source();
	}
	
	@Override
	public void metho() {
	    before();
	    source.metho();
	    after();

	}

	private void after() {
		System.out.println("Proxy.after()");
		
	}

	private void before() {
		System.out.println("Proxy.before()");
	}

}
