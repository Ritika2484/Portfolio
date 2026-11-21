# Ritika Kaushik — Developer Portfolio

React and Vite portfolio with a monochrome editorial theme. Content reflects the updated November 2026 CV.

## Run locally

```sh
npm install
npm run dev
```

On Windows PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`.

## Production build

```sh
npm run build
npm run preview
```

The output is in `dist/`.

## Content and assets

- `src/App.jsx`: profile, skills, featured projects, internships, education, certifications, and contact form.
- `src/index.css`: responsive layouts, monochrome theme, and reduced-motion support.
- `public/Ritika_Kaushik.pdf`: updated CV served by both resume download links.
- `public/workstation-hero.png`: generated workstation background inspired by the supplied theme.
- The static illustration at `public/profile.jpeg` is temporary while the owner supplies a formal photo. Update the portrait image source and alt text in `src/App.jsx` when the photo is available.
- Project interface visuals are illustrative concepts, labeled as such; they are not project screenshots.

## Contact form

The form uses EmailJS when all three Vite environment variables are configured:

```text
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
```

The template receives `from_name`, `from_email`, `message`, and `to_name`. Without configuration, the form prepares a draft in the visitor's default email app. It does not claim the message has been sent. Direct email, telephone, LinkedIn, and GitHub links also work without EmailJS.
