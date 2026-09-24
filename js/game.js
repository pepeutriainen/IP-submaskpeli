// --- Pelin elinkaari ja pääohjaus ---

/**
 * Siivoaa kaiken 3D-maailman sisällön ja vapauttaa WebGL GPU-muistin muistivuotojen estämiseksi.
 */
function clearWorld() {
    cables.forEach(c => {
        if (c.line) {
            scene.remove(c.line);
            if (typeof disposeHierarchy === 'function') disposeHierarchy(c.line);
        }
    });
    nodes.forEach(n => {
        if (n.mesh) {
            scene.remove(n.mesh);
            if (typeof disposeHierarchy === 'function') disposeHierarchy(n.mesh);
        }
        if (n.userData && n.userData.labelMesh) {
            scene.remove(n.userData.labelMesh);
            if (typeof disposeHierarchy === 'function') disposeHierarchy(n.userData.labelMesh);
        }
    });
    zoneMeshes.forEach(z => {
        scene.remove(z);
        if (typeof disposeHierarchy === 'function') disposeHierarchy(z);
    });
    labelMeshes.forEach(l => {
        scene.remove(l);
        if (typeof disposeHierarchy === 'function') disposeHierarchy(l);
    });
    particles.forEach(p => {
        if (p.mesh) {
            scene.remove(p.mesh);
            if (typeof disposeHierarchy === 'function') disposeHierarchy(p.mesh);
        }
    });
    
    if (cableActionState && cableActionState.lineTemp) {
        scene.remove(cableActionState.lineTemp);
        if (typeof disposeHierarchy === 'function') disposeHierarchy(cableActionState.lineTemp);
    }
    
    if (typeof activePackets !== 'undefined') {
        activePackets.forEach(p => {
            if (p.mesh) {
                scene.remove(p.mesh);
                if (typeof disposeHierarchy === 'function') disposeHierarchy(p.mesh);
            }
        });
        activePackets = [];
    }

    cables = [];
    nodes = [];
    zoneMeshes = [];
    labelMeshes = [];
    particles = [];
    currentTool = 'select';
    cableActionState = { active: false, startNode: null, lineTemp: null };
    selectedNodeForIp = null;
}

/**
 * Lataa valitun tason ja alustaa maailman sen mukaiseksi.
 * @param {number} levelId Tason numero (1-61)
 */
function loadLevel(levelId) {
    isLoadingLevel = true;
    currentLevel = levelId;
    cheatSheetUsedInCurrentLevel = false;
    if (typeof achievements !== 'undefined') achievements.levelStartTime = Date.now();
    currentLevelConfig = levels[levelId - 1];
    if (!currentLevelConfig) {
        console.error('Tasoa ei löydy:', levelId);
        isLoadingLevel = false;
        return;
    }

    // 1. Näytä IT Studio Level Loading HUD Overlay
    if (typeof showLevelLoader === 'function') {
        showLevelLoader(currentLevelConfig);
    }

    // 2. Piilota päävalikko, näytä pelin UI
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('game-ui').classList.remove('hidden');

    // 3. Tyhjennä edellinen 3D-maailma ja vapauta GPU-muisti
    clearWorld();

    // 4. Päivitä UI tason tiedoilla
    updateLevelUI(currentLevelConfig);

    // 5. Nollaa ja keskitä kamera
    if (cameraTarget) {
        if (currentLevelConfig.cameraCenter) {
            cameraTarget.set(currentLevelConfig.cameraCenter.x, 0, currentLevelConfig.cameraCenter.z);
        } else {
            cameraTarget.set(0, 0, 0);
        }
    }
    cameraZoom = 1;
    camera.updateProjectionMatrix();

    if (typeof updateLevelLoader === 'function') {
        updateLevelLoader(45, "Generoidaan laiterajapintoja ja huonegeometrioita...");
    }

    // 6. Esilataa tarvittavat 3D-mallit asynkronisesti taustalla
    if (typeof preloadLevelModels === 'function') {
        preloadLevelModels(currentLevelConfig);
    }

    // Luo VLAN-alueet – välitetään nyt myös nimi ja aliverkko-string lapuille
    if (currentLevelConfig.zones && currentLevelConfig.zones.length > 0) {
        currentLevelConfig.zones.forEach(zone => {
            const subnetStr = zone.subnet || null;
            createZone(zone.x, zone.z, zone.w, zone.d, zone.color, zone.name || null, subnetStr);
        });
    }

    const saved = localStorage.getItem(`subnetArchitect_level_${currentLevel}_progress`);
    const currentSignature = currentLevelConfig.requiredNodes
        ? currentLevelConfig.requiredNodes.map(n => `${n.type}:${n.pos.x},${n.pos.z}`).sort().join('|')
        : '';
    let loadedFromSaved = false;

    if (saved) {
        try {
            const progress = JSON.parse(saved);
            // Tarkista, että tallennus vastaa tason nykyistä laitekokoonpanoa
            const hasGateway = progress.nodes && progress.nodes.some(n => n.type === nodeTypes.GATEWAY || n.type === nodeTypes.ROUTER);
            const hasCloud = progress.nodes && progress.nodes.some(n => n.type === nodeTypes.CLOUD);

            if (progress.signature === currentSignature && Array.isArray(progress.nodes) && hasGateway && hasCloud) {
                // Luo solmut tallennuksesta
                const wan = getLevelWanLayout(currentLevelConfig);
                progress.nodes.forEach(savedNode => {
                    let posX = savedNode.x;
                    let posZ = savedNode.z;
                    // Päivitetään vanhat oletuskoordinaatit (0, -8) ja (0, -2) automaattisesti uusiin törmäämättömiin
                    if (savedNode.type === nodeTypes.CLOUD && savedNode.x === 0 && savedNode.z === -8) {
                        posX = wan.cloud.x;
                        posZ = wan.cloud.z;
                    } else if (savedNode.type === nodeTypes.GATEWAY && savedNode.x === 0 && savedNode.z === -2) {
                        posX = wan.gateway.x;
                        posZ = wan.gateway.z;
                    }
                    const node = createNode(savedNode.type, posX, posZ, savedNode.isPredefined);
                    node.id = savedNode.id;
                    node.userData.ip = savedNode.ip;
                    node.userData.mask = savedNode.mask;
                    node.userData.correctIp = savedNode.correctIp;
                    updateNodeLabel(node);
                });

                // Luo kaapelit (vain sääntöjen mukaiset lailliset kaapelit)
                progress.cables.forEach(savedCable => {
                    const nodeA = nodes.find(n => n.id === savedCable.nodeAId);
                    const nodeB = nodes.find(n => n.id === savedCable.nodeBId);
                    if (nodeA && nodeB && !getCableError(nodeA, nodeB)) {
                        connectNodes(nodeA, nodeB, 0x64748b);
                    }
                });
                loadedFromSaved = true;
            } else {
                // Rakenne on päivittynyt tai vanhentunut tallennus -> nollataan vanha tallenne puhtaasti
                localStorage.removeItem(`subnetArchitect_level_${currentLevel}_progress`);
            }
        } catch (e) {
            console.error("Virhe tallennuksen latauksessa", e);
        }
    }

    if (!loadedFromSaved) {
        createDefaultNodes();
    }

    function createDefaultNodes() {
        const wan = getLevelWanLayout(currentLevelConfig);

        // Luo Internet-pilvi ja Default Gateway tason ulkopuolelle
        const cloud = createNode(nodeTypes.CLOUD, wan.cloud.x, wan.cloud.z, true);
        const gateway = createNode(nodeTypes.GATEWAY, wan.gateway.x, wan.gateway.z, true);
        connectNodes(cloud, gateway, 0x3b82f6);

        // Luo tason kiinteät laitteet (ohitetaan mahdolliset duplikaatit)
        if (currentLevelConfig.requiredNodes) {
            currentLevelConfig.requiredNodes.forEach(rn => {
                if (rn.type === nodeTypes.CLOUD || rn.type === nodeTypes.GATEWAY) return;
                createNode(rn.type, rn.pos.x, rn.pos.z, true);
            });
        }
    }

    // Valitse työkalu
    const selectBtn = document.querySelector('[data-tool="select"]');
    if (selectBtn) selectBtn.click();

    if (typeof updateLevelLoader === 'function') {
        updateLevelLoader(100, "Verkkotopologia valmis!");
    }
    setTimeout(() => {
        if (typeof hideLevelLoader === 'function') {
            hideLevelLoader();
        }
    }, 260);

    isLoadingLevel = false;
    if (typeof updateAudioButtonState === 'function') updateAudioButtonState();
    checkConnections();
    if (typeof terminal !== 'undefined' && terminal.setTargetNode) {
        terminal.setTargetNode(null);
    }
}

/**
 * Siirtyy seuraavaan tasoon.
 */
function nextLevel() {
    document.getElementById('win-modal').classList.add('hidden');
    if (currentLevel < TOTAL_LEVELS) {
        loadLevel(currentLevel + 1);
    } else {
        goToMenu();
        showToast(`🏆 Läpäisit kaikki ${TOTAL_LEVELS} tasoa! Olet nyt todellinen verkkoarkkitehti!`, "success");
    }
}

/**
 * Palaa päävalikkoon.
 */
function goToMenu() {
    document.getElementById('game-ui').classList.add('hidden');
    document.getElementById('win-modal').classList.add('hidden');
    document.getElementById('ip-modal').classList.add('hidden');

    clearWorld();

    if (cameraTarget) cameraTarget.set(0, 0, 0);

    renderLevelMenu();
    document.getElementById('main-menu').classList.remove('hidden');
}

/**
 * Näyttää tai piilottaa vihjeen.
 */
function toggleHint() {
    const hintBox = document.getElementById('hint-box');
    if (hintBox) hintBox.classList.toggle('hidden');
}

/**
 * Näyttää tai piilottaa säännöt.
 */
function toggleRules() {
    const rulesBox = document.getElementById('rules-box');
    if (rulesBox) rulesBox.classList.toggle('hidden');
}

/**
 * Tallentaa nykyisen tason tilanteen localStorageen.
 */
function saveLevelProgress() {
    if (!currentLevelConfig || currentLevelConfig.id !== currentLevel) return;
    
    // Suodata pois Cloud ja Router (koska ne luodaan aina pohjalle alussa ja yhdistetään)
    // TAI tallennetaan kaikki ja uudelleenluodaan kaikki
    // Jos tallennamme kaikki, ohitamme Cloud/Router -luonnin loadLevelissä
    const currentSignature = currentLevelConfig.requiredNodes
        ? currentLevelConfig.requiredNodes.map(n => `${n.type}:${n.pos.x},${n.pos.z}`).sort().join('|')
        : '';

    const progress = {
        signature: currentSignature,
        nodes: nodes.map(n => ({
            id: n.id,
            type: n.userData.type,
            x: n.mesh.position.x,
            z: n.mesh.position.z,
            isPredefined: n.userData.isPredefined,
            ip: n.userData.ip,
            mask: n.userData.mask,
            correctIp: n.userData.correctIp
        })),
        cables: cables.map(c => ({
            nodeAId: c.nodeA.id,
            nodeBId: c.nodeB.id
        }))
    };
    localStorage.setItem(`subnetArchitect_level_${currentLevel}_progress`, JSON.stringify(progress));
}

// Pelin käynnistys DOMContentLoaded-tapahtumalla
window.addEventListener('DOMContentLoaded', () => {
    generateLevels();
    renderLevelMenu();
    setupTools();
    setupOctetInputs();
    initThreeJS();

    if (typeof dismissBootLoader === 'function') {
        dismissBootLoader();
    }

    document.getElementById('btn-back-menu')?.addEventListener('click', goToMenu);

    const unlockBtn = document.getElementById('btn-unlock-all');
    if (unlockBtn && !unlockBtn.hasAttribute('onclick')) {
        unlockBtn.addEventListener('click', () => openAdminModal('unlock'));
    }

    const resetBtn = document.getElementById('btn-reset-progress');
    if (resetBtn && !resetBtn.hasAttribute('onclick')) {
        resetBtn.addEventListener('click', () => openAdminModal('reset'));
    }

    document.getElementById('btn-hint')?.addEventListener('click', toggleHint);
    document.getElementById('btn-rules')?.addEventListener('click', toggleRules);
});

// =====================================================================
// PÄÄKÄYTTÄJÄN TODENNUS (Zero Plaintext Secrets - Salted SHA-256)
// =====================================================================
const ADMIN_CREDENTIALS_HASH = '9ae6fd729ddc048b9ac620b572e55ad342d9a00487d6fdd2fa186481f226aa91';
const ADMIN_SALT = 'SubnetArchitect_SecureAdmin_Salt_2026_';
let pendingAdminAction = null;

/**
 * Generoi suolatun SHA-256 tiivisteen annetuista tunnuksista Web Crypto API:lla.
 */
async function hashAdminCredentials(username, password) {
    const combined = ADMIN_SALT + (username || '').trim().toLowerCase() + ':' + (password || '').trim();
    const encoder = new TextEncoder();
    const data = encoder.encode(combined);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Avaa pääkäyttäjän todennusikkunan.
 * @param {'unlock'|'reset'} [action='unlock']
 */
function openAdminModal(action = 'unlock') {
    pendingAdminAction = action;
    const modal = document.getElementById('admin-modal');
    const desc = document.getElementById('admin-modal-desc');
    const userInp = document.getElementById('admin-username-input');
    const passInp = document.getElementById('admin-password-input');
    const submitBtn = document.getElementById('btn-admin-submit');

    if (desc) {
        desc.innerText = (action === 'reset')
            ? "Pääkäyttäjän vahvistus: Kaiken edistymisen nollaaminen poistaa kaikki tallennetut verkot ja palauttaa tason 1."
            : "Pääkäyttäjän vahvistus: Kaikkien 61 tason avaaminen vaatii järjestelmänvalvojan oikeudet.";
    }
    if (submitBtn) {
        submitBtn.innerHTML = (action === 'reset') ? "⚠️ Vahvista nollaus" : "🔓 Avaa kaikki tasot";
    }
    if (userInp) userInp.value = '';
    if (passInp) passInp.value = '';

    if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => userInp?.focus(), 50);
    }
}

/**
 * Sulkee pääkäyttäjän todennusikkunan ja tyhjentää salasanan muistista.
 */
function closeAdminModal() {
    const modal = document.getElementById('admin-modal');
    if (modal) modal.classList.add('hidden');
    const passInp = document.getElementById('admin-password-input');
    if (passInp) passInp.value = '';
    pendingAdminAction = null;
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('admin-modal');
        if (modal && !modal.classList.contains('hidden')) {
            closeAdminModal();
        }
    }
});

/**
 * Tarkistaa syötetyt pääkäyttäjätunnukset ja suorittaa toimenpiteen.
 */
async function submitAdminAuth() {
    const userInp = document.getElementById('admin-username-input');
    const passInp = document.getElementById('admin-password-input');
    const username = userInp ? userInp.value : '';
    const password = passInp ? passInp.value : '';

    if (!username || !password) {
        showToast("Syötä sekä käyttäjätunnus että salasana!", "error");
        return;
    }

    try {
        const computedHash = await hashAdminCredentials(username, password);
        if (computedHash === ADMIN_CREDENTIALS_HASH) {
            // Pääkäyttäjä todennettu onnistuneesti!
            if (pendingAdminAction === 'unlock') {
                unlockedLevels = TOTAL_LEVELS;
                localStorage.setItem('subnetArchitect_unlocked', unlockedLevels);
                renderLevelMenu();
                showToast("🔓 Pääkäyttäjä todennettu! Kaikki 61 tasoa avattu.", "success");
            } else if (pendingAdminAction === 'reset') {
                localStorage.clear();
                unlockedLevels = 1;
                renderLevelMenu();
                showToast("Pääkäyttäjä todennettu: Kaikki edistyminen nollattu.", "info");
            }
            closeAdminModal();
        } else {
            showToast("Pääsy evätty: Virheellinen pääkäyttäjätunnus tai salasana!", "error");
            if (passInp) {
                passInp.value = '';
                passInp.focus();
            }
            const box = document.getElementById('admin-modal-box');
            if (box) {
                box.classList.add('scale-105');
                setTimeout(() => box.classList.remove('scale-105'), 200);
            }
        }
    } catch (e) {
        console.error("Todennusvirhe:", e);
        showToast("Kryptografinen todennus epäonnistui selaimessa.", "error");
    }
}

if (typeof window !== 'undefined') {
    window.openAdminModal = openAdminModal;
    window.closeAdminModal = closeAdminModal;
    window.submitAdminAuth = submitAdminAuth;
}
