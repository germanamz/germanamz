# Reference Anchors in Editorial Reviews

This document specifies the conventions used to reference parts of a source post
from inside an editorial review (`content/posts/<slug>.review.md`). The intent
is to make the review file machine-parseable so editor tooling (e.g. an nvim
plugin) can jump from an anchor in the review to the corresponding location in
the source `.mdx` file.

The review file references the source post; the source post is never modified
by the review.

---

## Anchor Grammar

All anchors are wrapped in italicized parentheses: `*(...)*`. They appear
either inline at the end of a sentence, or on the line immediately following a
blockquote.

```ebnf
anchor       = "*(" target ")*"
target       = paragraph
             | section
             | section " " paragraph
             | section " header"
             | section ", " specifier
             | section " scratchpad — out of scope" [ ", " reason ]
             | range
specifier    = "final sentence" | "post-scratchpad" | <free-form>
reason       = <free-form prose>
range        = paragraph "–" paragraph     ; en-dash, not hyphen
paragraph    = "¶" integer
section      = "§" integer { "." integer }     ; dotted path: H2, H2.H3, H2.H3.H4, ...
```

The `section` token is a **dotted path** through the heading hierarchy. The
first integer indexes the H2, the second the H3 inside that H2, the third
the H4 inside that H3, and so on. Depth equals the heading level minus 1
(so H2 → 1 component, H3 → 2 components, H6 → 5 components).

Examples:

| Anchor          | Refers to                                                    |
|-----------------|--------------------------------------------------------------|
| `*(¶1)*`        | The first body paragraph of the post (top-level).            |
| `*(¶1–¶3)*`     | A range of body paragraphs.                                  |
| `*(§2)*`        | The entire 2nd `## ` section.                                |
| `*(§2 ¶2)*`     | The 2nd paragraph inside the 2nd `## ` section.              |
| `*(§3 header)*` | The text of the 3rd `## ` heading itself.                    |
| `*(§3, final sentence)*` | The last sentence of the 3rd section.               |
| `*(§3, post-scratchpad)*` | The first prose paragraph after a scratchpad block in §3. |
| `*(§4 scratchpad — out of scope, noted only for completeness)*` | A token inside the scratchpad block in §4; tooling should mark it non-actionable. |
| `*(§2.1)*`      | The 1st H3 subsection inside the 2nd H2 section.             |
| `*(§2.1 ¶3)*`   | The 3rd paragraph inside the 1st H3 of §2.                   |
| `*(§2.1 header)*` | The text of the 1st H3 heading inside §2.                  |
| `*(§2.1.1 ¶1)*` | The 1st paragraph inside the 1st H4 of the 1st H3 of §2.     |

---

## Counting Rules

These rules describe **how to walk a source `.mdx` file** and assign each
prose block a coordinate `(§, ¶)` that matches the anchors used in a review.
The rules are deterministic — given the same `.mdx` file, every parser
should produce the same coordinates without needing any context from the
review or any AI.

### Top-Level Algorithm

Walk the `.mdx` file line by line, tracking a **heading-path stack** and a
**paragraph counter**:

- `path` — an ordered list of integers representing the current heading
  path, e.g. `[2, 1]` means "the 1st H3 inside the 2nd H2". Starts empty.
- `paragraph` — the number of prose blocks seen *in the current heading
  scope* (i.e. since the last heading of any addressable level). Starts at
  `0`. Resets to `0` every time a heading is entered.
- `counters[depth][parent_path]` — a sibling counter used to assign the
  index for each heading. For each depth `d` and each path-prefix at depth
  `d-1`, this counter tracks how many headings of depth `d` have been seen
  under that prefix so far. (In practice a single nested dict keyed by
  parent path will do.)

Algorithm:

1. **Frontmatter.** If the first non-empty line is `---`, skip every line up
   to and including the next line that is exactly `---`. Frontmatter never
   counts toward `§` or `¶`.

2. **Body scan.** For each remaining line, classify it (see *Line Classes*
   below) and act:

   - **H1 heading** (`# `): ignored entirely. Does not change `path`,
     `paragraph`, or any counter. (Title comes from frontmatter.)
   - **Heading at level L ∈ {2..6}** (`## ` through `###### `):
     - Compute `depth = L - 1` (so H2 → depth 1, H3 → depth 2, ..., H6 →
       depth 5).
     - Truncate `path` to the first `depth - 1` entries. (Discards any
       deeper-nested scope we were inside.)
     - Look up `counters[depth][tuple(path)]`, increment it, and append
       the new value to `path`.
     - Reset `paragraph` to `0`.
     - The heading's coordinate is `§<path joined by '.'> header`.
   - **Blank line**: ends the current paragraph block (if any). Doesn't
     itself count.
   - **Scratchpad blockquote** (see *Scratchpad Blocks* section below): the
     entire blockquote is skipped for counting. Does not increment
     `paragraph`.
   - **Prose block** (anything else; see *What Counts as a Prose Block*):
     when the block *starts*, increment `paragraph`. The block's coordinate
     is `§<path joined by '.'> ¶<paragraph>` if `path` is non-empty, else
     bare `¶<paragraph>`.

3. **End of file.** Stop. The full set of `(path, paragraph)` coordinates
   produced is the addressable surface of the file.

### Line Classes

For an unambiguous parse, every line in the body falls into exactly one
class. Classification is based on the *raw line*, not on any rendered HTML.

| Class                 | Trigger                                                    | Counting effect          |
|-----------------------|------------------------------------------------------------|--------------------------|
| Frontmatter delimiter | Line is exactly `---` and we're in the frontmatter region  | Skipped                  |
| Frontmatter content   | Inside frontmatter region                                  | Skipped                  |
| H1 heading            | Line matches `^# ` (one hash + space)                      | Ignored entirely         |
| H2 heading            | Line matches `^## `                                        | Truncate `path` to length 0, push new H2 index, `¶ = 0` |
| H3 heading            | Line matches `^### `                                       | Truncate `path` to length 1, push new H3 index, `¶ = 0` |
| H4 heading            | Line matches `^#### `                                      | Truncate `path` to length 2, push new H4 index, `¶ = 0` |
| H5 heading            | Line matches `^##### `                                     | Truncate `path` to length 3, push new H5 index, `¶ = 0` |
| H6 heading            | Line matches `^###### `                                    | Truncate `path` to length 4, push new H6 index, `¶ = 0` |
| Blank line            | Line contains only whitespace                              | Ends current block       |
| Scratchpad blockquote | A blockquote whose first non-whitespace token is `Mental Note`, `TODO`, `Note to self`, or `Draft note` (see scratchpad rules) | Skipped entirely |
| Prose block start     | First non-blank, non-heading, non-scratchpad line after a blank line or after a heading | `¶ += 1` |
| Prose block continuation | Subsequent non-blank lines in the same block            | No change                |

### What Counts as a Prose Block

A prose block is any sequence of consecutive non-blank lines that is **not**
a heading and **not** a scratchpad blockquote. The boundary is always a
blank line (or a heading, or end of file).

A prose block counts as one `¶`, regardless of what's inside it. That
explicitly includes:

- **Soft-wrapped prose.** Multiple physical lines that form one logical
  paragraph (the common case for body text wrapped at ~80 columns).
- **Lists.** A list (bulleted or numbered) introduced without a preceding
  blank line, or following a paragraph as a continuation, counts as part of
  whatever paragraph it belongs to. A list separated by blank lines on both
  sides counts as its own `¶`.
- **Code fences.** A fenced code block (```` ``` ````) is one `¶`. The
  paragraph counter ticks when the opening fence is seen; the closing fence
  ends the block.
- **Non-scratchpad blockquotes.** A blockquote that doesn't match the
  scratchpad first-token rule is a prose block and counts as one `¶`.
- **MDX components / JSX.** A `<Component>...</Component>` block at the
  top level is one `¶`. If the component contains inner prose paragraphs
  inside MDX context, those inner paragraphs are *not* separately counted —
  the whole component is one `¶`.

Conversely, none of these count as `¶`:

- Headings of any level.
- Frontmatter.
- Scratchpad blockquotes.
- HTML comments (`<!-- ... -->`) that appear on their own line(s).
- Blank lines and lines containing only whitespace.

### Heading Path Rules (`§N`, `§N.M`, `§N.M.K`, ...)

- A heading at level **L** (where `L ∈ {2..6}`) contributes the `(L-1)`-th
  component of the dotted path. H2 fills component 1, H3 fills component 2,
  etc. So `§2` is "the 2nd H2", `§2.1` is "the 1st H3 inside §2", `§2.1.3`
  is "the 3rd H4 inside the 1st H3 of §2", and so on out to H6.
- **H1 is ignored** — the document title comes from frontmatter; if an H1
  appears in the body it does not change `path` or `¶`.
- **Sibling counting is per-parent.** The index at each depth resets every
  time you enter a new parent at the level above. Two different H3s under
  two different H2s both start at `.1`. Concretely: if you have
  `## A` (= §1), `### A.1` (= §1.1), `## B` (= §2), `### B.1` (= §2.1),
  the first H3 under §2 is `.1`, *not* `.2`.
- **Returning to a shallower level resets deeper counters.** When you exit
  an H3 by entering a new H2 (or by reaching EOF), the H3 counter for the
  *next* H2 you enter starts fresh at `.1`.
- **Level-skipping is allowed but discouraged.** If a doc jumps from H2
  straight to H4 (no H3 between), the H4's coordinate uses its actual
  depth: H4 → `§N..K`. Empty path components are written as nothing
  between dots, e.g. `§2..1` for "1st H4 under §2 with no H3 layer".
  (Parsers should treat the empty component as index `0`, addressable but
  unusual; in practice well-formed posts won't hit this.)
- **Pre-heading region.** Any prose block before the first H2 has no `§`
  prefix. Address it with bare `¶N`. Paragraphs in this region are numbered
  starting at `¶1` and reset to `0` when the first H2 is entered.

### Paragraph Rules (`¶N`)

- `¶N` indexes the Nth prose block within **the current heading scope**,
  counting from 1.
- The "current heading scope" is whatever heading was most recently entered
  at *any* addressable level (H2–H6). Crossing a heading of any level
  resets `¶` to `0`.
- Numbering is local: `§1 ¶3`, `§2 ¶3`, and `§2.1 ¶3` are three different
  paragraphs, each the 3rd within its own scope.
- Headings, scratchpad blocks, and HTML comments do not interrupt the
  count — they are simply absent from it. Two prose blocks separated only
  by a scratchpad block are still consecutive (`¶3` then `¶4`).
- A prose block that appears between an H2 and that H2's first child H3
  belongs to the H2's scope (e.g. `§2 ¶1`). A prose block appearing after
  the H3 belongs to the H3's scope (`§2.1 ¶1`), **not** to the H2's
  scope.

### Ranges

- Ranges use an en-dash (`–`, U+2013), not a hyphen or em-dash.
- `*(¶1–¶3)*` means paragraphs 1, 2, and 3 inclusive.
- Ranges across sections are not supported in this convention; if needed,
  list the sections explicitly.

### Specifiers

The free-form specifier slot (`*(§N, <specifier>)*`) is used for sub-paragraph
locations the integer scheme can't address. Recognized specifiers:

- `final sentence` — the last sentence of the section or paragraph indicated.
  Sentence boundary is the *last* `. `, `! `, or `? ` in the prose block,
  or the end of the block.
- `post-scratchpad` — the first prose paragraph appearing after a scratchpad
  blockquote inside the named section.
- `header` — the H2 heading text of the named section.

Specifiers are advisory; tooling can treat unknown specifiers as a fallback to
jumping to the section start.

---

## Worked Example

The following `.mdx` is annotated with the coordinates every line resolves
to. Lines marked `—` do not contribute to `§` or `¶`.

```
                                                          coord
─────────────────────────────────────────────────────────────────
---                                                       —     (frontmatter open)
title: 'Example post'                                     —
date: '2026-05-16'                                        —
published: false                                          —
---                                                       —     (frontmatter close)
                                                          —     (blank)
First body paragraph, wrapped over                        ¶1
two physical lines.                                       ¶1
                                                          —
A second body paragraph before any                        ¶2
H2 heading.                                               ¶2
                                                          —
## But why X?                                             §1 header
                                                          —
First paragraph inside §1, before any                     §1 ¶1
H3.                                                       §1 ¶1
                                                          —
### A subhead                                             §1.1 header
                                                          —
First paragraph under the H3.                             §1.1 ¶1
                                                          —
Second paragraph under the H3, which                      §1.1 ¶2
spans two lines.                                          §1.1 ¶2
                                                          —
> Mental Note: remember to add an example here            —     (scratchpad, skipped)
> about the dot-com era.                                  —
                                                          —
Third paragraph under §1.1, written                       §1.1 ¶3
after the scratchpad. Addressable as
either `§1.1 ¶3` or `§1.1, post-scratchpad`.              §1.1 ¶3
                                                          —
### Another subhead                                       §1.2 header
                                                          —
First paragraph under the second H3.                      §1.2 ¶1
                                                          —
## How can you catch up?                                  §2 header
                                                          —
First paragraph in §2.                                    §2 ¶1
                                                          —
### A subhead in §2                                       §2.1 header
                                                          —
First paragraph here — note the index                     §2.1 ¶1
reset; this is `§2.1`, not `§1.3`.                        §2.1 ¶1
                                                          —
> Mental Note: outline only, not                          —     (scratchpad)
> written yet.                                            —
```

Resulting addressable coordinates:

- Pre-section region: `¶1`, `¶2`.
- `§1 header`, `§1 ¶1`.
- `§1.1 header`, `§1.1 ¶1`, `§1.1 ¶2`, `§1.1 ¶3` (also reachable as
  `§1.1, post-scratchpad`).
- `§1.2 header`, `§1.2 ¶1`.
- `§2 header`, `§2 ¶1`.
- `§2.1 header`, `§2.1` has only a scratchpad after its first paragraph;
  `§2.1 ¶1` is the only `¶` coordinate inside it.

Notice that:

- Entering `§1.1` reset `¶` to `0`, so the first paragraph after `### A
  subhead` is `§1.1 ¶1`, not `§1 ¶2`.
- Entering `§1.2` reset `¶` again. Two paragraphs under `§1.1` and one
  under `§1.2` is the right count — they're in different scopes.
- Entering `§2` truncated `path` to length 0 first, then pushed the new H2
  index — so `§1.1` is no longer "current" once we're past `## How can you
  catch up?`.
- The H3 under §2 starts at `§2.1`, not at `§1.3` — sibling indices reset
  per parent.

### Worst-Case Edge Cases

| Source pattern                                         | Resolves to                |
|--------------------------------------------------------|----------------------------|
| Blank line between two prose lines                     | Two paragraphs (`¶N`, `¶N+1`) |
| Two H2 headings with no body between them              | `§N header`, `§N+1 header`; `§N` has zero paragraphs |
| Heading deeper than H2 (`### Subhead`)                 | Opens a new heading scope; `¶` resets to `0`; coordinate gets one more dotted component (`§N.M`, `§N.M.K`, ...). Prose under the H3 belongs to the H3's scope, not the H2's. |
| H1 inside the body (`# Title`)                         | Ignored; does not change `path` or `¶`. Title belongs in frontmatter. |
| Level-skipping headings (H2 then H4 with no H3)        | The H4's coordinate uses its real depth: `§N..K`. The empty middle component is index `0`; well-formed posts shouldn't produce this. |
| H3 inside `§N` with a prose paragraph between H2 and H3 | That paragraph is `§N ¶1`. The first paragraph under the H3 is `§N.1 ¶1` — they are different scopes. |
| Two adjacent H3s under one H2 with no prose between    | `§N.1 header`, `§N.2 header`; both have zero `¶` coordinates until prose appears under one of them. |
| Code fence opened but never closed (malformed)         | Treated as one paragraph from the opening fence to end of file |
| HTML comment between two paragraphs (`<!-- ... -->`)   | Treated like a blank line for counting purposes |
| Scratchpad blockquote with mixed `> Mental Note:` and prose continuation lines | Entire blockquote skipped; the next prose block after the blockquote increments `¶` |
| Paragraph that visually contains a list (no blank line before list) | Single `¶` covering both intro line and list items |
| Bare list after a blank line (no preceding intro)      | The list is its own `¶`     |

---

## Quote Blocks

Every Issue in an editorial review anchors to the source post with a Markdown
blockquote of the exact quoted text, immediately followed by the anchor on the
same line:

```markdown
> "Information access is the biggest bottleneck for R&D, entire years get invested into gathering information during research and after into development." *(§2 ¶1)*
```

Or, for longer or multi-line quotes, the anchor goes on the line after the
blockquote:

```markdown
> "What we all seem to be misunderstanding is that models learn from past
> human behavior and have no short term memory..." *(§3 ¶1)*
```

Rules:

- The quoted text must appear verbatim in the source post (modulo whitespace
  collapse across soft-wraps). Tooling can use the quote as a confirmation
  match after jumping to the `¶/§` location.
- A single Issue may quote multiple anchors (e.g. when comparing two
  paragraphs). In that case, list each quote+anchor as its own blockquote.

---

## Verdict-Pass Markers

The Verdict pass uses three status markers, always immediately after the
dimension name and a bold colon:

| Marker | Meaning                                                                |
|--------|------------------------------------------------------------------------|
| `✓`    | Working as-is. No rewrite directions generated.                        |
| `⚠`    | Has problems but the structural shape is recoverable. Rewrite directions given. |
| `✗`    | Broken or missing. Rewrite directions given.                           |

Markers are U+2713 (`✓`), U+26A0 (`⚠`), U+2717 (`✗`).

---

## Issue Headings

Issues are H3 (`### `) and follow a fixed format:

```
### N. <Dimension> — <short title>
```

Where:
- `N` is a 1-based ordinal across the Issues list.
- `<Dimension>` is one of the 11 rubric dimensions (see `SKILL.md`).
- `—` is an em-dash (U+2014).
- `<short title>` is a phrase, not a sentence; no terminal punctuation.

The body of every Issue contains in order:

1. One or more `> "quote" *(anchor)*` blocks.
2. `**Principle:** ...` line.
3. `**What's wrong:** ...` line.
4. (Style B and C only) `**Suggested rewrite:** ...` or
   `**Suggested rewrite** *(only for tier-2 judgment issues — flow / structure / voice / originality)*: ...`.

---

## Scratchpad Blocks and Out-of-Scope Anchors

Draft posts often contain author-side scratchpad blockquotes that the writer
left for themselves while drafting. These are drafting aids, not copy that
will ship, and the editorial-review skill treats them as out of scope. The
anchor conventions below let tooling reflect that distinction (e.g. dim the
target, suppress it from jump-to-issue navigation, or render it differently).

### Detecting a Scratchpad Block

A blockquote is a scratchpad block if either is true:

1. **First-token rule.** The first non-whitespace token after the opening `>`
   is one of: `Mental Note`, `TODO`, `Note to self`, `Draft note`. Tokens are
   case-sensitive. Match is anchored to the start of the blockquote, not
   anywhere inside it.

   ```markdown
   > Mental Note: I want to add a note about the projects I'm working on
   > to mitigate this like tusk and superhuman
   ```

2. **Intent rule.** The blockquote's content is plainly an instruction the
   writer wrote to themselves ("I want to talk about…", "remember to
   mention…", "not a tutorial but rather a suggestion of how…"). Tooling
   should treat the first-token rule as authoritative and only fall back to
   the intent rule when explicitly opted in — the intent rule requires
   judgment and is meant for the reviewer, not the parser.

### Paragraph-Count Effect

Scratchpad blocks **do not** count as paragraphs. They are skipped when
resolving `¶N` and `§N ¶M` anchors, the same way headings are skipped. A
section whose body is *only* a scratchpad block has zero paragraphs and
cannot be addressed with `§N ¶M` — only `§N header` and `§N scratchpad`
anchors are valid for it.

### Anchoring to Content Inside a Scratchpad

When the review must reference a token inside a scratchpad block (typo
clusters that include scratchpad-resident typos are the typical case), use
the scratchpad anchor form:

```
*(§N scratchpad — out of scope, <free-form reason>)*
```

Examples used in real reviews:

```markdown
> "reacher context" *(§3 scratchpad — out of scope, noted only for completeness)*
> "ultimatly"       *(§3 scratchpad — out of scope, noted only for completeness)*
> "sugestion"       *(§4 scratchpad — out of scope, noted only because it's in a header users will skim)*
```

Anchor grammar:

```ebnf
scratchpad-anchor = "*(" section " scratchpad" " — out of scope" [ ", " reason ] ")*"
section           = "§" integer { "." integer }     ; same dotted form as elsewhere
reason            = <free-form prose>
```

The scope identified by `section` can be at any heading depth — a
scratchpad block can live under an H2 (`§3 scratchpad — ...`), an H3
(`§2.1 scratchpad — ...`), or deeper.

Rules:

- The `— out of scope` clause is mandatory. Its presence is how tooling
  detects that the anchor points into a scratchpad rather than into prose.
- The free-form `reason` is optional but recommended; it tells the reader
  *why* the scratchpad item was worth surfacing despite being out of scope.
- Scratchpad anchors **only** appear inside Issue 5-style typo clusters or
  occasionally inside the verdict's notes about an unwritten landing.
  Outside those contexts, scratchpad blocks are never quoted and never
  flagged as paragraph-structure or voice issues.

### Post-Scratchpad Anchor

When a prose paragraph follows a scratchpad block inside the same section
and needs to be referenced, use the `post-scratchpad` specifier:

```
*(§N, post-scratchpad)*
```

This resolves to the first prose paragraph appearing after a scratchpad
blockquote inside section `N`. It's necessary because `§N ¶M` numbering
already skips scratchpad blocks, so a sentence like "the paragraph right
after the Mental Note" can't be addressed with `¶M` alone without the
reader recounting from the section start.

Example:

```markdown
> "Modern models like Claude, Gemini, ChatGPT…" *(§3, post-scratchpad)*
```

### Status-Line Convention

When a post contains scratchpad blocks, the review's status line notes
them so a downstream reader (or tool) doesn't treat the post as a
finished draft:

```
*Reviewed YYYY-MM-DD · word count: ~N · status: published:false (mid-draft;
the `> Mental Note:` blocks under §4 and §5 are author scratchpad, out of
scope for this pass)*
```

The phrase `out of scope for this pass` is the canonical signal. Tooling
parsing review headers can use this phrase to decide whether to enable
scratchpad-aware rendering for the rest of the file.

### Verdict Interaction

The Ending / payoff verdict still applies even when the would-be landing
is scratchpad. The review marks it `✗` and the verdict line should call
out the scratchpad status explicitly — e.g. *"§4 and §5 are scratchpad;
the landing is unwritten, not broken."* That distinction tells the writer
the next action is *draft the close*, not *rewrite the close*.

---

## Summary for Tooling

To resolve any anchor to a source-file location:

1. Open the source post indicated by the review filename:
   `content/posts/<slug>.review.md` → `content/posts/<slug>.mdx`.
2. Skip the YAML frontmatter.
3. Run the *Top-Level Algorithm* above against the body, building a map
   from each coordinate (`(path, paragraph)` or `(path, "header")`) to its
   starting line number. Stop only when EOF is reached or you've passed
   the target.

Per-anchor-shape resolution against that map:

- **`*(¶N)*`** (no `§`): look up coordinate `((), N)` — paragraph `N` in
  the pre-section region.
- **`*(§N)*` / `*(§N.M)*` / `*(§N.M.K)*` etc.**: parse the dotted path
  into a tuple of integers; place the cursor on the line of that heading.
  Equivalent to `*(§<path> header)*`.
- **`*(§<path> ¶M)*`**: look up coordinate `(<path>, M)`.
- **`*(§<path> header)*`**: place the cursor on the heading line whose
  path is `<path>`.
- **`*(§<path>, final sentence)*`**: jump to the paragraph the path
  refers to (or to its last paragraph if the path names a heading), then
  move to the last sentence boundary (`. `, `! `, or `? `) inside it.
- **`*(§<path>, post-scratchpad)*`**: scan the body of the scope named by
  `<path>` (a section at any depth), find the first scratchpad blockquote,
  then place the cursor on the first prose paragraph after it.
- **`*(§<path> scratchpad — out of scope, ...)*`**: place the cursor on the
  first line of the scratchpad blockquote inside the scope named by
  `<path>`. Tooling should mark this jump as non-actionable (e.g. via a
  different highlight group or a status-line warning) so the writer knows
  the target isn't shipping copy.
- **Range `*(¶A–¶B)*`**: resolve start of paragraph `A` and (optionally)
  highlight through the end of paragraph `B`. Ranges only span paragraphs
  inside the same scope.
