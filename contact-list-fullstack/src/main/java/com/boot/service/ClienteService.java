package com.boot.service;

import org.springframework.data.domain.Pageable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.boot.model.Cliente;
import com.boot.repository.ClienteRepository;

import jakarta.transaction.Transactional;


@Service
//Camada de serviço responsável pela lógica de negócio.
public class ClienteService {

	// Injeção de dependência para acesso aos métodos do repositório.
    @Autowired
    private ClienteRepository repository;

    // Garante que as operações no banco sejam executadas de forma atômica.
    @Transactional
    // Valida a regra de negócio do CPF e vincula os objetos de contato antes de persistir o cliente.
    public Cliente salvarCliente(Cliente cliente) {
        boolean cpfDuplicado = cliente.getId() == null
            ? repository.existsByCpf(cliente.getCpf())
            : repository.existsByCpfAndIdNot(cliente.getCpf(), cliente.getId());

        if (cpfDuplicado) throw new RuntimeException("CPF já cadastrado no sistema!");

        if (cliente.getContatos() != null)
            cliente.getContatos().forEach(c -> c.setCliente(cliente));

        return repository.save(cliente);
    }
    
    // Organiza a recuperação de dados em páginas, otimizando o consumo de memória e a performance da API.
    public Page<Cliente> listarPaginado(int pagina, int tamanho) {
        Pageable pageable = PageRequest.of(pagina, tamanho);
        return repository.findAll(pageable);
    }

    // Centraliza a lógica de busca dinâmica enviando o termo de pesquisa para o repositório.
    public Page<Cliente> buscar(String termo, int pagina, int tamanho) {
        Pageable pageable = PageRequest.of(pagina, tamanho);
        return repository.findByNomeContainingIgnoreCaseOrCpfContaining(termo, termo, pageable);
    }
    
    // Busca um registro e gerencia a resposta caso o cliente não seja encontrado.
    public Cliente buscarPorId(Integer id) {
        return repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Cliente não encontrado."));
    }
    
    @Transactional 
    // Verifica a existência do registro antes de efetuar a remoção do cliente.
    public void excluir(Integer id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Cliente não encontrado para exclusão.");
        }
        repository.deleteById(id);
    }

}