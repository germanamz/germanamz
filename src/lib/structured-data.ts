import type { PostMeta } from './posts';
import {
  HANDLE,
  PERSON,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_PROFILES,
  WRITING_DESCRIPTION,
  WRITING_TOPICS,
  absoluteUrl,
  toIsoDate,
} from './site';

const WEBSITE_ID = `${SITE_URL}/#website`;
const PERSON_ID = `${SITE_URL}/#person`;
const BLOG_ID = `${absoluteUrl('/writing')}#blog`;

const personRef = { '@id': PERSON_ID };
const websiteRef = { '@id': WEBSITE_ID };

// The full Person node. Emitted on the pages that are about the person (home
// and résumé); everything else points at it by @id. `alternateName` and
// `sameAs` do the disambiguation work: they tie the unaccented spelling, the
// handle, and each external profile to this one entity.
function personNode() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE_NAME,
    givenName: PERSON.givenName,
    familyName: PERSON.familyName,
    alternateName: PERSON.alternateNames,
    description: PERSON.description,
    url: SITE_URL,
    mainEntityOfPage: SITE_URL,
    jobTitle: PERSON.jobTitle,
    worksFor: {
      '@type': 'Organization',
      name: PERSON.employer.name,
      url: PERSON.employer.url,
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: PERSON.alumniOf,
    },
    knowsAbout: PERSON.knowsAbout,
    knowsLanguage: PERSON.languages,
    sameAs: Object.values(SOCIAL_PROFILES),
  };
}

function breadcrumbs(trail: Array<{ name: string; path: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

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
        alternateName: HANDLE,
        description: SITE_DESCRIPTION,
        inLanguage: 'en',
        publisher: personRef,
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: SITE_TITLE,
        isPartOf: websiteRef,
        mainEntity: personRef,
      },
      personNode(),
    ],
  };
}

export function resumeJsonLd() {
  const url = absoluteUrl('/resume');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${url}#profile`,
        url,
        name: `Resume of ${SITE_NAME}, ${PERSON.jobTitle}`,
        isPartOf: websiteRef,
        mainEntity: personRef,
      },
      personNode(),
      breadcrumbs([
        { name: SITE_NAME, path: '/' },
        { name: 'Resume', path: '/resume' },
      ]),
    ],
  };
}

// Writing index: the blog as a whole plus its posts, newest first.
export function writingJsonLd(posts: PostMeta[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': BLOG_ID,
        url: absoluteUrl('/writing'),
        name: `${SITE_NAME} — Writing`,
        description: WRITING_DESCRIPTION,
        inLanguage: 'en',
        about: WRITING_TOPICS,
        author: personRef,
        publisher: personRef,
        isPartOf: websiteRef,
        blogPost: posts.map((post) => ({
          '@type': 'BlogPosting',
          '@id': `${absoluteUrl(`/writing/${post.slug}`)}#post`,
          url: absoluteUrl(`/writing/${post.slug}`),
          headline: post.title,
          description: post.description,
          datePublished: toIsoDate(post.date),
          author: personRef,
        })),
      },
      breadcrumbs([
        { name: SITE_NAME, path: '/' },
        { name: 'Writing', path: '/writing' },
      ]),
    ],
  };
}

export function postJsonLd(post: PostMeta) {
  const path = `/writing/${post.slug}`;
  const url = absoluteUrl(path);
  const published = toIsoDate(post.date);
  const author = {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE_NAME,
    url: SITE_URL,
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#post`,
        url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        headline: post.title,
        description: post.seoDescription ?? post.description,
        image: `${url}/opengraph-image`,
        datePublished: published,
        dateModified: toIsoDate(post.updated) ?? published,
        inLanguage: 'en',
        keywords: post.tags.length > 0 ? post.tags : undefined,
        timeRequired: `PT${post.readingMinutes}M`,
        author,
        publisher: author,
        isPartOf: {
          '@type': 'Blog',
          '@id': BLOG_ID,
          url: absoluteUrl('/writing'),
          name: `${SITE_NAME} — Writing`,
        },
      },
      breadcrumbs([
        { name: SITE_NAME, path: '/' },
        { name: 'Writing', path: '/writing' },
        { name: post.title, path },
      ]),
    ],
  };
}
