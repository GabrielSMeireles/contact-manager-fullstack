// Exibe erro visual em um campo pelo seu ID
function mostrarErro(inputId, mensagem) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.classList.add('border-red-400', 'bg-red-50');
    const existente = document.getElementById(`erro-${inputId}`);
    if (existente) existente.remove();
    const span = document.createElement('span');
    span.id        = `erro-${inputId}`;
    span.className = 'text-xs text-red-500 font-semibold mt-1 block';
    span.textContent = mensagem;
    input.insertAdjacentElement('afterend', span);
}

// Remove todos os erros visuais do formulário
function limparErros() {
    document.querySelectorAll('[id^="erro-"]').forEach(el => el.remove());
    document.querySelectorAll('.border-red-400').forEach(el =>
        el.classList.remove('border-red-400', 'bg-red-50'));
}

// Mapeia e exibe erros retornados pelo backend
function exibirErrosDoBack(erros) {
    const mapa = {
        nome:           'nome',
        cpf:            'cpf',
        dataNascimento: 'data_nascimento',
        erro:           'cpf'
    };
    Object.entries(erros).forEach(([campo, mensagem]) => {
        mostrarErro(mapa[campo] ?? campo, mensagem);
    });
}

// Valida os campos obrigatórios do formulário de cliente
function validarFormularioCliente() {
    limparErros();
    let valido = true;

    const nome = document.getElementById('nome').value.trim();
    const cpf  = document.getElementById('cpf').value.trim();
    const data = document.getElementById('data_nascimento').value;

    if (!nome) {
        mostrarErro('nome', 'O nome é obrigatório.');
        valido = false;
    }

    if (!cpf) {
        mostrarErro('cpf', 'O CPF é obrigatório.');
        valido = false;
    } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
        mostrarErro('cpf', 'Formato inválido. Use 000.000.000-00');
        valido = false;
    }

    if (data) {
        const hoje      = new Date();
        hoje.setHours(0, 0, 0, 0);
        const nascimento = new Date(data + 'T00:00:00');
        if (isNaN(nascimento.getTime())) {
            mostrarErro('data_nascimento', 'Data inválida.');
            valido = false;
        } else if (nascimento > hoje) {
            mostrarErro('data_nascimento', 'A data não pode estar no futuro.');
            valido = false;
        }
    }

    return valido;
}

// Valida os contatos extras antes do envio
function validarContatosExtras(contatosExtras) {
    for (let i = 0; i < contatosExtras.length; i++) {
        if (!contatosExtras[i].tipo) {
            mostrarErro(`extraValor-${i}`, 'Selecione o Tipo do contato.');
            return false;
        }
        if (!contatosExtras[i].valor.trim()) {
            mostrarErro(`extraValor-${i}`, 'O Valor do contato é obrigatório.');
            return false;
        }
    }
    return true;
}
