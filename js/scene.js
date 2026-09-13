// --- Three.js 3D-maailma, ohjaus ja animaatio ---

/**
 * Alustaa Three.js -scenen, isometrisen kameran, valot, ruudukon ja tapahtumankuuntelijat.
 */
function initThreeJS() {
    const canvas = document.getElementById('game-canvas');
    scene = new THREE.Scene();
    
    if (!cameraTarget) {
        cameraTarget = new THREE.Vector3(0, 0, 0);
    }

    // Isometrinen kamera
    const aspect = window.innerWidth / window.innerHeight;
    const d = 20;
    camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
    camera.position.set(20, 20, 20);
    camera.lookAt(scene.position);

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Valot
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(20, 40, 20);
    scene.add(dirLight);

    // Grid (ruudukko)
    const gridHelper = new THREE.GridHelper(100, 50, 0x334155, 0x1e293b);
    gridHelper.position.y = -0.5;
    scene.add(gridHelper);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Event listenerit – kuunnellaan window-tasolla jotta sidebar ei blokkaa canvas-klikkejä
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', () => { isPanning = false; });
    window.addEventListener('resize', onWindowResize);
    renderer.domElement.addEventListener('contextmenu', (e) => e.preventDefault());
    
    // Zoom rullalla – vain kun osoitin on 3D-maailman päällä, ei scrollattavien paneelien päällä
    window.addEventListener('wheel', (e) => {
        // Jos hiiri on minkä tahansa scrollattavan UI-elementin (esim. vasemman sivupalkin tai modaalin) päällä, annetaan sen scrollata normaalisti
        if (e.target && (e.target.closest('.custom-scrollbar') || e.target.closest('#level-info-panel') || e.target.closest('#ip-modal') || e.target.closest('#main-menu') || e.target.closest('.overflow-y-auto'))) {
            return;
        }

        const gameUi = document.getElementById('game-ui');
        if (gameUi && !gameUi.classList.contains('hidden')) {
            e.preventDefault();
        }
        cameraZoom += e.deltaY * -0.001;
        cameraZoom = Math.max(0.3, Math.min(cameraZoom, 3));
        camera.zoom = cameraZoom;
        camera.updateProjectionMatrix();
    }, { passive: false });

    // Näppäimistö navigointi
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (cableActionState.active && cableActionState.lineTemp) {
                scene.remove(cableActionState.lineTemp);
                cableActionState = { active: false, startNode: null, lineTemp: null };
                showToast("Toiminto peruttu", "info");
            }
            if (!document.getElementById('ip-modal').classList.contains('hidden')) {
                closeIpModal();
            }
        }

        // Pikanäppäimet työkaluille (näkyvät työkalut järjestyksessä 1, 2, 3...)
        const gameUi = document.getElementById('game-ui');
        const ipModal = document.getElementById('ip-modal');
        if (gameUi && !gameUi.classList.contains('hidden') && ipModal && ipModal.classList.contains('hidden')) {
            const keyNum = parseInt(e.key);
            if (!isNaN(keyNum) && keyNum >= 1 && keyNum <= 9) {
                const visibleBtns = Array.from(document.querySelectorAll('.tool-btn:not(.hidden)'));
                if (keyNum <= visibleBtns.length) {
                    visibleBtns[keyNum - 1].click();
                }
            }
        }

        const key = e.key.toLowerCase();
        if (keys.hasOwnProperty(key)) keys[key] = true;
        if (e.key === 'ArrowUp') keys.up = true;
        if (e.key === 'ArrowDown') keys.down = true;
        if (e.key === 'ArrowLeft') keys.left = true;
        if (e.key === 'ArrowRight') keys.right = true;
    });

    window.addEventListener('keyup', (e) => {
        const key = e.key.toLowerCase();
        if (keys.hasOwnProperty(key)) keys[key] = false;
        if (e.key === 'ArrowUp') keys.up = false;
        if (e.key === 'ArrowDown') keys.down = false;
        if (e.key === 'ArrowLeft') keys.left = false;
        if (e.key === 'ArrowRight') keys.right = false;
    });

    animate();
}

function onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;
    const d = 20;
    camera.left = -d * aspect;
    camera.right = d * aspect;
    camera.top = d;
    camera.bottom = -d;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerMove(event) {
    if (isPanning) {
        const dx = event.clientX - panStart.x;
        const dy = event.clientY - panStart.y;
        const panSpeed = 0.05 / cameraZoom;
        cameraTarget.x -= (dx + dy) * panSpeed;
        cameraTarget.z -= (dy - dx) * panSpeed;
        panStart.x = event.clientX;
        panStart.y = event.clientY;
        return;
    }

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (cableActionState.active && cableActionState.lineTemp) {
        raycaster.setFromCamera(mouse, camera);
        const gridHelper = scene.children.find(c => c.type === 'GridHelper');
        if (gridHelper) {
            const intersects = raycaster.intersectObject(gridHelper);
            if (intersects.length > 0) {
                const pos = intersects[0].point;
                const positions = cableActionState.lineTemp.geometry.attributes.position.array;
                positions[3] = pos.x; 
                positions[4] = 0; 
                positions[5] = pos.z;
                cableActionState.lineTemp.geometry.attributes.position.needsUpdate = true;
            }
        }
    }
}

function onPointerDown(event) {
    // Estetään 3D-maailman klikkaukset, jos klikattiin mitä tahansa UI-elementtiä (sivupalkki, modaalit, napit).
    // Koska vain tyhjillä alueilla klikkaukset läpäisevät UI-kerroksen (pointer-events: none),
    // aito 3D-klikkaus osuu aina suoraan canvakseen.
    if (event.target !== renderer.domElement) return;

    if (event.button === 2 || event.button === 1) {
        isPanning = true;
        panStart.x = event.clientX;
        panStart.y = event.clientY;
        return;
    }

    raycaster.setFromCamera(mouse, camera);
    raycaster.params.Line.threshold = 1.0;
    
    // Etsi kaapeleiden osumat (vain jos työkalu on 'delete')
    let hitCable = null;
    if (currentTool === 'delete') {
        const cableMeshes = cables.map(c => c.line);
        const cableIntersects = raycaster.intersectObjects(cableMeshes);
        if (cableIntersects.length > 0) {
            hitCable = cables.find(c => c.line === cableIntersects[0].object);
        }
    }

    // Tarkista osuttiinko laitteeseen (node) tai sen 3D-malliin
    const interactableObjects = nodes.map(n => n.mesh);
    const intersects = raycaster.intersectObjects(interactableObjects, true);

    if (intersects.length > 0) {
        let clickedObj = intersects[0].object;
        // Kuljetaan hierarkiaa ylöspäin kunnes löydetään varsinainen laite (node.mesh)
        while (clickedObj.parent && !nodes.some(n => n.mesh === clickedObj)) {
            clickedObj = clickedObj.parent;
        }
        const clickedNode = nodes.find(n => n.mesh === clickedObj);
        if (!clickedNode) return;

        if (currentTool === 'select') {
            if (IP_REQUIRED_TYPES.includes(clickedNode.userData.type)) {
                if (clickedNode.userData.isConnected) {
                    openIpModal(clickedNode);
                } else {
                    showToast("Laitteella ei ole verkkoyhteyttä reitittimeen!", "error");
                }
            } else {
                showToast(`Tyyppi: ${clickedNode.userData.type.toUpperCase()}`, "info");
            }
        } else if (currentTool === 'cable') {
            handleCableTool(clickedNode);
        } else if (currentTool === 'delete') {
            if (clickedNode.userData.isPredefined) {
                showToast("Et voi poistaa tason kiinteitä kohteita!", "error");
            } else {
                deleteNode(clickedNode);
            }
        }
    } else if (hitCable) {
        // Poista klikattu kaapeli
        deleteCable(hitCable);
        showToast("Kaapeli poistettu", "info");
    } else {
        // Klikattiin tyhjää - rakennetaan uusi laite jos työkalu sallii
        const buildableTools = ['switch', 'wifi', 'firewall', 'core_switch', 'server'];
        if (buildableTools.includes(currentTool)) {
            const gridHelper = scene.children.find(c => c.type === 'GridHelper');
            if (gridHelper) {
                const gridIntersects = raycaster.intersectObject(gridHelper);
                if (gridIntersects.length > 0) {
                    const point = gridIntersects[0].point;
                    // Snap to grid
                    const x = Math.round(point.x / 2) * 2;
                    const z = Math.round(point.z / 2) * 2;
                    
                    // Estä päällekkäisyys
                    if (!nodes.find(n => Math.abs(n.mesh.position.x - x) < 1 && Math.abs(n.mesh.position.z - z) < 1)) {
                        createNode(currentTool, x, z, false);
                    }
                }
            }
        }
    }
}

/// Partikkelien jaetut resurssit (estää satojen geometroiden/materiaalien jatkuvan luonnin ja vuodon)
let sparkGeo = null;
let sparkMat = null;
let confettiGeo = null;
let confettiMat = null;

function getSparkResources() {
    if (!sparkGeo) sparkGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    if (!sparkMat) sparkMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa });
    return { geo: sparkGeo, mat: sparkMat };
}

function getConfettiResources() {
    if (!confettiGeo) confettiGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    if (!confettiMat) confettiMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    return { geo: confettiGeo, mat: confettiMat };
}

// Välimuisti DOM-elementeille renderöintiluupissa
let domRefs = null;
function getDomRefs() {
    if (!domRefs) {
        domRefs = {
            gameUi: document.getElementById('game-ui'),
            ipModal: document.getElementById('ip-modal'),
            winModal: document.getElementById('win-modal'),
            mainMenu: document.getElementById('main-menu')
        };
    }
    return domRefs;
}

/**
 * Luo sähkökipinäpartikkelit kaapeliliitännän yhteydessä (jaetuilla resursseilla).
 */
function createSparks(position) {
    const { geo, mat } = getSparkResources();
    for (let i = 0; i < 15; i++) {
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(position);
        mesh.position.y += 1;
        scene.add(mesh);
        particles.push({
            mesh: mesh,
            velocity: new THREE.Vector3((Math.random() - 0.5) * 0.5, Math.random() * 0.5, (Math.random() - 0.5) * 0.5),
            life: 1.0
        });
    }
}

/**
 * Luo vihreät datakonfettipartikkelit oikean IP:n asettamisen kunniaksi (jaetuilla resursseilla).
 */
function createDataConfetti(position) {
    const { geo, mat } = getConfettiResources();
    for (let i = 0; i < 30; i++) {
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(position);
        mesh.position.y += 2;
        scene.add(mesh);
        particles.push({
            mesh: mesh,
            velocity: new THREE.Vector3((Math.random() - 0.5) * 0.8, Math.random() * 0.8 + 0.2, (Math.random() - 0.5) * 0.8),
            life: 1.5,
            isConfetti: true
        });
    }
}

/**
 * Pelin pääsilmukka (korkean suorituskyvyn renderöinti ja animaatio).
 */
function animate() {
    requestAnimationFrame(animate);

    const now = performance.now();
    const refs = getDomRefs();
    const gameUi = refs.gameUi;
    const ipModal = refs.ipModal;
    const winModal = refs.winModal;
    const mainMenu = refs.mainMenu;

    // Kameran ohjaus näppäimistöllä
    const isModalOpen = (ipModal && !ipModal.classList.contains('hidden')) || 
                        (winModal && !winModal.classList.contains('hidden'));

    if (gameUi && !gameUi.classList.contains('hidden') && !isModalOpen) {
        const speed = 0.5;
        if (keys.w || keys.up) { cameraTarget.x -= speed; cameraTarget.z -= speed; }
        if (keys.s || keys.down) { cameraTarget.x += speed; cameraTarget.z += speed; }
        if (keys.a || keys.left) { cameraTarget.x -= speed; cameraTarget.z += speed; }
        if (keys.d || keys.right) { cameraTarget.x += speed; cameraTarget.z += speed; }
    }

    // Lerp kamera kohteeseen
    if (mainMenu && mainMenu.classList.contains('hidden')) {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, cameraTarget.x + 20, 0.1);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, cameraTarget.z + 20, 0.1);
        camera.lookAt(cameraTarget.x, 0, cameraTarget.z);
    } else {
        // Valikossa kamera pyörii keskipisteen ympäri
        const time = now * 0.0001;
        camera.position.x = Math.cos(time) * 30;
        camera.position.z = Math.sin(time) * 30;
        camera.lookAt(0, 0, 0);
    }

    // Partikkelien päivitys
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.mesh.position.add(p.velocity);
        p.velocity.y -= 0.02; // Painovoima
        p.life -= 0.02;
        
        if (p.isConfetti) {
            p.mesh.rotation.x += 0.1;
            p.mesh.rotation.y += 0.1;
        }

        if (p.life <= 0) {
            scene.remove(p.mesh);
            particles.splice(i, 1);
        } else {
            p.mesh.scale.setScalar(p.life);
        }
    }

    // Pomppivat laitteet & solmuanimaatiot
    const wifiTime = now * 0.002;
    const wifiSine = Math.sin(wifiTime);

    nodes.forEach(n => {
        if (n.userData.animating) {
            const elapsed = Date.now() - n.userData.animStart;
            const geo = n.mesh.geometry;
            const baseHeight = (geo && geo.boundingBox) ? (geo.boundingBox.max.y - geo.boundingBox.min.y) / 2 : 1;
            if (elapsed < 500) {
                n.mesh.position.y = baseHeight + Math.sin((elapsed / 500) * Math.PI) * 2;
            } else {
                n.mesh.position.y = baseHeight;
                n.userData.animating = false;
            }
        }

        // WiFi-renkaan pulse-animaatio (välimuistitetulla viitteellä)
        if (n.userData.type === 'wifi') {
            if (!n.wifiRingMesh) {
                n.wifiRingMesh = n.mesh.getObjectByName("wifiRing");
            }
            const ring = n.wifiRingMesh;
            if (ring) {
                ring.scale.setScalar(1 + wifiSine * 0.03);
                const isActive = n.userData.isConnected;
                if (isActive) {
                    ring.material.opacity = 0.5 + wifiSine * 0.3;
                    ring.material.color.setHex(0xa855f7);
                } else {
                    ring.material.opacity = 0.2 + wifiSine * 0.1;
                    ring.material.color.setHex(0x475569);
                }
            }
        }

        // Internet-solmun leijuva pyöriminen
        if (n.userData.type === 'cloud') {
            n.mesh.rotation.y += 0.003;
            n.mesh.rotation.x += 0.0015;
        }
    });

    renderer.render(scene, camera);
}
