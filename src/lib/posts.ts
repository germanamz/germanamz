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
