# Graph Report - .  (2026-09-12)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 104 nodes · 145 edges · 20 communities (19 shown, 1 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- nodes.js
- state.js
- ui.js
- game.js
- scene.js
- calcUpdateScreen
- openIpModal
- teaching.js
- cables.js
- network.js
- submitIp

## God Nodes (most connected - your core abstractions)
1. `calcUpdateScreen()` - 9 edges
2. `checkConnections()` - 7 edges
3. `updateNodeVisualState()` - 7 edges
4. `createNode()` - 6 edges
5. `openIpModal()` - 6 edges
6. `tryLoadCustomModel()` - 5 edges
7. `updateNodeLabel()` - 5 edges
8. `submitIp()` - 5 edges
9. `initThreeJS()` - 5 edges
10. `getNodeSubnetScope()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `submitIp()` --calls--> `getNodeSubnetScope()`  [EXTRACTED]
  js/ui.js → js/ui.js  _Bridges community 10 → community 6_
- `calcClear()` --calls--> `calcUpdateScreen()`  [EXTRACTED]
  js/ui.js → js/ui.js  _Bridges community 5 → community 6_

## Import Cycles
- None detected.

## Communities (20 total, 1 thin omitted)

### Community 0 - "nodes.js"
Cohesion: 0.21
Nodes (19): applyEnterpriseCeilingAp(), applyModelToNode(), assignDhcpIp(), checkConnections(), createLabelTexture(), createNode(), createZone(), createZoneLabelMesh() (+11 more)

### Community 1 - "state.js"
Cohesion: 0.15
Nodes (12): cableActionState, cables, DEVICE_RULES, IP_REQUIRED_TYPES, keys, labelMeshes, levels, nodes (+4 more)

### Community 2 - "ui.js"
Cohesion: 0.31
Nodes (5): calcState, getDifficultyColor(), getDifficultyStars(), updateLevelUI(), updateToolbarForLevel()

### Community 3 - "game.js"
Cohesion: 0.39
Nodes (4): clearWorld(), goToMenu(), loadLevel(), nextLevel()

### Community 4 - "scene.js"
Cohesion: 0.39
Nodes (5): animate(), initThreeJS(), onPointerDown(), onPointerMove(), onWindowResize()

### Community 5 - "calcUpdateScreen"
Cohesion: 0.29
Nodes (8): calcBackspace(), calcDot(), calcEquals(), calcInputQuick(), calcNum(), calcOp(), calcPower2(), calcUpdateScreen()

### Community 6 - "openIpModal"
Cohesion: 0.32
Nodes (8): calcClear(), getNodeSubnetScope(), openIpModal(), saveIpInputsToMemory(), selectNodeInModal(), setupOctetInputs(), switchHelpTab(), updateModalDeviceList()

### Community 7 - "teaching.js"
Cohesion: 0.33
Nodes (5): RFC-1918, TEACHING_CONTENT, TEACHING_PART_1, TEACHING_PART_2, TEACHING_PART_3

### Community 9 - "network.js"
Cohesion: 0.70
Nodes (4): calculateSubnetDetails(), ip2long(), isIpInSubnet(), long2ip()

### Community 10 - "submitIp"
Cohesion: 0.50
Nodes (4): closeIpModal(), showToast(), submitIp(), updateGoalUI()

## Knowledge Gaps
- **20 isolated node(s):** `customModels`, `modelCache`, `cableActionState`, `cables`, `DEVICE_RULES` (+15 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `calcUpdateScreen()` connect `calcUpdateScreen` to `ui.js`, `openIpModal`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **What connects `customModels`, `modelCache`, `cableActionState` to the rest of the system?**
  _20 weakly-connected nodes found - possible documentation gaps or missing edges._