# Refresh Clinic landing page

Current standalone English-language Refresh Clinic landing page, including the responsive patient and doctor galleries, programmes, consultation flow and interactive clinic map.

**Live preview:** https://ospio.online/refresh-metabolic-art-v2/

## Run locally

No build step or package installation is required. With Python 3 installed:

```sh
python3 -m http.server 8080
```

Open http://localhost:8080 in a browser. Serve this directory over HTTP rather than opening `index.html` directly.

## Files

- `index.html`: page content and structure.
- `style.css`: responsive design and typography.
- `script.js`: galleries and page interactions.
- `enquiry.js`: consultation questionnaire and editable WhatsApp message.
- `map.js`: clinic map configuration.
- `assets/`: images, video, self-hosted fonts and map library required by this page.

The consultation flow opens WhatsApp; it does not send a message automatically. There is no backend or database in this repository. The WhatsApp destination is configured in the HTML and enquiry script.

## Version

This snapshot matches the deployed `doctors-gallery10` revision. It is separate from the earlier Refresh V3 and design experiments. The live preview is not automatically redeployed by GitHub commits.

## Assets and review

Patient stories and medical programme content reflect the supplied landing-page materials and require clinic approval before use in advertising. The illustrative hero image is labelled on the page and is not a patient result.

Publication of this repository does not grant a new licence to the clinic branding, photographs, video or patient materials. Obtain appropriate permission for reuse. Included third-party software retains its own licence: `assets/vendor/jsvectormap/LICENSE` and `assets/OFL-Plus-Jakarta-Sans.txt`.

Only files required for this landing page are included. Development backups, local QA pages, credentials and deployment access are not included.
