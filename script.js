const symbols = ["🍎","🍌","🍇","🍓","🍒","🥝"];
let cards = [...symbols, ...symbols];
cards.sort(() => Math.random() - 0.5);

const game = document.getElementById("game");
const win = document.getElementById("win");

let firstCard = null;
let lock = false;
let matched = 0;

cards.forEach(symbol => {
  const card = document.createElement("div");
  card.className = "card";
  card.textContent = "❓";

  card.onclick = () => {
    if (lock || card.classList.contains("open")) return;

    card.classList.add("open");
    card.textContent = symbol;

    if (!firstCard) {
      firstCard = card;
    } else {
      lock = true;
      if (firstCard.textContent === card.textContent) {
        firstCard.classList.add("matched");
        card.classList.add("matched");
        matched += 2;
        reset();

        if (matched === cards.length) {
          win.style.display = "block";
        }
      } else {
        setTimeout(() => {
          firstCard.classList.remove("open");
          card.classList.remove("open");
          firstCard.textContent = "❓";
          card.textContent = "❓";
          reset();
        }, 800);
      }
    }
  };

  game.appendChild(card);
});

function reset() {
  firstCard = null;
  lock = false;
}
