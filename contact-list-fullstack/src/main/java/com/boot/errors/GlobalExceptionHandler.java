package com.boot.errors;

import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
//Centralizador de exceções que padroniza as respostas de erro da API para o front-end.
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    //Captura falhas de validação de campos (anotações @Valid) e retorna um mapa com o nome do campo e a mensagem de erro específica.
    public ResponseEntity<Map<String, String>> lidarComErrosDeValidacao(MethodArgumentNotValidException ex) {
        Map<String, String> erros = new HashMap<>();
        
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String nomeCampo = ((FieldError) error).getField();
            String mensagem = error.getDefaultMessage();
            erros.put(nomeCampo, mensagem);
        });
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erros);
    }
    
    @ExceptionHandler(DataIntegrityViolationException.class)
    //Trata violações de integridade do banco de dados, como tentativas de duplicar registros únicos (ex: CPF)
    public ResponseEntity<Map<String, String>> handleDataIntegrity(DataIntegrityViolationException ex) {
        Map<String, String> erro = new HashMap<>();
        String msg = ex.getRootCause() != null ? ex.getRootCause().getMessage() : ex.getMessage();

        if (msg != null && msg.toLowerCase().contains("cpf"))
            erro.put("cpf", "CPF já cadastrado no sistema.");
        else
            erro.put("erro", "Dado duplicado ou inválido: " + msg);

        return ResponseEntity.status(HttpStatus.CONFLICT).body(erro);
    }
    
    @ExceptionHandler(RuntimeException.class)
    //Captura exceções de lógica de negócio lançadas durante a execução, garantindo que mensagens explicando o erro cheguem ao usuário.
    public ResponseEntity<Map<String, String>> handleRuntime(RuntimeException ex) {
        Map<String, String> erro = new HashMap<>();
        String msg = ex.getMessage() != null ? ex.getMessage() : "";
        if (msg.toLowerCase().contains("cpf"))
            erro.put("cpf", msg);
        else
            erro.put("erro", msg);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(erro);
    }
}