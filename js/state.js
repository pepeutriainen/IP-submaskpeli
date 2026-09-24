// --- Pelin globaalit vakiot ja tila ---
const GAME_BUILD_VERSION = '20260924_v32';
const TOTAL_LEVELS = 61;
let rawSavedUnlocked = typeof localStorage !== 'undefined' ? localStorage.getItem('subnetArchitect_unlocked') : null;
let unlockedLevels = parseInt(rawSavedUnlocked) || 1;
let masterStarLevels = JSON.parse((typeof localStorage !== 'undefined' && localStorage.getItem('subnetArchitect_masterStars')) || '[]');
let cheatSheetUsedInCurrentLevel = false;
let currentLevel = 1;
let levels = [];
let isLoadingLevel = false;

if (typeof console !== 'undefined') {
    console.group(`%c[SUBNET ARCHITECT ENGINE v3.2]%c Build: ${GAME_BUILD_VERSION}`, 'background: #0284c7; color: white; font-weight: bold; padding: 2px 6px; border-radius: 4px;', 'color: #38bdf8; font-weight: bold;');
    console.log(`%c[HOST INFO]%c ${typeof window !== 'undefined' ? window.location.href : 'CLI/Node'}`, 'background: #475569; color: white; padding: 2px 4px;', 'color: #94a3b8;');
    console.log(`%c[STORAGE INIT]%c Raw subnetArchitect_unlocked in localStorage: %c"${rawSavedUnlocked}"%c => Alustettu unlockedLevels: %c${unlockedLevels} / ${TOTAL_LEVELS}`, 'background: #334155; color: white; padding: 2px 4px;', 'color: #cbd5e1;', 'color: #fbbf24; font-weight: bold;', 'color: #cbd5e1;', 'color: #4ade80; font-weight: bold;');
    console.log(`%c[DEBUG TIP]%c Voit ajaa selaimen konsolissa komennot: %cdebugStatus()%c tai %cdebugReset()`, 'background: #065f46; color: white; padding: 2px 4px;', 'color: #34d399;', 'color: #fef08a; font-weight: bold;', 'color: #34d399;', 'color: #fef08a; font-weight: bold;');
    console.groupEnd();
}

if (typeof window !== 'undefined') {
    window.GAME_BUILD_VERSION = GAME_BUILD_VERSION;
    window.debugStatus = function() {
        console.group('%c[DIAGNOSTIIKKARAPORTTI]', 'color: #38bdf8; font-weight: bold; font-size: 13px;');
        console.log('Build-versio:', GAME_BUILD_VERSION);
        console.log('Sivun URL:', window.location.href);
        console.log('Nykyinen pelitaso (currentLevel):', currentLevel);
        console.log('Avattujen tasojen määrä (unlockedLevels):', unlockedLevels);
        console.log('LocalStorage subnetArchitect_unlocked:', localStorage.getItem('subnetArchitect_unlocked'));
        console.log('Admin-modal löydetty DOMista:', !!document.getElementById('admin-modal'));
        console.log('Admin-modal classList:', document.getElementById('admin-modal')?.className);
        console.groupEnd();
        return {
            version: GAME_BUILD_VERSION,
            currentLevel,
            unlockedLevels,
            localStorageRaw: localStorage.getItem('subnetArchitect_unlocked')
        };
    };

    window.debugReset = function() {
        console.warn('%c[DEBUG RESET]%c Kaikki edistyminen nollataan selaimen muistista...', 'background: #dc2626; color: white; padding: 2px 4px;', 'color: #fca5a5;');
        localStorage.clear();
        unlockedLevels = 1;
        if (typeof renderLevelMenu === 'function') renderLevelMenu();
        if (typeof showToast === 'function') showToast("🧹 Kaikki edistyminen nollattu! Vain taso 1 on auki.", "info");
        return "Nollaus suoritettu: unlockedLevels = 1";
    };

    window.debugUnlockAll = function() {
        console.warn('%c[DEBUG UNLOCK]%c Avaa kaikki tasot (kehittäjätila)...', 'background: #059669; color: white; padding: 2px 4px;', 'color: #86efac;');
        unlockedLevels = TOTAL_LEVELS;
        localStorage.setItem('subnetArchitect_unlocked', unlockedLevels);
        if (typeof renderLevelMenu === 'function') renderLevelMenu();
        if (typeof showToast === 'function') showToast("🔓 Debug: Kaikki tasot avattu.", "success");
        return "Kaikki tasot avattu: unlockedLevels = 61";
    };
}

// Verkkojen laitteiden tyypit – kaikki tuetut laiteryhmät
const nodeTypes = {
    GATEWAY:      'gateway',      // Default Gateway – Enterprise Edge Gateway (gateway-edge.glb) yhteydessä Pilveen
    ROUTER:       'router',       // Reititin – 4-antenninen pöytäreititin (router.glb)
    SWITCH:       'switch',       // Kytkin – LAN-yhdistin
    CORE_SWITCH:  'core_switch',  // Ydinlinkki – hierarkkinen core-kytkin
    WIFI:         'wifi',         // WiFi-tukiasema
    OFFICE:       'office',       // Toimistokone (vaatii IP)
    PC:           'pc',           // Pöytäkone (vaatii IP)
    LAPTOP:       'laptop',       // Kannettava (vaatii IP)
    SERVER:       'server',       // Palvelin (vaatii IP)
    PRINTER:      'printer',      // Verkkotulostin (vaatii IP)
    VOIP:         'voip',         // VoIP-puhelin (vaatii IP)
    FIREWALL:     'firewall',     // Palomuuri – suojaa verkon reunan
    CLOUD:        'cloud',        // Pilvi / Internet-yhteyspiste
};
if (typeof window !== 'undefined') { window.nodeTypes = nodeTypes; }
if (typeof globalThis !== 'undefined') { globalThis.nodeTypes = nodeTypes; }

// Laitteet jotka vaativat IP-osoitteen asetuksen (päätelaitteet)
const IP_REQUIRED_TYPES = [
    nodeTypes.OFFICE,
    nodeTypes.PC,
    nodeTypes.LAPTOP,
    nodeTypes.SERVER,
    nodeTypes.PRINTER,
    nodeTypes.VOIP,
];

// Linkkityypit: 10G Kuitu (Trunk) ja 1G Kupari (Access)
const LINK_TYPES = {
    FIBER_10G: 'fiber_10g', // 10G Kuitu – runkoyhteys (MDF <-> IDF, Gateway, Palomuuri, Palvelimet)
    COPPER_1G: 'copper_1g', // 1G Kupari – työasemayhteys (Access switch <-> PC, Läppäri, Tulostin, VoIP)
};
if (typeof window !== 'undefined') { window.LINK_TYPES = LINK_TYPES; }
if (typeof globalThis !== 'undefined') { globalThis.LINK_TYPES = LINK_TYPES; }

/**
 * Päättelee kahden laitteen välisen linkkityypin (10G Kuitu vs 1G Kupari).
 */
function getLinkType(typeA, typeB) {
    const isCoreA = (typeA === nodeTypes.CORE_SWITCH);
    const isCoreB = (typeB === nodeTypes.CORE_SWITCH);
    const isTrunkInfraA = [nodeTypes.GATEWAY, nodeTypes.FIREWALL, nodeTypes.ROUTER].includes(typeA);
    const isTrunkInfraB = [nodeTypes.GATEWAY, nodeTypes.FIREWALL, nodeTypes.ROUTER].includes(typeB);

    // 1. Core Switchin yhteydet ovat aina 10G Kuitua
    if (isCoreA || isCoreB) {
        return LINK_TYPES.FIBER_10G;
    }

    // 2. Runkoverkon infran väliset yhteydet (Gateway <-> Router, Firewall <-> Gateway jne.) ovat 10G Kuitua
    if ((isTrunkInfraA && isTrunkInfraB) || 
        (isTrunkInfraA && typeB === nodeTypes.SWITCH) || 
        (isTrunkInfraB && typeA === nodeTypes.SWITCH)) {
        return LINK_TYPES.FIBER_10G;
    }

    // 3. Työasemat ja huoneen oheislaitteet kytketään 1G Kuparilla
    return LINK_TYPES.COPPER_1G;
}
if (typeof window !== 'undefined') { window.getLinkType = getLinkType; }
if (typeof globalThis !== 'undefined') { globalThis.getLinkType = getLinkType; }

// Laitesäännöt: kaapelirajoitukset, sallitut yhteydet ja IP-alueet
// Aito Cisco Enterprise Core-Access -hierarkia:
// - Ydinlinkki (Core Switch): 48-porttinen 10G runkokytkin (MDF). Yhdistää kerros-/huonekytkimet, palvelimet ja reitittimet. Päätelaitteita EI kytketä suoraan ytimeen!
// - Kytkin (LAN Switch): 24-porttinen huone-/osastokytkin (IDF). Yhdistää paikalliset työasemat. Kytkinten ketjutus keskenään (daisy-chain) on kielletty!
const DEVICE_RULES = {
    [nodeTypes.GATEWAY]: {
        maxPorts: 16,
        canConnectTo: [nodeTypes.CLOUD, nodeTypes.ROUTER, nodeTypes.SWITCH, nodeTypes.CORE_SWITCH, nodeTypes.FIREWALL],
        label: 'Default Gateway'
    },
    [nodeTypes.ROUTER]: {
        maxPorts: 8,
        canConnectTo: [nodeTypes.GATEWAY, nodeTypes.SWITCH, nodeTypes.CORE_SWITCH, nodeTypes.FIREWALL,
                       nodeTypes.PC, nodeTypes.LAPTOP, nodeTypes.OFFICE, nodeTypes.SERVER, nodeTypes.PRINTER, nodeTypes.WIFI],
        label: 'Reititin'
    },
    [nodeTypes.CORE_SWITCH]: {
        maxPorts: 48,
        canConnectTo: [nodeTypes.SWITCH, nodeTypes.ROUTER, nodeTypes.GATEWAY, nodeTypes.SERVER, nodeTypes.FIREWALL, nodeTypes.CORE_SWITCH],
        label: 'Ydinlinkki (Core Switch)'
    },
    [nodeTypes.SWITCH]: {
        maxPorts: 24,
        canConnectTo: [nodeTypes.CORE_SWITCH, nodeTypes.SWITCH, nodeTypes.ROUTER, nodeTypes.GATEWAY, nodeTypes.FIREWALL,
                       nodeTypes.PC, nodeTypes.LAPTOP, nodeTypes.SERVER, nodeTypes.PRINTER, nodeTypes.VOIP,
                       nodeTypes.OFFICE, nodeTypes.WIFI],
        label: 'LAN-kytkin'
    },
    [nodeTypes.WIFI]: {
        maxPorts: 2, // 1 uplink kaapeli + 1 mahdollinen redundanssi
        canConnectTo: [nodeTypes.SWITCH, nodeTypes.ROUTER, nodeTypes.GATEWAY],
        label: 'WiFi AP'
    },
    [nodeTypes.FIREWALL]: {
        maxPorts: 8,
        canConnectTo: [nodeTypes.ROUTER, nodeTypes.GATEWAY, nodeTypes.SWITCH, nodeTypes.CORE_SWITCH, nodeTypes.CLOUD],
        label: 'Palomuuri'
    },
    [nodeTypes.PC]: {
        maxPorts: 1,
        canConnectTo: [nodeTypes.SWITCH, nodeTypes.ROUTER],
        label: 'PC',
        ipRangeHint: 'käyttäjäalue (.20–.200)'
    },
    [nodeTypes.LAPTOP]: {
        maxPorts: 1,
        canConnectTo: [nodeTypes.SWITCH, nodeTypes.ROUTER],
        label: 'Läppäri',
        ipRangeHint: 'käyttäjäalue (.20–.200)'
    },
    [nodeTypes.OFFICE]: {
        maxPorts: 1,
        canConnectTo: [nodeTypes.SWITCH, nodeTypes.ROUTER],
        label: 'Toimistokone',
        ipRangeHint: 'käyttäjäalue (.20–.200)'
    },
    [nodeTypes.SERVER]: {
        maxPorts: 4,
        canConnectTo: [nodeTypes.SWITCH, nodeTypes.CORE_SWITCH, nodeTypes.ROUTER],
        label: 'Palvelin',
        ipRangeHint: 'palvelinalue (.1–.19)'
    },
    [nodeTypes.PRINTER]: {
        maxPorts: 1,
        canConnectTo: [nodeTypes.SWITCH, nodeTypes.ROUTER],
        label: 'Tulostin',
        ipRangeHint: 'oheislaite (.200–.250)'
    },
    [nodeTypes.VOIP]: {
        maxPorts: 1,
        canConnectTo: [nodeTypes.SWITCH, nodeTypes.ROUTER],
        label: 'VoIP-puhelin',
        ipRangeHint: 'voice-alue (.100–.200)'
    },
    [nodeTypes.CLOUD]: {
        maxPorts: 4,
        canConnectTo: [nodeTypes.GATEWAY, nodeTypes.ROUTER, nodeTypes.FIREWALL],
        label: 'Internet'
    },
};
if (typeof window !== 'undefined') { window.DEVICE_RULES = DEVICE_RULES; window.IP_REQUIRED_TYPES = IP_REQUIRED_TYPES; }
if (typeof globalThis !== 'undefined') { globalThis.DEVICE_RULES = DEVICE_RULES; globalThis.IP_REQUIRED_TYPES = IP_REQUIRED_TYPES; }

// Three.js globaalit viitteet
let scene, camera, renderer, raycaster, mouse;
let nodes = [];       // Kaikki laitteet
let cables = [];      // Kaapelit (lines)
let particles = [];   // Visuaaliset partikkelit
let zoneMeshes = [];  // Lattian VLAN-alueet
let labelMeshes = []; // Tekstilaput (zone-nimet ja node-IP:t)

// Työkalujen ja vuorovaikutuksen tila
let currentTool = 'select';
let cableActionState = { active: false, startNode: null, lineTemp: null };
let selectedNodeForIp = null;
let currentLevelConfig = null;

// Kameran ja ohjauksen tila
let cameraTarget = null; // Alustetaan initThreeJS:ssä THREE.Vector3:na
let cameraZoom = 1;
let isPanning = false;
let panStart = { x: 0, y: 0 };
const keys = { w: false, a: false, s: false, d: false, up: false, down: false, left: false, right: false };

/**
 * Vapauttaa Three.js -materiaalin ja sen kaikki tekstuurit GPU-muistista.
 */
function disposeMaterial(mat) {
    if (!mat) return;
    const textures = ['map', 'lightMap', 'bumpMap', 'normalMap', 'specularMap', 'envMap', 'alphaMap', 'emissiveMap'];
    textures.forEach(key => {
        if (mat[key] && typeof mat[key].dispose === 'function') {
            mat[key].dispose();
            mat[key] = null;
        }
    });
    if (typeof mat.dispose === 'function') {
        mat.dispose();
    }
}

/**
 * Rekursiivinen Three.js -hierarkian ja WebGL-puskureiden vapauttaja.
 * Estää GPU- ja VRAM-muistivuodot tasonvaihdoissa ja esikatseluissa.
 */
function disposeHierarchy(obj) {
    if (!obj) return;
    obj.traverse(child => {
        if (child.geometry && typeof child.geometry.dispose === 'function') {
            child.geometry.dispose();
            child.geometry = null;
        }
        if (child.material) {
            if (Array.isArray(child.material)) {
                child.material.forEach(m => disposeMaterial(m));
            } else {
                disposeMaterial(child.material);
            }
            child.material = null;
        }
    });
}
if (typeof window !== 'undefined') {
    window.disposeHierarchy = disposeHierarchy;
    window.disposeMaterial = disposeMaterial;
}

// Aktiiviset 3D-datapaketit ja valopulssit
let activePackets = [];
let lastBackgroundPacketTime = 0;

