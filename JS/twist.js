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

// guarda o ângulo atual da carta (em graus)
let tiltAtual = 0;

// utilitário: ângulo aleatório, evitando muito pequeno
function anguloAleatorio(min = -15, max = 15) {
  let a = Math.floor(Math.random() * (max - min + 1)) + min;
  if (Math.abs(a) < 5) a = a < 0 ? -5 : 5;
  return a;
}

// dispara a animação de pulo + flip e pousa no novo ângulo
function animarFlipHop(novoTiltDeg) {
  // define variáveis CSS para a animação
  card.style.setProperty("--tilt-start", `${tiltAtual}deg`);
  card.style.setProperty("--tilt-end", `${novoTiltDeg}deg`);

  // garante que o verso terá o novo texto
  // (já está preparado antes de animar)

  // remove/re-adiciona a classe para reiniciar a animação
  card.classList.remove("flip-hop");
  // força reflow para reiniciar mesmo em cliques rápidos
  void card.offsetWidth;
  card.classList.add("flip-hop");

  // quando terminar, fixa o estado final: revelada no novo ângulo
  card.addEventListener(
    "animationend",
    () => {
      card.classList.remove("flip-hop");
      card.classList.add("revealed");
      // persiste o novo ângulo como “atual”
      tiltAtual = novoTiltDeg;
    },
    { once: true }
  );
}

// Clique no botão "Nova Carta"
nextBtn.addEventListener("click", () => {
  // sorteia um texto
  const i = Math.floor(Math.random() * frases.length);
  cardText.textContent = frases[i];

  // sorteia um novo ângulo e anima
  const novoTilt = anguloAleatorio();
  // garante que o estado final será “revelado”
  card.classList.add("revealed");
  animarFlipHop(novoTilt);
});

// (Opcional) Clique na carta para virar frente/verso manualmente.
// Mantém o ângulo atual quando virar de volta.
card.addEventListener("click", () => {
  // se está revelada, volta pra frente mantendo o tilt
  if (card.classList.contains("revealed")) {
    card.classList.remove("revealed");
    card.style.transform = `rotateY(0deg) rotateZ(${tiltAtual}deg)`;
  } else {
    // volta a mostrar o verso, no mesmo ângulo atual
    card.classList.add("revealed");
    card.style.transform = `rotateY(180deg) rotateZ(${tiltAtual}deg)`;
  }
});
