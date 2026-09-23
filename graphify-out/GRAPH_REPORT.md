# Graph Report - IP-submaskpeli  (2026-09-23)

## Corpus Check
- 32 files · ~493,663 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1993 nodes · 3884 edges · 151 communities (61 shown, 90 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 90 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `161cf560`
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
- At
- vt
- .setAttribute
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
- yc
- BinaryReader
- .subVectors
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
- .getY
- GLTFParser
- .dot
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
- clone
- .fromArray
- ls
- .dispatchEvent
- SoundEngine
- .isEmpty
- AchievementSystem
- .apply
- .toArray
- ml
- .loadTextureImage
- fa
- us
- 🌐 Subnet Architect – Verkkoarkkitehti
- GLTFLoader
- .fromJSON
- .constructor
- wo
- .updateMatrix
- updateMatrixWorld
- .invert
- ia
- zl
- GLTFLightsExtension
- OBJLoader
- Kh
- fl
- Rl
- el
- Ll
- pl
- GLTFMeshStandardSGMaterial
- qn
- sc
- GLTFCubicSplineInterpolant
- GLTFMaterialsUnlitExtension
- GLTFMeshoptCompression
- Aa
- $c
- mn
- ms
- ss
- ts
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
- an
- Ba
- dn
- fn
- fs
- gl
- gs
- hn
- ii
- $l
- li
- ln
- on
- pn
- Ra
- sh
- un

## God Nodes (most connected - your core abstractions)
1. `copy()` - 124 edges
2. `Lt` - 72 edges
3. `vt` - 53 edges
4. `St` - 50 edges
5. `Ce` - 43 edges
6. `ws()` - 42 edges
7. `se` - 38 edges
8. `tn` - 38 edges
9. `At` - 36 edges
10. `i()` - 35 edges

## Surprising Connections (you probably didn't know these)
- `ParserState()` --indirect_call--> `mi()`  [INFERRED]
  js/three/OBJLoader.js → js/three/three.min.js
- `ws()` --indirect_call--> `wt()`  [INFERRED]
  js/three/three.min.js → js/three/fflate.min.js
- `t()` --indirect_call--> `i()`  [INFERRED]
  js/three/fflate.min.js → js/three/three.min.js
- `ws()` --indirect_call--> `xt()`  [INFERRED]
  js/three/three.min.js → js/three/fflate.min.js
- `ws()` --indirect_call--> `Mt()`  [INFERRED]
  js/three/three.min.js → js/three/fflate.min.js

## Import Cycles
- None detected.

## Communities (151 total, 90 thin omitted)

### Community 0 - "nodes.js"
Cohesion: 0.17
Nodes (23): applyEnterpriseCeilingAp(), applyModelToNode(), assignDhcpIp(), checkConnections(), createLabelTexture(), createNode(), createZone(), createZoneLabelMesh() (+15 more)

### Community 1 - "state.js"
Cohesion: 0.11
Nodes (17): activePackets, cableActionState, cables, DEVICE_RULES, disposeHierarchy(), disposeMaterial(), IP_REQUIRED_TYPES, keys (+9 more)

### Community 2 - "ui.js"
Cohesion: 0.10
Nodes (31): calcBackspace(), calcClear(), calcDot(), calcEquals(), calcInputQuick(), calcNum(), calcOp(), calcPower2() (+23 more)

### Community 3 - "game.js"
Cohesion: 0.39
Nodes (4): clearWorld(), goToMenu(), loadLevel(), nextLevel()

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
Cohesion: 0.05
Nodes (22): cl, dispose(), ei, gn(), hl, i(), ic, load() (+14 more)

### Community 13 - "three.min.js"
Cohesion: 0.04
Nodes (15): br(), bs, ci, cn, Da, fi(), mr(), Na (+7 more)

### Community 14 - "At"
Cohesion: 0.05
Nodes (4): At, ds(), fe, ge

### Community 16 - ".setAttribute"
Cohesion: 0.09
Nodes (7): t(), bo, constructor(), en, setDirection(), update(), wh()

### Community 18 - "tn"
Cohesion: 0.07
Nodes (5): dt(), $e(), Qe(), tn, ut()

### Community 24 - "copy"
Cohesion: 0.14
Nodes (3): as(), copy(), parseObject()

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
Cohesion: 0.08
Nodes (5): bt, ct(), es(), qc, Xe()

### Community 36 - ".subVectors"
Cohesion: 0.12
Nodes (3): je, jn(), Vs

### Community 38 - "bl"
Cohesion: 0.12
Nodes (4): bl, dc, mc(), pc

### Community 41 - ".updateProjectionMatrix"
Cohesion: 0.12
Nodes (3): Jl, Kn, vl()

### Community 42 - "fflate.min.js"
Cohesion: 0.17
Nodes (18): At(), bn(), bt(), Ct(), Gt(), Ht(), It(), Kt() (+10 more)

### Community 43 - "GLTFLoader.js"
Cohesion: 0.14
Nodes (13): addMorphTargets(), addPrimitiveAttributes(), assignExtrasToUserData(), computeBounds(), createAttributesKey(), createDefaultMaterial(), createPrimitiveKey(), getNormalizedComponentScale() (+5 more)

### Community 47 - "ws"
Cohesion: 0.11
Nodes (9): wt(), _a, ft(), gi(), mi(), mt(), sl, _t (+1 more)

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
Cohesion: 0.12
Nodes (14): er(), Hi(), ji(), Jr(), ki(), kr(), nr(), qi() (+6 more)

### Community 61 - "FBXLoader.js"
Cohesion: 0.21
Nodes (10): convertArrayBufferToString(), FBXLoader, getData(), getFbxVersion(), inject(), isFbxFormatASCII(), isFbxFormatBinary(), TODO: this is not correct - FBX calculates outer and inner angle in degrees (+2 more)

### Community 62 - "TextParser"
Cohesion: 0.28
Nodes (3): append(), parseNumberArray(), TextParser

### Community 64 - ".toJSON"
Cohesion: 0.14
Nodes (3): ac, go, tc

### Community 66 - "clone"
Cohesion: 0.13
Nodes (6): clone(), pi(), Si(), ti, Xn(), yn()

### Community 72 - "AchievementSystem"
Cohesion: 0.23
Nodes (6): achievements, ACHIEVEMENTS_DATA, AchievementSystem, closeAchievementsModal(), openAchievementsModal(), unlockAchievement()

### Community 73 - ".apply"
Cohesion: 0.17
Nodes (7): bind(), bindSkeletons(), getValue(), hh, parseSkeletons(), setValue(), uh()

### Community 74 - ".toArray"
Cohesion: 0.15
Nodes (3): dl, fh, oi()

### Community 76 - ".loadTextureImage"
Cohesion: 0.21
Nodes (3): GLTFTextureBasisUExtension, GLTFTextureWebPExtension, resolveURL()

### Community 77 - "fa"
Cohesion: 0.18
Nodes (3): fa, ta, Wn

### Community 78 - "us"
Cohesion: 0.21
Nodes (3): kl, ni, us()

### Community 79 - "🌐 Subnet Architect – Verkkoarkkitehti"
Cohesion: 0.17
Nodes (11): 💻 Asennus ja paikallinen käynnistys, 🎯 Esittely, 🚀 Jatkokehityssuunnitelma (Roadmap), 🖲️ Laitteet ja 3D-mallit, 📄 Lisenssi, 🎓 Pedagogiikka & CCNA Pro Master, ✨ Pääominaisuudet, 📖 Sisällysluettelo (+3 more)

### Community 81 - ".fromJSON"
Cohesion: 0.18
Nodes (3): Al, parseGeometries(), parseShapes()

### Community 82 - ".constructor"
Cohesion: 0.25
Nodes (3): fo(), mo(), po

### Community 83 - "wo"
Cohesion: 0.18
Nodes (3): jo, wo, xo

### Community 93 - "Kh"
Cohesion: 0.33
Nodes (7): compileCubemapShader(), compileEquirectangularShader(), _compileMaterial(), $h(), Kh(), qh(), tu()

### Community 107 - "$c"
Cohesion: 0.67
Nodes (4): $c(), intersectObject(), intersectObjects(), Kc()

## Knowledge Gaps
- **67 isolated node(s):** `ACHIEVEMENTS_DATA`, `achievements`, `audio`, `RFC-791`, `RFC-1519` (+62 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **90 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `i()` connect `i` to `.subVectors`, `.dispatchEvent`, `bl`, `ls`, `three.min.js`, `Hi`, `ws`, `.setAttribute`, `.constructor`, `.constructor`, `.invert`, `FBXTreeParser`, `no`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Why does `ls()` connect `ls` to `.applyMatrix4`, `GLTFMeshoptCompression`, `i`, `three.min.js`, `.getY`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Why does `FBXTreeParser` connect `FBXTreeParser` to `FBXLoader.js`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **What connects `ACHIEVEMENTS_DATA`, `achievements`, `audio` to the rest of the system?**
  _67 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `state.js` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `ui.js` be split into smaller, more focused modules?**
  _Cohesion score 0.09716599190283401 - nodes in this community are weakly interconnected._
- **Should `i` be split into smaller, more focused modules?**
  _Cohesion score 0.05357142857142857 - nodes in this community are weakly interconnected._