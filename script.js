// Função para adicionar tarefa
function adicionarTarefa() {
    const inputTarefa = document.getElementById("inputTarefa");
    let tarefa = inputTarefa.value.trim();
    const mensagem = document.getElementById("mensagem");

    if (tarefa === "") {
        mensagem.textContent = "Digite uma tarefa para adicioná-la à sua lista!";
    } else {
        mensagem.textContent = "Tarefa adicionada com sucesso!";
        const listaTarefas = document.getElementById("listaTarefas");
        let novaTarefa = document.createElement("li");
        novaTarefa.textContent = tarefa;
        listaTarefas.appendChild(novaTarefa);
    }

    inputTarefa.value = "";
}

// Função para criar estrelas flutuantes
function criarStarryNight() {
    const starryNight = document.getElementById("starry-night");

    // Criar estrelas dinamicamente
    for (let i = 0; i < 100; i++) {
        const star = document.createElement("div");
        star.classList.add("star");

        // Posição aleatória
        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * 100 + "vh";

        // Tamanho aleatório
        const size = Math.random() * 5 + 2; // Entre 2px e 7px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Velocidade aleatória
        star.style.animationDuration = Math.random() * 5 + 5 + "s"; // Entre 5s e 10s

        starryNight.appendChild(star);
    }
}

// Inicia o efeito de estrelas
criarStarryNight();
