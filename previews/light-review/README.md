# Light review

Isolated React source for the Light review. Does not replace the repository's existing landing page.

Node 22+, npm. Install with `npm install`, then:

    REFRESH_BUILD_VARIANTS=light REFRESH_PREVIEW_ROUTE=refresh-light-review-20261118 npm run build:static

Serve `dist-static` with a static HTTP server. EN and RU are prerendered; preview retains noindex. No form submissions are implemented: booking links go to WhatsApp.
