// ====== UTIL: format last-updated like "1/21/2026, 9:04:01 PM" ======
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

// ====== NAV: show one "screen" at a time (like tabbed pages) ======
const screens = Array.from(document.querySelectorAll(".screen"));
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const tabLinks = Array.from(document.querySelectorAll("[data-section]"));

function showScreen(id) {
  screens.forEach(s => s.classList.toggle("screen-active", s.id === id));
  navLinks.forEach(a => a.classList.toggle("active", a.dataset.section === id));
  history.replaceState(null, "", `#${id}`);
}

tabLinks.forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.dataset.section;
    if (!id) return;
    e.preventDefault();
    showScreen(id);
  });
});

// On load: default to #home
const initial = (location.hash || "#home").replace("#", "");
showScreen(initial);

// ====== Footer year ======
document.getElementById("year").textContent = new Date().getFullYear();

// ====== HOME: typed title line ("booting security console") ======
const typedTitle = document.getElementById("typedTitle");
const titleText = "booting portfolio console";
let t = 0;

function typeTitle() {
  typedTitle.textContent = titleText.slice(0, t);
  if (t < titleText.length) {
    t++;
    setTimeout(typeTitle, 45);
  }
}
typeTitle();

// ====== HOME: last updated timestamp ======
document.getElementById("lastUpdated").textContent = formatLocalDateTime(new Date());

// ====== HOME: boot lines (typewriter effect) ======
const bootEl = document.getElementById("bootLines");

const bootLines = [
  "[+] Initializing console...",
  "[+] Loading role: Backend / Systems Student @ UMass Memorial Health",
  "[+] Focus areas: Java | Spring Boot | SQL | Systems Fundamentals",
  "[+] Background: IT Ops | Endpoint Support | Security-minded workf
