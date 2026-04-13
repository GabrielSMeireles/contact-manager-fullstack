package com.boot.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@MappedSuperclass
@Data
//Classe base que utiliza @MappedSuperclass para centralizar atributos comuns (como o ID) e evitar repetição de código em todas as entidades.
public abstract class AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //Define a chave primária única para todas as tabelas com estratégia de auto-incremento.
    private Integer id;
}