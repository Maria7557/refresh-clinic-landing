# Soft Form · canonical Light content

Independent Soft Form presentation using the exact shared Light content and component snapshot supplied on 2026-11-18. Visual differences are confined to `src/soft-form.css` and approved image choices. The final image alt text describes the actual Soft Form photo; visible text is unchanged.

## Build

`npm ci` then `npm run build`. The output `dist/` includes full EN and RU HTML (`/en/`, `/ru/`) plus a base EN page. A `?lang=ru` or `?lang=en` URL redirects to the corresponding full-language route. Native FAQ/tools disclosures work without JavaScript. Offer panels are both present without JS and become an accessible two-tab selector when enhanced.

Base URL: `/clinic-soft-form-unified/`. All prior published concepts remain independent and unchanged.

## Content verification

`python3 scripts/parity.py` compares every section's whitespace-normalized text, the header/footer and all five WhatsApp CTA labels/URLs against `canonical-manifest.json` supplied by the Light owner. Exact match is required for both languages. Section order: hero, start, results, approach, tools, faq, consultation. Eight tools; three comparison rows/two columns; no doctor section.

Patient video/media restored under the user's explicit confirmation relayed through the task. Do not send test enquiries. The primary WhatsApp URL opens a prepared consultation message; the SLIM CTA uses its own prepared message. The user must review and send. No analytics is installed; noindex remains enabled.

Original generated/editorial photos remain decorative. They are not used as patient outcomes or doctor identities. Patient before/after and video media are kept separate.

Repository integration uses an isolated preview branch and folder, not the main production entry point.
