package com.boot.model;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.validator.constraints.br.CPF;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Data;

@Entity
@Table(name = "clientes")
@Data
//Representa a entidade principal do sistema, mapeando dados pessoais, validações de documentos (CPF) e informações de endereço.
public class Cliente extends AbstractEntity {
    @NotBlank(message = "O nome do cliente é obrigatório e não pode estar vazio.")
    @Column(nullable = false, length = 100)
    private String nome;

    @NotBlank(message = "O CPF é obrigatório.")
    @CPF(message = "Formato de CPF inválido.")
    @Column(nullable = false, unique = true, length = 14)
    private String cpf;

    @PastOrPresent(message = "A data de nascimento não pode estar no futuro.")
    @Column(name = "data_nascimento", nullable = true)
    private LocalDate dataNascimento;
    
    @Column(name = "cep", length = 9)
    private String cep;

    @Column(name = "logradouro", length = 255)
    private String logradouro;

    @Column(name = "numero", length = 20)
    private String numero;

    @Column(name = "complemento", length = 100)
    private String complemento;

    @Column(name = "bairro", length = 100)
    private String bairro;

    @Column(name = "cidade", length = 100)
    private String cidade;

    @Column(name = "estado", length = 2)
    private String estado;
    
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    //Gerencia a serialização JSON para evitar recursão ao listar clientes e seus respectivos contatos.
    @JsonManagedReference
    //Define o relacionamento um-para-muitos (@OneToMany). A configuração orphanRemoval = true garante que contatos removidos da lista sejam deletados automaticamente do banco.
    private List<Contato> contatos;
}
