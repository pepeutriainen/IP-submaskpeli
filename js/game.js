// --- Pelin elinkaari ja pääohjaus ---

/**
 * Siivoaa kaiken 3D-maailman sisällön muistivuotojen estämiseksi.
 */
function clearWorld() {
    cables.forEach(c => scene.remove(c.line));
    nodes.forEach(n => scene.remove(n.mesh));
    zoneMeshes.forEach(z => scene.remove(z));
    labelMeshes.forEach(l => scene.remove(l));
    particles.forEach(p => scene.remove(p.mesh));
    
    if (cableActionState && cableActionState.lineTemp) {
        scene.remove(cableActionState.lineTemp);
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
 * @param {number} levelId Tason numero (1-30)
 */
function loadLevel(levelId) {
    isLoadingLevel = true;
    currentLevel = levelId;
    currentLevelConfig = levels[levelId - 1];
    if (!currentLevelConfig) {
        console.error('Tasoa ei löydy:', levelId);
        isLoadingLevel = false;
        return;
    }

    // Piilota päävalikko, näytä pelin UI
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('game-ui').classList.remove('hidden');

    // Tyhjennä edellinen 3D-maailma
    clearWorld();

    // Päivitä UI tason tiedoilla
    updateLevelUI(currentLevelConfig);

    // Nollaa kamera (tai keskitä tason mukaan)
    if (cameraTarget) {
        if (currentLevelConfig.cameraCenter) {
            cameraTarget.set(currentLevelConfig.cameraCenter.x, 0, currentLevelConfig.cameraCenter.z);
        } else {
            cameraTarget.set(0, 0, 0);
        }
    }
    cameraZoom = 1;
    camera.updateProjectionMatrix();

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

                // Luo kaapelit
                progress.cables.forEach(savedCable => {
                    const nodeA = nodes.find(n => n.id === savedCable.nodeAId);
                    const nodeB = nodes.find(n => n.id === savedCable.nodeBId);
                    if (nodeA && nodeB) {
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

    isLoadingLevel = false;
    checkConnections();
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
        showToast("🏆 Läpäisit kaikki 30 tasoa! Olet nyt verkkoammattilainen!", "success");
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

    document.getElementById('btn-back-menu')?.addEventListener('click', goToMenu);

    document.getElementById('btn-unlock-all')?.addEventListener('click', () => {
        unlockedLevels = TOTAL_LEVELS;
        localStorage.setItem('subnetArchitect_unlocked', unlockedLevels);
        renderLevelMenu();
        showToast("Kaikki tasot avattu testattavaksi!", "success");
    });

    document.getElementById('btn-reset-progress')?.addEventListener('click', () => {
        if (confirm("Haluatko varmasti nollata kaiken edistymisesi?")) {
            localStorage.clear(); // Poistaa kaiken, myös tallennetut tasot
            unlockedLevels = 1;
            renderLevelMenu();
            showToast("Edistyminen nollattu.", "info");
        }
    });

    document.getElementById('btn-hint')?.addEventListener('click', toggleHint);
    document.getElementById('btn-rules')?.addEventListener('click', toggleRules);
});
