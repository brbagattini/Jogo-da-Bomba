const nameEl = document.getElementById("selectedName");
const card = document.getElementById("bombCard");
const revealBtn = document.getElementById("revealBtn");

const selected = localStorage.getItem("selecionado");
if (!selected) {
  nameEl.textContent = "Ninguém selecionado";
} else {
  nameEl.textContent = selected;
}

let revealed = false;

function flip() {
  revealed = !revealed;
  if (revealed) {
    card.classList.add("flip");
  } else {
    card.classList.remove("flip");
  }
}

revealBtn.addEventListener("click", flip);
card.addEventListener("click", flip);
