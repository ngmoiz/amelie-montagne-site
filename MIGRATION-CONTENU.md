# Design initial, contenu multipage

Branche : `contenu/main-multipage`.

## Sources comparées

- Base visuelle : `main`, commit `e8ccffa593696213ddb347a396c0e5a806e3e6c4`.
- Contenu et organisation : `design/identite-se-choisir-soi-etape-1`, commit `0620ae7c004ae053e7c2fb4fe1de24aae452288e`.

## Résultat

| Page | Contenu repris |
| --- | --- |
| Accueil | Hero, introduction, Se choisir soi, situations, espace pour vous, cinq axes, présentation d'Amélie, Votre vie vous appartient, appel à réserver |
| À propos | Parcours, Me choisir, Pourquoi le coaching, Aujourd'hui |
| Mon accompagnement | Approche, rôle, quatre temps, formules et tarifs |
| FAQ | Neuf questions et leurs réponses |
| Contact | Premier échange et formulaire Netlify |
| Mentions légales | Texte et navigation commune |

Six onglets : Accueil, À propos, Mon accompagnement, Tarifs, FAQ, Contact.
Tarifs renvoie à `accompagnements.html#tarifs` ; il ne s'agit pas d'une page supplémentaire.

## Design conservé

`public/styles.css`, `public/tokens.css`, les logos et le favicon sont identiques à `main`.
Le hero abstrait vert, ses formes, les indicateurs, la navigation arrondie,
les polices Cormorant Garamond / Marcellus / Jost et les boutons viennent de `main`.
Les pictogrammes d'origine des cinq axes sont conservés.

Les textes récents sont intégrés au hero initial ; ses deux appels à l'action restent présents.
Les nouveaux blocs utilisent `public/content.css`, avec les variables de couleur d'origine.
Les photos générées, vagues, accents roses, lotus et polices manuscrites de la variante
ne sont pas importés. Les emplacements de portrait restent à compléter par une vraie photo.

## Fonctionnement

`public/site.js` centralise navigation, menu mobile, Calendly et formulaire.
Le seuil de la navigation au défilement reste celui de `main` (40 px).
Le script de révélation ajouté à la variante graphique n'est pas repris.
Les paramètres Calendly, réseaux sociaux, e-mail, robots et Netlify existants restent inchangés.

## Vérifications

- Comparaison des titres, paragraphes et questions avec la branche source : aucune perte détectée.
- Liens, ancres et ressources internes : aucune cible manquante sur les six pages.
- Vérification de syntaxe JavaScript et des différences Git.
- Identité binaire des fichiers de styles et de tokens avec `main`.
- La vérification visuelle dans un navigateur n'a pas été réalisable dans cet environnement.

Cette branche est indépendante : ni `main` ni la branche de direction artistique n'ont été modifiés.
