// --- Kaapelointi ja fyysiset yhteydet ---

/**
 * Tarkistaa voiko kahden solmun välille vetää kaapelin DEVICE_RULES:n mukaan.
 * Palauttaa null jos OK, tai virheviestin merkkijonona.
 */
function getCableError(nodeA, nodeB) {
    const typeA = nodeA.userData.type;
    const typeB = nodeB.userData.type;
    const rulesA = DEVICE_RULES[typeA];
    const rulesB = DEVICE_RULES[typeB];

    // Tarkista kumpikin suunta
    if (rulesA && rulesA.canConnectTo && !rulesA.canConnectTo.includes(typeB)) {
        const labelA = rulesA.label || typeA;
        const labelB = (rulesB && rulesB.label) || typeB;
        return `${labelA} ei saa kytkeä suoraan kohteeseen ${labelB}! Käytä kytkintä välissä.`;
    }
    if (rulesB && rulesB.canConnectTo && !rulesB.canConnectTo.includes(typeA)) {
        const labelA = (rulesA && rulesA.label) || typeA;
        const labelB = (rulesB && rulesB.label) || typeB;
        return `${labelB} ei saa kytkeä suoraan kohteeseen ${labelA}! Käytä kytkintä välissä.`;
    }

    // Tarkista porttiraja molemmille
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
            const dist = cableActionState.startNode.mesh.position.distanceTo(node.mesh.position);
            // Pituusrajoitus
            if (dist > 15) {
                showToast("Kaapeli on liian pitkä! (Yli 100m). Käytä kytkintä välissä.", "error");
                scene.remove(cableActionState.lineTemp);
            } else {
                // Laitekohtainen validointi (DEVICE_RULES)
                const err = getCableError(cableActionState.startNode, node);
                if (err) {
                    showToast(err, "error");
                    scene.remove(cableActionState.lineTemp);
                    cableActionState = { active: false, startNode: null, lineTemp: null };
                    return;
                }

                // Varmista ettei kaapelia ole jo olemassa
                const exists = cables.find(c => 
                    (c.nodeA === cableActionState.startNode && c.nodeB === node) || 
                    (c.nodeB === cableActionState.startNode && c.nodeA === node)
                );

                if (!exists) {
                    const material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 3 });
                    const geometry = new THREE.BufferGeometry().setFromPoints([
                        cableActionState.startNode.mesh.position.clone(), 
                        node.mesh.position.clone()
                    ]);
                    const line = new THREE.Line(geometry, material);
                    scene.add(line);
                    cables.push({ nodeA: cableActionState.startNode, nodeB: node, line: line });
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
 * @param {number} colorHex Kaapelin väri (oletus harmaa)
 */
function connectNodes(nodeA, nodeB, colorHex = 0xffffff) {
    if (!nodeA || !nodeB || nodeA === nodeB) return;
    const exists = cables.find(c => 
        (c.nodeA === nodeA && c.nodeB === nodeB) || 
        (c.nodeB === nodeA && c.nodeA === nodeB)
    );
    if (!exists) {
        const material = new THREE.LineBasicMaterial({ color: colorHex, linewidth: 3 });
        const geometry = new THREE.BufferGeometry().setFromPoints([
            nodeA.mesh.position.clone(), 
            nodeB.mesh.position.clone()
        ]);
        const line = new THREE.Line(geometry, material);
        scene.add(line);
        cables.push({ nodeA, nodeB, line });
        checkConnections();
    }
}

/**
 * Poistaa kaapelin.
 */
function deleteCable(cable) {
    scene.remove(cable.line);
    cables = cables.filter(c => c !== cable);
    checkConnections();
}

