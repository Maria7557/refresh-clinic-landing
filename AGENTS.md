# Project design guidance

For design, layout, styling, component, or responsive work anywhere in this repository, read:

- [Design rules](docs/DESIGN_RULES.md): preservation restrictions, component guidance, and validation.
- [Design token specification](docs/DESIGN_TOKENS.md): canonical proposed values, aliases, and responsive targets.
- [Expanded-content review](docs/EXPANDED_CONTENT_REVIEW.md): evidence and shared compact-detail guidance for all disclosure families.

Apply these rules consistently across this project. Preserving existing copy, section dimensions, section order, media evidence, and functional behaviour takes priority over proposed visual targets unless the user explicitly changes that scope.

The peach colour `#F4DDCD` is named `acccentLight` (exact spelling). Use it only for individual element accents; never use it as a section or page background, including through wrappers, large panels, gradients, overlays, or pseudo-elements that function as a section background.

The compact expanded-content sizes, spacing, and media limits are implemented as shared CSS custom properties in `refinements.css`; the broader token specification still contains proposed targets. Reuse existing implementations that already satisfy it; do not introduce a competing token system or assume every historical review finding remains unresolved.

For expandable content, use the dedicated detail roles and validate both collapsed and expanded states, including permitted multiple-open combinations. Preserve existing opening policies and corresponding section dimensions; do not hide content or change interactions to force a fit.

For documentation-only requests, edit documentation only. Do not change application HTML, CSS, JavaScript, assets, dependencies, build configuration, or deployment files. Preserve unrelated changes already present in the working tree.
