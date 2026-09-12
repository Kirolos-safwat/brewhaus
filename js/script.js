"use strict";

/**
 * ==========================================================================
 * BREWHAUS COFFEE - MAIN JAVASCRIPT
 * ==========================================================================
 */

// Select navbar element
const navbar = document.querySelector(".navbar");

// Listen for page scroll to toggle sticky overlay background
window.addEventListener("scroll", () => {
  // If scrolled past 50px, add scrolled background; otherwise remove it
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
function openNavMenu() {
  const burgerMenu = document.getElementById("burgerMenu");
  burgerMenu.style.transition = "0.25s ease";
  // Check if the menu icon is currently the "bars" icon
  if (burgerMenu.classList.contains("fa-bars")) {
    burgerMenu.classList.remove("fa-bars");
    burgerMenu.classList.add("fa-x");
  } else {
    burgerMenu.classList.remove("fa-x");
    burgerMenu.classList.add("fa-bars");
  }



  if (burgerMenu.classList.contains("fa-bars")) {
    document.getElementById("phoneNav").style.display = "none";
  } else {
    document.getElementById("phoneNav").style.display = "block";
  }
}
  const isMobile = window.matchMedia("(max-width: 767px)").matches;

