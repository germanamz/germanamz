# Review: The start of the super human era
*Reviewed 2026-05-01 · word count: ~340 · status: published:false (draft)*

> This file is the calibration model for the `editorial-review` skill. It is a real review of `content/posts/add.mdx`. The post is mid-draft, which is why findings are dense — your reviews on more polished posts will be shorter.

## Verdict

**Through-line (one sentence I'd write for this piece):** *AI agents won't replace engineers — engineers using AI will become "super humans," and the craft is now about understanding the code your agents write.*

**Hook:** ⚠ — Opens with a personal time-frame ("For the past 2 years…") and a generic industry observation. The actual surprising claim ("agents are NOT the new engineers") doesn't appear until ¶4. The reader has no reason to commit before then.

**Through-line:** ⚠ — The thesis is real and worth making, but it's not stated until ¶5 (`"What if instead of automated agents, a new concept gets minted: **Super Humans**"`). Paragraphs 1–3 are throat-clearing. The piece treats the late-80s internet analogy as the through-line for too long before pivoting.

**Ending / payoff:** ✗ — The piece does not end. It cuts off mid-sentence in the "What is Agentic Development?" section: `"juggling loop between writing code by hand and orchestrating simple agent tasks like building tests for the code I wrote or simpler CSS changes."` The reader is dropped, not landed.

**Verdict-level rewrite directions:**

- *Hook, option 1 — open with the contrarian claim:* "Everyone with AI tools thought agents would be the new engineers. They're not. They can't be. Here's what they actually are." Puts the surprising claim first; analogy supports it later.
- *Hook, option 2 — open with the late-80s analogy as the lede, not the back-up:* "In the late 80s, people said the internet would reshape every industry. It didn't. It became its own industry, useful inside other businesses but never the great replacer. AI is now in the same place." Earns the comparison upfront and makes it load-bearing.
- *Hook, option 3 — open with a concrete moment:* "Last week I watched an agent get stuck on a problem a junior engineer would have solved in a minute. It wasn't a bad model. It was the wrong job for any model." Specific, low-stakes, sets up the bigger argument.
- *Through-line, option 1:* Cut ¶1–¶3 entirely. Open with the "Super Humans" claim from ¶5. Use the internet analogy as a single supporting paragraph after the thesis, not as the runway.
- *Through-line, option 2:* Keep the analogy as the opening but tighten ¶1–¶3 from ~150 words to ~60. The reader needs the reframe (`I think the same is happening with AI`) within the first 100 words, not the first 250.
- *Ending, option 1:* End on the inversion — what the engineer's job actually becomes. "The new craft isn't writing code. It's reading the code your agents wrote and knowing whether they're right." Lands the contract the opening promised.
- *Ending, option 2:* End with a stake. "If you treat your agents as colleagues, you'll plateau. If you treat them as power tools, you'll keep going." Memorable, debatable, quotable.

**One-line verdict:** *Strong thesis buried under throat-clearing and an unfinished ending. Needs a global revision pass before line edits — the structural fix changes which line edits matter.*

---

## Issues (prioritized)

### 1. Argument flow — ¶1–¶3 delay the thesis by ~250 words
> "For the past 2 years I've been working with AI tools as most of us have, we've been told over and over that software will no longer be made by humans. I think that's wrong..." *(¶1)*

**Principle:** Every paragraph should make the reader more convinced or more curious. If it doesn't, cut or move it.
**What's wrong:** The first three paragraphs do work the rest of the piece doesn't need. ¶1 sets up the disagreement, ¶2 reaches for the internet analogy, ¶3 restates the thesis ("All of that to respond…"). By the time the reader hits "Super Humans" in ¶5, the argument has already been made twice in lower-resolution form.
**Suggested rewrite:** Cut ¶1 and ¶3. Move the analogy from ¶2 to a single supporting paragraph *after* the "Super Humans" claim. Net cut: ~150 words; the piece earns its thesis 3× faster.

### 2. Specificity — "they said" with no antecedent (¶2)
> "Back in the late 80's they said that the internet will reshape all industries..." *(¶2)*

**Principle:** Concrete beats abstract. Name the actor, cite the source, or cut the claim.
**What's wrong:** "They" has no antecedent. The reader has to either accept the claim on faith or ignore it. A reference to *who* said this (analysts, journalists, McLuhan-era thinkers, a specific magazine cover) makes the analogy land harder and less generic.

### 3. Style watch — em dash as connective tissue (¶2)
> "...generative AI — which for the past ~3 years has been the biggest catalyst across multiple industries..." *(¶2)*

**Principle:** If a period, comma, or colon would carry the same load, use it. Em dashes signal hedging or stitched half-thoughts and now read as machine-generated.
**What's wrong:** This em dash is doing comma duty.

### 4. Header–payoff coupling — `## What is Agentic Development?` opens with anecdote, not definition
> "## What is Agentic Development?
>
> For the past 1.5 years or so, I've been working in a juggling loop between writing code by hand and orchestrating simple agent tasks..." *(after the H2)*

**Principle:** Headers are promises. Break the promise and the reader stops trusting you.
**What's wrong:** The header asks "what *is* it?" The paragraph starts with "I've been working in a juggling loop" — that's *what I do*, not *what it is*. The header promised a definition.

### 5. Originality — "the internet was just its own industry" (¶2)
> "Back in the late 80's they said that the internet will reshape all industries, it turned out to be just its own industry that was able to improve things in other businesses but definitely not the business killer that was promised." *(¶2)*

**Principle:** The reader's time is bought by giving them something they didn't already think.
**What's wrong:** This claim is contestable enough that it needs either an example or a more careful framing. As written, the sharper read is *"the internet did reshape every industry — retail, finance, media, advertising — it just took 20 years and the second wave (mobile + cloud)."* If the analogy is going to load-bear the AI argument, it can't be a wave-of-the-hand version of internet history.
**Suggested rewrite:** Tighten the analogy to its strongest form: "The internet didn't kill industries. It made the businesses that adopted it well 10× more powerful, and made the ones that didn't disappear. AI is the same."

### 6. Clarity — typo "prooven"
> "Now that full autonomy has been prooven not reliable..." *(¶6)*

**Principle:** If a sentence makes the reader work, the writer hasn't finished working.
**What's wrong:** Typo: "prooven" → "proven".

### 7. Voice consistency — register drifts between conversational and analytical
> "I know this sounds yet like another random concept, but it's where the industry is naturally orbiting towards." *(¶6)*

**Principle:** Pick a register and stay in it. Drift signals uncertainty about audience.
**What's wrong:** "I know this sounds yet like another random concept" is conversational and slightly hedged. The very next clause ("the industry is naturally orbiting towards") is analyst-speak. The piece is most alive in its conversational register; lean into that and cut the analyst phrasing.
**Suggested rewrite:** "I know — another concept. But this one is where the industry is already heading."

### 8. Paragraph structure — ¶2 packs analogy + setup + claim into one block
> *(¶2 — entire paragraph from "I think the same..." through "...especially software.")*

**Principle:** Paragraph breaks are punctuation for thought. Each break = new beat.
**What's wrong:** ¶2 contains three beats: (1) the AI claim, (2) why AI matters competitively, (3) AI as catalyst across industries. Each beat would land harder as its own short paragraph or be cut.
**Suggested rewrite:** Split into 2–3 short paragraphs, or — if the post is moving toward a tighter open per Verdict option 1 — cut to just the catalyst beat.

---

*Total findings: 8 issues + verdict pass. Most are downstream of the structural problems flagged in the verdict; fixing the global structure (cut ¶1–¶3, write a real ending, deliver the H2's promise) collapses several of them.*