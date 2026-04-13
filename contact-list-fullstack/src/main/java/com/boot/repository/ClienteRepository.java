package com.boot.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boot.model.Cliente;

@Repository
//Interface que herda as operações padrão de banco de dados (CRUD) do Spring Data JPA.
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

	// Verifica a existência de um CPF no banco para evitar duplicidade em novos cadastros.
    boolean existsByCpf(String cpf);
    
    // Realiza busca filtrada por nome ou CPF, ignorando maiúsculas/minúsculas e com paginação.
    Page<Cliente> findByNomeContainingIgnoreCaseOrCpfContaining(String nome, String cpf, Pageable pageable);
    
    // Valida se um CPF já pertence a outro cliente, caso seja do mesmo cliente segue com a edição.
	boolean existsByCpfAndIdNot(String cpf, Integer id);
}
