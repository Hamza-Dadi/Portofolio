# 🎓 Portfolio Étudiant

Un portfolio web moderne et interactif pour étudiant développeur, créé avec HTML, CSS et JavaScript.

## 📋 Caractéristiques

✅ **Structure HTML propre** - HTML sémantique bien organisé
✅ **Design moderne** - Palette de couleurs professionnelle avec dégradés
✅ **Interactions JavaScript** - Gestion dynamique du contenu
✅ **Formulaire avec inputs** - Ajouter des projets facilement
✅ **Boutons cliquables** - Interactions fluides et réactives
✅ **Mode sombre** - Toggle entre thème clair et sombre (localStorage)
✅ **Liste dynamique** - Ajouter/supprimer des projets en temps réel

## 🎨 Sections du Portfolio

1. **Navigation** - Logo + bouton mode sombre
2. **Header** - Présentation personnelle avec gradient
3. **Profil** - Information sur l'étudiant + compétences
4. **Projets** - Formulaire pour ajouter des projets + liste dynamique
5. **Contact** - Formulaire de contact avec validation

## 🛠️ Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Design moderne (Flexbox, Grid, Gradients, Animations)
- **JavaScript (Vanilla)** - Interactions et gestion du DOM
- **localStorage** - Persistance des données

## 📁 Structure du Projet

```
Portfolio Etudiant/
├── index.html       # Structure HTML
├── index.css        # Styles CSS
├── index.js         # Logique JavaScript
└── README.md        # Documentation
```

## 🚀 Fonctionnalités Principales

### Mode Sombre
```javascript
- Toggle clair/sombre
- Sauvegarde en localStorage
- Palette de couleurs adaptée
```

### Gestion des Projets
```javascript
- Ajouter un nouveau projet (nom, description, technologies)
- Affichage en grille responsive
- Supprimer un projet
- Persiste les données dans localStorage
```

### Formulaire de Contact
```javascript
- Validation des champs
- Validation email
- Envoi réel par email via EmailJS
- Sauvegarde des messages
- Notification de succès
```

## 💾 Stockage des Données

Les données sont sauvegardées dans **localStorage**:
- `darkMode` - État du mode sombre
- `projects` - Liste des projets
- `messages` - Messages de contact

## 📱 Responsive Design

- Desktop optimisé
- Tablet compatible
- Mobile-first approach
- Breakpoint: 768px

## 🎬 Comment Utiliser

1. **Ouvrir le portfolio**: `index.html`
2. **Ajouter un projet**: Remplir le formulaire et cliquer "Ajouter Projet"
3. **Mode sombre**: Cliquer le bouton 🌙
4. **Envoyer un message**: Remplir le formulaire de contact
5. **Supprimer un projet**: Cliquer sur le bouton 🗑️

## 🎨 Palette de Couleurs

| Couleur | Hex | Usage |
|---------|-----|-------|
| Primaire | #7b6cff | Boutons, accents |
| Secondaire | #3d3ad8 | Hover effects |
| Dark | #1b1d4d | Fond sombre |
| Light | #f8f8ff | Fond clair |

## ✨ Animations

- Slide in (header)
- Fade in (projets)
- Hover effects (cartes)
- Notifications (messages)

## 📝 Améliorations Futures

- Backend pour persister les données
- Authentification utilisateur
- Upload de photos
- Animations avancées
- Multilangue

## 👨‍💻 Auteur

Hamza Dadi - Étudiant ESISA en Informatique

## 📄 License

Libre d'utilisation pour usage personnel et éducatif.

---

**Créé en 2026** ✨
