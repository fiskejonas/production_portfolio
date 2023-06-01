// URL til API'en og indstillinger med API-nøgle
const url = "https://frames-5130.restdb.io/rest/frames";
const options = {
  headers: {
    "x-apikey": "644143ee39cf552ef728c336",
  },
};

// Kortdata
let cards;

// Asynkron funktion til at hente kortdata fra API'en
async function fetchData() {
  const JSONDATA = await fetch(url, options);
  cards = await JSONDATA.json();

  const categorySelect = document.getElementById("kategoriSelect");
  const brandSelect = document.getElementById("brandSelect");

  let categories = new Set();
  let brands = new Set();

  // Fylder brands og categories med data fra API
  cards.forEach((card) => {
    categories.add(card.kategori);
    brands.add(card.brand);
  });

  // Tilføjer hver unik kategori til dropdown menuen
  categories.forEach((kategori) => {
    const option = document.createElement("option");
    option.value = kategori;
    option.text = kategori;
    categorySelect.appendChild(option);
  });

  // Tilføjer hver unik brand til dropdown menuen
  brands.forEach((brand) => {
    const option = document.createElement("option");
    option.value = brand;
    option.text = brand;
    brandSelect.appendChild(option);
  });

  // Viser kortdata, når det er hentet
  showCards();
  updateButtonVisibility();
}

// Sæt til at holde styr på udvalgte kort
let selectedCards = new Set();

// Funktion til at vise kortdata i DOM'en
function showCards() {
  const gallery = document.getElementById("gallery");
  const template = document.querySelector("template").content;
  gallery.textContent = "";

  const kategori = document.getElementById("kategoriSelect").value;
  const brand = document.getElementById("brandSelect").value;

  // Sæt titlen og undertitlen
  document.getElementById("brandTitle").textContent = brand || "Alle mærker";
  document.getElementById("kategoriSubtitle").textContent =
    kategori || "Alle kategorier";

  cards.forEach((card) => {
    // Vis kort, der matcher filteret
    if (
      (kategori == "" || kategori == card.kategori) &&
      (brand == "" || brand == card.brand)
    ) {
      const clone = template.cloneNode(true);

      clone.querySelector(".template_frame").src =
        "https://wmcontent.dk/_HighImpact/" + card.link;
      clone.querySelector(".template_beskrivelse").textContent =
        card.description;
      clone.querySelector(".template_navn").textContent = card.title;
      clone.querySelector(".knap").href =
        "https://wmcontent.dk/_HighImpact/" + card.top_and_mid_link;

      // Tilføj klik event listener til hvert kort
      clone
        .querySelector(".template_article")
        .addEventListener("click", (e) => {
          // Vælg/fravælg kort og opdater selectedCards med id'er
          e.currentTarget.classList.toggle("selected");
          if (selectedCards.has(card)) {
            selectedCards.delete(card);
          } else {
            selectedCards.add(card);
          }
          updateButtonVisibility();
        });

      // Tilføj kort klonen til DOM'en
      gallery.appendChild(clone);
    }
  });
}

// Funktion til at navigere til udvalgte kortside med udvalgte kort-ID'er som forespørgselsparametre
function navigateToSelectedCards() {
  const selectedIds = Array.from(selectedCards, (card) => card._id).join(",");
  window.location.href = `selected-cards.html?ids=${selectedIds}`;
}

// Tilføj klik event listener til "view-selected-cards" knappen
document
  .getElementById("view-selected-cards")
  .addEventListener("click", navigateToSelectedCards);

// Hent og vis kortdata
fetchData();

// Tilføj event listeners til dropdowns
document.getElementById("kategoriSelect").addEventListener("change", showCards);
document.getElementById("brandSelect").addEventListener("change", showCards);

function deselectAllCards() {
  // Ryd sættet med udvalgte kort
  selectedCards.clear();
  // Fjern valgt-klasse fra alle kort
  const selectedElements = document.querySelectorAll(
    ".template_article.selected"
  );
  selectedElements.forEach((el) => el.classList.remove("selected"));
  // Opdater knapvisning
  updateButtonVisibility();
}

document
  .getElementById("deselect-all-cards")
  .addEventListener("click", deselectAllCards);

function updateButtonVisibility() {
  // Opdaterer synligheden af knapper baseret på om der er valgt kort
  const viewSelectedCardsButton = document.getElementById(
    "view-selected-cards"
  );
  const deselectAllCardsButton = document.getElementById("deselect-all-cards");

  if (selectedCards.size > 0) {
    viewSelectedCardsButton.style.display = "block";
    deselectAllCardsButton.style.display = "block";
  } else {
    viewSelectedCardsButton.style.display = "none";
    deselectAllCardsButton.style.display = "none";
  }
}

// Sætter bredden på sibling2 til at være det samme som sibling1
let siblingWidth = document.querySelector(".sibling1").offsetWidth;
document.querySelector(".sibling2").style.width = siblingWidth + "px";
