# Youri Valkyra website

Static website deployed through the existing Cloudflare Worker assets configuration.

## Local preview

```sh
npx wrangler dev
```

## Images

Approved optimized images belong in `assets/images/` and use the central identifiers
defined in `assets/site.js`, for example `IMG-04.webp`. Until a file exists, the
site displays a layout-stable branded placeholder.

The Valkyra Universe carousel uses four wide images: `IMG-06A.webp` through
`IMG-06D.webp`.

## Deployment

```sh
npx wrangler deploy
```

The canonical production domain is `https://yourivalkyra.com`.
