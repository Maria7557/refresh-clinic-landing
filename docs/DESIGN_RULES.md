# Refresh Clinic design rules

Status: project-wide guidance and design targets. Compact expanded-content sizes, spacing, and media limits are implemented locally in `refinements.css`; other general design targets remain proposals.

Source: the user's supplied design brief and comparison of [Refresh](https://ospio.online/refresh-metabolic-art-v2/) with [Metabolic](https://metabolic.health/lp-weightloss?utm_source=chatgpt.com), reviewed on 17 November 2026.

Scope: all pages, components, responsive layouts, and future design work in this repository. Reuse the system's structure in other projects only with their own brand mapping and preservation requirements.

## 1. Objective and authority

Bring Refresh closer to the reference's visual consistency through typography hierarchy, internal proportions, spacing, alignment, contrast, image framing, and coherent component treatments. Retain Refresh's current section sizes and text content.

Use this order of precedence within the design specification:

1. Explicit user instructions and the authorized task scope.
2. Mandatory preservation restrictions below.
3. Existing functional and responsive behaviour.
4. Shared design targets in [DESIGN_TOKENS.md](DESIGN_TOKENS.md).
5. Component-specific optical adjustments that satisfy the preceding rules.

Numeric targets are proposed defaults, not permission to alter protected content or section sizes. When a target does not fit, adjust the target and record the reason.

## 2. Mandatory preservation restrictions

- Preserve all existing copy, punctuation, numbers, prices, durations, names, labels, metadata, qualifications, and disclosures, including accessible text and expanded accordion content.
- Preserve section count, section order, and each section's outer dimensions at the same viewport and interaction state.
- Preserve the header and footer dimensions and existing responsive section-sizing behaviour.
- Do not increase heights to fit larger elements or reduce heights to remove empty space.
- Do not merge, split, add, or remove sections.
- Do not replace the current sizing behaviour with a new global fixed-height or viewport-height system.
- Do not change routes, link destinations, form questions or options, validation, message preparation, WhatsApp destinations, or business logic as part of a visual refinement.
- Preserve normal interaction behaviour, keyboard access, and visible focus states.
- Do not conceal content with clipping, line clamping, ellipses, hidden overflow, smaller-than-readable text, or inaccessible controls to force a target to fit. Existing carousel viewports must still make all items reachable.
- Preserve original media proportions. Do not stretch, distort, or replace existing media as an incidental styling change.
- Preserve complete before-and-after comparisons; do not crop meaningful anatomy or retouch results to create uniform tiles.
- Name the peach colour `#F4DDCD` exactly `acccentLight`. Use it only for individual element accents, never for section or page backgrounds. This restriction also covers wrappers, large panels, full-width bands, gradients, overlays, and pseudo-elements that effectively fill a section background.
- Do not invent or change claims, patient results, testimonials, credentials, or certifications.
- Preserve unrelated changes in the working tree.

Allowed scope for a later authorized visual refinement: internal spacing, alignment, line wrapping, typography, internal grids, media frames, appropriate object positioning, colour, borders, radii, restrained shadows, and consistent control styling. The specific presentation-only visibility adjustments in section 6 are also proposed; they must preserve access and underlying behaviour.

Documentation-only tasks permit Markdown documentation updates only. They do not include application HTML, CSS, JavaScript, assets, token JSON, runtime stylesheets, dependency, build, hosting, or deployment changes. A later explicit implementation request may authorize the corresponding code work, as with the expanded-content follow-up recorded in the review.

## 3. Design-system structure

The canonical numeric and colour specification is [DESIGN_TOKENS.md](DESIGN_TOKENS.md). Use three token levels when runtime implementation is subsequently authorized:

| Level | Purpose | Examples |
| --- | --- | --- |
| Primitive | Raw reusable values | Colours, spacing, type dimensions, radii |
| Semantic | Meaning independent of a component | Page background, primary text, borders, actions, focus |
| Component | A component's use of the shared system | Hero width, button height, image frame, form option |

Components should consume semantic or component tokens instead of adding isolated hardcoded values. Reuse equivalent tokens and document genuine exceptions. Avoid parallel token systems in individual pages.

If runtime tokens are added later, use the existing project conventions, a single canonical machine-readable source, and generated or otherwise synchronized CSS aliases. Do not introduce a build system solely to satisfy this document. Keep documentation and implementation values traceable.

For an unrelated brand, reuse naming and hierarchy only after mapping its own palette, typography, components, and restrictions. Refresh's orange and section-preservation baseline are not universal defaults for other projects.

## 4. Shared visual rules

### Typography

- Use Plus Jakarta Sans with the documented fallbacks.
- Separate hero, section, feature, body, UI, and metadata roles using the token table.
- Keep feature, process, and monitoring titles subordinate to section headings. Do not give all `h3` elements the section-heading style.
- Preserve heading semantics; visual size is not a reason to change the document outline.
- Use tabular numerals for aligned pricing and numerical comparisons.
- Prefer rem units for implementation and support text zoom and responsive wrapping.
- Verify text spacing across all text roles with the bundled font weights and fallback fonts. Apply all four user overrides together and verify that content stays readable and controls stay usable. Test line height at `1.5`, spacing after paragraphs at `2em`, letter spacing at `0.12em`, and word spacing at `0.16em`. Let content reflow under user overrides. [WCAG 2.2 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html)
- Do not alter font assets as part of documentation work. Validate availability of proposed font weights before future implementation.

### Spacing, proportion, and balance

- Keep the existing outer-gutter behaviour; desktop is approximately 5% where currently used, and mobile content gutters are approximately 20 px.
- Keep related content together, using the semantic spacing relationships in the token specification.
- Use remaining section space to frame a coherent composition rather than distributing large gaps between related elements.
- Align headings, cards, lists, and actions to a common content grid.
- Align carousel controls with the heading group where practical, without changing section dimensions or dropping heading content.
- Preserve existing breakpoints. The current stylesheet includes 1100 px and 700 px width conditions, a mobile short-height condition at 720 px, and reduced-motion rules. Preserve their effective behaviour rather than replacing them with generic device presets.

### Colour and surfaces

- Use the warmer off-white, charcoal text, white surfaces, Refresh orange, and the peach element-accent token `acccentLight` from the token specification.
- Use accent colour consistently and sparingly. Do not give each peer card or section an unrelated colour.
- Use `acccentLight` only on individual elements such as text highlights, badges, numbered markers, or small decorative details. Never use it for a section background, directly or through an alias or a large surface that functions as the section background. Do not adopt Metabolic's yellow by default.
- Choose a purposeful surface or a sufficiently visible fine border. Avoid nearly identical fill and border colours that leave components visually undefined.
- Keep text readable over its actual background, including transparent panels, photography, hover, and selected states.
- Treat the charcoal footer as a proposed optical adjustment, not a mandate to change content or footer height.

### Shapes and controls

- Use the documented radius families for images, panels, buttons, and form options.
- Use one coherent arrow style and one disclosure-control style.
- Distinguish hover, focus, selected, expanded, and disabled states. Do not depend on colour or hover alone for essential information.
- Preserve keyboard operation, accessible labels, and normal media controls.
- Scope icon dimensions to icon components. Never apply an icon-sized global SVG rule to maps, diagrams, charts, or logos.
- Retain reduced-motion behaviour and avoid adding unnecessary animation.

## 5. Responsive rules

- Validate the same content and interaction states at matching before/after viewport dimensions.
- Use the separate mobile type scale rather than shrinking the entire desktop layout uniformly.
- Keep the mobile hero heading prominent; make section and feature headings subordinate.
- Keep header action labels readable and maintain effective touch targets.
- Preserve the current responsive gallery and carousel behaviour. Ensure every item remains available.
- Fit full before-and-after comparisons within consistent frames, with neutral surrounds where needed.
- Keep programme names, durations, and prices readable without overlap.
- Ensure fixed actions leave clearance for content and controls, including short mobile viewports and device safe areas.
- Rebalance contents within existing section dimensions after changing type or spacing. Do not use new clipping or smaller-than-readable text to solve fit problems.

## 6. Component and section guidance

These rules describe the intended direction for future authorized design changes. Some refinements may already exist in the current working tree; inspect before changing anything.

### Header

- Preserve its dimensions, navigation content, destinations, and responsive behaviour.
- Centre the logo, navigation, and consultation action optically.
- Use the header-button height targets within the existing header.
- Keep mobile action labels readable.

### Hero

- Preserve the existing hero section dimensions and photograph.
- Use the proposed desktop panel width of 960–1000 px, centred and responsive.
- Centre the supporting paragraph with the headline and action group.
- Keep the consultation action dominant and the results link secondary.
- Arrange price and location as quieter metadata without changing their wording.
- Keep both faces visible through appropriate photograph positioning.
- Use restrained translucency and blur, checking readability over the actual image. Opacity, shadow, and blur require optical verification; no arbitrary global values are mandated.
- Avoid an excessive floating-card shadow on mobile.

### Trust strip

- Preserve all three benefits and the rating.
- Match group widths, vertical alignment, accent-marker dimensions, and text offsets.
- Give the rating a deliberate position on the same content grid.

### Patient video

- Preserve the footage and its original aspect ratio.
- Use an intentional poster frame; avoid a black ending frame as the resting presentation.
- Use one clear initial play affordance and retain normal playback controls.
- Compose the portrait footage within the current media area without stretching or removing meaningful imagery.
- Balance media and copy vertically. Keep the numerical result prominent and the duration subordinate.

### Before-and-after gallery

- Use equal external tile widths and a common image-area height.
- Fit complete original comparisons inside those frames with consistent neutral surrounds where aspect ratios differ.
- Preserve meaningful anatomy and comparison evidence.
- Standardize corner radii, enlargement controls, and navigation alignment.

### Doctors

- Use four equal columns across the main content width when the desktop layout permits all four doctors to appear.
- Fill column widths with consistent image frames. Use the documented 280–310 px frame-height range as a starting target, subject to fit.
- Match face scale and headroom without distorting photographs.
- Align names, specialties, and disclosure controls; keep specialty text readable.
- Hide inactive desktop carousel arrows only when all doctors are visible and no navigation is required. Retain controls where overflow makes navigation necessary.

### Process and monitoring

- Use feature-title tokens rather than section-heading tokens.
- Align restrained numbered markers and disclosure controls across columns.
- Reserve consistent title areas where useful for matching control baselines.
- Match the shared rounded-card language.
- Keep expanded content readable with the existing section-sizing and accordion behaviour.
- Use the shared detail roles and spacing in section 9 for revealed paragraphs; do not inherit section-sized typography inside panels.
- Integrate the monitoring consultation action into the section's content group.

### Programme pricing

- Preserve the compact accordion structure, programme order, prices, durations, and details.
- Give programme names more prominence than duration metadata.
- Align prices and disclosure controls in stable columns; use tabular numerals.
- Standardize row dividers, padding, hover, focus, and expanded states.
- Use `type.detailHeading` for headings inside revealed programme bodies and `type.detailList` for inclusions; avoid duplicated item padding and margins.
- Do not replace the section with a taller pricing-card layout.

### Introductory trial

- Preserve all content and qualifications.
- Group the two-column content in one restrained neutral panel centred within the existing section; use the primary white surface if a fill is needed.
- Use `acccentLight` only for individual accents within the offer, such as a price badge or small marker. Do not fill the offer section or its whole panel with it.
- Align the offer, price, inclusions, qualifications, and action as one composition.

### Assessment accordions

- Preserve the compact list and all details.
- Standardize row padding, numbering, title emphasis, dividers, and disclosure controls.
- Apply the shared detail-body and supporting-media variant inside the reveal; do not let a portrait support image dominate the whole expanded section.
- Distinguish the two existing groups through spacing and label treatment.
- Do not add large imagery that changes the section's compact role or dimensions.

### Reviews

- Use consistent card heights and padding while allowing complete review content to remain accessible.
- Establish result, timeframe, review, and attribution hierarchy.
- Align attribution and source links in a stable bottom area.
- Use a white surface or sufficiently visible outline, and place navigation near the heading group.

### Clinic network

- Preserve the section's dimensions and existing information.
- Historical review finding: a map SVG rendered at 22 × 22 px despite a much larger intended map area. This is a previously observed issue, not a claim that the current code remains broken.
- Inspect the current implementation before proposing a fix; keep map SVG sizing independent of icon sizing.
- Make the map legible within its existing intended area, with readable markers and country highlights.
- Keep the heading, disclosures, and map visually related. Check collapsed and expanded states.

### Getting started

- Preserve all three steps and their wording.
- Use matching columns, numbering, rules, and text starts.
- Keep the step group visually connected to its heading within the existing section.

### Enquiry form

- Preserve all questions, options, progress, validation, message preparation, and review-before-opening-WhatsApp behaviour.
- Provide a clear selected-option state and consistent progress, question, answer, and action spacing.
- Proposed presentation-only exception: hide the fixed consultation action while the enquiry form is in view so the form action leads; restore it outside that context. Preserve the action's destination and access elsewhere.

### Final consultation

- Preserve the section dimensions, clinic photograph, and copy.
- Match the hero panel's material, radius, type hierarchy, and action language.
- Position the panel so distinguishing clinic features remain visible.

### Footer

- Preserve all existing content and outer dimensions.
- Proposed optical treatment: charcoal background with a readable light logo and text.
- Align location and copyright information consistently.

## 7. Validation for a later implementation

Before making authorized visual changes:

1. Capture the current working-tree baseline, including existing uncommitted work. Do not substitute an older commit or remote deployment for the user's current baseline.
2. Capture screenshots and section bounding boxes, recording exact viewport width and height, scroll position, content, and interaction states.
3. Record visible and accessible text, media sources, relevant link destinations, and form behaviour.

After implementation:

1. Compare at identical viewports and states, including representative desktop, intermediate, mobile, and short mobile layouts around the existing breakpoints.
2. Verify section count, order, widths, and heights against the baseline. Do not silently accept section growth or shrinkage as a visual improvement.
3. Verify all text, prices, destinations, media, and functional behaviour remain unchanged.
4. Check for accidental horizontal page overflow, clipped content, distorted media, and cropped comparison evidence.
5. Check collapsed/expanded accordions, carousels, selected form options, keyboard focus, and hover states where supported.
6. Check text and control contrast over actual surfaces and photographs. Confirm `acccentLight` is used only on individual element accents and never paints section or page backgrounds, including through aliases, wrappers, large panels, gradients, overlays, or pseudo-elements.
7. Check fixed actions do not cover content, form controls, or the active next-step action.
8. Confirm the map renders at its intended size and all required information remains available.
9. Validate the longest and permitted multiple-open disclosures using the [expanded-content checklist](EXPANDED_CONTENT_REVIEW.md#8-acceptance-checklist), preserving corresponding expanded-state dimensions as well as collapsed-state dimensions.

Use existing checks appropriate to the change. Do not add brittle tests solely to mirror CSS values. For documentation-only work, verify links, token consistency, the changed-file list, and preservation of existing application files; runtime testing is not required because no runtime changes are made.

Record adjusted targets and their fit constraints rather than weakening preservation restrictions. At handoff, identify changed files, the canonical rules and token references, validation performed, and any unresolved design decisions.

## 8. Suggested order for a future authorized refinement

1. Verify the map's current rendering and fix it only if still necessary.
2. Correct typography hierarchy, especially process and monitoring titles.
3. Align the doctors' frames and desktop columns.
4. Refine the hero panel, headline, paragraph alignment, and action balance.
5. Standardize spacing, corners, borders, and controls.
6. Refine the video poster and comparison gallery presentation.
7. Apply the warmer palette and selective surfaces.
8. Validate mobile type, pricing, form actions, and protected dimensions.

## 9. Expanded-content system

Apply this system to doctor biographies, process and monitoring details, programme inclusions, assessments, network and city disclosures, and enquiry helper explanations across the project. Read the [investigation and proposed solution](EXPANDED_CONTENT_REVIEW.md) for measured evidence and component-specific guidance. Values are centralized in [the expanded-content token specification](DESIGN_TOKENS.md#12-expanded-content-tokens).

- Use dedicated compact trigger, nested-heading, body, list, and metadata roles. Keep a revealed explanation subordinate to its card or row title.
- Keep trigger typography and card width stable between open and closed states. Main accordion row titles retain their own role; nested headings must not inherit section-heading sizes.
- Group identity and metadata closely, use one spacing mechanism per relationship, and remove accumulated final-paragraph margins in compact details.
- Use readable prose widths, top-aligned content, and compact supporting-media frames. Avoid artificial body stretching, automatic spacers, and large inner gaps.
- Preserve the complete source and proportions of supporting images; do not apply compact-media limits to primary patient evidence or gallery lightboxes.
- Preserve existing exclusive-open and independent-open policies. Do not auto-close neighbours, introduce a modal/drawer, or add nested scrolling to force a fit.
- Preserve section dimensions at the same viewport and interaction state. A current expanded baseline may already be taller than the collapsed one; do not convert this into a new fixed-height rule. If a proposal cannot fit protected dimensions with complete readable content, record the conflict rather than changing the restriction.
- Keep neutral section backgrounds and the element-only `acccentLight` restriction in every expanded state.

The original review was documentation-only. The subsequently authorized local implementation and its validation are recorded in the [implementation follow-up](EXPANDED_CONTENT_REVIEW.md#9-local-implementation-follow-up). Each new task's user instructions continue to determine its authorized scope.
