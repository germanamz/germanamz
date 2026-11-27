import matter from 'gray-matter';
import homeSource from '../../content/pages/home.mdx';
import resumeSource from '../../content/pages/resume.mdx';
import { getAllPosts, type Post } from './posts';
import {
  HANDLE,
  OPEN_SOURCE,
  PERSON,
  SITE_NAME,
  SOCIAL_PROFILES,
  WRITING_TOPICS,
  absoluteUrl,
  toIsoDate,
} from './site';

// Markdown renditions of the site for machine readers: the /md/* mirror,
// llms.txt, and llms-full.txt. The sources are MDX, so anything only React can
// render is turned into plain Markdown here; an agent fetching these gets the
// same information a browser shows, not a dangling component tag.

const PAGE_SOURCES: Record<string, string> = {
  '': homeSource,
  resume: resumeSource,
};

function isoDay(value: string | undefined): string | undefined {
  return toIsoDate(value)?.slice(0, 10);
}

function postLine(post: { slug: string; title: string; date: string; description: string }) {
  const day = isoDay(post.date);
  return `- [${post.title}](${absoluteUrl(`/md/writing/${post.slug}`)})${day ? ` (${day})` : ''}: ${post.description}`;
}

function recentPostsMarkdown(limit: number): string {
  const posts = getAllPosts().slice(0, limit);
  if (posts.length === 0) return '';
  return ['## Latest writing', '', ...posts.map(postLine)].join('\n');
}

function mdxToMarkdown(source: string): string {
  return source
    .replace(/<RecentPosts(?:\s+limit=\{(\d+)\})?\s*\/>/g, (_match, limit?: string) =>
      recentPostsMarkdown(limit ? Number(limit) : 2),
    )
    // Styled paragraphs: keep the text, drop the presentational wrapper.
    .replace(/<p\b[^>]*>([\s\S]*?)<\/p>/g, '$1')
    .trimEnd()
    .concat('\n');
}

/** Markdown for a static page; `key` is its path under /md ('' for home). */
export function pageMarkdown(key: string): string | undefined {
  const source = PAGE_SOURCES[key];
  return source === undefined ? undefined : mdxToMarkdown(source);
}

export function writingIndexMarkdown(): string {
  return ['# Writing', '', ...getAllPosts().map(postLine)].join('\n') + '\n';
}

// A post on its own has to carry its attribution: the author and canonical
// URL are what let an assistant cite it. Editorial-only frontmatter (`type`,
// `published`) is left out.
export function postMarkdown(post: Post): string {
  const frontmatter: Record<string, unknown> = {
    title: post.title,
    author: SITE_NAME,
    date: isoDay(post.date),
    ...(post.updated ? { updated: isoDay(post.updated) } : {}),
    description: post.description,
    ...(post.tags.length > 0 ? { tags: post.tags } : {}),
    url: absoluteUrl(`/writing/${post.slug}`),
  };
  return matter.stringify(`\n${post.content.trim()}\n`, frontmatter);
}

// The same post as a plain document (heading and byline instead of
// frontmatter), for llms-full.txt, where `---` separates documents.
export function postDocument(post: Post): string {
  const byline = [
    `By ${SITE_NAME}`,
    `Published ${isoDay(post.date)}`,
    ...(post.updated ? [`Updated ${isoDay(post.updated)}`] : []),
    ...(post.tags.length > 0 ? [`Tags: ${post.tags.join(', ')}`] : []),
  ].join(' · ');
  return [`# ${post.title}`, '', byline, '', `> ${post.description}`, '', post.content.trim(), ''].join('\n');
}

/** One-paragraph factual summary shared by llms.txt and llms-full.txt. */
export function siteSummary(): string {
  return (
    `${SITE_NAME} (also written "${PERSON.alternateNames[0]}", handle \`${HANDLE}\`) is a ` +
    `${PERSON.jobTitle} at ${PERSON.employer.name}, ` +
    `building software professionally since ${PERSON.careerStart}. This personal site has a bio, ` +
    `a résumé, and essays on ${WRITING_TOPICS.slice(0, -1).join(', ')}, and ${WRITING_TOPICS.at(-1)}.`
  );
}

const PROFILE_LABELS: Record<keyof typeof SOCIAL_PROFILES, string> = {
  github: 'GitHub',
  x: 'X',
  linkedin: 'LinkedIn',
  stackoverflow: 'Stack Overflow',
  instagram: 'Instagram',
};

export function aboutFacts(): string[] {
  const profiles = (Object.keys(PROFILE_LABELS) as Array<keyof typeof SOCIAL_PROFILES>)
    .map((key) => `[${PROFILE_LABELS[key]}](${SOCIAL_PROFILES[key]})`)
    .join(', ');

  return [
    `- Name: ${SITE_NAME} (also written "${PERSON.alternateNames[0]}"; handle \`${HANDLE}\`)`,
    `- Role: ${PERSON.jobTitle} at [${PERSON.employer.name}](${PERSON.employer.url})`,
    `- Experience: building software professionally since ${PERSON.careerStart}`,
    `- Expertise: ${PERSON.knowsAbout.join(', ')}`,
    `- Writes about: ${WRITING_TOPICS.join(', ')}`,
    ...OPEN_SOURCE.map(
      (project) => `- Open source: [${project.name}](${project.url}): ${project.description}`,
    ),
    `- Profiles: ${profiles}`,
  ];
}
