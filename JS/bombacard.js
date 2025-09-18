import QUESTIONS from "./questions.js"; 
const detonateBtn  = document.getElementById("detonateBtn");
const explosion    = document.getElementById("explosion");
const levelMinSel  = document.getElementById("levelMin");
const levelMaxSel  = document.getElementById("levelMax");
const questionCard = document.getElementById("questionCard");
const qTextEl      = document.getElementById("qText");
const qLevelEl     = document.getElementById("qLevel");

const ALL_PLAYERS = JSON.parse(localStorage.getItem("jogadores") || "[]");
const SELECTED    = localStorage.getItem("selecionado") || null;

const rand    = (min, max) => Math.random() * (max - min) + min;
const rint    = (min, max) => Math.floor(rand(min, max + 1));
const choose  = (arr) => arr[Math.floor(Math.random() * arr.length)];

const COLORS     = ["#FF2E2E", "#FFD93D", "#FF7B00", "#FFF1A6", "#F8B400", "#FFE07D", "#FFFFFF"];
const BASE_SIZE  = [6,7,8,9,10];
const DUR_RANGE  = [650, 1000];

levelMinSel.value = "1";
levelMaxSel.value = "5";

function pickOtherPlayer() {
  if (!ALL_PLAYERS.length) return null;
  const pool = SELECTED ? ALL_PLAYERS.filter(p => p !== SELECTED) : ALL_PLAYERS.slice();
  if (!pool.length) return null;
  return choose(pool);
}

function renderTextWithOther(text) {
  if (!text.includes("{{outro}}")) return text;
  const outro = pickOtherPlayer();
  return text.replaceAll("{{outro}}", outro || "outro jogador");
}

function detonar() {
  let min = parseInt(levelMinSel.value, 10);
  let max = parseInt(levelMaxSel.value, 10);
  if (isNaN(min) || isNaN(max)) return;
  if (min > max) [min, max] = [max, min];

  const pool = QUESTIONS.filter(q => q.level >= min && q.level <= max);
  if (!pool.length) { alert("Não há perguntas para esse intervalo de nível."); return; }
  const q = choose(pool);

  explosion.querySelectorAll(".particle").forEach(p => p.remove());
  questionCard.hidden = true;
  questionCard.classList.remove("reveal");
  qTextEl.textContent = "";
  qLevelEl.textContent = `Nível ${q.level}`;

  const flash = document.createElement("div");
  flash.className = "flash-screen";
  document.body.appendChild(flash);
  flash.addEventListener("animationend", () => flash.remove(), { once: true });

  const level  = q.level;
  const count  = 18 + level * 8;
  const radius = 70 + level * 10;
  for (let i = 0; i < count; i++) {
    const angle = rand(0, Math.PI * 2);
    const dist  = rand(radius * 0.5, radius);
    const dx    = Math.cos(angle) * dist;
    const dy    = Math.sin(angle) * dist;

    const part = document.createElement("span");
    part.className = "particle";
    part.style.setProperty("--dx", `${dx}px`);
    part.style.setProperty("--dy", `${dy}px`);
    part.style.setProperty("--size", `${choose(BASE_SIZE) + Math.round(level/3)}px`);
    part.style.setProperty("--color", choose(COLORS));
    part.style.setProperty("--dur", `${rint(DUR_RANGE[0], DUR_RANGE[1])}ms`);
    explosion.appendChild(part);
    part.addEventListener("animationend", () => part.remove(), { once: true });
  }

  setTimeout(() => {
    qTextEl.textContent = renderTextWithOther(q.text);
    questionCard.hidden = false;
    requestAnimationFrame(() => questionCard.classList.add("reveal"));
  }, 220);
}

detonateBtn.addEventListener("click", detonar);
