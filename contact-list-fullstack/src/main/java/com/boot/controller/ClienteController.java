package com.boot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.boot.model.Cliente;
import com.boot.service.ClienteService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
//Gerencia todas as operações relacionadas aos Clientes (CRUD e buscas)
public class ClienteController {

    @Autowired
    private ClienteService service;

    @PostMapping
    // Registra um novo cliente garantindo a validação dos dados de entrada
    public ResponseEntity<Cliente> cadastrar(@Valid @RequestBody Cliente cliente) {
        Cliente salvo = service.salvarCliente(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @GetMapping
    // Retorna a listagem de clientes com paginação para otimizar a performance do front-end
    public ResponseEntity<Page<Cliente>> listar(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return ResponseEntity.ok(service.listarPaginado(page, size));
    }

    @GetMapping("/buscar")
    // Implementa busca que permite filtrar clientes por Nome ou CPF
    public ResponseEntity<Page<Cliente>> buscar(
            @RequestParam String termo,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return ResponseEntity.ok(service.buscar(termo, page, size));
    }
    
    @GetMapping("/{id}")
    // Recupera os detalhes de um cliente através de seu ID
    public ResponseEntity<Cliente> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @DeleteMapping("/{id}")
    // Remove um cliente do sistema; as regras de cascata tratam a exclusão dos contatos
    public ResponseEntity<Void> excluir(@PathVariable Integer id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/{id}")
    // Atualiza as informações de um cliente com base no ID
    public ResponseEntity<Cliente> atualizar(@PathVariable Integer id, @Valid @RequestBody Cliente cliente) {
        cliente.setId(id);
        Cliente atualizado = service.salvarCliente(cliente);
        return ResponseEntity.ok(atualizado);
    }
}