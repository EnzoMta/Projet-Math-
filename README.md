# MathLab — Cours de Mathématiques Interactif

Projet web pédagogique développé dans le cadre du **Semestre 2** à Decode, permettant d'explorer les mathématiques à travers des visualisations et expériences interactives.

## Aperçu

MathLab propose deux espaces :

- **Accueil** — expériences de probabilités et de géométrie vectorielle
- **Projets** — visualisations avancées de courbes paramétriques, polaires et épicycles de Fourier

## Fonctionnalités

### Accueil (`index.html`)

| Expérience | Description |
|---|---|
| Pile ou Face | Lance 1 à 1 000 pièces et observe la convergence vers ½ |
| Lancer de Dé | Visualise la distribution des résultats sur 6 faces |
| Vecteur & Mouvement | Anime un point avec position et vélocité initiales |
| Structure relationnelle | Crée et manipule un graphe de nœuds interactif |

### Projets (`pages/projet.html`)

| Section | Description |
|---|---|
| Introduction | Explication des coordonnées cartésiennes et polaires avec schémas |
| Grapheur 2D | Rosace, cardioïde, spirale, Lissajous — avec sliders, export PNG et partage |
| Visualisation 3D | Hélice, nœud torique, Lissajous 3D — rendu Three.js |
| Comparateur | Affiche deux courbes côte à côte avec animation synchronisée |
| Épicycles de Fourier | Dessinez une forme, regardez la transformée de Fourier la reconstruire |

## Structure du projet

```
CoursMath/
├── index.html              # Page d'accueil
├── README.md
├── assets/
│   ├── css/
│   │   ├── style.css       # Styles partagés (navbar, hero, modals…)
│   │   └── projet-style.css # Styles spécifiques aux projets
│   └── js/
│       ├── script.js       # Logique de l'accueil (probabilités, vecteurs, graphes)
│       ├── projet-script.js # Grapheur 2D/3D, comparateur
│       └── fourier.js      # Épicycles de Fourier
└── pages/
    ├── cours.html          # Page de cours (à venir)
    └── projet.html         # Page des projets interactifs
```

## Technologies

- **HTML5 / CSS3 / JavaScript** — sans framework front-end
- **[Chart.js](https://www.chartjs.org/)** — graphiques des expériences de probabilités
- **[Three.js](https://threejs.org/)** — rendu 3D des courbes
- **[KaTeX](https://katex.org/)** — rendu des formules mathématiques
- **[math.js](https://mathjs.org/)** — parsing sécurisé des expressions saisies par l'utilisateur

## Lancer le projet

Ouvrir `index.html` directement dans un navigateur, ou via un serveur local :

```bash
# Python
python3 -m http.server 8080

# Node.js (npx)
npx serve .
```

Puis aller sur `http://localhost:8080`.

## Auteur

**Enzo Moita** — Decode, Semestre 2 · 2026
