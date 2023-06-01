import "../styles/styles.css";

// Finder knapperne for lys og mørk tilstand
const btnLight = document.querySelector("#light");
const btnDark = document.querySelector("#dark");

// Tjekker om den gemte tema er sat til mørk, eller hvis brugerens præference er mørk
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  // Hvis ja, sætter temaet til mørk
  document.documentElement.classList.add("dark");
} else {
  // Hvis nej, fjerner mørk tema
  document.documentElement.classList.remove("dark");
}

function toggleTheme(e) {
  // Henter temaet fra knappens data-theme attribut
  const mode = e.target.dataset.theme;
  if (mode !== "dark") {
    // Hvis det ikke er mørkt, skiftes til mørkt tema
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    // Hvis det er mørkt, skiftes til lyst tema
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
}

// Tilføjer eventlisteners til lys og mørk knapperne for at skifte tema når de klikkes
btnLight.addEventListener("click", toggleTheme);
btnDark.addEventListener("click", toggleTheme);
