// =========================================================================
// Cyber Terminal - Linux Server TTY & Network Engineer Console v4.0
// Tukee 100% komentorivipelaamista, Linux syslogeja, Cisco IOS & Linux CLI -syntakseja
// sekä reaaliaikaista synkronointia 3D-verkkomaailman kanssa.
// =========================================================================

class CyberTerminal {
    constructor() {
        this.history = [];
        this.historyIndex = -1;
        this.isOpen = false;
        this.targetNode = null; // Aktiivisesti valittu laite CLI-istunnossa
        this.bootTime = Date.now();
        this.syslogBuffer = []; // Pysyvä tapahtuma- ja virheloki
        this.viewMode = (typeof localStorage !== 'undefined' && localStorage.getItem('terminal_view_mode')) || 'docked';
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

        // Aseta alustettu näyttötila
        this.applyViewMode();
        this.syncPrompt();
    }

    // =========================================================================
    // NÄKYMÄN HALLINTA (Telakointi, Kokoruutu, Ikkuna)
    // =========================================================================

    setViewMode(mode) {
        this.viewMode = mode;
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('terminal_view_mode', mode);
        }
        this.applyViewMode();
        this.focusInput();
    }

    applyViewMode() {
        const modal = document.getElementById('terminal-modal');
        if (!modal) return;

        modal.classList.remove('docked', 'fullscreen', 'floating');

        const btnDock = document.getElementById('term-btn-dock');
        const btnFloat = document.getElementById('term-btn-float');
        const btnFull = document.getElementById('term-btn-full');

        [btnDock, btnFloat, btnFull].forEach(b => {
            if (b) b.classList.remove('bg-slate-800', 'text-emerald-400', 'font-bold');
        });

        if (this.viewMode === 'docked') {
            modal.classList.add('docked');
            if (btnDock) btnDock.classList.add('bg-slate-800', 'text-emerald-400', 'font-bold');
        } else if (this.viewMode === 'fullscreen') {
            modal.classList.add('fullscreen');
            if (btnFull) btnFull.classList.add('bg-slate-800', 'text-emerald-400', 'font-bold');
        } else {
            modal.classList.add('floating');
            if (btnFloat) btnFloat.classList.add('bg-slate-800', 'text-emerald-400', 'font-bold');
        }
    }

    toggle() {
        const modal = document.getElementById('terminal-modal');
        if (!modal) return;
        this.isOpen = !this.isOpen;

        // Nollataan liikenäppäimet
        if (typeof keys !== 'undefined') {
            keys.w = false; keys.a = false; keys.s = false; keys.d = false;
            keys.up = false; keys.down = false; keys.left = false; keys.right = false;
        }

        if (this.isOpen) {
            modal.classList.remove('hidden');
            this.applyViewMode();
            if (!this.targetNode && typeof selectedNodeForIp !== 'undefined' && selectedNodeForIp) {
                this.targetNode = selectedNodeForIp;
            }
            this.syncPrompt();
            this.focusInput();
            if (typeof audio !== 'undefined') audio.playUiClick();
        } else {
            modal.classList.add('hidden');
            if (typeof audio !== 'undefined') audio.playUiClick();
        }
    }

    focusInput() {
        const inputEl = document.getElementById('terminal-input');
        if (inputEl) {
            if (typeof keys !== 'undefined') {
                keys.w = false; keys.a = false; keys.s = false; keys.d = false;
                keys.up = false; keys.down = false; keys.left = false; keys.right = false;
            }
            setTimeout(() => inputEl.focus(), 50);
        }
    }

    // =========================================================================
    // SYSLOG & PYSYVÄ VIRHEIDEN / TAPAHTUMIEN LOKITUS
    // =========================================================================

    /**
     * Kirjaa järjestelmätapahtuman tai hälytyksen pysyvään lokipuskuriin ja tulostaa konsoliin.
     */
    logSyslog(type, msg, facility = 'net_kernel') {
        const uptimeSec = ((Date.now() - this.bootTime) / 1000).toFixed(4);
        const entry = {
            uptime: uptimeSec,
            type: type, // 'error' | 'warning' | 'info' | 'success'
            facility: facility,
            message: msg,
            timestamp: new Date().toLocaleTimeString()
        };

        this.syslogBuffer.push(entry);

        // Tulostetaan terminaaliin jos se on olemassa
        const bodyEl = document.getElementById('terminal-body');
        if (!bodyEl) return;

        const line = document.createElement('div');
        line.className = 'terminal-line text-xs font-mono';

        let tagClass = 'text-cyan-400';
        let prefix = '[  INFO  ]';
        let lineStyle = 'terminal-log-info';

        if (type === 'error' || type === 'alert') {
            tagClass = 'text-rose-400 font-bold';
            prefix = '[  ALERT ]';
            lineStyle = 'terminal-log-alert';
        } else if (type === 'warning' || type === 'warn') {
            tagClass = 'text-amber-400 font-bold';
            prefix = '[  WARN  ]';
            lineStyle = 'terminal-log-warn';
        } else if (type === 'success') {
            tagClass = 'text-emerald-400 font-bold';
            prefix = '[   OK   ]';
            lineStyle = '';
        }

        line.className += ` ${lineStyle}`;
        line.innerHTML = `<span class="text-slate-500">[${uptimeSec.padStart(9, ' ')}]</span> <span class="text-slate-400">${facility}:</span> <span class="${tagClass}">${prefix}</span> <span class="text-slate-200">${msg}</span>`;

        bodyEl.appendChild(line);
        bodyEl.scrollTop = bodyEl.scrollHeight;
    }

    /**
     * Kutsutaan kun uusi taso ladataan (game.js). Tulostaa Linux Server MOTD -viestin.
     */
    onLevelLoaded(lvl) {
        if (!lvl) return;
        const bodyEl = document.getElementById('terminal-body');
        if (!bodyEl) return;

        const uptimeSec = ((Date.now() - this.bootTime) / 1000).toFixed(4);
        const gwIp = lvl.network ? lvl.network.replace(/\.\d+$/, '.1') : '192.168.1.1';

        this.print(`\n================================================================================`, 'dim');
        this.print(`Linux subnet-server 6.8.0-enterprise #42-SMP PREEMPT x86_64 GNU/Linux`, 'accent');
        this.print(`* System Mode        : Enterprise Dual Stack (Cisco IOS & Linux CLI Active)`, 'dim');
        this.print(`* Mission ID         : Level ${lvl.id} - ${lvl.name}`, 'accent');
        this.print(`* Primary Network    : ${lvl.network}/${lvl.cidr} (Default GW: ${gwIp})`, 'success');
        this.print(`* Mission Scenario   : ${lvl.scenario || 'Yhdistä ja konfiguroi verkkolaitteet.'}`, 'normal');
        if (lvl.hint) {
            this.print(`* Engineer Hint      : ${lvl.hint}`, 'warning');
        }
        this.print(`\nKaikki verkon sääntövirheet ja alertit tallentuvat tähän komentopäätteeseen.`);
        this.print(`Peliä voi pelata myös 100% komentoriviltä: 'help', 'objectives', 'cable', 'ip', 'verify', 'dmesg'.`, 'dim');
        this.print(`================================================================================\n`, 'dim');

        this.logSyslog('info', `Tason ${lvl.id} alustus suoritettu. Reititystaulut ja linkkityypit ladattu.`, 'systemd');
        this.syncPrompt();
    }

    // =========================================================================
    // LAITTEEN TUNNISTUS JA PROMPT
    // =========================================================================

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
        
        const cleanType = type.replace(/_/g, '-').toUpperCase();
        return `${cleanType}-${idx}`;
    }

    resolveNode(query) {
        if (!query || typeof nodes === 'undefined' || !Array.isArray(nodes)) return null;
        const q = query.trim().toLowerCase();

        // 1. Numeron mukaan (1-perustainen)
        const num = parseInt(q, 10);
        if (!isNaN(num) && num >= 1 && num <= nodes.length) {
            return nodes[num - 1];
        }

        // 2. CLI-nimen tai tyypin mukaan
        let found = nodes.find((n, i) => {
            const cliName = this.getNodeDisplayName(n, i + 1).toLowerCase();
            const typeName = (n.userData.type || '').toLowerCase();
            return cliName === q || cliName.replace('-', '') === q.replace('-', '') || typeName === q;
        });

        // 3. IP-osoitteen mukaan
        if (!found) {
            found = nodes.find(n => n.userData.ip && n.userData.ip.toLowerCase() === q);
        }

        // 4. Erikoisnimet
        if (!found) {
            if (q === 'gateway' || q === 'gw') found = nodes.find(n => n.userData.type === nodeTypes.GATEWAY);
            else if (q === 'cloud' || q === 'internet') found = nodes.find(n => n.userData.type === nodeTypes.CLOUD);
            else if (q === 'firewall' || q === 'fw') found = nodes.find(n => n.userData.type === nodeTypes.FIREWALL);
            else if (q === 'core') found = nodes.find(n => n.userData.type === nodeTypes.CORE_SWITCH);
        }

        return found;
    }

    getPromptText() {
        if (this.targetNode) {
            const isInfra = [nodeTypes.SWITCH, nodeTypes.CORE_SWITCH, nodeTypes.ROUTER, nodeTypes.FIREWALL, nodeTypes.GATEWAY].includes(this.targetNode.userData.type);
            const promptSymbol = isInfra ? '#' : '>';
            return `root@${this.getNodeDisplayName(this.targetNode)}${promptSymbol}`;
        }
        return "sysadmin@subnet-server:~$";
    }

    syncPrompt() {
        const promptEl = document.getElementById('terminal-prompt-label');
        if (promptEl) {
            promptEl.innerText = this.getPromptText();
        }
        const badgeEl = document.getElementById('terminal-header-title');
        const headerConnEl = document.getElementById('terminal-header-conn');
        if (badgeEl && headerConnEl) {
            const lvlName = currentLevelConfig ? `Lvl ${currentLevelConfig.id}: ${currentLevelConfig.name}` : "CLI Mode";
            const devName = this.targetNode ? ` // ${this.getNodeDisplayName(this.targetNode)}` : "";
            headerConnEl.innerText = `sysadmin@subnet-server:~$ [${lvlName}${devName}]`;
        }
    }

    print(text, type = 'normal') {
        const bodyEl = document.getElementById('terminal-body');
        if (!bodyEl) return;

        const line = document.createElement('div');
        line.className = 'terminal-line leading-relaxed font-mono';

        if (type === 'command') {
            const prompt = this.getPromptText();
            line.innerHTML = `<span class="text-emerald-400 font-bold">${prompt}</span> <span class="text-white font-bold">${text}</span>`;
        } else if (type === 'error') {
            line.innerHTML = `<span class="text-rose-400 font-semibold">${text}</span>`;
        } else if (type === 'warning') {
            line.innerHTML = `<span class="text-amber-300 font-semibold">${text}</span>`;
        } else if (type === 'success') {
            line.innerHTML = `<span class="text-emerald-300 font-semibold">${text}</span>`;
        } else if (type === 'accent') {
            line.innerHTML = `<span class="text-cyan-300 font-semibold">${text}</span>`;
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
            this.print("Subnet Architect OS v4.0 [Enterprise Linux Server Console]", 'accent');
            this.print("Komennot: 'help', 'objectives', 'cable', 'devices', 'ip', 'verify', 'dmesg'.", 'dim');
        }
    }

    autoComplete(inputEl) {
        const current = inputEl.value.trim().toLowerCase();
        if (!current) return;

        const commands = [
            'help', 'clear', 'cls', 'ping', 'traceroute', 'tracert',
            'ipconfig', 'ifconfig', 'arp', 'subnetcalc', 'status',
            'devices', 'nodes', 'connect', 'session', 'select', 'exit',
            'cable connect', 'cable disconnect', 'cables', 'links',
            'add', 'spawn', 'rm', 'delete',
            'verify', 'submit', 'solve', 'next', 'level',
            'objectives', 'motd', 'task', 'rules', 'hint',
            'dmesg', 'journalctl', 'alerts', 'logs',
            'ip address', 'ip addr add', 'show ip interface brief', 'show ip route',
            'show cdp neighbors', 'show lldp neighbors', 'reload',
            'hostname', 'whoami', 'history'
        ];

        const match = commands.find(c => c.startsWith(current));
        if (match) {
            inputEl.value = match + ' ';
        }
    }

    // =========================================================================
    // KOMENTOJEN SUORITUS (Täysi CLI-tulkki)
    // =========================================================================

    execute(cmdLine) {
        this.print(cmdLine, 'command');
        const trimmed = cmdLine.trim();
        if (!trimmed) return;

        const parts = trimmed.split(/\s+/);
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (typeof audio !== 'undefined') audio.playUiClick();

        // 1. Monisanaiset Linux / Cisco -komennot
        if (cmd === 'show') {
            this.cmdShow(args);
            return;
        }

        if (cmd === 'ip') {
            if (args[0] && args[0].toLowerCase() === 'address') {
                this.cmdIpAddress(args.slice(1));
                return;
            }
            if (args[0] && args[0].toLowerCase() === 'addr') {
                this.cmdIpRouteAdd(args.slice(1));
                return;
            }
            if (args[0] && args[0].toLowerCase() === 'set') {
                this.cmdIpSet(args.slice(1));
                return;
            }
            if (args[0] && (args[0].toLowerCase() === 'link' || args[0].toLowerCase() === 'a')) {
                this.cmdDevices();
                return;
            }
            this.cmdIpConfig([]);
            return;
        }

        if (cmd === 'cable' || cmd === 'link') {
            this.cmdCableRouter(cmd, args);
            return;
        }

        // 2. Yleiset komennot
        switch (cmd) {
            case 'help':
            case '?':
            case 'man':
                this.cmdHelp();
                break;
            case 'clear':
            case 'cls':
                this.clear();
                break;
            case 'objectives':
            case 'motd':
            case 'task':
            case 'scenario':
                this.cmdObjectives();
                break;
            case 'rules':
            case 'policy':
                this.cmdRules();
                break;
            case 'hint':
                this.cmdHint();
                break;
            case 'dmesg':
            case 'journalctl':
            case 'alerts':
            case 'logs':
                this.cmdDmesg(args);
                break;
            case 'cables':
            case 'links':
                this.cmdCables();
                break;
            case 'devices':
            case 'nodes':
            case 'ls':
            case 'list':
                this.cmdDevices();
                break;
            case 'add':
            case 'spawn':
                this.cmdSpawn(args);
                break;
            case 'rm':
            case 'del':
            case 'delete':
                this.cmdDelete(args);
                break;
            case 'connect':
            case 'session':
            case 'select':
            case 'ssh':
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
            case 'verify':
            case 'check':
                this.cmdVerify();
                break;
            case 'submit':
            case 'solve':
                this.cmdSubmit();
                break;
            case 'next':
                this.cmdNextLevel();
                break;
            case 'level':
                this.cmdLoadLevel(args);
                break;
            case 'reload':
            case 'reboot':
                this.cmdReload();
                break;
            case 'hostname':
                this.cmdHostname(args);
                break;
            case 'whoami':
                this.print(`sysadmin (Enterprise Network Engineer) - Target: ${this.targetNode ? this.getNodeDisplayName(this.targetNode) : 'Console Root'}`, 'accent');
                break;
            case 'history':
                this.cmdHistory();
                break;
            default:
                this.print(`bash: ${cmd}: komentoa ei löydy. Kirjoita 'help' nähdäksesi kaikki tuetut verkkokomennot.`, 'error');
                if (typeof audio !== 'undefined') audio.playError();
                break;
        }
    }

    // =========================================================================
    // OHJEET, SÄÄNNÖT JA DMESG
    // =========================================================================

    cmdHelp() {
        this.print("--- ENTERPRISE LINUX & CISCO VERKKOKOMENNOT (100% CLI-TUKI) ---", 'accent');
        this.print("  TEHTÄVÄNANTO & OHJEET:", 'dim');
        this.print("    objectives / motd          - Tulostaa tason tehtävänannon ja verkkomääritykset.");
        this.print("    rules                      - Näyttää kaapelointi-, hierarkia- ja CCNA-säännöt.");
        this.print("    hint                       - Tulostaa tason arkkitehtuurivihjeen.");
        this.print("    dmesg / alerts             - Tulostaa pysyvän tapahtuma- ja virhelokin (syslog).");
        this.print("\n  VERKON KAAPELOINTI (CLI-OHJAUS):", 'dim');
        this.print("    cable connect <A> <B> [copper|fiber] - Yhdistää kaksi laitetta kaapelilla (tarkistaa säännöt).");
        this.print("    cable disconnect <A> <B>   - Poistaa kaapelin laitteiden väliltä.");
        this.print("    cables / links             - Listaa kaikki aktiiviset kaapelit ja niiden tilat.");
        this.print("\n  LAITTEIDEN HALLINTA & SPAWN:", 'dim');
        this.print("    devices / ls               - Listaa kaikki laitteet, ID:t, tilat ja IP-osoitteet.");
        this.print("    add <switch|server|wifi|firewall|pc> [x] [z] - Luo uuden laitteen verkkomaailmaan.");
        this.print("    rm <laite>                 - Poistaa laitteen ja siihen kytketyt kaapelit.");
        this.print("    connect <laite> / ssh <laite> - Avaa laitteen suoran konsoli-istunnon.");
        this.print("    exit                       - Palaa laiteistunnosta pääkonsoliin.");
        this.print("\n  IP-OSOITTEIDEN KONFIGUROINTI:", 'dim');
        this.print("    ip addr add <ip>/<cidr> dev eth0 - Linux iproute2: Aseta valitulle laitteelle IP ja CIDR.");
        this.print("    ip address <ip> <mask>     - Cisco IOS: Aseta valitulle laitteelle IP ja peite.");
        this.print("    ip set <laite> <ip> <peite|cidr> - Aseta IP suoraan mille tahansa laitteelle.");
        this.print("\n  TARKISTUS, DIAGNOSTIIKKA & EDISTYMINEN:", 'dim');
        this.print("    verify / status            - Analysoi koko verkon tilan ja raportoi puutteet.");
        this.print("    submit                     - Suorittaa ja läpäisee tason, jos verkko on 100% kunnossa.");
        this.print("    next                       - Siirtyy seuraavaan tasoon.");
        this.print("    ping <ip | laite>          - Lähettää 4 ICMP-pakettia 3D-animaationa kohteeseen.");
        this.print("    traceroute <ip | internet> - Jäljittää reitin 3D-pulssina hyppy kerrallaan.");
        this.print("    show ip interface brief    - Cisco IOS: Liittymien yhteenvedot.");
        this.print("    subnetcalc <ip>/<cidr>     - Aliverkkolaskuri (verkko, broadcast, isännät).");
        this.print("    clear                      - Tyhjentää terminaalin ruudun.");
    }

    cmdObjectives() {
        if (!currentLevelConfig) {
            this.print("Ei aktiivista tasokonfiguraatiota.", 'dim');
            return;
        }
        const lvl = currentLevelConfig;
        const gwIp = lvl.network ? lvl.network.replace(/\.\d+$/, '.1') : '192.168.1.1';

        this.print(`\n--- TEHTÄVÄNANTO: TASO ${lvl.id} - ${lvl.name.toUpperCase()} ---`, 'accent');
        this.print(`  Kuvaus       : ${lvl.scenario || 'Yhdistä verkon laitteet ja määritä IP-osoitteet.'}`);
        this.print(`  Pääverkko    : ${lvl.network}/${lvl.cidr}`);
        this.print(`  Oletusyhdyskäytävä: ${gwIp}`);
        if (lvl.zones && lvl.zones.length > 0) {
            this.print(`  Aliverkkoluokat / Vyöhykkeet:`, 'dim');
            lvl.zones.forEach(z => {
                this.print(`    - [${z.name || 'Segment'}] Subnet: ${z.subnet || 'Tason aliverkko'}`);
            });
        }
        if (lvl.hint) {
            this.print(`  Vihje        : ${lvl.hint}`, 'warning');
        }
        this.print(`\nTarkista tila komennolla 'verify'. Kun kaikki valmista, aja 'submit'.`, 'dim');
    }

    cmdRules() {
        this.print("\n--- VERKKOHIERARKIA & KAAPELOINTISÄÄNNÖT (CCNA POLICY) ---", 'accent');
        this.print("  1. Päätelaitteet (PC, Läppäri, Tulostin, Server):", 'dim');
        this.print("     - Kytketään AINA huoneen LAN-kytkimeen 1G Kuparikaapelilla.");
        this.print("     - KIELLETTY: Päätelaitetta ei saa kytkeä suoraan Ydinlinkkiin (Core Switch)! [REJECT]");
        this.print("  2. Kytkimet ja Runko (Core Switch):", 'dim');
        this.print("     - Runkoyhteydet kytkimeltä Ydinlinkkiin kytketään 10G Kuitukaapelilla.");
        this.print("     - Suurissa verkoissa LAN-kytkinten ketjutus (Switch <-> Switch) on kielletty; käytä tähtitopologiaa.");
        this.print("  3. Palomuuri ja Gateway:", 'dim');
        this.print("     - DMZ-järjestys: Gateway -> Palomuuri -> Ydinlinkki/Kytkin -> Palvelin.");
        this.print("  4. Aliverkon Peite & Osoitteet:", 'dim');
        this.print("     - Verkko-osoitetta (Network ID) ja yleislähetysosoitetta (Broadcast) EI saa antaa laitteelle.");
        this.print("     - Tasolla 11+: Palvelimet kuuluvat staattiselle alkuosalle, käyttäjät keskelle, tulostimet loppuun.");
    }

    cmdHint() {
        if (currentLevelConfig && currentLevelConfig.hint) {
            this.print(`\n💡 Vihje: ${currentLevelConfig.hint}`, 'warning');
        } else {
            this.print("Ei erillistä vihjettä tälle tasolle. Varmista kaapelointi ja tarkista 'verify'.", 'dim');
        }
    }

    cmdDmesg(args) {
        this.print(`\n--- KERNEL RING BUFFER & SYSLOG (${this.syslogBuffer.length} tapahtumaa) ---`, 'accent');
        if (this.syslogBuffer.length === 0) {
            this.print("Syslog-puskuri on tyhjä.", 'dim');
            return;
        }

        const filterErr = args && args[0] && (args[0] === '-e' || args[0] === 'err' || args[0] === 'alert');
        const list = filterErr 
            ? this.syslogBuffer.filter(e => e.type === 'error' || e.type === 'alert' || e.type === 'warning')
            : this.syslogBuffer;

        list.slice(-30).forEach(e => {
            let color = 'normal';
            if (e.type === 'error' || e.type === 'alert') color = 'error';
            else if (e.type === 'warning' || e.type === 'warn') color = 'warning';
            else if (e.type === 'success') color = 'success';

            this.print(`[${e.uptime.padStart(9, ' ')}] ${e.facility}: ${e.message}`, color);
        });

        this.print(`\nNäytettiin ${Math.min(30, list.length)} viimeisintä tapahtumaa. Vihje: 'dmesg -e' suodattaa vain alertit.`, 'dim');
    }

    cmdHistory() {
        this.print("--- KOMENTOHISTORIA ---", 'accent');
        this.history.forEach((h, i) => {
            this.print(`  ${(i + 1).toString().padStart(3, ' ')}  ${h}`);
        });
    }

    // =========================================================================
    // KAAPELOINTI KOMENTORIVILTÄ (cable connect / disconnect)
    // =========================================================================

    cmdCableRouter(cmd, args) {
        const sub = (args[0] || '').toLowerCase();

        if (sub === 'connect' || sub === 'add' || sub === 'link') {
            this.cmdCableConnect(args.slice(1));
            return;
        }
        if (sub === 'disconnect' || sub === 'rm' || sub === 'unlink' || sub === 'del') {
            this.cmdCableDisconnect(args.slice(1));
            return;
        }
        if (sub === 'list' || sub === 'show' || args.length === 0) {
            this.cmdCables();
            return;
        }

        // cable PC-1 Switch-1
        if (args.length >= 2) {
            this.cmdCableConnect(args);
            return;
        }

        this.print("Käyttö:", 'dim');
        this.print("  cable connect <laiteA> <laiteB> [copper | fiber]");
        this.print("  cable disconnect <laiteA> <laiteB>");
        this.print("  cables");
    }

    cmdCables() {
        if (!cables || cables.length === 0) {
            this.print("Verkossa ei ole vielä kaapeleita. Kytke laitteita: 'cable connect <laiteA> <laiteB>'.", 'dim');
            return;
        }

        this.print(`\n--- AKTIIVISET KAAPELILINKIT (${cables.length} kpl) ---`, 'accent');
        this.print("  ID   LÄHTÖLAITE         KOHDELAITE         LINKKITYYPPI   STATUS     PITUUS", 'dim');

        cables.forEach((c, i) => {
            const devA = this.getNodeDisplayName(c.nodeA).padEnd(18, ' ');
            const devB = this.getNodeDisplayName(c.nodeB).padEnd(18, ' ');
            const typeStr = (c.linkType === LINK_TYPES.FIBER_10G ? '10G Fiber' : '1G Copper').padEnd(14, ' ');
            const dist = c.nodeA.mesh.position.distanceTo(c.nodeB.mesh.position).toFixed(1);
            const status = (c.nodeA.userData.isConnected && c.nodeB.userData.isConnected) ? "🟢 Up  " : "🟡 Link";

            this.print(`  #${(i + 1).toString().padEnd(3, ' ')} ${devA} ${devB} ${typeStr} ${status}    ${dist} yks.`);
        });
    }

    cmdCableConnect(args) {
        if (args.length < 2) {
            this.print("Käyttö: cable connect <laiteA> <laiteB> [copper | fiber] (esim. cable connect PC-1 Switch-1)", 'error');
            return;
        }

        const nodeA = this.resolveNode(args[0]);
        const nodeB = this.resolveNode(args[1]);

        if (!nodeA) {
            this.print(`Virhe: Laitetta '${args[0]}' ei löydy. Listaa laitteet komennolla 'devices'.`, 'error');
            return;
        }
        if (!nodeB) {
            this.print(`Virhe: Laitetta '${args[1]}' ei löydy. Listaa laitteet komennolla 'devices'.`, 'error');
            return;
        }
        if (nodeA === nodeB) {
            this.print("Virhe: Laitetta ei voi kytkeä itseensä!", 'error');
            return;
        }

        const nameA = this.getNodeDisplayName(nodeA);
        const nameB = this.getNodeDisplayName(nodeB);

        // Tarkista onko kaapeli jo olemassa
        const exists = cables.find(c => 
            (c.nodeA === nodeA && c.nodeB === nodeB) || 
            (c.nodeB === nodeA && c.nodeA === nodeB)
        );
        if (exists) {
            this.print(`Huomautus: Kaapeli välillä ${nameA} <-> ${nameB} on jo olemassa!`, 'warning');
            return;
        }

        // Tarkista etäisyys
        const dist = nodeA.mesh.position.distanceTo(nodeB.mesh.position);
        const linkType = (args[2] && args[2].toLowerCase() === 'fiber') 
            ? LINK_TYPES.FIBER_10G 
            : getLinkType(nodeA.userData.type, nodeB.userData.type);

        const maxDist = (linkType === LINK_TYPES.FIBER_10G) ? 80 : 30;
        if (dist > maxDist) {
            const err = `Kaapelin kantama ylittyi (${dist.toFixed(1)} > max ${maxDist} yksikköä)!`;
            this.logSyslog('error', `Link ${nameA} <-> ${nameB}: ${err}`, 'net_phy');
            if (typeof audio !== 'undefined') audio.playError();
            return;
        }

        // Tarkista CCNA / DEVICE_RULES -säännöt
        const ruleErr = getCableError(nodeA, nodeB);
        if (ruleErr) {
            this.logSyslog('error', `REJECT ${nameA} <-> ${nameB}: ${ruleErr}`, 'ccna_policy');
            if (typeof audio !== 'undefined') audio.playError();
            return;
        }

        // Kaikki kunnossa: Luodaan kaapeli
        const visual = createCableVisual(nodeA, nodeB, linkType, null);
        cables.push({
            nodeA,
            nodeB,
            line: visual.line,
            linkType: linkType
        });

        if (typeof audio !== 'undefined') audio.playCableSnap();
        if (typeof checkConnections === 'function') checkConnections();
        if (typeof updateGoalUI === 'function') updateGoalUI();

        const typeName = linkType === LINK_TYPES.FIBER_10G ? "10G Kuitu (Trunk)" : "1G Kupari (Access)";
        this.logSyslog('success', `Kaapeli kytketty onnistuneesti: ${nameA} <====> ${nameB} [${typeName}]`, 'net_core');
        this.print(`[OK] Linkki aktivoitu: ${nameA} <---> ${nameB} (${typeName})`, 'success');
    }

    cmdCableDisconnect(args) {
        if (args.length < 2) {
            this.print("Käyttö: cable disconnect <laiteA> <laiteB> (tai 'unlink <A> <B>')", 'error');
            return;
        }

        const nodeA = this.resolveNode(args[0]);
        const nodeB = this.resolveNode(args[1]);

        if (!nodeA || !nodeB) {
            this.print("Virhe: Määritettyjä laitteita ei löydy.", 'error');
            return;
        }

        const cableIdx = cables.findIndex(c => 
            (c.nodeA === nodeA && c.nodeB === nodeB) || 
            (c.nodeB === nodeA && c.nodeA === nodeB)
        );

        if (cableIdx === -1) {
            this.print(`Virhe: Laitteiden ${this.getNodeDisplayName(nodeA)} ja ${this.getNodeDisplayName(nodeB)} välillä ei ole kaapelia.`, 'error');
            return;
        }

        const targetCable = cables[cableIdx];
        if (typeof deleteCable === 'function') {
            deleteCable(targetCable);
        } else {
            if (targetCable.line) scene.remove(targetCable.line);
            cables.splice(cableIdx, 1);
            if (typeof checkConnections === 'function') checkConnections();
        }

        if (typeof audio !== 'undefined') audio.playCableCut();
        if (typeof updateGoalUI === 'function') updateGoalUI();

        const nameA = this.getNodeDisplayName(nodeA);
        const nameB = this.getNodeDisplayName(nodeB);
        this.logSyslog('warning', `Kaapeli poistettu: ${nameA} <-X-> ${nameB}`, 'net_core');
        this.print(`[OK] Kaapeli poistettu väliltä ${nameA} ja ${nameB}.`, 'dim');
    }

    // =========================================================================
    // LAITTEIDEN LUONTI JA POISTO (add / rm)
    // =========================================================================

    cmdSpawn(args) {
        if (args.length === 0) {
            this.print("Käyttö: add <laitetyyppi> [x] [z]", 'error');
            this.print("Tuetut tyypit: switch, core_switch, server, pc, laptop, wifi, firewall", 'dim');
            return;
        }

        const rawType = args[0].toLowerCase().replace('-', '_');
        const allowedTypes = {
            'switch': nodeTypes.SWITCH,
            'lan_switch': nodeTypes.SWITCH,
            'core_switch': nodeTypes.CORE_SWITCH,
            'core': nodeTypes.CORE_SWITCH,
            'server': nodeTypes.SERVER,
            'pc': nodeTypes.PC,
            'workstation': nodeTypes.PC,
            'laptop': nodeTypes.LAPTOP,
            'wifi': nodeTypes.WIFI,
            'ap': nodeTypes.WIFI,
            'firewall': nodeTypes.FIREWALL,
            'printer': nodeTypes.PRINTER,
            'voip': nodeTypes.VOIP
        };

        const targetType = allowedTypes[rawType];
        if (!targetType) {
            this.print(`Virheellinen laitetyyppi '${args[0]}'. Tuetut: switch, core_switch, server, pc, laptop, wifi, firewall`, 'error');
            return;
        }

        // Paikka: joko annettu tai vapaa paikka
        let posX = (args[1] !== undefined) ? parseFloat(args[1]) : 0;
        let posZ = (args[2] !== undefined) ? parseFloat(args[2]) : 0;

        if (isNaN(posX) || isNaN(posZ)) {
            posX = 0;
            posZ = 0;
        }

        // Jos paikkaa ei annettu, lasketaan pieni siirtymä olemassa olevista
        if (args[1] === undefined && typeof nodes !== 'undefined') {
            const count = nodes.length;
            posX = ((count % 5) - 2) * 4;
            posZ = (Math.floor(count / 5) - 1) * 4;
        }

        if (typeof createNode === 'function') {
            const newNode = createNode(targetType, posX, posZ, false);
            const devName = this.getNodeDisplayName(newNode);
            this.logSyslog('info', `Uusi laite lisätty verkkomaailmaan: ${devName} [${targetType.toUpperCase()}] paikkaan (${posX}, ${posZ})`, 'provisioning');
            this.print(`[OK] Laite luotu: ${devName} (${targetType.toUpperCase()}) sijaintiin (${posX.toFixed(1)}, ${posZ.toFixed(1)}).`, 'success');
            if (typeof updateGoalUI === 'function') updateGoalUI();
        } else {
            this.print("Virhe: createNode-funktio ei ole saatavilla.", 'error');
        }
    }

    cmdDelete(args) {
        if (args.length === 0) {
            this.print("Käyttö: rm <laite> (esim. rm Switch-2 tai rm 3)", 'error');
            return;
        }

        const node = this.resolveNode(args[0]);
        if (!node) {
            this.print(`Virhe: Laitetta '${args[0]}' ei löydy. Listaa laitteet: 'devices'.`, 'error');
            return;
        }

        const devName = this.getNodeDisplayName(node);
        if (node.userData.isPredefined && (node.userData.type === nodeTypes.GATEWAY || node.userData.type === nodeTypes.CLOUD)) {
            this.print(`Virhe: Yhdyskäytävää tai Internet-pilveä ei voi poistaa tason arkkitehtuurista!`, 'error');
            return;
        }

        if (this.targetNode === node) {
            this.setTargetNode(null);
        }

        if (typeof deleteNode === 'function') {
            deleteNode(node);
            this.logSyslog('warning', `Laite ${devName} ja sen kaapelilinkit poistettu.`, 'provisioning');
            this.print(`[OK] Laite ${devName} poistettu verkosta.`, 'dim');
            if (typeof checkConnections === 'function') checkConnections();
            if (typeof updateGoalUI === 'function') updateGoalUI();
        } else {
            this.print("Virhe: deleteNode-funktiota ei löydy.", 'error');
        }
    }

    // =========================================================================
    // IP-OSOITTEIDEN KONFIGUROINTI (ip addr add / ip address / ip set)
    // =========================================================================

    /**
     * Moderni Linux iproute2 -syntaksi:
     * ip addr add 192.168.1.15/24 dev eth0
     */
    cmdIpRouteAdd(args) {
        if (args.length === 0 || args[0].toLowerCase() !== 'add') {
            this.print("Käyttö: ip addr add <ip>/<cidr> dev eth0 (esim. ip addr add 192.168.1.10/24 dev eth0)", 'error');
            return;
        }

        const cidrSpec = args[1];
        if (!cidrSpec || !cidrSpec.includes('/')) {
            this.print("Virhe: Ilmoita IP ja CIDR muodossa <ip>/<cidr> (esim. 192.168.1.10/24)", 'error');
            return;
        }

        const [ip, cidrStr] = cidrSpec.split('/');
        const cidr = parseInt(cidrStr, 10);
        if (isNaN(cidr) || cidr < 1 || cidr > 32) {
            this.print("Virhe: Virheellinen CIDR-peite (sallittu /1 - /32)!", 'error');
            return;
        }

        if (typeof calculateSubnetDetails !== 'function') {
            this.print("Virhe: Aliverkkolaskuri ei ole käytettävissä.", 'error');
            return;
        }

        const det = calculateSubnetDetails(ip, cidr);
        const mask = det.mask;

        if (!this.targetNode) {
            this.print("Virhe: Ei valittua laitetta! Valitse ensin laite komennolla 'connect <laite>'.", 'error');
            return;
        }

        this.applyIpConfiguration(this.targetNode, ip, mask);
    }

    /**
     * Nopea suora IP-määritys ilman connect-vaihetta:
     * ip set <laite> <ip> <mask|cidr>
     */
    cmdIpSet(args) {
        if (args.length < 3) {
            this.print("Käyttö: ip set <laite> <ip> <mask | cidr> (esim. ip set PC-1 192.168.1.10 255.255.255.0 tai ip set PC-1 192.168.1.10 /24)", 'error');
            return;
        }

        const node = this.resolveNode(args[0]);
        if (!node) {
            this.print(`Virhe: Laitetta '${args[0]}' ei löydy.`, 'error');
            return;
        }

        const ip = args[1].trim();
        let mask = args[2].trim();

        if (mask.startsWith('/')) {
            const cidr = parseInt(mask.replace('/', ''), 10);
            if (!isNaN(cidr) && typeof calculateSubnetDetails === 'function') {
                mask = calculateSubnetDetails(ip, cidr).mask;
            }
        }

        this.applyIpConfiguration(node, ip, mask);
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
        let mask = args[1].trim();

        if (mask.startsWith('/')) {
            const cidr = parseInt(mask.replace('/', ''), 10);
            if (!isNaN(cidr) && typeof calculateSubnetDetails === 'function') {
                mask = calculateSubnetDetails(ip, cidr).mask;
            }
        }

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
            const ip = args[1].trim();
            const mask = args[3].trim();
            if (!this.targetNode) {
                this.print("Virhe: Ei valittua laitetta! Valitse ensin laite komennolla 'connect <laite>'.", 'error');
                return;
            }
            this.applyIpConfiguration(this.targetNode, ip, mask);
            return;
        }

        this.cmdIpConfig(args);
    }

    applyIpConfiguration(targetNode, ip, mask) {
        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (!ipRegex.test(ip) || !ipRegex.test(mask)) {
            const err = "Virheellinen IP-osoitteen tai peitteen muoto!";
            this.logSyslog('error', err, 'ip_stack');
            this.print(`Virhe: ${err}`, 'error');
            if (typeof audio !== 'undefined') audio.playError();
            return;
        }

        const numMaskParts = mask.split('.').map(Number);
        if (numMaskParts.some(p => p > 255) || ip.split('.').map(Number).some(p => p > 255)) {
            const err = "Oktetti ei voi olla yli 255!";
            this.logSyslog('error', err, 'ip_stack');
            this.print(`Virhe: ${err}`, 'error');
            if (typeof audio !== 'undefined') audio.playError();
            return;
        }

        if (!IP_REQUIRED_TYPES.includes(targetNode.userData.type)) {
            this.print(`Huomautus: Laitetyyppi ${targetNode.userData.type.toUpperCase()} on infrastruktuurisolmu, mutta IP asetettu.`, 'dim');
        }

        // Haetaan laitteen oikea aliverkkoskooppi
        const scope = (typeof getNodeSubnetScope === 'function') ? getNodeSubnetScope(targetNode) : null;
        if (!scope || !scope.details) {
            this.print("Virhe: Tason aliverkkotietoja ei voida lukea.", 'error');
            return;
        }

        const details = scope.details;
        const cidr = scope.cidr;

        if (mask !== details.mask) {
            const err = `Väärä aliverkon peite! /${cidr}-aliverkossa oikea peite on ${details.mask}.`;
            this.logSyslog('error', `IP-määritys hylätty laitteelle ${this.getNodeDisplayName(targetNode)}: ${err}`, 'net_filter');
            this.print(`Virhe: ${err}`, 'error');
            if (typeof audio !== 'undefined') audio.playError();
            return;
        }

        if (cidr < 31 && ip === details.network) {
            const err = `${ip} on aliverkon verkko-osoite (Network ID)! Kaikki isäntäbitit ovat 0.`;
            this.logSyslog('error', err, 'net_filter');
            this.print(`Virhe: ${err}`, 'error');
            if (typeof audio !== 'undefined') audio.playError();
            return;
        }
        if (cidr < 31 && ip === details.broadcast) {
            const err = `${ip} on yleislähetysosoite (Broadcast)! Kaikki isäntäbitit ovat 1.`;
            this.logSyslog('error', err, 'net_filter');
            this.print(`Virhe: ${err}`, 'error');
            if (typeof audio !== 'undefined') audio.playError();
            return;
        }

        const ipL = ip2long(ip);
        const firstL = ip2long(details.firstHost);
        const lastL = ip2long(details.lastHost);

        if (ipL < firstL || ipL > lastL) {
            const err = `IP ${ip} ei kuulu aliverkon sallitulle isäntäalueelle (${details.firstHost} – ${details.lastHost})!`;
            this.logSyslog('error', err, 'net_filter');
            this.print(`Virhe: ${err}`, 'error');
            if (typeof audio !== 'undefined') audio.playError();
            return;
        }

        // Tarkista päällekkäisyys
        const duplicateNode = nodes.find(n =>
            n !== targetNode &&
            n.userData.ip === ip &&
            n.userData.correctIp
        );
        if (duplicateNode) {
            const dupName = this.getNodeDisplayName(duplicateNode);
            const err = `IP ${ip} on jo käytössä toisella laitteella (${dupName})!`;
            this.logSyslog('error', `IP conflict: ${err}`, 'arp_detect');
            this.print(`Virhe: ${err}`, 'error');
            if (typeof audio !== 'undefined') audio.playError();
            return;
        }

        // Palvelin / Tulostin / Työasema säännöt (tasot 11+)
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
                this.logSyslog('error', `Käytäntövirhe: ${ipRuleError}`, 'ccna_policy');
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

        const devName = this.getNodeDisplayName(targetNode);
        this.logSyslog('success', `Interface eth0 on ${devName} up, IP ${ip}/${cidr} assigned`, 'net_core');
        this.print(`[OK] IP-osoite ${ip}/${cidr} asetettu onnistuneesti laitteelle ${devName}!`, 'success');
        if (typeof audio !== 'undefined') audio.playPingSuccess();
    }

    // =========================================================================
    // VERKON TARKISTUS JA LÄPÄISY (verify & submit)
    // =========================================================================

    cmdVerify() {
        if (!currentLevelConfig) {
            this.print("Ei aktiivista tasoa.", 'dim');
            return;
        }

        if (typeof checkConnections === 'function') checkConnections();

        this.print(`\n--- VERKON DIAGNOSTIIKKA: TASO ${currentLevelConfig.id} (${currentLevelConfig.name}) ---`, 'accent');

        const totalNodes = nodes.length;
        const totalCables = cables.length;
        const requiredNodes = nodes.filter(n => n.userData.isPredefined && IP_REQUIRED_TYPES.includes(n.userData.type));
        const readyNodes = requiredNodes.filter(n => n.userData.isConnected && n.userData.correctIp);
        const unlinkedNodes = nodes.filter(n => !n.userData.isConnected && n.userData.type !== nodeTypes.CLOUD);

        this.print(`  Fyysiset laitteet   : ${totalNodes} kpl`);
        this.print(`  Kaapelilinkit       : ${totalCables} kpl`);
        this.print(`  Päätelaitteiden IP  : ${readyNodes.length} / ${requiredNodes.length} valmiina`);

        let hasIssues = false;

        // Tarkista irtonaiset laitteet
        if (unlinkedNodes.length > 0) {
            hasIssues = true;
            this.print(`\n  ⚠️  Kytkemättömät laitteet (ei yhteyttä ytimeen):`, 'warning');
            unlinkedNodes.forEach(n => {
                this.print(`     - ${this.getNodeDisplayName(n)} [${n.userData.type.toUpperCase()}]`);
            });
            this.print(`     -> Kytke laite komennolla 'cable connect <laite> <kytkin>'.`, 'dim');
        }

        // Tarkista puuttuvat tai virheelliset IP:t
        const missingIps = requiredNodes.filter(n => !n.userData.correctIp);
        if (missingIps.length > 0) {
            hasIssues = true;
            this.print(`\n  ⚠️  Puuttuvat tai virheelliset IP-osoitteet:`, 'warning');
            missingIps.forEach(n => {
                const curIp = n.userData.ip || 'MÄÄRITTÄMÄTÖN';
                this.print(`     - ${this.getNodeDisplayName(n)}: nykyinen IP [${curIp}]`);
            });
            this.print(`     -> Aseta IP komennolla 'ip set <laite> <ip> <peite>'.`, 'dim');
        }

        if (!hasIssues && readyNodes.length === requiredNodes.length && requiredNodes.length > 0) {
            this.print(`\n  ✅ 100% VALMIS! Kaikki kaapelit, hierarkiat ja IP-osoitteet ovat kunnossa.`, 'success');
            this.print(`  Kirjoita 'submit' suorittaaksesi tason ja siirtyäksesi eteenpäin!`, 'accent');
        } else {
            this.print(`\n  Status: KESKENERÄINEN. Korjaa yllä luetellut puutteet.`, 'error');
        }
    }

    cmdSubmit() {
        if (typeof updateGoalUI === 'function') {
            updateGoalUI();
        }

        const requiredNodes = nodes.filter(n => n.userData.isPredefined && IP_REQUIRED_TYPES.includes(n.userData.type));
        const readyNodes = requiredNodes.filter(n => n.userData.isConnected && n.userData.correctIp);
        const unlinkedNodes = nodes.filter(n => !n.userData.isConnected && n.userData.type !== nodeTypes.CLOUD);

        if (unlinkedNodes.length === 0 && readyNodes.length === requiredNodes.length && requiredNodes.length > 0) {
            this.logSyslog('success', `TASO ${currentLevelConfig ? currentLevelConfig.id : ''} LÄPÄISTY! Verkon topologia validoitu.`, 'evaluator');
            this.print(`\n🎉 ONNITTELUT! Taso suoritettu onnistuneesti komentoriviltä!`, 'success');
            this.print(`Siirry seuraavaan tasoon komennolla 'next'.`, 'accent');

            const winModal = document.getElementById('win-modal');
            if (winModal) {
                winModal.classList.remove('hidden');
                if (typeof audio !== 'undefined') audio.playVictory();
            }
        } else {
            this.print("\n❌ Tasoa ei voida suorittaa: verkossa on vielä puutteita!", 'error');
            this.cmdVerify();
        }
    }

    cmdNextLevel() {
        if (typeof nextLevel === 'function') {
            this.print("Ladataan seuraavaa tasoa...", 'accent');
            nextLevel();
        } else {
            this.print("Virhe: nextLevel-funktiota ei löydy.", 'error');
        }
    }

    cmdLoadLevel(args) {
        if (args.length === 0) {
            this.print(`Nykyinen taso: ${currentLevel}. Vaihda ajamalla 'level <nro>'.`, 'dim');
            return;
        }
        const lvlNum = parseInt(args[0], 10);
        if (isNaN(lvlNum) || lvlNum < 1 || (typeof TOTAL_LEVELS !== 'undefined' && lvlNum > TOTAL_LEVELS)) {
            this.print(`Virheellinen tason numero. Valitse 1 - ${typeof TOTAL_LEVELS !== 'undefined' ? TOTAL_LEVELS : 61}.`, 'error');
            return;
        }

        if (typeof loadLevel === 'function') {
            this.print(`Ladataan taso ${lvlNum}...`, 'accent');
            loadLevel(lvlNum);
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

    // =========================================================================
    // DIAGNOSTIIKKA, PING & SHOW-KOMENNOT
    // =========================================================================

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

        this.print("\nVinkki: Valitse laite komennolla 'connect <laite>' tai aseta IP: 'ip set <laite> <ip> <peite>'.", 'dim');
    }

    cmdConnect(args) {
        if (args.length === 0) {
            this.print("Käyttö: connect <laitteen-nimi tai numero> (esim. connect PC-1 tai connect 2)", 'error');
            return;
        }

        const foundNode = this.resolveNode(args[0]);

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
            this.print(`Konfiguroi IP komennolla: 'ip addr add <ip>/<cidr> dev eth0' tai 'ip address <ip> <mask>'`, 'accent');
        } else {
            this.print(`Tämä laite toimii infrastruktuurisolmuna (ei vaadi päätelaite-IP:tä).`, 'dim');
        }
    }

    cmdExit() {
        if (!this.targetNode) {
            this.toggle(); // Sulkee terminaalin
            return;
        }

        const prev = this.getNodeDisplayName(this.targetNode);
        this.setTargetNode(null);
        this.print(`Suljettiin CLI-yhteys laitteeseen ${prev}. Palattiin pääkonsoliin.`, 'dim');
    }

    cmdHostname(args) {
        if (!this.targetNode) {
            this.print("Console Root: subnet-server-gw", 'normal');
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
        } else if (sub.includes('cable') || sub.includes('link')) {
            this.cmdCables();
        } else {
            this.print(`Tuntematon show-komento: 'show ${args.join(' ')}'`, 'error');
            this.print("Tuetut: show ip interface brief, show ip route, show cdp neighbors, show cables", 'dim');
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
            const linkType = c.linkType === LINK_TYPES.FIBER_10G ? '10G Fiber' : '1G Copper';
            const cap = [nodeTypes.SWITCH, nodeTypes.CORE_SWITCH].includes(c.nodeB.userData.type) ? 'S I' : 'H';
            this.print(`${devB.padEnd(16, ' ')} Gi0/${idx + 1}           148        ${cap.padEnd(11, ' ')} SubnetOS  Eth0/1 (${linkType})`);
        });
    }

    cmdPing(args) {
        if (args.length === 0) {
            this.print("Käyttö: ping <ip-osoite tai laitteen nimi>", 'error');
            return;
        }

        const targetNode = this.resolveNode(args[0]);
        const sourceNode = this.targetNode || (typeof selectedNodeForIp !== 'undefined' ? selectedNodeForIp : null) || nodes.find(n => [nodeTypes.PC, nodeTypes.LAPTOP, nodeTypes.OFFICE, nodeTypes.SERVER].includes(n.userData.type)) || nodes[0];

        if (!sourceNode) {
            this.print("Virhe: Lähtölaitetta ei löydy.", 'error');
            return;
        }

        const targetIp = targetNode ? (targetNode.userData.ip || (targetNode.userData.type === nodeTypes.CLOUD ? "8.8.8.8" : "192.168.1.1")) : args[0];
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

        const sourceNode = this.targetNode || (typeof selectedNodeForIp !== 'undefined' ? selectedNodeForIp : null) || nodes.find(n => [nodeTypes.PC, nodeTypes.LAPTOP, nodeTypes.OFFICE].includes(n.userData.type)) || nodes[0];
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
}

// Globaali terminaali-instanssi
const terminal = new CyberTerminal();
if (typeof window !== 'undefined') {
    window.terminal = terminal;
    window.addEventListener('DOMContentLoaded', () => terminal.init());
}
