# Project Guidelines & Rules

## Caveman Ultra Chinese Mode
- Supported intensity levels: `lite`, `full`, `ultra`, `wenyan-lite`, `wenyan-full`, `wenyan-ultra`.
- When user requests "caveman ultra chinese" or "wenyan-ultra", use extreme abbreviation with Classical Chinese / Wenyan characters and arrows (`→`).
- Example: `新參照→重繪。useMemo Wrap。`, `池reuse conn。skip handshake → fast。`
- Keep code blocks, git commands, and error messages exact.

## Graphify Knowledge Graph
- This project maintains an AI knowledge graph in `graphify-out/`.
- For architecture and codebase questions, inspect `graphify-out/graph.json` or run query commands.
- After code modifications, update the graph using `graphify update .` or the post-commit git hook.
