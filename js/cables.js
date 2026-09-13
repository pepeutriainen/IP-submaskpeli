// --- Kaapelointi ja fyysiset yhteydet ---

/**
 * Tarkistaa voiko kahden solmun välille vetää kaapelin DEVICE_RULES:n mukaan.
 * Palauttaa null jos OK, tai selkeän CCNA-tason virheviestin merkkijonona.
 */
function getCableError(nodeA, nodeB) {
    const typeA = nodeA.userData.type;
    const typeB = nodeB.userData.type;
    const rulesA = DEVICE_RULES[typeA];
    const rulesB = DEVICE_RULES[typeB];

    const isCoreA = (typeA === nodeTypes.CORE_SWITCH);
    const isCoreB = (typeB === nodeTypes.CORE_SWITCH);
    const isEndpointA = [nodeTypes.PC, nodeTypes.LAPTOP, nodeTypes.OFFICE, nodeTypes.PRINTER, nodeTypes.VOIP, nodeTypes.WIFI].includes(typeA);
    const isEndpointB = [nodeTypes.PC, nodeTypes.LAPTOP, nodeTypes.OFFICE, nodeTypes.PRINTER, nodeTypes.VOIP, nodeTypes.WIFI].includes(typeB);

    // 1. Hierarkiasääntö: Työasemia ei saa kytkeä suoraan Ydinlinkkiin (Core Switch)!
    if ((isCoreA && isEndpointB) || (isCoreB && isEndpointA)) {
        return "Hierarkiasääntö: Päätelaitteita ei saa kytkeä suoraan Ydinlinkkiin (Core Switch)! Kytke päätelaite osaston LAN-kytkimeen ja LAN-kytkin Ydinlinkkiin.";
    }

    // 2. Kytkinten daisy-chaining kielto (SWITCH <-> SWITCH)
    // Sallitaan pienverkoissa (jos verkossa ei ole Core Switchiä). Jos verkossa on Core Switch, vaaditaan tähtitopologiaa.
    if (typeA === nodeTypes.SWITCH && typeB === nodeTypes.SWITCH) {
        const hasCoreSwitch = nodes.some(n => n.userData.type === nodeTypes.CORE_SWITCH);
        if (hasCoreSwitch) {
            return "Hierarkiasääntö: Yritysverkossa kytkinten ketjutus on kielletty! Kytke LAN-kytkimet suoraan Ydinlinkkiin (Core Switch) tähtitopologian mukaisesti.";
        }
    }

    // 3. Tarkista kumpikin suunta DEVICE_RULES:n mukaan
    if (rulesA && rulesA.canConnectTo && !rulesA.canConnectTo.includes(typeB)) {
        const labelA = rulesA.label || typeA;
        const labelB = (rulesB && rulesB.label) || typeB;
        return `${labelA} ei saa kytkeä suoraan kohteeseen ${labelB}!`;
    }
    if (rulesB && rulesB.canConnectTo && !rulesB.canConnectTo.includes(typeA)) {
        const labelA = (rulesA && rulesA.label) || typeA;
        const labelB = (rulesB && rulesB.label) || typeB;
        return `${labelB} ei saa kytkeä suoraan kohteeseen ${labelA}!`;
    }

    // 4. Tarkista porttiraja molemmille
    const portsA = cables.filter(c => c.nodeA === nodeA || c.nodeB === nodeA).length;
    const portsB = cables.filter(c => c.nodeA === nodeB || c.nodeB === nodeB).length;
    if (rulesA && rulesA.maxPorts && portsA >= rulesA.maxPorts) {
        return `${rulesA.label || typeA}:n kaikki ${rulesA.maxPorts} porttia ovat täynnä!`;
    }
    if (rulesB && rulesB.maxPorts && portsB >= rulesB.maxPorts) {
        return `${rulesB.label || typeB}:n kaikki ${rulesB.maxPorts} porttia ovat täynnä!`;
    }

    return null; // OK
}

/**
 * Apufunktio kaapeligrafiikan luomiseen (siisti Three.js -vektorikaapeli).
 */
function createCableVisual(nodeA, nodeB, linkType, colorHex) {
    const posA = nodeA.mesh.position.clone();
    const posB = nodeB.mesh.position.clone();
    posA.y = 0.2;
    posB.y = 0.2;

    const defaultColor = (linkType === LINK_TYPES.FIBER_10G) ? 0xf59e0b : 0x94a3b8;
    const finalColor = (colorHex !== undefined && colorHex !== null) ? colorHex : defaultColor;

    const lineMat = new THREE.LineBasicMaterial({ 
        color: finalColor, 
        linewidth: 2 
    });
    const lineGeo = new THREE.BufferGeometry().setFromPoints([posA, posB]);
    const line = new THREE.Line(lineGeo, lineMat);
    scene.add(line);

    return { line };
}

function handleCableTool(node) {
    if (!cableActionState.active) {
        // Aloitetaan kaapelin veto
        cableActionState.active = true;
        cableActionState.startNode = node;
        
        const material = new THREE.LineBasicMaterial({ 
            color: 0xe2e8f0, 
            linewidth: 2, 
            dashed: true, 
            dashSize: 0.5, 
            gapSize: 0.5 
        });
        const geometry = new THREE.BufferGeometry().setFromPoints([
            node.mesh.position.clone(), 
            node.mesh.position.clone()
        ]);
        const line = new THREE.Line(geometry, material);
        line.computeLineDistances();
        scene.add(line);
        cableActionState.lineTemp = line;
    } else {
        // Päätetään kaapelin veto
        if (cableActionState.startNode !== node) {
            const startNode = cableActionState.startNode;
            const dist = startNode.mesh.position.distanceTo(node.mesh.position);
            const linkType = getLinkType(startNode.userData.type, node.userData.type);

            // Pituusrajoitukset linkkityypin mukaan
            // 10G Kuitu: kampusmittainen runkoyhteys (max 80 yksikköä)
            // 1G Kupari: huonekohtainen patch-yhteys (max 30 yksikköä ~ 100m)
            const maxAllowedDist = (linkType === LINK_TYPES.FIBER_10G) ? 80 : 30;

            if (dist > maxAllowedDist) {
                if (linkType === LINK_TYPES.FIBER_10G) {
                    showToast(`10G-kuitukaapelin kantama ylittyi (> 80 yksikköä)!`, "error");
                } else {
                    showToast(`1G-kuparikaapelin maksimipituus ylittyi (> 100m / 30 yksikköä)! Tuo LAN-kytkin lähemmäs tai käytä Ydinlinkin 10G-kuitua.`, "error");
                }
                scene.remove(cableActionState.lineTemp);
            } else {
                // Laitekohtainen validointi (DEVICE_RULES & Hierarkia)
                const err = getCableError(startNode, node);
                if (err) {
                    showToast(err, "error");
                    scene.remove(cableActionState.lineTemp);
                    cableActionState = { active: false, startNode: null, lineTemp: null };
                    return;
                }

                // Varmista ettei kaapelia ole jo olemassa
                const exists = cables.find(c => 
                    (c.nodeA === startNode && c.nodeB === node) || 
                    (c.nodeB === startNode && c.nodeA === node)
                );

                if (!exists) {
                    const visual = createCableVisual(startNode, node, linkType, 0xffffff);
                    cables.push({ 
                        nodeA: startNode, 
                        nodeB: node, 
                        line: visual.line, 
                        linkType: linkType 
                    });
                    createSparks(node.mesh.position.clone());
                }
            }
        } else {
            scene.remove(cableActionState.lineTemp);
        }

        if (cableActionState.lineTemp) {
            scene.remove(cableActionState.lineTemp);
        }
        cableActionState = { active: false, startNode: null, lineTemp: null };
        checkConnections();
    }
}

/**
 * Yhdistää kaksi laitetta suoraan kaapelilla ohjelmallisesti.
 * @param {Object} nodeA 
 * @param {Object} nodeB 
 * @param {number} colorHex Kaapelin väri
 */
function connectNodes(nodeA, nodeB, colorHex = null) {
    if (!nodeA || !nodeB || nodeA === nodeB) return;
    const exists = cables.find(c => 
        (c.nodeA === nodeA && c.nodeB === nodeB) || 
        (c.nodeB === nodeA && c.nodeA === nodeB)
    );
    if (!exists) {
        const linkType = getLinkType(nodeA.userData.type, nodeB.userData.type);
        const visual = createCableVisual(nodeA, nodeB, linkType, colorHex);
        cables.push({ 
            nodeA, 
            nodeB, 
            line: visual.line, 
            linkType: linkType 
        });
        checkConnections();
    }
}

/**
 * Poistaa kaapelin ja sen visuaaliset elementit.
 */
function deleteCable(cable) {
    if (cable.line) {
        scene.remove(cable.line);
        if (typeof disposeHierarchy === 'function') {
            disposeHierarchy(cable.line);
        }
    }
    cables = cables.filter(c => c !== cable);
    checkConnections();
}

