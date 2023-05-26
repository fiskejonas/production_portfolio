import "../styles/styles.css";

const btnLight = document.querySelector("#light");
const btnDark = document.querySelector("#dark");

if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

function toggleTheme(e) {
  const mode = e.target.dataset.theme;
  if (mode !== "dark") {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
}

btnLight.addEventListener("click", toggleTheme);
btnDark.addEventListener("click", toggleTheme);
