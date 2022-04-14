const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
const rem = (px) => `${round(px / 16)}rem`
const em = (px, base) => `${round(px / base)}em`

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          xs: {
            css: [
              {
                fontSize: rem(12),
                lineHeight: round(24 / 12),
                p: {
                  marginTop: em(16, 12),
                  marginBottom: em(16, 12),
                },
                '[class~="lead"]': {
                  fontSize: em(16, 12),
                  lineHeight: round(28 / 16),
                  marginTop: em(16, 16),
                  marginBottom: em(16, 16),
                },
                blockquote: {
                  marginTop: em(24, 16),
                  marginBottom: em(24, 16),
                  paddingLeft: em(20, 16),
                },
                h1: {
                  fontSize: em(30, 12),
                  marginTop: '0',
                  marginBottom: em(24, 30),
                  lineHeight: round(36 / 30),
                },
                h2: {
                  fontSize: em(20, 12),
                  marginTop: em(32, 20),
                  marginBottom: em(16, 20),
                  lineHeight: round(28 / 20),
                },
                h3: {
                  fontSize: em(16, 12),
                  marginTop: em(28, 16),
                  marginBottom: em(8, 16),
                  lineHeight: round(28 / 16),
                },
                h4: {
                  marginTop: em(20, 12),
                  marginBottom: em(8, 12),
                  lineHeight: round(20 / 12),
                },
                img: {
                  marginTop: em(24, 12),
                  marginBottom: em(24, 12),
                },
                video: {
                  marginTop: em(24, 12),
                  marginBottom: em(24, 12),
                },
                figure: {
                  marginTop: em(24, 12),
                  marginBottom: em(24, 12),
                },
                'figure > *': {
                  marginTop: '0',
                  marginBottom: '0',
                },
                figcaption: {
                  fontSize: em(12, 12),
                  lineHeight: round(16 / 12),
                  marginTop: em(8, 12),
                },
                code: {
                  fontSize: em(12, 12),
                },
                'h2 code': {
                  fontSize: em(16, 20),
                },
                'h3 code': {
                  fontSize: em(16, 16),
                },
                pre: {
                  fontSize: em(12, 12),
                  lineHeight: round(20 / 12),
                  marginTop: em(20, 12),
                  marginBottom: em(20, 12),
                  borderRadius: rem(4),
                  paddingTop: em(8, 12),
                  paddingRight: em(12, 12),
                  paddingBottom: em(8, 12),
                  paddingLeft: em(12, 12),
                },
                ol: {
                  marginTop: em(16, 12),
                  marginBottom: em(16, 12),
                  paddingLeft: em(22, 12),
                },
                ul: {
                  marginTop: em(16, 12),
                  marginBottom: em(16, 12),
                  paddingLeft: em(22, 12),
                },
                li: {
                  marginTop: em(4, 12),
                  marginBottom: em(4, 12),
                },
                'ol > li': {
                  paddingLeft: em(6, 12),
                },
                'ul > li': {
                  paddingLeft: em(6, 12),
                },
                '> ul > li p': {
                  marginTop: em(8, 12),
                  marginBottom: em(8, 12),
                },
                '> ul > li > *:first-child': {
                  marginTop: em(16, 12),
                },
                '> ul > li > *:last-child': {
                  marginBottom: em(16, 12),
                },
                '> ol > li > *:first-child': {
                  marginTop: em(16, 12),
                },
                '> ol > li > *:last-child': {
                  marginBottom: em(16, 12),
                },
                'ul ul, ul ol, ol ul, ol ol': {
                  marginTop: em(8, 12),
                  marginBottom: em(8, 12),
                },
                hr: {
                  marginTop: em(40, 12),
                  marginBottom: em(40, 12),
                },
                'hr + *': {
                  marginTop: '0',
                },
                'h2 + *': {
                  marginTop: '0',
                },
                'h3 + *': {
                  marginTop: '0',
                },
                'h4 + *': {
                  marginTop: '0',
                },
                table: {
                  fontSize: em(12, 12),
                  lineHeight: round(16 / 12),
                },
                'thead th': {
                  paddingRight: em(12, 12),
                  paddingBottom: em(8, 12),
                  paddingLeft: em(12, 12),
                },
                'thead th:first-child': {
                  paddingLeft: '0',
                },
                'thead th:last-child': {
                  paddingRight: '0',
                },
                'tbody td, tfoot td': {
                  paddingTop: em(8, 12),
                  paddingRight: em(12, 12),
                  paddingBottom: em(8, 12),
                  paddingLeft: em(12, 12),
                },
                'tbody td:first-child, tfoot td:first-child': {
                  paddingLeft: '0',
                },
                'tbody td:last-child, tfoot td:last-child': {
                  paddingRight: '0',
                },
              },
              {
                '> :first-child': {
                  marginTop: '0',
                },
                '> :last-child': {
                  marginBottom: '0',
                },
              },
            ],
          },
        },
      }),
      fontFamily: {
        mono: ['"Roboto Mono"', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      'wireframe',
    ],
  },
};
