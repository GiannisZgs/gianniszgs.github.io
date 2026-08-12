# Personal site — setup guide

Plain HTML/CSS/JS. No build tools, no Jekyll — just edit the files and push.

## Files

- `index.html` — page content. Every placeholder is wrapped in `[brackets]` — search for `[` to find them all.
- `style.css` — styling (colors, layout, spacing).
- `script.js` — small helpers (mobile menu toggle, footer year).
- `assets/avatar-placeholder.svg` — stand-in photo, shown only as the small circular avatar in the top-left of the nav bar. Replace with your own image (e.g. `assets/profile.jpg`) and update the single `<img src="...">` reference inside `<a class="nav-brand">` in `index.html`.

## What to fill in

1. **Nav / hero**: your name, one-line title, and bio paragraph (this doubles as your "About" — there's no separate About heading, per the layout). The circular icon button in the nav (and the "CV" icon at the bottom of Contact) both point to `href="#"` — swap those for a link to a CV you add under `assets/` (e.g. `assets/cv.pdf`).
2. **Research**: one `<article class="research-card">` per topic — heading, 2–3 sentence description, and tag pills. Add or remove cards as needed (grid handles 2, 3, or 4 fine).
3. **Bio**: the `<ol class="timeline">` — one `<li class="timeline-item">` per period of your career/education, newest first. Each has a date range and a short blurb.
4. **Updates**: one `<article class="update-card">` per news item — date, a short tag (Paper / Talk / Award / etc.), and a one-line description. Newest first; add or delete cards freely.
5. **Publications**: each `<article class="pub-card">` — venue tag, title, authors, a 2–3 sentence overview, and PDF/Code links. Duplicate the block for more entries, delete for fewer.
   - **Published at**: the row of venue badges just below the publication list — replace with the conferences/journals you've published in.
   - The "See all publications on Google Scholar" button — point it at your Scholar profile (or another full list).
6. **Service**: one `<article class="service-card">` per teaching/mentoring/service role — term, title, short description.
7. **Contact**: six icon links (Email, LinkedIn, GitHub, Google Scholar, arXiv, CV) — replace each `href` with your real link. Icons are defined once as an SVG sprite near the top of `index.html` (`<symbol id="icon-...">`), so if you ever want to swap an icon's shape you only edit it in one place.
8. `<title>` and `<meta name="description">` in the `<head>` — used by browser tabs and search engines.

## Publishing to GitHub Pages

1. Create a new GitHub repo named `<your-username>.github.io` (must match your username exactly).
2. Push these files to the repo root:
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
3. On GitHub: repo → **Settings** → **Pages** → under "Build and deployment", source = **Deploy from a branch**, branch = **main** / root.
4. Wait a minute, then visit `https://<your-username>.github.io`.

Any time you edit a file and push to `main`, the live site updates automatically within a minute or two.

## Previewing locally before pushing

No server needed — just open `index.html` directly in a browser. If links behave oddly, run a tiny local server instead:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.
