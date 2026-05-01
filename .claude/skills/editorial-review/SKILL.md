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
> "<exact quote from the post>" *(¶N)*

**Principle:** <one-line principle from the rubric>
**What's wrong:** <1–2 sentences specific to this instance>
**Suggested rewrite** *(only for tier-2 judgment issues — flow / structure / voice / originality)*: <one concrete rewrite>

### 2. …
```

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
- **Verdict-tier dimensions (Hook, Through-line, Ending) appear in the Verdict pass ONLY.** Do not re-list them in Issues — that creates redundancy and dilutes the structural-vs-mechanical distinction.
- **Verdict-level rewrite directions are generated only for ⚠ / ✗.** No busywork on what's already working.
- **Mechanical issues (Style A) end at "What's wrong" — no rewrite given.** The writer fixes it. This is intentional; it's how learning happens.
- **Every issue quotes the post directly with a paragraph marker.** Anchor every finding to specific text.
- **Issue count follows the post:**
  - Typical draft: top 5–10 issues.
  - Polished post: 2–3 flags is fine. **Never invent issues to fill a quota.**
  - Very rough draft: cap at 10 and note the rest exist.
- The skill must **prioritize, not exhaust**.

## Calibration: See `example-review.md`

Before producing a review, read `.claude/skills/editorial-review/example-review.md`. It is a complete worked review of `content/posts/add.mdx` and is the calibration model for tone, depth, and specificity.

## Common Mistakes

| Mistake | Why it's wrong | Fix |
|---|---|---|
| Skipping the verdict pass under time pressure | Line edits without a verdict produce polish on a piece that may not be working at all. | Always verdict first. Shorten the issues list if pressed for time, never skip the verdict. |
| Inventing issues to hit "5–10" | Quota-filling makes the writer fix non-issues and erodes trust in the review. | Honor the actual quality of the post. Polished posts get 2–3 flags. |
| Wholesale rewrite for mechanical issues | Removes the learning. Writer ships the post but doesn't internalize the principle. | Style A means principle-only. No rewrite. Resist requests to "just rewrite it." |
| Listing every issue exhaustively | Reader can't act on 30 flags. Top-N forces prioritization. | Pick highest-impact issues. Note that more exist if needed. |
| Generic feedback ("this is unclear") | Doesn't teach. Writer can't generalize from it. | Always state the principle from the rubric. |
| Failing to quote the post | Writer can't find the spot. Feedback becomes abstract. | Every issue gets a `> "quote" (¶N)` line. |

## Red Flags — STOP and re-check

If you find yourself thinking any of these while producing a review, stop and re-read the rubric:

- "I'll skip the verdict — the piece is short, it's fine."
- "Just this once I'll rewrite a Style-A issue, it's faster."
- "I should add a few more issues to make this feel thorough."
- "The user said 'quick pass' — I'll just give bullets."
- "Em dashes are stylistic preference, I'll let it slide."
- "I don't need to quote the post, the user wrote it."

All of these mean: re-read the rubric and produce the report as specified.
