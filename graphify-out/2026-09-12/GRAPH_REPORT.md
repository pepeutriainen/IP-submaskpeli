# Graph Report - IP-submaskpeli  (2026-09-12)

## Corpus Check
- 26 files · ~433,875 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 150 nodes · 201 edges · 26 communities (21 shown, 5 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `035665b7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- nodes.js
- state.js
- ui.js
- game.js
- scene.js
- AGENTS.md
- SKILL.md
- teaching.js
- cables.js
- network.js
- GEMINI.md
- caveman.md
- rules/graphify.md
- studio_standards.md
- workflows/graphify.md

## God Nodes (most connected - your core abstractions)
1. `calcUpdateScreen()` - 9 edges
2. `ip2long()` - 7 edges
3. `getBitwiseAndBreakdown()` - 7 edges
4. `updateNodeVisualState()` - 7 edges
5. `checkConnections()` - 7 edges
6. `getNodeSubnetScope()` - 7 edges
7. `calculateSubnetDetails()` - 6 edges
8. `createNode()` - 6 edges
9. `openIpModal()` - 6 edges
10. `cidrToMaskLong()` - 5 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (26 total, 5 thin omitted)

### Community 0 - "nodes.js"
Cohesion: 0.21
Nodes (19): applyEnterpriseCeilingAp(), applyModelToNode(), assignDhcpIp(), checkConnections(), createLabelTexture(), createNode(), createZone(), createZoneLabelMesh() (+11 more)

### Community 1 - "state.js"
Cohesion: 0.15
Nodes (12): cableActionState, cables, DEVICE_RULES, IP_REQUIRED_TYPES, keys, labelMeshes, levels, nodes (+4 more)

### Community 2 - "ui.js"
Cohesion: 0.13
Nodes (27): calcBackspace(), calcClear(), calcDot(), calcEquals(), calcInputQuick(), calcNum(), calcOp(), calcPower2() (+19 more)

### Community 3 - "game.js"
Cohesion: 0.39
Nodes (4): clearWorld(), goToMenu(), loadLevel(), nextLevel()

### Community 4 - "scene.js"
Cohesion: 0.39
Nodes (5): animate(), initThreeJS(), onPointerDown(), onPointerMove(), onWindowResize()

### Community 5 - "AGENTS.md"
Cohesion: 0.40
Nodes (4): 1. Kieli & Kommunikaatio (Token-Optimointi), 2. IT Studio -laatustandardit (Professional Engineering), 3. Graphify Look Out (Arkkitehtuurikartoitus & Vertailu), 4. Git & Versiohallinta

### Community 6 - "SKILL.md"
Cohesion: 0.40
Nodes (4): Auto-Clarity, Boundaries, Intensity, Rules

### Community 7 - "teaching.js"
Cohesion: 0.22
Nodes (8): RFC-1519, RFC-1918, RFC-3021, TEACHING_CONTENT, TEACHING_PART_1, TEACHING_PART_2, TEACHING_PART_3, TEACHING_PART_EXTENDED

### Community 9 - "network.js"
Cohesion: 0.19
Nodes (17): RFC-3927, RFC-4632, RFC-791, calculateSubnetDetails(), cidrToMaskLong(), getBitwiseAndBreakdown(), getMagicNumber(), getSpecialIpType() (+9 more)

### Community 10 - "GEMINI.md"
Cohesion: 0.40
Nodes (4): 1. Kieli & Kommunikaatio (Token-Optimointi), 2. IT Studio -laatustandardit (Professional Engineering), 3. Graphify Look Out (Arkkitehtuurikartoitus & Vertailu), 4. Git & Versiohallinta

## Knowledge Gaps
- **45 isolated node(s):** `RFC-791`, `RFC-1519`, `RFC-1918`, `RFC-3021`, `RFC-3927` (+40 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `RFC-791`, `RFC-1519`, `RFC-1918` to the rest of the system?**
  _45 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ui.js` be split into smaller, more focused modules?**
  _Cohesion score 0.12903225806451613 - nodes in this community are weakly interconnected._