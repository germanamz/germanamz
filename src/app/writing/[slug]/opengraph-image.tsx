import { renderOgImage } from '@/lib/og-image';
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts';
import { OG_IMAGE_SIZE, SITE_NAME } from '@/lib/site';

export const alt = `${SITE_NAME} — Writing`;
export const size = OG_IMAGE_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

// Per-post social card, served at /writing/<slug>/opengraph-image.
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return renderOgImage({
    eyebrow: 'Writing',
    title: post?.title ?? SITE_NAME,
    subtitle: post?.description,
  });
}
