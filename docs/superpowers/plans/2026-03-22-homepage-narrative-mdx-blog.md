# Homepage Narrative + MDX Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add MDX blog infrastructure to the writing section and rewrite the homepage with a narrative voice and a "latest writing" section.

**Architecture:** File-based MDX blog using `next-mdx-remote` and `gray-matter`. Posts live in `content/posts/` at project root. A `src/lib/posts.ts` utility reads and parses them at build time. The homepage imports the posts utility to surface recent writing.

**Tech Stack:** Next.js 16, next-mdx-remote, gray-matter, Tailwind CSS v4, @tailwindcss/typography

**Spec:** `docs/superpowers/specs/2026-03-22-homepage-narrative-mdx-blog-design.md`

---

## File Structure

```
content/
  posts/
    hello-world.mdx             — sample blog post (proves infrastructure works)

src/
  lib/
    posts.ts                    — read/parse/sort MDX posts from content/posts/
  app/
    page.tsx                    — MODIFY: narrative rewrite + latest writing section
    sitemap.ts                  — MODIFY: include blog post URLs dynamically
    writing/
      page.tsx                  — MODIFY: replace placeholder with post listing
      [slug]/
        page.tsx                — CREATE: individual post page with MDX rendering
```

---

### Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install next-mdx-remote and gray-matter**

```bash
pnpm add next-mdx-remote gray-matter
```

- [ ] **Step 2: Verify installation**

```bash
pnpm build
```

Expected: Build succeeds with no errors. The new packages are in `node_modules/`.

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "feat: add next-mdx-remote and gray-matter dependencies"
```

---

### Task 2: Post Utility Library

**Files:**
- Create: `src/lib/posts.ts`

- [ ] **Step 1: Create the posts utility**

Create `src/lib/posts.ts` with these exports:

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  published: boolean;
};

export type Post = PostMeta & {
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'));

  const posts = files
    .map((filename): PostMeta => {
      const slug = filename.replace(/\.mdx$/, '');
      const filePath = path.join(POSTS_DIR, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        description: data.description ?? '',
        tags: data.tags ?? [],
        published: data.published ?? false,
      };
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const post: Post = {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    description: data.description ?? '',
    tags: data.tags ?? [],
    published: data.published ?? false,
    content,
  };

  if (!post.published) {
    return null;
  }

  return post;
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}
```

- [ ] **Step 2: Verify it compiles**

```bash
pnpm build
```

Expected: Build succeeds. The module is importable via `@/lib/posts`.

- [ ] **Step 3: Commit**

```bash
git add src/lib/posts.ts
git commit -m "feat: add posts utility for reading MDX files"
```

---

### Task 3: Sample Blog Post

**Files:**
- Create: `content/posts/hello-world.mdx`

- [ ] **Step 1: Create the content directory and sample post**

Create `content/posts/hello-world.mdx`:

```mdx
---
title: "Hello, World"
date: "2026-03-22"
description: "First post on the new blog. A quick hello and what to expect."
tags: ["meta"]
published: true
---

This is the first post on this blog. More to come — I'll be writing about software engineering, architecture decisions, and lessons from building things at scale.

Stay tuned.
```

- [ ] **Step 2: Commit**

```bash
git add content/posts/hello-world.mdx
git commit -m "feat: add sample hello-world blog post"
```

---

### Task 4: Individual Post Page

**Files:**
- Create: `src/app/writing/[slug]/page.tsx`

- [ ] **Step 1: Create the dynamic post page**

Create `src/app/writing/[slug]/page.tsx`:

```tsx
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Metadata } from 'next';
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: `${post.title} | Germán Meza`,
      description: post.description,
      url: `https://germanamz.com/writing/${post.slug}`,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <p className="text-gray-500 mt-1">{formattedDate}</p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {post.tags.map((tag) => (
              <span key={tag} className="badge badge-xs badge-outline">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <div className="prose">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Verify the post page renders**

```bash
pnpm build
```

Expected: Build succeeds. The route `/writing/hello-world` is generated.

- [ ] **Step 3: Start dev server and verify manually**

```bash
pnpm dev
```

Open `http://localhost:3000/writing/hello-world` in browser. Verify:
- Title "Hello, World" renders
- Date shows "March 22, 2026"
- Tag "meta" shows as a badge
- Post content renders with prose styling

- [ ] **Step 4: Commit**

```bash
git add src/app/writing/\\[slug\\]/page.tsx
git commit -m "feat: add individual blog post page with MDX rendering"
```

---

### Task 5: Writing Listing Page

**Files:**
- Modify: `src/app/writing/page.tsx`

- [ ] **Step 1: Replace the placeholder with a post listing**

Replace the full content of `src/app/writing/page.tsx` with:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Articles, thoughts, and writings by Germán Meza on software development, technology, and more.',
  openGraph: {
    title: 'Writing | Germán Meza',
    description:
      'Articles, thoughts, and writings by Germán Meza on software development, technology, and more.',
    url: 'https://germanamz.com/writing',
  },
};

export default function WritingPage() {
  const posts = getAllPosts();

  if (posts.length === 0) {
    return (
      <div className="prose">
        <p>Nothing here yet. Check back soon.</p>
      </div>
    );
  }

  return (
    <div>
      <ul className="space-y-6">
        {posts.map((post) => {
          const formattedDate = new Date(post.date).toLocaleDateString(
            'en-US',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            },
          );

          return (
            <li key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="block hover:underline"
              >
                <h3 className="text-lg font-semibold">{post.title}</h3>
              </Link>
              <p className="text-sm text-gray-500">{formattedDate}</p>
              <p className="text-gray-700 mt-1">{post.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
```

- [ ] **Step 2: Verify the listing page renders**

```bash
pnpm build
```

Expected: Build succeeds. `/writing` shows the hello-world post in the listing.

- [ ] **Step 3: Start dev server and verify manually**

```bash
pnpm dev
```

Open `http://localhost:3000/writing`. Verify:
- The hello-world post appears with title, date, and description
- Clicking the title navigates to `/writing/hello-world`

- [ ] **Step 4: Commit**

```bash
git add src/app/writing/page.tsx
git commit -m "feat: replace writing placeholder with blog post listing"
```

---

### Task 6: Homepage Narrative Rewrite

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Rewrite the homepage with narrative copy and latest writing section**

Replace the full content of `src/app/page.tsx` with:

```tsx
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 2);

  return (
    <div>
      <div className="prose">
        <h3>Germán Meza</h3>
        <p className="italic text-gray-500 -mt-4 mb-4">
          -- just like Herman Meza
        </p>
        <p>
          I&apos;ve been building software for over a decade, most of it
          figuring out how to make things work at scale without losing sleep over
          what breaks at 3 AM. I currently work at{' '}
          <Link href="https://www.zillowgroup.com/" target="_blank">
            Zillow Group
          </Link>{' '}
          as a Senior Software Engineer.
        </p>
        <p>
          What keeps me in this field is the craft of it — the satisfaction of
          turning a tangled problem into something clean and reliable. I care
          about code that&apos;s easy to change, systems that are honest about
          their failure modes, and teams that trust each other enough to move
          fast.
        </p>
        <p>
          Outside of work, I pick up a camera more often than I probably should.
          I live in Guadalajara, México, and when I&apos;m not coding or
          shooting photos, I&apos;m usually planning the next trip. You can see
          what I&apos;m up to on{' '}
          <Link href="https://www.instagram.com/germanamz/" target="_blank">
            Instagram
          </Link>{' '}
          or check out my side projects{' '}
          <Link href="https://github.com/germanamz" target="_blank">
            on GitHub
          </Link>
          .
        </p>
      </div>

      {recentPosts.length > 0 && (
        <div className="mt-10">
          <h4 className="text-sm font-semibold uppercase text-gray-500 mb-4">
            Latest writing
          </h4>
          <ul className="space-y-4">
            {recentPosts.map((post) => {
              const formattedDate = new Date(post.date).toLocaleDateString(
                'en-US',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                },
              );

              return (
                <li key={post.slug}>
                  <Link
                    href={`/writing/${post.slug}`}
                    className="hover:underline font-medium"
                  >
                    {post.title}
                  </Link>
                  <p className="text-sm text-gray-500">{formattedDate}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
```

**Note:** This is draft copy. Germán will rewrite the narrative paragraphs in his own voice.

- [ ] **Step 2: Verify the homepage renders**

```bash
pnpm build
```

Expected: Build succeeds. Homepage renders with narrative copy and "Latest writing" section showing the hello-world post.

- [ ] **Step 3: Start dev server and verify manually**

```bash
pnpm dev
```

Open `http://localhost:3000`. Verify:
- Narrative paragraphs render with prose styling
- "-- just like Herman Meza" pronunciation note is present
- Links to Zillow, Instagram, GitHub work
- "Latest writing" section shows at the bottom with the hello-world post
- Clicking the post title navigates to `/writing/hello-world`

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: rewrite homepage with narrative copy and latest writing section"
```

---

### Task 7: Update Sitemap

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Update sitemap to include blog posts dynamically**

Replace the full content of `src/app/sitemap.ts` with:

```typescript
import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://germanamz.com';

  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/writing/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/writing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...postEntries,
  ];
}
```

- [ ] **Step 2: Verify the build succeeds**

```bash
pnpm build
```

Expected: Build succeeds. Sitemap includes the hello-world post URL.

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat: update sitemap to include blog post URLs dynamically"
```

---

### Task 8: Final Verification

- [ ] **Step 1: Run a clean build**

```bash
pnpm build
```

Expected: Build succeeds with no errors or warnings.

- [ ] **Step 2: Run the linter**

```bash
pnpm lint
```

Expected: No lint errors.

- [ ] **Step 3: Manual smoke test**

```bash
pnpm dev
```

Verify all routes:
- `http://localhost:3000` — Homepage with narrative copy and "Latest writing"
- `http://localhost:3000/writing` — Post listing with hello-world entry
- `http://localhost:3000/writing/hello-world` — Full post with MDX content
- `http://localhost:3000/resume` — Resume page unchanged

- [ ] **Step 4: Verify the PDF export still works**

On the resume page, click "Download as PDF" and confirm the print layout is unaffected.
