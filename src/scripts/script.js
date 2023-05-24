window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  document.querySelector("#menu-btn").addEventListener("click", showMenu);
});

// Initial function to check screen width and adapt the menu
function adaptMenu() {
  const x = document.querySelector("header");
  const y = document.querySelector(".header-logo");

  // Use matchMedia to check viewport width
  let mq = window.matchMedia("(min-width: 640px)");

  if (mq.matches) {
    // If viewport is 640px or wider, always show the links
    x.style.display = "flex";
    y.style.display = "none";
  } else {
    // If viewport is less than 640px wide, hide the links
    x.style.display = "none";
    y.style.display = "flex";
  }
}

// Call the function once at the beginning to set initial state
adaptMenu();

// Add the event listener to the window's resize event
window.addEventListener("resize", adaptMenu);

// Function to show/hide menu when clicking on the burger icon
function showMenu() {
  console.log("hej");
  const x = document.querySelector("header");
  const y = document.querySelector(".header-logo");

  // Use matchMedia to check viewport width
  let mq = window.matchMedia("(min-width: 640px)");

  if (!mq.matches) {
    // If viewport is less than 640px wide, toggle the links
    if (x.style.display === "none") {
      x.style.display = "flex";
      y.style.display = "flex";
    } else {
      x.style.display = "none";
      y.style.display = "none";
    }
  }
}
