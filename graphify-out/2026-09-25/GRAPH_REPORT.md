# Graph Report - IP-submaskpeli  (2026-09-25)

## Corpus Check
- 32 files · ~499,386 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 27 file(s) not represented in the graph (top: .glb 11, .obj 5, .mtl 4)

## Summary
- 2152 nodes · 4986 edges · 105 communities (60 shown, 45 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 309 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e4a6aaf9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- nodes.js
- state.js
- ui.js
- game.js
- scene.js
- constructor
- SKILL.md
- teaching.js
- cables.js
- network.js
- ws
- ei
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
- .multiplyScalar
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
- Wn
- sn
- bl
- jt
- Ce
- Kn
- gt
- GLTFLoader.js
- eh
- pt
- yt
- $c
- nl
- .getDependency
- .assignTexture
- .applyMatrix4
- GLTFParser
- yc
- _sceneToCubeUV
- nc
- ec
- yo
- re
- AnimationParser
- Jr
- FBXLoader.js
- TextParser
- GeometryParser
- .toJSON
- copy
- bind
- .toArray
- .parse
- ia
- SoundEngine
- ya
- AchievementSystem
- Rl
- en
- .loadTextureImage
- ta
- .invert
- 🌐 Subnet Architect – Verkkoarkkitehti
- GLTFLoader
- rh
- ._update
- At
- updateMatrixWorld
- OBJLoader
- Kh
- fl
- e
- .fromJSON
- GLTFMaterialsPbrSpecularGlossinessExtension
- Na
- .constructor
- us
- Xe
- Zc
- parse
- update
- parseObject
- n
- re
- ol
- ic
- rc

## God Nodes (most connected - your core abstractions)
1. `Lt` - 135 edges
2. `copy()` - 130 edges
3. `vt` - 90 edges
4. `ws()` - 69 edges
5. `tn` - 65 edges
6. `St` - 60 edges
7. `Ce` - 59 edges
8. `CyberTerminal` - 53 edges
9. `sn` - 53 edges
10. `se` - 49 edges

## Surprising Connections (you probably didn't know these)
- `3. Graphify Look Out (Arkkitehtuurikartoitus & Vertailu)` --references--> `calcUpdateScreen()`  [INFERRED]
  AGENTS.md → js/ui.js
- `3. Graphify Look Out (Arkkitehtuurikartoitus & Vertailu)` --references--> `calcUpdateScreen()`  [INFERRED]
  GEMINI.md → js/ui.js
- `3. Graphify Look Out (Arkkitehtuurikartoitus & Vertailu)` --references--> `checkConnections()`  [INFERRED]
  AGENTS.md → js/nodes.js
- `3. Graphify Look Out (Arkkitehtuurikartoitus & Vertailu)` --references--> `checkConnections()`  [INFERRED]
  GEMINI.md → js/nodes.js
- `bt()` --indirect_call--> `X()`  [INFERRED]
  js/three/fflate.min.js → js/three/three.min.js

## Import Cycles
- None detected.

## Communities (105 total, 45 thin omitted)

### Community 0 - "nodes.js"
Cohesion: 0.10
Nodes (31): 1. Kieli & Kommunikaatio (Token-Optimointi), 2. IT Studio -laatustandardit (Professional Engineering), 3. Graphify Look Out (Arkkitehtuurikartoitus & Vertailu), 4. Git & Versiohallinta, 1. Kieli & Kommunikaatio (Token-Optimointi), 2. IT Studio -laatustandardit (Professional Engineering), 3. Graphify Look Out (Arkkitehtuurikartoitus & Vertailu), 4. Git & Versiohallinta (+23 more)

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

### Community 5 - "constructor"
Cohesion: 0.18
Nodes (26): br(), constructor(), d(), u(), i(), y(), t(), gi() (+18 more)

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

### Community 10 - "ws"
Cohesion: 0.10
Nodes (14): mi(), f(), m(), y(), oi(), r(), sl, ws() (+6 more)

### Community 12 - "ei"
Cohesion: 0.13
Nodes (12): dispose(), ei, s(), gn(), a(), o(), ni, G() (+4 more)

### Community 13 - "three.min.js"
Cohesion: 0.04
Nodes (23): bs, er(), Ga, Hi(), hr(), ir(), ji(), ki() (+15 more)

### Community 16 - "zl"
Cohesion: 0.22
Nodes (3): n(), parseShapes(), zl

### Community 18 - "tn"
Cohesion: 0.05
Nodes (8): bo, dt(), $e(), ms(), Qe(), ss(), tn, ut()

### Community 25 - "Lc"
Cohesion: 0.08
Nodes (4): bc, getInput(), getOutput(), Lc

### Community 28 - "no"
Cohesion: 0.11
Nodes (14): ao(), eo(), go, ho(), io(), ja(), no(), oo() (+6 more)

### Community 29 - "ct"
Cohesion: 0.09
Nodes (5): ct(), es(), ns(), qc, Mt()

### Community 31 - "se"
Cohesion: 0.08
Nodes (4): as(), is(), os(), se

### Community 37 - "sn"
Cohesion: 0.05
Nodes (11): an, cn, dn, fn, hn, ln, on, pn (+3 more)

### Community 41 - "Kn"
Cohesion: 0.11
Nodes (4): fs, Jl, Kn, vl()

### Community 42 - "gt"
Cohesion: 0.06
Nodes (54): At(), bn(), bt(), Ct(), Gt(), Ht(), It(), Kt() (+46 more)

### Community 43 - "GLTFLoader.js"
Cohesion: 0.16
Nodes (9): computeBounds(), createAttributesKey(), createDefaultMaterial(), createPrimitiveKey(), getNormalizedComponentScale(), GLTFCubicSplineInterpolant, GLTFRegistry(), toTrianglesDrawMode() (+1 more)

### Community 46 - "yt"
Cohesion: 0.09
Nodes (3): vi(), h(), yt

### Community 47 - "$c"
Cohesion: 0.67
Nodes (4): $c(), intersectObject(), intersectObjects(), Kc()

### Community 49 - ".getDependency"
Cohesion: 0.27
Nodes (5): addMorphTargets(), addPrimitiveAttributes(), assignAttributeAccessor(), buildNodeHierachy(), createDracoPrimitive()

### Community 50 - ".assignTexture"
Cohesion: 0.17
Nodes (3): GLTFMaterialsClearcoatExtension, GLTFMaterialsUnlitExtension, GLTFTextureTransformExtension

### Community 51 - ".applyMatrix4"
Cohesion: 0.07
Nodes (6): Ea(), ls(), xs, ref_fs, fs, txt

### Community 52 - "GLTFParser"
Cohesion: 0.20
Nodes (4): addUnknownExtensionsToUserData(), assignExtrasToUserData(), GLTFLightsExtension, GLTFParser

### Community 54 - "_sceneToCubeUV"
Cohesion: 0.12
Nodes (17): _allocateTargets(), _applyPMREM(), _blur(), _cleanup(), Et, fromCubemap(), fromEquirectangular(), fromScene() (+9 more)

### Community 56 - "ec"
Cohesion: 0.12
Nodes (3): ec, jn(), Xn()

### Community 57 - "yo"
Cohesion: 0.14
Nodes (3): jo, qo, yo

### Community 59 - "AnimationParser"
Cohesion: 0.22
Nodes (4): AnimationParser, convertFBXTimeToSeconds(), inject(), slice()

### Community 60 - "Jr"
Cohesion: 0.25
Nodes (6): Jr(), kr(), nr(), qr(), vr(), zr()

### Community 61 - "FBXLoader.js"
Cohesion: 0.20
Nodes (9): append(), convertArrayBufferToString(), FBXLoader, getFbxVersion(), isFbxFormatASCII(), read(), isFbxFormatBinary(), TODO: this is not correct - FBX calculates outer and inner angle in degrees (+1 more)

### Community 63 - "GeometryParser"
Cohesion: 0.20
Nodes (4): generateTransform(), GeometryParser, getData(), getEulerOrder()

### Community 64 - ".toJSON"
Cohesion: 0.10
Nodes (4): ac, Al, r(), tc

### Community 65 - "copy"
Cohesion: 0.13
Nodes (4): ai, copy(), sc, Vs

### Community 66 - "bind"
Cohesion: 0.29
Nodes (4): bind(), getValue(), setValue(), uh()

### Community 68 - ".parse"
Cohesion: 0.22
Nodes (3): GLTFBinaryExtension, GLTFDracoMeshCompressionExtension, GLTFMeshQuantizationExtension

### Community 71 - "ya"
Cohesion: 0.12
Nodes (8): Ah, co(), fa, fh, lo(), Mh, uo(), ya

### Community 72 - "AchievementSystem"
Cohesion: 0.23
Nodes (6): achievements, ACHIEVEMENTS_DATA, AchievementSystem, closeAchievementsModal(), openAchievementsModal(), unlockAchievement()

### Community 75 - "en"
Cohesion: 0.08
Nodes (10): ca, Da, v(), en, v(), mn, i(), Si() (+2 more)

### Community 76 - ".loadTextureImage"
Cohesion: 0.21
Nodes (3): GLTFTextureBasisUExtension, GLTFTextureWebPExtension, resolveURL()

### Community 78 - ".invert"
Cohesion: 0.16
Nodes (3): hh, qn, b()

### Community 79 - "🌐 Subnet Architect – Verkkoarkkitehti"
Cohesion: 0.17
Nodes (11): 💻 Asennus ja paikallinen käynnistys, 🎯 Esittely, 🚀 Jatkokehityssuunnitelma (Roadmap), 🖲️ Laitteet ja 3D-mallit, 📄 Lisenssi, 🎓 Pedagogiikka & CCNA Pro Master, ✨ Pääominaisuudet, 📖 Sisällysluettelo (+3 more)

### Community 80 - "GLTFLoader"
Cohesion: 0.14
Nodes (3): GLTFLoader, GLTFMaterialsTransmissionExtension, GLTFMeshoptCompression

### Community 85 - "At"
Cohesion: 0.06
Nodes (4): At, fe, ge, At()

### Community 86 - "updateMatrixWorld"
Cohesion: 0.13
Nodes (3): _s(), n(), updateMatrixWorld()

### Community 93 - "Kh"
Cohesion: 0.33
Nodes (7): compileCubemapShader(), compileEquirectangularShader(), _compileMaterial(), $h(), Kh(), qh(), tu()

### Community 95 - "e"
Cohesion: 0.29
Nodes (5): cl, load(), or(), e(), o()

### Community 101 - "Na"
Cohesion: 0.25
Nodes (4): Ba, Ko, Na, _o

### Community 106 - ".constructor"
Cohesion: 0.06
Nodes (6): Aa, bt, clone(), Ra, ts(), Tt

### Community 114 - "us"
Cohesion: 0.10
Nodes (7): cs, hs, kl, Ql, us(), w(), Yl

### Community 115 - "Xe"
Cohesion: 0.12
Nodes (6): _a, Do, fo(), Rs, Xe(), zo

### Community 130 - "parse"
Cohesion: 0.22
Nodes (7): bindSkeletons(), oc, parse(), parseAnimations(), parseGeometries(), parseSkeletons(), pc

### Community 131 - "update"
Cohesion: 0.09
Nodes (14): ci, S(), gs, pi(), p(), setFromCamera(), update(), M() (+6 more)

### Community 134 - "parseObject"
Cohesion: 0.25
Nodes (3): $l, parseObject(), Wl

### Community 136 - "n"
Cohesion: 0.11
Nodes (3): ht(), je, n()

### Community 154 - "ol"
Cohesion: 0.08
Nodes (10): hl, ii, ol, parseImages(), parseTextures(), pl, setTexturePath(), uc (+2 more)

## Knowledge Gaps
- **64 isolated node(s):** `ACHIEVEMENTS_DATA`, `achievements`, `audio`, `RFC-791`, `RFC-1519` (+59 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 613 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **45 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Lt` connect `Lt` to `update`, `constructor`, `n`, `ws`, `three.min.js`, `ml`, `tn`, `.multiplyScalar`, `se`, `Ne`, `Wn`, `sn`, `jt`, `Ce`, `gt`, `eh`, `pt`, `.applyMatrix4`, `ec`, `re`, `.fromArray`, `en`, `.invert`, `.distanceToPoint`, `At`, `updateMatrixWorld`, `.constructor`, `us`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `copy()` connect `copy` to `update`, `constructor`, `parseObject`, `n`, `ws`, `three.min.js`, `ml`, `zl`, `tn`, `Lt`, `.multiplyScalar`, `ol`, `no`, `se`, `Ne`, `jc`, `Wn`, `bl`, `jt`, `Ce`, `Kn`, `gt`, `eh`, `pt`, `yt`, `.applyMatrix4`, `_sceneToCubeUV`, `nc`, `ec`, `re`, `.toJSON`, `.toArray`, `ia`, `ya`, `Rl`, `en`, `ta`, `.invert`, `.distanceToPoint`, `rh`, `At`, `updateMatrixWorld`, `fl`, `e`, `.fromJSON`, `.constructor`, `us`, `Xe`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `vt` connect `vt` to `constructor`, `ws`, `three.min.js`, `ml`, `tn`, `Lt`, `.multiplyScalar`, `no`, `ct`, `se`, `sn`, `bl`, `jt`, `gt`, `eh`, `pt`, `.applyMatrix4`, `ec`, `copy`, `en`, `Kh`, `fl`, `.fromJSON`, `.constructor`, `us`, `Xe`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Are the 20 inferred relationships involving `ws()` (e.g. with `d()` and `u()`) actually correct?**
  _`ws()` has 20 INFERRED edges - model-reasoned connections that need verification._
- **What connects `ACHIEVEMENTS_DATA`, `achievements`, `audio` to the rest of the system?**
  _64 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `nodes.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10338680926916222 - nodes in this community are weakly interconnected._
- **Should `state.js` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._