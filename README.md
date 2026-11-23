# FL-Masonry

Website for Flores Landscaping (floreslandscapingdmv.com): hand-built stone steps, walls, flagstone patios, water features and stone mailbox pillars by Juan Flores, serving Montgomery County, Washington, DC and Northern Virginia since 2002. Published with GitHub Pages from `main`.

Designed for older homeowners: cream, forest green and brass; 20px body text; large buttons; the phone number on every screen; plain wording.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Home page: hero, services, before and after, mailbox pillars, About Juan, recent work, landscaping, how it works, service area, estimate form |
| `privacy.html` | Privacy policy, linked under the estimate form and in the footer |
| `work.html` | Gallery with filter buttons and a photo viewer (Previous / Next / Close, arrow keys, Escape) |
| `site.css` | All styles |
| `site.js` | Mobile menu, estimate form (Formspree), gallery filters, photo viewer |
| `images/work/` | Project photos from the business Instagram (@floreslandscaping_dmv) |
| `images/` | Earlier project photos, some still used |
| `CNAME` | Custom domain for GitHub Pages |

`site.css` and `site.js` are linked with a version tag (`?v=7`). Raise the number after editing either file so visitors' browsers load the new copy.

## Still to confirm

1. **Phone.** (240) 462-1150. Search `462-1150` and `+12404621150` to change it.
2. **Wording about Juan.** The About section says he has worked with stone since 2002 and lists the stones he uses (taken from Instagram captions). Adjust anything that isn't right.
3. **A photo of Juan** would make the About section stronger. Add it to `images/work/` and swap it in.

## Adding the MHIC license number

Maryland requires the MHIC number on the website. To add it on GitHub:

1. Open the file (for example `index.html`) on github.com and click the pencil icon (Edit).
2. Press Cmd+F and search for `MHIC NUMBER`.
3. On the line right below it, change `Flores Landscaping.` to `Flores Landscaping. MHIC No. 12345.` using Juan's real number.
4. Click **Commit changes**.
5. Repeat for `work.html` and `privacy.html`.

The live site updates about a minute later.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## After it goes live

Open the site on a phone, tap **Call Now**, and send one test estimate request to confirm it arrives.
