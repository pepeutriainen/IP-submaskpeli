# Graph Report - IP-submaskpeli  (2026-09-24)

## Corpus Check
- 32 files · ~494,882 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1996 nodes · 3900 edges · 166 communities (66 shown, 100 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 90 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d7947ffd`
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
- .dot
- jc
- update
- BinaryReader
- je
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
- rh
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
- ti
- .fromArray
- ls
- Tt
- SoundEngine
- AchievementSystem
- .fromJSON
- dl
- .normalize
- .loadTextureImage
- fa
- us
- 🌐 Subnet Architect – Verkkoarkkitehti
- GLTFLoader
- Al
- .constructor
- wo
- clone
- fe
- .invert
- .toArray
- zl
- GLTFLightsExtension
- OBJLoader
- Kh
- fl
- load
- el
- Ll
- pl
- GLTFMeshStandardSGMaterial
- .updateWorldMatrix
- sc
- GLTFCubicSplineInterpolant
- GLTFMaterialsUnlitExtension
- GLTFMeshoptCompression
- Aa
- .test
- mn
- ms
- ss
- .distanceToPoint
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
- .distanceTo
- gl
- gs
- hn
- ii
- $l
- li
- jn
- on
- pn
- Ra
- un
- ds
- ._update
- ol
- .y
- ic
- ac
- uc
- vl
- _o
- rc
- cn
- oc
- Ql
- vc

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
- `constructor()` --indirect_call--> `t()`  [INFERRED]
  js/three/three.min.js → js/three/fflate.min.js
- `ws()` --indirect_call--> `xt()`  [INFERRED]
  js/three/three.min.js → js/three/fflate.min.js

## Import Cycles
- None detected.

## Communities (166 total, 100 thin omitted)

### Community 0 - "nodes.js"
Cohesion: 0.17
Nodes (23): applyEnterpriseCeilingAp(), applyModelToNode(), assignDhcpIp(), checkConnections(), createLabelTexture(), createNode(), createZone(), createZoneLabelMesh() (+15 more)

### Community 1 - "state.js"
Cohesion: 0.11
Nodes (17): activePackets, cableActionState, cables, DEVICE_RULES, disposeHierarchy(), disposeMaterial(), IP_REQUIRED_TYPES, keys (+9 more)

### Community 2 - "ui.js"
Cohesion: 0.10
Nodes (34): batchAssignZoneIps(), calcBackspace(), calcClear(), calcDot(), calcEquals(), calcInputQuick(), calcNum(), calcOp() (+26 more)

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
Cohesion: 0.18
Nodes (8): dispose(), ei, gn(), hl, i(), ps(), rt, yi()

### Community 13 - "three.min.js"
Cohesion: 0.04
Nodes (11): br(), bs, fs, ln, mr(), Na, setFromCartesianCoords(), setFromVector3() (+3 more)

### Community 16 - ".setAttribute"
Cohesion: 0.13
Nodes (6): t(), ci, en, Ga, Pa, Yh()

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
Cohesion: 0.08
Nodes (5): bt, ct(), es(), qc, Xe()

### Community 33 - "jc"
Cohesion: 0.05
Nodes (5): bind(), bindSkeletons(), getValue(), jc, yc

### Community 34 - "update"
Cohesion: 0.14
Nodes (7): constructor(), fi(), Mh, setDirection(), setLength(), update(), wh()

### Community 38 - "bl"
Cohesion: 0.12
Nodes (4): bl, dc, mc(), pc

### Community 42 - "fflate.min.js"
Cohesion: 0.19
Nodes (18): At(), bn(), bt(), Ct(), Gt(), Ht(), It(), Kt() (+10 more)

### Community 43 - "GLTFLoader.js"
Cohesion: 0.14
Nodes (13): addMorphTargets(), addPrimitiveAttributes(), assignExtrasToUserData(), computeBounds(), createAttributesKey(), createDefaultMaterial(), createPrimitiveKey(), getNormalizedComponentScale() (+5 more)

### Community 47 - "ws"
Cohesion: 0.13
Nodes (7): wt(), _a, ft(), hh, setValue(), uh(), ws()

### Community 48 - "nl"
Cohesion: 0.07
Nodes (4): il(), ml, nl, Rl

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
Cohesion: 0.13
Nodes (3): go, tc, ts()

### Community 65 - ".applyMatrix4"
Cohesion: 0.24
Nodes (3): Ea(), setFromCamera(), Wn

### Community 66 - "ti"
Cohesion: 0.18
Nodes (5): pi(), Si(), ti, Xn(), yn()

### Community 72 - "AchievementSystem"
Cohesion: 0.23
Nodes (6): achievements, ACHIEVEMENTS_DATA, AchievementSystem, closeAchievementsModal(), openAchievementsModal(), unlockAchievement()

### Community 73 - ".fromJSON"
Cohesion: 0.15
Nodes (4): cl, parseGeometries(), parseShapes(), parseSkeletons()

### Community 75 - ".normalize"
Cohesion: 0.20
Nodes (3): bo, Da, ht()

### Community 76 - ".loadTextureImage"
Cohesion: 0.21
Nodes (3): GLTFTextureBasisUExtension, GLTFTextureWebPExtension, resolveURL()

### Community 78 - "us"
Cohesion: 0.18
Nodes (3): kl, ni, us()

### Community 79 - "🌐 Subnet Architect – Verkkoarkkitehti"
Cohesion: 0.17
Nodes (11): 💻 Asennus ja paikallinen käynnistys, 🎯 Esittely, 🚀 Jatkokehityssuunnitelma (Roadmap), 🖲️ Laitteet ja 3D-mallit, 📄 Lisenssi, 🎓 Pedagogiikka & CCNA Pro Master, ✨ Pääominaisuudet, 📖 Sisällysluettelo (+3 more)

### Community 82 - ".constructor"
Cohesion: 0.25
Nodes (3): fo(), mo(), po

### Community 83 - "wo"
Cohesion: 0.18
Nodes (3): jo, wo, xo

### Community 86 - ".invert"
Cohesion: 0.14
Nodes (3): _s(), updateMatrixWorld(), Yl

### Community 87 - ".toArray"
Cohesion: 0.16
Nodes (3): fh, ia, oi()

### Community 93 - "Kh"
Cohesion: 0.33
Nodes (7): compileCubemapShader(), compileEquirectangularShader(), _compileMaterial(), $h(), Kh(), qh(), tu()

### Community 95 - "load"
Cohesion: 0.28
Nodes (5): load(), parse(), parseAnimations(), parseImages(), ul

### Community 107 - ".test"
Cohesion: 0.22
Nodes (7): $c(), intersectObject(), intersectObjects(), Kc(), mt(), sl, _t

## Knowledge Gaps
- **67 isolated node(s):** `ACHIEVEMENTS_DATA`, `achievements`, `audio`, `RFC-791`, `RFC-1519` (+62 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **100 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `i()` connect `i` to `three.min.js`, `.setAttribute`, `ol`, `FBXTreeParser`, `.y`, `no`, `uc`, `.dot`, `update`, `je`, `bl`, `.constructor`, `Hi`, `ti`, `ls`, `.normalize`, `.constructor`, `.invert`, `load`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Why does `ls()` connect `ls` to `GLTFMeshoptCompression`, `i`, `three.min.js`, `.getX`, `.computeVertexNormals`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Why does `FBXTreeParser` connect `FBXTreeParser` to `FBXLoader.js`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **What connects `ACHIEVEMENTS_DATA`, `achievements`, `audio` to the rest of the system?**
  _67 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `state.js` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `ui.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10220673635307782 - nodes in this community are weakly interconnected._
- **Should `three.min.js` be split into smaller, more focused modules?**
  _Cohesion score 0.03696741854636591 - nodes in this community are weakly interconnected._