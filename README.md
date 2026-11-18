# virtua-smart.com

Static site in French (root), English (`/en/`) and Portuguese (`/pt/`). No framework, no dependency: Node 22+ only.

- Copy, all three languages: `src/content.mjs`
- Page templates, SEO tags, sitemap, redirects of the old WordPress URLs: `build.mjs`
- Styles and scripts the pages load: `public/` (design kit in `public/assets`, site CSS in `public/css/site.css`)
- Images: `public/img` (WebP, 1280 px and 640 px)

## Build and preview

```bash
node build.mjs
```

```bash
python3 -m http.server 4321 --directory dist
```

## Contact form

Without a form service the form opens the visitor's mail app, addressed to contact@virtua-smart.com.
To send directly from the page, create a form on Formspree or Web3Forms and set its URL as the
repository variable `FORM_ENDPOINT` (Settings > Secrets and variables > Actions > Variables).

## Publish on GitHub Pages

1. Push this folder to a GitHub repository, branch `main`.
2. Settings > Pages > Source: **GitHub Actions**. The workflow `.github/workflows/deploy.yml` builds and publishes `dist/`.
3. Settings > Pages > Custom domain: `virtua-smart.com` (the build writes the `CNAME` file), then point the domain's DNS to GitHub Pages and tick "Enforce HTTPS".
4. Submit `https://virtua-smart.com/sitemap.xml` in Google Search Console.
