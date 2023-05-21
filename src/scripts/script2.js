// URL til API'en og options med API-nøgle
const url = "https://frames-5130.restdb.io/rest/frames";
const options = {
  headers: {
    "x-apikey": "644143ee39cf552ef728c336",
  },
};

// Kortdata
let cards;

// Asynkron funktion til at hente kortdata fra API'en
async function hentData() {
  const JSONDATA = await fetch(url, options);
  cards = await JSONDATA.json();

  const kategoriSelect = document.getElementById("kategoriSelect");
  const brandSelect = document.getElementById("brandSelect");

  let kategorier = new Set();
  let brands = new Set();

  cards.forEach((card) => {
    kategorier.add(card.kategori);
    brands.add(card.brand);
  });

  kategorier.forEach((kategori) => {
    const option = document.createElement("option");
    option.value = kategori;
    option.text = kategori;
    kategoriSelect.appendChild(option);
  });

  brands.forEach((brand) => {
    const option = document.createElement("option");
    option.value = brand;
    option.text = brand;
    brandSelect.appendChild(option);
  });

  // Vis kortdata, når de er hentet
  visCards();
}

// Set til at holde styr på valgte kort
let selectedCards = new Set();

// Funktion til at vise kortdata i DOM'en
function visCards() {
  const gallery = document.getElementById("gallery");
  const template = document.querySelector("template").content;
  gallery.textContent = "";

  const kategori = document.getElementById("kategoriSelect").value;
  const brand = document.getElementById("brandSelect").value;

  // Set the title and subtitle
  document.getElementById("brandTitle").textContent = brand || "All Brands";
  document.getElementById("kategoriSubtitle").textContent =
    kategori || "All Categories";

  cards.forEach((card) => {
    // Vis kort, der passer til filteret
    if (
      (kategori == "" || kategori == card.kategori) &&
      (brand == "" || brand == card.brand)
    ) {
      const klon = template.cloneNode(true);

      klon.querySelector(".template_frame").src =
        "https://wmcontent.dk/_HighImpact/" + card.link;
      klon.querySelector(".template_beskrivelse").textContent =
        card.description;
      klon.querySelector(".template_navn").textContent = card.title;
      klon.querySelector(".top-mid-link").href =
        "https://wmcontent.dk/_HighImpact/" + card.top_and_mid_link;

      // Tilføj klikhændelseslytter til hvert kort
      klon.querySelector(".template_article").addEventListener("click", (e) => {
        // Vælg/fravælg kort og opdater selectedCards med id'er
        e.currentTarget.classList.toggle("selected");
        if (selectedCards.has(card)) {
          selectedCards.delete(card);
        } else {
          selectedCards.add(card);
        }
      });

      // Tilføj kortklon til DOM'en
      gallery.appendChild(klon);
    }
  });
}

// Funktion til at navigere til valgte kortside med valgte kort-IDs som forespørgselsparametre
function navigateToSelectedCards() {
  const selectedIds = Array.from(selectedCards, (card) => card._id).join(",");
  window.location.href = `selected-cards.html?ids=${selectedIds}`;
}

// Tilføj klikhændelseslytter til "view-selected-cards" knappen
document
  .getElementById("view-selected-cards")
  .addEventListener("click", navigateToSelectedCards);

// Hent og vis kortdata
hentData();

// Tilføj event listeners til dropdowns
document.getElementById("kategoriSelect").addEventListener("change", visCards);
document.getElementById("brandSelect").addEventListener("change", visCards);

var siblingWidth = document.querySelector(".sibling1").offsetWidth;
document.querySelector(".sibling2").style.width = siblingWidth + "px";
