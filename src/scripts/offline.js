// URL to the API and options with API key
const fil = "../actors.json";

// Card data
let cards;

// Asynchronous function to get card data from the API
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

  // Show card data once it's fetched
  showCards();
  updateButtonVisibility();
}

// Set to keep track of selected cards
let selectedCards = new Set();

// Function to display card data in the DOM
function showCards() {
  const gallery = document.getElementById("offline-gallery");
  const template = document.querySelector(".offline-template").content;
  gallery.textContent = "";

  const kategori = document.getElementById("offline-kategoriSelect").value;
  const brand = document.getElementById("offline-brandSelect").value;

  // Set the title and subtitle
  document.getElementById("offline-brandTitle").textContent =
    brand || "All Brands";
  document.getElementById("offline-kategoriSubtitle").textContent =
    kategori || "All Categories";

  cards.forEach((card) => {
    // Show cards that match the filter
    if (
      (kategori == "" || kategori == card.kategori) &&
      (brand == "" || brand == card.brand)
    ) {
      const clone = template.cloneNode(true);

      clone.querySelector(".offline-template_frame").src =
        "../images/" + card.link;

      // Add click event listener to each card
      clone
        .querySelector(".offline-template_article")
        .addEventListener("click", (e) => {
          // Select/deselect card and update selectedCards with ids
          e.currentTarget.classList.toggle("selected");
          if (selectedCards.has(card)) {
            selectedCards.delete(card);
          } else {
            selectedCards.add(card);
          }
          updateButtonVisibility();
        });

      // Add card clone to the DOM
      gallery.appendChild(clone);
    }
  });
}

// Function to navigate to selected cards page with selected card IDs as query parameters
function navigateToSelectedCards() {
  const selectedIds = Array.from(selectedCards, (card) => card._id).join(",");
  window.location.href = `selected-cards-offline.html?ids=${selectedIds}`;
  console.log(selectedIds);
}

// Add click event listener to "view-selected-cards" button
document
  .getElementById("offline-view-selected-cards")
  .addEventListener("click", navigateToSelectedCards);

// Fetch and display card data
fetchData();

// Add event listeners to dropdowns
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
