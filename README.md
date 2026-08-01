# Youri Valkyra website

Static website deployed through the existing Cloudflare Worker assets configuration.

## Local preview

```sh
npx wrangler dev
```

## Images

Google Drive is the canonical source for release covers and other approved artwork.
Do not maintain a second set of source images in this repository. During a website
update, copy only the approved source files temporarily into `image-sources/` and run:

```sh
npm install
npm run images
```

The image build creates size-limited WebP files in `assets/images/`. Release covers
are limited to 800 × 800 px; portrait artwork uses a larger profile. Only the
generated WebP files are published. `image-sources/` and high-resolution PNG/JPEG
files are not committed. Central identifiers are defined in `assets/site.js`, for
example `IMG-04.webp`. Until a file exists, the site displays a layout-stable
branded placeholder.

The Valkyra Universe carousel uses four wide images: `IMG-06A.webp` through
`IMG-06D.webp`.

## Deployment

```sh
npm run deploy
```

The deploy command runs image optimization before Wrangler. Wrangler serves the
resulting static assets; it does not transform source images itself.

The canonical production domain is `https://yourivalkyra.com`.
