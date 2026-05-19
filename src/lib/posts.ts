import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');
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
      const { data, content } = matter(fileContent);

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        updated: data.updated,
        description: data.description ?? '',
        tags: data.tags ?? [],
        published: data.published ?? false,
        readingMinutes: getReadingMinutes(content),
      };
    })
    .filter((post) => post.published || showsDrafts())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const safeName = path.basename(slug);
  const filePath = path.join(POSTS_DIR, `${safeName}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const post: Post = {
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

  if (!post.published && !showsDrafts()) {
    return null;
  }

  return post;
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}
