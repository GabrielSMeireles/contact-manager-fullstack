package com.boot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.model.Cliente;
import com.boot.model.Contato;
import com.boot.repository.ClienteRepository;
import com.boot.repository.ContatoRepository;

import jakarta.transaction.Transactional;

@Service
//Classe que gerencia as regras de criação, edição e remoção de contatos vinculados.
public class ContatoService {

    @Autowired
    private ContatoRepository contatoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Transactional
    // Localiza o cliente proprietário e estabelece a relação necessária para salvar um novo contato.
    public Contato salvar(Integer clienteId, Contato contato) {
        Cliente cliente = clienteRepository.findById(clienteId)
            .orElseThrow(() -> new RuntimeException("Cliente não encontrado."));
        contato.setCliente(cliente);
        return contatoRepository.save(contato);
    }

    @Transactional
    // Implementa a lógica de atualização parcial, preservando o ID e modificando apenas os campos permitidos.
    public Contato atualizar(Integer id, Contato dadosNovos) {
        Contato existente = contatoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Contato não encontrado."));
        existente.setTipo(dadosNovos.getTipo());
        existente.setValor(dadosNovos.getValor());
        existente.setObservacao(dadosNovos.getObservacao());
        return contatoRepository.save(existente);
    }

    @Transactional
    // Garante que a remoção de um contato seja feita de forma isolada e segura após validação.
    public void excluir(Integer id) {
        if (!contatoRepository.existsById(id))
            throw new RuntimeException("Contato não encontrado.");
        contatoRepository.deleteById(id);
    }
}