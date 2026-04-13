// ─── UTILITÁRIOS DE EXIBIÇÃO ─────────────────────────────────

// Gera as iniciais do nome para o avatar
const iniciais = nome =>
    nome.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase();

// Formata data ISO ou array [ano,mes,dia] para dd/mm/aaaa
const formatarData = data => {
    if (!data) return '—';
    const [ano, mes, dia] = Array.isArray(data) ? data : data.split('-');
    return `${String(dia).padStart(2,'0')}/${String(mes).padStart(2,'0')}/${ano}`;
};

// Monta o endereço completo filtrando campos vazios
const formatarEndereco = cl =>
    [cl.logradouro, cl.numero, cl.complemento, cl.bairro, cl.cidade, cl.estado]
        .filter(Boolean).join(', ') || '—';

// Retorna placeholder adequado ao tipo de contato
const placeholderContato = tipo =>
    tipo === 'Telefone' ? '(11) 99999-9999' : 'exemplo@email.com';

// ─── CLASSES CSS REUTILIZÁVEIS ───────────────────────────────

const CLS = {
    campo:    'w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none',
    label:    'text-[10px] font-bold tracking-widest text-slate-500 uppercase block',
    btnSalvar:'px-3 py-2 bg-[#003399] hover:bg-[#002068] text-white rounded-xl text-xs font-bold',
    btnCancelar:'px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-xl text-xs font-bold',
    icon:     'material-symbols-outlined'
};

// ─── COMPONENTES DE CONTATO ──────────────────────────────────

// Gera o formulário inline de edição de contato (oculto por padrão)
const formEdicaoContato = c => `
    <div id="editContato-${c.id}" class="hidden bg-blue-50 border border-[#003399]/20 rounded-xl p-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-end mt-1">
        <div class="md:col-span-3 space-y-1">
            <label class="${CLS.label}">Tipo</label>
            <select id="editTipo-${c.id}" class="${CLS.campo}">
                <option ${c.tipo === 'E-mail'   ? 'selected' : ''}>E-mail</option>
                <option ${c.tipo === 'Telefone' ? 'selected' : ''}>Telefone</option>
            </select>
        </div>
        <div class="md:col-span-4 space-y-1">
            <label class="${CLS.label}">Valor *</label>
            <input id="editValor-${c.id}" type="text" value="${c.valor}" class="${CLS.campo}"/>
        </div>
        <div class="md:col-span-3 space-y-1">
            <label class="${CLS.label}">Observação</label>
            <input id="editObs-${c.id}" type="text" value="${c.observacao || ''}" class="${CLS.campo}"/>
        </div>
        <div class="md:col-span-2 flex gap-2 justify-end pb-1">
            <button onclick="salvarEdicaoContato(${c.id})" class="${CLS.btnSalvar}">
                <span class="${CLS.icon} text-sm">check</span>
            </button>
            <button onclick="abrirEdicaoContato(${c.id})" class="${CLS.btnCancelar}">
                <span class="${CLS.icon} text-sm">close</span>
            </button>
        </div>
    </div>`;

// Gera o card de exibição de um contato com ações de editar e excluir
const cardContato = c => `
    <div class="grid grid-cols-12 items-center bg-slate-50 border border-slate-100 hover:bg-white hover:border-[#003399]/30 p-3 rounded-xl transition-all hover:shadow-sm">
        <div class="col-span-2">
            <span class="${CLS.label}">Tipo</span>
            <span class="text-sm font-bold text-[#003399]">${c.tipo}</span>
        </div>
        <div class="col-span-5">
            <span class="${CLS.label}">Valor</span>
            <span class="text-sm font-semibold text-slate-800 block truncate">${c.valor}</span>
        </div>
        <div class="col-span-3">
            <span class="${CLS.label}">Observação</span>
            <span class="text-xs text-slate-500 italic">${c.observacao || '—'}</span>
        </div>
        <div class="col-span-2 flex justify-end gap-1">
            <button onclick="abrirEdicaoContato(${c.id})" class="p-2 text-[#003399] hover:bg-[#003399]/10 rounded-lg">
                <span class="${CLS.icon} text-lg">edit</span>
            </button>
            <button onclick="excluirContato(${c.id})" class="p-2 hover:bg-red-50 rounded-lg text-[#EF4444]">
                <span class="${CLS.icon} text-lg">delete</span>
            </button>
        </div>
    </div>
    ${formEdicaoContato(c)}`;

// ─── COMPONENTES DE CLIENTE ──────────────────────────────────

// Gera o formulário inline para adicionar contato (oculto por padrão)
const formNovoContato = id => `
    <div id="formContato-${id}" class="hidden bg-slate-50 border border-slate-200 rounded-xl p-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
        <div class="md:col-span-3 space-y-1">
            <label class="${CLS.label}">Tipo</label>
            <select id="novoTipo-${id}"
                onchange="document.getElementById('novoValor-${id}').placeholder = placeholderContato(this.value)"
                class="${CLS.campo}">
                <option value="">Selecione...</option>
                <option>E-mail</option>
                <option>Telefone</option>
            </select>
        </div>
        <div class="md:col-span-4 space-y-1">
            <label class="${CLS.label}">Valor *</label>
            <input id="novoValor-${id}" type="text" placeholder="contato@exemplo.com" class="${CLS.campo}"/>
        </div>
        <div class="md:col-span-3 space-y-1">
            <label class="${CLS.label}">Observação</label>
            <input id="novaObs-${id}" type="text" placeholder="Pessoal" class="${CLS.campo}"/>
        </div>
        <div class="md:col-span-2 flex gap-2 justify-end pb-1">
            <button onclick="adicionarContato(${id})" class="${CLS.btnSalvar} transition-colors">
                <span class="${CLS.icon} text-sm">check</span>
            </button>
            <button onclick="mostrarFormContato(${id})" class="${CLS.btnCancelar} transition-colors">
                <span class="${CLS.icon} text-sm">close</span>
            </button>
        </div>
    </div>`;

// Gera o card completo de um cliente com seus contatos
const cardCliente = cl => `
    <div class="bg-white rounded-2xl p-6 shadow-card border border-slate-200/50 hover:border-[#003399]/20 transition-all group">
        <div class="flex flex-col xl:flex-row gap-8">

            <div class="xl:w-1/3 shrink-0">
                <div class="flex items-start gap-4 mb-6">
                    <div class="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center text-[#003399] font-bold text-xl border border-slate-200 shadow-sm">
                        ${iniciais(cl.nome)}
                    </div>
                    <div class="flex-1">
                        <h3 class="text-lg font-extrabold text-[#002068] leading-tight mb-1 group-hover:text-[#003399] transition-colors">${cl.nome}</h3>
                        <div class="grid grid-cols-1 gap-y-3 mt-4">
                            ${[
                                ['CPF',              cl.cpf],
                                ['Data de Nascimento', formatarData(cl.dataNascimento)],
                                ['Endereço',         formatarEndereco(cl)]
                            ].map(([label, valor]) => `
                                <div class="flex flex-col">
                                    <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">${label}</span>
                                    <span class="text-sm font-semibold text-slate-800">${valor}</span>
                                </div>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button onclick="editarCliente(${cl.id})"
                        class="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#003399] hover:bg-[#002068] rounded-lg text-xs font-bold text-white transition-colors border border-[#003399]">
                        <span class="${CLS.icon} text-sm">edit</span> Editar
                    </button>
                    <button onclick="excluirCliente(${cl.id})"
                        class="px-3 py-2 bg-slate-50 hover:bg-red-50 rounded-lg text-xs font-bold text-slate-600 hover:text-red-600 transition-colors border border-slate-200 hover:border-red-100">
                        <span class="${CLS.icon} text-sm text-red-500">delete</span>
                    </button>
                </div>
            </div>

            <div class="flex-1 space-y-3">
                <div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-2">Informações de Contato</div>
                ${cl.contatos?.length
                    ? cl.contatos.map(cardContato).join('')
                    : '<p class="text-sm text-slate-400 italic px-2">Nenhum contato cadastrado.</p>'}
                ${formNovoContato(cl.id)}
                <button onclick="mostrarFormContato(${cl.id})"
                    class="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-300 rounded-xl hover:bg-blue-50 hover:border-[#003399]/40 text-slate-500 hover:text-[#003399] transition-all">
                    <span class="${CLS.icon} text-xl">add_circle</span>
                    <span class="text-sm font-bold">Adicionar Novo Contato</span>
                </button>
            </div>

        </div>
    </div>`;

// ─── RENDERIZAÇÃO DA LISTA ───────────────────────────────────

// Atualiza o contador, lista de clientes e paginação na tela
function renderizarClientes({ content, totalElements, totalPages, number }, buscando = false) {
    const n     = totalElements;
    const label = buscando ? 'Localizado' : 'Cadastrado';
    document.getElementById('contadorClientes').textContent =
        `${n} Cliente${n !== 1 ? 's' : ''} ${label}${n !== 1 ? 's' : ''}`;

    document.getElementById('listaClientes').innerHTML = content.length
        ? content.map(cardCliente).join('')
        : `<div class="text-center py-16 text-slate-400">
               <span class="material-symbols-outlined text-5xl">person_search</span>
               <p class="mt-4 font-semibold">Nenhum cliente encontrado.</p>
           </div>`;

    renderizarPaginacao(number, totalPages);
}

// ─── PAGINAÇÃO ───────────────────────────────────────────────

// Gera os botões de navegação entre páginas
function renderizarPaginacao(paginaAtual, totalPages) {
    const container = document.getElementById('paginacao');
    if (totalPages <= 1) { container.innerHTML = ''; return; }

    const cls = {
        base:     'px-4 py-2 rounded-full font-bold text-sm transition-all border',
        ativo:    'bg-[#003399] text-white border-[#003399]',
        inativo:  'bg-white text-[#003399] border-slate-300 hover:bg-slate-50',
        disabled: 'bg-white text-slate-300 border-slate-200 cursor-not-allowed'
    };

    const delta = 2;
    const range = [];
    for (let i = Math.max(0, paginaAtual - delta); i <= Math.min(totalPages - 1, paginaAtual + delta); i++)
        range.push(i);

    const btnNav = (page, icon, desabilitado) => desabilitado
        ? `<button disabled class="${cls.base} ${cls.disabled}"><span class="material-symbols-outlined text-sm">${icon}</span></button>`
        : `<button onclick="irPagina(${page})" class="${cls.base} ${cls.inativo}"><span class="material-symbols-outlined text-sm">${icon}</span></button>`;

    container.innerHTML = `
        <div class="flex items-center gap-2 justify-center">
            ${btnNav(paginaAtual - 1, 'chevron_left', paginaAtual === 0)}
            ${range[0] > 0 ? '<span class="text-slate-400 font-bold">...</span>' : ''}
            ${range.map(i => `
                <button onclick="irPagina(${i})" class="${cls.base} ${i === paginaAtual ? cls.ativo : cls.inativo}">
                    ${i + 1}
                </button>`).join('')}
            ${range[range.length - 1] < totalPages - 1 ? '<span class="text-slate-400 font-bold">...</span>' : ''}
            ${btnNav(paginaAtual + 1, 'chevron_right', paginaAtual >= totalPages - 1)}
        </div>
        <p class="text-center text-xs text-slate-400 mt-3 font-medium">
            Página ${paginaAtual + 1} de ${totalPages}
        </p>`;
}
