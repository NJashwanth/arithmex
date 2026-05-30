# Arithmex — Free Online Calculators

> A modern, production-ready multi-calculator website built with pure HTML, CSS, and vanilla JavaScript. Designed for GitHub Pages hosting and Google AdSense monetization.

---

## Features

| Category | Tools |
|---|---|
| 🧮 Universal | Scientific calculator, history, clipboard copy |
| 💰 Finance | Loan/mortgage, compound interest, savings, ROI, currency |
| 🏋️ Fitness | BMI, calories (TDEE), macros, heart rate zones, 1RM |
| ❤️ Health | Water intake, BMR, body fat %, pregnancy due date, ovulation |
| ⏰ Time | Age, duration, timezone, work hours, countdown timer |
| 📐 Unit Converter | Length, weight, temperature, volume, area, speed, data |

**Everything runs 100% in the browser** — no server, no sign-up, no tracking.

---

## Project Structure

```
arithmex/
├── index.html                        ← Landing page
├── css/
│   └── style.css                     ← All styling (CSS custom properties, dark/light mode)
├── js/
│   └── main.js                       ← Shared JS (theme, nav, storage, helpers)
├── calculators/
│   ├── universal-calculator.html
│   ├── finance-calculator.html
│   ├── fitness-calculator.html
│   ├── health-calculator.html
│   ├── time-calculator.html
│   └── unit-converter.html
└── README.md
```

---

## Running Locally

No build step required. Just open the files in a browser:

```bash
# Option 1: Open directly
open index.html

# Option 2: Use a local dev server (recommended to avoid CORS issues)
npx serve .
# or
python3 -m http.server 8080
# then visit http://localhost:8080
```

---

## Deploying to GitHub Pages

1. **Create a new GitHub repository** (e.g., `arithmex`)
2. Push all files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Arithmex calculator site"
   git remote add origin https://github.com/YOUR_USERNAME/arithmex.git
   git push -u origin main
   ```
3. Go to **Settings → Pages** in your GitHub repo
4. Set source to **Deploy from a branch** → `main` → `/ (root)`
5. Your site will be live at: `https://YOUR_USERNAME.github.io/arithmex/`

> **Tip:** Update all `og:url` and `link rel="canonical"` tags in the HTML files to match your live URL.

---

## Adding Google AdSense

1. Sign up at [Google AdSense](https://www.google.com/adsense/)
2. Once approved, find your **publisher ID** (looks like `ca-pub-XXXXXXXXXXXXXXXXX`)
3. In every HTML file, uncomment and update this block in `<head>`:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
   ```
4. Replace the placeholder ad `<div>` blocks (marked with `<!-- GOOGLE AD SPACE -->`) with your actual AdSense ad unit code, e.g.:
   ```html
   <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
   <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
   ```

### Ad Placements (per page)
| Location | Size | Comment tag |
|---|---|---|
| Top of page | 728×90 Leaderboard | `ad-space-leaderboard` |
| Below calculator | 300×250 Rectangle | `ad-space-rectangle` |
| Sidebar | 300×600 Half page | `ad-space-sidebar` |

---

## SEO Checklist

- [ ] Update `og:url` and `link[rel=canonical]` to your live domain
- [ ] Add `og:image` (1200×630 PNG) for social sharing previews
- [ ] Submit sitemap to Google Search Console
- [ ] Verify site in Google Search Console for AdSense approval
- [ ] Update schema.org `url` fields in JSON-LD blocks

---

## Design System

The site uses a CSS custom property–based design system with built-in dark/light mode:

```css
/* Key variables in css/style.css */
--clr-primary:  #2f81f7   /* Blue accent */
--clr-accent:   #3fb950   /* Green */
--clr-surface:  #161b22   /* Card background */
--clr-bg:       #0d1117   /* Page background */
```

Light mode is applied via `[data-theme="light"]` on `<html>` — toggled by the moon/sun button in the header.

---

## Browser Support

- Chrome 90+ ✅
- Firefox 88+ ✅  
- Safari 14+ ✅
- Edge 90+ ✅
- Mobile (iOS Safari, Android Chrome) ✅

---

## Future Improvements

- [ ] Mortgage amortization table (month-by-month)
- [ ] Investment portfolio tracker
- [ ] Nutritional database lookup
- [ ] Blood pressure / cholesterol calculators
- [ ] Scientific graphing calculator
- [ ] PWA (Progressive Web App) support for offline use
- [ ] Dark/light mode preference sync across tabs
- [ ] Share individual results via URL parameters

---

## License

MIT — free to use, modify, and deploy.

---

*Built with HTML5, CSS3, and Vanilla JavaScript. No frameworks, no dependencies, no build step.*
