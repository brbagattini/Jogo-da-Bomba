const input = document.getElementById("nome-usuario");
const playerList = document.getElementById("playerlist");
const addBtn = document.getElementById("addPlayer");
const startBtn = document.getElementById("startGame");

let players = [];

// Carregar jogadores já salvos no localStorage
window.addEventListener("load", () => {
  const savedPlayers = localStorage.getItem("jogadores");
  if (savedPlayers) {
    players = JSON.parse(savedPlayers);
    atualizarDOM();
  }
});

// Criar item de jogador na tela
function addPlayerToDOM(name, index) {
  const div = document.createElement("div");
  div.classList.add("player-item");
  div.dataset.index = index;

  const span = document.createElement("span");
  span.textContent = name;

  // Container dos botões
  const actions = document.createElement("div");
  actions.classList.add("player-actions");

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.classList.add("edit-btn");

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "🗑️";
  removeBtn.classList.add("remove-btn");

  // Evento de editar inline
  editBtn.addEventListener("click", () => {
    const inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.value = span.textContent;
    inputEdit.classList.add("edit-input");

    div.replaceChild(inputEdit, span);
    inputEdit.focus();

    const salvar = () => {
      const newName = inputEdit.value.trim();
      if (newName !== "") {
        players[index] = newName;
        span.textContent = newName;
      }
      div.replaceChild(span, inputEdit);
    };

    inputEdit.addEventListener("blur", salvar);
    inputEdit.addEventListener("keypress", (e) => {
      if (e.key === "Enter") salvar();
    });
  });

  // Evento de remover
  removeBtn.addEventListener("click", () => {
    players.splice(index, 1);
    atualizarDOM();
  });

  actions.appendChild(editBtn);
  actions.appendChild(removeBtn);

  div.appendChild(span);
  div.appendChild(actions);
  playerList.appendChild(div);
}


// Atualizar lista inteira
function atualizarDOM() {
  playerList.innerHTML = "";
  players.forEach((name, index) => addPlayerToDOM(name, index));
}

// Adicionar jogador
addBtn.addEventListener("click", () => {
  const name = input.value.trim();
  if (name !== "") {
    players.push(name);
    atualizarDOM();
    input.value = "";
  }
});

// Salvar jogadores no localStorage
startBtn.addEventListener("click", () => {
  if (players.length > 0) {
    localStorage.setItem("jogadores", JSON.stringify(players));
    alert("Jogadores salvos no localStorage!");
  } else {
    alert("Adicione pelo menos um jogador antes de iniciar!");
  }
});
