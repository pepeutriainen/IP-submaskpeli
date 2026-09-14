// --- Cyber Terminal (CLI Mode) ---
// Cisco IOS / Linux -tyylinen interaktiivinen verkkopääte suoralla 3D-visualisoinnilla.
// Tukee kaikkia 61 tasoa: laitteiden valinta, suora IP-konfigurointi, Cisco show-komennot ja diagnostiikka.

class CyberTerminal {
    constructor() {
        this.history = [];
        this.historyIndex = -1;
        this.isOpen = false;
        this.targetNode = null; // Aktiivisesti valittu laite CLI-istunnossa
    }

    init() {
        const inputEl = document.getElementById('terminal-input');
        if (inputEl && !inputEl.dataset.listening) {
            inputEl.dataset.listening = 'true';
            inputEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const cmd = inputEl.value.trim();
                    if (cmd) {
                        this.history.push(cmd);
                        this.historyIndex = this.history.length;
                        this.execute(cmd);
                        inputEl.value = '';
                    }
                } else if (e.key === 'ArrowUp') {
                    if (this.historyIndex > 0) {
                        this.historyIndex--;
                        inputEl.value = this.history[this.historyIndex] || '';
                    }
                    e.preventDefault();
                } else if (e.key === 'ArrowDown') {
                    if (this.historyIndex < this.history.length - 1) {
                        this.historyIndex++;
                        inputEl.value = this.history[this.historyIndex] || '';
                    } else {
                        this.historyIndex = this.history.length;
                        inputEl.value = '';
                    }
                    e.preventDefault();
                } else if (e.key === 'Tab') {
                    e.preventDefault();
                    this.autoComplete(inputEl);
                } else if (e.key === 'Escape') {
                    this.toggle();
                }
            });
        }

        // Globaali pikanäppäin terminaalille (~ tai § tai Ctrl+`)
        window.addEventListener('keydown', (e) => {
            if (e.key === '~' || e.key === '§' || (e.ctrlKey && e.key === '`')) {
                if (e.target && (e.target.classList.contains('ip-octet') || e.target.classList.contains('mask-octet') || e.target.classList.contains('net-octet') || e.target.classList.contains('bcast-octet'))) {
                    return;
                }
                e.preventDefault();
                this.toggle();
            }
        });

        // Synkronoi aloituslaite tarvittaessa
        this.syncPrompt();
    }

    autoComplete(inputEl) {
        const current = inputEl.value.trim().toLowerCase();
        if (!current) return;

        const commands = [
            'help', 'clear', 'cls', 'ping', 'traceroute', 'tracert',
            'ipconfig', 'ifconfig', 'arp', 'subnetcalc', 'status',
            'devices', 'nodes', 'connect', 'session', 'select', 'exit',
            'ip address', 'show ip interface brief', 'show ip route',
            'show cdp neighbors', 'show lldp neighbors', 'reload',
            'hostname', 'whoami'
        ];

        const match = commands.find(c => c.startsWith(current));
        if (match) {
            inputEl.value = match + ' ';
        }
    }

    setTargetNode(node) {
        this.targetNode = node;
        if (typeof selectedNodeForIp !== 'undefined') {
            selectedNodeForIp = node;
        }
        this.syncPrompt();
    }

    getNodeDisplayName(node, indexHint) {
        if (!node || !node.userData) return "unknown";
        const type = node.userData.type || "node";
        const idx = (typeof nodes !== 'undefined' && Array.isArray(nodes)) 
            ? (nodes.indexOf(node) + 1) 
            : (indexHint || 1);
        
        // Luodaan käyttäjäystävällinen CLI-nimi (esim. PC-1, Switch-2, Core-Switch-1, Server-1)
        const cleanType = type.replace(/_/g, '-').toUpperCase();
        return `${cleanType}-${idx}`;
    }

    getPromptText() {
        if (this.targetNode) {
            const isInfra = [nodeTypes.SWITCH, nodeTypes.CORE_SWITCH, nodeTypes.ROUTER, nodeTypes.FIREWALL, nodeTypes.GATEWAY].includes(this.targetNode.userData.type);
            const promptSymbol = isInfra ? '#' : '>';
            return `${this.getNodeDisplayName(this.targetNode)}${promptSymbol}`;
        }
        return "architect@submask:~$";
    }

    syncPrompt() {
        const promptEl = document.getElementById('terminal-prompt-label');
        if (promptEl) {
            promptEl.innerText = this.getPromptText();
        }
        const badgeEl = document.getElementById('terminal-header-title');
        if (badgeEl) {
            const lvlName = currentLevelConfig ? `Taso ${currentLevelConfig.id}: ${currentLevelConfig.name}` : "CLI Mode";
            const devName = this.targetNode ? ` // ${this.getNodeDisplayName(this.targetNode)}` : "";
            badgeEl.innerText = `TERMINAL // ${lvlName}${devName}`;
        }
    }

    toggle() {
        const modal = document.getElementById('terminal-modal');
        if (!modal) return;
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            modal.classList.remove('hidden');
            if (!this.targetNode && typeof selectedNodeForIp !== 'undefined' && selectedNodeForIp) {
                this.targetNode = selectedNodeForIp;
            }
            this.syncPrompt();
            const inputEl = document.getElementById('terminal-input');
            if (inputEl) {
                setTimeout(() => inputEl.focus(), 50);
            }
            if (typeof audio !== 'undefined') audio.playUiClick();
        } else {
            modal.classList.add('hidden');
            if (typeof audio !== 'undefined') audio.playUiClick();
        }
    }

    print(text, type = 'normal') {
        const bodyEl = document.getElementById('terminal-body');
        if (!bodyEl) return;

        const line = document.createElement('div');
        line.className = 'terminal-line leading-relaxed';

        if (type === 'command') {
            const prompt = this.getPromptText();
            line.innerHTML = `<span class="text-emerald-400 font-bold">${prompt}</span> <span class="text-white font-bold">${text}</span>`;
        } else if (type === 'error') {
            line.innerHTML = `<span class="text-rose-400 font-semibold">${text}</span>`;
        } else if (type === 'success') {
            line.innerHTML = `<span class="text-emerald-300 font-semibold">${text}</span>`;
        } else if (type === 'accent') {
            line.innerHTML = `<span class="text-cyan-300">${text}</span>`;
        } else if (type === 'dim') {
            line.innerHTML = `<span class="text-slate-500">${text}</span>`;
        } else {
            line.innerHTML = `<span class="text-slate-300">${text}</span>`;
        }

        bodyEl.appendChild(line);
        bodyEl.scrollTop = bodyEl.scrollHeight;
    }

    clear() {
        const bodyEl = document.getElementById('terminal-body');
        if (bodyEl) {
            bodyEl.innerHTML = '';
            this.print("Subnet Architect OS v3.2 [CLI Mode]", 'accent');
            this.print("Kirjoita 'help' nähdäksesi tuetut Cisco IOS / Linux -verkkokomennot.", 'dim');
        }
    }

    execute(cmdLine) {
        this.print(cmdLine, 'command');
        const trimmed = cmdLine.trim();
        if (!trimmed) return;

        const parts = trimmed.split(/\s+/);
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (typeof audio !== 'undefined') audio.playUiClick();

        // 1. Cisco monisanaiset komennot: 'show ...' ja 'ip address ...'
        if (cmd === 'show') {
            this.cmdShow(args);
            return;
        }

        if (cmd === 'ip' && args[0] && args[0].toLowerCase() === 'address') {
            this.cmdIpAddress(args.slice(1));
            return;
        }

        // 2. Yleiset komennot
        switch (cmd) {
            case 'help':
            case '?':
                this.cmdHelp();
                break;
            case 'clear':
            case 'cls':
                this.clear();
                break;
            case 'devices':
            case 'nodes':
            case 'list':
                this.cmdDevices();
                break;
            case 'connect':
            case 'session':
            case 'select':
                this.cmdConnect(args);
                break;
            case 'exit':
            case 'quit':
                this.cmdExit();
                break;
            case 'ping':
                this.cmdPing(args);
                break;
            case 'traceroute':
            case 'tracert':
                this.cmdTraceroute(args);
                break;
            case 'ipconfig':
                this.cmdIpConfig(args);
                break;
            case 'ifconfig':
                this.cmdIfconfig(args);
                break;
            case 'arp':
                this.cmdArp(args);
                break;
            case 'subnetcalc':
            case 'calc':
                this.cmdSubnetCalc(args);
                break;
            case 'status':
                this.cmdStatus();
                break;
            case 'reload':
            case 'reboot':
                this.cmdReload();
                break;
            case 'hostname':
                this.cmdHostname(args);
                break;
            case 'whoami':
                this.print(`architect (Network Administrator) - Node: ${this.targetNode ? this.getNodeDisplayName(this.targetNode) : 'Console Root'}`, 'accent');
                break;
            default:
                this.print(`Komentoa '${cmd}' ei tunnistettu. Kirjoita 'help' nähdäksesi kaikki komennot.`, 'error');
                if (typeof audio !== 'undefined') audio.playError();
                break;
        }
    }

    cmdHelp() {
        this.print("--- TUETUT CISCO IOS & LINUX -KOMENNOT (TASOT 1-61) ---", 'accent');
        this.print("  LAITEHALLINTA & ISTUNNOT:", 'dim');
        this.print("    devices / nodes            - Listaa tason kaikki laitteet, ID:t ja CLI-nimet.");
        this.print("    connect <nimi | numero>    - Avaa CLI-yhteys tiettyyn laitteeseen (esim. connect PC-1 tai connect 2).");
        this.print("    exit                       - Sulje laiteistunto ja palaa pääkonsoliin.");
        this.print("    hostname                   - Tulostaa aktiivisen laitteen isäntänimen.");
        this.print("\n  IP-KONFIGUROINTI (CLI-TILA):", 'dim');
        this.print("    ip address <ip> <mask>     - Cisco IOS: Aseta valitulle laitteelle IP ja aliverkon peite.");
        this.print("    ifconfig eth0 <ip> netmask <mask> - Linux: Aseta laitteen verkkosovittimen osoite.");
        this.print("\n  CISCO SHOW -DIAGNOSTIIKKA:", 'dim');
        this.print("    show ip interface brief    - Tulostaa kaikkien liittymien IP-osoitteet ja tilat (Up/Down).");
        this.print("    show ip route              - Näyttää aktiiviset reitit ja oletusyhdyskäytävän.");
        this.print("    show cdp neighbors         - Näyttää kytketyt Cisco/verkkonaapurit ja kaapelityypit.");
        this.print("\n  VERKKO- & DIAGNOSTIIKKATYÖKALUT:", 'dim');
        this.print("    ping <ip | laite>          - Lähettää 4 kpl ICMP Echo -paketteja 3D-pulssina kohteeseen.");
        this.print("    traceroute <ip | internet> - Jäljittää reitin hyppy kerrallaan 3D-animaatiolla.");
        this.print("    arp -a                     - Tulostaa laitteiden ja kytkimen ARP-välimuistin.");
        this.print("    subnetcalc <ip>/<cidr>     - Aliverkkolaskuri (verkko-ID, broadcast, isännät, lohkokoko).");
        this.print("    status                     - Tarkistaa nykyisen tason verkkotopologian kokonaistilan.");
        this.print("    reload                     - Käynnistää aktiivisen tason uudelleen.");
        this.print("    clear                      - Tyhjentää terminaalinäytön.");
    }

    cmdDevices() {
        if (!nodes || nodes.length === 0) {
            this.print("Ei aktiivisia laitteita maailmassa.", 'dim');
            return;
        }

        this.print(`--- TASON LAITTEET (${nodes.length} kpl) ---`, 'accent');
        this.print("  CLI-NIMI       TYYPPI         IP-OSOITE         PEITE             STATUS", 'dim');

        nodes.forEach((n, idx) => {
            const cliName = this.getNodeDisplayName(n, idx + 1).padEnd(14, ' ');
            const typeStr = (n.userData.type || '').toUpperCase().padEnd(14, ' ');
            const ipStr = (n.userData.ip || 'MÄÄRITTÄMÄTÖN').padEnd(17, ' ');
            const maskStr = (n.userData.mask || 'MÄÄRITTÄMÄTÖN').padEnd(17, ' ');
            const status = n.userData.isConnected ? "🟢 Up" : "🔴 Down";
            const isSelected = (n === this.targetNode) ? " [AKTIIVINEN]" : "";

            const line = `  ${cliName} ${typeStr} ${ipStr} ${maskStr} ${status}${isSelected}`;
            if (n === this.targetNode) {
                this.print(line, 'success');
            } else {
                this.print(line, 'normal');
            }
        });

        this.print("\nVinkki: Valitse laite komennolla 'connect <laite>' (esim. connect PC-1 tai connect 1).", 'dim');
    }

    cmdConnect(args) {
        if (args.length === 0) {
            this.print("Käyttö: connect <laitteen-nimi tai numero> (esim. connect PC-1 tai connect 2)", 'error');
            return;
        }

        const query = args[0].trim().toLowerCase();
        let foundNode = null;

        // 1. Numeron mukaan (1-perustainen indeksi)
        const numIdx = parseInt(query, 10);
        if (!isNaN(numIdx) && numIdx >= 1 && numIdx <= nodes.length) {
            foundNode = nodes[numIdx - 1];
        }

        // 2. CLI-nimen tai tyypin mukaan
        if (!foundNode) {
            foundNode = nodes.find((n, i) => {
                const cliName = this.getNodeDisplayName(n, i + 1).toLowerCase();
                const typeName = (n.userData.type || '').toLowerCase();
                return cliName === query || cliName.replace('-', '') === query.replace('-', '') || typeName === query;
            });
        }

        // 3. IP-osoitteen mukaan
        if (!foundNode) {
            foundNode = nodes.find(n => n.userData.ip && n.userData.ip.toLowerCase() === query);
        }

        if (!foundNode) {
            this.print(`Laitetta '${args[0]}' ei löydy. Kirjoita 'devices' nähdäksesi saatavilla olevat laitteet.`, 'error');
            if (typeof audio !== 'undefined') audio.playError();
            return;
        }

        this.setTargetNode(foundNode);

        // Siirretään 3D-kamera kohdelaitteelle
        if (foundNode.mesh && typeof cameraTarget !== 'undefined' && cameraTarget) {
            cameraTarget.x = foundNode.mesh.position.x;
            cameraTarget.z = foundNode.mesh.position.z;
        }
        if (foundNode.userData) {
            foundNode.userData.animating = true;
            foundNode.userData.animStart = Date.now();
        }

        const devName = this.getNodeDisplayName(foundNode);
        this.print(`Yhdistetty laitteeseen ${devName} [${foundNode.userData.type.toUpperCase()}]. Konsoli avattu.`, 'success');
        if (IP_REQUIRED_TYPES.includes(foundNode.userData.type)) {
            this.print(`Konfiguroi IP komennolla: ip address <ip> <mask> tai ifconfig eth0 <ip> netmask <mask>`, 'accent');
        } else {
            this.print(`Tämä laite toimii infrastruktuurisolmuna (ei vaadi päätelaite-IP:tä).`, 'dim');
        }
    }

    cmdExit() {
        if (!this.targetNode) {
            this.toggle(); // Sulkee terminaali-ikkunan
            return;
        }

        const prev = this.getNodeDisplayName(this.targetNode);
        this.setTargetNode(null);
        this.print(`Suljettiin CLI-yhteys laitteeseen ${prev}. Palattiin pääkonsoliin.`, 'dim');
    }

    cmdHostname(args) {
        if (!this.targetNode) {
            this.print("Console Root: subnet-core-gw", 'normal');
            return;
        }
        if (args.length > 0) {
            const newName = args[0].trim();
            this.targetNode.userData.name = newName;
            this.syncPrompt();
            this.print(`Isäntänimi asetettu: ${newName}`, 'success');
        } else {
            this.print(`Hostname: ${this.getNodeDisplayName(this.targetNode)}`, 'normal');
        }
    }

    cmdIpAddress(args) {
        if (!this.targetNode) {
            this.print("Virhe: Ei valittua laitetta! Valitse ensin laite komennolla 'connect <laite>'.", 'error');
            return;
        }

        if (args.length < 2) {
            this.print("Käyttö: ip address <ip-osoite> <aliverkon_peite> (esim. ip address 192.168.1.10 255.255.255.0)", 'error');
            return;
        }

        const ip = args[0].trim();
        const mask = args[1].trim();

        this.applyIpConfiguration(this.targetNode, ip, mask);
    }

    cmdIfconfig(args) {
        if (args.length === 0) {
            this.cmdIpConfig([]);
            return;
        }

        // ifconfig eth0 192.168.1.10 netmask 255.255.255.0
        if (args.length >= 4 && args[1].toLowerCase() === 'netmask') {
            const ip = args[0].trim();
            const mask = args[2].trim();
            if (!this.targetNode) {
                this.print("Virhe: Ei valittua laitetta! Valitse ensin laite komennolla 'connect <laite>'.", 'error');
                return;
            }
            this.applyIpConfiguration(this.targetNode, ip, mask);
            return;
        }

        if (args.length >= 4 && args[2].toLowerCase() === 'netmask') {
            // eth0 ip netmask mask
            const ip = args[1].trim();
            const mask = args[3].trim();
            if (!this.targetNode) {
                this.print("Virhe: Ei valittua laitetta! Valitse ensin laite komennolla 'connect <laite>'.", 'error');
                return;
            }
            this.applyIpConfiguration(this.targetNode, ip, mask);
            return;
        }

        // Muussa tapauksessa listataan annetun laitteen tila
        this.cmdIpConfig(args);
    }

    applyIpConfiguration(targetNode, ip, mask) {
        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (!ipRegex.test(ip) || !ipRegex.test(mask)) {
            this.print("Virhe: Virheellinen IP-osoitteen tai peitteen muoto!", 'error');
            if (typeof audio !== 'undefined') audio.playError();
            return;
        }

        const numMaskParts = mask.split('.').map(Number);
        if (numMaskParts.some(p => p > 255) || ip.split('.').map(Number).some(p => p > 255)) {
            this.print("Virhe: Oktetti ei voi olla yli 255!", 'error');
            if (typeof audio !== 'undefined') audio.playError();
            return;
        }

        if (!IP_REQUIRED_TYPES.includes(targetNode.userData.type)) {
            this.print(`Huomautus: Laitetyyppi ${targetNode.userData.type.toUpperCase()} on infrastruktuurisolmu, mutta IP asetettu.`, 'dim');
        }

        // Haetaan laitteen oikea vyöhykekohtainen aliverkko
        const scope = (typeof getNodeSubnetScope === 'function') ? getNodeSubnetScope(targetNode) : null;
        if (!scope || !scope.details) {
            this.print("Virhe: Tason aliverkkotietoja ei voida lukea.", 'error');
            return;
        }

        const details = scope.details;
        const cidr = scope.cidr;

        if (mask !== details.mask) {
            this.print(`Virhe: Väärä aliverkon peite! /${cidr}-aliverkossa oikea peite on ${details.mask}.`, 'error');
            if (typeof audio !== 'undefined') audio.playError();
            return;
        }

        if (cidr < 31 && ip === details.network) {
            this.print(`Virhe: ${ip} on aliverkon verkko-osoite (Network ID)! Kaikki isäntäbitit ovat 0.`, 'error');
            if (typeof audio !== 'undefined') audio.playError();
            return;
        }
        if (cidr < 31 && ip === details.broadcast) {
            this.print(`Virhe: ${ip} on yleislähetysosoite (Broadcast)! Kaikki isäntäbitit ovat 1.`, 'error');
            if (typeof audio !== 'undefined') audio.playError();
            return;
        }

        const ipL = ip2long(ip);
        const firstL = ip2long(details.firstHost);
        const lastL = ip2long(details.lastHost);

        if (ipL < firstL || ipL > lastL) {
            this.print(`Virhe: IP ${ip} ei kuulu aliverkon sallitulle isäntäalueelle (${details.firstHost} – ${details.lastHost})!`, 'error');
            if (typeof audio !== 'undefined') audio.playError();
            return;
        }

        // Tarkista ettei sama IP ole jo käytössä
        const duplicateNode = nodes.find(n =>
            n !== targetNode &&
            n.userData.ip === ip &&
            n.userData.correctIp
        );
        if (duplicateNode) {
            this.print(`Virhe: IP ${ip} on jo käytössä toisella laitteella (${this.getNodeDisplayName(duplicateNode)})!`, 'error');
            if (typeof audio !== 'undefined') audio.playError();
            return;
        }

        // Palvelin / Tulostin / Työasema aluejako (tasot 11+)
        if (currentLevelConfig && currentLevelConfig.id >= 11) {
            const nodeType = targetNode.userData.type;
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
                this.print(`Käytäntövirhe: ${ipRuleError}`, 'error');
                if (typeof audio !== 'undefined') audio.playError();
                return;
            }
        }

        // HYVÄKSYTTY! Asetetaan tila
        targetNode.userData.ip = ip;
        targetNode.userData.mask = mask;
        targetNode.userData.correctIp = true;

        if (typeof updateNodeVisualState === 'function') updateNodeVisualState(targetNode);
        if (typeof updateNodeLabel === 'function') updateNodeLabel(targetNode);

        targetNode.userData.animating = true;
        targetNode.userData.animStart = Date.now();

        if (typeof createDataConfetti === 'function' && targetNode.mesh) {
            createDataConfetti(targetNode.mesh.position.clone());
        }

        const connCable = cables.find(c => c.nodeA === targetNode || c.nodeB === targetNode);
        if (connCable && typeof spawnPacket === 'function') {
            const neighbor = (connCable.nodeA === targetNode) ? connCable.nodeB : connCable.nodeA;
            spawnPacket(targetNode, neighbor, 0x10b981, 0.5);
        }

        if (typeof checkConnections === 'function') checkConnections();
        if (typeof updateGoalUI === 'function') updateGoalUI();

        this.print(`% LINK-5-CHANGED: Interface GigabitEthernet0/1, changed state to up`, 'dim');
        this.print(`% LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to up`, 'dim');
        this.print(`[OK] IP ${ip}/${cidr} asetettu onnistuneesti laitteelle ${this.getNodeDisplayName(targetNode)}!`, 'success');
        if (typeof audio !== 'undefined') audio.playPingSuccess();
    }

    cmdShow(args) {
        if (args.length === 0) {
            this.print("Käyttö: show <ip interface brief | ip route | cdp neighbors | lldp neighbors>", 'error');
            return;
        }

        const sub = args.join(' ').toLowerCase();

        if (sub.includes('interface') || sub.includes('int')) {
            this.showIpInterfaceBrief();
        } else if (sub.includes('route')) {
            this.showIpRoute();
        } else if (sub.includes('cdp') || sub.includes('lldp') || sub.includes('neighbor')) {
            this.showCdpNeighbors();
        } else {
            this.print(`Tuntematon show-komento: 'show ${args.join(' ')}'`, 'error');
            this.print("Tuetut: show ip interface brief, show ip route, show cdp neighbors", 'dim');
        }
    }

    showIpInterfaceBrief() {
        this.print("\nInterface              IP-Address      OK? Method Status                Protocol", 'accent');
        nodes.forEach((n, idx) => {
            const devName = this.getNodeDisplayName(n, idx + 1);
            const portName = `Gi0/${idx + 1}`.padEnd(22, ' ');
            const ip = (n.userData.ip || 'unassigned').padEnd(15, ' ');
            const ok = n.userData.correctIp ? 'YES' : 'NO ';
            const status = n.userData.isConnected ? 'up                    up' : 'down                  down';
            this.print(`${portName} ${ip} ${ok} manual ${status}`);
        });
    }

    showIpRoute() {
        if (!currentLevelConfig) {
            this.print("Ei aktiivista tasokonfiguraatiota.", 'dim');
            return;
        }

        const net = currentLevelConfig.network;
        const cidr = currentLevelConfig.cidr;
        const gwIp = net.replace(/\.\d+$/, '.1');

        this.print("\nCodes: L - local, C - connected, S - static, R - RIP, O - OSPF, * - candidate default\n", 'dim');
        this.print(`Gateway of last resort is ${gwIp} to network 0.0.0.0\n`, 'accent');
        this.print(`S*    0.0.0.0/0 [1/0] via ${gwIp}, GigabitEthernet0/0`);
        this.print(`C     ${net}/${cidr} is directly connected, GigabitEthernet0/1`);
        this.print(`L     ${gwIp}/32 is directly connected, GigabitEthernet0/1`);

        if (currentLevelConfig.zones) {
            currentLevelConfig.zones.forEach(z => {
                if (z.subnet && z.subnet !== `${net}/${cidr}`) {
                    this.print(`C     ${z.subnet} is directly connected, VLAN [${z.name || 'Segment'}]`);
                }
            });
        }
    }

    showCdpNeighbors() {
        this.print("\nCapability Codes: R - Router, T - Trans Bridge, B - Source Route Bridge", 'dim');
        this.print("                  S - Switch, H - Host, I - IGMP, r - Repeater, P - Phone\n", 'dim');
        this.print("Device ID        Local Intrfce     Holdtme    Capability  Platform  Port ID", 'accent');

        if (!cables || cables.length === 0) {
            this.print("Ei aktiivisia kaapelilinkkejä.", 'dim');
            return;
        }

        const relevantCables = this.targetNode 
            ? cables.filter(c => c.nodeA === this.targetNode || c.nodeB === this.targetNode)
            : cables;

        relevantCables.forEach((c, idx) => {
            const devA = this.getNodeDisplayName(c.nodeA);
            const devB = this.getNodeDisplayName(c.nodeB);
            const linkType = c.linkType === 'fiber_10g' ? '10G Fiber' : '1G Copper';
            const cap = [nodeTypes.SWITCH, nodeTypes.CORE_SWITCH].includes(c.nodeB.userData.type) ? 'S I' : 'H';
            this.print(`${devB.padEnd(16, ' ')} Gi0/${idx + 1}           148        ${cap.padEnd(11, ' ')} SubnetOS  Eth0/1 (${linkType})`);
        });
    }

    cmdPing(args) {
        if (args.length === 0) {
            this.print("Käyttö: ping <ip-osoite tai laitteen nimi>", 'error');
            return;
        }

        const targetQuery = args[0].toLowerCase();
        const targetNode = nodes.find((n, i) => 
            (n.userData.ip && n.userData.ip === targetQuery) ||
            this.getNodeDisplayName(n, i + 1).toLowerCase() === targetQuery ||
            n.userData.type.toLowerCase() === targetQuery ||
            (targetQuery === 'gateway' && n.userData.type === nodeTypes.GATEWAY) ||
            (targetQuery === 'router' && n.userData.type === nodeTypes.ROUTER) ||
            (targetQuery === 'cloud' && n.userData.type === nodeTypes.CLOUD) ||
            (targetQuery === 'internet' && n.userData.type === nodeTypes.CLOUD)
        );

        const sourceNode = this.targetNode || selectedNodeForIp || nodes.find(n => [nodeTypes.PC, nodeTypes.LAPTOP, nodeTypes.OFFICE, nodeTypes.SERVER].includes(n.userData.type)) || nodes[0];

        if (!sourceNode) {
            this.print("Virhe: Lähtölaitetta ei löydy.", 'error');
            return;
        }

        const targetIp = targetNode ? (targetNode.userData.ip || (targetNode.userData.type === nodeTypes.CLOUD ? "8.8.8.8" : "192.168.1.1")) : targetQuery;
        this.print(`PING ${targetIp} (${targetNode ? this.getNodeDisplayName(targetNode) : 'Kohde'}) 56(84) data-tavua.`, 'accent');

        if (!targetNode) {
            this.print(`From ${sourceNode.userData.ip || '192.168.1.x'}: Destination Host Unreachable.`, 'error');
            if (typeof audio !== 'undefined') audio.playError();
            return;
        }

        if (!sourceNode.userData.isConnected) {
            this.print(`❌ Link Down: Lähtölaite ${this.getNodeDisplayName(sourceNode)} ei ole kytketty verkkoon!`, 'error');
            if (typeof audio !== 'undefined') audio.playError();
            return;
        }

        let seq = 1;
        const sendSeq = () => {
            if (seq > 4) {
                this.print(`--- ${targetIp} ping-tilastot ---`, 'dim');
                this.print(`4 pakettia lähetetty, 4 vastaanotettu, 0% pakettihävikki.`, 'success');
                if (typeof unlockAchievement === 'function') unlockAchievement('ping_master');
                return;
            }

            if (typeof spawnPacket === 'function') {
                spawnPacket(sourceNode, targetNode, 0x38bdf8, 0.4, () => {
                    const rtt = (0.7 + Math.random() * 0.8).toFixed(2);
                    this.print(`64 bytes from ${targetIp}: icmp_seq=${seq} ttl=64 time=${rtt} ms`, 'normal');
                    if (typeof audio !== 'undefined') audio.playPingSuccess();
                    seq++;
                    setTimeout(sendSeq, 200);
                });
            } else {
                this.print(`64 bytes from ${targetIp}: icmp_seq=${seq} ttl=64 time=1.12 ms`, 'normal');
                seq++;
                setTimeout(sendSeq, 150);
            }
        };

        sendSeq();
    }

    cmdTraceroute(args) {
        if (args.length === 0) {
            this.print("Käyttö: traceroute <ip-osoite tai 'internet'>", 'error');
            return;
        }

        const sourceNode = this.targetNode || selectedNodeForIp || nodes.find(n => [nodeTypes.PC, nodeTypes.LAPTOP, nodeTypes.OFFICE].includes(n.userData.type)) || nodes[0];
        const cloudNode = nodes.find(n => n.userData.type === nodeTypes.CLOUD);
        const gatewayNode = nodes.find(n => n.userData.type === nodeTypes.GATEWAY || n.userData.type === nodeTypes.ROUTER);

        this.print(`traceroute kohteeseen ${args[0]} (max 30 hyppyä, 60 tavun paketit)`, 'accent');

        if (!sourceNode || !sourceNode.userData.isConnected) {
            this.print(" 1  * * * Reitti poikki: Päätelaitteella ei ole verkkoyhteyttä.", 'error');
            return;
        }

        setTimeout(() => {
            const hop1Ip = sourceNode.userData.ip ? sourceNode.userData.ip.replace(/\.\d+$/, '.254') : "192.168.1.254";
            this.print(` 1  lan-switch.local (${hop1Ip})  0.482 ms  0.395 ms  0.410 ms`, 'normal');
            if (typeof audio !== 'undefined') audio.playPingSuccess();
            if (gatewayNode && typeof spawnPacket === 'function') spawnPacket(sourceNode, gatewayNode, 0xf59e0b, 0.5);

            setTimeout(() => {
                const hop2Ip = currentLevelConfig ? currentLevelConfig.network.replace(/\.\d+$/, '.1') : "192.168.1.1";
                this.print(` 2  gateway.operator.fi (${hop2Ip})  1.120 ms  1.054 ms  1.102 ms`, 'normal');
                if (typeof audio !== 'undefined') audio.playPingSuccess();
                if (cloudNode && gatewayNode && typeof spawnPacket === 'function') spawnPacket(gatewayNode, cloudNode, 0x10b981, 0.5);

                setTimeout(() => {
                    this.print(` 3  core-backbone.fi (193.64.20.1)  3.410 ms  3.280 ms  3.350 ms`, 'normal');
                    this.print(` 4  internet-edge.cdn (8.8.8.8)  5.120 ms  4.980 ms  5.040 ms`, 'success');
                    this.print("Reititys valmis (Trace complete). Kaikki hypyt toiminnassa!", 'accent');
                    if (typeof unlockAchievement === 'function') unlockAchievement('traceroute_master');
                }, 400);
            }, 400);
        }, 300);
    }

    cmdIpConfig(args) {
        this.print("--- IP-KONFIGURAATIO (IPCONFIG) ---", 'accent');
        const filterType = args.length > 0 ? args[0].toLowerCase() : null;

        const targetNodes = filterType 
            ? nodes.filter(n => n.userData.type.toLowerCase().includes(filterType))
            : (this.targetNode ? [this.targetNode] : nodes.filter(n => n.userData.isPredefined || n.userData.ip));

        if (targetNodes.length === 0) {
            this.print("Ei löytynyt laitteita hakuehdolla.", 'dim');
            return;
        }

        targetNodes.forEach((n, i) => {
            const devName = this.getNodeDisplayName(n, i + 1);
            const typeName = n.userData.type.toUpperCase();
            const ip = n.userData.ip || "MÄÄRITTÄMÄTÖN";
            const mask = n.userData.mask || "MÄÄRITTÄMÄTÖN";
            const mac = "52:54:00:" + n.id.substring(0, 6).match(/.{2}/g).join(':');
            const status = n.userData.isConnected ? "LINK UP" : "LINK DOWN";
            const statusColor = n.userData.isConnected ? "text-emerald-400" : "text-rose-400";

            this.print(`\nSovitin [${devName}] (${typeName}):`, 'accent');
            this.print(`   Tila . . . . . . . . . . . . : <span class="${statusColor}">${status}</span>`);
            this.print(`   Fyysinen osoite (MAC) . . . . : ${mac}`);
            this.print(`   IPv4-osoite . . . . . . . . . : ${ip}`);
            this.print(`   Aliverkon peite (Mask)  . . . : ${mask}`);
            if (currentLevelConfig) {
                this.print(`   Oletusyhdyskäytävä (Gateway)  : ${currentLevelConfig.network.replace(/\.\d+$/, '.1')}`);
            }
        });
    }

    cmdArp(args) {
        this.print("Rajapinta: 192.168.1.x --- 0x2", 'accent');
        this.print("  Internet-osoite       Fyysinen osoite       Tyyppi", 'dim');
        nodes.forEach(n => {
            if (n.userData.ip) {
                const mac = "52-54-00-" + n.id.substring(0, 6).match(/.{2}/g).join('-');
                this.print(`  ${n.userData.ip.padEnd(21, ' ')} ${mac}   dynaaminen`);
            }
        });
    }

    cmdSubnetCalc(args) {
        if (args.length === 0) {
            this.print("Käyttö: subnetcalc <ip-osoite>/<cidr> (esim. subnetcalc 192.168.1.0/26)", 'error');
            return;
        }

        const raw = args[0];
        const [ip, cidrStr] = raw.split('/');
        const cidr = parseInt(cidrStr, 10);

        if (!ip || isNaN(cidr) || cidr < 1 || cidr > 32) {
            this.print("Virheellinen CIDR-muoto! Käytä esim: 192.168.1.0/24", 'error');
            return;
        }

        if (typeof calculateSubnetDetails === 'function') {
            const det = calculateSubnetDetails(ip, cidr);
            this.print(`\n--- ALIVERKKOLASKURI: ${ip}/${cidr} ---`, 'accent');
            this.print(`  Aliverkon peite (Mask) : ${det.mask}`);
            this.print(`  Lohkokoko (Block size) : ${det.totalIps} IP-osoitetta`);
            this.print(`  Käytettävät isännät    : ${det.usableHosts} kpl`);
            this.print(`  Verkko-osoite (Net ID) : ${det.network}`);
            this.print(`  Ensimmäinen isäntä     : ${det.firstHost}`);
            this.print(`  Viimeinen isäntä       : ${det.lastHost}`);
            this.print(`  Yleislähetys (Bcast)   : ${det.broadcast}`);
            this.print(`  Binääripeite           : ${det.binaryMask || ''}`);
        } else {
            this.print("Laskentamoottori ei ole ladattu.", 'error');
        }
    }

    cmdStatus() {
        if (!currentLevelConfig) {
            this.print("Ei aktiivista tasoa.", 'dim');
            return;
        }

        this.print(`\n--- TASON ${currentLevelConfig.id} STATUS: ${currentLevelConfig.name} ---`, 'accent');
        this.print(`  Pääverkko    : ${currentLevelConfig.network}/${currentLevelConfig.cidr}`);
        this.print(`  Laitteita    : ${nodes.length} kpl`);
        this.print(`  Kaapeleita   : ${cables.length} kpl`);

        const readyCount = nodes.filter(n => n.userData.isConnected && n.userData.correctIp).length;
        const totalReq = nodes.filter(n => n.userData.isPredefined && IP_REQUIRED_TYPES.includes(n.userData.type)).length;

        this.print(`  Valmiit IP:t : ${readyCount}/${totalReq}`);
        if (readyCount === totalReq && totalReq > 0) {
            this.print("  Topologia    : ✅ 100% KUNNOSSA JA VALMIS", 'success');
        } else {
            this.print("  Topologia    : ⏳ Keskeneräinen (kytke puuttuvat laitteet ja aseta IP:t)", 'error');
        }
    }

    cmdReload() {
        this.print("Ladataan ja alustetaan aktiivinen taso uudelleen...", 'accent');
        if (typeof loadLevel === 'function' && typeof currentLevel !== 'undefined') {
            setTimeout(() => {
                loadLevel(currentLevel);
                this.setTargetNode(null);
                this.print(`Taso ${currentLevel} alustettu onnistuneesti.`, 'success');
            }, 300);
        } else {
            this.print("Tason uudelleenlataus epäonnistui.", 'error');
        }
    }
}

// Globaali terminaali-instanssi
const terminal = new CyberTerminal();
if (typeof window !== 'undefined') {
    window.terminal = terminal;
    window.addEventListener('DOMContentLoaded', () => terminal.init());
}
