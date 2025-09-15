const players = JSON.parse(localStorage.getItem("jogadores") || "[]");
const wheel = document.getElementById("wheel");
const overlay = document.getElementById("winnerOverlay");
const winnerNameEl = document.getElementById("winnerName");

if (!players.length) {
  alert("Nenhum jogador encontrado. Adicione jogadores antes.");
  window.location.href = "bombas.html";
}

function buildWheel(names) {
  const n = names.length;
  const step = 360 / n;

  const colors = ["#FF2E2E", "#3BA9F0", "#FFD93D", "#2a8bc7", "#c92121", "#00c896"];

  const stops = names
    .map((_, i) => {
      const c = colors[i % colors.length];
      const start = (i * step).toFixed(2);
      const end = ((i + 1) * step).toFixed(2);
      return `${c} ${start}deg ${end}deg`;
    })
    .join(", ");
  wheel.style.background = `conic-gradient(${stops})`;

  wheel.innerHTML = "";
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

window.addEventListener("load", () => {
  girar();
});

function girar() {
  const n = players.length;
  const step = 360 / n;

  const idx = Math.floor(Math.random() * n);
  const winner = players[idx];

  const sectorStart = idx * step;
  const sectorCenter = sectorStart + step / 2;

  const spins = 6;
  const finalDeg = spins * 360 + (90 - sectorCenter);

  wheel.style.transition = "transform 3.2s cubic-bezier(.17,.67,.24,1.02)";
  wheel.style.transform = `rotate(${finalDeg}deg)`;

  wheel.addEventListener(
    "transitionend",
    () => {
      localStorage.setItem("selecionado", winner);
      winnerNameEl.textContent = winner;
      overlay.hidden = false;

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
