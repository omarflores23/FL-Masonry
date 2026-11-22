# FL-Masonry

Website for Flores Landscaping (floreslandscapingdmv.com): hand-built stone mailbox pillars and entrance stonework in Potomac, Bethesda, Rockville and Northwest DC. Published with GitHub Pages from `main`.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Home page: hero, pillar packages, about, services, process, service area, estimate form |
| `work.html` | Gallery with filters and a full-screen photo viewer |
| `site.css` | Styles for both pages |
| `site.js` | Mobile menu, estimate form (Formspree), gallery filters, photo viewer |
| `images/` | Project photos |
| `CNAME` | Custom domain for GitHub Pages |

`styles.css` and `script.js` belong to the previous version and are no longer used. Delete them once the new version is live.

## Before merging to `main`, confirm

1. **Prices.** The four "Starting at" prices in `index.html` are estimates. Replace them with real numbers.
2. **Phone.** (240) 462-1150. Search `462-1150` and `+12404621150` to change it.
3. **Social links.** The footer links to Facebook, Instagram and Yelp. Remove any that are no longer active.
4. **Client address photo.** `images/mailbox_address_sign.jpg` shows a client's house number and street. The new pages don't use it. Blur it or delete it unless the client agreed.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## After it goes live

Open the site on a phone, tap **Call**, and send one test estimate request to confirm it arrives.
