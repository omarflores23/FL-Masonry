# FL-Masonry

Website for Flores Landscaping (floreslandscapingdmv.com): hand-built stone steps, walls, flagstone patios, water features and stone mailbox pillars by Juan Flores, serving Montgomery County, Washington, DC and Northern Virginia since 2002. Published with GitHub Pages from `main`.

Designed for older homeowners: cream, forest green and brass; 20px body text; large buttons; the phone number on every screen; plain wording.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Home page: hero, services, before and after, mailbox pillars, About Juan, recent work, landscaping, how it works, service area, estimate form |
| `work.html` | Gallery with filter buttons and a photo viewer (Previous / Next / Close, arrow keys, Escape) |
| `site.css` | All styles |
| `site.js` | Mobile menu, estimate form (Formspree), gallery filters, photo viewer |
| `images/work/` | Project photos from the business Instagram (@floreslandscaping_dmv) |
| `images/` | Earlier project photos, some still used |
| `CNAME` | Custom domain for GitHub Pages |

`styles.css` and `script.js` belong to an earlier version and are no longer used. Delete them once this version is live.

`site.css` and `site.js` are linked with a version tag (`?v=6`). Raise the number after editing either file so visitors' browsers load the new copy.

## Before merging to `main`, confirm

1. **Phone.** (240) 462-1150. Search `462-1150` and `+12404621150` to change it.
2. **Wording about Juan.** The About section says he has worked with stone since 2002 and lists the stones he uses (taken from Instagram captions). Adjust anything that isn't right.
3. **Client address photo.** `images/mailbox_address_sign.jpg` shows a client's house number and street. The site no longer uses it. Delete it or blur it.
4. **A photo of Juan** would make the About section stronger. Add it to `images/work/` and swap it in.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## After it goes live

Open the site on a phone, tap **Call Now**, and send one test estimate request to confirm it arrives.
