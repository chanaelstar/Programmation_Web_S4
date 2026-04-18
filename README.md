# 🍃 ACNH Museum

Projet de Programmation Web — IMAC S4  

---

## 🏛️ Présentation

**ACNH Museum** est une application web de référence dédiée au musée d'*Animal Crossing: New Horizons*. Elle permet de consulter l'intégralité des collections du jeu — fossiles, œuvres d'art, insectes et poissons — et de suivre sa progression personnelle de collectionneur.

L'interface s'inspire de l'esthétique de la Nintendo Switch édition Animal Crossing : fond crème, vert pastel 🟢 (Joy-Con L)  et bleu ciel 🔵 (Joy-Con R)

---

## 🛠️ Fonctionnalités

### Galeries
- Parcourir les 4 catégories du musée : **Fossiles**, **Œuvres d'art**, **Insectes**, **Poissons & Créatures marines**
- 🔍 Recherche par nom (filtre dès le premier caractère)
- Tri par nom (A→Z / Z→A) ou par prix
- Filtre par statut : tout / collecté / non collecté
- 💾 Préférences de tri et filtre sauvegardées en localStorage

### Pages de détail
- Informations complètes sur chaque item (prix, rareté, localisation, saison…)
- 🦴 **Fossiles** : groupe du squelette, description, fossiles manquants, badge "Squelette Complet" si le groupe entier est collecté
- 🖼️ **Œuvres d'art** : aperçu de l'original et du faux, description + comment repérer la contrefaçon, lightbox pour agrandir les textures
- 🦋 **Insectes / 🐟 Poissons / 🐙 Créatures marines** : disponibilité hémisphérique avec barre de mois visuelle (Hémisphère Nord & Sud)

### ⭐ Collection personnelle
- Bouton "Add to collection" sur chaque item
- Données persistées en localStorage entre les sessions
- Compteur global affiché sur la page d'accueil

### 📊 Page d'accueil
- Vue d'ensemble des 4 catégories avec le nombre total d'items
- Graphique de progression du musée (Chart.js) mis à jour en temps réel selon la collection

---

## Stack technique

| Outil | Rôle |
|---|---|
| Vue 3 (Composition API) | Framework principal |
| Vite | Build tool & dev server |
| Vue Router 4 | Navigation SPA, routes dynamiques |
| Chart.js 4 | Graphique de progression |
| Nookipedia API | Source des données ACNH |
| localStorage | Persistance de la collection et des préférences |

### Concepts Vue utilisés

- `<script setup>` / `defineProps()` / `defineEmits()`
- `ref()`, `computed()`, `watch()`, `onMounted()`, `nextTick()`

- Composable partagé (`useCollection`) utilisé dans l'ensemble de l'application
- `watch({ immediate: true })` pour charger les données au changement de route
- Routes dynamiques `/:name` et route 404 `/:pathMatch(.*)*`
- `Promise.all()` pour les appels API en parallèle


---

## 🏗️ Structure du projet

```
src/
├── assets/           # Fonts, images
├── components/
│   ├── common/       # AppHeader, AppCard, GalleryControls, AvailabilitySection…
│   ├── artworks/     # ArtworkGallery, ArtworkDetail
│   ├── bugs/         # BugGallery, BugDetail
│   ├── fish/         # FishGallery, FishDetail, SeaCreatureDetail
│   └── fossils/      # FossilGallery, FossilDetail
├── composables/
│   └── useCollection.js
├── router/
│   └── index.js
├── services/
│   └── api.js
└── views/
    ├── HomeView.vue
    ├── FossilsView.vue
    ├── ArtworksView.vue
    ├── BugsView.vue
    ├── FishView.vue
    └── NotFoundView.vue
```

---

## 🌐 Données & Crédits

L'ensemble des données de l'application est propulsé par la **[Nookipedia API](https://api.nookipedia.com/)**, une ressource communautaire exhaustive dédiée à l'écosystème *Animal Crossing*.

Je tiens à remercier chaleureusement l'équipe de Nookipedia pour l'attribution de la clé API nécessaire au développement de ce projet, permettant ainsi de faire vivre ce musée numérique.