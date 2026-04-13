# 📋 Agenda de Contatos — Comércio S.A.

![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.0.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-CDN-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Status](https://img.shields.io/badge/status-concluído-brightgreen?style=for-the-badge)

> Sistema fullstack de gestão de agenda de contatos, desenvolvido como solução para o Desafio Técnico do Programa de Estágio da Muralis. Permite o cadastro, edição, exclusão e listagem de clientes e seus respectivos contatos (e-mails e telefones), com validação dupla, no frontend e no backend, e arquitetura REST com Java Spring Boot 🍃.

---

## 📄 Sumário

1. [Visão Geral](#-visão-geral)
2. [Principais Funcionalidades](#-principais-funcionalidades)
3. [Arquitetura e Organização](#-arquitetura-e-organização)
4. [Estrutura do Projeto](#-estrutura-do-projeto)
5. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
6. [Pré-requisitos](#-pré-requisitos)
7. [Como Executar](#-como-executar)
8. [Endpoints da API](#-endpoints-da-api)
9. [Checklist de Requisitos](#-checklist-de-requisitos)
10. [Uso de Inteligência Artificial](#-uso-de-inteligência-artificial)
11. [Referências](#-referências)
12. [Autor](#-autor)

---

## 🔍 Visão Geral

A **Agenda de Contatos** é uma aplicação fullstack que moderniza a gestão de clientes da Comércio S.A., substituindo uma agenda física por um sistema digital completo. A solução contempla:

* Cadastro e gerenciamento completo de clientes com dados pessoais e endereço
* Múltiplos contatos por cliente (e-mail e telefone)
* Busca dinâmica por nome ou CPF com paginação
* Validação de CPF com regras de unicidade
* Autopreenchimento de endereço via integração com a API ViaCEP
* Interface responsiva com edição inline de contatos diretamente na listagem
* API REST documentada com tratamento centralizado de erros

---

## ⭐ Principais Funcionalidades

1. **Gestão de Clientes**
   * Cadastro com nome, CPF, data de nascimento e endereço completo (CEP, logradouro, número, complemento, bairro, cidade, estado)
   * Edição e exclusão de clientes
   * Listagem paginada com contador de registros
   * Busca em tempo real por nome ou CPF

2. **Gestão de Contatos**
   * Cadastro de múltiplos contatos por cliente (tipo, valor e observação)
   * Edição inline diretamente no card da listagem, sem recarregar a página
   * Exclusão individual de contatos
   * Exclusão em cascata ao remover o cliente

3. **Validações**
   * Client-side: campos obrigatórios, formato de CPF, data de nascimento válida e não futura
   * Server-side: `@Valid`, `@CPF` (Hibernate Validator), unicidade de CPF, `@RestControllerAdvice`

4. **Integrações**
   * API ViaCEP para autopreenchimento automático do endereço ao digitar o CEP
   * Máscara de formatação para CPF e CEP no frontend

---

## 🏗️ Arquitetura e Organização

O projeto segue o padrão **Controller → Service → Repository**, separando as responsabilidades em camadas:

* **Controllers** — recebem as requisições HTTP, aplicam validações de entrada e delegam a lógica para os serviços
* **Services** — contêm as regras de negócio (validação de CPF duplicado, cascade de contatos, etc.)
* **Repositories** — gerenciam o acesso ao banco de dados via Spring Data JPA
* **Model** — entidades JPA que mapeiam as tabelas `clientes` e `CONTATO`
* **Errors** — `GlobalExceptionHandler` centraliza o tratamento de exceções e padroniza as respostas de erro para o frontend
* **Frontend** — JavaScript modularizado em quatro arquivos com responsabilidades separadas: `api.js`, `render.js`, `validacao.js` e `app.js`

---

## 📂 Estrutura do Projeto

```
agenda-contatos-fullstack/
│
├── contact-list-fullstack/              # Backend — API REST Spring Boot
│   └── src/main/java/com/boot/
│       ├── AgendaApplication.java           # Ponto de entrada da aplicação Spring Boot
│       ├── model/
│       │   ├── AbstractEntity.java          # Classe base com ID compartilhado entre entidades
│       │   ├── Cliente.java                 # Entidade JPA — dados pessoais, endereço e contatos
│       │   └── Contato.java                 # Entidade JPA — tipo, valor e observação do contato
│       ├── controller/
│       │   ├── ClienteController.java       # Endpoints REST de cliente (CRUD + busca + paginação)
│       │   └── ContatoController.java       # Endpoints REST de contato (criar, editar, excluir)
│       ├── service/
│       │   ├── ClienteService.java          # Regras de negócio: CPF único, cascade, paginação
│       │   └── ContatoService.java          # Regras de negócio: vincular, editar e remover contatos
│       ├── repository/
│       │   ├── ClienteRepository.java       # Consultas JPA: busca por nome/CPF, verificação de duplicatas
│       │   └── ContatoRepository.java       # Repositório padrão de contatos
│       ├── errors/
│       │   └── GlobalExceptionHandler.java  # Tratamento centralizado de exceções da API REST
│       └── resources/
│           └── application.properties       # Configuração do banco de dados e porta do servidor
│
├── front-end/                           # Frontend — HTML, CSS, JavaScript
│   ├── images/
│   │   └── logo-comercio.png                # Logotipo exibido na barra lateral
│   ├── js/
│   │   ├── api.js                           # Chamadas fetch centralizadas para a API REST
│   │   ├── validacao.js                     # Validação de formulários e exibição de erros
│   │   ├── render.js                        # Geração de cards, paginação e componentes visuais
│   │   └── app.js                           # Orquestrador — eventos, cadastro, edição e CEP
│   ├── listagemDeClientes.html              # Tela principal: listagem, busca e gestão de contatos
│   └── cadastroDeClientes.html              # Tela de cadastro e edição de clientes
│
├── entregaveis/
│   ├── fluxograma-cadastro-cliente.png      # Fluxograma do processo de cadastro (draw.io)
│   └── demonstracao.mp4                     # Vídeo demonstrativo do sistema em execução
│
├── popular-banco.sql                    # Script de criação e população do banco de dados
└── README.md
```

---

## 🔧 Tecnologias Utilizadas

| Camada | Tecnologia |
|--------|------------|
| **Linguagem** | Java 17 |
| **Framework** | Spring Boot 4.0.5 |
| **Persistência** | Spring Data JPA + Hibernate |
| **Validação** | Spring Validation + Hibernate Validator (`@CPF`) |
| **Banco de dados** | MySQL 8.0 |
| **Redução de código** | Lombok (`@Data`, `@Getter`, `@Setter`) |
| **Frontend** | HTML5, CSS3, JavaScript ES2022 |
| **Estilização** | Tailwind CSS (via CDN) |
| **Ícones** | Google Material Symbols |
| **Tipografia** | Google Fonts — Manrope + Inter |
| **Integração de CEP** | API ViaCEP |
| **Gerenciador de build** | Apache Maven |

---

## ✅ Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

* [Java 17+](https://adoptium.net/)
* [Apache Maven 3.8+](https://maven.apache.org/)
* [MySQL 8.0](https://dev.mysql.com/downloads/) rodando localmente
* Navegador moderno (Chrome, Firefox ou Edge)
* [VS Code](https://code.visualstudio.com/) com extensão **Live Server** (recomendado para o frontend)

---

## 🚀 Como Executar

### Pré-requisitos

- Java JDK 17 ou superior instalado
- Maven 3.8+
- MySQL 8 instalado e em execução
- Navegador moderno (Chrome, Firefox, Edge)
- Extensão **Live Server** no VS Code (recomendado para o frontend)
- Spring Tool Suite (STS) versão Eclipse instalado  

---

### 1. Banco de dados

Crie o banco e execute o script de população:

```sql
-- O banco é criado automaticamente pelo Spring (createDatabaseIfNotExist=true)
-- Basta executar o script de população:
source popular-banco.sql;
```

Ou importe o arquivo `popular-banco.sql` diretamente pelo MySQL Workbench ou DBeaver.

---

### 2. Configuração do ambiente

No **Spring Tool Suite (STS)** ou **Eclipse**:

1. Importe o projeto:
   - Vá em `File > Import > Existing Maven Project`
   - Selecione a pasta do repositório clonado (`contact-list-fullstack`)

2. Configure o Java:
   - Vá em `Window > Preferences > Java > Installed JREs`
   - Verifique se a versão do Java selecionada é a mais recente (JDK 17+)
   - Caso não esteja:
     - Clique em **Add**
     - Selecione **Standard VM**
     - Aponte para: `C:\Program Files\Java\` e escolha a pasta do seu JDK
     - Marque como padrão

---

### 3. Backend

Configure as credenciais em `contact-list-fullstack/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/contact-list?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=sua_senha
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

server.port=8081
```

Execute o projeto pelo STS/Eclipse:

- Clique com o botão direito no projeto  
- Vá em `Run As > Spring Boot App`  

A API estará disponível em: `http://localhost:8081/api`

---

### 4. Inicie o frontend

Abra a pasta `front-end/` no VS Code e inicie o **Live Server**, ou acesse diretamente no navegador:

```
front-end/listagemDeClientes.html
```

> A URL base da API está em `front-end/js/api.js`:
> ```javascript
> const API = 'http://localhost:8081/api';
> ```

---

## 📌 Endpoints da API

### Clientes

| Método | Rota | Descrição | Status |
|--------|------|-----------|--------|
| `GET` | `/api/clientes?page=0&size=10` | Listagem paginada | 200 |
| `GET` | `/api/clientes/buscar?termo=X` | Busca por nome ou CPF | 200 |
| `GET` | `/api/clientes/{id}` | Buscar cliente por ID | 200 |
| `POST` | `/api/clientes` | Cadastrar novo cliente | 201 |
| `PUT` | `/api/clientes/{id}` | Atualizar cliente | 200 |
| `DELETE` | `/api/clientes/{id}` | Excluir cliente e contatos | 204 |

### Contatos

| Método | Rota | Descrição | Status |
|--------|------|-----------|--------|
| `POST` | `/api/clientes/{id}/contatos` | Adicionar contato ao cliente | 201 |
| `PUT` | `/api/contatos/{id}` | Editar contato | 200 |
| `DELETE` | `/api/contatos/{id}` | Excluir contato | 204 |

---

## ☑️ Checklist de Requisitos

**Funcionais**

- [x] RF01 — Cadastro de cliente: nome, CPF, data de nascimento e endereço completo
- [x] RF02 — Edição de cliente
- [x] RF03 — Exclusão de cliente
- [x] RF04 — Listagem paginada de clientes
- [x] RF05 — Busca por nome ou CPF
- [x] RF06 — Cadastro de contatos (tipo, valor, observação)
- [x] RF07 — Edição de contato inline
- [x] RF08 — Exclusão de contato
- [x] RF09 — Listagem de contatos por cliente no card da listagem

**Regras de Negócio**

- [x] RN01 — Nome e CPF obrigatórios no cadastro
- [x] RN02 — Tipo e Valor do contato obrigatórios
- [x] RN03 — CPF único no sistema (validado no frontend e no backend)
- [x] RN04 — Nome não pode estar vazio
- [x] RN05 — Data de nascimento válida e não futura
- [x] RN06 — Cliente pode ter múltiplos contatos
- [x] RN07 — Exclusão de cliente remove todos os contatos (`CascadeType.ALL` + `orphanRemoval = true`)
- [x] RN08 — Validação dupla: client-side (JavaScript) e server-side (`@Valid` + `@RestControllerAdvice`)

**Extras implementados além dos requisitos**

- [x] Paginação com navegação por páginas e contador de registros
- [x] Autopreenchimento de endereço via CEP (API ViaCEP)
- [x] Máscara de formatação para CPF e CEP no frontend
- [x] Formulário unificado de cadastro e edição (mesmo HTML, fluxo por parâmetro `?id=` na URL)
- [x] Edição inline de contatos diretamente na listagem, sem recarregar a página
- [x] JavaScript modularizado em quatro arquivos com responsabilidades separadas
- [x] Feedback visual de erros campo a campo no formulário

---

## 🤖 Uso de Inteligência Artificial

Sim, a ferramenta **Claude** (Anthropic) foi utilizada como apoio ao desenvolvimento.

**Como foi utilizada:**

* **Design da interface** — o layout visual das telas, a escolha da paleta de cores, tipografia e componentes foram criados com auxílio da IA, que gerou o HTML e o CSS com Tailwind CSS já estruturados e responsivos

* **Migração de arquitetura** — o curso de referência utilizado adota o padrão MVC com **Thymeleaf** (renderização server-side). A IA auxiliou na reestruturação da aplicação para o modelo **REST**, orientando como expor os dados via `@RestController` e consumir a API no frontend com `fetch()`

* **Anotações do Spring (annotations)** — a IA explicou e auxiliou na aplicação correta das *annotations* do ecossistema Spring e Jakarta, como `@RestController`, `@RequestMapping`, `@Valid`, `@ExceptionHandler`, `@RestControllerAdvice`, `@OneToMany`, `@ManyToOne`, `@JsonManagedReference` e `@JsonBackReference`, que não foram abordadas no curso com o mesmo nível de profundidade

**Impacto:**

A IA acelerou a curva de aprendizado nos pontos onde o conteúdo do curso não cobria a abordagem REST, e reduziu o tempo gasto com pesquisa e consulta a documentações. Todas as decisões de arquitetura, modelagem de dados e implementação foram compreendidas e validadas ao longo do processo.

---

## 📚 Referências

DANTAS, Thiago. **Spring Boot MVC com Thymeleaf**. Udemy, 2023. Disponível em: [https://www.udemy.com/course/spring-boot-mvc-com-thymeleaf/](https://www.udemy.com/course/spring-boot-mvc-com-thymeleaf/). Acesso em: abr. 2026.

SPRING. **Spring Boot Reference Documentation**. Disponível em: [https://docs.spring.io/spring-boot/docs/current/reference/html/](https://docs.spring.io/spring-boot/docs/current/reference/html/). Acesso em: abr. 2026.

SPRING. **Spring Data JPA Reference Documentation**. Disponível em: [https://docs.spring.io/spring-data/jpa/reference/jpa.html](https://docs.spring.io/spring-data/jpa/reference/jpa.html). Acesso em: abr. 2026.

HIBERNATE. **Hibernate Validator — Jakarta Bean Validation Reference Guide**. Disponível em: [https://docs.jboss.org/hibernate/validator/8.0/reference/en-US/html_single/](https://docs.jboss.org/hibernate/validator/8.0/reference/en-US/html_single/). Acesso em: abr. 2026.

VIACEP. **ViaCEP — Webservice CEP e IBGE gratuito**. Disponível em: [https://viacep.com.br/](https://viacep.com.br/). Acesso em: abr. 2026.

TAILWIND LABS. **Tailwind CSS Documentation**. Disponível em: [https://tailwindcss.com/docs](https://tailwindcss.com/docs). Acesso em: abr. 2026.

GOOGLE. **Material Symbols**. Disponível em: [https://fonts.google.com/icons](https://fonts.google.com/icons). Acesso em: abr. 2026.

MDN WEB DOCS. **Fetch API**. Mozilla Foundation. Disponível em: [https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). Acesso em: abr. 2026.

---

## 👨‍💻 Autor

Gabriel Meireles Desenvolvedor em formação com foco em desenvolvimento Fullstack.

[![GitHub](https://img.shields.io/badge/GitHub-GabrielSMeireles-181717?style=for-the-badge&logo=github)](https://github.com/GabrielSMeireles)

---

> Projeto desenvolvido com foco em aplicar boas práticas de arquitetura REST, separação de responsabilidades e validação de dados em um sistema fullstack funcional.
