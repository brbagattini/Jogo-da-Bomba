const container = document.getElementById("selectList");
const players = JSON.parse(localStorage.getItem("jogadores") || "[]");

if (!players.length) {
  container.innerHTML = `<p style="opacity:.85">Nenhum jogador encontrado. Volte e adicione jogadores.</p>`;
} else {
  players.forEach((name) => {
    const row = document.createElement("div");
    row.className = "select-row";

    const span = document.createElement("span");
    span.textContent = name;

    const btn = document.createElement("button");
    btn.className = "select-btn";
    btn.textContent = "Selecionar";
    btn.addEventListener("click", () => {
      localStorage.setItem("selecionado", name);
      window.location.href = "bombacard.html";
    });

    row.appendChild(span);
    row.appendChild(btn);
    container.appendChild(row);
  });
}
