// --- Laitteiden (nodes), alueiden (zones), tekstilappujen (labels) ja verkkoyhteyksien hallinta ---

// =====================================================================
// CANVAS-TEKSTUURIT – 3D-maailman floating-laput
// =====================================================================

/**
 * Luo canvas-pohjaisen tekstuurin tekstilapulle.
 * @param {string} line1       Pääotsikko
 * @param {string|null} line2  Alaotsikko (aliverkko tms.), tai null
 * @param {string} bgColor     CSS-taustaväri (rgba-string)
 * @param {string} line1Color  Pääotsikon väri
 * @param {string} line2Color  Alaotsikon väri
 */
function createLabelTexture(line1, line2, bgColor, line1Color, line2Color) {
    // 4x Korkearesoluutioinen canvas (2048 x 560 tai 2048 x 400)
    const W = 2048;
    const H = line2 ? 560 : 400;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    // Korkealaatuinen antialiasointi
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Pyöristetyn paneelin mitat
    const radius = 32;
    ctx.clearRect(0, 0, W, H);

    // Taustalaatikko pyöristetyillä kulmilla
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(W - radius, 0);
    ctx.quadraticCurveTo(W, 0, W, radius);
    ctx.lineTo(W, H - radius);
    ctx.quadraticCurveTo(W, H, W - radius, H);
    ctx.lineTo(radius, H);
    ctx.quadraticCurveTo(0, H, 0, H - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();

    ctx.fillStyle = bgColor || 'rgba(10, 18, 36, 0.94)';
    ctx.fill();

    // Kapea vasemmanpuoleinen korosteviiva (leikataan kulman muotoon)
    ctx.save();
    ctx.clip();
    ctx.fillStyle = line1Color || '#60a5fa';
    ctx.fillRect(0, 0, 28, H);
    ctx.restore();

    // Ulkoreunuksen siisti korostus
    ctx.strokeStyle = line1Color ? (line1Color + '66') : 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Tekstien varjostus kontrastin maksimoimiseksi 3D-maailmassa
    ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
    ctx.shadowBlur = 16;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 6;

    if (line2) {
        // Pääotsikko (laite, toimiston nimi tai IP)
        ctx.fillStyle = line1Color || '#ffffff';
        ctx.font = 'bold 165px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(line1, W / 2 + 14, H * 0.38);

        // Alaotsikko (aliverkko, rooli tai ohje)
        ctx.fillStyle = line2Color || 'rgba(215, 235, 255, 0.88)';
        ctx.font = 'bold 115px "JetBrains Mono", "SF Mono", Consolas, "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(line2, W / 2 + 14, H * 0.76);
    } else {
        ctx.fillStyle = line1Color || '#ffffff';
        ctx.font = 'bold 175px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(line1, W / 2 + 14, H / 2);
    }

    // Luodaan Three.js tekstuuri ja asetetaan anisotrooppinen suodatus
    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    if (typeof renderer !== 'undefined' && renderer && renderer.capabilities) {
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    } else {
        texture.anisotropy = 16;
    }
    texture.needsUpdate = true;

    return texture;
}

/**
 * Luo 3D-maailmaan vyöhykkeelle (rakennukselle/osastolle) floating tekstilapun.
 * Lappu on lattian tasolla, vyöhykkeen yläosassa.
 * @param {number} x          Vyöhykkeen X-keskipiste
 * @param {number} z          Vyöhykkeen Z-keskipiste
 * @param {number} w          Vyöhykkeen leveys
 * @param {number} d          Vyöhykkeen syvyys
 * @param {string} name       Osaston nimi, esim. "HR / Myynti"
 * @param {string|null} subnet Aliverkon osoite, esim. "10.10.1.0/24"
 * @param {number} colorHex   Väri heksana
 */
function createZoneLabelMesh(x, z, w, d, name, subnet, colorHex) {
    const cssColor = '#' + colorHex.toString(16).padStart(6, '0');

    const texture = createLabelTexture(
        name,
        subnet || null,
        'rgba(10, 16, 32, 0.92)',
        cssColor,
        'rgba(210,230,255,0.85)'
    );

    // Lapun fyysinen koko maailmassa (sopeutuu vyöhykkeen kokoon)
    const aspect = 2048 / (subnet ? 560 : 400);
    const labelW = Math.min(w * 0.48, 11);
    const labelH = labelW / aspect;

    const geo = new THREE.PlaneGeometry(labelW, labelH);
    const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 1.0,
        depthWrite: false,
        side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geo, mat);

    // Makaa lattiatasossa (isometrinen näkymä)
    mesh.rotation.x = -Math.PI / 2;
    // Sijoitetaan vyöhykkeen vasempaan yläreunaan, jotta se ei peitä keskellä olevia laitteita tai kaapeleita
    const posX = x - w / 2 + labelW / 2 + 1.0;
    const posZ = z - d / 2 + labelH / 2 + 0.8;
    mesh.position.set(posX, 0.12, posZ);

    scene.add(mesh);
    labelMeshes.push(mesh);
    return mesh;
}

/**
 * Luo tai päivittää yksittäisen laitteen lapun 3D-maailmaan.
 * Kaikilla laitteilla on selkeä tunnistelappu (Reititin, Kytkin, WiFi jne.),
 * ja päätelaitteilla lappu näyttää IP-osoitteen heti kun se on asetettu.
 * @param {Object} node Laitteen node-olio
 */
function updateNodeLabel(node) {
    let displayLine1, displayLine2, bgColor, line1Color;
    const type = node.userData.type;
    const isConnected = !!node.userData.isConnected;
    const hasIp = !!(node.userData.correctIp && node.userData.ip);

    if (type === nodeTypes.GATEWAY) {
        displayLine1 = "🌐 DEFAULT GATEWAY";
        displayLine2 = "Yhdyskäytävä";
        bgColor = "rgba(15, 35, 75, 0.94)";
        line1Color = "#60a5fa";
    } else if (type === nodeTypes.ROUTER) {
        displayLine1 = "🔀 REITITIN";
        displayLine2 = isConnected ? "Reititin" : "Kytke Gatewayhin";
        bgColor = isConnected ? "rgba(20, 50, 90, 0.94)" : "rgba(15, 23, 42, 0.88)";
        line1Color = isConnected ? "#38bdf8" : "#64748b";
    } else if (type === nodeTypes.CLOUD) {
        displayLine1 = "☁️ INTERNET";
        displayLine2 = "Ulkoverkko (WAN)";
        bgColor = "rgba(20, 45, 80, 0.94)";
        line1Color = "#93c5fd";
    } else if (type === nodeTypes.SWITCH) {
        displayLine1 = "🖧 KYTKIN";
        displayLine2 = isConnected ? "LAN Switch" : "Kytke reitittimeen";
        bgColor = isConnected ? "rgba(50, 25, 10, 0.94)" : "rgba(15, 23, 42, 0.88)";
        line1Color = isConnected ? "#fb923c" : "#64748b";
    } else if (type === nodeTypes.CORE_SWITCH) {
        displayLine1 = "⚙️ YDINLINKKI";
        displayLine2 = isConnected ? "Core Switch" : "Kytke reitittimeen";
        bgColor = isConnected ? "rgba(35, 35, 45, 0.94)" : "rgba(15, 23, 42, 0.88)";
        line1Color = isConnected ? "#e2e8f0" : "#64748b";
    } else if (type === nodeTypes.WIFI) {
        displayLine1 = "📡 WIFI-TUKIASEMA";
        displayLine2 = isConnected ? "WLAN AP (DHCP)" : "Kytke kytkimeen";
        bgColor = isConnected ? "rgba(45, 15, 65, 0.94)" : "rgba(15, 23, 42, 0.88)";
        line1Color = isConnected ? "#c084fc" : "#64748b";
    } else if (type === nodeTypes.FIREWALL) {
        displayLine1 = "🔥 PALOMUURI";
        displayLine2 = isConnected ? "Edge Firewall" : "Kytke reitittimeen";
        bgColor = isConnected ? "rgba(65, 15, 15, 0.94)" : "rgba(15, 23, 42, 0.88)";
        line1Color = isConnected ? "#f87171" : "#64748b";
    } else {
        // Päätelaitteet (PC, Toimisto, Palvelin, Tulostin, Läppäri, VoIP)
        const typeLabels = {
            [nodeTypes.OFFICE]: "🏢 TOIMISTO",
            [nodeTypes.PC]: "💻 PC",
            [nodeTypes.LAPTOP]: "💻 LÄPPÄRI",
            [nodeTypes.SERVER]: "🖥️ PALVELIN",
            [nodeTypes.PRINTER]: "🖨️ TULOSTIN",
            [nodeTypes.VOIP]: "📞 VOIP"
        };
        const typeName = typeLabels[type] || type.toUpperCase();

        if (!isConnected) {
            displayLine1 = typeName;
            displayLine2 = "Kytke kaapeli";
            bgColor = "rgba(15, 23, 42, 0.88)";
            line1Color = "#64748b";
        } else if (hasIp) {
            displayLine1 = node.userData.ip;
            displayLine2 = "✅ " + typeName;
            bgColor = "rgba(6, 78, 59, 0.96)";
            line1Color = "#4ade80";
        } else {
            displayLine1 = typeName;
            displayLine2 = "Aseta IP & maski";
            bgColor = "rgba(20, 28, 45, 0.92)";
            line1Color = "#38bdf8";
        }
    }

    // Välimuistin tarkistus – ei luoda canvasta turhaan jos sisältö tai tila ei muuttunut
    const labelKey = `${displayLine1}|${displayLine2}|${bgColor}|${line1Color}|${isConnected}|${hasIp}`;
    if (node.userData.lastLabelKey === labelKey && node.userData.labelMesh) {
        return;
    }
    node.userData.lastLabelKey = labelKey;

    // Poista vanha lappu jos olemassa
    if (node.userData.labelMesh) {
        scene.remove(node.userData.labelMesh);
        labelMeshes = labelMeshes.filter(l => l !== node.userData.labelMesh);
        node.userData.labelMesh = null;
    }

    const texture = createLabelTexture(
        displayLine1,
        displayLine2,
        bgColor,
        line1Color,
        'rgba(215, 235, 255, 0.88)'
    );

    const labelW = 5.2;
    const labelH = labelW * (560 / 2048);

    const geo = new THREE.PlaneGeometry(labelW, labelH);
    const labelOpacity = (type === nodeTypes.ROUTER || type === nodeTypes.CLOUD || hasIp) ? 1.0 : (isConnected ? 0.9 : 0.6);
    const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: labelOpacity,
        depthWrite: false,
        side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;

    node.mesh.geometry.computeBoundingBox();
    const nodeTop = node.mesh.geometry.boundingBox.max.y;
    
    if (type === nodeTypes.ROUTER) {
        // Reitittimen tunnistelappu laitteen etupuolelle (kohti kameraa, Z-akseli), jotta 3D-sylinteri ei peitä sitä
        mesh.position.set(
            node.mesh.position.x,
            0.16,
            node.mesh.position.z + 2.0
        );
    } else if (type === nodeTypes.CLOUD) {
        // Internet-pilven tunnistelappu laitteen etupuolelle (kohti kameraa), turvallisesti erillään wireframe-pallosta
        mesh.position.set(
            node.mesh.position.x,
            0.16,
            node.mesh.position.z + 3.0
        );
    } else if (type === nodeTypes.OFFICE) {
        // Toimiston tunnistelapulle hieman enemmän tilaa isomman 3D-mallin koon mukaan
        mesh.position.set(
            node.mesh.position.x,
            0.16,
            node.mesh.position.z - 3.2
        );
    } else {
        mesh.position.set(
            node.mesh.position.x,
            0.16,
            node.mesh.position.z - 1.5
        );
    }

    scene.add(mesh);
    labelMeshes.push(mesh);
    node.userData.labelMesh = mesh;
}

// =====================================================================
// LAITTEEN ULKOASU (3D-geometria ja väri)
// =====================================================================

/**
 * Palauttaa laitteen 3D-geometrian ja värin tyypin perusteella.
 * Jokainen laitetyyppi on visuaalisesti erilainen – oppilas oppii erottamaan ne.
 */
function getNodeAppearance(type) {
    switch (type) {
        case nodeTypes.GATEWAY:
            // Default Gateway – sininen palvelinräkki
            return { geometry: new THREE.BoxGeometry(1.2, 3.5, 1.0), color: 0x2563eb };
        case nodeTypes.ROUTER:
            // Pöytäreititin – matala sylinteri
            return { geometry: new THREE.CylinderGeometry(1, 1, 0.6, 16), color: 0x3b82f6 };
        case nodeTypes.FIREWALL:
            // Pyramidi – suoja/varoitus muoto
            return { geometry: new THREE.ConeGeometry(1.2, 2.5, 4), color: 0xef4444 };
        case nodeTypes.SWITCH:
            // Matala levy – kytkin on infrastruktuurilaitteena kompakti
            return { geometry: new THREE.BoxGeometry(1.5, 0.3, 1.1), color: 0xf97316 };
        case nodeTypes.CORE_SWITCH:
            // Kuusikulmainen levy – ydinlinkki runkokytkimenä
            return { geometry: new THREE.CylinderGeometry(1.1, 1.1, 0.45, 6), color: 0xc0c0c0 };
        case nodeTypes.WIFI:
            // Pallo – langaton laite, siisti kompakti koko
            return { geometry: new THREE.SphereGeometry(0.45, 16, 16), color: 0xa855f7 };
        case nodeTypes.OFFICE:
            // Suuri kuutio – toimistokone on iso pöytäkone
            return { geometry: new THREE.BoxGeometry(2, 2, 2), color: 0x64748b };
        case nodeTypes.PC:
            // Pienempi kuutio – normaali pöytäkone
            return { geometry: new THREE.BoxGeometry(1.2, 1.4, 1.2), color: 0x94a3b8 };
        case nodeTypes.LAPTOP:
            // Hyvin ohut levy – läppäri on litteä
            return { geometry: new THREE.BoxGeometry(1.6, 0.15, 1.1), color: 0x06b6d4 };
        case nodeTypes.SERVER:
            // Korkea kapea palkki – palvelin erottuu selvästi PC:stä!
            return { geometry: new THREE.BoxGeometry(1.0, 3.5, 0.8), color: 0x1e3a5f };
        case nodeTypes.PRINTER:
            // Leveä matala levy – tulostin on alhainen ja leveä
            return { geometry: new THREE.BoxGeometry(2.2, 0.6, 1.8), color: 0xeab308 };
        case nodeTypes.VOIP:
            // Kapeampi, pienempi pysty-pylväs – VoIP-puhelin
            return { geometry: new THREE.BoxGeometry(0.6, 1.8, 0.5), color: 0x06d6a0 };
        case nodeTypes.CLOUD:
            // Low-poly maapallo – Internet
            return { geometry: new THREE.IcosahedronGeometry(1.4, 1), color: 0x93c5fd };
        default:
            return { geometry: new THREE.BoxGeometry(1, 1, 1), color: 0xffffff };
    }
}

// =====================================================================
// 3D-MALLIEN LATAUS JA HALLINTA (GLTF / GLB / OBJ)
// =====================================================================

// Määritellään mille laitetyypeille on olemassa oikeat 3D-mallit assets/models/ -kansiossa
const customModels = {
    [nodeTypes.GATEWAY]: 'assets/models/gateway-edge.glb?v=20260912_v16',
    [nodeTypes.ROUTER]: 'assets/models/router.glb',
    [nodeTypes.CORE_SWITCH]: 'assets/models/juniper-9204.glb',
    [nodeTypes.SWITCH]: 'assets/models/juniper-9204.glb',
    [nodeTypes.SERVER]: 'assets/models/server-4002.glb',
    [nodeTypes.OFFICE]: 'assets/models/toimisto.glb',
    [nodeTypes.LAPTOP]: 'assets/models/kannettava.glb',
    [nodeTypes.PC]: 'assets/models/pc.glb',
    [nodeTypes.PRINTER]: 'assets/models/tulostin.glb',
    [nodeTypes.WIFI]: 'assets/models/ap-ceiling.glb?v=20260912_v16',
    [nodeTypes.FIREWALL]: 'assets/models/firewall.glb?v=20260912_v16',
};
const modelCache = {};
let gltfLoaderInstance = null;
let fbxLoaderInstance = null;

function getGltfLoader() {
    if (!gltfLoaderInstance && typeof THREE !== 'undefined' && typeof THREE.GLTFLoader !== 'undefined') {
        gltfLoaderInstance = new THREE.GLTFLoader();
    }
    return gltfLoaderInstance;
}

function getFbxLoader() {
    if (!fbxLoaderInstance && typeof THREE !== 'undefined' && typeof THREE.FBXLoader !== 'undefined') {
        fbxLoaderInstance = new THREE.FBXLoader();
    }
    return fbxLoaderInstance;
}

/**
 * Yrittää ladata laitteelle oikean 3D-mallin assets/models -kansiosta.
 * Mikäli mallia ei löydy tai sitä ei ole vielä konvertoitu, peli käyttää saumatonta perusgeometriaa.
 */
function tryLoadCustomModel(node, type) {
    // Haetaan malli (joko suorana base64-datana tai tiedostopolkuna)
    let modelUrl = customModels[type];
    if ((type === nodeTypes.CORE_SWITCH || type === nodeTypes.SWITCH) && typeof window !== 'undefined' && window.JUNIPER_9204_MODEL) {
        modelUrl = window.JUNIPER_9204_MODEL;
    } else if (type === nodeTypes.GATEWAY) {
        // Default Gateway on Enterprise Edge Gateway (gateway-edge.glb)
        modelUrl = (typeof window !== 'undefined' && window.GATEWAY_EDGE_MODEL) ? window.GATEWAY_EDGE_MODEL : 'assets/models/gateway-edge.glb?v=20260912_v16';
    } else if (type === nodeTypes.ROUTER) {
        // Normaali reititin on AINA 4-antenninen pöytäreititin (router.glb)
        modelUrl = (typeof window !== 'undefined' && window.WIFI_AP_MODEL) ? window.WIFI_AP_MODEL : 'assets/models/router.glb';
    } else if (type === nodeTypes.SERVER && typeof window !== 'undefined' && window.SERVER_4002_MODEL) {
        modelUrl = window.SERVER_4002_MODEL;
    } else if (type === nodeTypes.OFFICE && typeof window !== 'undefined' && window.TOIMISTO_MODEL) {
        modelUrl = window.TOIMISTO_MODEL;
    } else if (type === nodeTypes.LAPTOP && typeof window !== 'undefined' && window.KANNETTAVA_MODEL) {
        modelUrl = window.KANNETTAVA_MODEL;
    } else if (type === nodeTypes.PC && typeof window !== 'undefined' && window.PC_MODEL) {
        modelUrl = window.PC_MODEL;
    } else if (type === nodeTypes.PRINTER && typeof window !== 'undefined' && window.PRINTER_MODEL) {
        modelUrl = window.PRINTER_MODEL;
    } else if (type === nodeTypes.WIFI) {
        // WiFi-tukiasema on AINA oma huipputason Enterprise Wi-Fi 7 Access Point
        modelUrl = (typeof window !== 'undefined' && window.CEILING_AP_MODEL)
            ? window.CEILING_AP_MODEL
            : 'assets/models/ap-ceiling.glb?v=20260912_v18';
    } else if (type === nodeTypes.FIREWALL) {
        // Enterprise Next-Gen Threat Defense Firewall (firewall.glb)
        modelUrl = (typeof window !== 'undefined' && window.FIREWALL_MODEL)
            ? window.FIREWALL_MODEL
            : 'assets/models/firewall.glb?v=20260912_v18';
    }
    if (!modelUrl) return;

    if (modelCache[modelUrl]) {
        applyModelToNode(node, modelCache[modelUrl].clone());
        return;
    }

    const isFbx = typeof modelUrl === 'string' && modelUrl.toLowerCase().endsWith('.fbx');
    const loader = isFbx ? getFbxLoader() : getGltfLoader();
    if (!loader) return;

    loader.load(
        modelUrl,
        (result) => {
            const scene = isFbx ? result : (result.scene || result);
            modelCache[modelUrl] = scene;
            applyModelToNode(node, scene.clone());
        },
        undefined,
        (err) => {
            // Mikäli lataus epäonnistuu, peli säilyttää siistin perusgeometrian
        }
    );
}

/**
 * Luo yritystason modernin valkoisen katto-AP -mallin (Enterprise Ceiling AP).
 * Tämä korvaa SOHO 4-antennisen kotipurkin edistyneillä tasoilla (21+).
 */
function applyEnterpriseCeilingAp(node) {
    if (!node || !node.mesh) return;
    
    const apGroup = new THREE.Group();
    apGroup.name = "enterpriseApModel";

    // 1. Valkoinen pyöristetty päälautanen (UniFi / Cisco tyylinen moderni kiekko)
    const discGeo = new THREE.CylinderGeometry(0.85, 0.95, 0.22, 32);
    const discMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.25,
        metalness: 0.1
    });
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.castShadow = true;
    disc.receiveShadow = true;
    disc.position.y = 0.11;
    apGroup.add(disc);

    // 2. Yläkupu (aerodynaaminen pehmeä kaari)
    const domeGeo = new THREE.SphereGeometry(0.84, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.35);
    const domeMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.2,
        metalness: 0.05
    });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.y = 0.18;
    apGroup.add(dome);

    // 3. Status LED-rengas (sininen hehku keskellä / aktiivisena vihreä tai syani)
    const ledRingGeo = new THREE.TorusGeometry(0.35, 0.035, 16, 32);
    const ledRingMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.85
    });
    const ledRing = new THREE.Mesh(ledRingGeo, ledRingMat);
    ledRing.rotation.x = Math.PI / 2;
    ledRing.position.y = 0.23;
    apGroup.add(ledRing);

    // 4. Taustalevy / kattoasennusrauta
    const mountGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.05, 32);
    const mountMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.7 });
    const mount = new THREE.Mesh(mountGeo, mountMat);
    mount.position.y = 0.025;
    apGroup.add(mount);

    // Materiaalien tallennus aktivoitumista ja harmaasävyä varten
    apGroup.traverse(child => {
        if (child.isMesh && child.material) {
            const mats = Array.isArray(child.material) ? child.material : [child.material];
            child.userData.originalMaterials = mats.map(m => ({
                color: m.color ? m.color.clone() : new THREE.Color(0xffffff),
                emissive: m.emissive ? m.emissive.clone() : new THREE.Color(0x000000)
            }));
        }
    });

    node.mesh.material.visible = false;
    node.mesh.add(apGroup);
    updateNodeVisualState(node);
}

function applyModelToNode(node, modelMesh) {
    if (!node || !node.mesh) return;
    const type = node.userData.type;

    // Suuntaukset eri laitetyypeille isometrisessä maailmassa
    if (type === nodeTypes.OFFICE) {
        // Käännetään toimistorakennus osoittamaan suoraan kohti isometristä kameraa (seinät taakse, huone avautuu eteen)
        modelMesh.rotation.y = Math.PI / 2;
    } else if (type === nodeTypes.LAPTOP) {
        // Suoraan koordinaatiston ja ruudukon mukaisesti
        modelMesh.rotation.y = 0;
    } else if (type === nodeTypes.PC) {
        // Suoraan koordinaatiston ja ruudukon mukaisesti (etupaneeli ja lasikylki näkyviin)
        modelMesh.rotation.y = 0;
    } else if (type === nodeTypes.PRINTER) {
        // Käännetään tulostin niin että tulostuskaukalo ja LCD-ohjauspaneeli avautuvat eteen
        modelMesh.rotation.y = 0;
    } else if (type === nodeTypes.SERVER) {
        // Räkki/palvelin etupaneeli kohti kameraa
        modelMesh.rotation.y = 0;
    } else if (type === nodeTypes.GATEWAY) {
        // Default Gateway - palvelinräkki etupaneeli kohti kameraa
        modelMesh.rotation.y = 0;
    } else if (type === nodeTypes.ROUTER) {
        // SOHO-reititin käännetään niin että etupaneelin LEDit osoittavat eteen ja antennit ovat takana
        modelMesh.rotation.y = Math.PI / 2;
    } else if (type === nodeTypes.WIFI) {
        // WiFi AP etupaneeli ja Wi-Fi 7 tekstit suoraan kohti isometristä pelaajanäkymää
        modelMesh.rotation.y = 0;
    } else if (type === nodeTypes.FIREWALL) {
        // Palomuuri etupaneeli ja suojalogo suoraan kohti kameraa
        modelMesh.rotation.y = 0;
    }

    const box = new THREE.Box3().setFromObject(modelMesh);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
        let targetSize = 2.0;
        if (type === nodeTypes.GATEWAY) targetSize = 2.7; // Default Gateway – näyttävä 3U Enterprise Security Gateway
        if (type === nodeTypes.SERVER) targetSize = 3.2;  // Palvelin erottuu selkeänä ja korkeana
        if (type === nodeTypes.ROUTER) targetSize = 2.2;  // Pöytäreititin selkeässä koossa antenneineen
        if (type === nodeTypes.OFFICE) targetSize = 5.0;  // Toimistorakennus on näyttävä, kookas ja huonemainen kokonaisuus
        if (type === nodeTypes.LAPTOP) targetSize = 1.9;  // MacBook tyylinen kompakti ja tarkka koko
        if (type === nodeTypes.PC) targetSize = 2.2;      // Custom Gaming PC -tornikotelo
        if (type === nodeTypes.PRINTER) targetSize = 2.0; // Toimistotulostin selkeässä ja sopivassa koossa
        if (type === nodeTypes.CORE_SWITCH) targetSize = 1.7; // Ydinlinkki (kompakti runkokytkin)
        if (type === nodeTypes.SWITCH) targetSize = 1.4;  // Kytkin (puolet pienempi, ei vie liikaa tilaa kartalta)
        if (type === nodeTypes.WIFI) targetSize = 1.85;   // Enterprise WiFi 7 AP – selkeä, tyylikäs katto/pöytätukiasema
        if (type === nodeTypes.FIREWALL) targetSize = 2.4; // Enterprise Next-Gen Firewall – näyttävä 2U turvalaite
        const scale = targetSize / maxDim;
        if (type === nodeTypes.SWITCH) {
            // Tehdään LAN-kytkimestä huomattavasti litteämpi (perinteinen 1U kytkin)
            modelMesh.scale.set(scale * 1.1, scale * 0.4, scale * 1.1);
        } else {
            modelMesh.scale.set(scale, scale, scale);
        }
    }

    // Lasketaan skaalatun ja käännetyn mallin todellinen alaraja ja keskipiste
    const scaledBox = new THREE.Box3().setFromObject(modelMesh);
    const center = new THREE.Vector3();
    scaledBox.getCenter(center);

    // Asetetaan mallin pohja (scaledBox.min.y) täsmälleen maailman lattiatasolle (world Y = 0)
    modelMesh.position.set(
        -center.x,
        -node.mesh.position.y - scaledBox.min.y,
        -center.z
    );

    // Tehdään mallin materiaaleista yhteensopivia valojen kanssa ja kloonataan materiaalit
    modelMesh.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
                // TÄRKEÄÄ: Kloonataan materiaalit niin jokainen laite voi hallita omaa väritilaansa itsenäisesti
                if (Array.isArray(child.material)) {
                    child.material = child.material.map(m => m.clone());
                } else {
                    child.material = child.material.clone();
                }

                // Varmistetaan, että teksturoiduissa materiaaleissa (m.map) perusväri on puhdas valkoinen (1,1,1)
                // eikä metallisuus sammuta diffuusia valoa ilman envMapia
                const matsToCheck = Array.isArray(child.material) ? child.material : [child.material];
                matsToCheck.forEach(m => {
                    if (m.map) {
                        m.color.setRGB(1.0, 1.0, 1.0);
                        m.metalness = Math.min(m.metalness ?? 0.08, 0.12);
                        m.roughness = Math.max(m.roughness ?? 0.32, 0.32);
                    }
                });

                // Default Gateway (gateway-edge.glb): säilytetään korkeatasoiset PBR-tekstuurit ja korostetaan ledejä
                if (type === nodeTypes.GATEWAY) {
                    const mats = Array.isArray(child.material) ? child.material : [child.material];
                    mats.forEach(m => {
                        // Varmistetaan että diffuse-tekstuuri näkyy kirkkaana Three.js:n valoissa ilman envMapia
                        m.metalness = Math.min(m.metalness ?? 0.1, 0.15);
                        m.roughness = Math.max(m.roughness ?? 0.35, 0.35);
                        if (m.name && (m.name.includes('Fiber') || m.name.includes('OLED') || m.name.includes('LED') || m.name.includes('StatusBar'))) {
                            if (m.emissive) {
                                m.emissiveIntensity = 1.0;
                            }
                        }
                    });
                } else if (type === nodeTypes.WIFI) {
                    // Enterprise Wi-Fi 7 Access Point: säilytetään titaani/valkoinen PBR ja LED-halo
                    const mats = Array.isArray(child.material) ? child.material : [child.material];
                    mats.forEach(m => {
                        m.metalness = Math.min(m.metalness ?? 0.06, 0.12);
                        m.roughness = Math.max(m.roughness ?? 0.32, 0.32);
                        if (m.name && (m.name.includes('LedRing') || m.name.includes('LED') || m.name.includes('Halo'))) {
                            if (m.emissive) {
                                m.emissiveIntensity = 1.0;
                            }
                        }
                    });
                } else if (type === nodeTypes.FIREWALL) {
                    // Enterprise Next-Gen Firewall: säilytetään grafiitti/punainen PBR, OLED ja kuituvalot
                    const mats = Array.isArray(child.material) ? child.material : [child.material];
                    mats.forEach(m => {
                        m.metalness = Math.min(m.metalness ?? 0.08, 0.15);
                        m.roughness = Math.max(m.roughness ?? 0.35, 0.35);
                        if (m.name && (m.name.includes('Glow') || m.name.includes('LED') || m.name.includes('OLED') || m.name.includes('Fiber'))) {
                            if (m.emissive) {
                                m.emissiveIntensity = 1.0;
                            }
                        }
                    });
                } else if (type === nodeTypes.SWITCH) {
                    // Tavallinen LAN-kytkin: Oranssi/Kuparinen teema
                    const mats = Array.isArray(child.material) ? child.material : [child.material];
                    mats.forEach(m => {
                        m.color = new THREE.Color(0xf97316); // Oranssi
                        m.roughness = 0.6;
                        m.metalness = 0.4;
                        if (m.emissive) {
                            m.emissive = new THREE.Color(0xfdba74);
                            m.emissiveIntensity = 0.3;
                        }
                    });
                } else if (type === nodeTypes.CORE_SWITCH) {
                    // Ydinlinkki (Core Switch): Hopeinen/Titaani teema
                    const mats = Array.isArray(child.material) ? child.material : [child.material];
                    mats.forEach(m => {
                        m.color = new THREE.Color(0x94a3b8);
                        m.roughness = 0.2;
                        m.metalness = 0.8;
                        if (m.emissive) {
                            m.emissive = new THREE.Color(0xcbd5e1);
                            m.emissiveIntensity = 0.2;
                        }
                    });
                }

                const mats = Array.isArray(child.material) ? child.material : [child.material];
                child.userData.originalMaterials = mats.map(m => ({
                    color: m.color ? m.color.clone() : new THREE.Color(0xffffff),
                    emissive: m.emissive ? m.emissive.clone() : new THREE.Color(0x000000)
                }));
                mats.forEach(m => {
                    m.needsUpdate = true;
                });
            }
        }
    });

    node.mesh.material.visible = false;
    node.mesh.add(modelMesh);
    updateNodeVisualState(node);
}

/**
 * Tarkistaa onko laite aktiivinen (eli saanut värinsä takaisin).
 * Päätelaitteet aktivoituvat VAIN kun niillä on yhteys reitittimeen JA oikea IP & maski syötettynä.
 * Infrastruktuurilaitteet ja maailma aktivoituvat, kun verkkoon saadaan vähintään yksi konfiguroitu laite.
 */
function isNodeActive(node) {
    if (!node || !node.userData) return false;
    const type = node.userData.type;

    // Default Gateway ja Internet ovat AINA värillisiä
    if (type === nodeTypes.GATEWAY || type === nodeTypes.CLOUD) {
        return true;
    }

    // Reititin ja Palomuuri heräävät heti kun niillä on verkkoyhteys
    if (type === nodeTypes.ROUTER || type === nodeTypes.FIREWALL) {
        return !!node.userData.isConnected;
    }

    // Päätelaitteet (PC, Toimisto, Palvelin, Läppäri, Tulostin, VoIP):
    // Eivät herää pelkästä kaapelin kytkennästä! Vaativat:
    // 1. Yhteys onnistunut (isConnected)
    // 2. Maski onnistunut (correctIp)
    // 3. IP syötetty (correctIp)
    if (IP_REQUIRED_TYPES.includes(type)) {
        return !!(node.userData.isConnected && node.userData.correctIp);
    }

    // Kytkimet, ydinlinkit ja WiFi-tukiasemat:
    if ([nodeTypes.SWITCH, nodeTypes.CORE_SWITCH, nodeTypes.WIFI].includes(type)) {
        return !!(node.userData.isConnected && nodes.some(n => n.userData.isConnected && n.userData.correctIp));
    }

    return false;
}

/**
 * Päivittää laitteen ja sen 3D-mallin väritilan.
 * Aluksi kaikki laitteet maailmassa ja alueilla ovat värittömiä (harmaasävyisiä).
 * Kun reitti reitittimeen muodostuu JA oikea IP & maski asetetaan (onnistunut yhdistys),
 * laite ja 3D-malli heräävät täyteen väriinsä!
 */
function updateNodeVisualState(node) {
    if (!node || !node.mesh) return;

    const type = node.userData ? node.userData.type : null;
    const isActive = isNodeActive(node);
    const isIpOk = !!node.userData.correctIp;

    // 1. Päivitetään perusgeometrian materiaali (jos ei 3D-mallia tai varana)
    if (node.mesh.material) {
        if (!isActive) {
            // Täysin väritön / harmaasävy (ei yhteyttä tai IP asettamatta)
            const baseCol = new THREE.Color(node.userData.baseColor || 0x888888);
            const luma = baseCol.r * 0.299 + baseCol.g * 0.587 + baseCol.b * 0.114;
            const grey = luma * 0.40 + 0.16;
            node.mesh.material.color.setRGB(grey, grey, grey);
        } else {
            // Onnistunut yhdistys & IP konfiguroitu! Täysi väri
            if (isIpOk) {
                node.mesh.material.color.setHex(0x10b981);
            } else {
                node.mesh.material.color.setHex(node.userData.baseColor || 0x3b82f6);
            }
        }
    }

    // 2. Päivitetään 3D-mallin (toimisto, palvelin, kytkin) alimeshien materiaalit
    node.mesh.traverse((child) => {
        if (child !== node.mesh && child.isMesh && child.name !== 'wifiRing') {
            if (child.userData && child.userData.originalMaterials) {
                const mats = Array.isArray(child.material) ? child.material : [child.material];
                mats.forEach((m, idx) => {
                    const orig = child.userData.originalMaterials[idx];
                    if (!orig) return;

                    // 1. Jos materiaalilla on tekstuuri (m.map), säilytetään väri AINA kirkkaana (1,1,1)
                    // Tämä estää tekstuurien (logot, tekstit, kaaviot) muuttumisen pimeäksi/mustaksi!
                    if (m.map) {
                        m.color.setRGB(1.0, 1.0, 1.0);
                        if (m.emissive && orig.emissive) {
                            m.emissive.copy(orig.emissive);
                        }
                    } else if (type === nodeTypes.FIREWALL || type === nodeTypes.GATEWAY || type === nodeTypes.WIFI) {
                        // 2. Erillissuunnitellut 3D-verkkolaitteet (Palomuuri, Gateway, Wi-Fi 7 AP):
                        // Laitteiston teollinen ilme, punainen suojauslohko ja kotelo säilytetään aina
                        m.color.copy(orig.color);
                        if (m.emissive && orig.emissive) {
                            if (isActive) {
                                m.emissive.copy(orig.emissive);
                            } else {
                                // Valmiustilassa verkkoliikenteen linkkiledit sammuksissa, mutta laitteen oma tila/suojaledi päällä
                                if (m.name && (m.name.includes('LED_Green') || m.name.includes('Fiber'))) {
                                    m.emissive.setHex(0x000000);
                                } else {
                                    m.emissive.copy(orig.emissive).multiplyScalar(0.7);
                                }
                            }
                        }
                    } else if (!isActive) {
                        // 3. Päätelaitteiden (PC, toimisto, läppäri jne.) normaali desaturaatio ennen kytkentää
                        const luma = orig.color.r * 0.299 + orig.color.g * 0.587 + orig.color.b * 0.114;
                        const grey = luma * 0.46 + 0.14;
                        m.color.setRGB(grey, grey, grey);
                        if (m.emissive) m.emissive.setHex(0x000000);
                    } else {
                        // Onnistunut yhdistys! Täysi väri palautuu
                        m.color.copy(orig.color);
                        if (m.emissive && orig.emissive) {
                            m.emissive.copy(orig.emissive);
                        }
                    }
                });
            }
        }
    });

    // 3. WiFi-rengas (Värit päivittyvät itse asiassa myös scene.js:n animaatioloopissa)
    const wifiRing = node.mesh.getObjectByName("wifiRing");
    if (wifiRing && wifiRing.material) {
        wifiRing.material.color.setHex(isActive ? 0xa855f7 : 0x475569);
    }
}

// =====================================================================
// LAITTEIDEN LUONTI JA POISTO
// =====================================================================

/**
 * Luo 3D-maailmaan uuden laitteen.
 * @param {string}  type          nodeTypes-vakiosta
 * @param {number}  x
 * @param {number}  z
 * @param {boolean} isPredefined  Tason kiinteä laite (ei voi poistaa)
 * @returns {Object} Luotu node-olio
 */
function createNode(type, x, z, isPredefined = false) {
    const { geometry, color } = getNodeAppearance(type);

    const material = new THREE.MeshPhongMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.geometry.computeBoundingBox();
    const height = mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y;
    mesh.position.set(x, height / 2, z);
    scene.add(mesh);

    const isStartNode = (type === nodeTypes.GATEWAY || type === nodeTypes.CLOUD);

    const node = {
        id: Math.random().toString(36).substr(2, 9),
        mesh,
        userData: {
            type,
            isPredefined,
            isConnected: isStartNode,
            baseColor: color,
            correctIp: false,
            ip: null,
            mask: null,
            labelMesh: null
        }
    };

    // WiFi-kantamarengas (ohut, animoitava, STENCIL-maskattu huoneisiin)
    if (type === nodeTypes.WIFI) {
        const ringGeo = new THREE.RingGeometry(14.6, 15.0, 64);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0x64748b,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.25,
            // Stencil: Piirretään vain jos alla on huone (stencilRef = 1)
            stencilWrite: true,
            stencilRef: 1,
            stencilFunc: THREE.EqualStencilFunc
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.name = "wifiRing";
        ring.rotation.x = Math.PI / 2;
        ring.position.y = 0.1; // Hieman lattian yläpuolella
        mesh.add(ring);
        node.userData.wifiRange = 15;
    }

    // Pilvi-hehku (Digitaalinen ulkokuori)
    if (type === nodeTypes.CLOUD) {
        const glowGeo = new THREE.IcosahedronGeometry(2.0, 1);
        const glowMat = new THREE.MeshBasicMaterial({
            color: 0x93c5fd,
            transparent: true,
            opacity: 0.15,
            wireframe: true, // Wireframe tekee siitä tosi kivan näköisen datamaapallon!
            side: THREE.BackSide
        });
        mesh.add(new THREE.Mesh(glowGeo, glowMat));
    }

    nodes.push(node);

    // Alustetaan visuaalinen tila (väritön jos ei yhteyttä)
    updateNodeVisualState(node);

    // Ladataan aito 3D-malli, mikäli sellainen on määritelty laitteelle
    tryLoadCustomModel(node, type);

    // Luo tunnistelappu laitteelle (reititin, kytkin, wifi, pc jne.)
    updateNodeLabel(node);

    checkConnections();
    return node;
}

/**
 * Poistaa laitteen ja kaikki siihen kytketyt kaapelit.
 */
function deleteNode(node) {
    cables = cables.filter(cable => {
        if (cable.nodeA === node || cable.nodeB === node) {
            scene.remove(cable.line);
            return false;
        }
        return true;
    });

    // Poista myös lappu
    if (node.userData.labelMesh) {
        scene.remove(node.userData.labelMesh);
        labelMeshes = labelMeshes.filter(l => l !== node.userData.labelMesh);
    }

    scene.remove(node.mesh);
    nodes = nodes.filter(n => n !== node);
    checkConnections();
}

// =====================================================================
// VYÖHYKKEET (VLAN-ALUEET)
// =====================================================================

/**
 * Piirtää lattiaan visuaalisen VLAN- tai osastoalueen JA tekstilapun.
 * @param {number} x
 * @param {number} z
 * @param {number} w           Leveys
 * @param {number} d           Syvyys
 * @param {number} colorHex    Väri
 * @param {string} [name]      Osaston nimi (valinnainen)
 * @param {string} [subnet]    Aliverkon osoite esim. "10.0.0.0/24" (valinnainen)
 */
function createZone(x, z, w, d, colorHex, name, subnet) {
    const geometry = new THREE.PlaneGeometry(w, d);
    const material = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.14,
        side: THREE.DoubleSide,
        depthWrite: false,
        stencilWrite: true,
        stencilRef: 1,
        stencilZPass: THREE.ReplaceStencilOp
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(x, 0.05, z);

    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: colorHex, opacity: 0.55, transparent: true, linewidth: 2 })
    );
    mesh.add(line);

    mesh.userData = {
        originalColor: colorHex,
        x, z, w, d,
        name,
        subnet,
        line,
        labelMesh: null
    };

    if (name) {
        mesh.userData.labelMesh = createZoneLabelMesh(x, z, w, d, name, subnet, colorHex);
    }

    scene.add(mesh);
    zoneMeshes.push(mesh);
}

/**
 * Alustan (vyöhykkeen pohjan ja lapun) väri on aina pysyvä.
 */
function updateZonesVisualState() {
    // Alustan väri on pysyvä ja aina näkyvissä
}

// =====================================================================
// YHTEYSTARKISTUS (BFS + WiFi)
// =====================================================================

/**
 * Tarkistaa kaikkien laitteiden yhteydet reitittimeen BFS:llä ja WiFi-kantamalla.
 */
function checkConnections() {
    // Nollaa tilat (vain Gateway ja Cloud säilyttävät oletusyhteyden verkon lähteenä)
    nodes.forEach(n => {
        if (n.userData.type !== nodeTypes.GATEWAY && n.userData.type !== nodeTypes.CLOUD) {
            n.userData.isConnected = false;
        }
    });

    const gateway = nodes.find(n => n.userData.type === nodeTypes.GATEWAY);
    const router = nodes.find(n => n.userData.type === nodeTypes.ROUTER);
    const firewall = nodes.find(n => n.userData.type === nodeTypes.FIREWALL);
    const cloud = nodes.find(n => n.userData.type === nodeTypes.CLOUD);
    const startNode = gateway || router || firewall || cloud;
    if (!startNode) return;

    startNode.userData.isConnected = true;
    if (gateway) gateway.userData.isConnected = true;
    if (cloud) cloud.userData.isConnected = true;

    // BFS kaapeleita pitkin
    const queue = [startNode];
    const visited = new Set([startNode]);
    const adj = new Map();
    nodes.forEach(n => adj.set(n, []));
    cables.forEach(c => {
        if (adj.has(c.nodeA) && adj.has(c.nodeB)) {
            adj.get(c.nodeA).push(c.nodeB);
            adj.get(c.nodeB).push(c.nodeA);
        }
    });

    while (queue.length > 0) {
        const curr = queue.shift();
        curr.userData.isConnected = true;
        for (const neighbor of (adj.get(curr) || [])) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    // WiFi-yhteydet langattomasti ja DHCP-automaatio
    const activeWifis = nodes.filter(n => n.userData.type === nodeTypes.WIFI && n.userData.isConnected);
    nodes.forEach(node => {
        // Vain end-user laitteet voivat käyttää WiFiä ja DHCP:tä (ei serverit, tulostimet, kytkimet)
        const isWirelessDevice = [nodeTypes.LAPTOP, nodeTypes.PC, nodeTypes.VOIP].includes(node.userData.type);
        if (isWirelessDevice && !node.userData.isConnected) {
            for (const wifi of activeWifis) {
                if (node.mesh.position.distanceTo(wifi.mesh.position) <= wifi.userData.wifiRange) {
                    node.userData.isConnected = true;
                    // DHCP: Jos WiFi on konfiguroitu oikein, anna langattomalle laitteelle automaattisesti IP!
                    if (wifi.userData.correctIp && !node.userData.correctIp) {
                        assignDhcpIp(node, wifi);
                    }
                    break;
                }
            }
        }
    });

    // Päivitetään kaikkien laitteiden visuaalinen tila (väritön vs värikäs)
    nodes.forEach(n => {
        updateNodeVisualState(n);
        updateNodeLabel(n);
    });

    // Päivitetään vyöhykkeiden värit (väritön vs värikäs)
    updateZonesVisualState();

    // Päivitä kaapeleiden värit yhteyksien ja IP:n perusteella
    cables.forEach(c => { 
        const isCloudGateway = (c.nodeA.userData.type === nodeTypes.CLOUD && (c.nodeB.userData.type === nodeTypes.GATEWAY || c.nodeB.userData.type === nodeTypes.ROUTER)) ||
                               ((c.nodeA.userData.type === nodeTypes.GATEWAY || c.nodeA.userData.type === nodeTypes.ROUTER) && c.nodeB.userData.type === nodeTypes.CLOUD);

        if (isCloudGateway) {
            // Internet-yhdyskäytäväkaapeli on aina aktiivinen ja sininen
            c.line.material.color.setHex(0x3b82f6);
            return;
        }

        const isConnectedA = c.nodeA.userData.isConnected;
        const isConnectedB = c.nodeB.userData.isConnected;
        const isNodeAConfigured = isConnectedA && (!IP_REQUIRED_TYPES.includes(c.nodeA.userData.type) || c.nodeA.userData.correctIp); 
        const isNodeBConfigured = isConnectedB && (!IP_REQUIRED_TYPES.includes(c.nodeB.userData.type) || c.nodeB.userData.correctIp); 
        
        if (isConnectedA && isConnectedB && isNodeAConfigured && isNodeBConfigured) { 
            // Vihreä (100% onnistunut: 1. yhdistys onnistunut, 2. maski onnistunut, 3. IP syötetty!)
            c.line.material.color.setHex(0x10b981); 
        } else if (isConnectedA && isConnectedB) { 
            // Kaapeli kytketty, mutta IP & maski odottaa syöttöä – hillitty vaaleanharmaa
            c.line.material.color.setHex(0x64748b); 
        } else { 
            // Kytkemätön tai katkennut yhteys – tummanharmaa
            c.line.material.color.setHex(0x334155); 
        } 
    }); 
    updateGoalUI();
    if (typeof saveLevelProgress === 'function' && !isLoadingLevel) {
        saveLevelProgress();
    }
}

/**
 * Automaattinen DHCP-jakelu WiFi-verkossa.
 */
function assignDhcpIp(clientNode, wifiNode) {
    if (typeof getNodeSubnetScope !== 'function' || typeof ip2long !== 'function' || typeof long2ip !== 'function') return;

    const scope = getNodeSubnetScope(wifiNode);
    if (!scope || !scope.details) return;

    const details = scope.details;
    const firstL = ip2long(details.firstHost);
    const lastL = ip2long(details.lastHost);
    
    for (let i = firstL; i <= lastL; i++) {
        const candidateIp = long2ip(i);
        const isUsed = nodes.some(n => n.userData.correctIp && n.userData.ip === candidateIp);
        
        if (!isUsed) {
            clientNode.userData.ip = candidateIp;
            clientNode.userData.mask = wifiNode.userData.mask;
            clientNode.userData.correctIp = true;
            
            updateNodeVisualState(clientNode);
            if (typeof updateNodeLabel === 'function') {
                updateNodeLabel(clientNode);
            }
            clientNode.userData.animating = true;
            clientNode.userData.animStart = Date.now();
            if (typeof createDataConfetti === 'function') {
                createDataConfetti(clientNode.mesh.position.clone());
            }
            break;
        }
    }
}

