package com.mcbeath.life.spring.event;
 import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
  
  public class AnimalEventListener implements ApplicationListener {
  
      public void onApplicationEvent(ApplicationEvent event) {
          if (event instanceof AnimalSpeakEvent) {
             AnimalSpeakEvent a = (AnimalSpeakEvent) event;
                 System.out.println("事件监听器" + this.getClass().getSimpleName()+":有一个动物在讲话！它的名字是:"+ a.getAnimalName());
         }
     }
 }