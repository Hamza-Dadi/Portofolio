const darkModeBtn = document.getElementById("darkModeBtn");
const htmlElement = document.documentElement;

const isDarkMode = localStorage.getItem("darkMode") === "true";
if (isDarkMode) {
  document.body.classList.add("dark-mode");
  darkModeBtn.textContent = "☀️ Mode Clair";
}

darkModeBtn.addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
  const isNowDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isNowDarkMode);
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

  projects.forEach(project => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");
    projectCard.innerHTML = `
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <div class="project-tech">
        ${project.technologies.split(",").map(tech => `<span class="tech-label">${tech.trim()}</span>`).join("")}
      </div>
      <button class="btn-delete" onclick="deleteProject(${project.id})">🗑️ Supprimer</button>
    `;
    projectsList.appendChild(projectCard);
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

  let messages = JSON.parse(localStorage.getItem("messages")) || [];
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

  console.log("Messages reçus:", messages);
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

displayProjects();

console.log("🎓 Portfolio Étudiant chargé!");
console.log("💾 Projets sauvegardés:", projects);
console.log("📧 Messages de contact:", localStorage.getItem("messages"));
