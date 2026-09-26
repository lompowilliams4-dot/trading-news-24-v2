# Trading News 24 — nouveau départ

## Ce que contient ce dossier
- `app/page.tsx` — page d'accueil : actualités en premier, puis devises
- `components/news-feed.tsx` — vraies actualités (CoinDesk, Kitco, OilPrice via RSS)
- `components/currencies.tsx` — vraies devises (Frankfurter) + Bitcoin (CoinGecko)
- Tout le reste = configuration Next.js/Tailwind minimale pour que ça tourne

## Comment le mettre en ligne (étape par étape, sans se planter cette fois)

1. **Crée un NOUVEAU repo GitHub**, vide, nommé par exemple `trading-news-24`.
   - github.com/new → nom du repo → "Create repository" (ne coche RIEN, ni README ni licence)

2. **Envoie tous ces fichiers dans ce nouveau repo** (en respectant l'arborescence des dossiers `app/` et `components/`).
   - Le plus simple : sur GitHub, "Add file" → "Upload files", glisse tous les fichiers/dossiers.

3. **Va sur vercel.com** → "Add New" → "Project" → **"Import Git Repository"**.
   - Choisis bien le nouveau repo `trading-news-24`.
   - Ne clique PAS sur "Ouvrir dans v0" ni sur d'autres raccourcis — passe uniquement par ce chemin "Import Git Repository", c'est celui qui connecte proprement Git et Vercel dès le départ.

4. Laisse Vercel détecter Next.js automatiquement, clique "Deploy".

5. Une fois en ligne, chaque futur `git push` sur ce repo redéploiera automatiquement le site — plus besoin de rien faire à la main.
