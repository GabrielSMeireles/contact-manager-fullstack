-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS contact-list;

-- Seleciona o banco
USE contact-list;

-- Criação das tabelas

CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    data_nascimento DATE,
    cep VARCHAR(10),
    logradouro VARCHAR(150),
    numero VARCHAR(10),
    complemento VARCHAR(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado CHAR(2)
);

CREATE TABLE IF NOT EXISTS contato (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50),
    valor VARCHAR(150),
    observacao VARCHAR(150),
    cliente_id_fk INT,
    CONSTRAINT fk_cliente
        FOREIGN KEY (cliente_id_fk)
        REFERENCES clientes(id)
        ON DELETE CASCADE
);

-- 1. Desliga a verificação de chaves estrangeiras
SET FOREIGN_KEY_CHECKS = 0;

-- 2. Limpa as tabelas e reseta o AUTO_INCREMENT
TRUNCATE TABLE contato;
TRUNCATE TABLE clientes;

-- 3. Religa a verificação de segurança
SET FOREIGN_KEY_CHECKS = 1;

-- ─── CLIENTES ────────────────────────────────────────────────
INSERT INTO clientes (nome, cpf, data_nascimento, cep, logradouro, numero, complemento, bairro, cidade, estado) VALUES
('Ana Carolina Silva',        '111.444.777-35', '1990-03-15', '01310-100', 'Rua das Flores',                   '123',  NULL,        'Jardim Primavera',    'São Paulo',       'SP'),
('Bruno Henrique Costa',      '222.555.888-46', '1985-07-22', '01310-200', 'Av. Paulista',                     '1000', NULL,        'Bela Vista',          'São Paulo',       'SP'),
('Carla Fernanda Oliveira',   '333.666.999-57', '1992-11-08', '80020-180', 'Rua XV de Novembro',               '45',   NULL,        'Centro',              'Curitiba',        'PR'),
('Diego Augusto Mendes',      '444.777.000-68', '1988-04-30', '88015-200', 'Av. Beira Mar',                    '500',  NULL,        'Centro',              'Florianópolis',   'SC'),
('Eduarda Martins Ferreira',  '555.888.111-79', '1995-09-12', '90010-110', 'Rua Sete de Setembro',             '78',   NULL,        'Centro',              'Porto Alegre',    'RS'),
('Felipe Rodrigues Santos',   '666.999.222-80', '1983-01-25', '20040-020', 'Av. Rio Branco',                   '200',  NULL,        'Centro',              'Rio de Janeiro',  'RJ'),
('Gabriela Alves Pereira',    '777.000.333-91', '1997-06-18', '51021-340', 'Rua das Palmeiras',                '34',   NULL,        'Boa Viagem',          'Recife',          'PE'),
('Henrique Lima Souza',       '888.111.444-02', '1980-12-05', '30130-100', 'Av. Afonso Pena',                  '789',  NULL,        'Centro',              'Belo Horizonte',  'MG'),
('Isabela Castro Nunes',      '999.222.555-13', '1993-08-27', '90570-080', 'Rua Padre Chagas',                 '56',   NULL,        'Moinhos de Vento',    'Porto Alegre',    'RS'),
('João Victor Barbosa',       '000.333.666-24', '1987-02-14', '51020-010', 'Av. Domingos Ferreira',            '123',  NULL,        'Boa Viagem',          'Recife',          'PE'),
('Karen Cristina Rocha',      '111.222.333-45', '1991-05-09', '01305-100', 'Rua Augusta',                      '890',  NULL,        'Consolação',          'São Paulo',       'SP'),
('Lucas Eduardo Pinto',       '222.333.444-56', '1986-10-31', '22070-011', 'Av. Atlântica',                    '300',  NULL,        'Copacabana',          'Rio de Janeiro',  'RJ'),
('Mariana Beatriz Gomes',     '333.444.555-67', '1994-07-16', '22290-140', 'Rua Voluntários da Pátria',        '67',   NULL,        'Botafogo',            'Rio de Janeiro',  'RJ'),
('Nicolas André Cardoso',     '444.555.666-78', '1989-03-03', '60150-160', 'Av. Santos Dumont',                '450',  NULL,        'Aldeota',             'Fortaleza',       'CE'),
('Olivia Ramos Teixeira',     '555.666.777-89', '1996-12-20', '59025-000', 'Rua João Pessoa',                  '234',  NULL,        'Centro',              'Natal',           'RN'),
('Paulo Sérgio Moreira',      '666.777.888-90', '1982-09-07', '30140-070', 'Av. Getúlio Vargas',               '678',  NULL,        'Funcionários',        'Belo Horizonte',  'MG'),
('Rafaela Cunha Dias',        '777.888.999-01', '1998-04-24', '36010-010', 'Rua Halfeld',                      '89',   NULL,        'Centro',              'Juiz de Fora',    'MG'),
('Samuel Vieira Lopes',       '888.999.000-12', '1984-11-11', '90035-003', 'Av. Independência',                '345',  NULL,        'Petrópolis',          'Porto Alegre',    'RS'),
('Tâmara Freitas Machado',    '999.000.111-23', '1990-06-28', '89201-000', 'Rua Tiradentes',                   '123',  NULL,        'Centro',              'Joinville',       'SC'),
('Ursula Monteiro Campos',    '000.111.222-34', '1993-01-15', '51030-000', 'Av. Boa Viagem',                   '567',  NULL,        'Boa Viagem',          'Recife',          'PE'),
('Victor Hugo Nascimento',    '111.333.555-67', '1987-08-19', '01426-001', 'Rua Oscar Freire',                 '456',  NULL,        'Jardins',             'São Paulo',       'SP'),
('Wandessa Araújo Lima',      '222.444.666-78', '1995-03-06', '50711-000', 'Av. Visconde de Albuquerque',      '234',  NULL,        'Madalena',            'Recife',          'PE'),
('Xavier Tavares Borges',     '333.555.777-89', '1981-10-23', '22461-000', 'Rua das Acácias',                  '78',   NULL,        'Jardim Botânico',     'Rio de Janeiro',  'RJ'),
('Yasmin Correia Fonseca',    '444.666.888-90', '1999-07-04', '50731-000', 'Av. Caxangá',                      '890',  NULL,        'Iputinga',            'Recife',          'PE'),
('Zélia Brandão Melo',        '555.777.999-01', '1983-02-17', '80010-010', 'Rua Marechal Deodoro',             '345',  NULL,        'Centro',              'Curitiba',        'PR'),
('André Luiz Cavalcanti',     '666.888.000-12', '1992-09-30', '40020-000', 'Av. Sete de Setembro',             '123',  NULL,        'Centro',              'Salvador',        'BA'),
('Beatriz Sousa Magalhães',   '777.999.111-23', '1988-04-12', '40020-000', 'Rua Chile',                        '456',  NULL,        'Centro',              'Salvador',        'BA'),
('Caio Henrique Rezende',     '888.000.222-34', '1996-11-25', '30140-070', 'Av. Gonçalves Dias',               '678',  NULL,        'Funcionários',        'Belo Horizonte',  'MG'),
('Débora Cristiane Nogueira', '999.111.333-45', '1984-06-08', '30130-170', 'Rua Sergipe',                      '234',  NULL,        'Savassi',             'Belo Horizonte',  'MG'),
('Everton Ribeiro Azevedo',   '000.222.444-56', '1991-01-21', '90040-060', 'Av. João Pessoa',                  '567',  NULL,        'Cidade Baixa',        'Porto Alegre',    'RS'),
('Fernanda Letícia Guimarães','111.444.666-89', '1997-08-14', '80010-030', 'Rua Visconde do Rio Branco',       '89',   NULL,        'Centro',              'Curitiba',        'PR'),
('Gustavo Henrique Duarte',   '222.555.777-90', '1985-03-27', '51021-000', 'Av. Boa Viagem',                   '234',  NULL,        'Boa Viagem',          'Recife',          'PE'),
('Helena Vitória Carvalho',   '333.666.888-01', '1993-10-10', '01010-020', 'Rua São Bento',                    '678',  NULL,        'Centro',              'São Paulo',       'SP'),
('Igor Mateus Bernardes',     '444.777.999-12', '1989-05-23', '13010-040', 'Av. Francisco Glicério',           '345',  NULL,        'Centro',              'Campinas',        'SP'),
('Juliana Aparecida Vasconcelos','555.888.000-23','1994-12-06','13010-000','Rua Barão de Jaguara',             '123',  NULL,        'Centro',              'Campinas',        'SP'),
('Kleber Augusto Andrade',    '666.999.111-34', '1980-07-19', '38400-000', 'Av. Brasil',                       '456',  NULL,        'Centro',              'Uberlândia',      'MG'),
('Larissa Patrícia Queiroz',  '777.000.222-45', '1998-02-01', '38400-100', 'Rua Artur Machado',                '789',  NULL,        'Centro',              'Uberlândia',      'MG'),
('Marcelo Vinícius Brito',    '888.111.333-56', '1986-09-14', '79002-000', 'Av. Afonso Pena',                  '234',  NULL,        'Centro',              'Campo Grande',    'MS'),
('Natália Regina Abreu',      '999.222.444-67', '1992-04-27', '79002-100', 'Rua 14 de Julho',                  '567',  NULL,        'Centro',              'Campo Grande',    'MS'),
('Otávio Augusto Coutinho',   '000.333.555-78', '1983-11-10', '01310-100', 'Av. Paulista',                     '890',  NULL,        'Bela Vista',          'São Paulo',       'SP'),
('Priscila Moraes Drummond',  '111.555.999-23', '1990-06-03', '01414-001', 'Rua Haddock Lobo',                 '123',  NULL,        'Cerqueira César',     'São Paulo',       'SP'),
('Quirino José Figueiredo',   '222.666.000-34', '1987-01-16', '05402-000', 'Av. Rebouças',                     '456',  NULL,        'Pinheiros',           'São Paulo',       'SP'),
('Renata Soares Lacerda',     '333.777.111-45', '1995-08-29', '05434-040', 'Rua Wisard',                       '789',  NULL,        'Vila Madalena',       'São Paulo',       'SP'),
('Sandro Pereira Matos',      '444.888.222-56', '1981-03-12', '05016-000', 'Av. Sumaré',                       '234',  NULL,        'Perdizes',            'São Paulo',       'SP'),
('Tatiane Cristina Pacheco',  '555.999.333-67', '1996-10-25', '05433-000', 'Rua Mourato Coelho',               '567',  NULL,        'Pinheiros',           'São Paulo',       'SP'),
('Ulisses Tavares Fontes',    '666.000.444-78', '1984-05-08', '01449-000', 'Av. Europa',                       '890',  NULL,        'Jardim Europa',       'São Paulo',       'SP'),
('Vanessa Rodrigues Espíndola','777.111.555-89','1991-12-21', '01427-000', 'Rua Estados Unidos',               '123',  NULL,        'Jardins',             'São Paulo',       'SP'),
('Wellington Almeida Torres', '888.222.666-90', '1988-07-04', '01238-010', 'Av. Higienópolis',                 '456',  NULL,        'Higienópolis',        'São Paulo',       'SP'),
('Xenofonte Cruz Pimentel',   '999.333.777-01', '1993-02-15', '22471-000', 'Rua Epitácio Pessoa',              '789',  NULL,        'Lagoa',               'Rio de Janeiro',  'RJ'),
('Yolanda Batista Sampaio',   '000.444.888-12', '1997-09-28', '22420-000', 'Av. Vieira Souto',                 '234',  NULL,        'Ipanema',             'Rio de Janeiro',  'RJ'),
('Zelindo Ferreira Neto',     '111.666.000-45', '1982-04-11', '22421-030', 'Rua Garcia D Avila',               '567',  NULL,        'Ipanema',             'Rio de Janeiro',  'RJ'),
('Adriana Macedo Pires',      '222.777.111-56', '1994-11-24', '22070-011', 'Av. Atlântica',                    '890',  NULL,        'Copacabana',          'Rio de Janeiro',  'RJ'),
('Bernardo Campos Leite',     '333.888.222-67', '1980-06-07', '22011-010', 'Rua Barata Ribeiro',               '123',  NULL,        'Copacabana',          'Rio de Janeiro',  'RJ'),
('Cristiane Leal Vilela',     '444.999.333-78', '1998-01-20', '22020-000', 'Av. Nossa Senhora de Copacabana',  '456',  NULL,        'Copacabana',          'Rio de Janeiro',  'RJ'),
('Danilo Henrique Siqueira',  '555.000.444-89', '1985-08-03', '22290-140', 'Rua Voluntários da Pátria',        '789',  NULL,        'Botafogo',            'Rio de Janeiro',  'RJ'),
('Eliane Ferraz Studart',     '666.111.555-90', '1992-03-16', '22290-240', 'Av. Pasteur',                      '234',  NULL,        'Urca',                'Rio de Janeiro',  'RJ'),
('Fábio Augusto Cordeiro',    '777.222.666-01', '1989-10-29', '22260-010', 'Rua São Clemente',                 '567',  NULL,        'Botafogo',            'Rio de Janeiro',  'RJ'),
('Giovana Peixoto Morais',    '888.333.777-12', '1996-05-12', '22291-000', 'Av. Lauro Sodré',                  '890',  NULL,        'Urca',                'Rio de Janeiro',  'RJ'),
('Humberto Dantas Coelho',    '999.444.888-23', '1983-12-25', '22451-000', 'Rua Marquês de São Vicente',       '123',  NULL,        'Gávea',               'Rio de Janeiro',  'RJ'),
('Ingrid Cavalcante Leão',    '000.555.999-34', '1991-07-08', '22471-000', 'Av. Epitácio Pessoa',              '456',  NULL,        'Lagoa',               'Rio de Janeiro',  'RJ'),
('Jeferson Moura Silveira',   '111.777.333-67', '1986-02-19', '22261-090', 'Rua Humaitá',                      '789',  NULL,        'Humaitá',             'Rio de Janeiro',  'RJ');

-- ─── CONTATOS ────────────────────────────────────────────────
INSERT INTO CONTATO (tipo, valor, observacao, cliente_id_fk) VALUES
-- Ana Carolina Silva (1)
('E-mail', 'ana.carolina@gmail.com', 'Pessoal', 1),
('Telefone', '(11) 98765-4321', 'Celular', 1),
-- Bruno Henrique Costa (2)
('E-mail', 'bruno.costa@outlook.com', 'Trabalho', 2),
('Telefone', '(11) 91234-5678', 'Celular', 2),
-- Carla Fernanda Oliveira (3)
('E-mail', 'carla.oliveira@gmail.com', 'Pessoal', 3),
('Telefone', '(41) 99876-5432', 'Celular', 3),
-- Diego Augusto Mendes (4)
('E-mail', 'diego.mendes@empresa.com.br', 'Corporativo', 4),
('Telefone', '(48) 98765-1234', 'Celular', 4),
-- Eduarda Martins Ferreira (5)
('E-mail', 'eduarda.ferreira@hotmail.com', 'Pessoal', 5),
('Telefone', '(51) 97654-3210', 'Celular', 5),
-- Felipe Rodrigues Santos (6)
('E-mail', 'felipe.santos@gmail.com', 'Pessoal', 6),
('Telefone', '(21) 96543-2109', 'Celular', 6),
-- Gabriela Alves Pereira (7)
('E-mail', 'gabriela.pereira@outlook.com', 'Trabalho', 7),
('Telefone', '(81) 95432-1098', 'Celular', 7),
-- Henrique Lima Souza (8)
('E-mail', 'henrique.souza@empresa.com', 'Corporativo', 8),
('Telefone', '(31) 94321-0987', 'Celular', 8),
-- Isabela Castro Nunes (9)
('E-mail', 'isabela.nunes@gmail.com', 'Pessoal', 9),
('Telefone', '(51) 93210-9876', 'Celular', 9),
-- João Victor Barbosa (10)
('E-mail', 'joao.barbosa@hotmail.com', 'Pessoal', 10),
('Telefone', '(81) 92109-8765', 'Celular', 10),
-- Karen Cristina Rocha (11)
('E-mail', 'karen.rocha@gmail.com', 'Pessoal', 11),
('Telefone', '(11) 91098-7654', 'Celular', 11),
-- Lucas Eduardo Pinto (12)
('E-mail', 'lucas.pinto@empresa.com', 'Corporativo', 12),
('Telefone', '(21) 90987-6543', 'Celular', 12),
-- Mariana Beatriz Gomes (13)
('E-mail', 'mariana.gomes@outlook.com', 'Pessoal', 13),
('Telefone', '(21) 99876-5431', 'Celular', 13),
-- Nicolas André Cardoso (14)
('E-mail', 'nicolas.cardoso@gmail.com', 'Pessoal', 14),
('Telefone', '(85) 98765-4320', 'Celular', 14),
-- Olivia Ramos Teixeira (15)
('E-mail', 'olivia.teixeira@hotmail.com', 'Pessoal', 15),
('Telefone', '(84) 97654-3219', 'Celular', 15),
-- Paulo Sérgio Moreira (16)
('E-mail', 'paulo.moreira@empresa.com', 'Corporativo', 16),
('Telefone', '(31) 96543-2108', 'Celular', 16),
-- Rafaela Cunha Dias (17)
('E-mail', 'rafaela.dias@gmail.com', 'Pessoal', 17),
('Telefone', '(32) 95432-1097', 'Celular', 17),
-- Samuel Vieira Lopes (18)
('E-mail', 'samuel.lopes@outlook.com', 'Trabalho', 18),
('Telefone', '(51) 94321-0986', 'Celular', 18),
-- Tâmara Freitas Machado (19)
('E-mail', 'tamara.machado@gmail.com', 'Pessoal', 19),
('Telefone', '(47) 93210-9875', 'Celular', 19),
-- Ursula Monteiro Campos (20)
('E-mail', 'ursula.campos@empresa.com', 'Corporativo', 20),
('Telefone', '(81) 92109-8764', 'Celular', 20),
-- Victor Hugo Nascimento (21)
('E-mail', 'victor.nascimento@gmail.com', 'Pessoal', 21),
('Telefone', '(11) 91098-7653', 'Celular', 21),
-- Wandessa Araújo Lima (22)
('E-mail', 'wandessa.lima@hotmail.com', 'Pessoal', 22),
('Telefone', '(81) 90987-6542', 'Celular', 22),
-- Xavier Tavares Borges (23)
('E-mail', 'xavier.borges@outlook.com', 'Trabalho', 23),
('Telefone', '(21) 99876-5430', 'Celular', 23),
-- Yasmin Correia Fonseca (24)
('E-mail', 'yasmin.fonseca@gmail.com', 'Pessoal', 24),
('Telefone', '(81) 98765-4319', 'Celular', 24),
-- Zélia Brandão Melo (25)
('E-mail', 'zelia.melo@empresa.com', 'Corporativo', 25),
('Telefone', '(41) 97654-3218', 'Celular', 25),
-- André Luiz Cavalcanti (26)
('E-mail', 'andre.cavalcanti@gmail.com', 'Pessoal', 26),
('Telefone', '(71) 96543-2107', 'Celular', 26),
-- Beatriz Sousa Magalhães (27)
('E-mail', 'beatriz.magalhaes@hotmail.com', 'Pessoal', 27),
('Telefone', '(71) 95432-1096', 'Celular', 27),
-- Caio Henrique Rezende (28)
('E-mail', 'caio.rezende@empresa.com', 'Corporativo', 28),
('Telefone', '(31) 94321-0985', 'Celular', 28),
-- Débora Cristiane Nogueira (29)
('E-mail', 'debora.nogueira@gmail.com', 'Pessoal', 29),
('Telefone', '(31) 93210-9874', 'Celular', 29),
-- Everton Ribeiro Azevedo (30)
('E-mail', 'everton.azevedo@outlook.com', 'Trabalho', 30),
('Telefone', '(51) 92109-8763', 'Celular', 30),
-- Fernanda Letícia Guimarães (31)
('E-mail', 'fernanda.guimaraes@gmail.com', 'Pessoal', 31),
('Telefone', '(41) 91098-7652', 'Celular', 31),
-- Gustavo Henrique Duarte (32)
('E-mail', 'gustavo.duarte@empresa.com', 'Corporativo', 32),
('Telefone', '(81) 90987-6541', 'Celular', 32),
-- Helena Vitória Carvalho (33)
('E-mail', 'helena.carvalho@gmail.com', 'Pessoal', 33),
('Telefone', '(11) 99876-5429', 'Celular', 33),
-- Igor Mateus Bernardes (34)
('E-mail', 'igor.bernardes@hotmail.com', 'Pessoal', 34),
('Telefone', '(19) 98765-4318', 'Celular', 34),
-- Juliana Aparecida Vasconcelos (35)
('E-mail', 'juliana.vasconcelos@outlook.com', 'Trabalho', 35),
('Telefone', '(19) 97654-3217', 'Celular', 35),
-- Kleber Augusto Andrade (36)
('E-mail', 'kleber.andrade@gmail.com', 'Pessoal', 36),
('Telefone', '(34) 96543-2106', 'Celular', 36),
-- Larissa Patrícia Queiroz (37)
('E-mail', 'larissa.queiroz@empresa.com', 'Corporativo', 37),
('Telefone', '(34) 95432-1095', 'Celular', 37),
-- Marcelo Vinícius Brito (38)
('E-mail', 'marcelo.brito@gmail.com', 'Pessoal', 38),
('Telefone', '(67) 94321-0984', 'Celular', 38),
-- Natália Regina Abreu (39)
('E-mail', 'natalia.abreu@hotmail.com', 'Pessoal', 39),
('Telefone', '(67) 93210-9873', 'Celular', 39),
-- Otávio Augusto Coutinho (40)
('E-mail', 'otavio.coutinho@outlook.com', 'Trabalho', 40),
('Telefone', '(11) 92109-8762', 'Celular', 40),
-- Priscila Moraes Drummond (41)
('E-mail', 'priscila.drummond@gmail.com', 'Pessoal', 41),
('Telefone', '(11) 91098-7651', 'Celular', 41),
-- Quirino José Figueiredo (42)
('E-mail', 'quirino.figueiredo@empresa.com', 'Corporativo', 42),
('Telefone', '(11) 90987-6540', 'Celular', 42),
-- Renata Soares Lacerda (43)
('E-mail', 'renata.lacerda@gmail.com', 'Pessoal', 43),
('Telefone', '(11) 99876-5428', 'Celular', 43),
-- Sandro Pereira Matos (44)
('E-mail', 'sandro.matos@hotmail.com', 'Pessoal', 44),
('Telefone', '(11) 98765-4317', 'Celular', 44),
-- Tatiane Cristina Pacheco (45)
('E-mail', 'tatiane.pacheco@outlook.com', 'Trabalho', 45),
('Telefone', '(11) 97654-3216', 'Celular', 45),
-- Ulisses Tavares Fontes (46)
('E-mail', 'ulisses.fontes@gmail.com', 'Pessoal', 46),
('Telefone', '(11) 96543-2105', 'Celular', 46),
-- Vanessa Rodrigues Espíndola (47)
('E-mail', 'vanessa.espindola@empresa.com', 'Corporativo', 47),
('Telefone', '(11) 95432-1094', 'Celular', 47),
-- Wellington Almeida Torres (48)
('E-mail', 'wellington.torres@gmail.com', 'Pessoal', 48),
('Telefone', '(11) 94321-0983', 'Celular', 48),
-- Xenofonte Cruz Pimentel (49)
('E-mail', 'xenofonte.pimentel@hotmail.com', 'Pessoal', 49),
('Telefone', '(21) 93210-9872', 'Celular', 49),
-- Yolanda Batista Sampaio (50)
('E-mail', 'yolanda.sampaio@outlook.com', 'Trabalho', 50),
('Telefone', '(21) 92109-8761', 'Celular', 50),
-- Zelindo Ferreira Neto (51)
('E-mail', 'zelindo.neto@gmail.com', 'Pessoal', 51),
('Telefone', '(21) 91098-7650', 'Celular', 51),
-- Adriana Macedo Pires (52)
('E-mail', 'adriana.pires@empresa.com', 'Corporativo', 52),
('Telefone', '(21) 90987-6539', 'Celular', 52),
-- Bernardo Campos Leite (53)
('E-mail', 'bernardo.leite@gmail.com', 'Pessoal', 53),
('Telefone', '(21) 99876-5427', 'Celular', 53),
-- Cristiane Leal Vilela (54)
('E-mail', 'cristiane.vilela@hotmail.com', 'Pessoal', 54),
('Telefone', '(21) 98765-4316', 'Celular', 54),
-- Danilo Henrique Siqueira (55)
('E-mail', 'danilo.siqueira@outlook.com', 'Trabalho', 55),
('Telefone', '(21) 97654-3215', 'Celular', 55),
-- Eliane Ferraz Studart (56)
('E-mail', 'eliane.studart@gmail.com', 'Pessoal', 56),
('Telefone', '(21) 96543-2104', 'Celular', 56),
-- Fábio Augusto Cordeiro (57)
('E-mail', 'fabio.cordeiro@empresa.com', 'Corporativo', 57),
('Telefone', '(21) 95432-1093', 'Celular', 57),
-- Giovana Peixoto Morais (58)
('E-mail', 'giovana.morais@gmail.com', 'Pessoal', 58),
('Telefone', '(21) 94321-0982', 'Celular', 58),
-- Humberto Dantas Coelho (59)
('E-mail', 'humberto.coelho@hotmail.com', 'Pessoal', 59),
('Telefone', '(21) 93210-9871', 'Celular', 59),
-- Ingrid Cavalcante Leão (60)
('E-mail', 'ingrid.leao@outlook.com', 'Trabalho', 60),
('Telefone', '(21) 92109-8760', 'Celular', 60),
-- Jeferson Moura Silveira (61)
('E-mail', 'jeferson.silveira@gmail.com', 'Pessoal', 61),
('Telefone', '(21) 91098-7649', 'Celular', 61);

SELECT 
    c.id          AS 'ID',
    c.nome        AS 'Nome',
    c.cpf         AS 'CPF',
    c.cep         AS 'CEP',
    c.logradouro  AS 'Logradouro',
    c.numero      AS 'Número',
    c.bairro      AS 'Bairro',
    c.cidade      AS 'Cidade',
    c.estado      AS 'Estado',
    co.tipo       AS 'Tipo Contato',
    co.valor      AS 'Contato'
FROM clientes c
INNER JOIN contato co ON c.id = co.cliente_id_fk;