// Renders a schema.org JSON-LD block. `<` is escaped so a value containing
// `</script>` (e.g. from post frontmatter) can't close the tag early.
export const JsonLd = ({ data }: { data: Record<string, unknown> }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, '\\u003c'),
    }}
  />
);
