const card = document.getElementById("twistCard");
const cardText = document.getElementById("cardText");
const nextBtn = document.getElementById("nextCard");

const frases = [
  "Troque de lugar com outro jogador!",
  "Você ganhou imunidade por 1 rodada!",
  "Jogue duas vezes seguidas!",
  "Passe sua vez.",
  "Volte uma casa!",
  "Escolha um jogador para perder pontos!",
  "Todos os jogadores trocam de posição.",
  "Você perde metade dos seus pontos.",
  "Ganhe uma bomba extra!",
  "Escolha um jogador para trocar de carta."
];

let tiltAtual = 0;

function anguloAleatorio(min = -15, max = 15) {
  let a = Math.floor(Math.random() * (max - min + 1)) + min;
  if (Math.abs(a) < 5) a = a < 0 ? -5 : 5;
  return a;
}

function animarFlipHop(novoTiltDeg) {
  card.style.setProperty("--tilt-start", `${tiltAtual}deg`);
  card.style.setProperty("--tilt-end", `${novoTiltDeg}deg`);
  card.classList.remove("flip-hop");
  void card.offsetWidth;
  card.classList.add("flip-hop");
  card.addEventListener(
    "animationend",
    () => {
      card.classList.remove("flip-hop");
      card.classList.add("revealed");
      tiltAtual = novoTiltDeg;
    },
    { once: true }
  );
}

nextBtn.addEventListener("click", () => {
  const i = Math.floor(Math.random() * frases.length);
  cardText.textContent = frases[i];
  const novoTilt = anguloAleatorio();
  card.classList.add("revealed");
  animarFlipHop(novoTilt);
});

card.addEventListener("click", () => {
  if (card.classList.contains("revealed")) {
    card.classList.remove("revealed");
    card.style.transform = `rotateY(0deg) rotateZ(${tiltAtual}deg)`;
  } else {
    card.classList.add("revealed");
    card.style.transform = `rotateY(180deg) rotateZ(${tiltAtual}deg)`;
  }
});
