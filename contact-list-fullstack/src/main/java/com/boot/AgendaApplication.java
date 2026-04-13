package com.boot;
//Ponto de entrada que inicia o servidor e o Spring Boot
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AgendaApplication {
    public static void main(String[] args) {
    	// Método que dispara a inicialização da aplicação
        SpringApplication.run(AgendaApplication.class, args);
    }
}