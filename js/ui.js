// --- Käyttöliittymä, modaalit, työkalut ja ilmoitukset ---
// Kattava Full Teaching -opetusmateriaali (kaikki 24 aihetta / 61 tasoa) ladataan tiedostosta js/teaching.js.


/**
 * Apufunktio – rakentaa tehtävänannon ja laskentaohjeen IP-modaaliin.
 * Tasoilla 1-2 näytetään opastus ja esimerkkikaava.
 * Tasoilla 3+ laskutoimituksia EI paljasteta, vaan pelaaja laskee ne itse!
 */
function subnetBlock(details, cidr) {
    const isIntroLevel = typeof currentLevelConfig !== 'undefined' && currentLevelConfig && currentLevelConfig.id <= 2;

    if (isIntroLevel) {
        const hostBits = 32 - cidr;
        return `
            <div class="bg-slate-800/95 p-4 rounded-xl border border-slate-600 mt-2 space-y-3">
                <h5 class="font-bold text-amber-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <span>🎓</span> Aloitusopas: Miten aliverkko lasketaan?
                </h5>
                <div class="space-y-2 text-sm">
                    <div class="flex justify-between items-center py-1.5 border-b border-slate-700/60">
                        <span class="text-slate-400">Verkkoalue:</span>
                        <span class="font-mono text-cyan-300 font-bold text-base">${details.network} /${cidr}</span>
                    </div>
                    <div class="flex justify-between items-center py-1.5 border-b border-slate-700/60">
                        <span class="text-slate-400">CIDR-prefiksi:</span>
                        <span class="font-mono text-purple-300 font-bold">/${cidr} (${cidr} bittiä verkolle)</span>
                    </div>
                    <div class="flex justify-between items-center py-1.5 border-b border-slate-700/60">
                        <span class="text-slate-400">Isäntäbitit:</span>
                        <span class="font-mono text-slate-200 font-bold">32 − ${cidr} = ${hostBits} bittiä</span>
                    </div>
                </div>

                <!-- Laskennan malliesimerkki aloittelijalle -->
                <div class="p-3.5 bg-slate-900/90 rounded-xl border border-slate-700/80 text-xs text-slate-200 space-y-2 leading-relaxed">
                    <div class="font-bold text-cyan-400 text-sm flex items-center gap-1.5">
                        <span>🧮</span> Laskennan malliesimerkki:
                    </div>
                    <p>1. <strong class="text-white">Lohkokoko:</strong> <span class="inline-flex items-center px-2 py-0.5 bg-slate-800 rounded-md border border-amber-500/50 text-amber-300 font-mono font-extrabold text-sm">2^${hostBits}</span> <span class="text-slate-300 text-xs font-semibold">(2 potenssiin ${hostBits} = ${Math.pow(2, hostBits)} osoitetta)</span></p>
                    <p>2. <strong class="text-white">Aliverkon peite:</strong> Täydet tavut ovat <span class="font-mono text-blue-300 font-bold">255</span> ja jaetun tavun arvo on <span class="font-mono text-amber-300 font-bold">256 − lohko</span>.</p>
                    <p>3. <strong class="text-white">Vapaa IP laitteelle:</strong> Valitse verkko-osoitteen (${details.network}) ja broadcast-yleislähetyksen välistä vapaa numero.</p>
                </div>
            </div>`;
    }

    const requiresBounds = typeof currentLevelConfig !== 'undefined' && currentLevelConfig && (currentLevelConfig.difficulty >= 3 || currentLevelConfig.id >= 11);

    return `
        <div class="bg-slate-800/95 p-4 rounded-xl border border-slate-600 mt-2 space-y-3">
            <h5 class="font-bold text-amber-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span>🎯</span> Tehtävän verkkovaatimukset
            </h5>
            <div class="space-y-2 text-sm">
                <div class="flex justify-between items-center py-1.5 border-b border-slate-700/60">
                    <span class="text-slate-400">Kohdeverkko:</span>
                    <span class="font-mono text-cyan-300 font-bold text-base">${details.network} /${cidr}</span>
                </div>
                <div class="flex justify-between items-center py-1.5 border-b border-slate-700/60">
                    <span class="text-slate-400">Prefiksi:</span>
                    <span class="font-mono text-purple-300 font-bold text-base">/${cidr}</span>
                </div>
            </div>

            <div class="p-3.5 bg-slate-900/90 rounded-xl border border-slate-700/80 text-xs text-slate-200 space-y-2.5 leading-relaxed">
                <div class="font-bold text-cyan-400 text-sm flex items-center gap-1.5">
                    <span>⚡</span> Sinun tehtäväsi:
                </div>
                <p class="text-slate-300">Laske vasemmanpuoleisella laskimella:</p>
                <ul class="list-disc list-inside space-y-1 text-slate-200 pl-1 font-medium">
                    <li>Aliverkon peite prefiksin <span class="font-mono text-purple-300 font-bold">/${cidr}</span> perusteella</li>
                    ${requiresBounds ? `
                    <li><strong class="text-amber-300">Verkko-osoite (Network ID):</strong> Aliverkkolohkon alin osoite</li>
                    <li><strong class="text-amber-300">Broadcast-osoite:</strong> Aliverkkolohkon ylin osoite</li>
                    ` : ''}
                    <li>Sallittu vapaa isäntäosoite laitteelle (${details.firstHost}–${details.lastHost})</li>
                </ul>
                <p class="text-amber-300/90 text-[11px] pt-1.5 border-t border-slate-800">⚠️ Varmista, ettet anna kahdelle laitteelle samaa IP-osoitetta.</p>
            </div>
        </div>`;
}
if (typeof window !== 'undefined') {
    window.subnetBlock = subnetBlock;
}

/**
 * Palauttaa tähdet vaikeusmittarille.
 */
function getDifficultyStars(difficulty) {
    const filled = '⭐'.repeat(difficulty);
    const empty = '☆'.repeat(5 - difficulty);
    return filled + empty;
}

/**
 * Palauttaa vaikeusmittarin väriluokan.
 */
function getDifficultyColor(difficulty) {
    const colors = ['', 'text-green-400', 'text-blue-400', 'text-yellow-400', 'text-red-400', 'text-purple-400'];
    return colors[difficulty] || 'text-white';
}

/**
 * Alustaa IP- ja aliverkkopeitteen numerokenttien älykkäät tapahtumat.
 */
function setupOctetInputs() {
    const handleInput = (e) => {
        let target = e.target;
        target.value = target.value.replace(/[^0-9]/g, '');
        if (target.value !== '' && parseInt(target.value, 10) > 255) {
            target.value = '255';
        }
        if (target.value.length === 3) {
            const next = target.nextElementSibling?.nextElementSibling;
            if (next && next.tagName === 'INPUT') next.focus();
        }
        if (typeof saveIpInputsToMemory === 'function') saveIpInputsToMemory();
        if (typeof currentHelpTab !== 'undefined' && currentHelpTab === 'binary' && typeof renderBinaryVisualizer === 'function') {
            renderBinaryVisualizer();
        }
    };

    const handleKeyDown = (e) => {
        const target = e.target;
        if ((e.key === '.' || e.key === ' ' || e.key === 'ArrowRight') && target.value !== '') {
            e.preventDefault();
            const next = target.nextElementSibling?.nextElementSibling;
            if (next && next.tagName === 'INPUT') next.focus();
        } else if ((e.key === 'Backspace' || e.key === 'ArrowLeft') && target.value === '') {
            e.preventDefault();
            const prev = target.previousElementSibling?.previousElementSibling;
            if (prev && prev.tagName === 'INPUT') {
                prev.focus();
                setTimeout(() => prev.setSelectionRange(prev.value.length, prev.value.length), 0);
            }
        }
    };

    document.querySelectorAll('.ip-octet, .mask-octet').forEach(input => {
        input.addEventListener('input', handleInput);
        input.addEventListener('keydown', handleKeyDown);
    });
}

/**
 * Alustaa alareunan työkalupalkin painikkeet.
 */
function setupTools() {
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
            const targetBtn = e.target.closest('.tool-btn');
            targetBtn.classList.add('active');
            currentTool = targetBtn.dataset.tool;
            if (currentTool !== 'cable' && cableActionState.active) {
                if (cableActionState.lineTemp) scene.remove(cableActionState.lineTemp);
                cableActionState = { active: false, startNode: null, lineTemp: null };
            }
        });
    });
}

/**
 * Näyttää kelluvan toast-ilmoituksen.
 */
function showToast(msg, type = "info") {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = msg;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

let currentMenuPhase = null; // Asetetaan dynaamisesti pelaajan tason mukaan
let currentMenuSearch = '';
let selectedMenuLevelId = null;

/**
 * Renderöi modernin 2-palstaisen Mission Hub -tasovalikon esikatseluineen.
 */
function renderLevelMenu() {
    const container = document.getElementById('level-container');
    const phaseTabs = document.getElementById('phase-tabs');
    const searchInput = document.getElementById('level-search-input');
    const progressText = document.getElementById('progress-text');
    const progressPercent = document.getElementById('progress-percent');
    const progressBar = document.getElementById('progress-bar');
    const btnContinue = document.getElementById('btn-continue-game');
    const previewPanel = document.getElementById('level-preview-panel');
    const levelCountBadge = document.getElementById('level-count-badge');

    if (!container) return;

    const totalLevels = levels.length;
    const completedLevels = Math.min(Math.max(0, unlockedLevels - 1), totalLevels);
    const percent = totalLevels > 0 ? Math.round((completedLevels / totalLevels) * 100) : 0;

    // 1. Päivitä edistymispalkki
    if (progressText) progressText.innerText = `${completedLevels} / ${totalLevels}`;
    if (progressPercent) progressPercent.innerText = `${percent}%`;
    if (progressBar) progressBar.style.width = `${percent}%`;

    // 2. "Jatka peliä" -painike
    if (btnContinue && !btnContinue.dataset.listening) {
        btnContinue.dataset.listening = 'true';
        btnContinue.addEventListener('click', () => {
            const nextLevel = Math.min(unlockedLevels, levels.length);
            loadLevel(nextLevel);
        });
    }

    // 3. Valitse oletuksena pelaajan nykyinen työn alla oleva taso ja sen vaihe
    const activeLevelObj = levels[Math.min(unlockedLevels, totalLevels) - 1] || levels[0];
    if (!selectedMenuLevelId || selectedMenuLevelId > totalLevels) {
        selectedMenuLevelId = activeLevelObj.id;
    }
    if (!currentMenuPhase) {
        currentMenuPhase = activeLevelObj.phase || 'all';
    }

    // 4. Hakukentän kuuntelija
    if (searchInput && !searchInput.dataset.listening) {
        searchInput.dataset.listening = 'true';
        searchInput.addEventListener('input', (e) => {
            currentMenuSearch = e.target.value.trim().toLowerCase();
            renderLevelList();
        });
    }

    // 5. Vaiheet / Segmentointi
    const uniquePhases = Array.from(new Set(levels.map(l => l.phase).filter(Boolean)));
    
    if (phaseTabs) {
        phaseTabs.innerHTML = '';

        // "Kaikki" -nappi
        const allBtn = document.createElement('button');
        allBtn.className = `phase-tab-btn ${currentMenuPhase === 'all' ? 'active' : ''}`;
        allBtn.innerHTML = `<span>✨ Kaikki</span> <span class="phase-badge-count">${completedLevels}/${totalLevels}</span>`;
        allBtn.onclick = () => {
            currentMenuPhase = 'all';
            updateActivePhaseTab();
            renderLevelList();
        };
        phaseTabs.appendChild(allBtn);

        // Yksittäiset vaihenapit
        uniquePhases.forEach(ph => {
            const phaseLevels = levels.filter(l => l.phase === ph);
            const compInPhase = phaseLevels.filter(l => l.id < unlockedLevels).length;
            const btn = document.createElement('button');
            btn.className = `phase-tab-btn ${currentMenuPhase === ph ? 'active' : ''}`;
            btn.dataset.phase = ph;
            btn.innerHTML = `<span>${ph}</span> <span class="phase-badge-count">${compInPhase}/${phaseLevels.length}</span>`;
            btn.onclick = () => {
                currentMenuPhase = ph;
                updateActivePhaseTab();
                // Kun vaihdetaan vaihetta, valitaan esikatseluun kyseisen vaiheen ensimmäinen/aktiivinen taso
                const firstPlayableInPhase = phaseLevels.find(l => l.id === unlockedLevels) || phaseLevels[0];
                if (firstPlayableInPhase) {
                    selectedMenuLevelId = firstPlayableInPhase.id;
                }
                renderLevelList();
            };
            phaseTabs.appendChild(btn);
        });
    }

    function updateActivePhaseTab() {
        if (!phaseTabs) return;
        const btns = phaseTabs.querySelectorAll('.phase-tab-btn');
        btns.forEach(b => {
            if (currentMenuPhase === 'all' && b.innerText.includes('Kaikki')) {
                b.classList.add('active');
            } else if (b.dataset.phase === currentMenuPhase) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });
    }

    // 6. Renderöi tehtävälista ja esikatselu
    renderLevelList();

    function renderLevelList() {
        container.innerHTML = '';

        let filtered = levels;
        if (currentMenuPhase !== 'all') {
            filtered = filtered.filter(l => l.phase === currentMenuPhase);
        }
        if (currentMenuSearch) {
            filtered = filtered.filter(l => {
                const text = `${l.id} ${l.name} ${l.scenario || ''} ${l.teachingTopic || ''} ${l.phase || ''} ${l.network || ''}`.toLowerCase();
                return text.includes(currentMenuSearch);
            });
        }

        if (levelCountBadge) {
            levelCountBadge.innerText = `${filtered.length} tehtävää`;
        }

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="py-12 text-center text-slate-500">
                    <p class="text-3xl mb-2">🔍</p>
                    <p class="text-sm font-semibold text-slate-400">Ei löytynyt tehtäviä hakusanalla "${currentMenuSearch}"</p>
                    <p class="text-xs text-slate-500 mt-1">Kokeile toista hakusanaa tai valitse jokin toinen vaihe ylhäältä.</p>
                </div>
            `;
            renderPreviewCard(null);
            return;
        }

        // Varmista että valittu taso on suodatetuissa
        if (!filtered.some(l => l.id === selectedMenuLevelId)) {
            selectedMenuLevelId = filtered[0].id;
        }

        filtered.forEach(lvl => {
            const isCompleted = lvl.id < unlockedLevels;
            const isUnlocked = lvl.id === unlockedLevels;
            const isLocked = lvl.id > unlockedLevels;
            const isSelected = lvl.id === selectedMenuLevelId;

            let statusClass = 'row-locked';
            let statusText = 'Lukittu';
            let statusColor = 'text-slate-400 bg-slate-800/80 border-slate-700';

            if (isCompleted) {
                statusClass = 'row-completed';
                statusText = '✅ Läpäisty';
                statusColor = 'text-emerald-300 bg-emerald-500/20 border-emerald-500/40 font-bold';
            } else if (isUnlocked) {
                statusClass = 'row-unlocked';
                statusText = '⚡ Seuraava';
                statusColor = 'text-sky-300 bg-blue-500/20 border-blue-500/40 font-extrabold shadow-sm';
            }

            const stars = '⭐'.repeat(lvl.difficulty || 1) + '☆'.repeat(Math.max(0, 5 - (lvl.difficulty || 1)));

            const row = document.createElement('div');
            row.className = `mission-row ${statusClass} ${isSelected ? 'row-selected' : ''}`;
            row.innerHTML = `
                <div class="flex items-center gap-3.5 min-w-0">
                    <div class="w-3 h-3 rounded-full status-dot flex-shrink-0"></div>
                    <span class="font-black text-sm font-mono px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 flex-shrink-0">
                        #${lvl.id}
                    </span>
                    <div class="flex flex-col min-w-0">
                        <span class="text-sm font-extrabold text-white truncate leading-snug">${lvl.name}</span>
                        <span class="text-xs text-cyan-300/90 font-mono truncate font-semibold">${lvl.network}/${lvl.cidr}</span>
                    </div>
                </div>

                <div class="flex items-center gap-3 flex-shrink-0">
                    <span class="text-amber-400 text-sm hidden sm:inline" title="Vaikeustaso: ${lvl.difficulty}/5">${stars}</span>
                    <span class="text-xs ${statusColor} px-3 py-1 rounded-lg border">
                        ${statusText}
                    </span>
                </div>
            `;

            // Klikkaus valitsee esikatseluun
            row.onclick = () => {
                selectedMenuLevelId = lvl.id;
                document.querySelectorAll('.mission-row').forEach(r => r.classList.remove('row-selected'));
                row.classList.add('row-selected');
                renderPreviewCard(lvl);
            };

            // Tuplaklikkaus tai klikkaus avoimeen tasoon käynnistää suoraan
            row.ondblclick = () => {
                if (!isLocked) loadLevel(lvl.id);
            };

            container.appendChild(row);
        });

        // Päivitä esikatseluruutu
        const selectedObj = levels.find(l => l.id === selectedMenuLevelId) || filtered[0];
        renderPreviewCard(selectedObj);
    }

    /**
     * Renderöi tason aidon 3D-maailman (huoneet, laitteet, 3D-mallit, valaistus, isometrinen kamera)
     * suoraan oikean sivupalkin esikatselukortin canvas-elementtiin.
     */
    let preview3DRenderer = null;
    let preview3DScene = null;
    let preview3DCamera = null;

    function render3DLevelPreview(canvas, lvl) {
        if (!canvas || typeof THREE === 'undefined') return;

        const w = canvas.clientWidth || 480;
        const h = canvas.clientHeight || 220;

        if (!preview3DRenderer) {
            preview3DRenderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
            });
        } else if (preview3DRenderer.domElement !== canvas) {
            // Mikäli DOM-elementti on vaihtunut renderPreviewCard-kutsun myötä
            preview3DRenderer.dispose();
            preview3DRenderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
            });
        }

        preview3DRenderer.setSize(w, h, false);
        preview3DRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

        preview3DScene = new THREE.Scene();
        preview3DScene.background = new THREE.Color(0x080d1a);

        // Valot esikatseluun
        const ambLight = new THREE.AmbientLight(0xffffff, 0.75);
        preview3DScene.add(ambLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.85);
        dirLight.position.set(25, 45, 25);
        preview3DScene.add(dirLight);

        // Ruudukko
        const grid = new THREE.GridHelper(80, 40, 0x334155, 0x1e293b);
        grid.position.y = -0.05;
        preview3DScene.add(grid);

        // Laske tason rajat ja keskipiste
        let minX = -10, maxX = 10, minZ = -10, maxZ = 15;
        if (lvl.zones && lvl.zones.length > 0) {
            lvl.zones.forEach(z => {
                minX = Math.min(minX, z.x - z.w / 2);
                maxX = Math.max(maxX, z.x + z.w / 2);
                minZ = Math.min(minZ, z.z - z.d / 2);
                maxZ = Math.max(maxZ, z.z + z.d / 2);
            });
        }
        if (lvl.requiredNodes && lvl.requiredNodes.length > 0) {
            lvl.requiredNodes.forEach(n => {
                minX = Math.min(minX, n.pos.x - 3);
                maxX = Math.max(maxX, n.pos.x + 3);
                minZ = Math.min(minZ, n.pos.z - 3);
                maxZ = Math.max(maxZ, n.pos.z + 3);
            });
        }

        const centerX = (minX + maxX) / 2;
        const centerZ = (minZ + maxZ) / 2;
        const spanX = Math.max(26, maxX - minX + 8);
        const spanZ = Math.max(20, maxZ - minZ + 8);
        const maxSpan = Math.max(spanX, spanZ);

        // 1. Luodaan tason vyöhykkeet (3D Plane + reunat + tekstilappu)
        if (lvl.zones && lvl.zones.length > 0) {
            lvl.zones.forEach(z => {
                const zGeo = new THREE.PlaneGeometry(z.w, z.d);
                const colorHex = z.color || 0x3b82f6;
                const zMat = new THREE.MeshBasicMaterial({
                    color: colorHex,
                    transparent: true,
                    opacity: 0.22,
                    side: THREE.DoubleSide
                });
                const zMesh = new THREE.Mesh(zGeo, zMat);
                zMesh.rotation.x = -Math.PI / 2;
                zMesh.position.set(z.x, 0.05, z.z);
                preview3DScene.add(zMesh);

                const edges = new THREE.EdgesGeometry(zGeo);
                const edgeLine = new THREE.LineSegments(
                    edges,
                    new THREE.LineBasicMaterial({ color: colorHex, opacity: 0.85, transparent: true, linewidth: 2 })
                );
                zMesh.add(edgeLine);

                // Huoneen nimilappu
                if (z.name) {
                    const labelTex = createLabelTexture(
                        z.name,
                        z.subnet || null,
                        'rgba(10, 16, 32, 0.92)',
                        '#' + colorHex.toString(16).padStart(6, '0'),
                        'rgba(210,230,255,0.85)'
                    );
                    const aspect = 2048 / (z.subnet ? 560 : 400);
                    const labelW = Math.min(z.w * 0.52, 10);
                    const labelH = labelW / aspect;
                    const labelGeo = new THREE.PlaneGeometry(labelW, labelH);
                    const labelMat = new THREE.MeshBasicMaterial({
                        map: labelTex,
                        transparent: true,
                        opacity: 1.0,
                        side: THREE.DoubleSide
                    });
                    const lMesh = new THREE.Mesh(labelGeo, labelMat);
                    lMesh.rotation.x = -Math.PI / 2;
                    lMesh.position.set(z.x - z.w / 2 + labelW / 2 + 0.8, 0.12, z.z - z.d / 2 + labelH / 2 + 0.8);
                    preview3DScene.add(lMesh);
                }
            });
        }

        // 2. Luodaan Reititin ja Pilvi (aloituslaitteet)
        const addPreviewDevice = (type, x, z, isPredefined) => {
            const { geometry, color } = getNodeAppearance(type);
            const material = new THREE.MeshPhongMaterial({ color });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.geometry.computeBoundingBox();
            const height = mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y;
            mesh.position.set(x, height / 2, z);
            preview3DScene.add(mesh);

            const tempNode = {
                id: 'preview_' + Math.random(),
                mesh: mesh,
                userData: {
                    type: type,
                    isPredefined: isPredefined,
                    isConnected: true,
                    correctIp: true,
                    baseColor: color
                }
            };

            // Yritä ladata tai kloonata oikea 3D-malli
            tryLoadCustomModel(tempNode, type);

            // Jos kyseessä on WiFi, lisätään pieni kantamarengas
            if (type === nodeTypes.WIFI) {
                const ringGeo = new THREE.RingGeometry(5.8, 6.0, 32);
                const ringMat = new THREE.MeshBasicMaterial({
                    color: 0xa855f7,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.35
                });
                const ring = new THREE.Mesh(ringGeo, ringMat);
                ring.rotation.x = Math.PI / 2;
                ring.position.y = 0.1;
                mesh.add(ring);
            }

            return mesh;
        };

        const wan = getLevelWanLayout(lvl);
        const cloudMesh = addPreviewDevice(nodeTypes.CLOUD, wan.cloud.x, wan.cloud.z, true);
        const gatewayMesh = addPreviewDevice(nodeTypes.GATEWAY, wan.gateway.x, wan.gateway.z, true);

        // Kaapeli Cloud -> Gateway
        const cableGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(wan.cloud.x, 0.5, wan.cloud.z),
            new THREE.Vector3(wan.gateway.x, 0.5, wan.gateway.z)
        ]);
        const cableMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 });
        const cableLine = new THREE.Line(cableGeo, cableMat);
        preview3DScene.add(cableLine);

        // 3. Luodaan tason kiinteät laitteet (ohitetaan mahdolliset duplikaatit)
        if (lvl.requiredNodes && lvl.requiredNodes.length > 0) {
            lvl.requiredNodes.forEach(rn => {
                if (rn.type === nodeTypes.CLOUD || rn.type === nodeTypes.GATEWAY) return;
                addPreviewDevice(rn.type, rn.pos.x, rn.pos.z, true);
            });
        }

        // 4. Isometrinen esikatselukamera säädettynä kattamaan koko tason alue
        const aspect = w / h;
        const d = maxSpan * 0.75;
        preview3DCamera = new THREE.OrthographicCamera(
            -d * aspect, d * aspect,
            d, -d,
            1, 1000
        );

        // Isometrinen katselukulma keskitettynä tason keskelle
        const camDistance = 35;
        preview3DCamera.position.set(
            centerX + camDistance,
            camDistance * 1.1,
            centerZ + camDistance
        );
        preview3DCamera.lookAt(centerX, 0, centerZ);
        preview3DCamera.updateProjectionMatrix();

        // Renderöidään esikatselu (muutaman sekunnin kertaussykli mallien asynkroniselle latautumiselle)
        let renderFrames = 0;
        const currentScene = preview3DScene;
        const currentCamera = preview3DCamera;
        function renderStep() {
            if (preview3DRenderer && preview3DScene === currentScene) {
                preview3DRenderer.render(currentScene, currentCamera);
                renderFrames++;
                if (renderFrames < 60) {
                    requestAnimationFrame(renderStep);
                }
            }
        }
        renderStep();
    }

    /**
     * Renderöi oikean palstan suuren esikatselukortin ja Aloita-painikkeen
     */
    function renderPreviewCard(lvl) {
        if (!previewPanel) return;

        if (!lvl) {
            previewPanel.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full text-center text-slate-500 py-16">
                    <p class="text-5xl mb-4">📡</p>
                    <p class="text-base font-bold text-slate-400">Ei valittua tehtävää</p>
                    <p class="text-sm text-slate-500 mt-1">Valitse tehtävä listalta nähdäksesi sen 3D-maailman ja tiedot.</p>
                </div>
            `;
            return;
        }

        const isCompleted = lvl.id < unlockedLevels;
        const isUnlocked = lvl.id === unlockedLevels;
        const isLocked = lvl.id > unlockedLevels;

        const stars = '⭐'.repeat(lvl.difficulty || 1) + '☆'.repeat(Math.max(0, 5 - (lvl.difficulty || 1)));
        const topic = (lvl.teachingTopic || 'Perusteet').toUpperCase();

        let statusBadge = `<span class="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-800 text-slate-400 border border-slate-700">🔒 Lukittu</span>`;
        let actionBtnText = `🔒 Avaa edeltävät tasot ensin`;
        let actionBtnDisabled = true;

        if (isCompleted) {
            statusBadge = `<span class="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm">✅ Läpäisty</span>`;
            actionBtnText = `PELAA UUDELLEEN ▶`;
            actionBtnDisabled = false;
        } else if (isUnlocked) {
            statusBadge = `<span class="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold bg-blue-500/25 text-blue-300 border border-blue-500/50 shadow-md">⚡ Seuraava tehtävä</span>`;
            actionBtnText = `ALOITA TEHTÄVÄ ▶`;
            actionBtnDisabled = false;
        }

        // Huoneet / Vyöhykkeet lista previewiin
        let zonesPreview = '';
        if (lvl.zones && lvl.zones.length > 0) {
            zonesPreview = `
                <div class="mt-2 pt-3 border-t border-slate-800">
                    <div class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <span class="text-sm">🏢</span> Huoneet ja aliverkot (${lvl.zones.length} kpl):
                    </div>
                    <div class="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto custom-scrollbar">
                        ${lvl.zones.map(z => `<span class="text-xs px-2.5 py-1 bg-slate-800/90 border border-slate-700 rounded-lg text-slate-200 font-medium">${z.name}</span>`).join('')}
                    </div>
                </div>
            `;
        }

        previewPanel.innerHTML = `
            <!-- Yläosa: Taso, Otsikko, Vaihe & Tähdet (Pysyvä yläreuna) -->
            <div class="p-3.5 sm:p-4 pb-3 border-b border-slate-800 bg-slate-900/60 flex-shrink-0 flex items-center justify-between gap-3">
                <div class="flex flex-col gap-1 min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                        <span class="text-xs font-mono font-black px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm">
                            TASO ${lvl.id}
                        </span>
                        ${statusBadge}
                        <span class="text-xs text-sky-400 font-semibold truncate hidden sm:inline">
                            🗺️ ${lvl.phase || 'Kampanja'}
                        </span>
                    </div>
                    <h2 class="text-base sm:text-lg font-black text-white truncate leading-tight">${lvl.name}</h2>
                </div>
                <div class="text-amber-400 text-sm sm:text-base font-bold flex-shrink-0" title="Vaikeusaste: ${lvl.difficulty}/5">${stars}</div>
            </div>

            <!-- Sisältöalue: 3D-tilannekuva, Statsit, Tehtävänanto & Vyöhykkeet (Vieritettävä jos ei mahdu) -->
            <div class="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-3.5 sm:p-4 flex flex-col gap-3">
                
                <!-- Aito 3D-tilannekuva tasosta (Starting State 3D-render) -->
                <div class="relative rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-inner flex-shrink-0">
                    <div class="absolute top-2 left-2.5 z-10 flex items-center gap-1.5 bg-slate-900/85 backdrop-blur px-2.5 py-1 rounded-lg border border-slate-700/60 text-xs font-bold text-sky-300 pointer-events-none">
                        <span>🌐 3D-tilannekuva tasosta</span>
                        <span class="text-slate-400 font-normal text-[11px]">(${(lvl.requiredNodes || []).length} kiinteää laitetta)</span>
                    </div>
                    <canvas id="preview-map-canvas" class="preview-map-canvas"></canvas>
                </div>

                <!-- Verkkotiedot & Statsit ruudukkona -->
                <div class="grid grid-cols-2 gap-2.5 text-xs sm:text-sm flex-shrink-0">
                    <div class="preview-stat-card">
                        <span class="text-[11px] uppercase font-extrabold text-slate-400 block mb-0.5 tracking-wider">Pääverkko</span>
                        <span class="font-mono text-cyan-300 font-black text-sm sm:text-base">${lvl.network}/${lvl.cidr}</span>
                    </div>
                    <div class="preview-stat-card">
                        <span class="text-[11px] uppercase font-extrabold text-slate-400 block mb-0.5 tracking-wider">Oppimisaihe</span>
                        <span class="text-amber-300 font-extrabold text-xs sm:text-sm truncate block">🎯 ${topic}</span>
                    </div>
                </div>

                <!-- Tehtävänanto / Skenaario selkeällä tekstillä -->
                <div class="bg-slate-950/70 border border-slate-800 rounded-xl p-3 sm:p-3.5 text-xs sm:text-sm leading-relaxed shadow-inner">
                    <span class="text-xs uppercase font-extrabold text-sky-400 block mb-1 flex items-center gap-1.5">
                        <span>📋</span> Tehtävänanto
                    </span>
                    <p class="text-slate-200 font-medium">${lvl.scenario || 'Rakenna ja konfiguroi verkkoinfrastruktuuri tason vaatimusten mukaisesti.'}</p>
                </div>

                ${zonesPreview}
            </div>

            <!-- Käynnistyspainike: AINA NÄKYVILLÄ kiinnitettynä paneelin alareunaan -->
            <div class="p-3 sm:p-4 border-t border-slate-800 bg-slate-950/80 backdrop-blur flex-shrink-0">
                <button id="btn-start-preview-mission" 
                        class="w-full py-3.5 rounded-xl font-black text-sm sm:text-base text-white shadow-xl flex items-center justify-center gap-2.5 cursor-pointer transition ${actionBtnDisabled ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' : 'preview-start-btn'}"
                        ${actionBtnDisabled ? 'disabled' : ''}>
                    ${actionBtnText}
                </button>
            </div>
        `;

        // Renderöi aito 3D-tilannekuva canvasille
        setTimeout(() => {
            const canvas = document.getElementById('preview-map-canvas');
            if (canvas) render3DLevelPreview(canvas, lvl);
        }, 15);

        const startBtn = document.getElementById('btn-start-preview-mission');
        if (startBtn && !actionBtnDisabled) {
            startBtn.onclick = () => loadLevel(lvl.id);
        }
    }
}

/**
 * Selvittää laitteen vyöhykekohtaisen aliverkon, jos laite sijaitsee
 * jollakin tasolle määritellyllä vyöhykkeellä jolla on oma subnet.
 * Jos ei, palauttaa tason yleisen aliverkon.
 * @param {Object} node 
 * @returns {Object} { details, cidr, zoneName }
 */
function getNodeSubnetScope(node) {
    if (!currentLevelConfig) return null;
    let details = currentLevelConfig.subnetDetails;
    let cidr = currentLevelConfig.cidr;
    let zoneName = null;

    if (node && currentLevelConfig.zones && currentLevelConfig.zones.length > 0) {
        const px = node.mesh.position.x;
        const pz = node.mesh.position.z;
        const targetZone = currentLevelConfig.zones.find(z => 
            px >= z.x - z.w / 2 && px <= z.x + z.w / 2 &&
            pz >= z.z - z.d / 2 && pz <= z.z + z.d / 2 &&
            z.subnet
        );
        if (targetZone && targetZone.subnet) {
            const [netIp, cidrStr] = targetZone.subnet.split('/');
            cidr = parseInt(cidrStr, 10);
            details = calculateSubnetDetails(netIp, cidr);
            zoneName = targetZone.name;
        }
    }

    return { details, cidr, zoneName };
}

/**
 * Tallentaa modulaarisen IP- ja peitesyötteen selaimen muistiin väliaikaisesti.
 * Muisti on nyt tasokohtainen ja laitetyyppikohtainen!
 */
function saveIpInputsToMemory() {
    if (!selectedNodeForIp) return;
    const ipParts = Array.from(document.querySelectorAll('.ip-octet')).map(el => el.value);
    const maskParts = Array.from(document.querySelectorAll('.mask-octet')).map(el => el.value);
    const lastInput = { ip: ipParts, mask: maskParts };
    const key = `subnetArchitect_lastInput_level_${currentLevel}_${selectedNodeForIp.userData.type}`;
    localStorage.setItem(key, JSON.stringify(lastInput));

    const scope = getNodeSubnetScope(selectedNodeForIp);
    if (scope && scope.details) {
        const netParts = Array.from(document.querySelectorAll('.net-octet')).map(el => el.value);
        const bcastParts = Array.from(document.querySelectorAll('.bcast-octet')).map(el => el.value);
        if (netParts.some(p => p !== '')) {
            localStorage.setItem(`subnetArchitect_lastInput_net_${currentLevel}_${scope.details.network}`, JSON.stringify(netParts));
        }
        if (bcastParts.some(p => p !== '')) {
            localStorage.setItem(`subnetArchitect_lastInput_bcast_${currentLevel}_${scope.details.network}`, JSON.stringify(bcastParts));
        }
    }
}

/**
 * Päivittää IP-modaalin vasemman sarakkeen laitelistan.
 * Näyttää jokaisen laitteen nimen, tyypin, kaapelitilan ja IP-tilan.
 * Klikkaamalla laitetta voi vaihtaa suoraan sen määritykseen.
 */
function updateModalDeviceList(selectedNode) {
    const listEl = document.getElementById('ip-modal-device-list');
    if (!listEl || !nodes || nodes.length === 0) return;

    const countEl = document.getElementById('ip-modal-device-count');
    const cablesSummaryEl = document.getElementById('ip-modal-cables-summary');
    const ipsSummaryEl = document.getElementById('ip-modal-ips-summary');

    let connectedCablesCount = 0;
    let configuredIpsCount = 0;
    let ipRequiredCount = 0;

    const typeIcons = {
        [nodeTypes.GATEWAY]: '🌐',
        [nodeTypes.ROUTER]: '📡',
        [nodeTypes.SWITCH]: '🔀',
        [nodeTypes.CORE_SWITCH]: '⚡',
        [nodeTypes.WIFI]: '📶',
        [nodeTypes.OFFICE]: '🏢',
        [nodeTypes.PC]: '🖥️',
        [nodeTypes.LAPTOP]: '💻',
        [nodeTypes.SERVER]: '🗄️',
        [nodeTypes.PRINTER]: '🖨️',
        [nodeTypes.VOIP]: '📞',
        [nodeTypes.FIREWALL]: '🔥',
        [nodeTypes.CLOUD]: '☁️'
    };

    const typeNames = {
        [nodeTypes.GATEWAY]: 'Default Gateway',
        [nodeTypes.ROUTER]: 'Reititin',
        [nodeTypes.SWITCH]: 'LAN-Kytkin',
        [nodeTypes.CORE_SWITCH]: 'Ydinlinkki',
        [nodeTypes.WIFI]: 'WiFi Tukiasema',
        [nodeTypes.OFFICE]: 'Toimisto PC',
        [nodeTypes.PC]: 'Työasema (PC)',
        [nodeTypes.LAPTOP]: 'Kannettava',
        [nodeTypes.SERVER]: 'Palvelin',
        [nodeTypes.PRINTER]: 'Tulostin',
        [nodeTypes.VOIP]: 'VoIP-puhelin',
        [nodeTypes.FIREWALL]: 'Palomuuri',
        [nodeTypes.CLOUD]: 'Internet / Pilvi'
    };

    let itemsHtml = '';

    nodes.forEach((n, idx) => {
        const isSelected = (n === selectedNode);
        const type = n.userData.type;
        const icon = typeIcons[type] || '📦';
        const typeLabel = typeNames[type] || type.toUpperCase();
        const scope = getNodeSubnetScope(n);
        const zoneName = scope ? scope.zoneName : null;

        // Tarkista kaapelointi
        const hasCable = (typeof cables !== 'undefined' && Array.isArray(cables)) && cables.some(c => c.nodeA === n || c.nodeB === n);
        if (hasCable) connectedCablesCount++;

        // Tarkista IP-vaatimus
        const requiresIp = (typeof IP_REQUIRED_TYPES !== 'undefined' && Array.isArray(IP_REQUIRED_TYPES)) ? IP_REQUIRED_TYPES.includes(type) : false;
        if (requiresIp) ipRequiredCount++;

        // Tarkista IP-tila
        const hasIp = !!(n.userData && n.userData.ip);
        const isIpCorrect = !!(n.userData && n.userData.correctIp);
        if (hasIp) configuredIpsCount++;

        let statusBg = isSelected 
            ? 'bg-blue-950/90 border-cyan-400 ring-2 ring-cyan-500/50 shadow-lg shadow-cyan-950/70' 
            : 'bg-slate-950/85 border-slate-700 hover:bg-slate-900 hover:border-slate-500';

        let ipBadgeHtml = '';
        if (requiresIp) {
            if (hasIp) {
                ipBadgeHtml = `<span class="font-mono text-xs font-black ${isIpCorrect ? 'text-emerald-400' : 'text-amber-400'}">IP: ${n.userData.ip}</span>`;
            } else {
                ipBadgeHtml = `<span class="text-xs font-black text-amber-300 bg-amber-950/70 px-2 py-0.5 rounded-lg border border-amber-600/50">IP puuttuu</span>`;
            }
        } else {
            ipBadgeHtml = `<span class="text-xs text-slate-500 font-bold">Ei vaadi IP:tä</span>`;
        }

        let cableBadgeHtml = hasCable 
            ? `<span class="text-xs font-black text-emerald-400 flex items-center gap-1.5"><span>🟢</span> Kytketty</span>` 
            : `<span class="text-xs font-black text-rose-400 flex items-center gap-1.5"><span>🔴</span> Ei kaapelia</span>`;

        itemsHtml += `
            <div onclick="selectNodeInModal(${idx})" class="p-3.5 rounded-2xl border ${statusBg} cursor-pointer transition-all flex flex-col gap-2 select-none group">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <span class="text-2xl group-hover:scale-110 transition-transform">${icon}</span>
                        <div>
                            <span class="text-sm font-black text-white block leading-snug">${typeLabel}</span>
                            ${zoneName ? `<span class="text-xs text-cyan-300 font-bold block">${zoneName}</span>` : ''}
                        </div>
                    </div>
                    ${isSelected ? `<span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-cyan-500/25 text-cyan-300 border border-cyan-500/60">Valittu</span>` : ''}
                </div>
                <div class="flex items-center justify-between pt-2 border-t border-slate-800/90 text-xs">
                    ${cableBadgeHtml}
                    ${ipBadgeHtml}
                </div>
            </div>
        `;
    });

    listEl.innerHTML = itemsHtml;

    if (countEl) countEl.innerText = `${nodes.length} kpl`;
    if (cablesSummaryEl) cablesSummaryEl.innerText = `${connectedCablesCount}/${nodes.length}`;
    if (ipsSummaryEl) ipsSummaryEl.innerText = `${configuredIpsCount}/${ipRequiredCount}`;
}

let currentHelpTab = 'steps';

/**
 * Vaihtaa ohjepalstan välilehteä:
 * - 'steps': Vaiheittainen pikaohje
 * - 'theory': Syventävä teoria & CCNA
 * - 'binary': Reaaliaikainen 32-bittinen visualisoija & Bitwise AND
 * - 'matrix': Aliverkkomatriisi / Cheat Sheet (/8 – /32)
 */
function switchHelpTab(tab) {
    currentHelpTab = tab || 'steps';
    const stepsBtn = document.getElementById('tab-btn-steps');
    const theoryBtn = document.getElementById('tab-btn-theory');
    const binaryBtn = document.getElementById('tab-btn-binary');
    const matrixBtn = document.getElementById('tab-btn-matrix');

    const stepsView = document.getElementById('ip-help-steps-view');
    const theoryView = document.getElementById('ip-help-theory-view');
    const binaryView = document.getElementById('ip-help-binary-view');
    const matrixView = document.getElementById('ip-help-matrix-view');

    const activeClass = 'px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all bg-cyan-600 text-white shadow-md shadow-cyan-600/30';
    const inactiveClass = 'px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all text-slate-400 hover:text-white hover:bg-slate-800';

    if (stepsBtn) stepsBtn.className = currentHelpTab === 'steps' ? activeClass : inactiveClass;
    if (theoryBtn) theoryBtn.className = currentHelpTab === 'theory' ? activeClass : inactiveClass;
    if (binaryBtn) binaryBtn.className = currentHelpTab === 'binary' ? activeClass : inactiveClass;
    if (matrixBtn) matrixBtn.className = currentHelpTab === 'matrix' ? activeClass : inactiveClass;

    if (stepsView) stepsView.classList.toggle('hidden', currentHelpTab !== 'steps');
    if (theoryView) theoryView.classList.toggle('hidden', currentHelpTab !== 'theory');
    if (binaryView) binaryView.classList.toggle('hidden', currentHelpTab !== 'binary');
    if (matrixView) matrixView.classList.toggle('hidden', currentHelpTab !== 'matrix');

    if (currentHelpTab === 'binary') {
        renderBinaryVisualizer();
    } else if (currentHelpTab === 'matrix') {
        renderSubnetMatrix();
    }
}

/**
 * Renderöi reaaliaikaisen 32-bittisen Bitwise AND -visualisoijan.
 */
function renderBinaryVisualizer() {
    const container = document.getElementById('ip-help-binary-view');
    if (!container) return;

    const ipInputs = Array.from(document.querySelectorAll('.ip-octet')).map(el => el.value.trim());
    const maskInputs = Array.from(document.querySelectorAll('.mask-octet')).map(el => el.value.trim());

    const scope = (selectedNodeForIp && typeof getNodeSubnetScope === 'function')
        ? getNodeSubnetScope(selectedNodeForIp)
        : null;
    const fallbackCidr = (scope && scope.cidr) ? scope.cidr : 24;

    const ip = (ipInputs.length === 4 && ipInputs.every(p => p !== ''))
        ? ipInputs.join('.')
        : (scope && scope.details ? scope.details.firstHost : '192.168.1.10');

    const mask = (maskInputs.length === 4 && maskInputs.every(p => p !== ''))
        ? maskInputs.join('.')
        : (scope && scope.details ? scope.details.mask : '255.255.255.0');

    const cidr = (typeof maskToCidr === 'function') ? maskToCidr(mask) : fallbackCidr;
    const breakdown = (typeof getBitwiseAndBreakdown === 'function')
        ? getBitwiseAndBreakdown(ip, cidr)
        : null;

    if (!breakdown) {
        container.innerHTML = '<div class="text-slate-400 text-xs p-4">Laskentafunktioita ladataan...</div>';
        return;
    }

    const ipClass = (typeof getIpClass === 'function') ? getIpClass(ip) : { classType: 'C', description: 'Luokka C' };
    const special = (typeof getSpecialIpType === 'function') ? getSpecialIpType(ip) : { isSpecial: false, type: 'Public IPv4' };
    const magic = (typeof getMagicNumber === 'function') ? getMagicNumber(cidr) : { formula: '256 − maski', blockSize: 256 };
    const wildcard = (typeof getWildcardMask === 'function') ? getWildcardMask(mask) : '0.0.0.255';

    function formatBitRow(binStr, isMask = false) {
        const raw = binStr.replace(/\./g, '');
        let html = '<div class="flex items-center gap-0.5 sm:gap-1 font-mono text-[10px] sm:text-xs select-none overflow-x-auto py-1">';
        for (let i = 0; i < 32; i++) {
            const bit = raw[i] || '0';
            const isNetBit = i < cidr;
            const isCutBit = i === cidr - 1;
            const isOctetBorder = (i + 1) % 8 === 0 && i < 31;

            let colorBg = isNetBit
                ? (isMask ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/70' : 'bg-cyan-950/90 text-cyan-300 border-cyan-500/70')
                : (isMask ? 'bg-slate-900 text-slate-500 border-slate-700' : 'bg-amber-950/90 text-amber-300 border-amber-500/70');

            let extraBorder = isCutBit ? 'border-r-2 border-r-rose-400 ring-1 ring-rose-500/60' : '';
            html += `<span class="inline-flex items-center justify-center w-4 sm:w-5 h-5 sm:h-6 rounded border ${colorBg} ${extraBorder} font-bold text-center">${bit}</span>`;
            if (isOctetBorder) {
                html += '<span class="text-slate-500 font-bold px-0.5">.</span>';
            }
        }
        html += '</div>';
        return html;
    }

    let statusBadge = '';
    if (breakdown.isNetworkAddress && cidr < 31) {
        statusBadge = '<span class="px-2.5 py-1 rounded-full text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-500/40">⚠️ Network ID – Ei voida antaa laitteelle!</span>';
    } else if (breakdown.isBroadcastAddress && cidr < 31) {
        statusBadge = '<span class="px-2.5 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">⚠️ Broadcast – Ei voida antaa laitteelle!</span>';
    } else if (breakdown.isUsableHost) {
        statusBadge = '<span class="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">✅ Sallittu Isäntäosoite</span>';
    } else {
        statusBadge = '<span class="px-2.5 py-1 rounded-full text-xs font-black bg-purple-500/20 text-purple-300 border border-purple-500/40">ℹ️ Aliverkon ulkopuolella</span>';
    }

    container.innerHTML = `
        <div class="space-y-4 text-slate-100">
            <!-- Yhteenvetokortti ja tilamerkki -->
            <div class="bg-slate-800/95 p-4 rounded-2xl border border-slate-600 shadow-xl space-y-3">
                <div class="flex items-center justify-between gap-2 flex-wrap">
                    <div class="flex items-center gap-2">
                        <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                            ⚙️ 32-BIT VISUALISOIJA
                        </span>
                        <span class="text-xs font-mono text-slate-400">Prefiksi: /${cidr}</span>
                    </div>
                    ${statusBadge}
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                    <div class="bg-slate-900/90 p-2.5 rounded-xl border border-slate-700">
                        <span class="text-[10px] text-slate-400 uppercase font-bold block">IP-Luokka:</span>
                        <span class="font-bold text-white text-sm">${ipClass.classType}</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-xl border border-slate-700">
                        <span class="text-[10px] text-slate-400 uppercase font-bold block">Tyyppi:</span>
                        <span class="font-bold text-cyan-300 text-xs truncate block" title="${special.type}">${special.type}</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-xl border border-slate-700">
                        <span class="text-[10px] text-slate-400 uppercase font-bold block">Magic Number:</span>
                        <span class="font-mono font-bold text-amber-300 text-sm">${magic.blockSize}</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-xl border border-slate-700">
                        <span class="text-[10px] text-slate-400 uppercase font-bold block">Wildcard:</span>
                        <span class="font-mono font-bold text-purple-300 text-xs">${wildcard}</span>
                    </div>
                </div>
            </div>

            <!-- Reaaliaikainen 32-bittinen totuustaulu -->
            <div class="bg-slate-800/95 p-4 rounded-2xl border border-slate-600 shadow-xl space-y-3.5">
                <div class="flex items-center justify-between pb-2 border-b border-slate-700 text-xs flex-wrap gap-2">
                    <span class="font-bold text-white flex items-center gap-1.5">
                        <span>🔍</span> Bitwise AND -hajotelma (Rautatason laskenta)
                    </span>
                    <div class="flex items-center gap-3 text-[11px]">
                        <span class="flex items-center gap-1 text-cyan-300 font-bold"><span class="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block"></span> Verkko (${cidr}b)</span>
                        <span class="flex items-center gap-1 text-amber-300 font-bold"><span class="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> Isäntä (${32 - cidr}b)</span>
                    </div>
                </div>

                <!-- IP Binaari -->
                <div class="space-y-1">
                    <div class="flex justify-between items-center text-xs">
                        <span class="text-slate-300 font-bold">Syötetty IP:</span>
                        <span class="font-mono text-cyan-300 font-bold">${ip}</span>
                    </div>
                    <div class="overflow-x-auto pb-1">
                        ${formatBitRow(breakdown.ipBinary, false)}
                    </div>
                </div>

                <!-- Mask Binaari -->
                <div class="space-y-1">
                    <div class="flex justify-between items-center text-xs">
                        <span class="text-slate-300 font-bold">Aliverkon Peite (AND-maski):</span>
                        <span class="font-mono text-emerald-300 font-bold">${mask}</span>
                    </div>
                    <div class="overflow-x-auto pb-1">
                        ${formatBitRow(breakdown.maskBinary, true)}
                    </div>
                </div>

                <div class="border-t border-dashed border-slate-600 my-2"></div>

                <!-- Tulos (Network ID) -->
                <div class="space-y-1">
                    <div class="flex justify-between items-center text-xs">
                        <span class="text-white font-bold flex items-center gap-1">
                            <span>➔</span> Bitwise AND -tulos (Network ID):
                        </span>
                        <span class="font-mono text-white font-black text-sm bg-slate-900 px-2 py-0.5 rounded">${breakdown.network}</span>
                    </div>
                    <div class="overflow-x-auto pb-1">
                        ${formatBitRow(breakdown.networkBinary, false)}
                    </div>
                </div>

                <div class="bg-slate-900/90 p-3 rounded-xl border border-slate-700/80 text-xs text-slate-300 space-y-1 leading-relaxed">
                    <p>
                        Punainen pystyviiva osoittaa <strong class="text-white">CIDR-leikkauskohdan (/${cidr})</strong>.
                        Maskin ykkösbitit kopioivat IP:n verkko-osan suoraan tulokseen. Maskin nollabitit pakottavat tuloksen isäntäosan nolliksi, jolloin saadaan aliverkon <strong class="text-cyan-300">Network ID (${breakdown.network})</strong>.
                    </p>
                </div>
            </div>

            <!-- Aliverkon sallitut rajat -->
            <div class="bg-slate-900/90 p-4 rounded-2xl border border-slate-700 text-xs space-y-2">
                <div class="font-bold text-white text-xs uppercase tracking-wider">Tämän Aliverkkolohkon Rajat:</div>
                <div class="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div class="p-2 bg-slate-950 rounded-lg border border-slate-800">
                        <span class="text-slate-400 block text-[10px]">Alin (Verkko-IP):</span>
                        <span class="text-rose-300 font-bold">${breakdown.details.network}</span>
                    </div>
                    <div class="p-2 bg-slate-950 rounded-lg border border-slate-800">
                        <span class="text-slate-400 block text-[10px]">Ylin (Broadcast):</span>
                        <span class="text-amber-300 font-bold">${breakdown.details.broadcast}</span>
                    </div>
                    <div class="p-2 bg-slate-950 rounded-lg border border-slate-800">
                        <span class="text-slate-400 block text-[10px]">1. Sallittu isäntä:</span>
                        <span class="text-emerald-300 font-bold">${breakdown.details.firstHost}</span>
                    </div>
                    <div class="p-2 bg-slate-950 rounded-lg border border-slate-800">
                        <span class="text-slate-400 block text-[10px]">Viim. sallittu isäntä:</span>
                        <span class="text-emerald-300 font-bold">${breakdown.details.lastHost}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Renderöi CCNA / Network+ Subnetting Cheat Sheet -matriisin (/8 – /32).
 */
function renderSubnetMatrix() {
    const container = document.getElementById('ip-help-matrix-view');
    if (!container) return;

    const scope = (selectedNodeForIp && typeof getNodeSubnetScope === 'function')
        ? getNodeSubnetScope(selectedNodeForIp)
        : null;
    const currentCidr = (scope && scope.cidr) ? scope.cidr : 24;

    const matrixRows = [
        { cidr: 8, mask: '255.0.0.0', wildcard: '0.255.255.255', magic: 256, hosts: '16 777 214', note: 'Luokka A / Suuret organisaatiot' },
        { cidr: 12, mask: '255.240.0.0', wildcard: '0.15.255.255', magic: 16, hosts: '1 048 574', note: 'RFC 1918 Yksityinen B-alue' },
        { cidr: 16, mask: '255.255.0.0', wildcard: '0.0.255.255', magic: 256, hosts: '65 534', note: 'Luokka B / Kampusverkot' },
        { cidr: 18, mask: '255.255.192.0', wildcard: '0.0.63.255', magic: 64, hosts: '16 382', note: 'Alueelliset toimipisteet' },
        { cidr: 20, mask: '255.255.240.0', wildcard: '0.0.15.255', magic: 16, hosts: '4 094', note: 'Keskisuuret toimistot' },
        { cidr: 21, mask: '255.255.248.0', wildcard: '0.0.7.255', magic: 8, hosts: '2 046', note: 'Tehdasalueet' },
        { cidr: 22, mask: '255.255.252.0', wildcard: '0.0.3.255', magic: 4, hosts: '1 022', note: 'Korkeakoulukampukset' },
        { cidr: 23, mask: '255.255.254.0', wildcard: '0.0.1.255', magic: 2, hosts: '510', note: 'Suuret konttorit / Sairaalat' },
        { cidr: 24, mask: '255.255.255.0', wildcard: '0.0.0.255', magic: 256, hosts: '254', note: 'Luokka C / SOHO & Pk-yritykset' },
        { cidr: 25, mask: '255.255.255.128', wildcard: '0.0.0.127', magic: 128, hosts: '126', note: 'Osastosegmentointi (2 lohkoa)' },
        { cidr: 26, mask: '255.255.255.192', wildcard: '0.0.0.63', magic: 64, hosts: '62', note: 'Neljännesaliverkko (4 lohkoa)' },
        { cidr: 27, mask: '255.255.255.224', wildcard: '0.0.0.31', magic: 32, hosts: '30', note: 'Projektitiimit / WiFi-alueet' },
        { cidr: 28, mask: '255.255.255.240', wildcard: '0.0.0.15', magic: 16, hosts: '14', note: 'Palvelinräkit & DMZ' },
        { cidr: 29, mask: '255.255.255.248', wildcard: '0.0.0.7', magic: 8, hosts: '6', note: 'Palomuuriklustereiden HA' },
        { cidr: 30, mask: '255.255.255.252', wildcard: '0.0.0.3', magic: 4, hosts: '2', note: 'Perinteinen reititinlinkki' },
        { cidr: 31, mask: '255.255.255.254', wildcard: '0.0.0.1', magic: 2, hosts: '2', note: '⚡ RFC 3021 Point-to-Point (Konesalit)' },
        { cidr: 32, mask: '255.255.255.255', wildcard: '0.0.0.0', magic: 1, hosts: '1', note: '📍 RFC 4632 Host Route / Loopback' }
    ];

    let rowsHtml = '';
    matrixRows.forEach(r => {
        const isCurrent = r.cidr === currentCidr;
        const rowClass = isCurrent
            ? 'bg-cyan-950/80 border-2 border-cyan-400 font-bold text-white shadow-md shadow-cyan-950'
            : 'border-b border-slate-800/80 hover:bg-slate-800/50 text-slate-300';

        rowsHtml += `
            <tr class="${rowClass} transition-colors">
                <td class="p-2.5 font-mono text-cyan-300 font-black whitespace-nowrap">
                    /${r.cidr} ${isCurrent ? '<span class="text-amber-400 text-xs">★ Nykyinen</span>' : ''}
                </td>
                <td class="p-2.5 font-mono text-white text-xs whitespace-nowrap">${r.mask}</td>
                <td class="p-2.5 font-mono text-amber-300 text-xs text-center">${r.magic}</td>
                <td class="p-2.5 font-mono text-emerald-300 text-xs font-bold text-right">${r.hosts}</td>
                <td class="p-2.5 font-mono text-purple-300 text-xs hidden sm:table-cell">${r.wildcard}</td>
                <td class="p-2.5 text-xs text-slate-300 hidden md:table-cell">${r.note}</td>
            </tr>
        `;
    });

    container.innerHTML = `
        <div class="space-y-4 text-slate-100">
            <div class="bg-slate-800/95 p-4 rounded-2xl border border-slate-600 shadow-xl space-y-2">
                <div class="flex items-center justify-between">
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-500/20 text-purple-300 border border-purple-500/40">
                        📊 CCNA & NETWORK+ CHEAT SHEET
                    </span>
                    <span class="text-xs text-slate-400">Prefiksit /8 – /32</span>
                </div>
                <h4 class="text-sm font-bold text-white flex items-center gap-1.5">
                    Aliverkkotaulukko (Subnetting Matrix)
                </h4>
                <p class="text-xs text-slate-300 leading-relaxed">
                    Ammattilaisen pikaopas: etsi vasemmalta tarvittava isäntämäärä tai prefiksi, josta näet välittömästi maskin, Magic Number -lohkokoon ja tyypillisen käyttötarkoituksen.
                </p>
            </div>

            <div class="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900/95 shadow-xl">
                <table class="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr class="bg-slate-950 border-b border-slate-700 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                            <th class="p-2.5">CIDR</th>
                            <th class="p-2.5">Aliverkon Peite</th>
                            <th class="p-2.5 text-center">Lohko</th>
                            <th class="p-2.5 text-right">Isännät</th>
                            <th class="p-2.5 hidden sm:table-cell">Wildcard</th>
                            <th class="p-2.5 hidden md:table-cell">Käyttökohde</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-800">
                        ${rowsHtml}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

/**
 * Vaihtaa IP-modaalissa valitun laitteen suoraan listasta ja navigoi kameran laitteen luokse taustalla.
 */
function selectNodeInModal(index) {
    if (!nodes || !nodes[index]) return;
    saveIpInputsToMemory();
    const targetNode = nodes[index];

    // Navigoidaan 3D-kamera sulavasti kohdelaitteen luokse taustalla
    if (targetNode && targetNode.mesh && typeof cameraTarget !== 'undefined' && cameraTarget) {
        cameraTarget.x = targetNode.mesh.position.x;
        cameraTarget.z = targetNode.mesh.position.z;
    }

    // Pieni hyppyanimaatio laitteelle 3D-maailmassa huomion kiinnittämiseksi
    if (targetNode && targetNode.userData) {
        targetNode.userData.animating = true;
        targetNode.userData.animStart = Date.now();
    }

    openIpModal(targetNode);
}

if (typeof window !== 'undefined') {
    window.selectNodeInModal = selectNodeInModal;
    window.updateModalDeviceList = updateModalDeviceList;
    window.switchHelpTab = switchHelpTab;
}

/**
 * Avaa IP-määritysikkunan ja näyttää tasokohtaisen opetusmateriaalin.
 */
function openIpModal(node) {
    selectedNodeForIp = node;
    calcClear();

    // Navigoidaan 3D-kamera kohdelaitteen luokse
    if (node && node.mesh && typeof cameraTarget !== 'undefined' && cameraTarget) {
        cameraTarget.x = node.mesh.position.x;
        cameraTarget.z = node.mesh.position.z;
    }

    document.getElementById('ip-modal').classList.remove('hidden');
    setTimeout(() => {
        const content = document.getElementById('ip-modal-content');
        if (content) content.classList.remove('scale-95', 'opacity-0');
    }, 10);

    // Päivitetään vasemman sarakkeen laitelista reaaliaikaisesti
    updateModalDeviceList(node);

    // Hae viimeksi syötetyt arvot (tasokohtainen ja laitetyyppikohtainen muisti)
    const key = `subnetArchitect_lastInput_level_${currentLevel}_${node.userData.type}`;
    const lastInputStr = localStorage.getItem(key);
    const lastInput = lastInputStr ? JSON.parse(lastInputStr) : { ip: ['', '', '', ''], mask: ['', '', '', ''] };

    // Täytä laitteen oikeat arvot JOS ne on asetettu, MUUTEN käytä viimeksi kirjoitettuja
    const ipParts = node.userData.ip ? node.userData.ip.split('.') : lastInput.ip;
    document.querySelectorAll('.ip-octet').forEach((el, i) => { el.value = ipParts[i] || ''; });
    
    const maskParts = node.userData.mask ? node.userData.mask.split('.') : lastInput.mask;
    document.querySelectorAll('.mask-octet').forEach((el, i) => { el.value = maskParts[i] || ''; });

    // Haetaan laitteen oikea aliverkko (huomioi laitteen sijaintivyöhyke!)
    const scope = getNodeSubnetScope(node);
    const details = scope.details;
    const cidr = scope.cidr;

    // Verkon rajat (Verkko-ID ja Broadcast) -vaatimus vaativammilla tasoilla
    const boundsSection = document.getElementById('network-bounds-section');
    const requiresBounds = currentLevelConfig && (currentLevelConfig.difficulty >= 3 || currentLevelConfig.id >= 11);
    if (boundsSection) {
        if (requiresBounds) {
            boundsSection.classList.remove('hidden');
            const netKey = `subnetArchitect_lastInput_net_${currentLevel}_${details.network}`;
            const bcastKey = `subnetArchitect_lastInput_bcast_${currentLevel}_${details.network}`;
            const lastNet = localStorage.getItem(netKey) ? JSON.parse(localStorage.getItem(netKey)) : ['', '', '', ''];
            const lastBcast = localStorage.getItem(bcastKey) ? JSON.parse(localStorage.getItem(bcastKey)) : ['', '', '', ''];
            document.querySelectorAll('.net-octet').forEach((el, i) => { el.value = lastNet[i] || ''; });
            document.querySelectorAll('.bcast-octet').forEach((el, i) => { el.value = lastBcast[i] || ''; });
        } else {
            boundsSection.classList.add('hidden');
        }
    }

    // Näytä laitteen tila, tyyppi ja osasto
    const typeLabel = node.userData.type.toUpperCase();
    const infoEl = document.getElementById('ip-modal-node-info');
    if (infoEl) {
        const zoneBadge = scope.zoneName ? ` • Alue: <strong class="text-blue-300">${scope.zoneName}</strong>` : '';
        if (node.userData.correctIp && node.userData.ip) {
            infoEl.innerHTML = `Laite: <strong class="text-white">${typeLabel}</strong>${zoneBadge} • Nykyinen IP: <span class="font-mono text-emerald-400 font-bold">${node.userData.ip}</span>`;
        } else {
            infoEl.innerHTML = `Laite: <strong class="text-white">${typeLabel}</strong>${zoneBadge} • <span class="text-slate-400">Ei vielä määritettyä IP-osoitetta</span>`;
        }
    }

    // Näytä muiden laitteiden jo varaamat IP-osoitteet sekaannusten välttämiseksi
    const usedIpsEl = document.getElementById('ip-modal-used-ips');
    if (usedIpsEl) {
        const otherNodesWithIp = nodes.filter(n => n !== node && n.userData.correctIp && n.userData.ip);
        if (otherNodesWithIp.length > 0) {
            const list = otherNodesWithIp.map(n => `${n.userData.type}: <span class="text-white font-bold">${n.userData.ip}</span>`).join(', ');
            usedIpsEl.innerHTML = `⚠️ Verkossa jo varatut osoitteet: ${list}`;
        } else {
            usedIpsEl.innerHTML = '';
        }
    }

    const levelId = (currentLevelConfig && currentLevelConfig.id) ? currentLevelConfig.id : currentLevel;
    const hostBits = 32 - cidr;

    // Tyhjennetään placeholderit kaikista kentistä - ei näytetä hämääviä valmiita numeroita kentissä
    document.querySelectorAll('.ip-octet, .mask-octet, .net-octet, .bcast-octet').forEach(el => {
        el.placeholder = '';
    });

    // Päivitetään vaihevälilehden napin teksti tason vaativuuden mukaan
    const stepsTabBtn = document.getElementById('tab-btn-steps');
    if (stepsTabBtn) {
        if (levelId <= 5) {
            stepsTabBtn.innerHTML = '🎯 Vaiheittainen Pikaohje';
        } else if (levelId <= 10) {
            stepsTabBtn.innerHTML = '🎯 Ohjattu Laskenta';
        } else {
            stepsTabBtn.innerHTML = '🎯 Tehtävän Kaavat & Vaatimukset';
        }
    }

    // Tasokohtainen opetusmateriaali kyseiselle aliverkolle
    const topic = (currentLevelConfig && currentLevelConfig.teachingTopic && typeof TEACHING_CONTENT !== 'undefined' && TEACHING_CONTENT[currentLevelConfig.teachingTopic])
        ? currentLevelConfig.teachingTopic
        : (typeof TEACHING_CONTENT !== 'undefined' && TEACHING_CONTENT['slash' + cidr]
            ? 'slash' + cidr
            : 'ip_basics');

    // Päivitetään CIDR-badge
    const helpBadge = document.getElementById('ip-help-badge');
    if (helpBadge) helpBadge.innerText = `/${cidr}`;

    // Generoidaan vaihekortit tason vaativuustason mukaan (Pedagoginen porrastus)
    let stepCards = '';

    if (levelId <= 5) {
        // =========================================================================
        // TASOT 1–5: ALOITTELIJAN TUKI (Täydet esimerkit ja selkeät mallivastaukset)
        // =========================================================================
        stepCards = `
            <div class="space-y-4 text-slate-100">
                <div class="bg-blue-950/40 p-3 rounded-xl border border-blue-500/40 text-xs text-blue-200">
                    💡 <strong>Aloittelijan opastus:</strong> Tällä alkutasolla vaiheittainen ohje näyttää verkon laskennan ja arvot valmiina. Myöhemmillä tasoilla saat laskea verkon rajat itse!
                </div>

                <!-- VAIHE 1: ALIVERKKO & PEITE -->
                <div class="bg-slate-800/95 p-5 rounded-2xl border-2 border-blue-500/50 shadow-xl space-y-3.5">
                    <div class="flex items-center justify-between pb-3 border-b border-slate-700">
                        <div class="flex items-center gap-3">
                            <span class="px-3.5 py-1 rounded-full text-xs font-black bg-blue-500 text-white tracking-wider uppercase">VAIHE 1</span>
                            <h5 class="text-lg sm:text-xl font-black text-white">Kohdeverkko & Aliverkon Peite</h5>
                        </div>
                        <span class="font-mono text-lg sm:text-xl font-black text-cyan-300 bg-cyan-950/80 px-3.5 py-1.5 rounded-xl border border-cyan-600/50">/${cidr}</span>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                        <div class="bg-slate-900/95 p-4 rounded-xl border border-slate-700">
                            <span class="text-xs text-slate-400 block uppercase font-bold mb-1.5">Aliverkon Osoite (Network):</span>
                            <span class="font-mono text-2xl sm:text-3xl font-black text-cyan-300 block">${details.network}</span>
                            <span class="text-sm text-slate-300 font-medium mt-1.5 block">Tunnistaa aliverkon lohkon</span>
                        </div>
                        <div class="bg-slate-900/95 p-4 rounded-xl border border-purple-800/60">
                            <span class="text-xs text-slate-400 block uppercase font-bold mb-1.5">Aliverkon Peite (Subnet Mask):</span>
                            <span class="font-mono text-2xl sm:text-3xl font-black text-purple-300 block">${details.mask}</span>
                            <span class="text-sm text-purple-200/90 font-medium mt-1.5 block">${cidr} bittiä verkolle, ${hostBits} isännille</span>
                        </div>
                    </div>
                </div>

                <!-- VAIHE 2: VERKON RAJAT -->
                <div class="bg-slate-800/95 p-5 rounded-2xl border-2 border-amber-500/40 shadow-xl space-y-3.5">
                    <div class="flex items-center justify-between pb-3 border-b border-slate-700">
                        <div class="flex items-center gap-3">
                            <span class="px-3.5 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-950 tracking-wider uppercase">VAIHE 2</span>
                            <h5 class="text-lg sm:text-xl font-black text-white">Verkon Rajat (Alin & Ylin Osoite)</h5>
                        </div>
                        <span class="text-xs font-black text-amber-300 bg-amber-950/70 px-3.5 py-1.5 rounded-xl border border-amber-500/50">Lohkokoko: ${details.totalIps} kpl</span>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                        <div class="bg-slate-900/95 p-4 rounded-xl border border-red-900/40">
                            <div class="flex items-center justify-between mb-1.5"><span class="text-xs font-bold text-red-300 uppercase">Verkko-IP (Network ID):</span><span class="text-xs text-slate-400 font-bold">Alin osoite</span></div>
                            <span class="font-mono text-2xl sm:text-3xl font-black text-red-300 block">${details.network}</span>
                            <p class="text-sm text-slate-300 mt-2 leading-relaxed">Lohkon ensimmäinen osoite. Tätä <strong>ei voi</strong> antaa laitteelle!</p>
                        </div>
                        <div class="bg-slate-900/95 p-4 rounded-xl border border-red-900/40">
                            <div class="flex items-center justify-between mb-1.5"><span class="text-xs font-bold text-red-300 uppercase">Broadcast-osoite:</span><span class="text-xs text-slate-400 font-bold">Ylin osoite</span></div>
                            <span class="font-mono text-2xl sm:text-3xl font-black text-red-300 block">${details.broadcast}</span>
                            <p class="text-sm text-slate-300 mt-2 leading-relaxed">Yleislähetysosoite. Tätä <strong>ei voi</strong> antaa laitteelle!</p>
                        </div>
                    </div>
                </div>

                <!-- VAIHE 3: SALLITUT ISÄNTÄOSOITTEET -->
                <div class="bg-emerald-950/70 p-5 rounded-2xl border-2 border-emerald-500/60 shadow-xl space-y-3.5">
                    <div class="flex items-center justify-between pb-3 border-b border-emerald-700/50">
                        <div class="flex items-center gap-3">
                            <span class="px-3.5 py-1 rounded-full text-xs font-black bg-emerald-500 text-slate-950 tracking-wider uppercase">VAIHE 3</span>
                            <h5 class="text-lg sm:text-xl font-black text-emerald-300">Laitteille Sallitut IP-Osoitteet</h5>
                        </div>
                        <span class="text-xs font-mono font-black text-emerald-300 bg-emerald-900/80 px-3.5 py-1.5 rounded-xl border border-emerald-500/50">${details.usableHosts || (details.totalIps - 2)} vapaata osoitetta</span>
                    </div>
                    <div class="bg-slate-900/95 p-4 rounded-xl border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <span class="text-xs text-slate-400 uppercase font-bold block mb-1.5">Sallittu osoiteväli:</span>
                            <div class="font-mono text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
                                <span class="text-emerald-300">${details.firstHost}</span>
                                <span class="text-slate-500 text-lg font-sans font-black">➔</span>
                                <span class="text-emerald-300">${details.lastHost}</span>
                            </div>
                        </div>
                        <span class="px-3.5 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 font-black text-xs inline-block border border-emerald-500/50">Valitse mikä tahansa vapaa IP!</span>
                    </div>
                    <p class="text-sm text-emerald-200/95 font-medium leading-relaxed pt-1">💡 <strong>Sääntö:</strong> Jokaisella laitteella on oltava uniikki IP tältä väliltä.</p>
                </div>

                <!-- VAIHE 4: KAAVAT -->
                <div class="bg-slate-800/95 p-5 rounded-2xl border-2 border-indigo-500/40 shadow-xl space-y-3.5">
                    <div class="flex items-center justify-between pb-3 border-b border-slate-700">
                        <div class="flex items-center gap-3">
                            <span class="px-3.5 py-1 rounded-full text-xs font-black bg-indigo-500 text-white tracking-wider uppercase">VAIHE 4</span>
                            <h5 class="text-lg sm:text-xl font-black text-white">Miten Nämä Lasketaan?</h5>
                        </div>
                        <span class="text-xs font-mono text-indigo-300 font-bold">Kaavat & Apuri</span>
                    </div>
                    <div class="space-y-3 text-sm sm:text-base text-slate-200 leading-relaxed">
                        <div class="p-3.5 bg-slate-900/95 rounded-xl border border-slate-700"><strong class="text-cyan-300 block mb-1">1. Isäntäbitit (Host bits):</strong> 32 bittiä − /${cidr} = <strong class="text-white font-mono">${hostBits} bittiä</strong>.</div>
                        <div class="p-3.5 bg-slate-900/95 rounded-xl border border-slate-700"><strong class="text-amber-300 block mb-1">2. Lohkokoko (Block size):</strong> 2^${hostBits} = <strong class="text-white font-mono">${details.totalIps} osoitetta</strong>.</div>
                        <div class="p-3.5 bg-slate-900/95 rounded-xl border border-slate-700"><strong class="text-purple-300 block mb-1">3. Taikanumerokaava peitteelle:</strong> Täydet tavut 255. Jaettu tavu: <code class="text-white font-mono">256 − ${details.totalIps > 256 ? Math.floor(details.totalIps / 256) : details.totalIps}</code>.</div>
                    </div>
                </div>
            </div>
        `;
    } else if (levelId <= 10) {
        // =========================================================================
        // TASOT 6–10: OHJATTU LASKENTA (Kaavat ja vihjeet, mutta pelaaja laskee itse)
        // =========================================================================
        stepCards = `
            <div class="space-y-4 text-slate-100">
                <div class="bg-amber-950/40 p-3 rounded-xl border border-amber-500/40 text-xs text-amber-200">
                    🧮 <strong>Ohjattu laskenta:</strong> Laske aliverkon rajat ja peite käyttämällä apulaskinta ja alla olevia kaavoja!
                </div>

                <!-- VAIHE 1: KOHDEVERKKO JA PEITTEEN LASKENTA -->
                <div class="bg-slate-800/95 p-5 rounded-2xl border-2 border-blue-500/50 shadow-xl space-y-3.5">
                    <div class="flex items-center justify-between pb-3 border-b border-slate-700">
                        <div class="flex items-center gap-3">
                            <span class="px-3.5 py-1 rounded-full text-xs font-black bg-blue-500 text-white tracking-wider uppercase">VAIHE 1</span>
                            <h5 class="text-lg sm:text-xl font-black text-white">Kohdeverkko & Peitteen Laskenta</h5>
                        </div>
                        <span class="font-mono text-lg sm:text-xl font-black text-cyan-300 bg-cyan-950/80 px-3.5 py-1.5 rounded-xl border border-cyan-600/50">/${cidr}</span>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                        <div class="bg-slate-900/95 p-4 rounded-xl border border-slate-700">
                            <span class="text-xs text-slate-400 block uppercase font-bold mb-1.5">Kohdeverkon Tunniste:</span>
                            <span class="font-mono text-2xl sm:text-3xl font-black text-cyan-300 block">${details.network}</span>
                            <span class="text-sm text-slate-300 font-medium mt-1.5 block">Aliverkon alkupiste</span>
                        </div>
                        <div class="bg-slate-900/95 p-4 rounded-xl border border-purple-800/60">
                            <span class="text-xs text-slate-400 block uppercase font-bold mb-1.5">Aliverkon Peite (Laske itse):</span>
                            <span class="font-mono text-xl sm:text-2xl font-black text-purple-300 block">255.255.255.???</span>
                            <span class="text-sm text-purple-200/90 font-medium mt-1.5 block">Kaava: <code class="text-white font-mono">256 − ${details.totalIps}</code></span>
                        </div>
                    </div>
                </div>

                <!-- VAIHE 2: VERKON RAJAT -->
                <div class="bg-slate-800/95 p-5 rounded-2xl border-2 border-amber-500/40 shadow-xl space-y-3.5">
                    <div class="flex items-center justify-between pb-3 border-b border-slate-700">
                        <div class="flex items-center gap-3">
                            <span class="px-3.5 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-950 tracking-wider uppercase">VAIHE 2</span>
                            <h5 class="text-lg sm:text-xl font-black text-white">Laske Verkon Rajat</h5>
                        </div>
                        <span class="text-xs font-black text-amber-300 bg-amber-950/70 px-3.5 py-1.5 rounded-xl border border-amber-500/50">Lohko: 2^${hostBits} = ${details.totalIps} IP:tä</span>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                        <div class="bg-slate-900/95 p-4 rounded-xl border border-slate-700">
                            <span class="text-xs font-bold text-slate-400 uppercase block mb-1">Verkko-IP (Alin):</span>
                            <span class="font-mono text-xl sm:text-2xl font-black text-cyan-300 block">${details.network}</span>
                            <span class="text-xs text-slate-400 mt-1 block">Varattu verkolle</span>
                        </div>
                        <div class="bg-slate-900/95 p-4 rounded-xl border border-red-900/40">
                            <span class="text-xs font-bold text-red-300 uppercase block mb-1">Broadcast (Ylin):</span>
                            <span class="font-mono text-xl sm:text-2xl font-black text-red-300 block">${details.network.replace(/\.\d+$/, '')}.???</span>
                            <span class="text-xs text-slate-300 mt-1 block">Laske: Alin + ${details.totalIps - 1}</span>
                        </div>
                    </div>
                </div>

                <!-- VAIHE 3: ISÄNTÄOSOITTEET -->
                <div class="bg-emerald-950/70 p-5 rounded-2xl border-2 border-emerald-500/60 shadow-xl space-y-3">
                    <div class="flex items-center justify-between pb-3 border-b border-emerald-700/50">
                        <div class="flex items-center gap-3">
                            <span class="px-3.5 py-1 rounded-full text-xs font-black bg-emerald-500 text-slate-950 tracking-wider uppercase">VAIHE 3</span>
                            <h5 class="text-lg sm:text-xl font-black text-emerald-300">Sallitut Laitteiden IP-Osoitteet</h5>
                        </div>
                        <span class="text-xs font-mono font-black text-emerald-300 bg-emerald-900/80 px-3 py-1 rounded-lg border border-emerald-500/50">${details.totalIps - 2} käyttökelpoista</span>
                    </div>
                    <p class="text-sm text-emerald-200 leading-relaxed">
                        Sallittu väli alkaa osoitteesta <strong class="text-white font-mono">${details.firstHost}</strong> ja päättyy juuri ennen Broadcast-osoitetta. Valitse vapaa IP tältä väliltä!
                    </p>
                </div>
            </div>
        `;
    } else {
        // =========================================================================
        // TASOT 11–61: INSINÖÖRIN LASKENTAOHJE & VAATIMUKSET (Ei valmiita vastauksia)
        // =========================================================================
        stepCards = `
            <div class="space-y-4 text-slate-100">
                <div class="bg-indigo-950/50 p-3.5 rounded-xl border border-indigo-500/40 text-xs sm:text-sm text-indigo-200 leading-relaxed">
                    ⚙️ <strong>Insinöörin tehtävä:</strong> Tällä tasolla ei anneta valmiita vastauksia. Laske aliverkon peite ja verkon rajat apulaskimella ja syötä ne kenttiin.
                </div>

                <!-- VAATIMUS 1: KOHDEVERKKO & PEITE -->
                <div class="bg-slate-800/95 p-5 rounded-2xl border-2 border-blue-500/50 shadow-xl space-y-3.5">
                    <div class="flex items-center justify-between pb-3 border-b border-slate-700">
                        <div class="flex items-center gap-3">
                            <span class="px-3.5 py-1 rounded-full text-xs font-black bg-blue-500 text-white tracking-wider uppercase">VAIHE 1</span>
                            <h5 class="text-lg sm:text-xl font-black text-white">Kohdeverkon Määritys</h5>
                        </div>
                        <span class="font-mono text-lg sm:text-xl font-black text-cyan-300 bg-cyan-950/80 px-3.5 py-1.5 rounded-xl border border-cyan-600/50">/${cidr}</span>
                    </div>
                    <div class="p-4 bg-slate-900/95 rounded-xl border border-slate-700 space-y-2">
                        <div class="flex items-center justify-between text-sm sm:text-base">
                            <span class="text-slate-400">Kohdeverkkoalue:</span>
                            <span class="font-mono text-cyan-300 font-bold text-lg">${details.network} /${cidr}</span>
                        </div>
                        <div class="flex items-center justify-between text-sm sm:text-base pt-2 border-t border-slate-800">
                            <span class="text-slate-400">Tehtäväsi:</span>
                            <span class="text-amber-300 font-bold">Laske ja syötä Aliverkon peite (Mask)</span>
                        </div>
                    </div>
                </div>

                <!-- VAATIMUS 2: VERKON RAJAT -->
                <div class="bg-slate-800/95 p-5 rounded-2xl border-2 border-amber-500/40 shadow-xl space-y-3.5">
                    <div class="flex items-center justify-between pb-3 border-b border-slate-700">
                        <div class="flex items-center gap-3">
                            <span class="px-3.5 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-950 tracking-wider uppercase">VAIHE 2</span>
                            <h5 class="text-lg sm:text-xl font-black text-white">Laske Verkon Rajat (Pakollinen)</h5>
                        </div>
                        <span class="text-xs font-black text-amber-300 bg-amber-950/70 px-3 py-1 rounded-lg border border-amber-500/40">Vaaditaan tasoilla 11+</span>
                    </div>
                    <p class="text-sm text-slate-300 leading-relaxed">
                        Laske lohkon alin osoite (<strong class="text-white">Network ID</strong>) ja ylin osoite (<strong class="text-white">Broadcast</strong>) ja syötä ne vasemmalle <em>Verkon rajat</em> -kenttiin.
                    </p>
                </div>

                <!-- VAATIMUS 3: LAITEOIKAISU -->
                <div class="bg-emerald-950/70 p-5 rounded-2xl border-2 border-emerald-500/60 shadow-xl space-y-3">
                    <div class="flex items-center justify-between pb-3 border-b border-emerald-700/50">
                        <div class="flex items-center gap-3">
                            <span class="px-3.5 py-1 rounded-full text-xs font-black bg-emerald-500 text-slate-950 tracking-wider uppercase">VAIHE 3</span>
                            <h5 class="text-lg sm:text-xl font-black text-emerald-300">Aseta Uniikki Laite-IP</h5>
                        </div>
                    </div>
                    <p class="text-sm text-emerald-200 leading-relaxed">
                        Valitse laitteelle mikä tahansa vapaa isäntäosoite Network ID:n ja Broadcastin väliltä. Muista tarkistaa vasemman sarakkeen laitelistasta verkossa jo varatut osoitteet IP-konfliktien välttämiseksi!
                    </p>
                </div>

                <!-- VAATIMUS 4: KAAVAT JA APURI -->
                <div class="bg-slate-800/95 p-5 rounded-2xl border-2 border-indigo-500/40 shadow-xl space-y-3">
                    <div class="flex items-center justify-between pb-3 border-b border-slate-700">
                        <div class="flex items-center gap-3">
                            <span class="px-3.5 py-1 rounded-full text-xs font-black bg-indigo-500 text-white tracking-wider uppercase">KAAVAT</span>
                            <h5 class="text-lg sm:text-xl font-black text-white">Insinöörin Pikakaavat</h5>
                        </div>
                        <span class="text-xs text-indigo-300 font-mono">Apulaskin apuna</span>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div class="bg-slate-900/95 p-3 rounded-xl border border-slate-700">
                            <span class="text-xs text-slate-400 block font-bold">1. Isäntäbitit (H):</span>
                            <span class="font-mono text-cyan-300 font-bold">H = 32 − ${cidr} = ${hostBits} bittiä</span>
                        </div>
                        <div class="bg-slate-900/95 p-3 rounded-xl border border-slate-700">
                            <span class="text-xs text-slate-400 block font-bold">2. Lohkokoko:</span>
                            <span class="font-mono text-amber-300 font-bold">2^H = 2^${hostBits}</span>
                        </div>
                        <div class="bg-slate-900/95 p-3 rounded-xl border border-slate-700 sm:col-span-2">
                            <span class="text-xs text-slate-400 block font-bold">3. Taikanumero aliverkon peitteelle:</span>
                            <span class="font-mono text-purple-300 font-bold">Peiteoktetti = 256 − Lohkokoko</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    let deepTeachingHtml = '';
    try {
        if (typeof TEACHING_CONTENT !== 'undefined' && TEACHING_CONTENT[topic]) {
            deepTeachingHtml = `
                <div class="space-y-5">
                    <div class="flex items-center justify-between pb-3 border-b border-slate-700 mb-3">
                        <h5 class="text-xl sm:text-2xl font-black text-cyan-300 flex items-center gap-2.5">
                            <span>📖</span> Tasokohtainen Verkkoteoria & CCNA Pro-Vinkit
                        </h5>
                    </div>
                    ${TEACHING_CONTENT[topic](details, cidr)}
                </div>
            `;
        } else if (typeof TEACHING_CONTENT !== 'undefined' && TEACHING_CONTENT['ip_basics']) {
            deepTeachingHtml = `
                <div class="space-y-5">
                    <div class="flex items-center justify-between pb-3 border-b border-slate-700 mb-3">
                        <h5 class="text-xl sm:text-2xl font-black text-cyan-300 flex items-center gap-2.5">
                            <span>📖</span> Tasokohtainen Verkkoteoria & CCNA Pro-Vinkit
                        </h5>
                    </div>
                    ${TEACHING_CONTENT['ip_basics'](details, cidr)}
                </div>
            `;
        }
    } catch (e) {
        console.warn("Teoriaosion haku epäonnistui:", e);
    }

    try {
        const stepsView = document.getElementById('ip-help-steps-view');
        if (stepsView) {
            stepsView.innerHTML = stepCards;
        }
        const theoryView = document.getElementById('ip-help-theory-view');
        if (theoryView) {
            theoryView.innerHTML = deepTeachingHtml || '<p class="text-slate-400 p-4">Teoriaa ei saatavilla tälle aliverkolle.</p>';
        }
        switchHelpTab('steps');
    } catch (err) {
        console.error("Virhe opetusmateriaalin renderöinnissä:", err);
    }

    const firstInput = document.querySelector('.ip-octet');
    if (firstInput) firstInput.focus();
}

/**
 * Sulkee IP-modaalin animoidusti.
 */
function closeIpModal() {
    const content = document.getElementById('ip-modal-content');
    if (content) content.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        document.getElementById('ip-modal').classList.add('hidden');
        selectedNodeForIp = null;
    }, 200);
}

/**
 * Validoi ja tallentaa käyttäjän syöttämän IP-osoitteen.
 */
function submitIp() {
    const ipParts = Array.from(document.querySelectorAll('.ip-octet')).map(el => el.value.trim());
    const maskParts = Array.from(document.querySelectorAll('.mask-octet')).map(el => el.value.trim());

    if (ipParts.some(p => p === '') || maskParts.some(p => p === '')) {
        showToast("Täytä IP-osoitteen ja peitteen kaikki neljä osaa!", "error");
        return;
    }

    const ip = ipParts.join('.');
    const mask = maskParts.join('.');
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;

    if (!ipRegex.test(ip) || !ipRegex.test(mask)) {
        showToast("Virheellinen IP- tai peitemuoto!", "error");
        return;
    }

    const numMaskParts = mask.split('.').map(Number);
    if (numMaskParts.some(p => p > 255)) {
        showToast("Oktetti ei voi olla yli 255!", "error");
        return;
    }

    // Haetaan laitteen oikea vyöhykekohtainen aliverkko
    const scope = getNodeSubnetScope(selectedNodeForIp);
    const details = scope.details;
    const cidr = scope.cidr;

    // Tarkistetaan verkon rajat (Verkko-ID ja Broadcast) jos vaaditaan (vaikeusaste >= 3 tai tasot 11+)
    const requiresBounds = currentLevelConfig && (currentLevelConfig.difficulty >= 3 || currentLevelConfig.id >= 11);
    if (requiresBounds) {
        const netParts = Array.from(document.querySelectorAll('.net-octet')).map(el => el.value.trim());
        const bcastParts = Array.from(document.querySelectorAll('.bcast-octet')).map(el => el.value.trim());

        if (netParts.some(p => p === '') || bcastParts.some(p => p === '')) {
            showToast("Täytä myös Verkko-osoite (Network ID) ja Broadcast-osoite!", "error");
            return;
        }

        const userNet = netParts.join('.');
        const userBcast = bcastParts.join('.');

        if (!ipRegex.test(userNet) || !ipRegex.test(userBcast)) {
            showToast("Virheellinen Verkko-ID- tai Broadcast-muoto!", "error");
            return;
        }

        if (userNet !== details.network) {
            showToast(`Väärä verkko-osoite! /${cidr}-aliverkossa lohkokoko on ${details.totalIps}. Oikea verkko-osoite on ${details.network}.`, "error");
            return;
        }

        if (userBcast !== details.broadcast) {
            showToast(`Väärä broadcast-osoite! /${cidr}-aliverkon broadcast-osoite on ${details.broadcast} (verkko + ${details.totalIps - 1}).`, "error");
            return;
        }

        // Tallennetaan verkon rajat muistiin
        localStorage.setItem(`subnetArchitect_lastInput_net_${currentLevel}_${details.network}`, JSON.stringify(netParts));
        localStorage.setItem(`subnetArchitect_lastInput_bcast_${currentLevel}_${details.network}`, JSON.stringify(bcastParts));
    }

    if (mask !== details.mask) {
        if (currentLevelConfig && currentLevelConfig.id <= 2) {
            showToast(`Väärä aliverkon peite! /${cidr} aliverkossa peite on ${details.mask}`, "error");
        } else {
            showToast(`Väärä aliverkon peite! Laske /${cidr}-aliverkon peite laskimella.`, "error");
        }
        return;
    }

    if (cidr < 31 && ip === details.network) {
        showToast(`Virhe: ${ip} on aliverkon verkko-osoite (Network ID)! Kaikki ${32 - cidr} isäntäbittiä ovat 0.`, "error");
        return;
    }
    if (cidr < 31 && ip === details.broadcast) {
        showToast(`Virhe: ${ip} on aliverkon yleislähetysosoite (Broadcast)! Kaikki ${32 - cidr} isäntäbittiä ovat 1.`, "error");
        return;
    }

    const ipL = ip2long(ip);
    const firstL = ip2long(details.firstHost);
    const lastL = ip2long(details.lastHost);

    if (ipL >= firstL && ipL <= lastL) {
        // Tarkista ettei sama IP ole jo käytössä
        const duplicateNode = nodes.find(n =>
            n !== selectedNodeForIp &&
            n.userData.ip === ip &&
            n.userData.correctIp
        );
        if (duplicateNode) {
            showToast(`IP ${ip} on jo käytössä toisella laitteella!`, "error");
            return;
        }

        // Laitekohtainen IP-aluesuositus (tasot 11+ aktivoivat tämän)
        // Suhteutetaan aliverkon kokoon (toimii /24, /25, /26, /28, VLSM jne.)
        if (currentLevelConfig && currentLevelConfig.id >= 11) {
            const nodeType = selectedNodeForIp.userData.type;
            const totalHosts = lastL - firstL + 1;
            let ipRuleError = null;

            if (totalHosts >= 16) {
                const serverLimit = firstL + Math.max(3, Math.floor(totalHosts * 0.15));
                const printerLimit = lastL - Math.max(3, Math.floor(totalHosts * 0.15));

                if (nodeType === nodeTypes.SERVER) {
                    if (ipL > serverLimit) {
                        ipRuleError = `Palvelimet kuuluvat staattiselle alkuosalle! Sallittu: ${details.firstHost} – ${long2ip(serverLimit)}`;
                    }
                } else if (nodeType === nodeTypes.PRINTER) {
                    if (ipL < printerLimit) {
                        ipRuleError = `Tulostimet kuuluvat aliverkon loppuosaan! Sallittu: ${long2ip(printerLimit)} – ${details.lastHost}`;
                    }
                } else if ([nodeTypes.PC, nodeTypes.LAPTOP, nodeTypes.OFFICE].includes(nodeType)) {
                    if (totalHosts >= 30 && ipL <= serverLimit) {
                        ipRuleError = `Käyttäjäkoneet eivät saa viedä palvelinten staattista aluetta (${details.firstHost} – ${long2ip(serverLimit)})!`;
                    }
                }
            }

            if (ipRuleError) {
                showToast(ipRuleError, "error");
                return;
            }
        }

        // Hyväksytty!
        selectedNodeForIp.userData.ip = ip;
        selectedNodeForIp.userData.mask = mask;
        selectedNodeForIp.userData.correctIp = true;
        updateNodeVisualState(selectedNodeForIp);

        // Päivitä 3D-lappu näyttämään vihreää IP-osoitetta
        updateNodeLabel(selectedNodeForIp);

        showToast("IP hyväksytty! Laite on verkossa. ✅", "success");
        selectedNodeForIp.userData.animating = true;
        selectedNodeForIp.userData.animStart = Date.now();
        createDataConfetti(selectedNodeForIp.mesh.position.clone());

        closeIpModal();
        checkConnections();
        updateGoalUI();
    } else {
        const breakdown = (typeof getBitwiseAndBreakdown === 'function') ? getBitwiseAndBreakdown(ip, cidr) : null;
        const zoneMsg = scope.zoneName ? ` osaston ${scope.zoneName} aliverkkoon` : '';
        if (breakdown && breakdown.network !== details.network) {
            showToast(`Virhe: IP ${ip} kuuluu aliverkkoon ${breakdown.network}/${cidr}, ei tason kohdeverkkoon ${details.network}/${cidr}!`, "error");
        } else {
            showToast(`IP ${ip} ei kuulu${zoneMsg} (${details.network}/${cidr})! Sallittu: ${details.firstHost}–${details.lastHost}`, "error");
        }
    }
}

/**
 * Päivittää tavoitelaskurin ja tarkistaa tason läpäisyn oikeaoppisesti.
 * Läpäisy vaatii:
 * 1. Kaikki IP-vaativat laitteet ovat kytkettyinä JA niillä on oikea aliverkko-IP.
 * 2. Kaikki tason infrastruktuurilaitteet (kytkimet, palomuurit, WiFi AP) ovat kytkettyinä verkkoon.
 */
function updateGoalUI() {
    if (!currentLevelConfig) return;

    // 1. Päätelaitteet (PC, Läppäri, Palvelin, Tulostin, Toimisto, VoIP)
    const requiredIpNodes = nodes.filter(n =>
        n.userData.isPredefined &&
        IP_REQUIRED_TYPES.includes(n.userData.type)
    );
    const requiredIps = requiredIpNodes.length;
    const completedIps = requiredIpNodes.filter(n => n.userData.isConnected && n.userData.correctIp).length;

    // 2. Infrastruktuurilaitteet (Kytkimet, Palomuurit, WiFi AP:t)
    const infraNodes = nodes.filter(n => 
        n.userData.isPredefined && 
        [nodeTypes.SWITCH, nodeTypes.CORE_SWITCH, nodeTypes.FIREWALL, nodeTypes.WIFI].includes(n.userData.type)
    );
    const infraReady = infraNodes.every(n => n.userData.isConnected);

    // 3. Pakollinen topologia (requiredConnections) – tarkistetaan kaapelit
    let topologyOk = true;
    if (currentLevelConfig.requiredConnections && currentLevelConfig.requiredConnections.length > 0) {
        for (const req of currentLevelConfig.requiredConnections) {
            // Etsi laitteet joilla on vaadittu laitetyyppi
            const fromNodes = nodes.filter(n => n.userData.type === req.from);
            const toNodes = nodes.filter(n => n.userData.type === req.to);
            // Tarkista löytyykö kaapeli mistä tahansa from→to parista
            const connected = fromNodes.some(fn =>
                toNodes.some(tn =>
                    cables.some(c =>
                        (c.nodeA === fn && c.nodeB === tn) ||
                        (c.nodeB === fn && c.nodeA === tn)
                    )
                )
            );
            if (!connected) {
                topologyOk = false;
                break;
            }
        }
    }

    // Näytä edistyminen käyttäjälle
    document.getElementById('goal-current').innerText = completedIps;
    document.getElementById('goal-total').innerText = requiredIps;

    const goalCurrentEl = document.getElementById('goal-current');
    const allDone = (completedIps === requiredIps && requiredIps > 0 && infraReady && topologyOk);

    if (allDone) {
        goalCurrentEl.classList.remove('text-white');
        goalCurrentEl.classList.add('text-green-400');
        setTimeout(() => {
            document.getElementById('win-modal').classList.remove('hidden');
            if (currentLevel === unlockedLevels && currentLevel < TOTAL_LEVELS) {
                unlockedLevels++;
                localStorage.setItem('subnetArchitect_unlocked', unlockedLevels);
            }
        }, 1500);
    } else {
        goalCurrentEl.classList.add('text-white');
        goalCurrentEl.classList.remove('text-green-400');
    }
}

/**
 * Päivittää yläpalkin tiedot tason mukaan.
 */
function updateLevelUI(levelConfig) {
    document.getElementById('level-title').innerText = `Taso ${levelConfig.id}: ${levelConfig.name}`;
    document.getElementById('level-scenario').innerText = levelConfig.scenario;
    document.getElementById('level-network').innerText = `${levelConfig.network}/${levelConfig.cidr}`;

    // Vaikeusmittari
    const difficultyEl = document.getElementById('level-difficulty');
    if (difficultyEl) {
        difficultyEl.innerText = getDifficultyStars(levelConfig.difficulty);
        difficultyEl.className = `text-lg font-bold tracking-wider ${getDifficultyColor(levelConfig.difficulty)}`;
    }

    // Vaihe
    const phaseEl = document.getElementById('level-phase');
    if (phaseEl) {
        phaseEl.innerText = levelConfig.phase || '';
    }

    // Vihje-painike sisältö
    document.getElementById('hint-text').innerText = levelConfig.hint || 'Liitä laitteet kaapelilla ja aseta IP-osoitteet.';

    // Suodata alapalkin työkalut vain tason vaatimiin komponentteihin
    updateToolbarForLevel(levelConfig);
}

/**
 * Suodattaa alapalkin komponentit niin, että näkyvissä ovat vain nykyisen
 * tason vaatimat laitteet (switch, core_switch, server, wifi, firewall).
 * Perustyökalut (valitse, kaapeli, poista) ovat aina saatavilla.
 * Päivittää myös pikanäppäin-numerot (1, 2, 3...).
 */
function updateToolbarForLevel(levelConfig) {
    if (!levelConfig) return;

    const buildableTools = ['switch', 'core_switch', 'server', 'wifi', 'firewall'];

    let allowedComponentTools = [];
    if (levelConfig.allowedTools && Array.isArray(levelConfig.allowedTools)) {
        allowedComponentTools = levelConfig.allowedTools.filter(t => buildableTools.includes(t));
    } else if (levelConfig.requiredNodes && Array.isArray(levelConfig.requiredNodes)) {
        const presentTypes = new Set(levelConfig.requiredNodes.map(rn => rn.type));
        allowedComponentTools = buildableTools.filter(t => presentTypes.has(t));
    }

    let visibleComponentsCount = 0;
    buildableTools.forEach(toolName => {
        const btn = document.querySelector(`.tool-btn[data-tool="${toolName}"]`);
        if (btn) {
            const isAllowed = allowedComponentTools.includes(toolName);
            if (isAllowed) {
                btn.classList.remove('hidden');
                visibleComponentsCount++;
            } else {
                btn.classList.add('hidden');
                if (currentTool === toolName) {
                    currentTool = 'select';
                }
            }
        }
    });

    // Piilota erotinviiva ennen komponentteja, jos komponentteja ei ole
    const compDivider = document.getElementById('toolbar-comp-divider');
    if (compDivider) {
        if (visibleComponentsCount > 0) {
            compDivider.classList.remove('hidden');
        } else {
            compDivider.classList.add('hidden');
        }
    }

    // Jos valittu työkalu on nyt piilossa, aktivoidaan Valitse-työkalu
    const activeBtn = document.querySelector(`.tool-btn[data-tool="${currentTool}"]:not(.hidden)`);
    if (!activeBtn) {
        currentTool = 'select';
        const selectBtn = document.querySelector('.tool-btn[data-tool="select"]');
        if (selectBtn) {
            document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
            selectBtn.classList.add('active');
        }
    }

    // Päivitä pikanäppäin-numerot (1, 2, 3...) näkyville napeille
    const visibleBtns = Array.from(document.querySelectorAll('.tool-btn:not(.hidden)'));
    visibleBtns.forEach((btn, idx) => {
        const badge = btn.querySelector('.tool-badge');
        if (badge) {
            badge.innerText = (idx + 1).toString();
        }
    });
}

// =====================================================================
// 🧮 PERUS TASKULASKIN (IP-MODAALIN 3. SARAKE)
// =====================================================================

let calcState = {
    current: '0',
    prev: null,
    op: null,
    resetNext: false
};

function calcUpdateScreen() {
    const screen = document.getElementById('basic-calc-screen');
    const history = document.getElementById('basic-calc-history');
    if (!screen) return;

    screen.innerText = calcState.current;

    if (history) {
        if (calcState.prev !== null && calcState.op) {
            let opSymbol = calcState.op;
            if (calcState.op === '*') opSymbol = '×';
            else if (calcState.op === '/') opSymbol = '÷';
            else if (calcState.op === '^') opSymbol = '^';
            history.innerText = `${calcState.prev} ${opSymbol}`;
        } else {
            history.innerText = '';
        }
    }
}

function calcNum(digit) {
    if (calcState.resetNext || calcState.current === '0') {
        calcState.current = digit.toString();
        calcState.resetNext = false;
    } else {
        if (calcState.current.length < 12) {
            calcState.current += digit.toString();
        }
    }
    calcUpdateScreen();
}

function calcDot() {
    if (calcState.resetNext) {
        calcState.current = '0.';
        calcState.resetNext = false;
    } else if (!calcState.current.includes('.')) {
        calcState.current += '.';
    }
    calcUpdateScreen();
}

function calcInputQuick(val) {
    calcState.current = val.toString();
    calcState.resetNext = false;
    calcUpdateScreen();
}

function calcPower2() {
    const val = parseFloat(calcState.current);
    if (isNaN(val)) return;
    const res = Math.pow(2, val);
    const history = document.getElementById('basic-calc-history');
    if (history) {
        history.innerText = `2 ^ ${val} =`;
    }
    calcState.current = (Math.round(res * 100000) / 100000).toString();
    calcState.prev = null;
    calcState.op = null;
    calcState.resetNext = true;
    calcUpdateScreen();
}

function calcOp(op) {
    if (calcState.prev !== null && calcState.op && !calcState.resetNext) {
        calcEquals();
    }
    calcState.prev = parseFloat(calcState.current);
    calcState.op = op;
    calcState.resetNext = true;
    calcUpdateScreen();
}

function calcEquals() {
    if (calcState.prev === null || !calcState.op) return;

    const a = calcState.prev;
    const b = parseFloat(calcState.current);
    let result = 0;

    switch (calcState.op) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/':
            result = b === 0 ? 'Error' : a / b;
            break;
        case '^':
            result = Math.pow(a, b);
            break;
    }

    if (typeof result === 'number') {
        // Pyöristetään desimaalit fiksusti jos tarpeen
        result = Math.round(result * 100000) / 100000;
    }

    calcState.current = result.toString();
    calcState.prev = null;
    calcState.op = null;
    calcState.resetNext = true;
    calcUpdateScreen();
}

function calcClear() {
    calcState.current = '0';
    calcState.prev = null;
    calcState.op = null;
    calcState.resetNext = false;
    calcUpdateScreen();
}

function calcBackspace() {
    if (calcState.resetNext) {
        calcState.current = '0';
        calcState.resetNext = false;
    } else if (calcState.current.length > 1) {
        calcState.current = calcState.current.slice(0, -1);
    } else {
        calcState.current = '0';
    }
    calcUpdateScreen();
}
