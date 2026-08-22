# Tessera Asset Reference

This file records where the visual assets live so every spec and build guide can
point to them exactly. The coding agent reads this before writing any component.

## Video background (the primary hero asset)

- Source location: C:\Users\Paul\Documents\Coding Area\Hackathon\Tessera
- Role: full-bleed cinematic ambient loop behind the hero, using the FadingVideo
  crossfade technique (Technique 1, Step 3B) for a seamless restart.
- Format: MP4, H.264, 1080p minimum, target under 10MB.
- The video is the hero. There is no separate creative image. The only optional
  still is a single poster frame derived from the same video, used as a
  loading and crossfade safety net on slow connections.

## How the agent should reference it

The spec asset brief and the build guide must read the video from the path above.
When the repo is created, the video is copied into the project public folder so
the build serves it locally, and the path above stays the authoritative source.

## Status

- Video: provided by Paul at the path above, pending copy into repo public folder.
- Logo / favicon: none yet. Every logo and favicon slot stays a code comment
  until Paul supplies the asset. No invented mark, no emoji, no symbol.
