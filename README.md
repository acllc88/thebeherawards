# beHER Awards — Website Redesign

A complete, professionally designed rebuild of **soawawards.com**, using all of the
original event information and every usable image from the site.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, event stats, This Is HER Night, Her Experience, 13 honorees, 6 I Am HER nominees, founder, hotel, newsletter |
| `meet-her.html` | Full profile and story of Dr. Carolyn Horne Robins |
| `our-story.html` | HERStory page with the 48-photo archive gallery and lightbox |

All ticket and hotel links point to the same destinations as the original site.

## Design direction

- **Editorial luxury** rather than a template look: high-contrast Bodoni Moda display
  type paired with Inter for body text.
- **Palette:** near-black ink, warm ivory paper, muted gold, and the brand magenta used
  sparingly as an accent.
- **Layout:** generous whitespace, hairline rules, asymmetric image stacks, bordered
  frames, and a restrained gold-on-black gala atmosphere.
- **Motion:** quiet scroll reveals, a sticky header, a scrollable honoree rail, an
  accessible lightbox, and a mobile drawer. Everything respects
  `prefers-reduced-motion`.
- **Responsive:** fluid type and dedicated layouts for desktop, tablet, and phone.
- **Accessibility:** skip links, semantic headings, alt text, visible focus states,
  keyboard-operable rail and gallery, and AA-friendly text colors.

## Craft pass

After the build, the site went through a deliberate polish pass rather than a re-skin.
The direction stayed: ceremonial, exacting, quietly warm — a candlelit ballroom and a
printed invitation suite in ink, ivory stock, brass foil, and magenta florals.

- **Copy:** functional labels and eyebrows are sentence case (`Get your tickets`,
  `Meet the honorees`, `Vision & inspiration`). Display headlines keep their own
  typographic voice. `Hey, sis` is the original brand voice and stays.
- **Type:** one UI scale — 12 / 14 / 16 / 18 / 20px — plus fluid display sizes. No
  uppercase tracking on interface text. Italics are reserved for the hero word, the
  wordmark, pull quotes, and the founder's prose.
- **Color:** gold used as text on ivory is `--gold-ink` `#856433` (4.9:1). Gold rules,
  hairlines, and the primary button keep the brighter `--gold` on ink. The magenta
  `HER` in the wordmark is the single recurring signature.
- **Spacing:** spacing and control sizes snap to a 4px scale; only 1px hairlines and a
  few optical nudges stay off it.
- **Details:** number badges are solid ink instead of blurred glass; the footer uses the
  trimmed transparent `images/logo-mark.png`.
- **Motion:** no hover zoom or lift. Cards and gallery items respond with border and
  opacity changes; buttons press to `0.98`; scroll reveals are 12px / 0.5s with a 60ms
  stagger.

## Structure

```
index.html
meet-her.html
our-story.html
assets/
  css/styles.css      Design system and all page styles
  js/main.js          Navigation, rail, lightbox, form, reveals
  fonts/              Self-hosted Bodoni Moda + Inter (WOFF2)
images/
  hero-ballroom.jpg, hotel.jpg, founder.jpg, her-night.jpg, community.jpg, ...
  honorees/           13 honoree posters
  nominees/           6 I Am HER nominee posters
  story/              48 archive photographs
```

All photographs were optimized (resized and compressed) from the original Wix assets
so the site stays fast while keeping every image.

## Deployment

- **Vercel:** already linked and deployed. Production URL:
  `https://denis-two-orpin.vercel.app` (alias) /
  `https://denis-iwxl0zgqm-h12compteofficiel-gmailcoms-projects.vercel.app`
  Redeploy with `vercel --prod` from the project root.
- **GitHub:** initialize a remote and push:
  ```bash
  git remote add origin https://github.com/<your-user>/<repo>.git
  git branch -M main
  git push -u origin main
  ```
  Then connect the GitHub repo in the Vercel dashboard for automatic deploys on push.

Any static server works:

```bash
python3 -m http.server 4317
```

Then open <http://localhost:4317>.

## Notes

- The newsletter form is a front-end demo: it validates and confirms in the browser.
  Connect it to your email provider before launch.
- Fonts are self-hosted; no external font request is needed.
- `images/og-image.png` (1200×630) is the social share card used by the
  Open Graph / Twitter meta tags on all three pages.
- The honoree and nominee captions use the names and titles printed on the supplied
  posters.
- `images/logo.png` is the original square mark kept for the favicon;
  `images/logo-mark.png` is the same artwork trimmed and made transparent for the footer.
- Verified with Lighthouse: Accessibility 100, Best Practices 100, SEO 100 on all three
  pages; no missing local links or unreferenced images.
