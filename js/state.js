// --- Pelin globaalit vakiot ja tila ---
const TOTAL_LEVELS = 61;
let unlockedLevels = parseInt(localStorage.getItem('subnetArchitect_unlocked')) || 1;
let currentLevel = 1;
let levels = [];
let isLoadingLevel = false;

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

// Laitteet jotka vaativat IP-osoitteen asetuksen
const IP_REQUIRED_TYPES = [
    nodeTypes.OFFICE,
    nodeTypes.PC,
    nodeTypes.LAPTOP,
    nodeTypes.SERVER,
    nodeTypes.PRINTER,
    nodeTypes.VOIP,
    nodeTypes.WIFI,
];

// Laitesäännöt: kaapelirajoitukset, sallitut yhteydet ja IP-alueet
// canConnectTo: null = sallitaan kaikki (vanha käytös), muuten tarkka lista
const DEVICE_RULES = {
    [nodeTypes.GATEWAY]: {
        maxPorts: 16,
        canConnectTo: [nodeTypes.CLOUD, nodeTypes.ROUTER, nodeTypes.SWITCH, nodeTypes.CORE_SWITCH, nodeTypes.FIREWALL, nodeTypes.WIFI],
        label: 'Default Gateway'
    },
    [nodeTypes.ROUTER]: {
        maxPorts: 8,
        canConnectTo: [nodeTypes.GATEWAY, nodeTypes.SWITCH, nodeTypes.CORE_SWITCH, nodeTypes.FIREWALL, nodeTypes.WIFI,
                       nodeTypes.PC, nodeTypes.LAPTOP, nodeTypes.OFFICE, nodeTypes.SERVER, nodeTypes.PRINTER],
        label: 'Reititin'
    },
    [nodeTypes.CORE_SWITCH]: {
        maxPorts: 48,
        canConnectTo: [nodeTypes.SWITCH, nodeTypes.ROUTER, nodeTypes.GATEWAY, nodeTypes.SERVER, nodeTypes.FIREWALL, nodeTypes.CORE_SWITCH],
        label: 'Ydinlinkki'
    },
    [nodeTypes.SWITCH]: {
        maxPorts: 24,
        canConnectTo: [nodeTypes.PC, nodeTypes.LAPTOP, nodeTypes.SERVER, nodeTypes.PRINTER, nodeTypes.VOIP,
                       nodeTypes.OFFICE, nodeTypes.ROUTER, nodeTypes.GATEWAY, nodeTypes.SWITCH, nodeTypes.CORE_SWITCH,
                       nodeTypes.WIFI, nodeTypes.FIREWALL],
        label: 'Kytkin'
    },
    [nodeTypes.WIFI]: {
        maxPorts: 2, // 1 uplink kaapeli + 1 mahdollinen redundanssi
        canConnectTo: [nodeTypes.SWITCH, nodeTypes.CORE_SWITCH, nodeTypes.ROUTER, nodeTypes.GATEWAY],
        label: 'WiFi AP'
    },
    [nodeTypes.FIREWALL]: {
        maxPorts: 6,
        canConnectTo: [nodeTypes.ROUTER, nodeTypes.GATEWAY, nodeTypes.SWITCH, nodeTypes.CORE_SWITCH, nodeTypes.CLOUD],
        label: 'Palomuuri'
    },
    [nodeTypes.PC]: {
        maxPorts: 1,
        canConnectTo: [nodeTypes.SWITCH, nodeTypes.CORE_SWITCH, nodeTypes.ROUTER],
        label: 'PC',
        ipRangeHint: 'käyttäjäalue (.20–.200)'
    },
    [nodeTypes.LAPTOP]: {
        maxPorts: 1,
        canConnectTo: [nodeTypes.SWITCH, nodeTypes.CORE_SWITCH, nodeTypes.ROUTER],
        label: 'Läppäri',
        ipRangeHint: 'käyttäjäalue (.20–.200)'
    },
    [nodeTypes.OFFICE]: {
        maxPorts: 1,
        canConnectTo: [nodeTypes.SWITCH, nodeTypes.CORE_SWITCH, nodeTypes.ROUTER],
        label: 'Toimistokone',
        ipRangeHint: 'käyttäjäalue (.20–.200)'
    },
    [nodeTypes.SERVER]: {
        maxPorts: 2,
        canConnectTo: [nodeTypes.SWITCH, nodeTypes.CORE_SWITCH],
        label: 'Palvelin',
        ipRangeHint: 'palvelinalue (.1–.19)'
    },
    [nodeTypes.PRINTER]: {
        maxPorts: 1,
        canConnectTo: [nodeTypes.SWITCH, nodeTypes.CORE_SWITCH],
        label: 'Tulostin',
        ipRangeHint: 'oheislaite (.200–.250)'
    },
    [nodeTypes.VOIP]: {
        maxPorts: 1,
        canConnectTo: [nodeTypes.SWITCH, nodeTypes.CORE_SWITCH],
        label: 'VoIP-puhelin',
        ipRangeHint: 'voice-alue (.100–.200)'
    },
    [nodeTypes.CLOUD]: {
        maxPorts: 4,
        canConnectTo: [nodeTypes.GATEWAY, nodeTypes.ROUTER, nodeTypes.FIREWALL],
        label: 'Internet'
    },
};

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
