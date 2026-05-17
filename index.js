const darkModeBtn = document.getElementById("darkModeBtn");
const htmlElement = document.documentElement;
const manageBtn = document.getElementById("manageBtn");
const logoutBtn = document.getElementById("logoutBtn");
const adminModal = document.getElementById("adminModal");
const adminPanel = document.getElementById("adminPanel");
const adminPassword = document.getElementById("adminPassword");
const adminLoginBtn = document.getElementById("adminLoginBtn");
const adminCancelBtn = document.getElementById("adminCancelBtn");
const adminError = document.getElementById("adminError");

// === Admin Password (change this!) ===
const ADMIN_PASSWORD = "hamza2026";

let isAdmin = sessionStorage.getItem("isAdmin") === "true";

function setAdminMode(active) {
  isAdmin = active;
  sessionStorage.setItem("isAdmin", active ? "true" : "false");
  adminPanel.style.display = active ? "block" : "none";
  manageBtn.style.display = active ? "none" : "inline-flex";
  logoutBtn.style.display = active ? "inline-flex" : "none";
  displayProjects();
}

// Restore admin state on reload
if (isAdmin) {
  adminPanel.style.display = "block";
  manageBtn.style.display = "none";
  logoutBtn.style.display = "inline-flex";
}

manageBtn.addEventListener("click", () => {
  adminModal.style.display = "flex";
  adminPassword.value = "";
  adminError.style.display = "none";
  setTimeout(() => adminPassword.focus(), 100);
});

adminCancelBtn.addEventListener("click", () => {
  adminModal.style.display = "none";
});

adminModal.addEventListener("click", (e) => {
  if (e.target === adminModal) adminModal.style.display = "none";
});

adminLoginBtn.addEventListener("click", () => {
  if (adminPassword.value === ADMIN_PASSWORD) {
    adminModal.style.display = "none";
    setAdminMode(true);
  } else {
    adminError.style.display = "block";
    adminPassword.value = "";
    adminPassword.focus();
  }
});

adminPassword.addEventListener("keydown", (e) => {
  if (e.key === "Enter") adminLoginBtn.click();
});

logoutBtn.addEventListener("click", () => {
  setAdminMode(false);
});


// === Navigation Active Link ===
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {
  let currentSection = "";
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
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

// === Smooth Click Navigation ===
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute("href");
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const isDarkMode = localStorage.getItem("darkMode") === "true";
if (isDarkMode) {
  document.body.classList.add("dark-mode");
  darkModeBtn.textContent = "☀️ Mode Clair";
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });

function animateText(element, text, speed = 40) {
  element.textContent = "";
  let index = 0;
  const interval = setInterval(() => {
    element.textContent += text[index];
    index += 1;
    if (index >= text.length) {
      clearInterval(interval);
    }
  }, speed);
}

function observeRevealItems() {
  document.querySelectorAll(".reveal-item").forEach(item => revealObserver.observe(item));
}

if (window.emailjs) {
  emailjs.init("Ty85Zw8NUdUgZG4GS");
}

darkModeBtn.addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
  const isNowDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isNowDarkMode ? "true" : "false");
  darkModeBtn.textContent = isNowDarkMode ? "☀️ Mode Clair" : "🌙 Mode Sombre";
});

const projectForm = document.getElementById("projectForm");
const projectName = document.getElementById("projectName");
const projectDesc = document.getElementById("projectDesc");
const projectTech = document.getElementById("projectTech");
const projectsList = document.getElementById("projectsList");

let projects = JSON.parse(localStorage.getItem("projects")) || [
  {
    id: 1,
    name: "Sign Up Form",
    description: "Formulaire d'inscription avec validation",
    technologies: "HTML, CSS, JavaScript"
  },
  {
    id: 2,
    name: "Portfolio Étudiant",
    description: "Page portfolio personnel avec mode sombre",
    technologies: "HTML, CSS, JavaScript"
  }
];

function displayProjects() {
  projectsList.innerHTML = "";

  if (projects.length === 0) {
    projectsList.innerHTML = '<div class="empty-state"><p>Aucun projet pour le moment. Ajoutez-en un!</p></div>';
    return;
  }

  projects.forEach((project, index) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card", "reveal-item");
    projectCard.style.setProperty("--delay", `${index * 70}ms`);
    projectCard.innerHTML = `
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <div class="project-tech">
        ${project.technologies.split(",").map(tech => `<span class="tech-label">${tech.trim()}</span>`).join("")}
      </div>
      ${isAdmin ? `<button class="btn-delete" onclick="deleteProject(${project.id})">🗑️ Supprimer</button>` : ""}
    `;
    projectsList.appendChild(projectCard);
    revealObserver.observe(projectCard);
  });
}

projectForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = projectName.value.trim();
  const desc = projectDesc.value.trim();
  const tech = projectTech.value.trim();

  if (!name || !desc || !tech) {
    alert("Veuillez remplir tous les champs");
    return;
  }

  const newProject = {
    id: Date.now(),
    name: name,
    description: desc,
    technologies: tech
  };

  projects.push(newProject);
  localStorage.setItem("projects", JSON.stringify(projects));

  projectForm.reset();
  displayProjects();

  showNotification("✅ Projet ajouté avec succès!");
});

function deleteProject(id) {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce projet?")) {
    projects = projects.filter(p => p.id !== id);
    localStorage.setItem("projects", JSON.stringify(projects));
    displayProjects();
    showNotification("🗑️ Projet supprimé!");
  }
}

const contactForm = document.getElementById("contactForm");
const contactName = document.getElementById("contactName");
const contactEmail = document.getElementById("contactEmail");
const contactMsg = document.getElementById("contactMsg");

contactForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = contactName.value.trim();
  const email = contactEmail.value.trim();
  const message = contactMsg.value.trim();

  if (!name || !email || !message) {
    alert("Veuillez remplir tous les champs");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Veuillez entrer un email valide");
    return;
  }

  const templateParams = {
    from_name: name,
    from_email: email,
    message: message
  };

  emailjs.send("service_6qmoq1d", "template_vm2uimr", templateParams)
    .then(function() {
      const messages = JSON.parse(localStorage.getItem("messages")) || [];
      messages.push({
        id: Date.now(),
        name: name,
        email: email,
        message: message,
        date: new Date().toLocaleString("fr-FR")
      });
      localStorage.setItem("messages", JSON.stringify(messages));

      contactForm.reset();
      showNotification("📧 Message envoyé avec succès!");
      console.log("Message envoyé:", templateParams);
    }, function() {
      alert("Erreur lors de l'envoi du message.");
    });
});

function showNotification(message) {
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #2ecc71;
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    font-weight: 600;
    z-index: 1000;
    animation: slideInRight 0.4s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideInLeft 0.4s ease";
    setTimeout(() => notification.remove(), 400);
  }, 3000);
}

const style = document.createElement("style");
style.textContent = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100px);
    }
  }
`;
document.head.appendChild(style);

[...document.querySelectorAll("section, .header-content, .profile-card, .project-form, .contact-form")].forEach(item => item.classList.add("reveal-item"));

const mainTitle = document.querySelector(".header-content h1");
const subtitleElement = document.querySelector(".header-content .subtitle");
const bioElement = document.querySelector(".header-content .bio");
if (mainTitle) {
  const titleText = mainTitle.textContent;
  mainTitle.textContent = "";
  animateText(mainTitle, titleText, 48);
}
if (subtitleElement) {
  animateText(subtitleElement, subtitleElement.textContent, 32);
}
if (bioElement) {
  const bioText = bioElement.textContent;
  bioElement.textContent = "";
  setTimeout(() => animateText(bioElement, bioText, 28), 700);
}

displayProjects();
observeRevealItems();

// === Scroll to Top Button ===
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.style.display = "inline-block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

console.log("🎓 Portfolio Étudiant chargé!");
console.log("💾 Projets sauvegardés:", projects);
console.log("📧 Messages de contact:", localStorage.getItem("messages"));
