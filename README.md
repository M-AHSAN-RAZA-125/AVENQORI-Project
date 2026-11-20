# AVENQORI — Complete Frontend

A responsive React + Vite frontend based on the two supplied AVENQORI design references.

## Requirements
- Node.js 18+ (20 LTS recommended)
- npm

## Run locally
```bash
npm install
cp .env.example .env
npm run dev
```
On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp`.

## Production build
```bash
npm run build
npm run preview
```

## Environment
- `VITE_API_URL`: backend API base URL (default `http://localhost:4000/api`)
- `VITE_AUTH_MODE`: `demo` (default behavior) or `api`

## Implemented
- Landing page sections: navigation, hero, features, tutor cards, premium promo, statistics, testimonials, CTA and footer.
- Student/Tutor role selection on login and signup.
- Student/Tutor-specific visual panels and tutor professional-title field.
- Email/password validation, password visibility, remember-me UI, terms acceptance.
- Demo authentication mode for frontend walkthroughs; role-specific demo dashboards.
- API-ready Axios service and auth context for `/auth/register`, `/auth/login`.
- Light/dark theme toggle with localStorage persistence.
- Functional mobile navigation, course dropdown, testimonial controls, newsletter validation and toast feedback.
- Placeholder pages for secondary navigation routes.
- Responsive layout rules for desktop, tablet and phones down to 375px.

## Important production notes
- Demo authentication is NOT secure authentication and must not be used for real accounts.
- Set `VITE_AUTH_MODE=api` and implement the backend endpoints before real login/signup.
- Google, Apple and Facebook buttons are clearly marked integration placeholders; OAuth requires provider credentials and backend callback handling.
- Forgot-password currently validates the email and displays a demo notice; wire it to `/auth/forgot-password`.
- Tutor/course content is sample frontend content. Replace sample data with API responses.
- Images supplied in the conversation are included as local cropped reference assets. Some landing-page tutor headshots are remote Unsplash images; replace with licensed/local assets for production.
- The supplied reference is a visual specification; this implementation recreates its structure and purple visual identity, but is not guaranteed pixel-identical to every raster detail.
- `package-lock.json` contains the lockfile v3 root manifest; run `npm install` once to resolve and write the complete platform-specific dependency tree for your Node/npm environment.
