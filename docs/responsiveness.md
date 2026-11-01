# Fluid responsive layouts

All application-authored responsive rules are in `frontend/src/styles/Responsiveness.css`, imported last from `main.jsx`. The only custom viewport thresholds are **390px, 1440px and 1920px**. Bootstrap's distributed styles remain a dependency; the layouts changed here override its column widths where they previously constrained content.

The default layout accommodates small screens. Preferred dimensions are retained through flexible bases and caps: listing images start around 250px, search fields around 160px, picture choices up to 200px, detail booking columns around 320px and content shells around 1168–1600px. Flex wrapping and auto-fit grids handle the widths between the three thresholds without additional media or container breakpoints.

- **390px:** bounded, fluid gutters and compact picture choices.
- **1440px:** expanded navigation and the permanently visible browse filter sidebar. Seller onboarding uses its original desktop content styles at this width and above.
- **1920px:** browse content can grow to a bounded 1760px shell.

## Width fixes

- Search occupies its own row above the browse layout. The filter panel no longer applies a nested Bootstrap column width.
- Filters can be expanded on smaller screens. When closed they do not reserve an empty sidebar; when open the sidebar/results pair wraps according to available space.
- Cards wrap their image, description, price and actions while maintaining readable control sizes.
- Gallery images, home-page cards, footer columns and picture choices resize or wrap within their parent.
- Checkout no longer uses fixed half-width columns, a 340px minimum card or a 15%-width return button.
- Listing forms use a bounded shell instead of 20vw padding on both sides. Upload/pricing grids wrap intrinsically.
- Account and admin layouts permit long text to wrap. The booking table scrolls inside its panel. Seller detail drawers are capped by viewport width and use dynamic viewport height.
- Page overflow is resolved at component level; no global `overflow-x: hidden` masks overflowing content.

## Verification

Build, frontend lint and the existing frontend/backend regression suites are run after implementation. Source checks verify that media queries occur only in the dedicated stylesheet and use only the three agreed thresholds.

Chrome visual checks completed on the live local app:

- Browse at 390px, including the stacked search controls, collapsed filter control, listing image, description, price and actions.
- Onboarding at 390px, including hero, calls to action, stats and benefit cards.
- Onboarding at 1440px with the original desktop hero/section composition.
- The wider browse layout, confirming that search controls and filters no longer overlap.

A complete visual sweep of authenticated account/admin pages and the 1920px preview remains to be performed. The native browser-control surface became unavailable during the remaining checks. No account data was changed for layout verification.
