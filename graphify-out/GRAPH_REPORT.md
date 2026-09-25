# Graph Report - IP-submaskpeli  (2026-09-25)

## Corpus Check
- 32 files · ~500,433 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 27 file(s) not represented in the graph (top: .glb 11, .obj 5, .mtl 4)

## Summary
- 2153 nodes · 4991 edges · 116 communities (61 shown, 55 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 309 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `53ae53c3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- nodes.js
- state.js
- ui.js
- game.js
- scene.js
- s
- SKILL.md
- teaching.js
- cables.js
- network.js
- ws
- update
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
- copy
- Lc
- FBXTreeParser
- CyberTerminal
- no
- es
- xc
- se
- Ne
- jc
- .constructor
- BinaryReader
- i
- sn
- bl
- jt
- Ce
- Kn
- gt
- GLTFLoader.js
- ls
- pt
- yt
- $c
- nl
- .getDependency
- .assignTexture
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
- .applyMatrix4
- bind
- .toArray
- .parse
- ia
- SoundEngine
- ya
- AchievementSystem
- .lookAt
- en
- .loadTextureImage
- parseObject
- .updateWorldMatrix
- 🌐 Subnet Architect – Verkkoarkkitehti
- GLTFLoader
- bt
- fo
- ._update
- At
- updateMatrixWorld
- qc
- ct
- xs
- qo
- Tt
- OBJLoader
- Tt
- fl
- e
- .fromJSON
- GLTFMaterialsPbrSpecularGlossinessExtension
- constructor
- uo
- ms
- ss
- .constructor
- us
- Xe
- Zc
- parse
- .dispatchEvent
- Wl
- .subVectors
- re
- ol
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

## Communities (116 total, 55 thin omitted)

### Community 0 - "nodes.js"
Cohesion: 0.10
Nodes (31): 1. Kieli & Kommunikaatio (Token-Optimointi), 2. IT Studio -laatustandardit (Professional Engineering), 3. Graphify Look Out (Arkkitehtuurikartoitus & Vertailu), 4. Git & Versiohallinta, 1. Kieli & Kommunikaatio (Token-Optimointi), 2. IT Studio -laatustandardit (Professional Engineering), 3. Graphify Look Out (Arkkitehtuurikartoitus & Vertailu), 4. Git & Versiohallinta (+23 more)

### Community 1 - "state.js"
Cohesion: 0.11
Nodes (17): activePackets, cableActionState, cables, DEVICE_RULES, disposeHierarchy(), disposeMaterial(), IP_REQUIRED_TYPES, keys (+9 more)

### Community 2 - "ui.js"
Cohesion: 0.08
Nodes (43): batchAssignZoneIps(), calcBackspace(), calcClear(), calcDot(), calcEquals(), calcInputQuick(), calcNum(), calcOp() (+35 more)

### Community 3 - "game.js"
Cohesion: 0.19
Nodes (7): clearWorld(), closeAdminModal(), goToMenu(), hashAdminCredentials(), loadLevel(), nextLevel(), submitAdminAuth()

### Community 4 - "scene.js"
Cohesion: 0.31
Nodes (10): animate(), createDataConfetti(), createSparks(), getConfettiResources(), getDomRefs(), getSparkResources(), initThreeJS(), onPointerDown() (+2 more)

### Community 5 - "s"
Cohesion: 0.22
Nodes (10): s(), t(), l(), o(), i(), a(), a(), s() (+2 more)

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
Cohesion: 0.16
Nodes (12): dispose(), C(), f(), sl, ws(), At(), Ct(), Dt() (+4 more)

### Community 12 - "update"
Cohesion: 0.09
Nodes (16): ci, ei, ni, i(), pi(), p(), rt, Si() (+8 more)

### Community 13 - "three.min.js"
Cohesion: 0.04
Nodes (28): Ba, bs, compileCubemapShader(), compileEquirectangularShader(), _compileMaterial(), er(), Ga, Hi() (+20 more)

### Community 14 - "ml"
Cohesion: 0.10
Nodes (3): Al, ml, Rl

### Community 16 - "zl"
Cohesion: 0.22
Nodes (3): n(), parseShapes(), zl

### Community 18 - "tn"
Cohesion: 0.06
Nodes (7): bo, dt(), $e(), is(), Qe(), tn, ut()

### Community 19 - "Lt"
Cohesion: 0.05
Nodes (3): Lt, setFromCamera(), b()

### Community 24 - "copy"
Cohesion: 0.13
Nodes (6): as(), copy(), S(), A(), M(), b()

### Community 25 - "Lc"
Cohesion: 0.08
Nodes (4): bc, getInput(), getOutput(), Lc

### Community 28 - "no"
Cohesion: 0.13
Nodes (9): ao(), eo(), go, io(), no(), oo(), ro(), so() (+1 more)

### Community 34 - ".constructor"
Cohesion: 0.16
Nodes (14): d(), u(), y(), gi(), v(), mi(), g(), m() (+6 more)

### Community 36 - "i"
Cohesion: 0.16
Nodes (11): br(), dc, i(), c(), mc(), oi(), r(), n() (+3 more)

### Community 37 - "sn"
Cohesion: 0.05
Nodes (11): an, cn, dn, fn, hn, ln, on, pn (+3 more)

### Community 41 - "Kn"
Cohesion: 0.14
Nodes (3): fs, Jl, Kn

### Community 42 - "gt"
Cohesion: 0.06
Nodes (51): At(), bn(), bt(), Ct(), Gt(), Ht(), It(), Kt() (+43 more)

### Community 43 - "GLTFLoader.js"
Cohesion: 0.16
Nodes (9): computeBounds(), createAttributesKey(), createDefaultMaterial(), createPrimitiveKey(), getNormalizedComponentScale(), GLTFCubicSplineInterpolant, GLTFRegistry(), toTrianglesDrawMode() (+1 more)

### Community 44 - "ls"
Cohesion: 0.12
Nodes (5): ls(), os(), ref_fs, fs, txt

### Community 46 - "yt"
Cohesion: 0.09
Nodes (3): vi(), h(), yt

### Community 47 - "$c"
Cohesion: 0.67
Nodes (4): $c(), intersectObject(), intersectObjects(), Kc()

### Community 48 - "nl"
Cohesion: 0.11
Nodes (3): il(), Ll, nl

### Community 49 - ".getDependency"
Cohesion: 0.27
Nodes (5): addMorphTargets(), addPrimitiveAttributes(), assignAttributeAccessor(), buildNodeHierachy(), createDracoPrimitive()

### Community 50 - ".assignTexture"
Cohesion: 0.17
Nodes (3): GLTFMaterialsClearcoatExtension, GLTFMaterialsUnlitExtension, GLTFTextureTransformExtension

### Community 52 - "GLTFParser"
Cohesion: 0.20
Nodes (4): addUnknownExtensionsToUserData(), assignExtrasToUserData(), GLTFLightsExtension, GLTFParser

### Community 54 - "_sceneToCubeUV"
Cohesion: 0.14
Nodes (18): _allocateTargets(), _applyPMREM(), _blur(), _cleanup(), fromCubemap(), fromEquirectangular(), fromScene(), _fromTexture() (+10 more)

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
Cohesion: 0.09
Nodes (5): ac, r(), sc, tc, ts()

### Community 66 - "bind"
Cohesion: 0.50
Nodes (3): bind(), getValue(), setValue()

### Community 68 - ".parse"
Cohesion: 0.22
Nodes (3): GLTFBinaryExtension, GLTFDracoMeshCompressionExtension, GLTFMeshQuantizationExtension

### Community 71 - "ya"
Cohesion: 0.20
Nodes (10): fh, hh, ho(), ja(), ka(), lo(), Mh, Va() (+2 more)

### Community 72 - "AchievementSystem"
Cohesion: 0.23
Nodes (6): achievements, ACHIEVEMENTS_DATA, AchievementSystem, closeAchievementsModal(), openAchievementsModal(), unlockAchievement()

### Community 75 - "en"
Cohesion: 0.10
Nodes (5): ca, v(), en, mn, p()

### Community 76 - ".loadTextureImage"
Cohesion: 0.21
Nodes (3): GLTFTextureBasisUExtension, GLTFTextureWebPExtension, resolveURL()

### Community 77 - "parseObject"
Cohesion: 0.15
Nodes (6): fa, $l, parseObject(), ta, Vs, Wn

### Community 79 - "🌐 Subnet Architect – Verkkoarkkitehti"
Cohesion: 0.17
Nodes (11): 💻 Asennus ja paikallinen käynnistys, 🎯 Esittely, 🚀 Jatkokehityssuunnitelma (Roadmap), 🖲️ Laitteet ja 3D-mallit, 📄 Lisenssi, 🎓 Pedagogiikka & CCNA Pro Master, ✨ Pääominaisuudet, 📖 Sisällysluettelo (+3 more)

### Community 80 - "GLTFLoader"
Cohesion: 0.14
Nodes (3): GLTFLoader, GLTFMaterialsTransmissionExtension, GLTFMeshoptCompression

### Community 81 - "bt"
Cohesion: 0.22
Nodes (4): bt, ii, parseTextures(), Ra

### Community 82 - "fo"
Cohesion: 0.24
Nodes (4): fo(), mo(), l(), po

### Community 83 - "._update"
Cohesion: 0.12
Nodes (4): jo, uh(), wo, xo

### Community 86 - "updateMatrixWorld"
Cohesion: 0.16
Nodes (3): _s(), n(), updateMatrixWorld()

### Community 93 - "Tt"
Cohesion: 0.40
Nodes (3): Et, Tt(), Zh()

### Community 95 - "e"
Cohesion: 0.21
Nodes (7): cl, hl, load(), or(), parseImages(), e(), o()

### Community 101 - "constructor"
Cohesion: 0.15
Nodes (6): constructor(), Da, ge, Na, _o, to()

### Community 106 - ".constructor"
Cohesion: 0.10
Nodes (3): Aa, Ah, clone()

### Community 114 - "us"
Cohesion: 0.20
Nodes (3): kl, Ql, us()

### Community 115 - "Xe"
Cohesion: 0.10
Nodes (8): _a, cs, Do, hs, Rs, w(), Xe(), zo

### Community 130 - "parse"
Cohesion: 0.16
Nodes (9): bindSkeletons(), ic, oc, parse(), parseAnimations(), parseGeometries(), parseMaterials(), parseSkeletons() (+1 more)

### Community 131 - ".dispatchEvent"
Cohesion: 0.14
Nodes (5): gn(), gs, o(), v(), ys

### Community 154 - "ol"
Cohesion: 0.10
Nodes (6): ol, pl, setTexturePath(), uc, ul, vc

## Knowledge Gaps
- **64 isolated node(s):** `ACHIEVEMENTS_DATA`, `achievements`, `audio`, `RFC-791`, `RFC-1519` (+59 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 613 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **55 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Lt` connect `Lt` to `.dispatchEvent`, `s`, `.subVectors`, `ws`, `update`, `three.min.js`, `tn`, `copy`, `Ne`, `.constructor`, `i`, `sn`, `jt`, `gt`, `pt`, `.getX`, `ec`, `re`, `.applyMatrix4`, `.lookAt`, `.fromArray`, `en`, `.updateWorldMatrix`, `.getCamera`, `At`, `.fromJSON`, `.applyMatrix3`, `constructor`, `.constructor`, `Xe`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `copy()` connect `copy` to `.dispatchEvent`, `s`, `Wl`, `.subVectors`, `ws`, `update`, `three.min.js`, `ml`, `zl`, `tn`, `Lt`, `ol`, `no`, `se`, `Ne`, `jc`, `.constructor`, `bl`, `jt`, `Kn`, `gt`, `pt`, `yt`, `nl`, `_sceneToCubeUV`, `nc`, `ec`, `re`, `.toJSON`, `.applyMatrix4`, `.toArray`, `ia`, `.lookAt`, `en`, `parseObject`, `.updateWorldMatrix`, `bt`, `fo`, `.getCamera`, `At`, `updateMatrixWorld`, `xs`, `Tt`, `fl`, `e`, `.fromJSON`, `uo`, `.constructor`, `us`, `Xe`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `vt` connect `vt` to `s`, `ws`, `three.min.js`, `tn`, `Lt`, `copy`, `no`, `.constructor`, `sn`, `bl`, `jt`, `pt`, `nl`, `.getX`, `_sceneToCubeUV`, `.lookAt`, `en`, `fo`, `ct`, `fl`, `.fromJSON`, `.constructor`, `us`, `Xe`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Are the 20 inferred relationships involving `ws()` (e.g. with `d()` and `u()`) actually correct?**
  _`ws()` has 20 INFERRED edges - model-reasoned connections that need verification._
- **What connects `ACHIEVEMENTS_DATA`, `achievements`, `audio` to the rest of the system?**
  _64 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `nodes.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10338680926916222 - nodes in this community are weakly interconnected._
- **Should `state.js` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._