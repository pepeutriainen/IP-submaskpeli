# Graph Report - IP-submaskpeli  (2026-09-24)

## Corpus Check
- 32 files · ~495,457 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2000 nodes · 3906 edges · 157 communities (66 shown, 91 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 90 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `01d692b7`
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
- en
- St
- tn
- Lt
- caveman.md
- rules/graphify.md
- studio_standards.md
- workflows/graphify.md
- .multiplyScalar
- Lc
- FBXTreeParser
- CyberTerminal
- no
- ct
- xc
- se
- .dot
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
- .fromArray
- ls
- Tt
- SoundEngine
- .isEmpty
- AchievementSystem
- .fromJSON
- .toArray
- .loadTextureImage
- ta
- us
- 🌐 Subnet Architect – Verkkoarkkitehti
- GLTFLoader
- Al
- mo
- ._update
- Wl
- fe
- .invert
- ia
- parseImages
- tc
- GLTFLightsExtension
- OBJLoader
- constructor
- fl
- load
- el
- fs
- pl
- GLTFMeshStandardSGMaterial
- copy
- sc
- ln
- GLTFCubicSplineInterpolant
- GLTFMaterialsUnlitExtension
- GLTFMeshoptCompression
- Aa
- $c
- mn
- ms
- ss
- sh
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
- dn
- fn
- gl
- gs
- hn
- ii
- $l
- li
- .subVectors
- on
- pn
- Ra
- un
- ds
- .fromBufferAttribute
- ol
- .getCamera
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

## Communities (157 total, 91 thin omitted)

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
Cohesion: 0.26
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
Cohesion: 0.21
Nodes (6): ei, gn(), hl, i(), ps(), rt

### Community 13 - "three.min.js"
Cohesion: 0.04
Nodes (14): Ba, br(), bs, ci, Da, mr(), Na, Pa (+6 more)

### Community 16 - "en"
Cohesion: 0.07
Nodes (8): en, fi(), pi(), Si(), ti, update(), wh(), Yl

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
Nodes (6): t(), bt, ct(), es(), qc, Xe()

### Community 33 - "jc"
Cohesion: 0.07
Nodes (3): bind(), getValue(), jc

### Community 38 - "bl"
Cohesion: 0.08
Nodes (5): bl, dc, mc(), pc, zl

### Community 41 - ".updateProjectionMatrix"
Cohesion: 0.12
Nodes (3): Jl, Kn, vl()

### Community 42 - "fflate.min.js"
Cohesion: 0.18
Nodes (19): At(), bn(), bt(), Ct(), Gt(), Ht(), It(), Kt() (+11 more)

### Community 43 - "GLTFLoader.js"
Cohesion: 0.14
Nodes (13): addMorphTargets(), addPrimitiveAttributes(), assignExtrasToUserData(), computeBounds(), createAttributesKey(), createDefaultMaterial(), createPrimitiveKey(), getNormalizedComponentScale() (+5 more)

### Community 47 - "ws"
Cohesion: 0.10
Nodes (10): _a, dispose(), ft(), mt(), ni, setValue(), sl, _t (+2 more)

### Community 48 - "nl"
Cohesion: 0.06
Nodes (5): il(), Ll, ml, nl, Rl

### Community 50 - ".loadMaterial"
Cohesion: 0.12
Nodes (4): GLTFMaterialsClearcoatExtension, GLTFMaterialsPbrSpecularGlossinessExtension, GLTFMaterialsTransmissionExtension, GLTFTextureTransformExtension

### Community 52 - "GLTFParser"
Cohesion: 0.23
Nodes (3): addUnknownExtensionsToUserData(), buildNodeHierachy(), GLTFParser

### Community 54 - "_fromTexture"
Cohesion: 0.16
Nodes (15): _allocateTargets(), _applyPMREM(), _blur(), _cleanup(), fromCubemap(), fromEquirectangular(), fromScene(), _fromTexture() (+7 more)

### Community 56 - "ec"
Cohesion: 0.12
Nodes (3): as(), ec, setFromCamera()

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
Cohesion: 0.14
Nodes (3): ac, go, ts()

### Community 65 - ".applyMatrix4"
Cohesion: 0.17
Nodes (3): ai, Ea(), Wn

### Community 72 - "AchievementSystem"
Cohesion: 0.23
Nodes (6): achievements, ACHIEVEMENTS_DATA, AchievementSystem, closeAchievementsModal(), openAchievementsModal(), unlockAchievement()

### Community 73 - ".fromJSON"
Cohesion: 0.16
Nodes (7): bindSkeletons(), cl, parse(), parseAnimations(), parseGeometries(), parseShapes(), parseSkeletons()

### Community 74 - ".toArray"
Cohesion: 0.18
Nodes (3): dl, fh, oi()

### Community 76 - ".loadTextureImage"
Cohesion: 0.21
Nodes (3): GLTFTextureBasisUExtension, GLTFTextureWebPExtension, resolveURL()

### Community 79 - "🌐 Subnet Architect – Verkkoarkkitehti"
Cohesion: 0.17
Nodes (11): 💻 Asennus ja paikallinen käynnistys, 🎯 Esittely, 🚀 Jatkokehityssuunnitelma (Roadmap), 🖲️ Laitteet ja 3D-mallit, 📄 Lisenssi, 🎓 Pedagogiikka & CCNA Pro Master, ✨ Pääominaisuudet, 📖 Sisällysluettelo (+3 more)

### Community 82 - "mo"
Cohesion: 0.25
Nodes (3): fo(), mo(), po

### Community 83 - "._update"
Cohesion: 0.14
Nodes (3): jo, wo, xo

### Community 86 - ".invert"
Cohesion: 0.17
Nodes (4): hh, _s(), uh(), updateMatrixWorld()

### Community 93 - "constructor"
Cohesion: 0.27
Nodes (10): compileCubemapShader(), compileEquirectangularShader(), _compileMaterial(), constructor(), $h(), Kh(), qh(), setDirection() (+2 more)

### Community 95 - "load"
Cohesion: 0.31
Nodes (3): load(), oc, vc

### Community 100 - "copy"
Cohesion: 0.11
Nodes (6): bo, clone(), copy(), qn, Xn(), yn()

### Community 107 - "$c"
Cohesion: 0.67
Nodes (4): $c(), intersectObject(), intersectObjects(), Kc()

### Community 136 - ".subVectors"
Cohesion: 0.12
Nodes (3): je, jn(), Vs

## Knowledge Gaps
- **67 isolated node(s):** `ACHIEVEMENTS_DATA`, `achievements`, `audio`, `RFC-791`, `RFC-1519` (+62 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **91 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `i()` connect `i` to `copy`, `ls`, `bl`, `ol`, `.subVectors`, `.setAttribute`, `three.min.js`, `Hi`, `en`, `.constructor`, `ct`, `.invert`, `FBXTreeParser`, `.getCamera`, `no`, `constructor`, `uc`, `load`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Why does `ls()` connect `ls` to `GLTFMeshoptCompression`, `.getX`, `i`, `three.min.js`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Why does `FBXTreeParser` connect `FBXTreeParser` to `FBXLoader.js`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **What connects `ACHIEVEMENTS_DATA`, `achievements`, `audio` to the rest of the system?**
  _67 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `state.js` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `ui.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10220673635307782 - nodes in this community are weakly interconnected._
- **Should `three.min.js` be split into smaller, more focused modules?**
  _Cohesion score 0.03565166569257744 - nodes in this community are weakly interconnected._