# Mashud Khalid · Portfolio

A personal portfolio built on the [BrewedOps portfolio template](https://github.com/brewed-ops/portfolio-template), personalized around practical software, curiosity, and learning game development.

The template’s profile rail, animated contour shader, intro sequence, theme controls, accessibility preferences, and mobile tab navigation are retained. The home, project collection, 3D screenshot showcase, about page, learning lab, and contact page use Mashud’s real content.

## Run

```sh
npm install
npm run dev
```

Open http://127.0.0.1:4173. Node.js 20.19+ or 22.12+ is recommended.

```sh
npm run build     # TypeScript check and production build in dist/
npm run preview   # Preview the production build
npm run lint      # ESLint
npm test          # Playwright functional and mobile checks
```

For a fresh Playwright installation, run `npx playwright install chromium` once.

## Edit

- `src/data/profile.ts`: identity, social links, portrait, home introduction.
- `src/data/content.ts`: project descriptions, screenshots, links, skills, and education.
- `src/views/Workshop.tsx`: home, projects, showcase, about, lab, contact, and missing-page views.
- `src/styles/workshop.css`: warm palette, component styling, and responsive layouts.
- `public/images/`: project screenshots and portraits.
- `public/resume.pdf`: résumé download.

The showcase supports previous/next buttons, arrow keys, and horizontal swipes. Motion follows system and site accessibility preferences. The jump interaction is an illustrative browser experiment, not a claim of a finished game.

## Contact

The existing Web3Forms configuration and field limits are preserved in `src/data/contact-form.json`. CAPTCHA loads on deployed hosts. Local submissions require CAPTCHA and offer the direct email link as a fallback. Browser tests intercept submission requests and do not send real messages.

See `CONTACT_FORM_SETUP.md` for provider configuration. Validate CAPTCHA and real delivery on your deployed domain.

## Deployment

Vercel and Netlify are configured to run `npm run build`, publish `dist/`, and serve React routes through `index.html`. Public files retain the existing security headers. Theme restoration uses an external script compatible with the Content Security Policy.

## Credits and licensing

Template: Copyright © 2026 BrewedOps. See `LICENSE.template` for the PolyForm Noncommercial license and its additional permission to use this for your own portfolio. That permission does not cover selling the template or building portfolios for other people for payment.

The contour technique credits OFF+BRAND’s landonorris.com work; its simplex noise is Ashima Arts / Ian McEwan (MIT). Phosphor icons are MIT licensed. Poppins is distributed under the SIL Open Font License. Tool logos remain their owners’ trademarks.
