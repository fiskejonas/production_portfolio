// URL to the API and options with API key
const fil = "../offline.json";

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
  const JSONDATA = await fetch(fil);
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
  const section = document.querySelector("#offline-gallery2");
  const template = document.querySelector(".offline-template").content;
  section.textContent = "";

  // Iterer gennem kortene og tilføj dem til DOM'en
  cardsToDisplay.forEach((card) => {
    const klon = template.cloneNode(true);

    klon.querySelector(".offline-template_frame").src =
      "../images/" + card.link;
    section.appendChild(klon);
  });
}

// Kald displaySelectedCards-funktionen for at vise de valgte kort
displaySelectedCards();

const button = document.getElementById("copyButton");

button.addEventListener("click", async () => {
  const link = window.location.href;

  try {
    await navigator.clipboard.writeText(link);

    button.textContent = "Link Copied!";

    button.style.backgroundColor = "#58C369";

    setTimeout(() => {
      button.textContent = "Copy Link";
      button.style.backgroundColor = "";
    }, 3000);
  } catch (err) {
    console.error("Failed to copy link: ", err);
  }
});
