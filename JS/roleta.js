// Carrega jogadores do localStorage
const players = JSON.parse(localStorage.getItem("jogadores") || "[]");
const wheel = document.getElementById("wheel");
const overlay = document.getElementById("winnerOverlay");
const winnerNameEl = document.getElementById("winnerName");

// Se não houver jogadores, volta à tela anterior
if (!players.length) {
  alert("Nenhum jogador encontrado. Adicione jogadores antes.");
  window.location.href = "bombas.html";
}

// Cria o fundo da roleta com conic-gradient e etiquetas
function buildWheel(names) {
  const n = names.length;
  const step = 360 / n;

  // cores alternadas só para diferenciar setores
  const colors = ["#FF2E2E", "#3BA9F0", "#FFD93D", "#2a8bc7", "#c92121", "#00c896"];

  // fundo em conic-gradient
  const stops = names
    .map((_, i) => {
      const c = colors[i % colors.length];
      const start = (i * step).toFixed(2);
      const end = ((i + 1) * step).toFixed(2);
      return `${c} ${start}deg ${end}deg`;
    })
    .join(", ");
  wheel.style.background = `conic-gradient(${stops})`;

  // etiquetas (posicionadas pela circunferência)
  wheel.innerHTML = ""; // limpa
  names.forEach((name, i) => {
    const label = document.createElement("div");
    label.className = "wheel-label";
    const angle = i * step + step / 2;
    label.style.transform = `rotate(${angle}deg) translate(0, -50%) rotate(${-angle}deg)`;
    label.textContent = name;
    wheel.appendChild(label);
  });
}

buildWheel(players);

// Gira automaticamente ao abrir
window.addEventListener("load", () => {
  girar();
});

function girar() {
  const n = players.length;
  const step = 360 / n;

  // escolhe um índice vencedor
  const idx = Math.floor(Math.random() * n);
  const winner = players[idx];

  // ângulo do centro do setor vencedor (0deg = leste; pointer está ao norte ⇒ 90deg)
  const sectorStart = idx * step;
  const sectorCenter = sectorStart + step / 2;

  // giros completos + alinhamento para o topo
  const spins = 6; // quantidade de voltas
  const finalDeg = spins * 360 + (90 - sectorCenter);

  // animação
  wheel.style.transition = "transform 3.2s cubic-bezier(.17,.67,.24,1.02)";
  wheel.style.transform = `rotate(${finalDeg}deg)`;

  // ao terminar, mostra popup e salva selecionado
  wheel.addEventListener(
    "transitionend",
    () => {
      localStorage.setItem("selecionado", winner);
      winnerNameEl.textContent = winner;
      overlay.hidden = false;

      // ao clicar no overlay vai para a carta
      overlay.addEventListener(
        "click",
        () => {
          window.location.href = "bombacard.html";
        },
        { once: true }
      );
    },
    { once: true }
  );
}
