package com.mcbeath.life.spring.event;

import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
 public class TestMain {
  
      public static void main(String[] args) {
  
         AbstractApplicationContext ac = new ClassPathXmlApplicationContext(
                 "applicationContext.xml");
 
         //从容器获取动物实例
         Animal animal = (Animal)ac.getBean("Animal");
 
         //让动物讲话
         System.out.println(animal.speak());                
     }
 }