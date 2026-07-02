# Polo Designs — Website

Production-ready marketing site for Polo Designs, a motorcycle paint
restoration, customization, and preventive-maintenance workshop in San
Miguel, Lima.

## Stack

- **React 18** + **Vite** — component structure and build tooling
- **Tailwind CSS** — styling, driven by a token system in `tailwind.config.js`
- **Framer Motion** — scroll reveals, hover tilt, hero video parallax, page micro-interactions

## Your update routine

Two scripts in this folder automate the whole "get changes → preview →
publish" cycle, so you don't need to type Git/npm commands by hand each
time:

**`apply-update.bat`** — run this after downloading a new zip from Claude.
Drag the zip file onto it (or double-click and paste the file's path when
asked). It merges the updated files into this project — without touching
your `.git` folder or `node_modules` — reinstalls packages if needed, and
opens the local preview automatically at `http://localhost:5173/`.

**`deploy.bat`** — run this once you're happy with what you see locally.
It commits and pushes your changes to GitHub, which kicks off the
auto-build/deploy. If this folder ever loses its GitHub connection (e.g.
you unzipped a totally fresh copy instead of using `apply-update.bat`),
this script reconnects it automatically instead of erroring out.

So the day-to-day routine becomes:
1. Download the new zip Claude gives you
2. Double-click `apply-update.bat`, point it at the zip
3. Review the site at `http://localhost:5173/`
4. Double-click `deploy.bat` when you're happy with it

## Getting started (first-time setup only)

```bash
npm install
npm run dev      # local dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

Requires internet access on first load: Google Fonts are fetched from a
CDN at runtime.

## Design system

| Token | Value | Use |
|---|---|---|
| `obsidian` | `#060708` | Primary background |
| `navy-900` / `navy-700` | `#0B1330` / `#182658` | Panels, hero gradient |
| `azure-500` / `azure-300` | `#3457D5` / `#8CA3FF` | Accent, CTAs, glow (a saturated blue within the brief's navy palette) |
| `chrome-200/300` | `#D7DBE0` / `#AEB4BF` | Metallic neutrals, secondary text |
| `porcelain` | `#F6F6F3` | Headline white |

Type: **Space Grotesk** (display), **Inter** (body), **JetBrains Mono**
(spec labels, work-order codes, captions) — chosen to read as
mechanical/precise rather than a generic marketing-site pairing.

**Signature element:** the `.clearcoat-sweep` hover shimmer (used on
buttons and gallery cards throughout the site) mimics automotive clearcoat
catching light — the same optical finish the shop actually applies — so
the brand's core material shows up in the interaction language, not just
as a description of the service.

## Content notes — please review before launch

1. **Copy is in Spanish**, matching the shop's real audience (working
   professionals in Lima). Swap or add an `/en` route if you need a
   bilingual site.
2. **Gallery images are placeholders.** `src/components/Gallery.jsx` uses
   CSS gradients as paint swatches, not real photos — swap `swatch` for
   real before/after shop photography (see the comment at the top of that
   file).
3. **Phone number and email are placeholders**
   (`+51 900 000 000`, `hola@polodesigns.pe`) — replace with the shop's
   real WhatsApp number, phone, and inbox in `Contact.jsx` and
   `Footer.jsx`.
4. **Address is a neighborhood only.** Add the exact street address and an
   embedded map once you're ready to publish it publicly.
5. **Instagram link** in the footer is a placeholder — point it at the
   real handle.

6. **Hero video is a placeholder track-day clip.** It lives at
   `public/videos/hero-track.mp4` (with `hero-poster.jpg` as its poster
   frame) and is referenced in `Hero.jsx`. Swap both files for real
   shop/customer footage whenever it's available — same filenames means no
   URL changes needed — but **bump `HERO_VIDEO_VERSION` at the top of
   `Hero.jsx` by 1** whenever you do. That constant is appended to the
   video/poster URLs as `?v=N`, so browsers and GitHub Pages' CDN treat the
   update as a new file instead of serving a stale cached copy from before.

7. **Instagram section (`InstagramFeed.jsx`) currently links out rather
   than embedding a live feed.** There's no signup-free way to embed a
   real, auto-updating Instagram grid — it requires connecting the shop's
   account to a (free) third-party widget, since Instagram doesn't offer a
   public no-auth embed for a whole profile. The section looks intentional
   as-is (it reuses real shop photos in a grid that links to
   `instagram.com/polo_bs_designs`), but to upgrade to a live feed:
   create a free widget at [snapwidget.com](https://snapwidget.com) pointed
   at the account, then paste the widget ID into `SNAPWIDGET_ID` near the
   top of `InstagramFeed.jsx` — the section will automatically switch to a
   live embed, no other changes needed.

## Performance & accessibility

- The hero video is muted, `playsInline`, and served with a poster frame so
  it paints instantly and autoplays reliably on mobile browsers.
- Hero video scroll parallax is driven by Framer Motion's `useScroll`, which
  is already optimized to avoid extra re-renders on scroll.
- `prefers-reduced-motion` is respected globally (`src/index.css`).
- Focus states are visible and styled to match the brand rather than
  removed.

## Running it locally (read this if you see a white screen)

This is a Vite app — the browser can't run the JSX/import syntax in `src/`
on its own, so it must go through Vite's dev server, not a generic static
file server, and not `file://` by double-clicking `index.html`.

```bash
npm install
npm run dev
```

Then open the URL it prints (usually `http://localhost:5173`). If it's
still blank after that, open the browser console (F12 → Console) — that
error message is the fastest way to diagnose it; paste it back and I can
fix it directly.

## Deploying to GitHub Pages

GitHub Pages only serves static files as-is — it does not build your app.
Pushing the raw `src/` folder (what causes the `main.jsx 404`) will never
work; you have to deploy the **built** output in `dist/`.

**Easiest: let GitHub build it for you.**
This repo includes `.github/workflows/deploy.yml`, which builds the site
and publishes it automatically on every push to `main`:

1. Push this whole project (including `.github/`) to your
   `versatile-canada.github.io` repo, on the `main` branch.
2. In the repo, go to **Settings → Pages → Build and deployment → Source**,
   and set it to **GitHub Actions** (not "Deploy from a branch").
3. Push — the Actions tab will show the build running, and the site goes
   live at `https://versatile-canada.github.io/` a minute or two later.

**Manual alternative**, if you'd rather not use Actions:

```bash
npm run build          # produces dist/
```

Then push only the *contents* of `dist/` (not the `dist` folder itself, its
contents) to the root of your `versatile-canada.github.io` repo — that
repo's root is what GitHub Pages serves for a user/org page. Since
`versatile-canada.github.io` is a user page, `vite.config.js` is already
set to serve from `/`, so no base-path changes are needed either way.

Any other static host (Vercel, Netlify, Cloudflare Pages) also works — just
point them at this repo; they run `npm run build` for you automatically and
serve `dist/`.
