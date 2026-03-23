# Homepage Narrative Rewrite + MDX Blog Infrastructure

**Date:** 2026-03-22
**Status:** Approved

## Goals

1. **Strengthen professional presence** — rewrite the homepage with a more personal, narrative voice that conveys who Germán is as an engineer, not just where he works.
2. **Build a publishing platform** — add MDX-based blog infrastructure so the writing section becomes functional and the site is a place for regular content.

## Non-Goals

- No visual redesign — the site's minimal, text-forward aesthetic is intentional and stays.
- No changes to the resume page.
- No changes to navigation structure.
- No pagination, tag filtering, or search on the blog (YAGNI).

## Design

### 1. MDX Blog Infrastructure

#### File Structure

```
content/
  posts/
    *.mdx                   — blog posts (project root, separate from app code)
src/
  app/
    writing/
      page.tsx              — post listing page (replaces placeholder)
      [slug]/
        page.tsx            — individual post page
  lib/
    posts.ts               — utility to read/parse MDX files
```

#### Post Format

Each `.mdx` file uses YAML frontmatter:

```mdx
---
title: "Building at Scale with Next.js"
date: "2026-03-20"
description: "Lessons from migrating a monolith to micro-frontends"
tags: ["nextjs", "architecture"]
published: true
---

Post content here...
```

#### Key Decisions

- **`next-mdx-remote`** for MDX rendering — more flexible than `@next/mdx`, supports dynamic loading from the filesystem without registering each post as a route file.
- **`gray-matter`** for frontmatter parsing.
- **`content/posts/`** at project root — keeps content separate from application code.
- **Tags** stored in frontmatter and displayed on posts, but no tag-based filtering routes.
- **`published: false`** drafts are excluded from the listing page and sitemap.
- **No pagination** — add when post count warrants it.

#### Post Listing Page (`/writing`)

- Replaces the current placeholder.
- Displays all published posts sorted newest first.
- Each entry shows: title (linked), date, description.
- Minimal styling consistent with the rest of the site.

#### Individual Post Page (`/writing/[slug]`)

- Renders MDX content using `next-mdx-remote`.
- Uses `@tailwindcss/typography` prose classes for content formatting (already installed).
- OpenGraph metadata generated from frontmatter (title, description).
- Shows title, date, tags, then the post body.

### 2. Homepage Narrative Rewrite

#### What Changes

- The copy only. Same layout, same structure, same minimal design.
- Replace the current factual bio with a more personal narrative.

#### New Content Structure

1. **Who you are and what you do** — with voice, not just facts.
2. **What drives you** — engineering philosophy, what problems excite you.
3. **The human side** — photography, travel, life in Guadalajara — woven into narrative, not listed.
4. **Latest writing** — a new section at the bottom showing 1-2 most recent blog posts (title, date, description) with links.

#### What Stays

- The "-- just like Herman Meza" pronunciation note.
- Links to Zillow, GitHub, Instagram.
- The overall page structure and prose typography styling.

#### Important Note

The implementation will include draft copy as a starting point. Germán will rewrite it in his own voice.

### 3. Connecting the Pieces

#### Sitemap & SEO

- `sitemap.ts` updated to dynamically include all published blog post URLs.
- Each blog post gets OpenGraph metadata from its frontmatter.

#### Dependencies

New packages to add:
- `next-mdx-remote` — MDX rendering
- `gray-matter` — frontmatter parsing

Already installed:
- `@tailwindcss/typography` — prose classes for post content
