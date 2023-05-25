// URL to the API and options with API key
const fil = "../video.json";

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
  const section = document.querySelector("#video-gallery2");
  const template = document.querySelector(".video-template").content;
  section.textContent = "";

  // Iterer gennem kortene og tilføj dem til DOM'en
  cardsToDisplay.forEach((card) => {
    const klon = template.cloneNode(true);

    klon.querySelector(".video-template_frame").src = "../video/" + card.link;
    section.appendChild(klon);
  });
}

// Kald displaySelectedCards-funktionen for at vise de valgte kort
displaySelectedCards();

const button = document.getElementById("copyButton");

button.addEventListener("click", () => {
  // Get the current page URL
  const link = window.location.href;

  // Create a new textarea element, set its value to the link, and add it to the DOM
  const textarea = document.createElement("textarea");
  textarea.value = link;
  document.body.appendChild(textarea);

  // Select the link inside the textarea and copy it to the clipboard
  textarea.select();
  document.execCommand("copy");

  // Remove the textarea from the DOM
  document.body.removeChild(textarea);

  // Change the button text to indicate that the link has been copied
  button.textContent = "Link Copied!";

  // Change the button text back after 4 seconds
  setTimeout(() => (button.textContent = "Copy Link"), 4000);
});
