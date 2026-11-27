import type { Metadata } from 'next';

// Single source of truth for the site's canonical origin. Every absolute URL
// the site emits (canonical tags, Open Graph, sitemap, robots, feed, llms.txt,
// JSON-LD) derives from this, so it must match the primary domain in Vercel —
// the host that answers 200 rather than redirecting.
export const SITE_URL = 'https://germanamz.com';

export const SITE_NAME = 'Germán Meza';
// The role, employer, and handle disambiguate the name: a search for the bare
// name is dominated by other people with the same or a similar one, so the
// title and description carry the terms that single this one out. Location is
// deliberately absent; the only mention on the site is the résumé's contact
// line.
export const SITE_TITLE = 'Germán Meza — Senior Software Engineer';
export const SITE_DESCRIPTION =
  'Germán Meza (germanamz) is a Senior Software Engineer at Zillow Group. Essays on AI agents, engineering judgment, and software at scale.';

export const TWITTER_HANDLE = '@germanamz';

export const HANDLE = 'germanamz';

// Every profile here is emitted as schema.org `sameAs` and listed in
// llms.txt, which is how search engines and AI assistants tie these accounts
// to one person. The footer picks its own subset.
export const SOCIAL_PROFILES = {
  x: 'https://x.com/germanamz',
  github: 'https://github.com/germanamz',
  linkedin: 'https://linkedin.com/in/germanamz',
  instagram: 'https://instagram.com/germanamz',
  stackoverflow: 'https://stackoverflow.com/users/7997905/german-meza',
} as const;

// Mirrors the bio in content/pages/home.mdx and the résumé in
// content/pages/resume.mdx; update them together. Feeds the Person JSON-LD
// and llms.txt, so keep every value a plain, checkable fact.
export const PERSON = {
  givenName: 'Germán',
  familyName: 'Meza',
  // What people actually type: the unaccented spelling and the handle.
  alternateNames: ['German Meza', HANDLE],
  jobTitle: 'Senior Software Engineer',
  employer: { name: 'Zillow Group', url: 'https://www.zillowgroup.com/' },
  description:
    'Senior Software Engineer at Zillow Group with more than a decade of experience building software at scale. Writes about AI agents, engineering judgment, and the craft of software.',
  careerStart: 2015,
  languages: ['es', 'en'],
  alumniOf: 'Centro de Enseñanza Técnica Industrial (CETI)',
  knowsAbout: [
    'Software engineering',
    'AI agents',
    'Agentic engineering',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'React',
    'Next.js',
    'Python',
    'Go',
    'GraphQL',
    'Microservices',
    'Amazon Web Services',
    'Kubernetes',
  ],
} as const;

// What the writing is about. Used for the /writing metadata, the Blog
// JSON-LD, and llms.txt.
export const WRITING_TOPICS = [
  'AI agents',
  'agentic engineering',
  'human judgment',
  'building software at scale',
] as const;
export const WRITING_DESCRIPTION =
  'Essays by Germán Meza on agentic engineering, working with AI agents, human judgment, and building software at scale.';

export const OPEN_SOURCE = [
  {
    name: 'tusk',
    url: 'https://github.com/germanamz/tusk',
    description:
      'A local-first, semantically indexed knowledge graph over Markdown files, served to AI agents over the Model Context Protocol (MCP).',
  },
] as const;

export const FEED_PATH = '/feed.xml';
export const FEED_TITLE = `${SITE_NAME} — Writing`;

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export function absoluteUrl(path: string = '/'): string {
  return path === '/' ? SITE_URL : `${SITE_URL}${path}`;
}

// Frontmatter dates arrive as strings (or Dates, when unquoted in YAML).
// Returns undefined rather than throwing on a missing or malformed date.
export function toIsoDate(value: string | Date | undefined): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

const feedAlternate = [{ url: FEED_PATH, title: FEED_TITLE }];

// Defaults for the root layout. Deliberately has no canonical or og:url: those
// are per-page, and a layout-level value would be inherited by every route
// that doesn't set its own (including the 404 page).
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    creator: TWITTER_HANDLE,
  },
  alternates: {
    types: {
      'application/rss+xml': feedAlternate,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

type PageMetadataInput = {
  /** Page title without the site suffix. Omit on the home page. */
  title?: string;
  description: string;
  /** Site-relative path of the HTML page, e.g. `/resume`. */
  path: string;
  /** Site-relative path of the page's social card; defaults to the site card. */
  imagePath?: string;
  imageAlt?: string;
  /** Terms the page is actually about. Omit rather than pad. */
  keywords?: readonly string[];
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    tags?: string[];
  };
};

// Next merges metadata shallowly: a page that sets `openGraph`, `twitter`, or
// `alternates` replaces the layout's whole object rather than extending it.
// Every page therefore builds those three in full here, so none of them can
// silently drop the image, site name, canonical, or feed link.
export function pageMetadata({
  title,
  description,
  path,
  imagePath = '/opengraph-image',
  imageAlt,
  keywords,
  article,
}: PageMetadataInput): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_TITLE;
  const url = absoluteUrl(path);
  const images = [
    { url: imagePath, ...OG_IMAGE_SIZE, alt: imageAlt ?? fullTitle },
  ];

  return {
    ...(title ? { title } : {}),
    description,
    ...(keywords && keywords.length > 0 ? { keywords: [...keywords] } : {}),
    alternates: {
      canonical: url,
      types: {
        'text/markdown': path === '/' ? '/md' : `/md${path}`,
        'application/rss+xml': feedAlternate,
      },
    },
    openGraph: {
      locale: 'en_US',
      siteName: SITE_NAME,
      url,
      title: fullTitle,
      description,
      images,
      ...(article
        ? {
            type: 'article' as const,
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            authors: [SITE_URL],
            tags: article.tags,
          }
        : { type: 'website' as const }),
    },
    twitter: {
      card: 'summary_large_image',
      creator: TWITTER_HANDLE,
      title: fullTitle,
      description,
      images,
    },
  };
}
