// === Splash Screen ===
const splashScreen = document.getElementById("splashScreen");
if (splashScreen) {
  setTimeout(() => {
    splashScreen.classList.add("splash-hidden");
    setTimeout(() => splashScreen.remove(), 700);
  }, 2300);
}

const darkModeBtn = document.getElementById("darkModeBtn");

// === Hamburger Menu ===
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu      = document.getElementById("navMenu");

hamburgerBtn.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("nav-open");
  hamburgerBtn.classList.toggle("hamburger-active");
  hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("nav-open");
    hamburgerBtn.classList.remove("hamburger-active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
  });
});

// === Navigation Active Link ===
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {
  let currentSection = "";
  sections.forEach(section => {
    if (window.pageYOffset >= section.offsetTop - 200) {
      currentSection = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("data-section") === currentSection) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);

// === Smooth Navigation ===
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const section = document.querySelector(link.getAttribute("href"));
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// === Parallax Header ===
const mainHeader = document.getElementById("mainHeader");
window.addEventListener("scroll", () => {
  if (mainHeader) {
    mainHeader.style.backgroundPositionY = (window.pageYOffset * 0.4) + "px";
  }
});

// === Dark Mode ===
const isDarkMode = localStorage.getItem("darkMode") === "true";
if (isDarkMode) {
  document.body.classList.add("dark-mode");
  darkModeBtn.textContent = "☀️ Mode Clair";
}

darkModeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  const dark = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", dark ? "true" : "false");
  darkModeBtn.textContent = dark ? "☀️ Mode Clair" : "🌙 Mode Sombre";
});

// === Reveal on Scroll ===
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal-visible");
    } else {
      // Reset quand l'élément quitte l'écran → se réanime au prochain scroll
      entry.target.classList.remove("reveal-visible");
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });

function observeRevealItems() {
  document.querySelectorAll(".reveal-item").forEach(item => revealObserver.observe(item));
}

// === Typing Animation ===
function animateText(element, text, speed = 40) {
  element.textContent = "";
  let i = 0;
  const interval = setInterval(() => {
    element.textContent += text[i++];
    if (i >= text.length) clearInterval(interval);
  }, speed);
}

const mainTitle = document.querySelector(".header-content h1");
const subtitle  = document.querySelector(".header-content .subtitle");
const bio       = document.querySelector(".header-content .bio");

if (mainTitle) { const t = mainTitle.textContent; mainTitle.textContent = ""; animateText(mainTitle, t, 48); }
if (subtitle)  { animateText(subtitle, subtitle.textContent, 32); }
if (bio)       { const t = bio.textContent; bio.textContent = ""; setTimeout(() => animateText(bio, t, 28), 700); }

observeRevealItems();

// === EmailJS ===
if (window.emailjs) emailjs.init("Ty85Zw8NUdUgZG4GS");

// === Contact Form ===
const contactForm  = document.getElementById("contactForm");
const contactName  = document.getElementById("contactName");
const contactEmail = document.getElementById("contactEmail");
const contactMsg   = document.getElementById("contactMsg");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name    = contactName.value.trim();
  const email   = contactEmail.value.trim();
  const message = contactMsg.value.trim();

  if (!name || !email || !message) { alert("Veuillez remplir tous les champs"); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert("Email invalide"); return; }

  emailjs.send("service_6qmoq1d", "template_vm2uimr", { from_name: name, from_email: email, message })
    .then(() => { contactForm.reset(); showNotification("📧 Message envoyé avec succès!"); },
          ()  => { alert("Erreur lors de l'envoi du message."); });
});

// === Notification Toast ===
function showNotification(message) {
  const n = document.createElement("div");
  n.style.cssText = "position:fixed;top:20px;right:20px;background:#2ecc71;color:white;padding:16px 24px;border-radius:12px;font-weight:600;z-index:10000;animation:slideInRight 0.4s ease;";
  n.textContent = message;
  document.body.appendChild(n);
  setTimeout(() => { n.style.animation = "slideInLeft 0.4s ease"; setTimeout(() => n.remove(), 400); }, 3000);
}

const style = document.createElement("style");
style.textContent = `
  @keyframes slideInRight { from{opacity:0;transform:translateX(100px)} to{opacity:1;transform:translateX(0)} }
  @keyframes slideInLeft  { from{opacity:1;transform:translateX(0)} to{opacity:0;transform:translateX(100px)} }
`;
document.head.appendChild(style);

// === Scroll to Top ===
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.pageYOffset > 300 ? "inline-block" : "none";
});
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });
}

console.log("🎓 Portfolio Étudiant chargé!");
