package com.boot.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "CONTATO")
@Data
//Entidade que armazena os meios de comunicação de um cliente (Telefone, E-mail).
public class Contato extends AbstractEntity {

    @Column(nullable = false)
    private String tipo;

    @Column(nullable = false)
    private String valor;

    private String observacao;

    @ManyToOne
    @JoinColumn(name = "cliente_id_fk", nullable = false)
    //Complementa a gestão da serialização, impedindo que o JSON do contato tente carregar o cliente novamente em um loop.
    @JsonBackReference
    //Estabelece o relacionamento muitos-para-um (@ManyToOne) e mapeia a chave estrangeira no banco de dados.
    private Cliente cliente;
}
