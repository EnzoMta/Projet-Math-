# MathLab — Cours de Mathématiques Interactif

Site web pédagogique développé dans le cadre du Semestre 2 de Mathématiques à Decode. Il permet d'explorer des concepts mathématiques à travers des visualisations et expériences interactives.

## Pages

### Accueil (`index.html`)

Quatre expériences interactives accessibles depuis la page principale :

| Expérience | Description |
|---|---|
| **Pile ou Face** | Lance une pièce 1, 10, 100 ou 1 000 fois et observe la convergence vers ½ (loi des grands nombres) |
| **Lancer de Dé** | Visualise la distribution des résultats sur 6 faces avec histogramme en temps réel |
| **Vecteur & Mouvement** | Crée un point avec position et vélocité, observe son déplacement sur un canvas |
| **Structure relationnelle** | Éditeur de graphes interactif : ajouter des nœuds, créer des arêtes, afficher la matrice d'adjacence |

### Projet — Courbes paramétriques & polaires (`pages/projet.html`)

Exploration approfondie de la géométrie à travers cinq sections :

1. **Introduction** — Comparaison coordonnées cartésiennes vs polaires, formules de conversion, explication des courbes paramétriques et polaires
2. **Grapheur 2D** — Tracé animé de rosaces, cardioïdes, spirales d'Archimède, courbes de Lissajous, et éditeur d'équations custom (polaires et paramétriques)
3. **Visualisation 3D** — Hélices, nœuds toriques, Lissajous 3D, ressorts coniques, spirales sphériques via Three.js
4. **Comparateur côte à côte** — Deux grapheurs synchronisés pour comparer des courbes en temps réel
5. **Épicycles de Fourier** — Dessine une forme libre, le programme la reconstruit avec des cercles tournants (transformée de Fourier discrète)

## Structure du projet

```
CoursMath/
├── index.html              # Page d'accueil — expériences de probabilités et vecteurs
├── pages/
│   ├── cours.html          # Page cours
│   └── projet.html         # Projet courbes paramétriques & polaires
└── assets/
    ├── css/
    │   ├── style.css        # Styles globaux (navbar, modals, hero…)
    │   └── projet-style.css # Styles spécifiques au projet
    └── js/
        ├── script.js        # Logique de la page d'accueil
        ├── fourier.js       # Moteur des épicycles de Fourier
        └── projet-script.js # Grapheurs 2D/3D, comparateur (module ES6)
```

## Technologies

- **HTML/CSS/JS** — Aucun framework, vanilla
- **[Chart.js](https://www.chartjs.org/)** — Graphiques pile/face et dé
- **[Three.js](https://threejs.org/)** — Rendu 3D des courbes
- **[KaTeX](https://katex.org/)** — Affichage des formules mathématiques
- **[Math.js](https://mathjs.org/)** — Parsing sécurisé des expressions utilisateur (éditeur custom)

## Lancer le projet

Ouvrir `index.html` dans un navigateur. Aucune installation requise.

> Pour la page projet, un serveur local est recommandé (ex: `npx serve .` ou l'extension Live Server de VS Code) car `projet-script.js` est un module ES6.

---

MathLab © Enzo Moita 2026 — Semestre 2 · Decode
