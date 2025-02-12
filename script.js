// Array que armazenará as tarefas
let tarefas = [];

document.addEventListener("DOMContentLoaded", () => {
    carregarTarefas();
    configurarEventos();
});

function configurarEventos() {
    const inputTarefa = document.getElementById("inputTarefa");
    inputTarefa.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            adicionarTarefa();
        }
    });

    document.getElementById("filtroTodas").addEventListener("click", () => filtrarTarefas("todas"));
    document.getElementById("filtroConcluidas").addEventListener("click", () => filtrarTarefas("concluidas"));
    document.getElementById("filtroPendentes").addEventListener("click", () => filtrarTarefas("pendentes"));
}

function mostrarMensagem(texto, tipo) {
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = texto;
    mensagem.className = tipo;
    mensagem.style.opacity = "1";
    setTimeout(() => {
        mensagem.style.opacity = "0";
    }, 3000);
}

function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem("tarefas");
    tarefas = tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
    renderizarTarefas();
}

function atualizarLocalStorage() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function adicionarTarefa() {
    const inputTarefa = document.getElementById("inputTarefa");
    let texto = inputTarefa.value.trim();
    if (!texto) {
        mostrarMensagem("Digite uma tarefa para adicioná-la à sua lista!", "erro");
        return;
    }
    tarefas.push({ text: texto, completed: false });
    inputTarefa.value = "";
    atualizarLocalStorage();
    renderizarTarefas();
    mostrarMensagem("Tarefa adicionada com sucesso!", "sucesso");
}

function renderizarTarefas(filtro = "todas") {
    const listaTarefas = document.getElementById("listaTarefas");
    listaTarefas.innerHTML = "";
    tarefas.forEach((tarefa, index) => {
        if (filtro === "concluidas" && !tarefa.completed) return;
        if (filtro === "pendentes" && tarefa.completed) return;

        let li = document.createElement("li");
        li.className = tarefa.completed ? "concluida" : "pendente";
        
        let span = document.createElement("span");
        span.textContent = tarefa.text;
        span.style.textDecoration = tarefa.completed ? "line-through" : "none";
        span.addEventListener("click", () => toggleConcluida(index));
        li.appendChild(span);

        let botaoRemover = criarBotao("Remover", "remover", () => removerTarefa(index));
        let botaoEditar = criarBotao("Editar", "editar", () => editarTarefa(index));
        let botaoConcluir = criarBotao(tarefa.completed ? "Desfazer" : "Concluir", "concluir", () => toggleConcluida(index));

        li.appendChild(botaoRemover);
        li.appendChild(botaoEditar);
        li.appendChild(botaoConcluir);
        listaTarefas.appendChild(li);
    });
}

function criarBotao(texto, classe, evento) {
    let botao = document.createElement("button");
    botao.textContent = texto;
    botao.className = classe;
    botao.onclick = evento;
    return botao;
}

function removerTarefa(index) {
    tarefas.splice(index, 1);
    atualizarLocalStorage();
    renderizarTarefas();
    mostrarMensagem("Tarefa removida!", "sucesso");
}

function editarTarefa(index) {
    let novoTexto = prompt("Edite a tarefa:", tarefas[index].text);
    if (novoTexto && novoTexto.trim() !== "") {
        tarefas[index].text = novoTexto.trim();
        atualizarLocalStorage();
        renderizarTarefas();
        mostrarMensagem("Tarefa editada!", "sucesso");
    }
}

function toggleConcluida(index) {
    tarefas[index].completed = !tarefas[index].completed;
    atualizarLocalStorage();
    renderizarTarefas();
    mostrarMensagem(tarefas[index].completed ? "Tarefa concluída!" : "Tarefa desmarcada!", "sucesso");
}

function limparLista() {
    tarefas = [];
    atualizarLocalStorage();
    renderizarTarefas();
    mostrarMensagem("Lista de tarefas limpa com sucesso!", "sucesso");
}

function filtrarTarefas(filtro) {
    renderizarTarefas(filtro);
}
