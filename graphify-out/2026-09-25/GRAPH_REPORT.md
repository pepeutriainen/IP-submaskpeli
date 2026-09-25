# Graph Report - IP-submaskpeli  (2026-09-24)

## Corpus Check
- 32 files · ~496,464 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 27 file(s) not represented in the graph (top: .glb 11, .obj 5, .mtl 4)

## Summary
- 2013 nodes · 3929 edges · 153 communities (48 shown, 105 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 94 edges (avg confidence: 0.62)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b9427a59`
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
- ml
- vt
- zl
- St
- tn
- Lt
- caveman.md
- rules/graphify.md
- studio_standards.md
- workflows/graphify.md
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
- ws
- GLTFLoader.js
- eh
- pt
- yt
- .test
- nl
- .distanceTo
- .loadMaterial
- GLTFParser
- yc
- _fromTexture
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
- .apply
- .toArray
- ls
- ia
- SoundEngine
- .isEmpty
- AchievementSystem
- .fromJSON
- .fromArray
- .setAttribute
- .loadTextureImage
- ta
- copy
- 🌐 Subnet Architect – Verkkoarkkitehti
- GLTFLoader
- Al
- ._update
- en
- At
- .constructor
- vl
- cl
- GLTFLightsExtension
- OBJLoader
- Kh
- fl
- load
- el
- dn
- pl
- GLTFMeshStandardSGMaterial
- dispose
- Ba
- GLTFCubicSplineInterpolant
- GLTFMaterialsUnlitExtension
- GLTFMeshoptCompression
- Aa
- fn
- mn
- ms
- ss
- fs
- Ah
- ca
- cs
- Do
- Et
- hs
- gl
- qo
- Rs
- uo
- Zc
- zo
- temp.js
- hn
- ln
- oc
- gs
- Ql
- an
- $l
- sh
- .subVectors
- vc
- Yl
- pn
- un
- .fromBufferAttribute
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
- `t()` --indirect_call--> `i()`  [INFERRED]
  js/three/fflate.min.js → js/three/three.min.js
- `ws()` --indirect_call--> `wt()`  [INFERRED]
  js/three/three.min.js → js/three/fflate.min.js
- `constructor()` --indirect_call--> `t()`  [INFERRED]
  js/three/three.min.js → js/three/fflate.min.js
- `ws()` --indirect_call--> `Mt()`  [INFERRED]
  js/three/three.min.js → js/three/fflate.min.js

## Import Cycles
- None detected.

## Communities (153 total, 105 thin omitted)

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
Cohesion: 0.19
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
Cohesion: 0.18
Nodes (6): ei, gn(), hl, i(), ps(), rt

### Community 13 - "three.min.js"
Cohesion: 0.03
Nodes (16): br(), bs, ci, Da, fi(), li(), mr(), Na (+8 more)

### Community 18 - "tn"
Cohesion: 0.07
Nodes (5): dt(), $e(), Qe(), tn, ut()

### Community 25 - "Lc"
Cohesion: 0.08
Nodes (4): bc, getInput(), getOutput(), Lc

### Community 26 - "FBXTreeParser"
Cohesion: 0.11
Nodes (4): FBXTree, FBXTreeParser, generateTransform(), getEulerOrder()

### Community 28 - "no"
Cohesion: 0.11
Nodes (18): ao(), co(), eo(), ho(), io(), ja(), ka(), lo() (+10 more)

### Community 29 - "ct"
Cohesion: 0.07
Nodes (5): bt, ct(), es(), qc, Xe()

### Community 38 - "bl"
Cohesion: 0.12
Nodes (4): bl, dc, mc(), pc

### Community 42 - "ws"
Cohesion: 0.05
Nodes (26): At(), bn(), bt(), Ct(), Gt(), Ht(), It(), Kt() (+18 more)

### Community 43 - "GLTFLoader.js"
Cohesion: 0.14
Nodes (13): addMorphTargets(), addPrimitiveAttributes(), assignExtrasToUserData(), computeBounds(), createAttributesKey(), createDefaultMaterial(), createPrimitiveKey(), getNormalizedComponentScale() (+5 more)

### Community 47 - ".test"
Cohesion: 0.22
Nodes (7): $c(), intersectObject(), intersectObjects(), Kc(), mt(), sl, _t

### Community 50 - ".loadMaterial"
Cohesion: 0.12
Nodes (4): GLTFMaterialsClearcoatExtension, GLTFMaterialsPbrSpecularGlossinessExtension, GLTFMaterialsTransmissionExtension, GLTFTextureTransformExtension

### Community 52 - "GLTFParser"
Cohesion: 0.25
Nodes (3): addUnknownExtensionsToUserData(), buildNodeHierachy(), GLTFParser

### Community 54 - "_fromTexture"
Cohesion: 0.16
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
Cohesion: 0.10
Nodes (4): ac, go, sc, tc

### Community 65 - ".applyMatrix4"
Cohesion: 0.14
Nodes (4): ai, Ea(), fa, Wn

### Community 66 - ".apply"
Cohesion: 0.15
Nodes (7): bind(), bindSkeletons(), getValue(), hh, parseSkeletons(), setValue(), uh()

### Community 67 - ".toArray"
Cohesion: 0.15
Nodes (3): fh, la, oi()

### Community 72 - "AchievementSystem"
Cohesion: 0.23
Nodes (6): achievements, ACHIEVEMENTS_DATA, AchievementSystem, closeAchievementsModal(), openAchievementsModal(), unlockAchievement()

### Community 73 - ".fromJSON"
Cohesion: 0.13
Nodes (4): Ll, parseGeometries(), parseShapes(), Rl

### Community 75 - ".setAttribute"
Cohesion: 0.12
Nodes (6): t(), constructor(), ht(), mo(), po, setDirection()

### Community 76 - ".loadTextureImage"
Cohesion: 0.21
Nodes (3): GLTFTextureBasisUExtension, GLTFTextureWebPExtension, resolveURL()

### Community 78 - "copy"
Cohesion: 0.11
Nodes (7): bo, clone(), copy(), fo(), qn, Xn(), yn()

### Community 79 - "🌐 Subnet Architect – Verkkoarkkitehti"
Cohesion: 0.17
Nodes (11): 💻 Asennus ja paikallinen käynnistys, 🎯 Esittely, 🚀 Jatkokehityssuunnitelma (Roadmap), 🖲️ Laitteet ja 3D-mallit, 📄 Lisenssi, 🎓 Pedagogiikka & CCNA Pro Master, ✨ Pääominaisuudet, 📖 Sisällysluettelo (+3 more)

### Community 83 - "._update"
Cohesion: 0.15
Nodes (3): jo, wo, xo

### Community 84 - "en"
Cohesion: 0.10
Nodes (3): en, Si(), ti

### Community 85 - "At"
Cohesion: 0.05
Nodes (4): At, ds(), fe, ge

### Community 86 - ".constructor"
Cohesion: 0.08
Nodes (10): as(), kl, mi(), pi(), _s(), setFromCamera(), update(), updateMatrixWorld() (+2 more)

### Community 93 - "Kh"
Cohesion: 0.33
Nodes (7): compileCubemapShader(), compileEquirectangularShader(), _compileMaterial(), $h(), Kh(), qh(), tu()

### Community 95 - "load"
Cohesion: 0.40
Nodes (4): load(), parse(), parseAnimations(), parseImages()

### Community 100 - "dispose"
Cohesion: 0.50
Nodes (3): dispose(), ni, yi()

### Community 133 - "an"
Cohesion: 0.20
Nodes (3): an, ii, Ra

### Community 136 - ".subVectors"
Cohesion: 0.10
Nodes (3): je, jn(), Vs

### Community 154 - "ol"
Cohesion: 0.18
Nodes (3): ol, setTexturePath(), ul

## Knowledge Gaps
- **67 isolated node(s):** `masterStarLevels`, `levels`, `nodeTypes`, `IP_REQUIRED_TYPES`, `LINK_TYPES` (+62 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 651 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **105 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `i()` connect `i` to `ls`, `bl`, `ol`, `.subVectors`, `.setAttribute`, `three.min.js`, `Hi`, `.constructor`, `FBXTreeParser`, `no`, `uc`, `load`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Why does `FBXTreeParser` connect `FBXTreeParser` to `FBXLoader.js`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `ls()` connect `ls` to `GLTFMeshoptCompression`, `i`, `three.min.js`, `.getX`, `.fromBufferAttribute`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **What connects `masterStarLevels`, `levels`, `nodeTypes` to the rest of the system?**
  _67 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `state.js` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `ui.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08144796380090498 - nodes in this community are weakly interconnected._
- **Should `three.min.js` be split into smaller, more focused modules?**
  _Cohesion score 0.03442622950819672 - nodes in this community are weakly interconnected._