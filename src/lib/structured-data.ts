import type { PostMeta } from './posts';
import {
  PERSON,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_PROFILES,
  absoluteUrl,
  toIsoDate,
} from './site';

const WEBSITE_ID = `${SITE_URL}/#website`;
const PERSON_ID = `${SITE_URL}/#person`;

const personRef = { '@id': PERSON_ID };

// Home page: the site, the page, and the person it is about, linked by @id so
// post pages can point back at the same Person node.
export function homeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: 'en',
        publisher: personRef,
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: SITE_TITLE,
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: personRef,
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: SITE_NAME,
        url: SITE_URL,
        jobTitle: PERSON.jobTitle,
        worksFor: {
          '@type': 'Organization',
          name: PERSON.employer.name,
          url: PERSON.employer.url,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: PERSON.locality,
          addressRegion: PERSON.region,
          addressCountry: PERSON.country,
        },
        sameAs: Object.values(SOCIAL_PROFILES),
      },
    ],
  };
}

export function postJsonLd(post: PostMeta) {
  const url = absoluteUrl(`/writing/${post.slug}`);
  const published = toIsoDate(post.date);
  const author = {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE_NAME,
    url: SITE_URL,
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#post`,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: post.title,
    description: post.description,
    image: `${url}/opengraph-image`,
    datePublished: published,
    dateModified: toIsoDate(post.updated) ?? published,
    inLanguage: 'en',
    keywords: post.tags.length > 0 ? post.tags : undefined,
    author,
    publisher: author,
    isPartOf: { '@id': WEBSITE_ID },
  };
}
