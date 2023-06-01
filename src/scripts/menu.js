// Tilføj event listener til vinduet, der kører når hele DOM'en er indlæst og klar
window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM er fuldt indlæst og parset");
  // Tilføj en event listener til menu-knappen, som kalder funktionen showMenu ved klik
  document.querySelector("#menu-btn").addEventListener("click", showMenu);

  // Vælg alle links i din menu
  let menuLinks = document.querySelectorAll(".other-links a");

  // Tilføj event listener til hvert link
  menuLinks.forEach((link) => {
    // Ved klik på hvert link, kaldes showMenu funktionen
    link.addEventListener("click", showMenu);
  });
});

// Initial funktion til at tjekke skærmens bredde og tilpasse menuen
function adaptMenu() {
  const x = document.querySelector("header");
  const y = document.querySelector(".header-logo");

  // Brug matchMedia til at tjekke viewport bredde
  let mq = window.matchMedia("(min-width: 640px)");

  if (mq.matches) {
    // Hvis viewport er 640px eller bredere, vis altid links
    x.style.display = "flex";
    y.style.display = "none";
  } else {
    // Hvis viewport er mindre end 640px bred, skjul links
    x.style.display = "none";
    y.style.display = "flex";
  }
}

// Kald funktionen én gang i starten for at sætte initial tilstand
adaptMenu();

// Tilføj event listener til vinduets resize event
window.addEventListener("resize", adaptMenu);

// Funktion til at vise/skjule menuen ved klik på burgerikonet
function showMenu() {
  console.log("hej");
  const x = document.querySelector("header");
  const y = document.querySelector(".header-logo");

  // Brug matchMedia til at tjekke viewport bredde
  let mq = window.matchMedia("(min-width: 640px)");

  if (!mq.matches) {
    // Hvis viewport er mindre end 640px bred, skift tilstand for links
    if (x.style.display === "none") {
      x.style.display = "flex";
      y.style.display = "flex";
      document.body.classList.add("noScroll");
    } else {
      x.style.display = "none";
      y.style.display = "none";
      document.body.classList.remove("noScroll");
    }
  }
}

// Vælg alle sections med klassen "section1"
const sections = document.querySelectorAll(".section1");
// Vælg alle menu links
const menu_links = document.querySelectorAll(".menu-item");

// Tilføj event listener til vinduets scroll event
window.addEventListener("scroll", function () {
  // Gem hvor meget vinduet er scrollet op
  let fromTop = window.scrollY;

  // For hvert menu link
  menu_links.forEach((link) => {
    // Find den section som linket peger på
    let section = document.querySelector(link.hash);

    // Find img elementet i linket
    let img = link.querySelector("img");

    // Hvis vinduet er scrollet til sectionen, og sectionen stadig er i view
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      // Tilføj klassen "current" til img elementet
      img.classList.add("current");
    } else {
      // Fjern klassen "current" fra img elementet
      img.classList.remove("current");
    }
  });
});
