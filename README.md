# FL-Masonry
Premium stonework website scaffold for custom stone mailboxes and front entrance upgrades.

Files added:
- `index.html` — homepage and sections (hero, services, gallery, contact form)
- `styles.css` — responsive styles with accessible typography and color palette
- `script.js` — small JS for mobile nav, year, and form handling

How to use:
1. Open `index.html` in a browser (double-click or serve with a static server).
2. Replace placeholder images with real project photos to improve SEO and trust.
3. Update the phone number in `index.html` to the business phone.
4. Hook the contact form to your backend or form service (Mailgun, Formspree, Netlify Forms, etc.).

Design notes:
- Focused on older, higher-income homeowners in MD/DC/VA.
- Emphasizes custom stone mailboxes and front entrance upgrades; finishing touches (mulch, edging, planting) are shown only as add-ons to masonry work.
- Large type, clear CTAs, and high-contrast colors for readability and accessibility.

To serve locally (quick):

Using Python 3 (built-in):
```bash
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Using Node (serve):
```bash
npx serve . 3000
# then open http://localhost:3000 in your browser
```

Files to replace with real content:
- `images/hero.svg` — hero image placeholder
- `images/mailbox1.svg`, `mailbox2.svg`, `mailbox3.svg`, `entrance.svg` — service cards
- `images/before.svg`, `images/after.svg` — gallery placeholders

Open `index.html` after serving to view the full layout and replace the SVGs with real photos (use the same filenames or update the `src` attributes in `index.html`).

Next steps:
- Add real project photos to the `images/` folder and update `index.html` image tags.
- Provide the business phone number, company name, and any certifications to include on the site.

