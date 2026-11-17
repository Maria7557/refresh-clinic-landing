# Refresh Clinic design token specification

Status: shared design specification. The expanded-content sizes, spacing, and media limits in section 12 are implemented as CSS custom properties in `../refinements.css`; the remaining general targets are proposed defaults. This file is not imported by the application, and no standalone JSON token file is generated.

Use this file as the canonical reference for numeric targets and colour values. [DESIGN_RULES.md](DESIGN_RULES.md) defines scope, component behaviour, preservation restrictions, and validation. Explicit user instructions and preservation restrictions take precedence over these proposed targets.

## 1. Naming and implementation contract

- Primitive names describe values; semantic names describe intent; component names describe a component's use of a semantic value or primitive.
- The peach primitive is named exactly `acccentLight` (`#F4DDCD`), as requested. Preserve this spelling; do not rename it to `accentLight` or introduce a competing peach token.
- Names below are implementation-neutral. If runtime CSS is later authorized, map them consistently to the project's conventions, for example `color.text.primary` to `--refresh-color-text-primary`.
- Reuse equivalent existing tokens instead of creating a competing system.
- Components should consume semantic or component aliases rather than introducing unrelated hardcoded values.
- Keep ranges as documented constraints. A range is not a literal CSS value; choose a concrete value after checking fit.
- Prefer rem units for type and spacing where appropriate. The px values are design-reference units, not instructions to override the browser's base font size. For conversion at a 16 px reference base, divide by 16.
- Use the current breakpoints and responsive behaviour; do not treat mobile/desktop labels as permission to replace media queries.
- When a future machine-readable source and CSS aliases exist, document their relationship and keep them synchronized with this specification.

## 2. Primitive colour tokens

| Token | Value | Intended primitive |
| --- | --- | --- |
| `color.paper.warm` | `#F8F7F3` | Warm page background |
| `color.white` | `#FFFFFF` | Primary light surface and text on dark |
| `color.charcoal` | `#303030` | Primary text and strong dark surface |
| `color.grey.secondary` | `#5B5B56` | Secondary text |
| `color.orange.brand` | `#FF914D` | Refresh brand accent |
| `acccentLight` | `#F4DDCD` | Individual element accents only; never section or page backgrounds |
| `color.charcoal.alpha18` | `rgba(48, 48, 48, 0.18)` | Default fine divider |
| `color.charcoal.alpha32` | `rgba(48, 48, 48, 0.32)` | Stronger divider |

## 3. Semantic colour aliases

| Token | Maps to | Use |
| --- | --- | --- |
| `color.background.page` | `color.paper.warm` | Main page background |
| `color.surface.primary` | `color.white` | Cards or panels needing separation |
| `color.element.acccentLight` | `acccentLight` | Small element accents such as badges and numbered markers; never section-sized surfaces |
| `color.surface.dark` | `color.charcoal` | Dark header or proposed footer surface |
| `color.text.primary` | `color.charcoal` | Main copy and headings |
| `color.text.secondary` | `color.grey.secondary` | Supporting copy and metadata |
| `color.text.onDark` | `color.white` | Content on dark surfaces |
| `color.border.default` | `color.charcoal.alpha18` | Default structural divider |
| `color.border.strong` | `color.charcoal.alpha32` | Stronger structural definition |
| `color.action.brand.background` | `color.orange.brand` | Brand-filled consultation actions |
| `color.action.brand.foreground` | `color.charcoal` | Text and icons on orange actions |
| `color.action.dark.background` | `color.charcoal` | Dark hero primary action |
| `color.action.dark.foreground` | `color.white` | Text and icons on dark actions |
| `color.highlight.background` | `acccentLight` | Text-highlight elements only; never section or page backgrounds |
| `color.highlight.foreground` | `color.charcoal` | Text over soft emphasis |

Focus, hover, selected, expanded, and disabled treatments must remain visible and readable against their actual surfaces. No universal focus colour or state opacity was supplied in the brief: preserve a working existing treatment and verify any later proposed changes rather than inventing an unvalidated global value.

Use Refresh orange consistently. Metabolic yellow is not a proposed brand token. Do not give each peer item an unrelated accent colour.

### Mandatory `acccentLight` usage restriction

Use `acccentLight` only for individual element accents, for example text highlights, badges, numbered markers, and small decorative details. Never use it as a section or page background. The restriction applies equally through aliases, nested wrappers, large panels, full-width bands, gradients, overlays, and pseudo-elements that effectively colour a section background. An element's HTML tag does not exempt it: a large panel functioning as a section background must remain neutral. Keep the introductory offer's section and whole panel neutral; accent only individual elements inside it.

## 4. Typography primitives

| Token | Value |
| --- | --- |
| `font.family.primary` | `"Plus Jakarta Sans", Arial, sans-serif` |
| `font.weight.body` | `400` |
| `font.weight.ui` | `500` |
| `font.weight.action` | `600` |
| `font.weight.heading` | `700` |
| `font.tracking.heading` | Approximately `-0.02em` |
| `font.tracking.body` | `normal` |
| `font.tracking.control` | `normal` |
| `font.tracking.eyebrow` | Approximately `0.06em` |

Apply heading tracking to hero and section headings; preserve readable spacing for other roles. Eyebrows use uppercase styling without rewriting the source copy. Validate font-weight availability in a future implementation; this document does not authorize changing font assets.

## 5. Semantic typography targets

All numeric pairs are **font size / line height in px**.

| Role token | Desktop | Mobile | Weight / treatment |
| --- | --- | --- | --- |
| `type.hero` | `50 / 60` | `32 / 41.6` | Heading; tight tracking |
| `type.section` | `40 / 52` | `28 / 36` | Heading; tight tracking |
| `type.feature` | `27 / 35` | `22 / 29` | Heading; subordinate to section |
| `type.doctorName` | `22 / 29` | `21 / 28` | Heading |
| `type.accordionTitle` | `22 / 30` | `20 / 28` | Heading |
| `type.body` | `18 / 26` | `16 / 24` | Body |
| `type.bodySecondary` | `16 / 24` | `16 / 24` | Body; supporting role |
| `type.button` | `16 / 24` | `16 / 24` | Action |
| `type.headerAction` | Inherit `type.button` | `14 / 20` | Action; readable compact label |
| `type.metadata` | `14 / 20` | `13 / 20` | Supporting UI |
| `type.eyebrow` | `12 / 18` | `11 / 16` | Emphasized uppercase label |

The mobile secondary-body values and desktop header-action inheritance make the table complete through reuse of existing roles; they are proposed mappings, not additional measured findings. Use the existing hierarchy if it already satisfies the intent and protected dimensions.

Process and monitoring titles consume `type.feature`, not `type.section`. Doctor names and accordion titles use their own roles. Headings and paragraphs nested inside expanded supporting content use the dedicated detail roles in section 12, rather than inheriting feature or section sizes. Preserve semantic heading levels independently of visual sizing. Use tabular numerals where prices or numerical comparisons align.

## 6. Spacing primitives

| Token | Value |
| --- | --- |
| `space.1` | `4 px` |
| `space.2` | `8 px` |
| `space.3` | `12 px` |
| `space.4` | `16 px` |
| `space.5` | `20 px` |
| `space.6` | `24 px` |
| `space.7` | `28 px` |
| `space.8` | `32 px` |
| `space.9` | `40 px` |
| `space.10` | `48 px` |
| `space.11` | `56 px` |
| `space.12` | `64 px` |

## 7. Semantic spacing relationships

| Token | Starting target | Mapping / note |
| --- | --- | --- |
| `space.eyebrowToHeading` | `12 px` | `space.3` |
| `space.headingToIntro` | `16 px` | `space.4` |
| `space.headingGroupToContent` | `36 px` | Derived: `space.8 + space.1` |
| `space.gridGap` | `24 px` | `space.6` |
| `space.imageToTitle` | `18 px` | Derived: `space.4 + space.1 / 2` |
| `space.titleToBody` | `10 px` | Derived: `space.2 + space.1 / 2` |
| `space.cardPadding` | `24–28 px` | Choose `space.6` or `space.7` after checking fit |
| `space.formOptionGap` | `8–12 px` | Choose `space.2` or `space.3` after checking fit |

The derived 36, 18, and 10 px relationships are supplied targets. Do not silently round them away or expand the primitive scale with near-duplicates without a reason.

## 8. Layout constraints

| Token / constraint | Target or policy |
| --- | --- |
| `layout.gutter.desktop` | Preserve existing responsive calculation; approximately `5%` where already used |
| `layout.gutter.mobile` | Approximately `20 px`, preserving existing behaviour |
| `layout.section.dimensions` | Preserve baseline at each matching viewport and interaction state |
| `layout.section.order` | Preserve baseline |
| `layout.section.count` | Preserve baseline |
| `layout.breakpoint.intermediate` | Retain existing `1100 px` width condition and effective behaviour |
| `layout.breakpoint.mobile` | Retain existing `700 px` width condition and effective behaviour |
| `layout.breakpoint.mobileShortHeight` | Retain existing mobile `720 px` height condition and effective behaviour |

These breakpoint entries document existing conditions; they do not introduce a new breakpoint system. Do not turn an approximate gutter into a replacement for the current clamped calculation. No new section-height token is specified.

## 9. Shape and dimension primitives

| Token | Target / constraint |
| --- | --- |
| `radius.image` | `20 px` |
| `radius.panel` | `24 px` |
| `radius.button` | `9 px` |
| `radius.formOption` | `14 px` |
| `border.width.default` | `1 px` |
| `size.icon.control` | `20–22 px`, scoped to control icons |
| `size.target.carousel` | Approximately `44 px` |
| `size.button.primary.desktop` | Approximately `56–60 px` high |
| `size.button.primary.mobile` | `52 px` high |
| `size.button.header.desktop` | Approximately `48–52 px` high |
| `size.button.header.mobile` | Approximately `44 px` high |

Control dimensions must remain compatible with content, touch access, and protected section sizes. Do not shrink labels or cover content to satisfy a dimension target.

## 10. Component token mappings

| Component token | Mapping / proposed constraint |
| --- | --- |
| `hero.panel.maxWidth.desktop` | Choose a maximum within `960–1000 px`; responsive width must still fit the container |
| `hero.panel.radius` | `radius.panel` |
| `hero.heading` | `type.hero` |
| `hero.action.background` | `color.action.dark.background` |
| `hero.action.foreground` | `color.action.dark.foreground` |
| `header.action.height` | Corresponding `size.button.header` target |
| `button.primary.height` | Corresponding `size.button.primary` target |
| `button.radius` | `radius.button` |
| `button.label` | `type.button`, except header action's dedicated mobile role |
| `card.padding` | `space.cardPadding` |
| `card.feature.title` | `type.feature` |
| `image.frame.radius` | `radius.image` |
| `gallery.comparison.fit` | Preserve complete image; consistent external frame and neutral surround |
| `doctor.columns.desktop` | `4` equal columns when the layout permits all four to be shown |
| `doctor.frame.height.desktop` | Starting range `280–310 px`, subject to fit in the existing section |
| `doctor.frame.width` | Fill its allocated column without distorting the image |
| `doctor.name` | `type.doctorName` |
| `accordion.title` | `type.accordionTitle` |
| `accordion.divider` | `color.border.default` or verified stronger treatment |
| `trial.panel.background` | `color.surface.primary`; neutral white, never `acccentLight` |
| `trial.elementAccent` | `color.element.acccentLight`; individual accents only, not the whole panel or section |
| `trial.panel.radius` | `radius.panel` |
| `review.surface` | `color.surface.primary` or sufficiently visible fine outline |
| `review.padding` | Shared card-padding role; adjust only for fit and record exceptions |
| `form.option.radius` | `radius.formOption` |
| `form.option.gap` | `space.formOptionGap` |
| `consultation.panel.radius` | `radius.panel`; material matches hero after optical validation |
| `footer.background` | Proposed `color.surface.dark` |
| `footer.foreground` | Proposed `color.text.onDark` |

## 11. Values requiring optical validation

The brief does not fix universal values for glass opacity, blur, shadow strength, poster composition, numbered-marker size, accordion row height, equalized review height, or hover/selected/focus colours. Preserve effective existing treatments and tune them only during an authorized implementation after checking actual content and fit.

Use restrained numbered markers, equal external gallery frames, consistent review alignment, and one coherent disclosure treatment as described in the rules. Do not invent arbitrary numeric tokens or copy desktop values into mobile layouts without verification.

If a proposed target conflicts with preserved content or section dimensions, document the component, viewport and state, target, fit constraint, and adjusted value. Keep the preservation restrictions intact.

## 12. Expanded-content tokens

These compact roles address the [expanded-content investigation](EXPANDED_CONTENT_REVIEW.md). Their sizes, spacing, and media limits are implemented in `../refinements.css`; existing font weights and font assets remain in use. They supplement the primary page hierarchy and take precedence over generic body or feature roles inside expanded supporting content. They do not change doctor names, main section headings, principal accordion row titles, source text, section dimensions, or existing open/close policies.

### Typography

All numeric pairs are font size / line height in px.

| Token | Desktop | Mobile | Role |
| --- | --- | --- | --- |
| `type.detailTrigger` | `14 / 20` | `14 / 20` | Short secondary disclosure prompt; supporting UI weight |
| `type.detailHeading` | `22 / 30` | `20 / 28` | Heading inside the revealed panel; heading weight |
| `type.detailBody` | `15 / 22` | `16 / 24` | Supporting explanation; body weight |
| `type.detailList` | `15 / 22` | `16 / 24` | Programme inclusions or structured detail; body weight with existing emphasis |
| `type.detailMetadata` | `13 / 18` | `13 / 18` | Secondary detail metadata; supporting UI weight |

Keep main accordion row titles on `type.accordionTitle`. Keep disclosure typography identical in closed and open states. Do not copy the reference's smaller mobile copy into these reading roles.

### Spacing, width, and media

| Token | Proposed target | Constraint |
| --- | --- | --- |
| `space.detailIdentityGap` | `8 px` | Doctor name to specialty; group closely |
| `space.detailIdentityToTrigger` | `12 px` | Identity group to disclosure |
| `space.detailTriggerToBody` | `8 px` | Trigger box to revealed body; account for trigger padding |
| `space.detailParagraphGap` | `10 px` | Between paragraphs; remove inherited final bottom margin |
| `space.detailBlockGap` | `16 px` | Separate content blocks or associated action |
| `space.detailListGap` | `8–12 px` | One combined item separation, not duplicated padding and margin |
| `space.detailPadding.desktop` | `16–20 px` | Only where an inner panel needs padding; do not duplicate parent inset |
| `space.detailPadding.mobile` | `12–16 px` | Same restriction as desktop |
| `size.detailText.maxMeasure` | Approximately `60ch` | Maximum for wide prose; no minimum width; narrow cards use available width |
| `doctor.card.width.mobile` | Up to `320 px`, capped by available content width | Stable across closed/open states; retain carousel access and a small next-card preview where it fits |
| `size.detailMedia.maxHeight.desktop` | `240 px` | Maximum for supporting reveal imagery, not a target to fill |
| `size.detailMedia.maxHeight.mobile` | `220 px` | Preserve full source aspect ratio in a contained frame |

The 10 px paragraph gap reuses the existing derived spacing value. Other spacing targets reuse the primitive scale where applicable. Supporting-media limits do not apply to hero photographs, doctor portraits, maps, primary video, or patient gallery/lightbox evidence.

### Component mappings and layout policy

| Token / component | Mapping / policy |
| --- | --- |
| `doctor.disclosure.trigger` | `type.detailTrigger` |
| `doctor.disclosure.body` | `type.detailBody` |
| `process.disclosure.body` | `type.detailBody`; main card title remains `type.feature` |
| `monitoring.disclosure.body` | `type.detailBody` |
| `programme.expanded.heading` | `type.detailHeading` |
| `programme.expanded.list` | `type.detailList` with existing emphasis |
| `assessment.expanded.body` | `type.detailBody` |
| `assessment.expanded.media` | Corresponding `size.detailMedia` ceiling; desktop side-by-side, mobile stack where fit allows |
| `network.expanded.body` | `type.detailBody` with readable measure |
| `enquiry.helper.body` | `type.detailBody`; preserve form behaviour and editable message |
| `disclosure.surface` | Existing neutral surface; never a section-sized `acccentLight` fill |
| `disclosure.alignment` | Top-aligned content; no artificial stretching of neighbouring bodies |
| `disclosure.outerSize` | Preserve the baseline at matching viewport and interaction state; no new fixed height or clipping |

Existing exclusive and independent-open groups remain unchanged. Equalize image and identity alignment where useful, not every revealed body's height. If complete content and protected dimensions conflict, record the exception for a separate scope decision; do not solve it by hiding content, new nested scrolling, or changing section sizes.

Runtime mapping: `--detail-font-size` / `--detail-line-height`, `--detail-heading-size` / `--detail-heading-line-height`, `--detail-trigger-size` / `--detail-trigger-line-height`, and `--detail-metadata-size` / `--detail-metadata-line-height` implement the corresponding roles. The list role shares body dimensions. `--detail-gap`, `--detail-identity-gap`, `--detail-before`, `--detail-paragraph-gap`, `--detail-block-gap`, `--detail-list-gap`, and `--detail-padding` implement the spacing relationships. `--detail-max-measure`, `--detail-media-max-height`, and `--doctor-card-mobile-width` implement the width and media constraints. Detail padding uses the 16 px end of its desktop range to fit the protected programme section bounds.
