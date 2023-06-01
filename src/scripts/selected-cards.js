// selected-cards.js

// API URL og options (inklusiv API-nøgle)
// URL til API'en og options med API-nøgle
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
    klon.querySelector(".template_navn").textContent = card.title;
    klon.querySelector(".knap").href =
      "https://wmcontent.dk/_HighImpact/" + card.top_and_mid_link;
    section.appendChild(klon);
  });
}

// Kald displaySelectedCards-funktionen for at vise de valgte kort
displaySelectedCards();

const button = document.getElementById("copyButton");

// Tilføjer en event listener til knappen, som udfører en asynkron funktion når der klikkes
button.addEventListener("click", async () => {
  // Henter den nuværende side URL
  const link = window.location.href;

  // Bruger Clipboard API til at kopiere linket
  try {
    await navigator.clipboard.writeText(link);

    // Ændrer knappens tekst til at indikere at linket er blevet kopieret
    button.textContent = "Link kopieret!";

    // Ændrer knappens baggrundsfarve til grøn
    button.style.backgroundColor = "#58C369";

    // Ændrer knappens tekst og farve tilbage efter 3 sekunder
    setTimeout(() => {
      button.textContent = "Kopier link";
      // Dette vil nulstille den til standard eller CSS-defineret farve
      button.style.backgroundColor = "";
    }, 3000);
  } catch (err) {
    // Hvis der opstår en fejl, logges det i konsollen
    console.error("Failed to copy link: ", err);
  }
});
