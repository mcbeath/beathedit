package com.mcbeath.life.spring.event;
  
  import org.springframework.context.ApplicationEvent;
  
  public class AnimalSpeakEvent extends ApplicationEvent {
  
      private static final long serialVersionUID = 1L;
  
      private String animalName;
 
     public AnimalSpeakEvent(Object source) {
         super(source);
     }
 
     public AnimalSpeakEvent(Object source,String animalName) {
         super(source);
         this.animalName = animalName;
     }
 
     public String getAnimalName() {
         return animalName;
     }
 }