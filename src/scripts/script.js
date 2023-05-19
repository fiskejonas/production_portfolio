window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  document.querySelector("#menu-btn").addEventListener("click", showMenu);
});

// Initial function to check screen width and adapt the menu
function adaptMenu() {
  var x = document.getElementById("nav_links2");

  // Use matchMedia to check viewport width
  var mq = window.matchMedia("(min-width: 640px)");

  if (mq.matches) {
    // If viewport is 640px or wider, always show the links
    x.style.display = "flex";
  } else {
    // If viewport is less than 640px wide, hide the links
    x.style.display = "none";
  }
}

// Call the function once at the beginning to set initial state
adaptMenu();

// Add the event listener to the window's resize event
window.addEventListener("resize", adaptMenu);

// Function to show/hide menu when clicking on the burger icon
function showMenu() {
  console.log("hej");
  var x = document.getElementById("nav_links2");

  // Use matchMedia to check viewport width
  var mq = window.matchMedia("(min-width: 640px)");
  var header = document.querySelector("header");

  if (!mq.matches) {
    // If viewport is less than 640px wide, toggle the links
    if (x.style.display === "none") {
      x.style.display = "flex";
      header.style.backgroundColor = "rgba(238, 238, 238)";
    } else {
      x.style.display = "none";
      header.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
    }
  }
}
