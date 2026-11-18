# Owner review, isolated preview

Based on the Light concept. Expert-clinic positioning, verified doctors and attributed review summaries; calmer typography and layout. Existing previews are not overwritten.

Build with Node22+:

    npm ci
    REFRESH_BUILD_VARIANTS=light REFRESH_PREVIEW_ROUTE=refresh-owner-review-20261118 npm run build:static

Preview keeps noindex. EN default, RU under /ru/. Booking is through WhatsApp, no submission backend.
