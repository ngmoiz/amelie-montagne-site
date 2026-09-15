# Se choisir soi — audit et direction artistique web (étape 1)

Document de travail pour le site statique `public/index.html`, `public/tokens.css` et `public/styles.css`. Référence éditoriale : « SITE INTERNET COACHING 🌸.pdf » ; référence visuelle : maquette de landing page transmise par le commanditaire, avec une femme noire ou métisse vue de dos face aux montagnes. Le hero a été intégré à partir d'une version nettoyée de cette maquette : photo en fond, titre et bouton en HTML/CSS.

## Diagnostic du dépôt

La page actuelle contient déjà navigation, hero, section de présentation, cinq axes, tarifs, contact, FAQ, appel final et pied de page. Le déploiement Netlify publie uniquement `public/`, sans étape de build. Garder la structure, les ancres, le formulaire, la navigation mobile et le respect de `prefers-reduced-motion`.

| Zone | Existant | Intervention prévue |
| --- | --- | --- |
| Hero | Grand dégradé vert, anneaux et arche CSS (`hero-visual`, `hv-*`) | Composition photo éditoriale d'une femme noire ou métisse de dos, face aux montagnes ; texte HTML séparé ; accent feutre SVG et formes légères. |
| À propos | Encadré « Photo — portrait d'Amélie » | Vraie photo d'Amélie fournie avec son accord ; jusqu'alors, éviter toute image générée présentée comme son portrait. |
| Axes | Médaillons avec pictogrammes géométriques | Illustrations botaniques SVG cohérentes, une par axe ou groupe, sans masquer les libellés. |
| Transitions | Changements de fond assez nets, cercles et halos | Deux ou trois séparateurs organiques SVG, avec alternance sobre ivoire / sauge / beige. |
| Titres et CTA | Marcellus, Jost, Cormorant ; boutons arrondis | Conserver l'ossature typographique et les boutons ; ajouter ponctuellement un trait dessiné derrière un mot, sans sacrifier le contraste. |
| Tarifs, contact, FAQ | Fonctionnels et lisibles | Garder la disposition et améliorer les détails décoratifs avec parcimonie. |

## Système visuel proposé

Les jetons actuels donnent déjà une base solide. La palette ci-dessous est la cible de travail pour l'intégration ; elle devra être comparée à l'image du prospectus avant validation définitive. La cohérence passe par des rôles, plutôt que par le remplacement aveugle de toutes les valeurs actuelles.

| Rôle | Cible | Valeur | Usage |
| --- | --- | --- | --- |
| Fond principal | Ivoire chaud | `#F7F4ED` | Pages et sections calmes. |
| Fond de carte | Blanc chaud | `#FFFDF8` | Tarifs et formulaire. |
| Fond secondaire | Beige crème | `#F3E8D5` | Transitions et encadrés. |
| Vert principal | Sauge profond | `#71806A` | CTA et sections fortes. |
| Vert clair | Sauge doux | `#A7B29D` | Dessins et formes de fond. |
| Accent | Rose poudré | `#D9A6A0` | Feutre, fleur, ponctuation graphique ; usage limité. |
| Accent pâle | Nude rosé | `#EED9D4` | Surlignage de fond. |
| Texte | Vert encre | `#30372F` | Paragraphes sur fond clair. |

Typographie : **Marcellus** pour les titres de section, **Jost** pour le corps et les commandes, **Cormorant Garamond italique** pour les citations et quelques mots mis en valeur. Cette combinaison est déjà chargée dans `index.html` et dans `mentions-legales.html` : l'affiner avant d'ajouter de nouvelles polices. Trait de feutre : SVG à contours imparfaits et extrémités arrondies, épaisseur variable très discrète, uniquement derrière les titres ou près des photos. Vagues : SVG fluides avec vue adaptative, non intégrés aux photos. Cartes : fonds chauds, bordures fines, angles doux, ombres faibles ; garder les textes dans le DOM.

Photographie : lumière naturelle douce, couleurs terre / sauge, contraste léger, cadrage avec de l'espace pour la composition. Hero : femme noire ou métisse vue de dos, paysage montagneux et horizon lisibles, vêtement sobre, aucune prétention de représenter Amélie. Portrait : vraie photographie d'Amélie, distincte de l'image illustrative du hero. Pour mobile, prévoir un cadrage vertical contrôlé séparément ; garder la lisibilité des titres sur tous les formats.

Mouvement : flottement très léger (quelques pixels), apparition calme des traits et vagues, durée lente. Respecter `prefers-reduced-motion: reduce` et éviter toute animation qui gêne la lecture ou détourne l'attention du CTA.

## Ordre d'intégration pour Claude Code

1. Ajouter les futurs assets sous `public/images/` et `public/illustrations/` avec des noms descriptifs ; optimiser les photos en WebP avec version adaptée au mobile si nécessaire.
2. Introduire les nouveaux jetons visuels dans `public/tokens.css`, puis remplacer progressivement les valeurs directes pertinentes dans `public/styles.css` ; vérifier le contraste sur ivoire et sur vert.
3. Recomposer `hero-visual` autour de la photo et des SVG séparés, avec `alt` descriptif si l'image apporte un sens, ou `alt=""` si elle est purement décorative ; ne pas mettre de texte dans l'image.
4. Remplacer le placeholder du portrait quand la vraie photo sera disponible ; introduire les petits dessins dans les cinq axes, les transitions et le CTA final.
5. Vérifier les formats bureau, tablette et mobile, la navigation clavier, les CTA et le formulaire Netlify. Faire une revue visuelle avant d'étendre l'identité aux pages secondaires.

## Points éditoriaux et de lancement à résoudre

- Le document source indique **55 €** pour le premier échange dans l'appel à l'action de la page d'accueil, puis **50 €** dans les autres passages et le récapitulatif ; le site affiche **50 €**. Confirmer le montant avec Amélie avant toute publication ou synchronisation des documents.
- La page contient `noindex, nofollow` : décider de l'indexation uniquement au lancement public.
- Le lien Calendly actuel `gadgets-maisons/premier-echange` est explicitement un lien de test ; le remplacer par l'événement réel avant lancement.
- Les réseaux et l'adresse e-mail sont encore des valeurs `REMPLACER` et restent masqués. La page de mentions légales mérite une validation de ses informations avant publication.
- La maquette visuelle originale est désormais disponible. La version photo nettoyée conserve la scène mais présente de petites différences de ciel et de végétation dues à la reconstruction des zones auparavant couvertes par les textes.
