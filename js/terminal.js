// --- Cyber Terminal (CLI Mode) ---
// Cisco / Linux -tyylinen interaktiivinen verkkopääte suoralla 3D-visualisoinnilla.

class CyberTerminal {
    constructor() {
        this.history = [];
        this.historyIndex = -1;
        this.isOpen = false;
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
                } else if (e.key === 'Escape') {
                    this.toggle();
                }
            });
        }

        // Globaali pikanäppäin terminaalille (~ tai §)
        window.addEventListener('keydown', (e) => {
            if (e.key === '~' || e.key === '§' || (e.ctrlKey && e.key === '`')) {
                // Älä avaa jos ollaan kirjoittamassa IP-kenttään
                if (e.target && (e.target.classList.contains('ip-octet') || e.target.classList.contains('mask-octet') || e.target.classList.contains('net-octet') || e.target.classList.contains('bcast-octet'))) {
                    return;
                }
                e.preventDefault();
                this.toggle();
            }
        });
    }

    toggle() {
        const modal = document.getElementById('terminal-modal');
        if (!modal) return;
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            modal.classList.remove('hidden');
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
            line.innerHTML = `<span class="text-emerald-400 font-bold">architect@submask:~$</span> <span class="text-white font-bold">${text}</span>`;
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
            this.print("Kirjoita 'help' nähdäksesi tuetut verkkokomennot.", 'dim');
        }
    }

    execute(cmdLine) {
        this.print(cmdLine, 'command');
        const parts = cmdLine.split(' ').filter(Boolean);
        if (parts.length === 0) return;

        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (typeof audio !== 'undefined') audio.playUiClick();

        switch (cmd) {
            case 'help':
                this.cmdHelp();
                break;
            case 'clear':
            case 'cls':
                this.clear();
                break;
            case 'ping':
                this.cmdPing(args);
                break;
            case 'traceroute':
            case 'tracert':
                this.cmdTraceroute(args);
                break;
            case 'ipconfig':
            case 'ifconfig':
                this.cmdIpConfig(args);
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
            default:
                this.print(`Komentoa '${cmd}' ei tunnistettu. Kirjoita 'help' nähdäksesi komennot.`, 'error');
                if (typeof audio !== 'undefined') audio.playError();
                break;
        }
    }

    cmdHelp() {
        this.print("--- TUETUT VERKKOKOMENNOT ---", 'accent');
        this.print("  ping <ip | laite>          - Lähettää 4 kpl ICMP Echo -paketteja 3D-pulssina kohteeseen.");
        this.print("  traceroute <ip>            - Jäljittää verkkoreitin hyppy kerrallaan laitteelta pilveen.");
        this.print("  ipconfig [laite]           - Näyttää laitteen IP:n, peitteen, aliverkon ja MAC-osoitteen.");
        this.print("  arp -a                     - Tulostaa kytkimen ja laitteiden ARP-osoitetaulukon.");
        this.print("  subnetcalc <ip>/<cidr>     - Laskee aliverkon verkko-osoitteen, broadcastin ja isännät.");
        this.print("  status                     - Tarkistaa nykyisen tason verkkotopologian kokonaistilan.");
        this.print("  clear                      - Tyhjentää terminaalinäytön.");
    }

    cmdPing(args) {
        if (args.length === 0) {
            this.print("Käyttö: ping <ip-osoite tai laitteen nimi>", 'error');
            return;
        }

        const targetQuery = args[0].toLowerCase();
        // Etsitään kohdelaite joko IP:n tai tyypin mukaan
        const targetNode = nodes.find(n => 
            (n.userData.ip && n.userData.ip === targetQuery) ||
            n.userData.type.toLowerCase() === targetQuery ||
            (targetQuery === 'gateway' && n.userData.type === nodeTypes.GATEWAY) ||
            (targetQuery === 'router' && n.userData.type === nodeTypes.ROUTER) ||
            (targetQuery === 'cloud' && n.userData.type === nodeTypes.CLOUD) ||
            (targetQuery === 'internet' && n.userData.type === nodeTypes.CLOUD)
        );

        const sourceNode = selectedNodeForIp || nodes.find(n => [nodeTypes.PC, nodeTypes.LAPTOP, nodeTypes.OFFICE, nodeTypes.SERVER].includes(n.userData.type)) || nodes[0];

        if (!sourceNode) {
            this.print("Virhe: Lähtölaitetta ei löydy.", 'error');
            return;
        }

        const targetIp = targetNode ? (targetNode.userData.ip || (targetNode.userData.type === nodeTypes.CLOUD ? "8.8.8.8" : "192.168.1.1")) : targetQuery;
        this.print(`PING ${targetIp} (${targetNode ? targetNode.userData.type : 'Kohde'}) 56(84) data-tavua.`, 'accent');

        if (!targetNode) {
            this.print(`From ${sourceNode.userData.ip || '192.168.1.x'}: Destination Host Unreachable.`, 'error');
            if (typeof audio !== 'undefined') audio.playError();
            return;
        }

        if (!sourceNode.userData.isConnected) {
            this.print(`❌ Link Down: Lähtölaite ${sourceNode.userData.type} ei ole kytketty verkkoon!`, 'error');
            if (typeof audio !== 'undefined') audio.playError();
            return;
        }

        // Suoritetaan 4 kpl pingejä pienellä viiveellä
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

        const sourceNode = selectedNodeForIp || nodes.find(n => [nodeTypes.PC, nodeTypes.LAPTOP, nodeTypes.OFFICE].includes(n.userData.type)) || nodes[0];
        const cloudNode = nodes.find(n => n.userData.type === nodeTypes.CLOUD);
        const gatewayNode = nodes.find(n => n.userData.type === nodeTypes.GATEWAY || n.userData.type === nodeTypes.ROUTER);

        this.print(`traceroute kohteeseen ${args[0]} (max 30 hyppyä, 60 tavun paketit)`, 'accent');

        if (!sourceNode || !sourceNode.userData.isConnected) {
            this.print(" 1  * * * Reitti poikki: Päätelaitteella ei ole verkkoyhteyttä.", 'error');
            return;
        }

        // Hyppy 1: Lähiverkon kytkin tai reititin
        setTimeout(() => {
            const hop1Ip = sourceNode.userData.ip ? sourceNode.userData.ip.replace(/\.\d+$/, '.254') : "192.168.1.254";
            this.print(` 1  lan-switch.local (${hop1Ip})  0.482 ms  0.395 ms  0.410 ms`, 'normal');
            if (typeof audio !== 'undefined') audio.playPingSuccess();
            if (gatewayNode && typeof spawnPacket === 'function') spawnPacket(sourceNode, gatewayNode, 0xf59e0b, 0.5);

            // Hyppy 2: Default Gateway
            setTimeout(() => {
                const hop2Ip = currentLevelConfig ? currentLevelConfig.network.replace(/\.\d+$/, '.1') : "192.168.1.1";
                this.print(` 2  gateway.operator.fi (${hop2Ip})  1.120 ms  1.054 ms  1.102 ms`, 'normal');
                if (typeof audio !== 'undefined') audio.playPingSuccess();
                if (cloudNode && gatewayNode && typeof spawnPacket === 'function') spawnPacket(gatewayNode, cloudNode, 0x10b981, 0.5);

                // Hyppy 3: Internet Core / Cloud
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
            : nodes.filter(n => n.userData.isPredefined || n.userData.ip);

        if (targetNodes.length === 0) {
            this.print("Ei löytynyt laitteita hakuehdolla.", 'dim');
            return;
        }

        targetNodes.forEach(n => {
            const typeName = n.userData.type.toUpperCase();
            const ip = n.userData.ip || "MÄÄRITTÄMÄTÖN";
            const mask = n.userData.mask || "MÄÄRITTÄMÄTÖN";
            const mac = "52:54:00:" + n.id.substring(0, 6).match(/.{2}/g).join(':');
            const status = n.userData.isConnected ? "LINK UP" : "LINK DOWN";
            const statusColor = n.userData.isConnected ? "text-emerald-400" : "text-rose-400";

            this.print(`\nSovitin [${typeName}] - ${n.userData.name || n.userData.type}:`, 'accent');
            this.print(`   Tila . . . . . . . . . . . . : <span class="${statusColor}">${status}</span>`);
            this.print(`   Fyysinen osoite (MAC) . . . . : ${mac}`);
            this.print(`   IPv4-osoite . . . . . . . . . : ${ip}`);
            this.print(`   Aliverkon peite (Mask)  . . . : ${mask}`);
            if (currentLevelConfig) {
                this.print(`   Oletusyhdyskäytävä (Gateway)  : ${currentLevelConfig.network.replace(/\.0$/, '.1')}`);
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
        const cidr = parseInt(cidrStr);

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
            this.print(`  Binääripeite           : ${det.binaryMask}`);
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
}

// Globaali terminaali-instanssi
const terminal = new CyberTerminal();
if (typeof window !== 'undefined') {
    window.terminal = terminal;
    window.addEventListener('DOMContentLoaded', () => terminal.init());
}
