# Game2048_Java_Script

Overview
- Classic 2048 game implementation using JavaScript (static site).
- Repo also contains PHP/composer artifacts for hosting; core game is front-end.

Highlights
- Lightweight, framework-free JS/HTML/CSS
- Easy to run locally in a browser

Quickstart
- Option 1 (SPA bundle): open `site/index.html` in a browser
- Option 2: Serve locally
  - Python: `cd site && python -m http.server 8080`
  - Node: `npx serve site`

GitHub Pages
- Auto-deploys the SPA under `site/` using `.github/workflows/pages.yml`.
- Push to `main` with changes under `Game2048_Java_Script/site/**` to trigger deployment.

Aesthetics
- Updated to “The Chosen One” dark-first look (tokens, glass cards, capsule buttons, constellation bg).
- Tokens are in `site/uiux/tokens.css`.

Notes
- Add gameplay notes and any build/minify steps if used.

