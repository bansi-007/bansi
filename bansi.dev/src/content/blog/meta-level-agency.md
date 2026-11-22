---
title: 'Meta-Level Agency: Agents That Build Agents'
description: 'Most agents do a task. A meta-level agent improves another agent instead. What that means, how Eureka used an LLM to write reward functions for robots, and where the approach runs into trouble.'
pubDate: 2026-11-22
tags: ['llm']
draft: false
---

Most of what gets called an "AI agent" today does a task directly. It plays the game, writes the code, books the flight, moves the robot hand. The model doing the work is the model being judged.

A meta-level agent works one step removed. Its job is to make *another* agent better: it writes that agent's reward function, chooses its architecture, rewrites its prompts or its code, and then checks whether the other agent improved. Put simply, it's an agent whose output is a better agent.

I've found this a useful way to sort a lot of recent research. It's also a fair description of something ML engineers already do by hand. This post walks through the idea with one concrete system, Eureka, and then covers the parts that make it hard to use in practice.

## Two levels

- An **object-level** agent acts in an environment. Its feedback comes from that environment: a game score, a passing test, a reward.
- A **meta-level** agent acts on another agent, or on how that agent is trained. Its feedback is how well the other agent ended up doing.

So there are two loops, one inside the other. The diagram below uses the example from the next section, where an LLM writes the reward function that a reinforcement learning (RL) agent trains on.

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
      <text x="311" y="78">reward.py</text><text x="311" y="97" font-size="10.5" fill="var(--muted)">what it writes</text>
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
  <figcaption>The inner loop trains on the task. The outer loop changes what the inner loop trains on.</figcaption>
</figure>

The meta-agent in this picture never takes an action in the environment. The only thing it changes is the reward the inner agent trains on, and everything it learns about the environment comes back to it through the training results.

## Eureka: an LLM that writes reward functions

The clearest example I know of is Eureka, from NVIDIA and collaborators (Ma et al., 2023).

Reward design is one of the more tedious parts of reinforcement learning. A policy optimizes exactly what the reward says. If the reward is sparse, the agent rarely sees success and learns slowly. If it's dense and hand-shaped, it tends to have gaps the agent learns to exploit. In practice someone writes a reward, trains for hours, watches a video of the robot doing something odd, changes a coefficient, and starts again.

Eureka gives that loop to an LLM:

1. **Read the environment.** The LLM gets the environment's source code and a short task description, such as "make the hand spin the pen."
2. **Write candidate rewards.** It samples several reward functions, each one a Python function that can be run directly.
3. **Train on each.** A standard RL algorithm trains one policy per candidate, in parallel, in a GPU-accelerated simulator.
4. **Reflect.** The results come back as text: the task success rate, and how each term of the reward changed during training. The LLM uses that to write the next batch.

The paper calls step 4 *reward reflection*, and it's what separates this from random search. The LLM sees roughly what an RL engineer would look at, so it can react to things like a reward term that flattened out early, or a penalty that is much larger than everything else.

Across 29 environments and 10 different robot bodies, Eureka's rewards beat the expert-written ones on 83% of tasks, with an average normalized improvement of 52%. It was also used to teach a simulated Shadow Hand to spin a pen between its fingers, which hand-written rewards hadn't managed.

It's worth being precise about what learned what. Eureka never learned to spin a pen; the RL policy did. Eureka's contribution was the reward that the policy learned from.

A follow-up, DrEureka, applied the same approach to moving policies from simulation to real hardware. The LLM wrote the reward and also the domain randomization settings, and the resulting policy got a real four-legged robot balancing and walking on a yoga ball.

## Other things a meta-agent can design

The reward is one option. The same structure shows up wherever one system shapes how another one is built or what it learns from:

| What the meta-agent controls | Example | Inner agent |
|---|---|---|
| The **reward** | Eureka, DrEureka | an RL policy |
| The **architecture** | Neural Architecture Search (Zoph & Le, 2017) | a neural network |
| The **starting point** for learning | MAML and meta-learning | a model that fine-tunes fast |
| The **prompts** | Promptbreeder, DSPy optimizers | an LLM pipeline |
| The **program** | FunSearch, AlphaEvolve | a candidate algorithm, scored by an evaluator |
| The **agent itself** | ADAS (Meta Agent Search), Darwin Gödel Machine | another agent, written in code |

The last row is the unusual one. In ADAS (Automated Design of Agentic Systems), a meta-agent writes new agent designs as code, evaluates them, and keeps an archive of the good ones to build on. In the Darwin Gödel Machine, a coding agent edits its own source code, and the versions that score better on coding benchmarks are kept as starting points for further edits. There, the agent doing the improving and the agent being improved are the same program, one version apart.

## Why it works better now

The idea isn't new. Zoph and Le used an RL-trained controller to design network architectures in 2017, and meta-learning goes back much further than that. Three things have changed since.

**The search space is now code.** A NAS controller picked from a fixed menu: number of layers, kernel sizes, and so on. An LLM can write any Python, and because it has seen a lot of reward functions, loss functions and training loops, its first guesses are usually reasonable ones.

**The output can be read.** A reward function written as code can be reviewed, diffed and checked into version control. A learned optimizer, by contrast, keeps what it learned inside its weights. If you need to explain the result to someone, or ship it, that difference matters.

**The inner loop is cheaper.** Eureka depends on GPU simulators that can train many policies at once. Each candidate costs minutes rather than days, so the LLM can afford several bad guesses per round.

## The loop in code

Take away the robotics details and the systems above all follow the same four steps. Here's a skeleton. `llm`, `train_policy`, `compile_reward` and `summarize` stand in for whatever your own setup uses:

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

The line I'd pay most attention to is in step 3. Candidates are ranked by `task_success`, a fixed measure of the result you actually want, not by the reward the LLM wrote. If you ranked them by the LLM's own reward, it could raise its score by writing easier rewards, and nothing in the loop would notice.

## Where it breaks

**The evaluator decides what you get.** The outer loop optimizes whatever it is scored on, and it finds gaps in that score faster than a person would. The Darwin Gödel Machine paper reports cases where the system raised its score by working around the check it was evaluated with, instead of fixing the behaviour the check was meant to catch. Reward hacking still happens at the meta level. It's just one step further from where you'd normally look for it.

**It needs a fast, measurable inner loop.** Eureka works because a simulated training run is quick and success is easy to measure. If your only feedback is a week of production traffic, there's nothing for an outer loop to iterate on.

**It costs a lot of compute.** Each outer iteration runs the inner loop several times. Eight candidates over five iterations is forty training runs, before you count the LLM calls. That's fine for small simulated tasks and hard to justify for large ones.

**Debugging is less direct.** When an ordinary agent misbehaves, you look at what it did. When a meta-level system produces a bad result, you have to look at what it built, and then at what that thing did.

## Why I think this matters for people shipping models

If you train models for a living, you already run this loop yourself. You change a loss weight, retrain, look at the curves, notice that one term is dominating, adjust, and retrain again. That is reward reflection, done by a person.

What a meta-level system changes is who does the adjusting. What it can't take over is deciding what "better" means: the evaluation metric, the constraints, and which shortcuts are unacceptable. In Eureka, that's the task success metric and the simulator. In a production project, it's the eval set and the acceptance criteria. That part was always the hard part of the job, and with a meta-agent in the loop, it's most of what's left for the engineer.

So whether a system like this helps you or misleads you comes down mostly to how good your evaluation is.
