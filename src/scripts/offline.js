const fil = "../offline.json";

let cards;

async function fetchData() {
  const JSONDATA = await fetch(fil);
  cards = await JSONDATA.json();

  const categorySelect = document.getElementById("offline-kategoriSelect");
  const brandSelect = document.getElementById("offline-brandSelect");

  let categories = new Set();
  let brands = new Set();

  cards.forEach((card) => {
    categories.add(card.kategori);
    brands.add(card.brand);
  });

  categories.forEach((kategori) => {
    const option = document.createElement("option");
    option.value = kategori;
    option.text = kategori;
    categorySelect.appendChild(option);
  });

  brands.forEach((brand) => {
    const option = document.createElement("option");
    option.value = brand;
    option.text = brand;
    brandSelect.appendChild(option);
  });

  showCards();
  updateButtonVisibility();
}

let selectedCards = new Set();

function showCards() {
  const gallery = document.getElementById("offline-gallery");
  const template = document.querySelector(".offline-template").content;
  gallery.textContent = "";

  const kategori = document.getElementById("offline-kategoriSelect").value;
  const brand = document.getElementById("offline-brandSelect").value;

  document.getElementById("offline-brandTitle").textContent =
    brand || "All Brands";
  document.getElementById("offline-kategoriSubtitle").textContent =
    kategori || "All Categories";

  cards.forEach((card) => {
    if (
      (kategori == "" || kategori == card.kategori) &&
      (brand == "" || brand == card.brand)
    ) {
      const clone = template.cloneNode(true);

      clone.querySelector(".offline-template_frame").src =
        "../images/" + card.link;

      clone
        .querySelector(".offline-template_article")
        .addEventListener("click", (e) => {
          e.currentTarget.classList.toggle("selected");
          if (selectedCards.has(card)) {
            selectedCards.delete(card);
          } else {
            selectedCards.add(card);
          }
          updateButtonVisibility();
        });

      gallery.appendChild(clone);
    }
  });
}

function navigateToSelectedCards() {
  const selectedIds = Array.from(selectedCards, (card) => card._id).join(",");
  window.location.href = `selected-cards-offline.html?ids=${selectedIds}`;
  console.log(selectedIds);
}

document
  .getElementById("offline-view-selected-cards")
  .addEventListener("click", navigateToSelectedCards);

fetchData();

document
  .getElementById("offline-kategoriSelect")
  .addEventListener("change", showCards);
document
  .getElementById("offline-brandSelect")
  .addEventListener("change", showCards);

function deselectAllCards() {
  selectedCards.clear();
  const selectedElements = document.querySelectorAll(
    ".offline-template_article.selected"
  );
  selectedElements.forEach((el) => el.classList.remove("selected"));
  updateButtonVisibility();
}

document
  .getElementById("offline-deselect-all-cards")
  .addEventListener("click", deselectAllCards);

function updateButtonVisibility() {
  const viewSelectedCardsButton = document.getElementById(
    "offline-view-selected-cards"
  );
  const deselectAllCardsButton = document.getElementById(
    "offline-deselect-all-cards"
  );

  if (selectedCards.size > 0) {
    viewSelectedCardsButton.style.display = "block";
    deselectAllCardsButton.style.display = "block";
  } else {
    viewSelectedCardsButton.style.display = "none";
    deselectAllCardsButton.style.display = "none";
  }
}
