# Flow: team safety checks and resuming work

Run before touching code, every time: cheap checks that turn a silent collision into a visible warning.

## Before starting

- Is the local branch behind the shared branch? A teammate may have already changed or shipped this.
- Is there uncommitted work in the area about to be touched? Don't build over it.
- Does the scope item's status, or a recent commit, suggest a teammate is already partway through this same item?

These are warnings, not walls: surface them, then proceed if the developer confirms it's fine.

## Resuming a feature that's half built

State lives in files, not the chat, so a cleared session loses nothing. On resume: read the scope item's status and the spec's acceptance criteria, work out which are already satisfied by what's in the tree, and start at the first one that isn't. Never rebuild what already shipped.
