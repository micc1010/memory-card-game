const images = [
  "images/img1.jpg",
  "images/img2.jpg",
  "images/img3.jpg",
  "images/img4.jpg",
  "images/img5.jpg",
  "images/img6.jpg"
];

let cardsData = [...images, ...images];
cardsData.sort(() => Math.random() - 0.5);

const game = document.getElementById("game");
const win = document.getElementById("win");

let firstCard = null;
let lock = false;
let matched = 0;

cardsData.forEach(img => {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.image = img;

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">❓</div>
      <div class="card-back">
        <img src="${img}">
      </div>
    </div>
  `;

  card.onclick = () => {
    if (lock || card.classList.contains("open")) return;

    card.classList.add("open");

    if (!firstCard) {
      firstCard = card;
    } else {
      lock = true;

      if (firstCard.dataset.image === card.dataset.image) {
        matched += 2;
        reset();

        if (matched === cardsData.length) {
          setTimeout(() => {
            window.location.href = "result.html";
          }, 800);
        }
      } else {
        setTimeout(() => {
          firstCard.classList.remove("open");
          card.classList.remove("open");
          reset();
        }, 900);
      }
    }
  };

  game.appendChild(card);
});

function reset() {
  firstCard = null;
  lock = false;
}
