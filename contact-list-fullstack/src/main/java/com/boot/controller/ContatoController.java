package com.boot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.boot.model.Contato;
import com.boot.service.ContatoService;

@RestController
@CrossOrigin(origins = "*")
//Controller para a gestão de contatos (e-mails e telefones)
public class ContatoController {

    @Autowired
    private ContatoService service;

    @PostMapping("/api/clientes/{clienteId}/contatos")
    // Associa um novo contato a um cliente já existente
    public ResponseEntity<Contato> salvar(
            @PathVariable Integer clienteId,
            @RequestBody Contato contato) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(service.salvar(clienteId, contato));
    }

    @PutMapping("/api/contatos/{id}")
    // Permite a edição de um contato
    public ResponseEntity<Contato> atualizar(
            @PathVariable Integer id,
            @RequestBody Contato dadosNovos) {
        return ResponseEntity.ok(service.atualizar(id, dadosNovos));
    }

    @DeleteMapping("/api/contatos/{id}")
    // Remove um contato sem afetar o cadastro do cliente
    public ResponseEntity<Void> excluir(@PathVariable Integer id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
