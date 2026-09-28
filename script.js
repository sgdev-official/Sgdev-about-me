/* ==========================================================
   Shubhomoy (Sgdev) portfolio - script.js
   Three small features: theme toggle, card hover glow,
   and scroll reveal. No libraries needed.
   ========================================================== */

(function () {
  "use strict";

  var root = document.documentElement;

  // Tells the CSS that JavaScript is running, so the reveal animation can start.
  root.classList.add("js");

  /* ---------- 1. Light / dark theme ---------- */

  // Restore the theme the visitor picked last time (if any).
  try {
    var savedTheme = localStorage.getItem("theme");
    if (savedTheme) root.setAttribute("data-theme", savedTheme);
  } catch (error) {
    // Storage can be blocked. The site still works with the system theme.
  }

  // Works out which theme is showing right now.
  function currentTheme() {
    var chosen = root.getAttribute("data-theme");
    if (chosen) return chosen;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  // Switch theme when the round button in the navigation is clicked.
  var themeButton = document.getElementById("theme");
  themeButton.addEventListener("click", function () {
    var nextTheme = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch (error) {
      // Ignore: the choice just will not be remembered.
    }
  });

  /* ---------- 2. Glow that follows the mouse on cards ---------- */

  document.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("pointermove", function (event) {
      var box = card.getBoundingClientRect();
      card.style.setProperty("--mx", event.clientX - box.left + "px");
      card.style.setProperty("--my", event.clientY - box.top + "px");
    });
  });

  /* ---------- 3. Fade elements in as they scroll into view ---------- */

  var revealItems = document.querySelectorAll(".rv");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target); // Animate only once.
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach(function (item, index) {
      item.style.transitionDelay = (index % 4) * 70 + "ms"; // Small stagger.
      observer.observe(item);
    });
  } else {
    // Very old browsers: just show everything.
    revealItems.forEach(function (item) {
      item.classList.add("in");
    });
  }
})();
