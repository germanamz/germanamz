import matter from 'gray-matter';
import { postSources } from './posts-content.generated';

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  description: string;
  tags: string[];
  published: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & {
  content: string;
};

const WORDS_PER_MINUTE = 225;

function showsDrafts(): boolean {
  return (
    process.env.NODE_ENV === 'development' ||
    process.env.VERCEL_ENV === 'preview'
  );
}

function countWords(markdown: string): number {
  const text = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/<[^>]+>/g, ' ');
  const words = text.match(/\b[\w'’-]+\b/g);
  return words ? words.length : 0;
}

function getReadingMinutes(markdown: string): number {
  return Math.max(1, Math.ceil(countWords(markdown) / WORDS_PER_MINUTE));
}

export function toSpokenText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^>\s?/gm, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/\s+/g, ' ')
    .trim();
}

function parsePost(slug: string, source: string): Post {
  const { data, content } = matter(source);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    updated: data.updated,
    description: data.description ?? '',
    tags: data.tags ?? [],
    published: data.published ?? false,
    readingMinutes: getReadingMinutes(content),
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  return Object.entries(postSources)
    .map(([slug, source]) => parsePost(slug, source))
    .filter((post) => post.published || showsDrafts())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(({ content: _content, ...meta }) => meta);
}

export function getPostBySlug(slug: string): Post | null {
  const source = postSources[slug];
  if (!source) {
    return null;
  }

  const post = parsePost(slug, source);
  if (!post.published && !showsDrafts()) {
    return null;
  }

  return post;
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}
