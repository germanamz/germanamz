import { ImageResponse } from 'next/og';
import { OG_IMAGE_SIZE, SITE_NAME, SITE_URL } from './site';

const BRAND_GREEN = '#37a900';

type OgImageInput = {
  /** Small label above the title, e.g. "Writing". */
  eyebrow?: string;
  title: string;
  /** Supporting line under the title. */
  subtitle?: string;
};

// Shared 1200×630 social card, used by the site-wide and per-post
// `opengraph-image` routes. Satori (behind ImageResponse) only supports
// flexbox, so every element with more than one child sets `display: flex`.
export function renderOgImage({ eyebrow, title, subtitle }: OgImageInput) {
  // Long post titles step down so they stay within three lines.
  const titleSize = title.length > 70 ? 56 : title.length > 40 ? 68 : 84;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          backgroundColor: '#ffffff',
          borderLeft: `20px solid ${BRAND_GREEN}`,
          color: '#101828',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 44,
            letterSpacing: -1,
            color: BRAND_GREEN,
          }}
        >
          GM
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {eyebrow ? (
            <div
              style={{
                display: 'flex',
                marginBottom: 20,
                fontSize: 28,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: '#6a7282',
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          {/* `display: block` + lineClamp truncates with an ellipsis, so an
              unusually long title or description can't run into the footer. */}
          <div
            style={{
              display: 'block',
              lineClamp: 3,
              fontSize: titleSize,
              lineHeight: 1.12,
              letterSpacing: -2,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                display: 'block',
                lineClamp: 2,
                marginTop: 28,
                fontSize: 32,
                lineHeight: 1.35,
                color: '#4a5565',
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 28,
            color: '#6a7282',
          }}
        >
          <div style={{ display: 'flex' }}>{SITE_NAME}</div>
          <div style={{ display: 'flex' }}>{new URL(SITE_URL).host}</div>
        </div>
      </div>
    ),
    OG_IMAGE_SIZE,
  );
}
