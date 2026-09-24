# Graph Report - IP-submaskpeli  (2026-09-24)

## Corpus Check
- 32 files · ~496,460 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 27 file(s) not represented in the graph (top: .glb 11, .obj 5, .mtl 4)

## Summary
- 2012 nodes · 3928 edges · 144 communities (52 shown, 92 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 93 edges (avg confidence: 0.62)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `63602bee`
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
- i
- three.min.js
- .normalize
- vt
- update
- St
- tn
- Lt
- caveman.md
- rules/graphify.md
- studio_standards.md
- workflows/graphify.md
- copy
- Lc
- FBXTreeParser
- CyberTerminal
- no
- ct
- xc
- se
- Ne
- jc
- BinaryReader
- sn
- bl
- jt
- Ce
- .updateProjectionMatrix
- fflate.min.js
- GLTFLoader.js
- eh
- pt
- yt
- ws
- nl
- .constructor
- .loadMaterial
- GLTFParser
- yc
- .x
- nc
- ec
- yo
- re
- AnimationParser
- Hi
- FBXLoader.js
- TextParser
- GeometryParser
- .toJSON
- .applyMatrix4
- ti
- .fromArray
- ls
- rh
- SoundEngine
- AchievementSystem
- .fromJSON
- dl
- .setAttribute
- .loadTextureImage
- fa
- clone
- 🌐 Subnet Architect – Verkkoarkkitehti
- GLTFLoader
- Al
- .constructor
- ._update
- constructor
- At
- .invert
- cl
- wo
- GLTFLightsExtension
- OBJLoader
- Kh
- fl
- load
- el
- dn
- pl
- GLTFMeshStandardSGMaterial
- pi
- sc
- GLTFCubicSplineInterpolant
- GLTFMaterialsUnlitExtension
- GLTFMeshoptCompression
- Aa
- $c
- mn
- ms
- ss
- Ah
- ca
- cs
- Do
- Et
- hs
- qo
- Rs
- uo
- Zc
- zo
- temp.js
- gs
- ii
- $l
- .subVectors
- on
- pn
- Ra
- un
- .y
- ol
- ic
- uc
- rc
- cn

## God Nodes (most connected - your core abstractions)
1. `copy()` - 124 edges
2. `Lt` - 72 edges
3. `vt` - 53 edges
4. `St` - 50 edges
5. `Ce` - 43 edges
6. `ws()` - 42 edges
7. `tn` - 38 edges
8. `se` - 38 edges
9. `At` - 36 edges
10. `i()` - 35 edges

## Surprising Connections (you probably didn't know these)
- `ParserState()` --indirect_call--> `mi()`  [INFERRED]
  js/three/OBJLoader.js → js/three/three.min.js
- `ws()` --indirect_call--> `wt()`  [INFERRED]
  js/three/three.min.js → js/three/fflate.min.js
- `constructor()` --indirect_call--> `t()`  [INFERRED]
  js/three/three.min.js → js/three/fflate.min.js
- `ws()` --indirect_call--> `Mt()`  [INFERRED]
  js/three/three.min.js → js/three/fflate.min.js
- `ws()` --indirect_call--> `xt()`  [INFERRED]
  js/three/three.min.js → js/three/fflate.min.js

## Import Cycles
- None detected.

## Communities (144 total, 92 thin omitted)

### Community 0 - "nodes.js"
Cohesion: 0.17
Nodes (23): applyEnterpriseCeilingAp(), applyModelToNode(), assignDhcpIp(), checkConnections(), createLabelTexture(), createNode(), createZone(), createZoneLabelMesh() (+15 more)

### Community 1 - "state.js"
Cohesion: 0.11
Nodes (17): activePackets, cableActionState, cables, DEVICE_RULES, disposeHierarchy(), disposeMaterial(), IP_REQUIRED_TYPES, keys (+9 more)

### Community 2 - "ui.js"
Cohesion: 0.08
Nodes (42): batchAssignZoneIps(), calcBackspace(), calcClear(), calcDot(), calcEquals(), calcInputQuick(), calcNum(), calcOp() (+34 more)

### Community 3 - "game.js"
Cohesion: 0.21
Nodes (7): clearWorld(), closeAdminModal(), goToMenu(), hashAdminCredentials(), loadLevel(), nextLevel(), submitAdminAuth()

### Community 4 - "scene.js"
Cohesion: 0.31
Nodes (10): animate(), createDataConfetti(), createSparks(), getConfettiResources(), getDomRefs(), getSparkResources(), initThreeJS(), onPointerDown() (+2 more)

### Community 5 - "AGENTS.md"
Cohesion: 0.40
Nodes (4): 1. Kieli & Kommunikaatio (Token-Optimointi), 2. IT Studio -laatustandardit (Professional Engineering), 3. Graphify Look Out (Arkkitehtuurikartoitus & Vertailu), 4. Git & Versiohallinta

### Community 6 - "SKILL.md"
Cohesion: 0.40
Nodes (4): Auto-Clarity, Boundaries, Intensity, Rules

### Community 7 - "teaching.js"
Cohesion: 0.22
Nodes (8): RFC-1519, RFC-1918, RFC-3021, TEACHING_CONTENT, TEACHING_PART_1, TEACHING_PART_2, TEACHING_PART_3, TEACHING_PART_EXTENDED

### Community 8 - "cables.js"
Cohesion: 0.39
Nodes (7): connectNodes(), createCableVisual(), getCableError(), getPacketGeometry(), handleCableTool(), simulatePingPacket(), spawnPacket()

### Community 9 - "network.js"
Cohesion: 0.19
Nodes (17): RFC-3927, RFC-4632, RFC-791, calculateSubnetDetails(), cidrToMaskLong(), getBitwiseAndBreakdown(), getMagicNumber(), getSpecialIpType() (+9 more)

### Community 10 - "GEMINI.md"
Cohesion: 0.40
Nodes (4): 1. Kieli & Kommunikaatio (Token-Optimointi), 2. IT Studio -laatustandardit (Professional Engineering), 3. Graphify Look Out (Arkkitehtuurikartoitus & Vertailu), 4. Git & Versiohallinta

### Community 12 - "i"
Cohesion: 0.16
Nodes (7): t(), ei, gn(), hl, i(), ps(), rt

### Community 13 - "three.min.js"
Cohesion: 0.03
Nodes (15): an, Ba, br(), bs, fn, gl, hn, mr() (+7 more)

### Community 16 - "update"
Cohesion: 0.18
Nodes (5): fi(), Ga, Mh, update(), wh()

### Community 18 - "tn"
Cohesion: 0.07
Nodes (5): dt(), $e(), Qe(), tn, ut()

### Community 24 - "copy"
Cohesion: 0.17
Nodes (3): as(), copy(), go

### Community 25 - "Lc"
Cohesion: 0.08
Nodes (4): bc, getInput(), getOutput(), Lc

### Community 26 - "FBXTreeParser"
Cohesion: 0.11
Nodes (4): FBXTree, FBXTreeParser, generateTransform(), getEulerOrder()

### Community 28 - "no"
Cohesion: 0.11
Nodes (17): co(), eo(), ho(), io(), ja(), ka(), lo(), no() (+9 more)

### Community 29 - "ct"
Cohesion: 0.07
Nodes (5): bt, ct(), es(), qc, Xe()

### Community 38 - "bl"
Cohesion: 0.07
Nodes (5): bl, dc, mc(), pc, zl

### Community 41 - ".updateProjectionMatrix"
Cohesion: 0.12
Nodes (3): Jl, Kn, vl()

### Community 42 - "fflate.min.js"
Cohesion: 0.18
Nodes (18): At(), bt(), Ct(), Gt(), Ht(), It(), Kt(), Lt() (+10 more)

### Community 43 - "GLTFLoader.js"
Cohesion: 0.14
Nodes (13): addMorphTargets(), addPrimitiveAttributes(), assignExtrasToUserData(), computeBounds(), createAttributesKey(), createDefaultMaterial(), createPrimitiveKey(), getNormalizedComponentScale() (+5 more)

### Community 47 - "ws"
Cohesion: 0.08
Nodes (8): _a, ft(), mt(), sl, _t, Tt, uh(), ws()

### Community 48 - "nl"
Cohesion: 0.06
Nodes (5): il(), Ll, ml, nl, Rl

### Community 49 - ".constructor"
Cohesion: 0.10
Nodes (3): parseObject(), xs, ys

### Community 50 - ".loadMaterial"
Cohesion: 0.12
Nodes (4): GLTFMaterialsClearcoatExtension, GLTFMaterialsPbrSpecularGlossinessExtension, GLTFMaterialsTransmissionExtension, GLTFTextureTransformExtension

### Community 52 - "GLTFParser"
Cohesion: 0.23
Nodes (3): addUnknownExtensionsToUserData(), buildNodeHierachy(), GLTFParser

### Community 54 - ".x"
Cohesion: 0.15
Nodes (15): _allocateTargets(), _applyPMREM(), _blur(), _cleanup(), fromCubemap(), fromEquirectangular(), fromScene(), _fromTexture() (+7 more)

### Community 60 - "Hi"
Cohesion: 0.13
Nodes (14): er(), Hi(), ji(), Jr(), ki(), kr(), nr(), qi() (+6 more)

### Community 61 - "FBXLoader.js"
Cohesion: 0.21
Nodes (10): convertArrayBufferToString(), FBXLoader, getData(), getFbxVersion(), inject(), isFbxFormatASCII(), isFbxFormatBinary(), TODO: this is not correct - FBX calculates outer and inner angle in degrees (+2 more)

### Community 62 - "TextParser"
Cohesion: 0.28
Nodes (3): append(), parseNumberArray(), TextParser

### Community 64 - ".toJSON"
Cohesion: 0.13
Nodes (3): ac, tc, ts()

### Community 66 - "ti"
Cohesion: 0.22
Nodes (5): bind(), getValue(), setValue(), Si(), ti

### Community 67 - ".fromArray"
Cohesion: 0.10
Nodes (5): fh, ia, la, oi(), parseTextures()

### Community 72 - "AchievementSystem"
Cohesion: 0.23
Nodes (6): achievements, ACHIEVEMENTS_DATA, AchievementSystem, closeAchievementsModal(), openAchievementsModal(), unlockAchievement()

### Community 73 - ".fromJSON"
Cohesion: 0.31
Nodes (6): bindSkeletons(), parse(), parseAnimations(), parseGeometries(), parseShapes(), parseSkeletons()

### Community 75 - ".setAttribute"
Cohesion: 0.11
Nodes (7): ao(), bo, ci, Da, en, Pa, Yh()

### Community 76 - ".loadTextureImage"
Cohesion: 0.21
Nodes (3): GLTFTextureBasisUExtension, GLTFTextureWebPExtension, resolveURL()

### Community 78 - "clone"
Cohesion: 0.13
Nodes (4): clone(), kl, us(), Wl

### Community 79 - "🌐 Subnet Architect – Verkkoarkkitehti"
Cohesion: 0.17
Nodes (11): 💻 Asennus ja paikallinen käynnistys, 🎯 Esittely, 🚀 Jatkokehityssuunnitelma (Roadmap), 🖲️ Laitteet ja 3D-mallit, 📄 Lisenssi, 🎓 Pedagogiikka & CCNA Pro Master, ✨ Pääominaisuudet, 📖 Sisällysluettelo (+3 more)

### Community 82 - ".constructor"
Cohesion: 0.27
Nodes (3): fo(), mo(), po

### Community 84 - "constructor"
Cohesion: 0.22
Nodes (4): bn(), constructor(), setDirection(), setLength()

### Community 86 - ".invert"
Cohesion: 0.10
Nodes (4): hh, qn, _s(), updateMatrixWorld()

### Community 93 - "Kh"
Cohesion: 0.33
Nodes (7): compileCubemapShader(), compileEquirectangularShader(), _compileMaterial(), $h(), Kh(), qh(), tu()

### Community 95 - "load"
Cohesion: 0.21
Nodes (5): load(), oc, parseImages(), ul, vc

### Community 97 - "dn"
Cohesion: 0.14
Nodes (4): dn, fs, li(), ln

### Community 100 - "pi"
Cohesion: 0.22
Nodes (6): dispose(), ni, pi(), Xn(), yi(), yn()

### Community 107 - "$c"
Cohesion: 0.67
Nodes (4): $c(), intersectObject(), intersectObjects(), Kc()

### Community 136 - ".subVectors"
Cohesion: 0.10
Nodes (3): je, jn(), Vs

### Community 151 - ".y"
Cohesion: 0.16
Nodes (4): ds(), ge, gi(), mi()

## Knowledge Gaps
- **67 isolated node(s):** `masterStarLevels`, `levels`, `nodeTypes`, `IP_REQUIRED_TYPES`, `LINK_TYPES` (+62 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 650 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **92 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ls()` connect `ls` to `GLTFMeshoptCompression`, `i`, `three.min.js`, `.getX`, `GLTFParser`, `.computeVertexNormals`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Why does `i()` connect `i` to `ls`, `bl`, `ol`, `.subVectors`, `.setAttribute`, `three.min.js`, `Hi`, `update`, `.constructor`, `constructor`, `.invert`, `.y`, `copy`, `FBXTreeParser`, `no`, `uc`, `load`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Why does `copy()` connect `copy` to `.subVectors`, `three.min.js`, `.normalize`, `update`, `tn`, `.y`, `no`, `ct`, `se`, `Ne`, `jc`, `.copy`, `sn`, `bl`, `jt`, `Ce`, `.updateProjectionMatrix`, `eh`, `pt`, `yt`, `ws`, `nl`, `.constructor`, `.x`, `nc`, `ec`, `re`, `.toJSON`, `.applyMatrix4`, `.fromArray`, `rh`, `dl`, `.setAttribute`, `fa`, `clone`, `Al`, `.constructor`, `.invert`, `fl`, `el`, `pl`, `pi`, `sc`, `Aa`, `ca`, `cs`, `Do`, `hs`, `Rs`, `uo`, `zo`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **What connects `masterStarLevels`, `levels`, `nodeTypes` to the rest of the system?**
  _67 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `state.js` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `ui.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08144796380090498 - nodes in this community are weakly interconnected._
- **Should `three.min.js` be split into smaller, more focused modules?**
  _Cohesion score 0.03221153846153846 - nodes in this community are weakly interconnected._