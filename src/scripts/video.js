const fil = "../video.json";

let cards;

async function fetchData() {
  const JSONDATA = await fetch(fil);
  cards = await JSONDATA.json();

  const categorySelect = document.getElementById("video-kategoriSelect");
  const brandSelect = document.getElementById("video-brandSelect");

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
  const gallery = document.getElementById("video-gallery");
  const template = document.querySelector(".video-template").content;
  gallery.textContent = "";

  const kategori = document.getElementById("video-kategoriSelect").value;
  const brand = document.getElementById("video-brandSelect").value;

  document.getElementById("video-brandTitle").textContent =
    brand || "All Brands";
  document.getElementById("video-kategoriSubtitle").textContent =
    kategori || "All Categories";

  cards.forEach((card) => {
    if (
      (kategori == "" || kategori == card.kategori) &&
      (brand == "" || brand == card.brand)
    ) {
      const clone = template.cloneNode(true);

      clone.querySelector(".video-template_frame").src =
        "../video/" + card.link;

      clone
        .querySelector(".video-template_article")
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
  window.location.href = `selected-cards-video.html?ids=${selectedIds}`;
  console.log(selectedIds);
}

document
  .getElementById("video-view-selected-cards")
  .addEventListener("click", navigateToSelectedCards);

fetchData();

document
  .getElementById("video-kategoriSelect")
  .addEventListener("change", showCards);
document
  .getElementById("video-brandSelect")
  .addEventListener("change", showCards);

function deselectAllCards() {
  selectedCards.clear();
  const selectedElements = document.querySelectorAll(
    ".video-template_article.selected"
  );
  selectedElements.forEach((el) => el.classList.remove("selected"));
  updateButtonVisibility();
}

document
  .getElementById("video-deselect-all-cards")
  .addEventListener("click", deselectAllCards);

function updateButtonVisibility() {
  const viewSelectedCardsButton = document.getElementById(
    "video-view-selected-cards"
  );
  const deselectAllCardsButton = document.getElementById(
    "video-deselect-all-cards"
  );

  if (selectedCards.size > 0) {
    viewSelectedCardsButton.style.display = "block";
    deselectAllCardsButton.style.display = "block";
  } else {
    viewSelectedCardsButton.style.display = "none";
    deselectAllCardsButton.style.display = "none";
  }
}
