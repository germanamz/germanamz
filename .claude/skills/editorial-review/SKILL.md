---
name: editorial-review
description: Use when the user asks for editorial review, writing feedback, critique, or "is this ready to publish" on a blog post in content/posts/*.mdx, or when flipping a post's frontmatter from published:false to published:true
---

# Editorial Review

## Overview

Editorial-craft review for blog posts. Produces a **verdict-first, principle-driven** review that names what's working, what isn't, and *why* — so the writer fixes the post and learns the principle behind each fix.

This is **not** a grammar pass and **not** a literary-prose review. Reference style: essay editors at *The Atlantic*, Paul Graham essays.

The skill exists to do two things at once:
1. Improve posts before publish.
2. Build the writer's craft over time — feedback teaches principles, doesn't just hand out fixes.

## When to Use

Use when **either** is true:

- The user asks for review / feedback / critique / "is this ready to publish?" on a file in `content/posts/`.
- The user is flipping a post's frontmatter from `published: false` to `published: true`.

Do NOT use during raw drafting. Generative writing and critical review are different modes; running this skill mid-draft is harmful.

## Author scratchpad blocks (not in scope)

Drafts often contain author-side scratchpad blockquotes the writer left for themselves about what to write next. These are drafting aids, not copy that will ship. Treat them as out of scope for the review.

**How to detect one:** a blockquote whose first token is `Mental Note`, `TODO`, `Note to self`, `Draft note`, or whose content is plainly an instruction the writer wrote to themselves ("I want to talk about…", "remember to mention…"). When in doubt, ask the user before flagging.

**How to handle:**

- Do not flag the block itself as a paragraph-structure problem, voice slip, or "draft scaffold visible." It isn't part of the post.
- Do not raise Issues against a section whose body is *only* a scratchpad block. There's no copy there to critique yet. In particular, do not flag header–payoff coupling, specificity, or argument flow inside such a section.
- The **Ending / payoff** verdict still applies normally. If the post has no real ending yet, that is still ✗, but say in the verdict line that the second half is a known scratchpad and that fixing the landing *now* is what shapes the eventual draft.
- If the post is mostly scratchpad with little written copy, this skill isn't the right tool yet. Say so and stop, rather than reviewing the sketch.

**Anchoring inside a scratchpad:** the only acceptable reason to quote
*from* a scratchpad block is to surface a spelling typo in a header users
will skim, or to note an item for completeness inside an Issue 5-style
typo cluster. When you do, use the scratchpad anchor form:
`*(§N scratchpad — out of scope, <reason>)*` (or the dotted form
`*(§N.M scratchpad — ...)*` for scratchpads inside an H3). The `— out of
scope` clause is mandatory — it's how downstream tooling detects that the
anchor points into non-shipping copy. See `md_references.md` for the
full spec.

**Status-line convention:** when a post contains scratchpad blocks, the
review's status line notes them so a downstream reader (or tool) knows
the post isn't a finished draft, e.g. *"status: published:false
(mid-draft; the `> Mental Note:` blocks under §4 and §5 are author
scratchpad, out of scope for this pass)"*. The phrase `out of scope for
this pass` is the canonical signal.

## Output: Two-Pass Report

Save the review to `content/posts/<slug>.review.md` (gitignored — does not ship).

The report has exactly two passes, in this order. **Verdict always comes first.**

```markdown
# Review: <post title>
*Reviewed <date> · word count: <n>*

## Verdict

**Through-line (one sentence I'd write for this piece):** <state the thesis as you read it>

**Hook:** ✓ / ⚠ / ✗ — <1–2 sentences>
**Through-line:** ✓ / ⚠ / ✗ — <1–2 sentences>
**Ending / payoff:** ✓ / ⚠ / ✗ — <1–2 sentences>

**Verdict-level rewrite directions** (only for ⚠ / ✗):
- *Hook, option 1:* <direction>
- *Hook, option 2:* <direction>
- *Through-line, option 1:* …
  *(2–3 directions per failing verdict dimension)*

**One-line verdict:** <e.g., "structurally working — polish only" / "thesis not visible — global rewrite before line edits">

---

## Issues (prioritized)

### 1. <Dimension> — <short title>
> "<exact quote from the post>" *(<anchor>)*

**Principle:** <one-line principle from the rubric>
**What's wrong:** <1–2 sentences specific to this instance>
**Suggested rewrite** *(only for tier-2 judgment issues — flow / structure / voice / originality)*: <one concrete rewrite>

### 2. …
```

### Reference Anchors

Every quote in the review must be anchored to a location in the source `.mdx`
using the conventions in [`md_references.md`](./md_references.md). The
authoritative spec lives there; this section is a quick reference.

Anchors are wrapped in italicized parentheses: `*(<target>)*`. The target
is one of:

| Form                                     | Meaning                                                          |
|------------------------------------------|------------------------------------------------------------------|
| `¶N`                                     | Nth prose paragraph in the pre-section region (before any H2).  |
| `§N`                                     | Nth H2 section (also written `§N header`).                       |
| `§N ¶M`                                  | Mth prose paragraph inside the Nth H2 section.                   |
| `§N.M`                                   | Mth H3 inside the Nth H2 (dotted path; extends out to H6).       |
| `§N.M ¶K`                                | Kth prose paragraph inside that H3.                              |
| `§N header`                              | The H2 heading line itself (and analogously `§N.M header`).      |
| `§N, final sentence`                     | The last sentence of the Nth section's last addressable block.   |
| `§N, post-scratchpad`                    | First prose paragraph after a scratchpad block inside the scope. |
| `§N scratchpad — out of scope, <reason>` | A token inside a scratchpad blockquote; non-actionable.          |
| `¶A–¶B`                                  | Range of paragraphs (en-dash, U+2013).                           |

**Counting rules** (full spec in `md_references.md`):
- Frontmatter is skipped.
- Only H2 and deeper headings affect the path; H1 is ignored.
- Each heading increments its level's sibling counter and resets `¶ = 0`.
- Sibling indices reset per parent: two different H2s each get their own
  `.1`, `.2`, ... children.
- Scratchpad blockquotes (first token `Mental Note`, `TODO`, `Note to self`,
  `Draft note`) do not count as paragraphs and never increment `¶`.
- Two prose blocks separated only by a scratchpad block are consecutive `¶`.

## The Rubric (11 dimensions)

| # | Dimension | What to look for | Principle | Tier | Style |
|---|---|---|---|---|---|
| 1 | **Hook** | Does paragraph 1 give the reader a reason to keep reading? Specific, surprising, stake-raising? | An opening earns the next 30 seconds. Vague stage-setting loses the reader. | Verdict | C |
| 2 | **Through-line** | Can the piece's argument be stated in one sentence? Does every paragraph serve it? | If you can't write the thesis in one sentence, the reader can't find it. | Verdict | C |
| 3 | **Ending / payoff** | Does the piece land somewhere the reader couldn't have predicted from the opening? | The ending is the contract — the opening promised insight, the ending must deliver it. | Verdict | C |
| 4 | **Argument flow** | Does each paragraph advance the through-line, or does it loop, repeat, or wander? | Every paragraph should make the reader more convinced or more curious. If it doesn't, cut or move it. | Issues | B |
| 5 | **Specificity** | Vague subjects ("they", "people", "big tech"), unsupported claims, abstractions without examples | Concrete beats abstract. Name the actor, cite the source, or cut the claim. | Issues | A |
| 6 | **Paragraph structure** | One idea per paragraph; over-long paragraphs split; one-line paragraphs merged | Paragraph breaks are punctuation for thought. Each break = new beat. | Issues | B |
| 7 | **Header–payoff coupling** | When a section header poses a question or claim, does the paragraph immediately address it? | Headers are promises. Break the promise and the reader stops trusting you. | Issues | A |
| 8 | **Clarity** | Pronouns without antecedents; jargon not explained or cut; sentences requiring re-reading | If a sentence makes the reader work, the writer hasn't finished working. | Issues | A |
| 9 | **Voice consistency** | Drift between conversational and formal mid-piece; tonal whiplash | Pick a register and stay in it. Drift signals uncertainty about audience. | Issues | B |
| 10 | **Originality of take** | Conventional wisdom presented as insight; restating what the reader already believes | The reader's time is bought by giving them something they didn't already think. | Issues | B |
| 11 | **Style watch** | See list below. Extensible. | If a period, comma, or colon would carry the same load, use it. Em dashes signal hedging or stitched half-thoughts and now read as machine-generated. | Issues | A |

### Feedback Style Legend

- **A — Diagnose only.** Issue + principle. No rewrite. Used for mechanical issues (5, 7, 8, 11). Reader fixes it themselves to internalize the principle.
- **B — Diagnose + one suggested rewrite.** Used for judgment issues with one clearly better direction (4, 6, 9, 10).
- **C — Diagnose + 2–3 rewrite directions.** Used for verdict-tier dimensions (1, 2, 3) where the choice is structural.

### Style Watch List (extensible)

This list grows as the writer notices their own tells. To add a new entry, append to this section.

1. **Em dashes (`—`) used as connective tissue.** Default suspicion: high — em dashes are now an AI tell readers spot fast. Flag every instance unless the dash is doing work a comma/colon/period cannot.
   - *Example:* `"ultimately generative AI — which for the past ~3 years..."` → connective tissue, swap for a period or "that".

(Append future entries here as the writer identifies them.)

## Output Rules

- **Verdict comes first. Always.** The "is this piece working?" call must precede line edits, even under time pressure.
- **Verdict-tier dimensions (Hook, Through-line, Ending) appear in the Verdict pass ONLY.** Do not re-list them in Issues — that creates redundancy and dilutes the structural-vs-mechanical distinction. **This applies to substance, not just dimension name:** an Issue titled "Completeness", "Closure", "Resolution", "Opening", "Lede", or any other label is still a verdict-tier issue if the substance is about the post's beginning, argument-spine, or end. Move it to the Verdict pass.
- **Verdict-level rewrite directions are generated only for ⚠ / ✗.** No busywork on what's already working.
- **Mechanical issues (Style A) end at "What's wrong" — no rewrite given.** The writer fixes it. This is intentional; it's how learning happens.
- **Every issue quotes the post directly with a reference anchor.** Anchor every finding to specific text using the conventions in `md_references.md` (e.g. `*(¶1)*`, `*(§2 ¶3)*`, `*(§2.1 header)*`).
- **Issue count follows the post:**
  - Typical draft: top 5–10 issues.
  - Polished post: 2–3 flags is fine. **Never invent issues to fill a quota.**
  - Very rough draft: cap at 10 and note the rest exist.
- The skill must **prioritize, not exhaust**.

## Calibration: See `example-review.md`

Before producing a review, read `.claude/skills/editorial-review/example-review.md`. It is a complete worked review of `content/posts/add.mdx` and is the calibration model for tone, depth, and specificity.

## Anchor Spec: See `md_references.md`

The reference-anchor conventions used throughout reviews (paragraph numbering, dotted section paths for H2–H6, scratchpad anchors, ranges) are specified in `.claude/skills/editorial-review/md_references.md`. That file is the authoritative source — read it once if you're unsure how to address a location, and follow its grammar exactly so editor tooling can resolve anchors back to source-file positions.

## Common Mistakes

| Mistake | Why it's wrong | Fix |
|---|---|---|
| Skipping the verdict pass under time pressure | Line edits without a verdict produce polish on a piece that may not be working at all. | Always verdict first. Shorten the issues list if pressed for time, never skip the verdict. |
| Inventing issues to hit "5–10" | Quota-filling makes the writer fix non-issues and erodes trust in the review. | Honor the actual quality of the post. Polished posts get 2–3 flags. |
| Wholesale rewrite for mechanical issues | Removes the learning. Writer ships the post but doesn't internalize the principle. | Style A means principle-only. No rewrite. Resist requests to "just rewrite it." |
| Listing every issue exhaustively | Reader can't act on 30 flags. Top-N forces prioritization. | Pick highest-impact issues. Note that more exist if needed. |
| Generic feedback ("this is unclear") | Doesn't teach. Writer can't generalize from it. | Always state the principle from the rubric. |
| Failing to quote the post | Writer can't find the spot. Feedback becomes abstract. | Every issue gets a `> "quote" *(<anchor>)*` line using `md_references.md` conventions. |
| Using ad-hoc anchor formats (`(P3)`, `(section 2 paragraph 3)`, page numbers) | Anchors are machine-readable so the writer's editor can jump to the location. Non-spec anchors break that. | Use the `md_references.md` forms: `*(¶N)*`, `*(§N ¶M)*`, `*(§N.M ¶K)*`, etc. |
| Re-listing Hook/Through-line/Ending in Issues | Doubles the work, dilutes the structural-vs-mechanical distinction, and sends the writer two conflicting sets of directions for the same problem. | After writing the Verdict pass, scan the Issues list and remove any item whose dimension is Hook, Through-line, or Ending. Verdict pass already covers it with rewrite directions. |

## Red Flags — STOP and re-check

If you find yourself thinking any of these while producing a review, stop and re-read the rubric:

- "I'll skip the verdict — the piece is short, it's fine."
- "Just this once I'll rewrite a Style-A issue, it's faster."
- "I should add a few more issues to make this feel thorough."
- "The user said 'quick pass' — I'll just give bullets."
- "Em dashes are stylistic preference, I'll let it slide."
- "I don't need to quote the post, the user wrote it."
- "The ending is broken, I'll put it in Issues so the writer has a concrete action item." ← NO. The Verdict pass already gives 2–3 rewrite directions for any ✗ dimension. Adding it to Issues creates duplicate, conflicting instructions.
- "I'll rename the dimension to 'Completeness' / 'Closure' / 'Lede' / 'Opening' so it's not technically a verdict-tier item." ← NO. The rule is about substance. If the issue is about the post's beginning, argument-spine, or end, it belongs in the Verdict pass regardless of label.
- "I'll flag the `> Mental Note: …` block as a draft scaffold left in the post." ← NO. Scratchpad blockquotes (Mental Note / TODO / Note to self) are author drafting aids, not copy. They're out of scope. See *Author scratchpad blocks (not in scope)*.

**Before finalizing the Issues list, run this scan:** for every Issue, ask "is this issue about the hook/opening, the central argument, or the ending/landing of the post?" If yes for any of them, that issue belongs in the Verdict pass — delete it from Issues.

All of these mean: re-read the rubric and produce the report as specified.
