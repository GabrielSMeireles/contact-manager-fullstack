const API = 'http://localhost:8081/api';

// Busca lista paginada de clientes
async function apiListarClientes(page) {
    return fetch(`${API}/clientes?page=${page}&size=10`).then(r => r.json());
}

// Busca clientes por nome ou CPF
async function apiBuscarClientes(termo, page) {
    return fetch(`${API}/clientes/buscar?termo=${encodeURIComponent(termo)}&page=${page}&size=10`).then(r => r.json());
}

// Busca um cliente pelo ID
async function apiObterCliente(id) {
    return fetch(`${API}/clientes/${id}`).then(r => r.json());
}

// Cria um novo cliente
async function apiCriarCliente(dados) {
    return fetch(`${API}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
}

// Atualiza os dados de um cliente existente
async function apiAtualizarCliente(id, dados) {
    return fetch(`${API}/clientes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
}

// Remove um cliente e seus contatos
async function apiExcluirCliente(id) {
    return fetch(`${API}/clientes/${id}`, { method: 'DELETE' });
}

// Adiciona um contato a um cliente existente
async function apiAdicionarContato(clienteId, dados) {
    return fetch(`${API}/clientes/${clienteId}/contatos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
}

// Atualiza tipo, valor e observação de um contato
async function apiAtualizarContato(id, dados) {
    return fetch(`${API}/contatos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
}

// Remove um contato pelo ID
async function apiExcluirContato(id) {
    return fetch(`${API}/contatos/${id}`, { method: 'DELETE' });
}
