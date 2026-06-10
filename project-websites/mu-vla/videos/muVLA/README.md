# 03 — Attention overlay on episode video

For each env in `--env_ids`, run **one** muVLA episode capturing attentions,
then write an mp4 and two contact-sheet PNGs showing the camera images with
patch-level attention overlaid as a coloured heatmap.

**No upscaling:** each vision patch becomes a flat block of colour (nearest-
neighbour resize to camera resolution) — you see exactly which patch the
model attended to.

## What it produces (per env)

| File | Meaning |
|------|---------|
| `<env>_attn_overlay.mp4` | episode video — top half: raw cameras; bottom half: attention overlay |
| `<env>_rollout_plain.png` | contact-sheet of raw frames (top camera row, wrist camera row) |
| `<env>_rollout_attn.png` | contact-sheet of attention-overlaid frames |
| `<env>_summary.json` | patches per camera, patch grid shape, episode success |

## Metric reference

### Attention source: last ACTION token

At each timestep we want to know: *"given that the model is about to output
an action, which image patches did it attend to?"*

We use the **last ACTION token** (position `action_end − 1`) as the query.
This is the most semantically loaded position — it directly precedes STOP
and aggregates information from all other tokens via the preceding attention
layers before the action head reads it.

### Attention rollout across layers

A single attention layer may delegate to the next; rollout
(Abnar & Zuidema 2020) computes the *effective* attention path from a query
position to all prefix positions by composing per-layer attention matrices:

```
R_1 = 0.5 · A_1 + 0.5 · I
R_l = R_{l−1} · (0.5 · A_l + 0.5 · I)       (elementwise softmax A_l)
```

The `0.5` residual factor accounts for the residual stream that bypasses each
attention block. The final composite matrix R_L[q, :] gives the rolled-out
attention from query position q to every prefix position.

### Vision patch slicing and per-camera split

The vision token range in the sequence is:
```
vision_tokens = R_L[last_action, vision_start : vision_end]   # length = num_cameras × patches_per_cam
```

We split this vector into `num_cameras` equal blocks (camera 0 = top,
camera 1 = wrist, which matches MIKASA's observation layout) and reshape
each block to `(Hp, Wp)` (square patch grid).

The resulting `(Hp, Wp)` array is nearest-resampled to the camera's native
pixel resolution and blended with the raw frame (α = 0.55).

### Colour map

Jet colormap: blue = low attention, red = high attention. Values are
normalised per-step to [0, 1] before colourisation.

## Video frame layout

Each video frame (height = 2 × camera_height + 2px separator) contains:
```
┌──────────────────────────────────────┐
│  raw top-cam  │   raw wrist-cam      │   ← original, no overlay
├──────────────────────────────────────┤
│  attn top-cam │   attn wrist-cam     │   ← attention overlay (jet cmap)
└──────────────────────────────────────┘
```

## Contact-sheet PNGs

`_rollout_plain.png` — subsampled episode frames (≤ 30), top-row = top camera,
bottom-row = wrist camera, step label below each column.

`_rollout_attn.png` — same layout but with the attention overlay already
applied (useful for static paper figures).

## Usage

```bash
CUDA_VISIBLE_DEVICES=3 uv run python experiments/ablations/03_attention_video/run.py \
    --pretrained_checkpoint "$CKPT" \
    --env_ids RememberColor5-VLA-v0
```

## Limitations

- Patch grid assumed square. SigLIP/DINOv2 at default resolution → 256 patches
  per camera (16 × 16). Non-square configurations produce a warning.
- Camera ordering: camera 0 = top, camera 1 = wrist. Valid for MIKASA-Robo.
