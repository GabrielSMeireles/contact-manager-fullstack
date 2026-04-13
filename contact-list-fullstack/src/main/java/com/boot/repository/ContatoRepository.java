package com.boot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boot.model.Contato;

@Repository
//Repositório que gerencia a persistência dos dados de contato (telefones e e-mails).
public interface ContatoRepository extends JpaRepository<Contato, Integer> {
}
