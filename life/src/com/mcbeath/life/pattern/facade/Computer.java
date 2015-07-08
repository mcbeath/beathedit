package com.mcbeath.life.pattern.facade;

public class Computer {
    private Cpu cpu;
    private Memory memory;
    private Disk disk;
    
    public Computer(){
    	cpu = new Cpu();
    	memory = new Memory();
    	disk = new Disk();
    }
    
    public void startup() {
		cpu.startup();
		memory.startup();
		disk.startup();
	}
}
