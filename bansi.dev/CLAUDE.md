# bansi.dev — technical blog

Astro 7 static site. Markdown in, HTML out. No CMS, no database, no client
frameworks. Owner: Bansi Dath Maddali.

## Layout of the repo

```
src/content/blog/     ← posts live here, one .md file per post
src/content/blog/_template.md  ← copy this to start a post (files starting with _ are ignored)
src/consts.ts         ← site identity: intro headline, nav, social links, Medium archive
src/styles/global.css ← all design tokens at the top; --measure controls content width
src/pages/            ← index (home), about, blog/[...slug], tags/[tag], rss.xml, search.json
```

## How to publish a blog post

1. **Create the file.** Copy `src/content/blog/_template.md` to
   `src/content/blog/<slug>.md`. The filename becomes the URL:
   `my-post.md` → `bansi.dev/blog/my-post/`. Use short kebab-case slugs.

2. **Fill the frontmatter.** Required fields, validated at build time:

   ```yaml
   ---
   title: 'Post title'
   description: 'One or two sentences. Shows on the homepage, tag pages, search, and social cards.'
   pubDate: 2026-08-04          # YYYY-MM-DD
   tags: ['mlops']              # optional; see Tags below
   draft: false                 # true = excluded from the site, feed, and search
   # updatedDate: 2026-09-01    # optional; add when materially revising
   ---
   ```

3. **Write markdown below the frontmatter.** Everything standard works:
   headings (`##`/`###` — these auto-populate the sticky table of contents),
   fenced code blocks with language tags (Shiki highlights them, light + dark),
   tables, blockquotes, images. Put images in `public/` and reference as
   `![alt](/image.png)`.

   To flow a *section* in two columns (good for short prose blocks and lists;
   never wrap a whole long article in it — readers would have to scroll back up
   to read column two), wrap it in a div, with blank lines around the content:

   ```markdown
   <div class="cols">

   - item one
   - item two
   - item three
   - item four

   </div>
   ```

4. **Preview.** `npm run dev` → http://localhost:4321. Drafts (`draft: true`)
   are visible in dev by direct URL but excluded from production builds.

5. **Verify the build.** `npm run build` must complete without errors.
   A frontmatter typo (bad date, missing description) fails the build with a
   pointer to the file — fix and rebuild.

6. **Deploy.** From the repo root:

   ```bash
   vercel --prod --scope mbs-projects-2601a486
   ```

   The `bansi.dev` domain lives in the `mbs-projects-2601a486` Vercel scope —
   deploying to any other scope will not reach the domain.

### First-time deploy only (if the project is not yet linked)

```bash
cd ~/bansi-dev
vercel link --scope mbs-projects-2601a486   # create/link the Vercel project
vercel --prod --scope mbs-projects-2601a486 # first production deploy
vercel domains ls --scope mbs-projects-2601a486          # confirm bansi.dev is there
vercel alias set <deployment-url> bansi.dev --scope mbs-projects-2601a486  # only if domain not auto-attached
```

Vercel auto-detects Astro (build `npm run build`, output `dist/`). No env vars
needed.

## Tags

Tags are how post series work. Every unique tag:
- gets a chip in the top nav (`#mlops`) linking to `/tags/mlops/`
- gets a series page listing its posts, newest first
- is clickable from the post header

Reuse existing tags when a post continues a series; a new tag string creates a
new series automatically at build time. Keep tags short, lowercase, kebab-case.

## Style rules (owner's standing preferences — do not undo)

- No sidebar. No site name or author name on the landing page.
- Content is left-aligned and wide (`--measure` in global.css). Never center it.
- No RSS links in the UI (the `/rss.xml` feed itself stays, silently).
- Social links: LinkedIn and Instagram only, About page only.
- The personal site bansidath.in is "a personal blog of ideas and experiences" —
  never describe it as a photography site and never call it "Long Exposure".
- About page content sticks to the resume's wording and capitalization —
  don't invent bio claims, metrics, or employer details.
- Medium (medium.com/@bansimaddali) is a legacy archive: listed on the About
  page, but new writing is published here, not there.

## Commands

| Command | What |
|---|---|
| `npm run dev` | dev server at localhost:4321 |
| `npm run build` | production build to `dist/` (schema-validates all posts) |
| `npm run preview` | serve the built `dist/` locally |
| `vercel --prod --scope mbs-projects-2601a486` | deploy to bansi.dev |
