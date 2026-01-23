"use strict";

/* =========================
   UTIL: format local datetime
========================= */
function formatLocalDateTime(d) {
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

/* =========================
   NAV: screen switching
========================= */
const screens = Array.from(document.querySelectorAll(".screen"));
const navTabs = Array.from(document.querySelectorAll(".nav-link"));
const tabLinks = Array.from(document.querySelectorAll("[data-section]"));

function showScreen(id) {
  screens.forEach((s) =>
    s.classList.toggle("screen-active", s.id === id)
  );

  navTabs.forEach((a) =>
    a.classList.toggle("active", a.dataset.section === id)
  );

  if (id) {
    history.replaceState(null, "", `#${id}`);
  }
}

tabLinks.forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.dataset.section;
    if (!id) return;
    e.preventDefault();
    showScreen(id);
  });
});

// Load initial screen
if (screens.length) {
  const initial = (location.hash || "#home").replace("#", "");
  showScreen(initial);
}

/* =========================
   FOOTER YEAR
========================= */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* =========================
   MOBILE MENU
========================= */
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navLinks");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      navMenu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
}

/* =========================
   REVEAL ON SCROLL
========================= */
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("show"));
}

/* =========================
   HOME: typed title
========================= */
const typedTitle = document.getElementById("typedTitle");
const titleText = "booting portfolio console";
let titleIndex = 0;

function typeTitle() {
  if (!typedTitle) return;

  typedTitle.textContent = titleText.slice(0, titleIndex);
  if (titleIndex < titleText.length) {
    titleIndex++;
    setTimeout(typeTitle, 45);
  }
}

typeTitle();

/* =========================
   HOME: last updated
========================= */
const lastUpdated = document.getElementById("lastUpdated");
if (lastUpdated) {
  lastUpdated.textContent = formatLocalDateTime(new Date());
}

/* =========================
   HOME: boot lines
========================= */
const bootEl = document.getElementById("bootLines");

if (bootEl) {
  const bootLines = [
    "[+] Initializing console...",
    "[+] Loading role: Backend / Systems Student @ UMass Memorial Health",
    "[+] Focus areas: Java | Spring Boot | SQL | Systems Fundamentals",
    "[+] Background: IT Ops | Endpoint Support | Security-minded workflows",
    "[+] Status: Online",
    "[+] Ready."
  ];

  let bootIndex = 0;

  function typeBootLines() {
    if (bootIndex >= bootLines.length) return;

    const line = document.createElement("div");
    line.textContent = bootLines[bootIndex];
    bootEl.appendChild(line);

    bootIndex++;
    setTimeout(typeBootLines, 350);
  }

  typeBootLines();
}
