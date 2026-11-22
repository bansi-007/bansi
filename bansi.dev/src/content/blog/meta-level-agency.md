---
title: 'Meta-Level Agency: Agents That Build Agents'
description: 'Most agents do a task. A meta-level agent does something stranger: it improves the agent that does the task. What that means, how Eureka pulled it off for robot rewards, and where the idea quietly breaks.'
pubDate: 2026-11-22T12:00:00Z
tags: ['llm']
draft: false
---

When people say "AI agent" today, they almost always mean one thing: a model that takes actions to get a job done. It plays the game, writes the code, books the flight, controls the robot hand. The agent and the task are on the same floor.

There is a second floor, and it is where some of the most interesting work of the last few years has been happening. On that floor, the agent's job is not the task. **The agent's job is the *other* agent.** It writes that agent's reward, picks its architecture, tunes its prompts, or rewrites its code, and then watches to see whether the other agent got better.

That is **meta-level agency**: an agent operating one level of abstraction up, designing, optimizing, or controlling other AI systems or the way they learn. An agent building or improving agents.

It sounds like a philosophy seminar. It isn't. It's an engineering pattern, and once you see it you will notice you have been doing it by hand for years.

## Two floors

Here is the distinction in one sentence each:

- An **object-level** agent acts on the world. Its feedback is the world's response: the game score, the test result, the reward.
- A **meta-level** agent acts on another agent. Its feedback is *how well that agent learned or performed*.

The object level is the inner loop. The meta level is the outer loop wrapped around it.

<figure>
  <svg viewBox="0 0 720 210" role="img" aria-label="A meta-agent writes a reward function, which plugs into an inner RL loop of agent and environment. Training results flow back to the meta-agent as reflection.">
    <defs>
      <marker id="mh" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker>
      <marker id="mha" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/></marker>
    </defs>
    <g font-family="ui-monospace, Menlo, monospace" font-size="12.5" text-anchor="middle" fill="currentColor">
      <rect x="6" y="50" width="170" height="64" rx="9" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="91" y="78" fill="var(--accent)">meta-agent</text><text x="91" y="97" font-size="10.5" fill="var(--muted)">LLM · outer loop</text>
      <line x1="176" y1="82" x2="232" y2="82" stroke="currentColor" stroke-width="1.3" marker-end="url(#mh)"/>
      <text x="204" y="72" font-size="10.5" fill="var(--muted)">writes</text>
      <rect x="236" y="50" width="150" height="64" rx="9" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="311" y="78">reward.py</text><text x="311" y="97" font-size="10.5" fill="var(--muted)">what it designs</text>
      <line x1="386" y1="82" x2="442" y2="82" stroke="currentColor" stroke-width="1.3" marker-end="url(#mh)"/>
      <text x="414" y="72" font-size="10.5" fill="var(--muted)">plugs in</text>
      <rect x="446" y="22" width="268" height="120" rx="12" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4"/>
      <text x="580" y="40" font-size="10.5" fill="var(--muted)">inner loop · RL training</text>
      <rect x="462" y="58" width="100" height="56" rx="8" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="512" y="91">agent</text>
      <rect x="598" y="58" width="100" height="56" rx="8" fill="none" stroke="currentColor" stroke-width="1.3"/>
      <text x="648" y="91">env</text>
      <line x1="562" y1="74" x2="596" y2="74" stroke="currentColor" stroke-width="1.1" marker-end="url(#mh)"/>
      <line x1="598" y1="100" x2="564" y2="100" stroke="currentColor" stroke-width="1.1" marker-end="url(#mh)"/>
      <path d="M 580 142 L 580 176 L 91 176 L 91 118" fill="none" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#mha)"/>
      <text x="335" y="198" font-size="10.5" fill="var(--accent)">reflection: task success, per-term reward curves</text>
    </g>
  </svg>
  <figcaption>The inner loop learns the task. The outer loop learns how to set up the inner loop.</figcaption>
</figure>

Notice what never happens in that picture: the meta-agent never touches the robot. It never picks an action. Its only lever is the thing the inner agent learns *from*.

## The cleanest example: Eureka

If you want one paper that makes this idea concrete, it's **Eureka** (NVIDIA and collaborators, 2023).

The problem it attacks is old and painful. In reinforcement learning, the policy learns whatever the reward function tells it to. Writing that reward function is notoriously hard. Make it too sparse and the agent never stumbles onto success. Make it too dense and the agent finds a loophole you did not think of. In practice, reward design is a human expert iterating by hand: write a reward, train for hours, watch a video of the robot doing something absurd, tweak a coefficient, repeat.

Eureka hands that job to an LLM. The loop looks like this:

1. **Read the environment.** The LLM is given the environment's source code and a plain-language task description, like "make the hand spin the pen."
2. **Write rewards as code.** It samples several candidate reward functions, each an executable Python function.
3. **Train on each.** An ordinary RL algorithm trains a policy with every candidate, in parallel, in GPU simulation.
4. **Reflect.** The training statistics come back as text: the task success rate, and how each individual reward term moved during training. The LLM reads that and writes the next, better batch.

That fourth step, which the paper calls *reward reflection*, is the heart of it. The meta-agent isn't guessing blindly. It's reading the inner agent's training curves the way an RL engineer would, and noticing things like "this term saturated early and stopped contributing" or "this penalty dominates everything else."

The results were striking. Across 29 environments and 10 different robot bodies, Eureka's rewards beat the expert human-written rewards on 83% of tasks, with an average normalized improvement of 52%. And it unlocked tasks that hand-written rewards had not managed at all, most famously a simulated Shadow Hand spinning a pen with real dexterity.

> Eureka never learned to spin a pen. It learned to *write the thing that teaches* something else to spin a pen. That is the whole idea of meta-level agency in one sentence.

A follow-up, DrEureka, pushed the same pattern into the gap between simulation and reality: the LLM wrote not just the reward but the domain randomization settings, and a real quadruped learned to balance and walk on a yoga ball.

## What a meta-agent can design

Reward is only one knob. Step back and almost everything that shapes how an agent learns or behaves can be put on the second floor:

| What the meta-agent controls | Example | Inner agent |
|---|---|---|
| The **reward** | Eureka, DrEureka | an RL policy |
| The **architecture** | Neural Architecture Search (Zoph & Le, 2017) | a neural network |
| The **starting point** for learning | MAML and meta-learning | a model that fine-tunes fast |
| The **prompts** | Promptbreeder, DSPy optimizers | an LLM pipeline |
| The **program** | FunSearch, AlphaEvolve | a candidate algorithm, scored by an evaluator |
| The **agent itself** | ADAS (Meta Agent Search), Darwin Gödel Machine | another agent, written in code |

The last row is where it gets dizzying. In ADAS, a meta-agent writes entire new agent designs in code, tests them, and keeps an archive of the good ones to build on. In the Darwin Gödel Machine, a coding agent rewrites *its own* code, and the modified versions that score better on coding benchmarks become parents for the next round. At that point the floors start to merge: the agent being improved and the agent doing the improving are the same system, one version apart.

## Why this suddenly works

The meta level is not new. Neural Architecture Search used a controller trained with RL to design networks back in 2017. Meta-learning has been a research field for decades. So why does it feel different now?

**Because LLMs made the search space "any program."** An old NAS controller could only choose from a menu someone designed: this many layers, that kernel size. An LLM writing a reward function can write *any* Python, and it shows up with strong priors about what sensible code looks like. It has read thousands of reward functions, loss functions, and agent loops. The search starts from "plausible engineer," not from random.

**Because the output is readable.** A reward written as code can be reviewed by a human, diffed, version-controlled, and debugged. Compare that with a learned optimizer whose behavior lives inside its weights. This matters enormously if you ever want to ship any of it.

**Because the inner loop got cheap.** Eureka is only practical because GPU simulators can train many policies in parallel. The meta-agent can afford to be wrong several times per iteration, because each attempt costs minutes, not weeks.

## The pattern, stripped down

Strip away the robots and every meta-level system above is the same four-step loop. Here's its skeleton. The helpers (`llm`, `train_policy`, `compile_reward`, `summarize`) are the parts you plug in for your own problem:

```python
def meta_loop(task_spec, env_source, iterations=5, samples=8):
    best, feedback = None, ""
    for _ in range(iterations):
        # 1. propose: the meta-agent writes candidates as code
        prompt = write_reward_prompt(task_spec, env_source, best, feedback)
        candidates = [llm(prompt) for _ in range(samples)]

        # 2. run: the inner loop trains an ordinary policy on each candidate
        results = [train_policy(reward_fn=compile_reward(c)) for c in candidates]

        # 3. measure: rank by the TASK metric, never by the reward it wrote
        ranked = sorted(zip(candidates, results),
                        key=lambda cr: cr[1].task_success, reverse=True)
        best, top = ranked[0]

        # 4. reflect: turn training statistics into text the meta-agent can read
        feedback = summarize(top.reward_term_curves, top.task_success)
    return best
```

Look hard at step 3. The candidates are ranked by `task_success`, a fixed measure of the outcome you actually care about, and **not** by the reward the meta-agent wrote. That single line is the difference between a meta-agent that improves your system and one that grades its own homework.

## Where it quietly breaks

Now the honest part, because this idea is easy to oversell.

**The evaluator is everything.** A meta-agent optimizes whatever it is measured on, with more creativity than you would like. If your evaluation has a gap, the outer loop will find it faster than any human would. The Darwin Gödel Machine authors report exactly this kind of behavior: the system found ways to satisfy the check it was evaluated on rather than solving the underlying problem. Reward hacking does not go away at the meta level. It moves up a floor, and gets harder to spot.

**You still need a fast, honest inner loop.** Eureka works because simulated training is fast and success is measurable. If your inner loop is "deploy to production for a week and see what users do," a meta-agent has nothing to iterate on. No cheap feedback, no meta-level agency.

**It is expensive.** Every outer iteration multiplies the cost of the inner one. Eight candidates times five iterations is forty full training runs, plus the LLM calls. For most teams that is affordable only when the inner loop is small.

**More levels means more distance from the outcome.** When something goes wrong in an object-level agent, you look at what it did. When something goes wrong in a meta-level agent, you look at what it *built*, then at what that thing did. Debugging gets one level more indirect each time you go up a floor.

## Why this matters if you ship models

Here's what I find most useful about this framing. Anyone who ships ML models already runs a meta-level loop. It's just that the meta-agent is you. You change the loss weighting, retrain, read the curves, notice a term that dominates, adjust, retrain. That is reward reflection done by hand, usually late at night.

Meta-level agency is that loop with the human moved out of the inner seat. And the lesson from Eureka and everything after it is clear about where the human goes instead:

> The job moves up one floor. You stop writing the reward. You start writing the evaluator, the constraints, and the definition of "better." That part was always the hard part. Now it is the only part left.

Agents that build agents are not a distant idea anymore. They are an outer loop with a good critic. Whether they help you or quietly fool you depends almost entirely on how good that critic is.
