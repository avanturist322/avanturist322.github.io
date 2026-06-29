---
layout: post
title: MIKASA-Robo major update — now supports VLA research
date: 2026-06-20
inline: false
related_posts: false
---

We have released a major update of **MIKASA-Robo**, extending the benchmark to the **Vision-Language-Action (VLA)** setting. **MIKASA-Robo-VLA** preserves the original benchmark's focus on memory-intensive tabletop manipulation, while broadening the task suite, introducing language-conditioned evaluation, and providing standardized data export for modern VLA training pipelines.

📚 Documentation: [https://mikasarobo.github.io/](https://mikasarobo.github.io/)
💻 Code: [https://github.com/CognitiveAISystems/MIKASA-Robo](https://github.com/CognitiveAISystems/MIKASA-Robo)

**What changed from MIKASA-Robo (RL release)**

- Task set grows from **32 → 90** registered environments covering **10 memory types** (vs 4 in the RL release).
- Every task ships a natural-language `LANGUAGE_INSTRUCTION` for VLA conditioning.
- Episodes are grouped into three horizon splits (**Short / Medium / Long**) so multi-task training and evaluation are tractable.
- **22,500** PPO / motion-planning oracle trajectories are released on Hugging Face in **RLDS** and **LeRobotDataset v3** formats — no further conversion needed (6+ million transitions).
- Dense and normalised-dense rewards are calibrated for every task, enabling both offline imitation learning and online RL.
- The original 32-task RL implementation is available from the `mikasa-robo-rl` branch and remains under `mikasa_robo_suite/rl/` for backwards compatibility.

**Pick your path**

- *"I want to evaluate my VLA model"* → Benchmarking (CLI, JSON output, Python API) and the canonical Evaluation Protocol.
- *"I want to fine-tune a VLA model"* → Datasets (RLDS, LeRobotDataset v3) and Observation and Action Space.
- *"I want to explore tasks"* → Environments & Tasks (per-task pages with previews, language instructions, horizons, and setup parameters).
- *"I want to know what makes the benchmark important"* → Core Concepts (memory taxonomy, episode structure).

**Key features**

- 90 memory tasks across 10 memory types, horizons 25–2160 steps, multiple difficulty levels.
- The public benchmark grows from 32 (RL release) to 90 tasks with language instructions for every task.
- Three horizon splits (Short / Medium / Long) for structured multi-task evaluation.
- Trajectory collection via PPO oracles and motion planning.
- 22,500 trajectories (>6 M timesteps) in RLDS and LeRobotDataset v3 formats on Hugging Face.
- Physics fixes, dense / normalised-dense rewards, and full GPU-parallelised simulation via ManiSkill.
