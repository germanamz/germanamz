import { renderOgImage } from '@/lib/og-image';
import { OG_IMAGE_SIZE, PERSON, SITE_NAME, SITE_TITLE } from '@/lib/site';

export const alt = SITE_TITLE;
export const size = OG_IMAGE_SIZE;
export const contentType = 'image/png';

// Site-wide social card, served at /opengraph-image. Pages reference it
// through `pageMetadata` in src/lib/site.ts.
export default function Image() {
  return renderOgImage({
    title: SITE_NAME,
    subtitle: PERSON.jobTitle,
  });
}
