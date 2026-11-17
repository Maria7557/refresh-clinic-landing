# Expanded content: investigation and project-wide solution

Reviewed: 17 November 2026. Status: original investigation plus a subsequently authorized local implementation, recorded in section 9. The live-site measurements below describe the pre-change rendering, not the current local preview.

Sources: [Refresh, site 1](https://ospio.online/refresh-metabolic-art-v2/), [Metabolic, site 2](https://metabolic.health/lp-weightloss?utm_source=chatgpt.com), the supplied doctor-card screenshot, and read-only inspection of the current local stylesheet.

The shared values are defined in [DESIGN_TOKENS.md](DESIGN_TOKENS.md#12-expanded-content-tokens). Preservation and implementation restrictions remain in [DESIGN_RULES.md](DESIGN_RULES.md#9-expanded-content-system).

## 1. Finding

Expanded content needs its own compact supporting-detail hierarchy. Site 1 currently mixes small disclosure triggers with larger page-body copy, allows nested headings to inherit section-sized typography, and gives some supporting images enough height to dominate the revealed content. Narrow card widths and accumulated spacing amplify those effects.

The supplied screenshot also shows the doctor identity, specialty, disclosure label, and revealed paragraph reading as separate large blocks. The paragraph has too much visual weight relative to the disclosure label, and the identity-to-specialty spacing weakens their relationship. Fixing the paragraph size alone would not resolve the complete composition.

The screenshot is a cropped image, so its pixels are not treated as CSS measurements. The live URL and local working tree have different style treatments: the live doctor disclosure inspected used a native triangle, while the screenshot and local stylesheet include a plus/minus treatment. Live measurements below describe the inspected live rendering, not a claim that the local working tree has identical computed styles.

## 2. What site 2 demonstrates

| Detail | Reference desktop measurement | Reference mobile measurement |
| --- | --- | --- |
| Feature heading | 27 px type / 34 px line height | 20 / 26 px |
| Feature supporting copy | 18 / 26 px | 12 / 18 px |
| Feature copy width | Approximately 295 px | Approximately 292 px |

Desktop measurements used a 1470 px-wide viewport; mobile measurements used 390 × 844 px. Site 2's inspected landing page exposed no `details` elements or `aria-expanded` controls. It is a reference for hierarchy, density, and grouping, not an equivalent accordion implementation.

Its supporting copy remains clearly subordinate to headings and sits close to them. Transfer that relationship to Refresh, with a dedicated detail role. Do not copy the reference's 12 px mobile supporting text: the proposed Refresh detail body remains 16 / 24 px on mobile for comfortable reading.

## 3. What site 1 currently reveals

Measured at 1470 × 698 px on desktop and 390 × 844 px on mobile. Values are rounded where appropriate. They are observations, not replacement height tokens.

| Component | Observed issue | Effect |
| --- | --- | --- |
| Doctor disclosure | Desktop trigger 12 / 18 px; paragraph 18 / 26 px in a 260 px column | The explanation becomes much louder than the control that introduces it |
| Mobile doctor card | Card width 210 px; revealed paragraph uses 18 / 26 px and occupies 182 px vertically | Excessive wrapping makes a short explanation feel long |
| Process details | Revealed copy 18 / 26 px; desktop title 40 / 52 px | Supporting detail and titles create an oversized card composition |
| Monitoring details | Paragraph inherits a 30 px bottom margin in addition to its top spacing | A short explanation carries more vertical whitespace than needed |
| Expanded programme | Nested heading 40 / 52 px on desktop and 32 / 41.6 px on mobile | The revealed heading competes with the section heading |
| Programme list | Mobile items combine 18 px bottom padding with 16 px bottom margin | Repeated whitespace makes the revealed list unnecessarily tall |
| Assessment media | Supporting image renders at 320 × 568 px on both tested widths | One image consumes most of a mobile screen before the explanation |
| Assessment explanation | Desktop paragraph can span approximately 1271 px | The copy is detached from its image and too wide to read as a compact detail |
| Network disclosure | Desktop copy spans the full 1323 px content area and precedes a separate 620 × 300 px photograph | The reveal becomes another large section-like composition |

Observed outer section heights illustrate the current growth behaviour:

| Section and state | Desktop before opening | Desktop after opening | Mobile expanded height |
| --- | --- | --- | --- |
| Doctors, first biography open | 698 px | 846 px | 900 px |
| Programmes, longest final programme open | 706 px | 1124 px | 1630 px |
| Assessments, first image-led item open | 698 px | 1331 px | 1403 px |
| Network, both disclosures open | Approximately 705 px | 1197 px | 1228 px |

These are specific tested states, not universal limits. Do not turn these measurements into hardcoded CSS heights. A long programme can legitimately require more space than a short biography.

## 4. Proposed common detail system

Use a shared disclosure shell with explicit compact text, structured-list, and media variants. Variants share typography and spacing roles; they do not force every content type into an identical box.

| Role | Proposed desktop size / line height | Proposed mobile size / line height |
| --- | --- | --- |
| Short disclosure trigger | 14 / 20 px | 14 / 20 px |
| Heading inside an expanded panel | 22 / 30 px | 20 / 28 px |
| Supporting detail paragraph | 15 / 22 px | 16 / 24 px |
| Detail list item | 15 / 22 px | 16 / 24 px |
| Supporting metadata | 13 / 18 px | 13 / 18 px |

These are dedicated detail roles, not a request to shrink primary body copy across the site. A principal assessment row title retains the existing accordion-title role; the smaller trigger role applies to secondary prompts inside cards and similar short disclosure controls.

For the supplied doctor example, retain the doctor-name role, group the specialty closely below it, use the short-trigger role, and reveal the paragraph using the detail-body role. The name must remain the strongest text in the card.

### Compact spacing and readable width

- Start with 8 px between the doctor name and specialty, and 12 px between the identity group and disclosure.
- Use an 8 px gap between the trigger box and revealed body, rather than stacking several independent margins.
- Use 10 px between paragraphs and 16 px between genuinely separate detail blocks or an associated action.
- Give list items one combined 8–12 px separation; do not add substantial padding and margin for the same relationship.
- Use compact reveal padding of 16–20 px on desktop and 12–16 px on mobile when a separate inner panel needs padding. Do not add it again when the parent already supplies the inset.
- Remove inherited final-paragraph bottom margins inside the compact detail context.
- Limit long prose in wide panels to approximately 60 characters per line (`60ch` as a proposed maximum), without imposing a minimum width. Use the full available width in narrow cards.
- For mobile doctor cards, test a stable card width up to 320 px within the available content width, with a small next-card preview where space permits. Use the same width in collapsed and expanded states. This changes the internal carousel allocation, not the outer section width.

All exact targets are centralized in the token document. Gaps refer to adjacent element boxes; account for trigger padding when checking the visible distance between text lines.

## 5. Layout and state behaviour

- Keep headings, images, identity groups, and trigger typography stable when a disclosure opens.
- Top-align content inside revealed panels. Do not vertically centre a short paragraph in a tall empty area.
- Keep the heading and trigger in a coherent group rather than repositioning the entire composition around its new centre after every opening.
- Equalize image frames and identity/trigger alignment where helpful; do not stretch every neighbouring expanded body to match the longest one.
- Do not use automatic spacer growth or bottom-anchored triggers to create large gaps within a card.
- Preserve existing exclusive groups for programmes and assessment options, and independent-open behaviour for the other disclosure groups.
- Test multiple independently open items. Do not introduce automatic closing of neighbouring items merely to make the layout fit.
- Preserve keyboard focus and access to collapse controls. Do not introduce forced page jumps or a second scrollable area inside short details.
- Preserve the neutral section background. `acccentLight` remains an element accent only, never an expanded section fill or large substitute background.

### Section-size restriction

Preserve outer section dimensions against the current baseline at the same viewport and interaction state. An already expanded section may have a taller baseline than its collapsed state. This does not authorize new section resizing, and it does not mean all states should be forcibly locked to the collapsed height.

Improve the composition inside those protected outer dimensions. Do not replace saved internal space with large new gaps between related elements. Keep any remaining space outside the cohesive content group, without altering protected outer dimensions.

Do not fit long content using hidden overflow, clipping, line clamps, reduced readability, or new nested scrolling. If a proposed arrangement cannot satisfy both complete content and the preserved dimensions, record the conflict. A smaller expanded outer section, a modal/drawer, a new exclusive-open policy, or different section sizing would be a separate scope decision; none is part of this documentation task.

## 6. Application by component

| Component | Suggested solution |
| --- | --- |
| Doctor biographies | Compact body role; closely grouped identity; adequate reading width; stable card width; consistent trigger spacing. Do not reduce the doctor name to the paragraph scale |
| Process cards | Feature-sized main title, short trigger, compact revealed paragraph; align card starts and control rhythm without stretching every body |
| Monitoring cards | Same compact detail role; remove accumulated paragraph margins and keep the section action associated with the main content group |
| Programme inclusions | Use the smaller nested detail heading; compact structured lists with one spacing mechanism; preserve every inclusion, qualification, duration, price, and action |
| Assessment and treatment options | Keep the principal row title at accordion-title size; place supporting media beside the explanation on desktop, with text primary; stack compact media and text on mobile |
| Network overview | Treat prose and reception photo as one supporting composition, preferably side by side on desktop where fit allows; keep the existing map and disclosures within the same section |
| City list | Keep existing chips readable with consistent gaps and natural wrapping; do not make the revealed chip group a large padded panel |
| Enquiry helper and prepared-message areas | Reuse detail typography for helper explanations, preserve the existing editable message and workflow, and keep the active action clear of the fixed consultation button |

Gallery lightboxes retain their image-first purpose and complete comparison evidence. Compact prose rules do not justify reducing or cropping patient evidence, replacing interactions, or applying small supporting-media limits to the primary gallery.

### Supporting-media variant

Use a proposed supporting-media maximum height of 240 px on desktop and 220 px on mobile. Preserve the entire source within the frame using an appropriate contained presentation, without stretching or cropping evidence. These limits apply to images inside expanded supporting content, not hero photographs, doctor portraits, maps, patient galleries, or the primary video.

For the portrait assessment image, a compact frame beside the explanation on desktop prevents a 568 px image from dictating the reveal. On mobile, a compact contained image followed by the copy keeps the explanation within a useful reading sequence. The landscape network photograph may be shorter than the maximum; do not enlarge it to meet a ceiling.

## 7. Suggested future implementation approach

1. Capture the current working-tree baseline in collapsed, single-open, and permitted multiple-open states. The remote site and local screenshot should not be assumed to be the same revision.
2. Resolve the typography and spacing roles for revealed content before changing outer layout. Avoid another unrelated page-wide body-text override.
3. Map all disclosure families to the common shell and the appropriate compact text, structured-list, or media variant.
4. Review inherited margins, grid stretch, reserved metadata height, and automatic spacers. Remove duplication only within the authorized component scope.
5. Use the wider stable mobile doctor-card allocation and compact supporting-media frames where they fit the protected layout.
6. Check complete text and all existing interactions against the baseline. Record any unsatisfied fit constraint rather than quietly changing section sizes.

The current local stylesheet already contains later component refinements and a 16 / 24 px mobile detail override for several families. That does not prove the live page has those refinements, or that all wide-desktop, nested-heading, media, and spacing cases are solved. Inspect the current implementation before any later code work; do not blindly add another layer of overrides.

## 8. Acceptance checklist

- Compare at matching viewport dimensions, including desktop, existing intermediate widths, 390 × 844 px mobile, and short mobile heights.
- Test the longest doctor biography, longest programme, image-led assessment, and network with both disclosures open.
- Test all permitted independent-open combinations without adding a new exclusivity policy.
- Keep every word, accessible label, image source, destination, and functional behaviour unchanged.
- Preserve section dimensions separately for each corresponding baseline state.
- Confirm nested headings remain subordinate and no trigger changes typography when opened.
- Check paragraphs, list spacing, line lengths, image limits, and the absence of accumulated final margins.
- Check neighbouring cards for artificial stretching and excessive empty internal space.
- Check text zoom, keyboard operation, visible focus, full content access, and fixed-action clearance.
- Keep `acccentLight` restricted to individual element accents.
- Follow the authorized task scope. The original review changed documentation only; the later implementation is recorded below.

## 9. Local implementation follow-up

The user subsequently requested implementation of these suggestions. The expanded-content changes are scoped to `refinements.css`, with documentation updated to reflect the implementation. Existing HTML, text, JavaScript, image assets, form logic, section-bound measurement, and disclosure opening policies were left unchanged by this follow-up.

Implemented:

- Shared detail type sizes: 15 / 22 px body on desktop, 16 / 24 px on mobile; 14 / 20 px secondary triggers; 22 / 30 px nested headings on desktop and 20 / 28 px on mobile.
- Removed reserved doctor-name and specialty row heights, reducing the measured identity group from 106 px to 55 px on the tested desktop and from 100 px to 55 px on mobile.
- Stable mobile doctor cards up to 320 px wide, capped by their available content width.
- Consistent paragraph and list spacing without accumulated trailing margins or stretched neighbouring bodies.
- Compact programme headings and structured lists; 16 px reveal padding fits the protected bounds.
- Supporting assessment imagery capped at 240 px on desktop and 220 px on mobile, with the complete image contained and the explanation beside it on desktop.
- Network prose and supporting photograph aligned side by side on desktop using `::details-content` when supported, with a compact stacked fallback and a mobile stack.
- Shared detail roles for network explanations, city metadata, and enquiry helper text. `acccentLight` remains restricted to individual elements.

Validation:

- Compared 13 closed, single-open, and permitted multiple-open states at each of 1440 × 900, 900 × 900, 390 × 844, and 390 × 667 px: 52 before/after comparisons in total.
- Maximum outer section-height difference: 0 px. No section-width changes or horizontal page overflow in those comparisons.
- Checked all six programmes and all six assessment options at 320 × 667 px: no page or detail-content horizontal overflow, with exclusive opening preserved.
- Confirmed keyboard Space closes a doctor disclosure, doctor carousel navigation works, and programmes and assessments retain their one-open-at-a-time behaviour.
- Completed the local enquiry flow with generic test selections; the prepared message remained editable, the fixed consultation action was hidden while the form was visible, and no external message was sent.
- Inspected desktop and mobile screenshots and checked browser error logs, which were empty.

The preserved dimensions include the existing larger expanded-state baseline. The implementation does not force long reveals into the collapsed height or hide their content.
