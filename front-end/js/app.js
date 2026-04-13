// ─── ESTADO GLOBAL ───────────────────────────────────────────

let contatosExtras = [];
let paginaAtual    = 0;
let termoBusca     = '';

// ─── CADASTRO DE CLIENTE ─────────────────────────────────────

// Coleta os dados do formulário e monta o objeto cliente
function coletarDadosCliente(contatos) {
    return {
        nome:           document.getElementById('nome').value.trim(),
        cpf:            document.getElementById('cpf').value.trim(),
        dataNascimento: document.getElementById('data_nascimento').value || null,
        cep:            document.getElementById('cep').value.trim(),
        logradouro:     document.getElementById('logradouro').value.trim(),
        numero:         document.getElementById('numero').value.trim(),
        complemento:    document.getElementById('complemento').value.trim(),
        bairro:         document.getElementById('bairro').value.trim(),
        cidade:         document.getElementById('cidade').value.trim(),
        estado:         document.getElementById('estado').value.trim(),
        contatos
    };
}

// Valida e envia o formulário de novo cliente via POST
async function salvarCliente(evento) {
    evento.preventDefault();
    if (!validarFormularioCliente()) return;

    const tipo       = document.getElementById('tipo').value;
    const valor      = document.getElementById('valor').value.trim();
    const observacao = document.getElementById('observacao').value.trim();

    if (tipo && !valor) { mostrarErro('valor', 'O Valor do contato é obrigatório.'); return; }
    if (valor && !tipo) { mostrarErro('tipo',  'Selecione o Tipo do contato.');       return; }
    if (observacao && (!tipo || !valor)) {
        if (!tipo)  mostrarErro('tipo',  'Selecione o Tipo do contato.');
        if (!valor) mostrarErro('valor', 'O Valor do contato é obrigatório.');
        return;
    }
    if (!validarContatosExtras(contatosExtras)) return;

    const contatoFixo = (tipo && valor) ? [{ tipo, valor, observacao }] : [];
    const cliente     = coletarDadosCliente([...contatoFixo, ...contatosExtras]);

    try {
        const res = await apiCriarCliente(cliente);
        if (res.ok) {
            alert('Cliente salvo com sucesso!');
            window.location.href = 'listagemDeClientes.html';
        } else if (res.status === 400 || res.status === 409) {
            exibirErrosDoBack(await res.json());
        } else {
            alert(`Erro ${res.status}: tente novamente.`);
        }
    } catch {
        alert('Não foi possível conectar ao servidor.');
    }
}

// ─── CONTATOS EXTRAS (FORMULÁRIO DE CADASTRO) ────────────────

// Adiciona uma linha de contato extra ao formulário
function adicionarContatoExtra() {
    contatosExtras.push({ tipo: 'E-mail', valor: '', observacao: '' });
    renderizarExtras();
}

// Remove uma linha de contato extra pelo índice
function removerExtra(i) {
    contatosExtras.splice(i, 1);
    renderizarExtras();
}

// Atualiza um campo de um contato extra pelo índice e nome do campo
function atualizarExtra(i, campo, val) {
    contatosExtras[i][campo] = val;
}

// Re-renderiza a lista de contatos extras no formulário
function renderizarExtras() {
    document.getElementById('contatosExtras').innerHTML =
        contatosExtras.map((c, i) => `
            <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                <div class="md:col-span-3 space-y-1">
                    <label class="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Tipo *</label>
                    <select onchange="atualizarExtra(${i},'tipo',this.value); document.getElementById('extraValor-${i}').placeholder = placeholderContato(this.value)"
                        class="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none">
                        <option value="">Selecione...</option>
                        <option value="E-mail"   ${c.tipo === 'E-mail'   ? 'selected' : ''}>E-mail</option>
                        <option value="Telefone" ${c.tipo === 'Telefone' ? 'selected' : ''}>Telefone</option>
                    </select>
                </div>
                <div class="md:col-span-4 space-y-1">
                    <label class="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Valor *</label>
                    <input id="extraValor-${i}" type="text" value="${c.valor}"
                        oninput="atualizarExtra(${i},'valor',this.value)"
                        placeholder="${placeholderContato(c.tipo)}"
                        class="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none"/>
                </div>
                <div class="md:col-span-4 space-y-1">
                    <label class="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Observação</label>
                    <input type="text" value="${c.observacao}"
                        oninput="atualizarExtra(${i},'observacao',this.value)"
                        placeholder="Pessoal"
                        class="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none"/>
                </div>
                <div class="md:col-span-1 flex justify-end">
                    <button type="button" onclick="removerExtra(${i})" class="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>`).join('');
}

// ─── LISTAGEM DE CLIENTES ────────────────────────────────────

// Carrega a página de clientes e reseta o termo de busca
async function carregarClientes(page = 0) {
    paginaAtual = page;
    termoBusca  = '';
    try {
        const data = await apiListarClientes(page);
        renderizarClientes(data, false);
    } catch {
        alert('Erro ao carregar clientes.');
    }
}

// Busca clientes por nome ou CPF e atualiza a listagem
async function buscarClientes(termo, page = 0) {
    paginaAtual = page;
    termoBusca  = termo;
    try {
        const data = await apiBuscarClientes(termo, page);
        renderizarClientes(data, true);
    } catch {
        alert('Erro ao buscar clientes.');
    }
}

// Navega para a página indicada respeitando busca ativa
function irPagina(page) {
    termoBusca ? buscarClientes(termoBusca, page) : carregarClientes(page);
}

// Confirma e executa a exclusão de um cliente
async function excluirCliente(id) {
    if (!confirm('Excluir este cliente?')) return;
    try {
        const res = await apiExcluirCliente(id);
        res.ok ? carregarClientes() : alert('Erro ao excluir.');
    } catch {
        alert('Não foi possível conectar ao servidor.');
    }
}

// Redireciona para o formulário de edição do cliente
function editarCliente(id) {
    window.location.href = `cadastroDeClientes.html?id=${id}`;
}

// ─── CONTATOS (LISTAGEM) ─────────────────────────────────────

// Alterna a visibilidade do formulário de novo contato
function mostrarFormContato(clienteId) {
    document.getElementById(`formContato-${clienteId}`).classList.toggle('hidden');
}

// Valida e envia um novo contato para o cliente
async function adicionarContato(clienteId) {
    const tipo       = document.getElementById(`novoTipo-${clienteId}`).value;
    const valor      = document.getElementById(`novoValor-${clienteId}`).value.trim();
    const observacao = document.getElementById(`novaObs-${clienteId}`).value.trim();

    if (!tipo)  { mostrarErro(`novoTipo-${clienteId}`,  'Selecione o Tipo.');            return; }
    if (!valor) { mostrarErro(`novoValor-${clienteId}`, 'O campo Valor é obrigatório.'); return; }

    try {
        const res = await apiAdicionarContato(clienteId, { tipo, valor, observacao });
        res.ok ? carregarClientes() : mostrarErro(`novoValor-${clienteId}`, 'Erro ao adicionar contato.');
    } catch {
        mostrarErro(`novoValor-${clienteId}`, 'Não foi possível conectar ao servidor.');
    }
}

// Alterna a visibilidade do formulário de edição inline de contato
function abrirEdicaoContato(id) {
    document.getElementById(`editContato-${id}`).classList.toggle('hidden');
}

// Valida e salva a edição de um contato existente
async function salvarEdicaoContato(id) {
    const tipo       = document.getElementById(`editTipo-${id}`).value;
    const valor      = document.getElementById(`editValor-${id}`).value.trim();
    const observacao = document.getElementById(`editObs-${id}`).value.trim();

    if (!valor) {
        mostrarErro(`editValor-${id}`, 'O campo Valor é obrigatório.');
        document.getElementById(`editValor-${id}`).focus();
        return;
    }

    try {
        const res = await apiAtualizarContato(id, { tipo, valor, observacao });
        res.ok ? carregarClientes() : mostrarErro(`editValor-${id}`, 'Erro ao editar contato.');
    } catch {
        mostrarErro(`editValor-${id}`, 'Não foi possível conectar ao servidor.');
    }
}

// Confirma e executa a exclusão de um contato
async function excluirContato(id) {
    if (!confirm('Excluir este contato?')) return;
    try {
        const res = await apiExcluirContato(id);
        res.ok ? carregarClientes() : alert('Erro ao excluir contato.');
    } catch {
        alert('Não foi possível conectar ao servidor.');
    }
}

// ─── EDIÇÃO DE CLIENTE ───────────────────────────────────────

// Carrega os dados do cliente na URL e preenche o formulário para edição
async function carregarClienteParaEdicao() {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) return;

    try {
        const cliente = await apiObterCliente(id);

        document.getElementById('nome').value  = cliente.nome;
        document.getElementById('cpf').value   = cliente.cpf;
        document.getElementById('data_nascimento').value = Array.isArray(cliente.dataNascimento)
            ? `${cliente.dataNascimento[0]}-${String(cliente.dataNascimento[1]).padStart(2,'0')}-${String(cliente.dataNascimento[2]).padStart(2,'0')}`
            : cliente.dataNascimento ?? '';
        document.getElementById('cep').value         = cliente.cep         || '';
        document.getElementById('logradouro').value  = cliente.logradouro  || '';
        document.getElementById('numero').value      = cliente.numero      || '';
        document.getElementById('complemento').value = cliente.complemento || '';
        document.getElementById('bairro').value      = cliente.bairro      || '';
        document.getElementById('cidade').value      = cliente.cidade      || '';
        document.getElementById('estado').value      = cliente.estado      || '';

        document.querySelector('h1').textContent = 'Editar Cliente';
        document.querySelector('button[type="submit"]').innerHTML =
            '<span class="material-symbols-outlined">save</span> Salvar Alterações';
        document.querySelector('#blocoContatoFixo').classList.add('hidden');

        contatosExtras = cliente.contatos?.map(c => ({
            id: c.id, tipo: c.tipo, valor: c.valor, observacao: c.observacao || ''
        })) ?? [];
        renderizarExtras();

        document.querySelector('form').onsubmit = e => atualizarCliente(e, id);
    } catch {
        alert('Erro ao carregar dados do cliente.');
    }
}

// Valida e envia as alterações do cliente via PUT
async function atualizarCliente(evento, id) {
    evento.preventDefault();
    if (!validarFormularioCliente())          return;
    if (!validarContatosExtras(contatosExtras)) return;

    const cliente = coletarDadosCliente([...contatosExtras]);

    try {
        const res = await apiAtualizarCliente(id, cliente);
        if (res.ok) {
            alert('Cliente atualizado com sucesso!');
            window.location.href = 'listagemDeClientes.html';
        } else if (res.status === 400 || res.status === 409) {
            exibirErrosDoBack(await res.json());
        } else {
            alert(`Erro ${res.status}: tente novamente.`);
        }
    } catch {
        alert('Não foi possível conectar ao servidor.');
    }
}

// ─── CEP ─────────────────────────────────────────────────────

// Aplica a máscara 00000-000 ao campo de CEP
function mascararCep(input) {
    let v = input.value.replace(/\D/g, '').slice(0, 8);
    if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5);
    input.value = v;
}

// Consulta o ViaCEP e preenche os campos de endereço automaticamente
async function buscarCep() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length !== 8) return;
    try {
        const data = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(r => r.json());
        if (data.erro) { mostrarErro('cep', 'CEP não encontrado.'); return; }
        document.getElementById('logradouro').value = data.logradouro || '';
        document.getElementById('bairro').value     = data.bairro     || '';
        document.getElementById('cidade').value     = data.localidade || '';
        document.getElementById('estado').value     = data.uf         || '';
        document.getElementById('numero').focus();
    } catch {
        mostrarErro('cep', 'Não foi possível buscar o CEP.');
    }
}

// Atualiza o placeholder do campo de valor conforme o tipo selecionado
function atualizarPlaceholder(inputId, tipo) {
    document.getElementById(inputId).placeholder = placeholderContato(tipo);
}
