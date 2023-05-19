// selected-cards.js

// API URL og options (inklusiv API-nøgle)
const url = "https://frames-5130.restdb.io/rest/frames";
const options = {
  headers: {
    "x-apikey": "644143ee39cf552ef728c336",
  },
};

// Funktion til at hente valgte kort-IDs fra URL'en
function getSelectedCardIds() {
  const queryString = new URLSearchParams(window.location.search);
  const idsString = queryString.get("ids");
  return idsString ? idsString.split(",") : [];
}

// Asynkron funktion til at vise valgte kort
async function displaySelectedCards() {
  const selectedCardIds = getSelectedCardIds();
  if (selectedCardIds.length === 0) return;

  // Hent alle kortdata fra API'en
  const JSONDATA = await fetch(url, options);
  const allCards = await JSONDATA.json();

  // Filtrer kortene for at finde de valgte kort
  const selectedCards = allCards.filter((card) =>
    selectedCardIds.includes(card._id)
  );

  // Brug visCards-funktionen til at vise de valgte kort
  visCards(selectedCards);
}

// Funktion til at vise kort i DOM'en
function visCards(cardsToDisplay) {
  const section = document.querySelector("section");
  const template = document.querySelector("template").content;
  section.textContent = "";

  // Iterer gennem kortene og tilføj dem til DOM'en
  cardsToDisplay.forEach((card) => {
    const klon = template.cloneNode(true);

    klon.querySelector(".template_frame").src =
      "https://wmcontent.dk/_HighImpact/" + card.link;
    klon.querySelector(".template_beskrivelse").textContent = card.description;
    section.appendChild(klon);
  });
}

// Kald displaySelectedCards-funktionen for at vise de valgte kort
displaySelectedCards();
