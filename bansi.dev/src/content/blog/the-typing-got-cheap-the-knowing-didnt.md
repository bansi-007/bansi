---
title: "The Typing Got Cheap. The Knowing Didn’t."
description: "Coding agents collapsed the cost of producing software. They did nothing to the cost of judgment. Two expensive mistakes follow from confusing the two, and one discipline saves…"
pubDate: 2026-06-15
tags: ['engineering']
---

*Coding agents collapsed the cost of producing software. They did nothing to the cost of judgment. Two expensive mistakes follow from confusing the two, and one discipline saves you from both.*

There is a sentence being spoken in leadership rooms right now, in some shape, almost everywhere:

> “The agents write the code now, so…”

Two conclusions usually follow that “so.”

> The first is operational: *so let the agent make the design calls, and we just review the output.*

> The second is structural: *so one strong person can now cover what used to be three specialists, the data engineer, the ML engineer, the data scientist, because the hard part was the coding, and the coding is handled.*

Both feel reasonable. Both are wrong. And they are wrong for the exact same reason, which is why I want to treat them as one problem, not two.

**Real leverage is rare. Borrowed judgment isn’t leverage.**

## What actually got cheap

An agent lowers the cost of *producing an artifact*. The function, the pipeline, the migration, the test scaffold. That cost, call it the typing, has fallen through the floor. Pretending otherwise is its own kind of denial.

What it does *not* lower is the cost of *knowing whether the artifact is correct*.

Knowing requires a model of the system living in someone’s head. What this service depends on. Where the data contract is fragile. Why this experiment’s result might be an artifact of a leaky split. What breaks at 100x the current load. That knowledge is mostly tacit. It lives in scar tissue, not in documentation. It is the most expensive thing an engineering org owns, and nothing about better autocompletion made it cheaper.

So the real question is never *“can the agent write this?”*

It’s *“does anyone here still understand it well enough to catch it when it’s confidently wrong?”*

Hold that question. It takes apart both mistakes.

## Mistake one: outsourcing the thinking

This one is sneaky because it never feels like a decision. Nobody announces *“I am now delegating my architecture to a language model.”* It happens one accepted suggestion at a time.

The agent proposes a structure. It’s plausible. You ship it. It proposes a data model. It looks fine. You move on. Slowly the design stops being something you *authored* and becomes something you *approved*. And approval, when you’re moving fast and the output reads clean, quietly rots into a rubber stamp.

Here’s the trap: the agent has fluency, not understanding. It produces the *shape* of a good answer because it has seen ten thousand good answers. It has no stake in your system, no memory of last quarter’s outage, no idea which corner you are not allowed to cut. Trust its “instinct” and you are trusting a very confident pattern match over your own context.

And the bill arrives late.

![](/images/medium/the-typing-got-cheap-the-knowing-didnt/01-0_ni4DmuEqJPEwV-ku.png)

The 2026 evidence is no longer a hunch. The research consensus now has a name for it: the **productivity-reliability paradox**. Individuals feel dramatically faster while team-level delivery stays flat or slips. One widely cited study found experienced developers were actually about 19% *slower* once you count the time spent validating agent output, even as they reported feeling faster. Code churn climbs. Review times stretch. An NBER survey of nearly 6,000 executives in early 2026 found over 80% of firms reported essentially no productivity gain from AI across three years, despite near-universal adoption.

The debt is not just slow. It’s dangerous. Veracode found a large share of AI-written code shipped common security flaws, and other 2026 reporting puts AI-touched code at roughly 2.7x the vulnerability density of human-written code. These failures love to surface 30 to 90 days after deploy, long after the velocity dashboard threw confetti.

> Martin Fowler’s framing has aged the best. Treat every chunk of agent output like a pull request from a collaborator who is wildly productive and not even slightly trustworthy. The line count is real. The reliability is not a gift.

**That is technical debt in its purest form: borrowing against a future you won’t be around to defend, secured by understanding you no longer have.**

## Mistake two: the omni-skill dream

Same root, grown into an org chart.

> If the coding is handled, the logic goes, then the walls between roles were really just walls between *who types what*, and we can knock them down. One person, full stack across data engineering, ML engineering, and data science. The omni-skilled generalist.

But those roles were never separated by who could write code. They are separated by *which failure mode each one is trained to smell*.

A data scientist exists to ask whether an effect is real, or whether the experiment is confounded and the metric is leaking.

An ML engineer exists to ask whether a model that dazzles offline will survive serving skew, drift, latency, and cost at scale.

A data engineer exists to ask whether the data itself can be trusted, and whether the contract holds when an upstream team renames a column at 2 a.m.

Three different kinds of suspicion. Built from three different bodies of tacit knowledge. Earned over years.

That’s the part the omni-skill dream waves away. **Cross-skilling into a genuinely different discipline takes a long time, and the agent does not shortcut it.** It can hand you the *output* of expertise you don’t have, a statistical test, a Terraform module, a feature pipeline. It cannot hand you the *judgment to know the output is wrong*.

The research on agent usage is blunt here. The single biggest barrier to success is the agent’s lack of project-specific and tacit knowledge, and developers who handed off whole tasks did *worse* than the ones who decomposed and supplied context. The tacit knowledge is the bottleneck. The tacit knowledge is also, precisely, what each specialist role *is*. You cannot download it in an afternoon, and neither can the model.

The market is voting against omni-skill, not for it. Roles are *fragmenting* into more specializations (AI engineer, agent developer, MLOps), not folding into one. Across data science postings, only around 5% ask for a true end-to-end full-stack person. The rest want scoped versatility or deep domain depth. **And at the top of the market, pay tracks depth, because the rare expertise is the whole point.**

There *is* a real trend underneath the bad conclusion. The work is shifting from craftsman toward something like a *developer-manager*, where hands-on typing becomes secondary to oversight, architecture, and critique. But that shift *raises* the expertise bar per person. **You cannot review what you don’t understand.** The honest version of the trend is **fewer handoffs, more end-to-end ownership by T-shaped people**: one deep spike plus broad literacy. The dishonest version is a flat generalist babysitting agents across domains they can only shallow-check.

The first is the future. The second is an outage with a job title.

## Why both bite hardest when billions are on the line

When a weekend project rots, you learn a cheap lesson. When billions of dollars, regulated systems, or safety-critical inference ride on the output, the same two mistakes change character.

Outsourced thinking means the design rationale lives nowhere. Not in a person, not in a doc, only implicitly in code a model wrote and a human skimmed.

Omni-skill structure means the one failure mode that would have caught the problem belonged to a specialist who no longer exists on the team.

Stack them together and you get the worst configuration in software: a system nobody fully understands, run by people stretched too thin to build the understanding, validated by an agent that is fluent, fast, and occasionally, invisibly, catastrophically wrong.

The dashboards look beautiful right up until the quarter the delayed failures land.

## So how do you actually use the agent?

![](/images/medium/the-typing-got-cheap-the-knowing-didnt/02-0_0A2n2iWsUG9HsCX1.png)

Here’s the part most “AI will replace engineers” takes skip. None of this is an argument against agents. Refusing the leverage is as dumb as over-trusting it. The discipline is in *how* you hold the tool.

The mental model that fixes everything: **the agent is a brilliant, tireless, slightly unreliable collaborator. You are the senior author. It never gets to be the author.**

Concretely, four moves.

## 1\. Use it as a bounce-board, not an oracle

Stop asking *“what should I do?”* That hands it the authorship. Ask it to *stress your own thinking*.

The best research prompt I run is not “design X.” It’s:

> “Here’s my approach. Argue against it. Give me the three strongest reasons this fails, and one approach I’m not considering.”

Make it the adversary, not the cheerleader. Ask for the strongest version of three competing approaches *with their failure modes*, then *you* pick. Use it to surface prior art so you find out what you might be reinventing. Use it to enumerate the hypothesis space, fast and wide, because that’s what it’s genuinely great at. Then narrow it yourself, because that’s the part that needs taste.

Treat its first answer as a draft to interrogate, never an answer to adopt. The first answer is almost always the obvious one. Push past it:

> “That’s the textbook answer. What’s the non-obvious one, and what would have to be true for it to win?”

## 2\. Make it run the experiment, not just the model

This is where the agent earns its keep in research, and where most people underuse it. Don’t just have it write the model. Have it build the apparatus *around* the model.

Make it write the experiment harness, the ablations, the baselines, the eval. Then force falsifiability before you run anything:

> “What experiment would prove this hypothesis wrong? Design the control and the metric, and tell me what result you expect before we run it.”

That pre-registration step is the cheapest insurance you’ll ever buy against fooling yourself.

Then make it build the validation suite it would build for an enemy. Edge cases. Adversarial inputs. Data leakage checks. The boring sanity checks that catch the embarrassing bugs: can the model overfit a single batch, do train and test actually disjoint, is the metric measuring what you think.

And when results come back, do not let it celebrate. Make it interrogate:

> “Is this result real or an artifact? List every way this number could be lying to me.”

The agent that designs the experiment and then attacks its own results is worth ten that just hand you a green checkmark.

## 3\. Don’t accept the code. Interrogate it.

The fastest way to ship debt is to read agent code for *plausibility* instead of *correctness*. Plausible is its native output. Plausible is the trap.

Spec first, always. Give it the contract, the types, the invariants, the failure modes *before* it writes a line. The clearer the boundary you define, the safer the work inside it. Vague prompt, vague (and confident) garbage.

Ask for the test before the implementation. Make it write the failing test, agree the test is right, *then* let it write the code to pass it. You stay the one defining “correct.”

Keep the diffs small and single-concern. Decompose the task. Whole-task handoffs are exactly where the research says agents fall apart.

Then run a second adversarial pass on its own output:

> “You wrote this. Now find the bug you just introduced. Where does this break under load, under null inputs, under a schema change?”

And the one rule that catches everything: **never merge what you can’t re-derive.** If you cannot explain back, in your own words, why the code is correct, you are not reviewing it. You are gambling. Run it, profile it, watch the churn. Trust execution, not eloquence.

## 4\. Push it back. Make it think deeper.

The default agent answer is tuned to be agreeable and complete-sounding. Agreeable is not the same as right. You have to actively pull it deeper.

A few prompts I keep loaded:

> “What are you assuming that I never told you?”

> “Steelman the opposite of what you just said.”

> “Separate what you actually know from what you’re inferring, and rate your confidence on each.”

> “If a staff engineer tore this apart in review, what would they hit first?”

When it caves the instant you push, that’s a signal it was pattern-matching, not reasoning. When it holds its ground with a real argument, that’s worth listening to. Either way, *you* learned where the soft spots are.

The goal of all four moves is the same. Use the agent to multiply your judgment, never to replace it. It makes a strong engineer faster and a thin team’s blind spots fatal. The leverage only exists where the expertise already does.

## The org-level version, in one breath

Measure delivery, not keystrokes. Individual velocity is the metric most flattered by agents and least correlated with shipping value. Watch lead time, change-failure rate, and the cost of the debt.

Build T-shaped depth on purpose. Cross-train toward *literacy* so handoffs shrink, but protect the deep spike. “Can converse about all three” is not “can be accountable for all three.”

Treat the agent as a force multiplier on expertise, not a substitute for it.

## The thing worth saying plainly

Both mistakes, letting the agent design and collapsing the specialists, come from one misread. Someone watched the typing get cheap and decided the *knowing* got cheap too.

It didn’t.

The judgment that catches the wrong design and the deep expertise that catches the wrong result are the same kind of thing, and they are still the scarcest, slowest-to-build, hardest-to-fake assets in the building.

Agents didn’t make that expertise obsolete. By multiplying how fast we can produce things we don’t fully understand, they made it more valuable than it has ever been.

The teams that win the next few years won’t be the ones who outsourced the thinking or flattened the roster. They’ll be the ones who kept the knowing where it belongs: in people deep enough to tell when the very confident machine is very confidently wrong.

**The typing got cheap. Be the person who still does the knowing.**

---

*Originally published on [Medium](https://medium.com/@bansimaddali/the-typing-got-cheap-the-knowing-didnt-b8143e62516b).*
