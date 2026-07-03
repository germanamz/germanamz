// Marks an unpublished (draft) post. Drafts only ever render in dev/preview —
// production filters them out in `getAllPosts`/`getPostBySlug` — so this badge
// never appears on the live site; it's purely an authoring aid.
export const DraftBadge = () => (
  <span className="badge badge-warning badge-sm uppercase tracking-wide">
    Draft
  </span>
);
