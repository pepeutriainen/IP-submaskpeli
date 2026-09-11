// --- Subnet Architect – Full Teaching -opetusjärjestelmä ---
// Kattavat, pedagogiset suomenkieliset opetusmoduulit kaikille 61 tasolle.
// Sisältää teorian, bittilaskennan, lohkokaavat, konkreettiset esimerkit ja CCNA-tason pro-vinkit.

/**
 * TEACHING_PART_1 - Kattava ja syvällinen suomenkielinen Full Teaching -opetusmateriaali
 * Aiheet:
 * - ip_basics
 * - slash24
 * - slash25
 * - slash26
 * - slash27
 * - slash28
 * - slash29
 * - slash30
 *
 * Jokainen funktio palauttaa tyylitellyn HTML-merkkijonon ja kutsuu lopussa ${subnetBlock(details, cidr)}.
 */

if (typeof subnetBlock === 'undefined') {
    var subnetBlock = function(details, cidr) {
        if (typeof window !== 'undefined' && typeof window.subnetBlock === 'function') {
            return window.subnetBlock(details, cidr);
        }
        return '';
    };
}

const TEACHING_PART_1 = {
    // -------------------------------------------------------------------------
    // 1. IP_BASICS
    // -------------------------------------------------------------------------
    ip_basics: (details, cidr) => `
        <div class="space-y-3">
            <!-- 1. Pääotsikko ja reaalimaailman teoria -->
            <div class="bg-slate-800/90 p-4 rounded-xl border border-slate-600 shadow-md">
                <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                        IP-PERUSTEET & ANATOMIA
                    </span>
                    <span class="text-xs font-mono text-slate-400">IPv4 / 32 bittiä</span>
                </div>
                <h4 class="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                    🌐 Mikä on IP-osoite ja Aliverkon peite?
                </h4>
                <p class="text-slate-300 text-xs leading-relaxed mb-2.5">
                    IPv4-osoite on <strong class="text-white">32-bittinen looginen tunniste</strong>, joka jaetaan neljään 8-bittiseen tavuun eli <em class="text-cyan-300">oktettiin</em> (esim. <span class="font-mono text-cyan-300">192.168.1.10</span>). Pelkkä IP-osoite ei kuitenkaan yksinään kerro, mitkä laitteet ovat samassa paikallisverkossa!
                </p>
                <p class="text-slate-300 text-xs leading-relaxed mb-2.5">
                    Tähän tarvitaan <strong class="text-amber-300">Aliverkon peite (Subnet Mask)</strong>. Se toimii suodattimena, joka jakaa 32 bittiä kahteen osaan:
                    <span class="text-cyan-300 font-semibold">Verkko-osaan (Network ID)</span>, joka kertoo mihin aliverkkoon kuulutaan, ja 
                    <span class="text-emerald-300 font-semibold">Isäntäosaan (Host ID)</span>, joka yksilöi kyseisen aliverkon sisällä olevan laitteen.
                </p>
                <div class="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/60 text-xs text-slate-300">
                    <strong class="text-amber-300">🌍 Reaalimaailman käyttökohde:</strong>
                    Ajattele IP-osoitetta katuosoitteena: Verkko-osa on kadun nimi (kaikilla naapureilla sama) ja Isäntäosa on talon numero. Kytkin (Switch) välittää paketit suoraan saman kadun asukkaiden välillä, mutta toiselle kadulle tai ulkomaille (Internet) mentäessä tarvitaan aina alueen oletusyhdyskäytävä eli <strong class="text-white">Default Gateway (Reititin)</strong>.
                </div>
            </div>

            <!-- 2. Matematiikka ja laskukaavat -->
            <div class="bg-slate-850 p-4 rounded-xl border border-indigo-500/30 shadow-md space-y-2.5">
                <h5 class="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span>📐</span> Matematiikka ja laskukaavat
                </h5>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">1. Bittijako (32 bittiä)</span>
                        <span class="font-mono text-cyan-300 font-bold text-xs">Isäntäbitit = 32 − CIDR</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Prefiksi /${cidr} varaa ${cidr} bittiä verkolle ja ${32 - cidr} bittiä laitteille.</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">2. Lohkokoko (Block Size)</span>
                        <span class="font-mono text-amber-300 font-bold text-xs">Lohko = 2^(Isäntäbitit)</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Kertoo aliverkon osoitteiden kokonaismäärän (mukaan lukien verkko- ja broadcast-osoite).</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">3. Taikanumero & Peite</span>
                        <span class="font-mono text-emerald-300 font-bold text-xs">Peiteoktetti = 256 − Lohko</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Täydet tavut ovat 255 ja jaetun tavun arvo saadaan vähentämällä lohkokoko luvusta 256.</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">4. Verkko-osoite & Yleislähetys</span>
                        <span class="font-mono text-purple-300 font-bold text-xs">Verkko = .0 | Broadcast = .Lohko−1</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Ensimmäinen osoite edustaa verkkoa, viimeinen on yleislähetys (Broadcast).</span>
                    </div>
                </div>
            </div>

            <!-- 3. Havainnollinen malliesimerkki -->
            <div class="bg-slate-900/95 p-3.5 rounded-xl border border-cyan-500/30 text-xs space-y-2">
                <div class="font-bold text-cyan-300 text-xs flex items-center gap-1.5">
                    <span>💡</span> Havainnollinen malliesimerkki: IP 192.168.1.15 /24
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
                    <div class="bg-slate-800 p-2 rounded border border-slate-700">
                        <span class="text-slate-400 block text-[10px]">Verkko-osoite</span>
                        <span class="text-cyan-300 font-bold">192.168.1.0</span>
                    </div>
                    <div class="bg-slate-800 p-2 rounded border border-slate-700">
                        <span class="text-slate-400 block text-[10px]">Default Gateway</span>
                        <span class="text-emerald-300 font-bold">192.168.1.1</span>
                    </div>
                    <div class="bg-slate-800 p-2 rounded border border-slate-700">
                        <span class="text-slate-400 block text-[10px]">Sallitut isännät</span>
                        <span class="text-slate-200">.1 – .254</span>
                    </div>
                    <div class="bg-slate-800 p-2 rounded border border-slate-700">
                        <span class="text-slate-400 block text-[10px]">Broadcast</span>
                        <span class="text-rose-300 font-bold">192.168.1.255</span>
                    </div>
                </div>
                <p class="text-slate-400 text-[11px] leading-relaxed">
                    Käytettävissä olevat laiteosoitteet saadaan aina kaavalla <strong class="text-white">2^H − 2</strong>, koska verkon ensimmäistä ja viimeistä osoitetta ei saa koskaan antaa laitteelle.
                </p>
            </div>

            <!-- 4. Pro-vinkki / Insinöörin käytäntö -->
            <div class="bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/40 text-xs text-emerald-200/90 leading-relaxed flex items-start gap-2.5">
                <span class="text-base leading-none">🛡️</span>
                <div>
                    <strong class="text-emerald-300 block mb-0.5">Pro-vinkki / Insinöörin käytäntö:</strong>
                    Verkkosuunnittelussa aliverkon ensimmäinen käyttökelpoinen osoite (kuten <span class="font-mono font-bold text-white">.1</span> tai lohkon alin host-osoite) varataan lähes poikkeuksetta reitittimen oletusyhdyskäytävälle (Default Gateway). Älä koskaan yritä konfiguroida päätelaitteelle verkon tunnisteena toimivaa verkko-osoitetta (Network ID) tai broadcast-osoitetta — käyttöjärjestelmät (Windows, Linux, macOS) hylkäävät ne suoraan virheellisinä!
                </div>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // -------------------------------------------------------------------------
    // 2. SLASH24 (/24)
    // -------------------------------------------------------------------------
    slash24: (details, cidr) => `
        <div class="space-y-3">
            <!-- 1. Pääotsikko ja reaalimaailman teoria -->
            <div class="bg-slate-800/90 p-4 rounded-xl border border-slate-600 shadow-md">
                <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                        LUOKKA C / STANDARDIVERKKO
                    </span>
                    <span class="text-xs font-mono text-cyan-300 font-bold">/24 (255.255.255.0)</span>
                </div>
                <h4 class="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                    🏢 /24 – Toimisto- ja kotiverkkojen selkäranka
                </h4>
                <p class="text-slate-300 text-xs leading-relaxed mb-2.5">
                    CIDR-prefiksi <strong class="text-cyan-300">/24</strong> on maailman yleisin aliverkkokoko. Se tarkoittaa, että tarkalleen <strong class="text-white">24 ensimmäistä bittiä</strong> (kolme ensimmäistä tavua) on lukittu verkon tunnisteeksi, ja viimeinen 8 bitin oktetti on kokonaisuudessaan varattu isäntälaitteille.
                </p>
                <div class="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/60 text-xs text-slate-300">
                    <strong class="text-amber-300">🌍 Reaalimaailman käyttökohde:</strong>
                    Lähes jokainen kodin WiFi-reititin, pienyrityksen toimistoverkko ja koululuokka käyttää /24-aliverkkoa (esim. <span class="font-mono text-white">192.168.1.0/24</span>). Se tarjoaa tilaa jopa 254 yhtäaikaiselle laitteelle ilman tarvetta monimutkaiselle aliverkkojen reititykselle.
                </div>
            </div>

            <!-- 2. Matematiikka ja laskukaavat -->
            <div class="bg-slate-850 p-4 rounded-xl border border-indigo-500/30 shadow-md space-y-2.5">
                <h5 class="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span>📐</span> /24 Matematiikka ja laskukaavat
                </h5>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">1. Bittijako</span>
                        <span class="font-mono text-cyan-300 font-bold text-xs">Verkko: 24 | Isännät: 32 − 24 = 8</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Koko 4. oktetti (8 bittiä) on isäntien käytössä.</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">2. Lohkokoko (Block Size)</span>
                        <span class="font-mono text-amber-300 font-bold text-xs">2^8 = 256 osoitetta</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Käyttökelpoisia isäntiä: 256 − 2 = 254 kpl.</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">3. Taikanumero & Peite</span>
                        <span class="font-mono text-emerald-300 font-bold text-xs">256 − 256 = 0 $\rightarrow$ 255.255.255.0</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">3 täyttä tavua (255.255.255) ja 4. tavu on 0.</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">4. Verkko & Broadcast</span>
                        <span class="font-mono text-purple-300 font-bold text-xs">Verkko: .0 | Broadcast: .255</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Alkaa aina nollasta ja päättyy arvoon 255.</span>
                    </div>
                </div>
            </div>

            <!-- 3. Havainnollinen malliesimerkki -->
            <div class="bg-slate-900/95 p-3.5 rounded-xl border border-cyan-500/30 text-xs space-y-2">
                <div class="font-bold text-cyan-300 text-xs flex items-center gap-1.5">
                    <span>💡</span> Havainnollinen malliesimerkki: Verkko 192.168.10.0/24
                </div>
                <div class="p-2.5 bg-slate-800/90 rounded border border-slate-700 space-y-1 font-mono text-[11px]">
                    <div class="flex justify-between"><span class="text-slate-400">Kohdeverkko (Network ID):</span><span class="text-cyan-300 font-bold">192.168.10.0</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Aliverkon peite:</span><span class="text-emerald-300 font-bold">255.255.255.0</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Ensimmäinen laite (Default Gateway):</span><span class="text-amber-300 font-bold">192.168.10.1</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Käytettävä osoiteväli:</span><span class="text-white">192.168.10.1 – 192.168.10.254</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Yleislähetys (Broadcast):</span><span class="text-rose-300 font-bold">192.168.10.255</span></div>
                </div>
            </div>

            <!-- 4. Pro-vinkki / Insinöörin käytäntö -->
            <div class="bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/40 text-xs text-emerald-200/90 leading-relaxed flex items-start gap-2.5">
                <span class="text-base leading-none">🛡️</span>
                <div>
                    <strong class="text-emerald-300 block mb-0.5">Pro-vinkki / Insinöörin osoitepolitiikka:</strong>
                    Ammattimaisessa /24-verkossa osoitteet lohkotaan selkeisiin vyöhykkeisiin:
                    <strong class="text-white">.1</strong> = Reititin / Gateway, 
                    <strong class="text-white">.2–.19</strong> = Kytkimet ja tukiasemat (hallinta-IP:t), 
                    <strong class="text-white">.20–.49</strong> = Palvelimet ja verkkotulostimet (Static IP), 
                    <strong class="text-white">.50–.200</strong> = DHCP-dynaaminen jako tietokoneille ja puhelimille, 
                    <strong class="text-white">.201–.254</strong> = Varalla / VPN-etäkäyttäjät.
                </div>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // -------------------------------------------------------------------------
    // 3. SLASH25 (/25)
    // -------------------------------------------------------------------------
    slash25: (details, cidr) => `
        <div class="space-y-3">
            <!-- 1. Pääotsikko ja reaalimaailman teoria -->
            <div class="bg-slate-800/90 p-4 rounded-xl border border-slate-600 shadow-md">
                <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                        ALIVERKON PUOLITUS
                    </span>
                    <span class="text-xs font-mono text-cyan-300 font-bold">/25 (255.255.255.128)</span>
                </div>
                <h4 class="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                    ✂️ /25 – Yhden verkon jakaminen kahteen osaan
                </h4>
                <p class="text-slate-300 text-xs leading-relaxed mb-2.5">
                    Kun prefiksi kasvaa /24 $\rightarrow$ <strong class="text-cyan-300">/25</strong>, lainataan <strong class="text-white">yksi bitti</strong> neljännen oktetin alusta verkolle. Yksi bitti voi olla joko 0 tai 1, joten perinteinen 256 osoitteen avaruus leikkautuu tarkalleen kahteen 128 osoitteen itsenäiseen aliverkkoon!
                </p>
                <div class="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/60 text-xs text-slate-300">
                    <strong class="text-amber-300">🌍 Reaalimaailman käyttökohde:</strong>
                    Kun yrityksellä on yksi julkinen tai sisäinen /24-verkko, mutta se haluaa eristää esimerkiksi <em>Toimiston henkilökunnan</em> ja <em>Vierailija-WiFin</em> toisistaan omiksi tietoturvavyöhykkeikseen. Kumpikaan ei kuule toistensa broadcast-liikennettä.
                </div>
            </div>

            <!-- 2. Matematiikka ja laskukaavat -->
            <div class="bg-slate-850 p-4 rounded-xl border border-indigo-500/30 shadow-md space-y-2.5">
                <h5 class="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span>📐</span> /25 Matematiikka ja laskukaavat
                </h5>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">1. Bittijako</span>
                        <span class="font-mono text-cyan-300 font-bold text-xs">Verkko: 25 | Isännät: 32 − 25 = 7</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">4. oktetti binäärinä: 10000000 = 128 verkolle.</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">2. Lohkokoko (Block Size)</span>
                        <span class="font-mono text-amber-300 font-bold text-xs">2^7 = 128 osoitetta</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Käyttökelpoisia isäntiä per lohko: 128 − 2 = 126 kpl.</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">3. Taikanumero & Peite</span>
                        <span class="font-mono text-emerald-300 font-bold text-xs">256 − 128 = 128 $\rightarrow$ 255.255.255.128</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Peitteen viimeinen oktetti on tasan 128.</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">4. Kaksi syntyvää lohkoa</span>
                        <span class="font-mono text-purple-300 font-bold text-xs">Lohko A: .0 | Lohko B: .128</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Lohkojen verkko-osoitteet kasvavat 128:n askelin.</span>
                    </div>
                </div>
            </div>

            <!-- 3. Havainnollinen malliesimerkki -->
            <div class="bg-slate-900/95 p-3.5 rounded-xl border border-cyan-500/30 text-xs space-y-2">
                <div class="font-bold text-cyan-300 text-xs flex items-center gap-1.5">
                    <span>💡</span> Havainnollinen malliesimerkki: Lohkot verkossa 192.168.1.0/24
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
                    <div class="p-2.5 bg-slate-800 rounded border border-slate-700 space-y-1">
                        <span class="text-amber-300 font-bold block text-xs">1. Aliverkko (Toimisto) .0/25</span>
                        <div class="text-slate-300">Verkko: <span class="text-cyan-300">192.168.1.0</span></div>
                        <div class="text-slate-300">Gateway: <span class="text-emerald-300">192.168.1.1</span></div>
                        <div class="text-slate-300">Laitteet: <span class="text-white">.1 – .126</span></div>
                        <div class="text-slate-300">Broadcast: <span class="text-rose-300 font-bold">192.168.1.127</span></div>
                    </div>
                    <div class="p-2.5 bg-slate-800 rounded border border-slate-700 space-y-1">
                        <span class="text-amber-300 font-bold block text-xs">2. Aliverkko (Vieraat) .128/25</span>
                        <div class="text-slate-300">Verkko: <span class="text-cyan-300">192.168.1.128</span></div>
                        <div class="text-slate-300">Gateway: <span class="text-emerald-300">192.168.1.129</span></div>
                        <div class="text-slate-300">Laitteet: <span class="text-white">.129 – .254</span></div>
                        <div class="text-slate-300">Broadcast: <span class="text-rose-300 font-bold">192.168.1.255</span></div>
                    </div>
                </div>
            </div>

            <!-- 4. Pro-vinkki / Insinöörin käytäntö -->
            <div class="bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/40 text-xs text-emerald-200/90 leading-relaxed flex items-start gap-2.5">
                <span class="text-base leading-none">🛡️</span>
                <div>
                    <strong class="text-emerald-300 block mb-0.5">Pro-vinkki / Sudenkuoppa osoitteissa .127 ja .128:</strong>
                    Aloittelijat tekevät usein virheen ja yrittävät asettaa laitteelle IP:n <span class="font-mono text-white font-bold">.127</span> tai <span class="font-mono text-white font-bold">.128</span>. Muista: <strong>.127</strong> on ensimmäisen puolikkaan Yleislähetys (Broadcast), ja <strong>.128</strong> on toisen puolikkaan Verkko-osoite (Network ID)! Kumpaakaan ei saa antaa päätelaitteelle. Toisen puolikkaan reititin on <span class="font-mono text-cyan-300 font-bold">.129</span>.
                </div>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // -------------------------------------------------------------------------
    // 4. SLASH26 (/26)
    // -------------------------------------------------------------------------
    slash26: (details, cidr) => `
        <div class="space-y-3">
            <!-- 1. Pääotsikko ja reaalimaailman teoria -->
            <div class="bg-slate-800/90 p-4 rounded-xl border border-slate-600 shadow-md">
                <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                        NELJÄN LOHKON JAKO
                    </span>
                    <span class="text-xs font-mono text-cyan-300 font-bold">/26 (255.255.255.192)</span>
                </div>
                <h4 class="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                    🗂️ /26 – Kvarttijako osastoverkoille
                </h4>
                <p class="text-slate-300 text-xs leading-relaxed mb-2.5">
                    Prefiksissä <strong class="text-cyan-300">/26</strong> verkolle on lainattu <strong class="text-white">2 bittiä</strong> neljännestä oktetista ($2^2 = 4$ aliverkkoa). Jokaiseen aliverkkoon jää $32 - 26 = 6$ bittiä, mikä luo tasan <strong class="text-amber-300">64 osoitteen lohkot</strong>.
                </p>
                <div class="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/60 text-xs text-slate-300">
                    <strong class="text-amber-300">🌍 Reaalimaailman käyttökohde:</strong>
                    Ihanteellinen yrityksen perusosastoille: <em>Talous, Tuotekehitys, Myynti ja HR</em> saavat kukin oman /26-verkkonsa samasta C-luokasta. Jokainen osasto mahtuu kasvamaan 62 laitteeseen asti, ja L3-kytkin eristää osastojen tietoliikenteen toisistaan.
                </div>
            </div>

            <!-- 2. Matematiikka ja laskukaavat -->
            <div class="bg-slate-850 p-4 rounded-xl border border-indigo-500/30 shadow-md space-y-2.5">
                <h5 class="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span>📐</span> /26 Matematiikka ja laskukaavat
                </h5>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">1. Bittijako</span>
                        <span class="font-mono text-cyan-300 font-bold text-xs">Verkko: 26 | Isännät: 32 − 26 = 6</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Lainatut bitit binäärinä: 11000000 = 128 + 64 = 192.</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">2. Lohkokoko (Block Size)</span>
                        <span class="font-mono text-amber-300 font-bold text-xs">2^6 = 64 osoitetta</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Käyttökelpoiset isännät: 64 − 2 = 62 laitetta per verkko.</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">3. Taikanumero & Peite</span>
                        <span class="font-mono text-emerald-300 font-bold text-xs">256 − 64 = 192 $\rightarrow$ 255.255.255.192</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Aliverkon peitteen viimeinen oktetti on 192.</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">4. Neljä lohkorajaa</span>
                        <span class="font-mono text-purple-300 font-bold text-xs">.0, .64, .128, .192</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Verkko-osoitteet ovat aina 64:n monikertoja.</span>
                    </div>
                </div>
            </div>

            <!-- 3. Havainnollinen malliesimerkki -->
            <div class="bg-slate-900/95 p-3.5 rounded-xl border border-cyan-500/30 text-xs space-y-2">
                <div class="font-bold text-cyan-300 text-xs flex items-center gap-1.5">
                    <span>💡</span> Miten selvität mihin lohkoon annettu IP kuuluu?
                </div>
                <p class="text-slate-300 text-xs leading-relaxed mb-1">
                    Jos saat konfiguroitavaksi IP:n <span class="font-mono text-cyan-300 font-bold">192.168.1.85 /26</span>:
                </p>
                <ol class="list-decimal list-inside space-y-1 text-slate-300 text-xs font-mono">
                    <li>Käy läpi 64:n lohkot: <span class="text-slate-400">0...63</span>, <span class="text-amber-300 font-bold">64...127</span>, <span class="text-slate-400">128...191</span>, <span class="text-slate-400">192...255</span>.</li>
                    <li>Luku 85 osuu toiseen lohkoon (<span class="text-amber-300 font-bold">64 – 127</span>).</li>
                    <li><strong class="text-white font-sans">Verkko-osoite:</strong> <span class="text-cyan-300">192.168.1.64</span></li>
                    <li><strong class="text-white font-sans">Yleislähetys (Broadcast):</strong> <span class="text-rose-300">192.168.1.127</span> (64 + 64 − 1)</li>
                    <li><strong class="text-white font-sans">Käytettävät isännät:</strong> <span class="text-emerald-300">192.168.1.65 – 192.168.1.126</span></li>
                </ol>
            </div>

            <!-- 4. Pro-vinkki / Insinöörin käytäntö -->
            <div class="bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/40 text-xs text-emerald-200/90 leading-relaxed flex items-start gap-2.5">
                <span class="text-base leading-none">🛡️</span>
                <div>
                    <strong class="text-emerald-300 block mb-0.5">Pro-vinkki / Insinöörin 64-muistisääntö:</strong>
                    Opettele ulkoa 64:n kertotaulu: <span class="font-mono font-bold text-white">0, 64, 128, 192</span>. Nämä ovat ainoat mahdolliset /26-aliverkkojen aloitusosoitteet 4. oktetissa. Default Gateway on aina lohkon ensimmäinen osoite (.1, .65, .129, .193) ja kytkimen hallinta-IP sijoitetaan usein lohkon viimeiseen käyttökelpoiseen osoitteeseen (.62, .126, .190, .254).
                </div>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // -------------------------------------------------------------------------
    // 5. SLASH27 (/27)
    // -------------------------------------------------------------------------
    slash27: (details, cidr) => `
        <div class="space-y-3">
            <!-- 1. Pääotsikko ja reaalimaailman teoria -->
            <div class="bg-slate-800/90 p-4 rounded-xl border border-slate-600 shadow-md">
                <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                        KAHDEKSAN LOHKON JAKO
                    </span>
                    <span class="text-xs font-mono text-cyan-300 font-bold">/27 (255.255.255.224)</span>
                </div>
                <h4 class="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                    🏢 /27 – Tiimien ja palvelintilojen aliverkko
                </h4>
                <p class="text-slate-300 text-xs leading-relaxed mb-2.5">
                    CIDR-prefiksin <strong class="text-cyan-300">/27</strong> myötä verkolle varataan <strong class="text-white">3 bittiä</strong> neljännestä oktetista ($2^3 = 8$ aliverkkoa). Isännille jää $32 - 27 = 5$ bittiä, jolloin yhden lohkon koko on tarkalleen <strong class="text-amber-300">32 osoitetta</strong>.
                </p>
                <div class="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/60 text-xs text-slate-300">
                    <strong class="text-amber-300">🌍 Reaalimaailman käyttökohde:</strong>
                    Yleisin valinta räkkikohtaisiin palvelintiloihin, valvontakameroille (CCTV), neuvotteluhuoneiden AV-laitteille ja 15–25 hengen projektitiimeille. /27 tarjoaa 30 käyttökelpoista laiteosoitetta – juuri tarpeeksi ilman IP-osoitteiden haaskausta.
                </div>
            </div>

            <!-- 2. Matematiikka ja laskukaavat -->
            <div class="bg-slate-850 p-4 rounded-xl border border-indigo-500/30 shadow-md space-y-2.5">
                <h5 class="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span>📐</span> /27 Matematiikka ja laskukaavat
                </h5>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">1. Bittijako</span>
                        <span class="font-mono text-cyan-300 font-bold text-xs">Verkko: 27 | Isännät: 32 − 27 = 5</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Binääri: 11100000 = 128 + 64 + 32 = 224.</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">2. Lohkokoko (Block Size)</span>
                        <span class="font-mono text-amber-300 font-bold text-xs">2^5 = 32 osoitetta</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Käyttökelpoisia isäntiä: 32 − 2 = 30 laitetta per lohko.</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">3. Taikanumero & Peite</span>
                        <span class="font-mono text-emerald-300 font-bold text-xs">256 − 32 = 224 $\rightarrow$ 255.255.255.224</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Peitteen jaettu oktetti on aina 224.</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">4. Kahdeksan lohkorajaa</span>
                        <span class="font-mono text-purple-300 font-bold text-xs">.0, .32, .64, .96, .128, .160, .192, .224</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Verkko-osoitteet kasvavat aina +32 kerrallaan.</span>
                    </div>
                </div>
            </div>

            <!-- 3. Havainnollinen malliesimerkki -->
            <div class="bg-slate-900/95 p-3.5 rounded-xl border border-cyan-500/30 text-xs space-y-2">
                <div class="font-bold text-cyan-300 text-xs flex items-center gap-1.5">
                    <span>💡</span> Havainnollinen malliesimerkki: Verkko 172.16.5.96 /27
                </div>
                <div class="p-2.5 bg-slate-800/90 rounded border border-slate-700 space-y-1 font-mono text-[11px]">
                    <div class="flex justify-between"><span class="text-slate-400">Verkko-osoite (Network ID):</span><span class="text-cyan-300 font-bold">172.16.5.96</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Aliverkon peite:</span><span class="text-emerald-300 font-bold">255.255.255.224</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Oletusyhdyskäytävä (Gateway):</span><span class="text-amber-300 font-bold">172.16.5.97</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Sallittu isäntäväli:</span><span class="text-white">172.16.5.97 – 172.16.5.126</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Broadcast (seuraava lohko − 1):</span><span class="text-rose-300 font-bold">172.16.5.127</span> <span class="text-slate-400 text-[10px] font-sans">(96 + 32 − 1)</span></div>
                </div>
            </div>

            <!-- 4. Pro-vinkki / Insinöörin käytäntö -->
            <div class="bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/40 text-xs text-emerald-200/90 leading-relaxed flex items-start gap-2.5">
                <span class="text-base leading-none">🛡️</span>
                <div>
                    <strong class="text-emerald-300 block mb-0.5">Pro-vinkki / Turvallinen mikrosegmentointi:</strong>
                    Tietoturva-arkkitehtuurissa suositaan /27-verkkoja laajojen /24-verkkojen sijaan, koska se rajoittaa haittaohjelmien ja skannereiden leviämistä (Blast Radius). Jos työasema saastuu, se pystyy suoraan häiritsemään vain oman 30 laitteen lohkonsa koneita; kaikki muu liikenne pakotetaan kulkemaan palomuurin läpi!
                </div>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // -------------------------------------------------------------------------
    // 6. SLASH28 (/28)
    // -------------------------------------------------------------------------
    slash28: (details, cidr) => `
        <div class="space-y-3">
            <!-- 1. Pääotsikko ja reaalimaailman teoria -->
            <div class="bg-slate-800/90 p-4 rounded-xl border border-slate-600 shadow-md">
                <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                        16 OSOITTEEN MIKROLOHKO
                    </span>
                    <span class="text-xs font-mono text-cyan-300 font-bold">/28 (255.255.255.240)</span>
                </div>
                <h4 class="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                    🔒 /28 – Pienryhmät, DMZ ja tulostinverkot
                </h4>
                <p class="text-slate-300 text-xs leading-relaxed mb-2.5">
                    Prefiksissä <strong class="text-cyan-300">/28</strong> verkkobittejä on jo 28 kappaletta ja isännille jää vain <strong class="text-white">4 bittiä</strong> ($32 - 28 = 4$). Tämä luo tiiviitä <strong class="text-amber-300">16 osoitteen lohkoja</strong>, joista laitteille voidaan konfiguroida tasan <strong class="text-white">14 osoitetta</strong>.
                </p>
                <div class="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/60 text-xs text-slate-300">
                    <strong class="text-amber-300">🌍 Reaalimaailman käyttökohde:</strong>
                    Täydellinen DMZ-vyöhykkeille (julkinen web-, sähköposti- ja DNS-palvelin), johtoryhmän eristetylle hallintaverkolle tai toimiston verkkotulostimille. Tulostimet ovat tunnetusti alttiita haavoittuvuuksille, joten niiden eristäminen omaan 14 laitteen /28-aliverkkoon on alan "best practice".
                </div>
            </div>

            <!-- 2. Matematiikka ja laskukaavat -->
            <div class="bg-slate-850 p-4 rounded-xl border border-indigo-500/30 shadow-md space-y-2.5">
                <h5 class="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span>📐</span> /28 Matematiikka ja laskukaavat
                </h5>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">1. Bittijako</span>
                        <span class="font-mono text-cyan-300 font-bold text-xs">Verkko: 28 | Isännät: 32 − 28 = 4</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Binääri: 11110000 = 128+64+32+16 = 240.</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">2. Lohkokoko (Block Size)</span>
                        <span class="font-mono text-amber-300 font-bold text-xs">2^4 = 16 osoitetta</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Käyttökelpoisia isäntiä: 16 − 2 = 14 laitetta.</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">3. Taikanumero & Peite</span>
                        <span class="font-mono text-emerald-300 font-bold text-xs">256 − 16 = 240 $\rightarrow$ 255.255.255.240</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Aliverkon peitteen viimeinen oktetti on 240.</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">4. Lohkorajat (+16)</span>
                        <span class="font-mono text-purple-300 font-bold text-xs">.0, .16, .32, .48, .64, .80, .96...</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Verkko-osoitteet ovat aina tasan 16:lla jaollisia.</span>
                    </div>
                </div>
            </div>

            <!-- 3. Havainnollinen malliesimerkki -->
            <div class="bg-slate-900/95 p-3.5 rounded-xl border border-cyan-500/30 text-xs space-y-2">
                <div class="font-bold text-cyan-300 text-xs flex items-center gap-1.5">
                    <span>💡</span> Havainnollinen malliesimerkki: Verkko 192.168.10.48 /28
                </div>
                <div class="p-2.5 bg-slate-800/90 rounded border border-slate-700 space-y-1 font-mono text-[11px]">
                    <div class="flex justify-between"><span class="text-slate-400">Verkko-osoite (Network ID):</span><span class="text-cyan-300 font-bold">192.168.10.48</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Aliverkon peite:</span><span class="text-emerald-300 font-bold">255.255.255.240</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Oletusyhdyskäytävä:</span><span class="text-amber-300 font-bold">192.168.10.49</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Käyttökelpoiset isännät:</span><span class="text-white">192.168.10.49 – 192.168.10.62</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Broadcast:</span><span class="text-rose-300 font-bold">192.168.10.63</span> <span class="text-slate-400 text-[10px] font-sans">(48 + 16 − 1)</span></div>
                </div>
            </div>

            <!-- 4. Pro-vinkki / Insinöörin käytäntö -->
            <div class="bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/40 text-xs text-emerald-200/90 leading-relaxed flex items-start gap-2.5">
                <span class="text-base leading-none">🛡️</span>
                <div>
                    <strong class="text-emerald-300 block mb-0.5">Pro-vinkki / Insinöörin laskukikka:</strong>
                    Tarkista aina osuuko antamasi IP lohkorajalle! Koska lohkokoko on 16, verkko-osoitteet päättyvät lukuihin <span class="font-mono text-white font-bold">.0, .16, .32, .48, .64, .80, .96, .112, .128, .144, .160, .176, .192, .208, .224, .240</span>. Yleislähetys on aina yhtä vaille seuraava lohko (.15, .31, .47, .63 jne.). Jos annat laitteelle IP:n .63, yhteys katkeaa heti!
                </div>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // -------------------------------------------------------------------------
    // 7. SLASH29 (/29)
    // -------------------------------------------------------------------------
    slash29: (details, cidr) => `
        <div class="space-y-3">
            <!-- 1. Pääotsikko ja reaalimaailman teoria -->
            <div class="bg-slate-800/90 p-4 rounded-xl border border-slate-600 shadow-md">
                <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                        8 OSOITTEEN TEHOLOHKO
                    </span>
                    <span class="text-xs font-mono text-cyan-300 font-bold">/29 (255.255.255.248)</span>
                </div>
                <h4 class="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                    ⚙️ /29 – Klusterit ja julkiset operaattoripoolit
                </h4>
                <p class="text-slate-300 text-xs leading-relaxed mb-2.5">
                    CIDR-prefiksissä <strong class="text-cyan-300">/29</strong> verkolle varataan huimat 29 bittiä ja isännille jää enää vain <strong class="text-white">3 bittiä</strong>. Lohkokoko on $2^3 = 8$ osoitetta, josta jää $8 - 2 =$ <strong class="text-amber-300">6 käyttökelpoista IP-osoitetta</strong> laitteille.
                </p>
                <div class="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/60 text-xs text-slate-300">
                    <strong class="text-amber-300">🌍 Reaalimaailman käyttökohde:</strong>
                    Tämä on maailmanlaajuinen standardi yrityksen julkiselle Internet-liittymälle! Kun tilaat operaattorilta yrityslaajakaistan kiinteillä IP-osoitteilla, operaattori toimittaa lähes poikkeuksetta /29-lohkon. Se mahdollistaa kahdennetut palomuurit (HA-klusteri) ja muutaman julkisen palvelimen.
                </div>
            </div>

            <!-- 2. Matematiikka ja laskukaavat -->
            <div class="bg-slate-850 p-4 rounded-xl border border-indigo-500/30 shadow-md space-y-2.5">
                <h5 class="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span>📐</span> /29 Matematiikka ja laskukaavat
                </h5>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">1. Bittijako</span>
                        <span class="font-mono text-cyan-300 font-bold text-xs">Verkko: 29 | Isännät: 32 − 29 = 3</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Binääri: 11111000 = 128+64+32+16+8 = 248.</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">2. Lohkokoko (Block Size)</span>
                        <span class="font-mono text-amber-300 font-bold text-xs">2^3 = 8 osoitetta</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Käyttökelpoisia isäntiä: 8 − 2 = 6 laitetta.</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">3. Taikanumero & Peite</span>
                        <span class="font-mono text-emerald-300 font-bold text-xs">256 − 8 = 248 $\rightarrow$ 255.255.255.248</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Aliverkon peitteen jaettu oktetti on tasan 248.</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">4. Lohkorajat (+8)</span>
                        <span class="font-mono text-purple-300 font-bold text-xs">.0, .8, .16, .24, .32, .40, .48...</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Verkko-osoitteet ovat 8:n monikertoja.</span>
                    </div>
                </div>
            </div>

            <!-- 3. Havainnollinen malliesimerkki -->
            <div class="bg-slate-900/95 p-3.5 rounded-xl border border-cyan-500/30 text-xs space-y-2">
                <div class="font-bold text-cyan-300 text-xs flex items-center gap-1.5">
                    <span>💡</span> Havainnollinen malliesimerkki: Verkko 198.51.100.24 /29
                </div>
                <div class="p-2.5 bg-slate-800/90 rounded border border-slate-700 space-y-1 font-mono text-[11px]">
                    <div class="flex justify-between"><span class="text-slate-400">Verkko-osoite:</span><span class="text-cyan-300 font-bold">198.51.100.24</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Aliverkon peite:</span><span class="text-emerald-300 font-bold">255.255.255.248</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Gateway (ISP-reititin):</span><span class="text-amber-300 font-bold">198.51.100.25</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Käytettävät osoitteet (6 kpl):</span><span class="text-white">198.51.100.25 – 198.51.100.30</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Broadcast:</span><span class="text-rose-300 font-bold">198.51.100.31</span> <span class="text-slate-400 text-[10px] font-sans">(24 + 8 − 1)</span></div>
                </div>
            </div>

            <!-- 4. Pro-vinkki / Insinöörin käytäntö -->
            <div class="bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/40 text-xs text-emerald-200/90 leading-relaxed flex items-start gap-2.5">
                <span class="text-base leading-none">🛡️</span>
                <div>
                    <strong class="text-emerald-300 block mb-0.5">Pro-vinkki / Insinöörin HA-palomuuriasetelma:</strong>
                    /29-lohkossa osoitteet jaetaan ammattiverkoissa usein näin: 
                    <strong class="text-white">.25</strong> = Operaattorin gateway, 
                    <strong class="text-white">.26</strong> = Palomuuri 1 fyysinen WAN, 
                    <strong class="text-white">.27</strong> = Palomuuri 2 fyysinen WAN, 
                    <strong class="text-white">.28</strong> = Palomuurien jaettu VIP (Virtual IP / VRRP), 
                    <strong class="text-white">.29</strong> ja <strong class="text-white">.30</strong> = Julkiset palvelimet (esim. Web & Mail).
                </div>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // -------------------------------------------------------------------------
    // 8. SLASH30 (/30)
    // -------------------------------------------------------------------------
    slash30: (details, cidr) => `
        <div class="space-y-3">
            <!-- 1. Pääotsikko ja reaalimaailman teoria -->
            <div class="bg-slate-800/90 p-4 rounded-xl border border-slate-600 shadow-md">
                <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                        PISTEESTÄ PISTEESEEN (P2P)
                    </span>
                    <span class="text-xs font-mono text-cyan-300 font-bold">/30 (255.255.255.252)</span>
                </div>
                <h4 class="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                    🔗 /30 – Reitittimien välinen runkolinkki
                </h4>
                <p class="text-slate-300 text-xs leading-relaxed mb-2.5">
                    CIDR-prefiksi <strong class="text-cyan-300">/30</strong> on tietoliikennetekniikan klassisin Point-to-Point -linkkikoko. Isäntälaitteille jää vain vaivaiset <strong class="text-white">2 bittiä</strong> ($32 - 30 = 2$). Kokonaislohkokoko on $2^2 = 4$ osoitetta, josta syntyy tasan <strong class="text-amber-300">kaksi käyttökelpoista osoitetta</strong>!
                </p>
                <div class="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/60 text-xs text-slate-300">
                    <strong class="text-amber-300">🌍 Reaalimaailman käyttökohde:</strong>
                    Kahden reitittimen välinen suora sarja-, kuitu- tai WAN-runkokaapeli. Koska kaapelissa on vain kaksi päätä (Reititin A ja Reititin B), yhtään enempää osoitteita ei tarvita. Tämä säästää kriittisiä julkisia IPv4-osoitteita runkoverkoissa.
                </div>
            </div>

            <!-- 2. Matematiikka ja laskukaavat -->
            <div class="bg-slate-850 p-4 rounded-xl border border-indigo-500/30 shadow-md space-y-2.5">
                <h5 class="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span>📐</span> /30 Matematiikka ja laskukaavat
                </h5>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">1. Bittijako</span>
                        <span class="font-mono text-cyan-300 font-bold text-xs">Verkko: 30 | Isännät: 32 − 30 = 2</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Binääri: 11111100 = 128+64+32+16+8+4 = 252.</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">2. Lohkokoko (Block Size)</span>
                        <span class="font-mono text-amber-300 font-bold text-xs">2^2 = 4 osoitetta</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Käyttökelpoisia isäntiä: 4 − 2 = tasan 2 laitetta!</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">3. Taikanumero & Peite</span>
                        <span class="font-mono text-emerald-300 font-bold text-xs">256 − 4 = 252 $\rightarrow$ 255.255.255.252</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Aliverkon peitteen viimeinen oktetti on aina 252.</span>
                    </div>
                    <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-700/70">
                        <span class="text-slate-400 block text-[11px] font-medium">4. Lohkorajat (+4)</span>
                        <span class="font-mono text-purple-300 font-bold text-xs">.0, .4, .8, .12, .16, .20, .24...</span>
                        <span class="text-slate-400 block text-[10px] mt-0.5">Verkko-osoite on aina tasan neljällä jaollinen luku.</span>
                    </div>
                </div>
            </div>

            <!-- 3. Havainnollinen malliesimerkki -->
            <div class="bg-slate-900/95 p-3.5 rounded-xl border border-cyan-500/30 text-xs space-y-2">
                <div class="font-bold text-cyan-300 text-xs flex items-center gap-1.5">
                    <span>💡</span> Havainnollinen malliesimerkki: Runkolinkki 10.254.0.12 /30
                </div>
                <div class="p-2.5 bg-slate-800/90 rounded border border-slate-700 space-y-1 font-mono text-[11px]">
                    <div class="flex justify-between"><span class="text-slate-400">Verkko-osoite (jaollinen 4:llä):</span><span class="text-cyan-300 font-bold">10.254.0.12</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Aliverkon peite:</span><span class="text-emerald-300 font-bold">255.255.255.252</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Reititin A (Linkin pää 1):</span><span class="text-amber-300 font-bold">10.254.0.13</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Reititin B (Linkin pää 2):</span><span class="text-emerald-300 font-bold">10.254.0.14</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Yleislähetys (Broadcast):</span><span class="text-rose-300 font-bold">10.254.0.15</span> <span class="text-slate-400 text-[10px] font-sans">(12 + 4 − 1)</span></div>
                </div>
            </div>

            <!-- 4. Pro-vinkki / Insinöörin käytäntö -->
            <div class="bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/40 text-xs text-emerald-200/90 leading-relaxed flex items-start gap-2.5">
                <span class="text-base leading-none">🛡️</span>
                <div>
                    <strong class="text-emerald-300 block mb-0.5">Pro-vinkki / Älä koskaan laita kytkintä /30-verkkoon:</strong>
                    /30-aliverkossa on tasan 2 käyttökelpoista IP-osoitetta. Jos liität linkin väliin kytkimen ja yrität lisätä kolmannen laitteen (esim. työaseman tai tulostimen), sille ei ole olemassa laillista IP-osoitetta verkossa! Jos tarvitset kolmannen laitteen, aliverkko on pakko laajentaa vähintään kokoon /29.
                </div>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`
};

// Vienti Node.js-ympäristöön ja selaimelle
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TEACHING_PART_1;
}


/**
 * Subnet Architect - Pelin laajennettu opetusmateriaali (Osa 2: Suuret aliverkot ja monioktettilaskenta)
 * Kattaa prefiksit: /23, /22, /21, /20, /18, /16, /12 ja /8
 */

const TEACHING_PART_2 = {
    // -------------------------------------------------------------------------
    // /23 - Keskisuuret toimistot ja kahden C-luokan yhdistäminen
    // -------------------------------------------------------------------------
    slash23: (details, cidr) => `
        <div class="bg-slate-800/95 p-4 rounded-xl border border-slate-700/80 space-y-3.5 shadow-lg">
            <!-- 1. Pääotsikko ja reaalimaailman käyttökohde -->
            <div class="flex items-center justify-between pb-2 border-b border-slate-700/70">
                <h4 class="text-sm font-bold text-white flex items-center gap-2">
                    <span class="text-cyan-400 text-base">🏢</span>
                    <span>/23 – Kahden C-luokan yhdistäminen (512 IP-osoitetta)</span>
                </h4>
                <span class="px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold">
                    Peite: 255.255.254.0
                </span>
            </div>

            <div class="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 text-xs text-slate-300 leading-relaxed space-y-1">
                <p class="font-bold text-cyan-300 flex items-center gap-1.5">
                    <span>🌐</span> Reaalimaailman käyttökohde:
                </p>
                <p>
                    Keskisuuret yritystoimistot, monikerroksiset toimitilat ja laajat toimisto-VLANit.
                    Perinteinen /24-aliverkko (254 isäntää) käy usein ahtaaksi, kun samassa toimistossa on 300–450 laitetta
                    (työasemat, kannettavat, älypuhelimet, IP-puhelimet ja tulostimet). 
                    /23-aliverkko mahdollistaa kaikkien laitteiden pitämisen <strong>samassa suorassa L2-kytkinverkossa ilman väliin vaadittavaa reititintä</strong>.
                </p>
            </div>

            <!-- 2. Matematiikka ja monioktettilaskenta -->
            <div class="p-3 bg-indigo-950/30 rounded-lg border border-indigo-500/30 text-xs text-slate-200 space-y-2 leading-relaxed">
                <p class="font-bold text-indigo-300 flex items-center gap-1.5">
                    <span>🧮</span> Matematiikka ja monioktettilaskenta:
                </p>
                <ul class="list-disc list-inside space-y-1.5 text-slate-300 pl-0.5">
                    <li>
                        <strong class="text-white">Aktiivinen oktetti:</strong> Muutos kohdistuu <span class="font-mono text-amber-300 font-bold">3. oktettiin</span>.
                        Prefiksi /23 jakaantuu: 8 + 8 + 7 bittiä verkolle ja 1 bitti 3. oktetista + 8 bittiä 4. oktetista isännille (<span class="font-mono text-cyan-300">9 isäntäbittiä</span>).
                    </li>
                    <li>
                        <strong class="text-white">Peitteen laskenta:</strong> 3. oktetissa on seitsemän ykkösbittiä:
                        <span class="font-mono text-slate-100">128 + 64 + 32 + 16 + 8 + 4 + 2 = </span>
                        <span class="font-mono text-amber-300 font-bold">254</span>. 
                        Peite on siis <span class="font-mono text-cyan-300 font-bold">255.255.254.0</span>.
                    </li>
                    <li>
                        <strong class="text-white">Lohkokoko 3. oktetissa:</strong> <span class="font-mono text-amber-300 font-bold">256 − 254 = 2</span> (tai 2¹ = 2).
                        3. oktetti kasvaa aina <strong>kahden välein</strong> (parilliset luvut: .0, .2, .4, .6, .8 ... .254).
                    </li>
                    <li>
                        <strong class="text-white">Rajat yli tavurajan:</strong> 4. oktetti käy täyden kierroksen 0–255 molempien 3. oktetin numeroiden aikana!
                        Osoite <span class="font-mono text-emerald-300">.0.255</span> EI ole broadcast, vaan täysin normaali ja laillinen isäntäosoite!
                        Vasta kun 3. oktetti on pariton (yläraja) ja 4. oktetti on 255, saavutetaan aliverkon Broadcast.
                    </li>
                </ul>
            </div>

            <!-- 3. Havainnollinen malliesimerkki numeroilla -->
            <div class="p-3 bg-slate-900/90 rounded-lg border border-cyan-500/30 text-xs font-mono space-y-1.5 text-slate-200">
                <div class="font-sans font-bold text-cyan-400 text-xs flex items-center gap-1.5 mb-1">
                    <span>📐</span> Malliesimerkki: Verkko 192.168.10.0 /23
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1 text-[11px]">
                    <div><span class="text-slate-400">Verkko-osoite:</span> <span class="text-emerald-300 font-bold">192.168.10.0</span> (10 on parillinen)</div>
                    <div><span class="text-slate-400">Ensimmäinen isäntä:</span> <span class="text-cyan-300">192.168.10.1</span></div>
                    <div><span class="text-slate-400">Tavallinen isäntä:</span> <span class="text-cyan-300">192.168.10.255</span> (ei broadcast!)</div>
                    <div><span class="text-slate-400">Seuraava isäntä:</span> <span class="text-cyan-300">192.168.11.0</span> (ei verkko-ID!)</div>
                    <div><span class="text-slate-400">Viimeinen isäntä:</span> <span class="text-cyan-300">192.168.11.254</span></div>
                    <div><span class="text-slate-400">Broadcast-osoite:</span> <span class="text-amber-300 font-bold">192.168.11.255</span> (10 + 2 − 1 = 11)</div>
                </div>
                <div class="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                    Osoitteita yhteensä: 2⁹ = 512 kpl | Käytettävissä: <strong class="text-white">510 isäntää</strong> | Seuraava verkko: <span class="text-purple-300">192.168.12.0</span>
                </div>
            </div>

            <!-- 4. Pro-vinkki / Supernetting -->
            <div class="p-3 bg-amber-950/30 rounded-lg border border-amber-500/40 text-xs text-amber-200/90 space-y-1 leading-relaxed">
                <p class="font-bold text-amber-400 flex items-center gap-1.5">
                    <span>💡</span> Pro-vinkki / Reitityksen tiivistäminen (Supernetting):
                </p>
                <p>
                    /23 yhdistää kaksi peräkkäistä /24-verkkoa yhdeksi reitiksi (esim. <span class="font-mono text-white">192.168.0.0/24</span> ja <span class="font-mono text-white">192.168.1.0/24</span> $\rightarrow$ <span class="font-mono text-white">192.168.0.0/23</span>).
                    <strong>Kultainen sääntö:</strong> Yhdistettävistä verkoista ensimmäisen 3. oktetin on aina oltava <em>parillinen</em>! Verkkoja .1.0/24 ja .2.0/24 ei voi yhdistää /23-verkoksi, koska niiden binaariprefiksit eroavat toisistaan.
                </p>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // -------------------------------------------------------------------------
    // /22 - Kampusverkot ja suurtapahtumat
    // -------------------------------------------------------------------------
    slash22: (details, cidr) => `
        <div class="bg-slate-800/95 p-4 rounded-xl border border-slate-700/80 space-y-3.5 shadow-lg">
            <!-- 1. Pääotsikko ja reaalimaailman käyttökohde -->
            <div class="flex items-center justify-between pb-2 border-b border-slate-700/70">
                <h4 class="text-sm font-bold text-white flex items-center gap-2">
                    <span class="text-cyan-400 text-base">🎓</span>
                    <span>/22 – Kampus- ja Suurtapahtumaverkko (1 024 IP-osoitetta)</span>
                </h4>
                <span class="px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold">
                    Peite: 255.255.252.0
                </span>
            </div>

            <div class="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 text-xs text-slate-300 leading-relaxed space-y-1">
                <p class="font-bold text-cyan-300 flex items-center gap-1.5">
                    <span>🌐</span> Reaalimaailman käyttökohde:
                </p>
                <p>
                    Yliopistokampukset, suuret sairaalakompleksit, hotellien ja messukeskusten vierailija-WLANit (Guest Wi-Fi).
                    Kun tuhannet opiskelijat, potilaat tai konferenssivieraat liikkuvat alueella mobiililaitteineen,
                    /22 tarjoaa laajan yhtenäisen osoitealtaan, jotta DHCP-osoitteet eivät lopu kesken lyhyenkään käyttöpiikin aikana.
                </p>
            </div>

            <!-- 2. Matematiikka ja monioktettilaskenta -->
            <div class="p-3 bg-indigo-950/30 rounded-lg border border-indigo-500/30 text-xs text-slate-200 space-y-2 leading-relaxed">
                <p class="font-bold text-indigo-300 flex items-center gap-1.5">
                    <span>🧮</span> Matematiikka ja monioktettilaskenta:
                </p>
                <ul class="list-disc list-inside space-y-1.5 text-slate-300 pl-0.5">
                    <li>
                        <strong class="text-white">Aktiivinen oktetti:</strong> Muutos kohdistuu <span class="font-mono text-amber-300 font-bold">3. oktettiin</span>.
                        Prefiksi /22 jättää isännille 2 bittiä 3. oktetista ja 8 bittiä 4. oktetista:
                        yhteensä <span class="font-mono text-cyan-300">10 isäntäbittiä</span> (32 − 22 = 10).
                    </li>
                    <li>
                        <strong class="text-white">Peitteen laskenta:</strong> 3. oktetissa on kuusi ykkösbittiä:
                        <span class="font-mono text-slate-100">128 + 64 + 32 + 16 + 8 + 4 = </span>
                        <span class="font-mono text-amber-300 font-bold">252</span>. 
                        Koko peite on <span class="font-mono text-cyan-300 font-bold">255.255.252.0</span>.
                    </li>
                    <li>
                        <strong class="text-white">Lohkokoko 3. oktetissa:</strong> <span class="font-mono text-amber-300 font-bold">256 − 252 = 4</span> (tai 2² = 4).
                        3. oktetti kasvaa aina <strong>neljän välein</strong> (.0, .4, .8, .12, .16, .20 ... .252).
                    </li>
                    <li>
                        <strong class="text-white">Neljän C-luokan nielu:</strong> Yksi /22-aliverkko nielaisee tarkalleen neljä peräkkäistä /24-aluetta.
                        Esimerkiksi verkkoalue .8.0 – .11.255 kattaa alueet .8.x, .9.x, .10.x ja .11.x!
                    </li>
                </ul>
            </div>

            <!-- 3. Havainnollinen malliesimerkki numeroilla -->
            <div class="p-3 bg-slate-900/90 rounded-lg border border-cyan-500/30 text-xs font-mono space-y-1.5 text-slate-200">
                <div class="font-sans font-bold text-cyan-400 text-xs flex items-center gap-1.5 mb-1">
                    <span>📐</span> Malliesimerkki: Verkko 10.20.8.0 /22
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1 text-[11px]">
                    <div><span class="text-slate-400">Verkko-osoite:</span> <span class="text-emerald-300 font-bold">10.20.8.0</span> (8 on 4:llä jaollinen)</div>
                    <div><span class="text-slate-400">Ensimmäinen isäntä:</span> <span class="text-cyan-300">10.20.8.1</span></div>
                    <div><span class="text-slate-400">Sisäinen osoite 1:</span> <span class="text-cyan-300">10.20.9.150</span> (laillinen isäntä)</div>
                    <div><span class="text-slate-400">Sisäinen osoite 2:</span> <span class="text-cyan-300">10.20.10.255</span> (laillinen isäntä)</div>
                    <div><span class="text-slate-400">Viimeinen isäntä:</span> <span class="text-cyan-300">10.20.11.254</span></div>
                    <div><span class="text-slate-400">Broadcast-osoite:</span> <span class="text-amber-300 font-bold">10.20.11.255</span> (8 + 4 − 1 = 11)</div>
                </div>
                <div class="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                    Osoitteita yhteensä: 2¹⁰ = 1 024 kpl | Käytettävissä: <strong class="text-white">1 022 isäntää</strong> | Seuraava aliverkko: <span class="text-purple-300">10.20.12.0</span>
                </div>
            </div>

            <!-- 4. Pro-vinkki / Supernetting -->
            <div class="p-3 bg-amber-950/30 rounded-lg border border-amber-500/40 text-xs text-amber-200/90 space-y-1 leading-relaxed">
                <p class="font-bold text-amber-400 flex items-center gap-1.5">
                    <span>💡</span> Pro-vinkki / Reitityksen tiivistäminen (Route Summarization):
                </p>
                <p>
                    Keskuskytkimessä tai reitittimessä voidaan neljä erillistä osastoverkkoa
                    (<span class="font-mono text-white">10.20.8.0/24</span>, <span class="font-mono text-white">.9.0/24</span>, <span class="font-mono text-white">.10.0/24</span> ja <span class="font-mono text-white">.11.0/24</span>)
                    tiivistää yhdelle ainoalle riville: <span class="font-mono text-white">10.20.8.0/22</span>. Tämä säästää reitittimen muistia ja nopeuttaa pakettien reitityshakuja huomattavasti.
                </p>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // -------------------------------------------------------------------------
    // /21 - Teollisuusautomaatio ja IoT-kentät
    // -------------------------------------------------------------------------
    slash21: (details, cidr) => `
        <div class="bg-slate-800/95 p-4 rounded-xl border border-slate-700/80 space-y-3.5 shadow-lg">
            <!-- 1. Pääotsikko ja reaalimaailman käyttökohde -->
            <div class="flex items-center justify-between pb-2 border-b border-slate-700/70">
                <h4 class="text-sm font-bold text-white flex items-center gap-2">
                    <span class="text-cyan-400 text-base">🏭</span>
                    <span>/21 – Teollisuuslaitokset ja Suuret IoT-kentät (2 048 IP-osoitetta)</span>
                </h4>
                <span class="px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold">
                    Peite: 255.255.248.0
                </span>
            </div>

            <div class="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 text-xs text-slate-300 leading-relaxed space-y-1">
                <p class="font-bold text-cyan-300 flex items-center gap-1.5">
                    <span>🌐</span> Reaalimaailman käyttökohde:
                </p>
                <p>
                    Automaattiset logistiikkakeskukset, tuotantotehtaat ja laajamittaiset IoT-anturiverkot.
                    Tehtaassa sadat robotit, PLC-logiikat, viivakoodiskannerit ja kuljetusjärjestelmät vaativat yhtenäisen
                    osoiteavaruuden ja keskitetyn hallinnan ilman jatkuvaa aliverkkorajojen ylittämistä.
                </p>
            </div>

            <!-- 2. Matematiikka ja monioktettilaskenta -->
            <div class="p-3 bg-indigo-950/30 rounded-lg border border-indigo-500/30 text-xs text-slate-200 space-y-2 leading-relaxed">
                <p class="font-bold text-indigo-300 flex items-center gap-1.5">
                    <span>🧮</span> Matematiikka ja monioktettilaskenta:
                </p>
                <ul class="list-disc list-inside space-y-1.5 text-slate-300 pl-0.5">
                    <li>
                        <strong class="text-white">Aktiivinen oktetti:</strong> Muutos kohdistuu <span class="font-mono text-amber-300 font-bold">3. oktettiin</span>.
                        Prefiksi /21 jättää isännille 3 bittiä 3. oktetista ja 8 bittiä 4. oktetista =
                        <span class="font-mono text-cyan-300">11 isäntäbittiä</span> (32 − 21 = 11).
                    </li>
                    <li>
                        <strong class="text-white">Peitteen laskenta:</strong> 3. oktetissa on viisi ykkösbittiä:
                        <span class="font-mono text-slate-100">128 + 64 + 32 + 16 + 8 = </span>
                        <span class="font-mono text-amber-300 font-bold">248</span>.
                        Aliverkon peite on <span class="font-mono text-cyan-300 font-bold">255.255.248.0</span>.
                    </li>
                    <li>
                        <strong class="text-white">Lohkokoko 3. oktetissa:</strong> <span class="font-mono text-amber-300 font-bold">256 − 248 = 8</span> (tai 2³ = 8).
                        3. oktetti kasvaa aina <strong>kahdeksan välein</strong> (.0, .8, .16, .24, .32, .40, .48 ... .248).
                    </li>
                    <li>
                        <strong class="text-white">Kahdeksan C-luokan lohko:</strong> Yksi /21-aliverkko vastaa tasan kahdeksaa peräkkäistä /24-aliverkkoa (8 × 256 = 2 048 osoitetta).
                    </li>
                </ul>
            </div>

            <!-- 3. Havainnollinen malliesimerkki numeroilla -->
            <div class="p-3 bg-slate-900/90 rounded-lg border border-cyan-500/30 text-xs font-mono space-y-1.5 text-slate-200">
                <div class="font-sans font-bold text-cyan-400 text-xs flex items-center gap-1.5 mb-1">
                    <span>📐</span> Malliesimerkki: Verkko 172.16.32.0 /21
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1 text-[11px]">
                    <div><span class="text-slate-400">Verkko-osoite:</span> <span class="text-emerald-300 font-bold">172.16.32.0</span> (32 on 8:lla jaollinen)</div>
                    <div><span class="text-slate-400">Ensimmäinen isäntä:</span> <span class="text-cyan-300">172.16.32.1</span></div>
                    <div><span class="text-slate-400">Väli-isäntä:</span> <span class="text-cyan-300">172.16.36.100</span> (laillinen isäntä)</div>
                    <div><span class="text-slate-400">Viimeinen isäntä:</span> <span class="text-cyan-300">172.16.39.254</span></div>
                    <div><span class="text-slate-400">Broadcast-osoite:</span> <span class="text-amber-300 font-bold">172.16.39.255</span> (32 + 8 − 1 = 39)</div>
                    <div><span class="text-slate-400">Seuraava lohko:</span> <span class="text-purple-300 font-bold">172.16.40.0 /21</span></div>
                </div>
                <div class="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                    Osoitteita yhteensä: 2¹¹ = 2 048 kpl | Käytettävissä: <strong class="text-white">2 046 isäntää</strong>
                </div>
            </div>

            <!-- 4. Pro-vinkki / Supernetting -->
            <div class="p-3 bg-amber-950/30 rounded-lg border border-amber-500/40 text-xs text-amber-200/90 space-y-1 leading-relaxed">
                <p class="font-bold text-amber-400 flex items-center gap-1.5">
                    <span>💡</span> Pro-vinkki / Broadcast-hallinta ja Supernetting:
                </p>
                <p>
                    Vaikka /21 tarjoaa 2 046 isäntää yhteen lohkoon, yli kahdentuhannen laitteen suora L2-broadcast-alue voi kuormittaa hitaita sulautettuja laitteita (ARP-tulvat).
                    Verkkoarkkitehdit varaavat usein /21-supernet-lohkon reititykseen, mutta jakavat sen sisäisesti VLAN-kytkimillä neljään /23- tai kahdeksaan /24-lohkoon, pitäen runkoreitityksen silti yhdellä /21-rivillä.
                </p>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // -------------------------------------------------------------------------
    // /20 - Pilvipalvelut, VPC ja Konesalilohkot
    // -------------------------------------------------------------------------
    slash20: (details, cidr) => `
        <div class="bg-slate-800/95 p-4 rounded-xl border border-slate-700/80 space-y-3.5 shadow-lg">
            <!-- 1. Pääotsikko ja reaalimaailman käyttökohde -->
            <div class="flex items-center justify-between pb-2 border-b border-slate-700/70">
                <h4 class="text-sm font-bold text-white flex items-center gap-2">
                    <span class="text-cyan-400 text-base">☁️</span>
                    <span>/20 – Pilvipalveluiden VPC- ja Konesalilohko (4 096 IP-osoitetta)</span>
                </h4>
                <span class="px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold">
                    Peite: 255.255.240.0
                </span>
            </div>

            <div class="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 text-xs text-slate-300 leading-relaxed space-y-1">
                <p class="font-bold text-cyan-300 flex items-center gap-1.5">
                    <span>🌐</span> Reaalimaailman käyttökohde:
                </p>
                <p>
                    AWS VPC (Virtual Private Cloud), Microsoft Azure VNet, Google Cloud Platform (GCP) ja yritysten konesalit.
                    /20 on pilviarkkitehtuurin de facto -standardikoko sovellusympäristöille (Dev, Staging, Production). Siitä voidaan lohkoa siististi
                    eri saatavuusalueille (Availability Zones) julkiset kuormantasaajien aliverkot ja eristetyt tietokantojen yksityisaliverkot.
                </p>
            </div>

            <!-- 2. Matematiikka ja monioktettilaskenta -->
            <div class="p-3 bg-indigo-950/30 rounded-lg border border-indigo-500/30 text-xs text-slate-200 space-y-2 leading-relaxed">
                <p class="font-bold text-indigo-300 flex items-center gap-1.5">
                    <span>🧮</span> Matematiikka ja monioktettilaskenta:
                </p>
                <ul class="list-disc list-inside space-y-1.5 text-slate-300 pl-0.5">
                    <li>
                        <strong class="text-white">Aktiivinen oktetti:</strong> Muutos kohdistuu <span class="font-mono text-amber-300 font-bold">3. oktettiin</span>.
                        Prefiksi /20: 16 bittiä kahdessa ensimmäisessä tavussa + 4 bittiä 3. oktetissa verkolle.
                        Isännille jää 4 bittiä 3. oktetista + 8 bittiä 4. oktetista = <span class="font-mono text-cyan-300">12 isäntäbittiä</span>.
                    </li>
                    <li>
                        <strong class="text-white">Peitteen laskenta:</strong> 3. oktetissa on neljä ykkösbittiä:
                        <span class="font-mono text-slate-100">128 + 64 + 32 + 16 = </span>
                        <span class="font-mono text-amber-300 font-bold">240</span>.
                        Aliverkon peite on <span class="font-mono text-cyan-300 font-bold">255.255.240.0</span>.
                    </li>
                    <li>
                        <strong class="text-white">Lohkokoko 3. oktetissa:</strong> <span class="font-mono text-amber-300 font-bold">256 − 240 = 16</span> (tai 2⁴ = 16).
                        3. oktetti hyppää <strong>16:n portain</strong> (.0, .16, .32, .48, .64, .80, .96, .112, .128, .144, .160, .176, .192, .208, .224, .240).
                    </li>
                    <li>
                        <strong class="text-white">16 kappaletta /24-verkkoja:</strong> Yksi /20-lohko sisältää täsmälleen 16 kappaletta täysiä 256 osoitteen C-luokkia!
                    </li>
                </ul>
            </div>

            <!-- 3. Havainnollinen malliesimerkki numeroilla -->
            <div class="p-3 bg-slate-900/90 rounded-lg border border-cyan-500/30 text-xs font-mono space-y-1.5 text-slate-200">
                <div class="font-sans font-bold text-cyan-400 text-xs flex items-center gap-1.5 mb-1">
                    <span>📐</span> Malliesimerkki: Verkko 10.100.64.0 /20
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1 text-[11px]">
                    <div><span class="text-slate-400">Verkko-osoite:</span> <span class="text-emerald-300 font-bold">10.100.64.0</span> (64 on 16:lla jaollinen)</div>
                    <div><span class="text-slate-400">Ensimmäinen isäntä:</span> <span class="text-cyan-300">10.100.64.1</span></div>
                    <div><span class="text-slate-400">Palvelinosaite:</span> <span class="text-cyan-300">10.100.70.50</span> (laillinen isäntä)</div>
                    <div><span class="text-slate-400">Viimeinen isäntä:</span> <span class="text-cyan-300">10.100.79.254</span></div>
                    <div><span class="text-slate-400">Broadcast-osoite:</span> <span class="text-amber-300 font-bold">10.100.79.255</span> (64 + 16 − 1 = 79)</div>
                    <div><span class="text-slate-400">Seuraava lohko:</span> <span class="text-purple-300 font-bold">10.100.80.0 /20</span></div>
                </div>
                <div class="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                    Osoitteita yhteensä: 2¹² = 4 096 kpl | Käytettävissä: <strong class="text-white">4 094 isäntää</strong>
                </div>
            </div>

            <!-- 4. Pro-vinkki / Supernetting -->
            <div class="p-3 bg-amber-950/30 rounded-lg border border-amber-500/40 text-xs text-amber-200/90 space-y-1 leading-relaxed">
                <p class="font-bold text-amber-400 flex items-center gap-1.5">
                    <span>💡</span> Pro-vinkki / Pilven VPC-aliverkotus:
                </p>
                <p>
                    Varaa pilviprojektille <span class="font-mono text-white">10.100.64.0/20</span> ja jaa se VLSM:llä:
                    julkinen vyöhyke AZ1 (<span class="font-mono text-white">.64.0/24</span>), julkinen AZ2 (<span class="font-mono text-white">.65.0/24</span>),
                    sovellusklusteri (<span class="font-mono text-white">.68.0/22</span> = 1 024 IP) ja tietokantaklusteri (<span class="font-mono text-white">.72.0/22</span> = 1 024 IP).
                    Yrityksen VPN-yhdyskäytävä reitittää koko tämän kokonaisuuden yhdellä rivillä <span class="font-mono text-white">10.100.64.0/20</span>!
                </p>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // -------------------------------------------------------------------------
    // /18 - Alueelliset operaattorilohkot ja suurkonesalit
    // -------------------------------------------------------------------------
    slash18: (details, cidr) => `
        <div class="bg-slate-800/95 p-4 rounded-xl border border-slate-700/80 space-y-3.5 shadow-lg">
            <!-- 1. Pääotsikko ja reaalimaailman käyttökohde -->
            <div class="flex items-center justify-between pb-2 border-b border-slate-700/70">
                <h4 class="text-sm font-bold text-white flex items-center gap-2">
                    <span class="text-cyan-400 text-base">🌐</span>
                    <span>/18 – Alueellinen Operaattorilohko ja Suurkonesalit (16 384 IP-osoitetta)</span>
                </h4>
                <span class="px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold">
                    Peite: 255.255.192.0
                </span>
            </div>

            <div class="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 text-xs text-slate-300 leading-relaxed space-y-1">
                <p class="font-bold text-cyan-300 flex items-center gap-1.5">
                    <span>🌐</span> Reaalimaailman käyttökohde:
                </p>
                <p>
                    Internet-palveluntarjoajat (ISP), teleoperaattoreiden kiinteät laajakaista-alueet (FTTH/5G FWA),
                    monikansallisten yritysten kokonainen maantieteellinen vyöhyke tai valtavat hyperscale-konesalit.
                    /18 muodostaa tasan yhden neljäsosan klassisesta B-luokan /16-avaruudesta.
                </p>
            </div>

            <!-- 2. Matematiikka ja monioktettilaskenta -->
            <div class="p-3 bg-indigo-950/30 rounded-lg border border-indigo-500/30 text-xs text-slate-200 space-y-2 leading-relaxed">
                <p class="font-bold text-indigo-300 flex items-center gap-1.5">
                    <span>🧮</span> Matematiikka ja monioktettilaskenta:
                </p>
                <ul class="list-disc list-inside space-y-1.5 text-slate-300 pl-0.5">
                    <li>
                        <strong class="text-white">Aktiivinen oktetti:</strong> Muutos kohdistuu <span class="font-mono text-amber-300 font-bold">3. oktettiin</span>.
                        Prefiksi /18: vain kaksi bittiä 3. oktetista kuuluu verkolle.
                        Isännille jää 6 bittiä 3. oktetista + 8 bittiä 4. oktetista = <span class="font-mono text-cyan-300">14 isäntäbittiä</span> (32 − 18 = 14).
                    </li>
                    <li>
                        <strong class="text-white">Peitteen laskenta:</strong> 3. oktetissa on kaksi ykkösbittiä:
                        <span class="font-mono text-slate-100">128 + 64 = </span>
                        <span class="font-mono text-amber-300 font-bold">192</span>.
                        Aliverkon peite on <span class="font-mono text-cyan-300 font-bold">255.255.192.0</span>.
                    </li>
                    <li>
                        <strong class="text-white">Lohkokoko 3. oktetissa:</strong> <span class="font-mono text-amber-300 font-bold">256 − 192 = 64</span> (tai 2⁶ = 64).
                        3. oktetti etenee valtavin <strong>64:n askelin</strong>: vain neljä mahdollista aloitusta per B-luokka (.0, .64, .128, .192).
                    </li>
                    <li>
                        <strong class="text-white">64 kappaletta /24-verkkoja:</strong> Yksi /18-aliverkko sisältää peräti 64 kappaletta perinteisiä /24-verkkoja!
                    </li>
                </ul>
            </div>

            <!-- 3. Havainnollinen malliesimerkki numeroilla -->
            <div class="p-3 bg-slate-900/90 rounded-lg border border-cyan-500/30 text-xs font-mono space-y-1.5 text-slate-200">
                <div class="font-sans font-bold text-cyan-400 text-xs flex items-center gap-1.5 mb-1">
                    <span>📐</span> Malliesimerkki: Verkko 172.24.128.0 /18
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1 text-[11px]">
                    <div><span class="text-slate-400">Verkko-osoite:</span> <span class="text-emerald-300 font-bold">172.24.128.0</span></div>
                    <div><span class="text-slate-400">Ensimmäinen isäntä:</span> <span class="text-cyan-300">172.24.128.1</span></div>
                    <div><span class="text-slate-400">Keskialueen isäntä:</span> <span class="text-cyan-300">172.24.150.88</span></div>
                    <div><span class="text-slate-400">Viimeinen isäntä:</span> <span class="text-cyan-300">172.24.191.254</span></div>
                    <div><span class="text-slate-400">Broadcast-osoite:</span> <span class="text-amber-300 font-bold">172.24.191.255</span> (128 + 64 − 1 = 191)</div>
                    <div><span class="text-slate-400">Seuraava lohko:</span> <span class="text-purple-300 font-bold">172.24.192.0 /18</span></div>
                </div>
                <div class="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                    Osoitteita yhteensä: 2¹⁴ = 16 384 kpl | Käytettävissä: <strong class="text-white">16 382 isäntää</strong>
                </div>
            </div>

            <!-- 4. Pro-vinkki / Supernetting -->
            <div class="p-3 bg-amber-950/30 rounded-lg border border-amber-500/40 text-xs text-amber-200/90 space-y-1 leading-relaxed">
                <p class="font-bold text-amber-400 flex items-center gap-1.5">
                    <span>💡</span> Pro-vinkki / B-luokan jako neljänneksiin (Quadrants):
                </p>
                <p>
                    /18 jakaa minkä tahansa /16-avaruuden tasan neljään siistiin lohkoon:
                    <span class="font-mono text-white">.0.0/18</span>, <span class="font-mono text-white">.64.0/18</span>, <span class="font-mono text-white">.128.0/18</span> ja <span class="font-mono text-white">.192.0/18</span>.
                    Tätä rakennetta hyödynnetään usein alueellisessa BGP-reitityksessä jakamaan liikenne neljään maantieteelliseen solmukohtaan.
                </p>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // -------------------------------------------------------------------------
    // /16 - Klassinen B-luokan avaruus
    // -------------------------------------------------------------------------
    slash16: (details, cidr) => `
        <div class="bg-slate-800/95 p-4 rounded-xl border border-slate-700/80 space-y-3.5 shadow-lg">
            <!-- 1. Pääotsikko ja reaalimaailman käyttökohde -->
            <div class="flex items-center justify-between pb-2 border-b border-slate-700/70">
                <h4 class="text-sm font-bold text-white flex items-center gap-2">
                    <span class="text-cyan-400 text-base">🏛️</span>
                    <span>/16 – Klassinen B-luokan Avaruus (65 536 IP-osoitetta)</span>
                </h4>
                <span class="px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold">
                    Peite: 255.255.0.0
                </span>
            </div>

            <div class="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 text-xs text-slate-300 leading-relaxed space-y-1">
                <p class="font-bold text-cyan-300 flex items-center gap-1.5">
                    <span>🌐</span> Reaalimaailman käyttökohde:
                </p>
                <p>
                    Yrityksen koko sisäverkon runko (Enterprise Core), valtionhallinnon virastoverkot, yliopistoverkot ja pilven päätason VPC:t.
                    Historiallisesti tunnettu Class B -osoiteavaruutena. 16 bittiä verkolle ja 16 bittiä isännille tarjoaa yli 65 000 osoitetta,
                    joka riittää kattamaan suurenkin organisaation kaikki toimipisteet ja palvelimet.
                </p>
            </div>

            <!-- 2. Matematiikka ja monioktettilaskenta -->
            <div class="p-3 bg-indigo-950/30 rounded-lg border border-indigo-500/30 text-xs text-slate-200 space-y-2 leading-relaxed">
                <p class="font-bold text-indigo-300 flex items-center gap-1.5">
                    <span>🧮</span> Matematiikka ja monioktettilaskenta:
                </p>
                <ul class="list-disc list-inside space-y-1.5 text-slate-300 pl-0.5">
                    <li>
                        <strong class="text-white">Aktiivinen oktetti:</strong> <span class="font-mono text-amber-300 font-bold">Puhdas tavuraja 2. ja 3. oktetin välillä!</span>
                        Kaksi ensimmäistä oktettia (16 bittiä) kuuluvat kokonaan verkolle. Kaksi viimeistä oktettia (16 bittiä) kuuluvat kokonaan isännille.
                    </li>
                    <li>
                        <strong class="text-white">Peitteen laskenta:</strong> Täydet tavut ovat 255 ja tyhjät 0:
                        <span class="font-mono text-cyan-300 font-bold">255.255.0.0</span>.
                    </li>
                    <li>
                        <strong class="text-white">Lohkokoko:</strong> 2. oktetti kasvaa aina <strong>1:n välein</strong> (esim. 172.16.x, 172.17.x, 172.18.x).
                        Jokainen /16-verkko sisältää tarkalleen <span class="font-mono text-amber-300 font-bold">256 kappaletta täysiä /24-aliverkkoja</span> (3. oktetit 0–255).
                    </li>
                    <li>
                        <strong class="text-white">Rajat yli kahden tavun:</strong>
                        Verkko-osoitteessa 3. ja 4. oktetti ovat <span class="font-mono text-emerald-300">0.0</span>.
                        Broadcast-osoitteessa molemmat tavut ovat tapissa: <span class="font-mono text-amber-300">255.255</span>!
                    </li>
                </ul>
            </div>

            <!-- 3. Havainnollinen malliesimerkki numeroilla -->
            <div class="p-3 bg-slate-900/90 rounded-lg border border-cyan-500/30 text-xs font-mono space-y-1.5 text-slate-200">
                <div class="font-sans font-bold text-cyan-400 text-xs flex items-center gap-1.5 mb-1">
                    <span>📐</span> Malliesimerkki: Verkko 172.16.0.0 /16
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1 text-[11px]">
                    <div><span class="text-slate-400">Verkko-osoite:</span> <span class="text-emerald-300 font-bold">172.16.0.0</span></div>
                    <div><span class="text-slate-400">Ensimmäinen isäntä:</span> <span class="text-cyan-300">172.16.0.1</span></div>
                    <div><span class="text-slate-400">Toimisto-PC:</span> <span class="text-cyan-300">172.16.50.120</span> (laillinen isäntä)</div>
                    <div><span class="text-slate-400">Palvelin:</span> <span class="text-cyan-300">172.16.200.5</span> (laillinen isäntä)</div>
                    <div><span class="text-slate-400">Viimeinen isäntä:</span> <span class="text-cyan-300">172.16.255.254</span></div>
                    <div><span class="text-slate-400">Broadcast-osoite:</span> <span class="text-amber-300 font-bold">172.16.255.255</span></div>
                </div>
                <div class="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                    Osoitteita yhteensä: 2¹⁶ = 65 536 kpl | Käytettävissä: <strong class="text-white">65 534 isäntää</strong> | Seuraava verkko: <span class="text-purple-300">172.17.0.0</span>
                </div>
            </div>

            <!-- 4. Pro-vinkki / Supernetting -->
            <div class="p-3 bg-amber-950/30 rounded-lg border border-amber-500/40 text-xs text-amber-200/90 space-y-1 leading-relaxed">
                <p class="font-bold text-amber-400 flex items-center gap-1.5">
                    <span>💡</span> Pro-vinkki / Ei koskaan yhtä broadcast-aluetta:
                </p>
                <p>
                    /16-verkkoa <strong>ei koskaan kytketä yhdeksi jättimäiseksi kytkintoimialueeksi</strong>! Yli 60 000 laitteen ARP-kyselyt aiheuttaisivat broadcast-myrskyn, joka lamauttaisi kytkimet välittömästi.
                    Oikea tapa on käyttää /16-aluetta organisaation pääreitityksen summarointina, ja jakaa se reitittimillä sisäisesti pienempiin /24- tai /27-aliverkkoihin toimipisteittäin ja VLANeittain.
                </p>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // -------------------------------------------------------------------------
    // /12 - RFC 1918 Yksityinen B-avaruus ja Operaattorirunko
    // -------------------------------------------------------------------------
    slash12: (details, cidr) => `
        <div class="bg-slate-800/95 p-4 rounded-xl border border-slate-700/80 space-y-3.5 shadow-lg">
            <!-- 1. Pääotsikko ja reaalimaailman käyttökohde -->
            <div class="flex items-center justify-between pb-2 border-b border-slate-700/70">
                <h4 class="text-sm font-bold text-white flex items-center gap-2">
                    <span class="text-cyan-400 text-base">🪐</span>
                    <span>/12 – RFC 1918 Yksityinen B-avaruus & Operaattorirunko (1 048 576 IP-osoitetta)</span>
                </h4>
                <span class="px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold">
                    Peite: 255.240.0.0
                </span>
            </div>

            <div class="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 text-xs text-slate-300 leading-relaxed space-y-1">
                <p class="font-bold text-cyan-300 flex items-center gap-1.5">
                    <span>🌐</span> Reaalimaailman käyttökohde:
                </p>
                <p>
                    Globaalit tietoliikenneoperaattorit (ISP core), valtavat monikansalliset konsernit sekä tunnetuin kaikista:
                    <strong>RFC 1918 yksityinen B-luokan avaruus (172.16.0.0/12)</strong>.
                    Tämä yksi ainoa lohko kattaa kaikki yksityiset osoitteet väliltä <span class="font-mono text-white">172.16.0.0</span> – <span class="font-mono text-white">172.31.255.255</span>!
                </p>
            </div>

            <!-- 2. Matematiikka ja monioktettilaskenta -->
            <div class="p-3 bg-indigo-950/30 rounded-lg border border-indigo-500/30 text-xs text-slate-200 space-y-2 leading-relaxed">
                <p class="font-bold text-indigo-300 flex items-center gap-1.5">
                    <span>🧮</span> Matematiikka ja monioktettilaskenta:
                </p>
                <ul class="list-disc list-inside space-y-1.5 text-slate-300 pl-0.5">
                    <li>
                        <strong class="text-white">Aktiivinen oktetti:</strong> Muutos kohdistuu <span class="font-mono text-amber-300 font-bold">2. oktettiin</span>!
                        Prefiksi /12: 8 bittiä 1. oktetissa + 4 bittiä 2. oktetissa verkolle.
                        Isännille jää 4 bittiä 2. oktetista + täydet 8 bittiä 3. oktetista + täydet 8 bittiä 4. oktetista =
                        <span class="font-mono text-cyan-300">20 isäntäbittiä</span> (32 − 12 = 20).
                    </li>
                    <li>
                        <strong class="text-white">Peitteen laskenta:</strong> 2. oktetissa on neljä ykkösbittiä:
                        <span class="font-mono text-slate-100">128 + 64 + 32 + 16 = </span>
                        <span class="font-mono text-amber-300 font-bold">240</span>.
                        Peite on <span class="font-mono text-cyan-300 font-bold">255.240.0.0</span>.
                    </li>
                    <li>
                        <strong class="text-white">Lohkokoko 2. oktetissa:</strong> <span class="font-mono text-amber-300 font-bold">256 − 240 = 16</span> (tai 2⁴ = 16).
                        2. oktetti hyppää aina <strong>16:n portain</strong>: .0, .16, .32, .48, .64, .80 ... .240.
                    </li>
                    <li>
                        <strong class="text-white">Valtava kapasiteetti:</strong> Yksi /12-lohko sisältää peräti <strong>16 täyttä /16-luokan verkkoa</strong> tai <strong>4 096 kappaletta /24-aliverkkoja</strong>!
                        Broadcast-osoitteessa 2. oktetti on lohkon ylärajalla ja sekä 3. että 4. oktetti ovat <span class="font-mono text-amber-300">255.255</span>.
                    </li>
                </ul>
            </div>

            <!-- 3. Havainnollinen malliesimerkki numeroilla -->
            <div class="p-3 bg-slate-900/90 rounded-lg border border-cyan-500/30 text-xs font-mono space-y-1.5 text-slate-200">
                <div class="font-sans font-bold text-cyan-400 text-xs flex items-center gap-1.5 mb-1">
                    <span>📐</span> Malliesimerkki: Verkko 172.16.0.0 /12 (Yksityinen B-avaruus)
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1 text-[11px]">
                    <div><span class="text-slate-400">Verkko-osoite:</span> <span class="text-emerald-300 font-bold">172.16.0.0</span> (16 on 16:lla jaollinen)</div>
                    <div><span class="text-slate-400">Ensimmäinen isäntä:</span> <span class="text-cyan-300">172.16.0.1</span></div>
                    <div><span class="text-slate-400">Yksityinen IP 1:</span> <span class="text-cyan-300">172.20.100.55</span> (laillinen isäntä)</div>
                    <div><span class="text-slate-400">Yksityinen IP 2:</span> <span class="text-cyan-300">172.30.1.1</span> (laillinen isäntä)</div>
                    <div><span class="text-slate-400">Viimeinen isäntä:</span> <span class="text-cyan-300">172.31.255.254</span></div>
                    <div><span class="text-slate-400">Broadcast-osoite:</span> <span class="text-amber-300 font-bold">172.31.255.255</span> (16 + 16 − 1 = 31)</div>
                </div>
                <div class="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                    Osoitteita yhteensä: 2²⁰ = 1 048 576 kpl | Käytettävissä: <strong class="text-white">1 048 574 isäntää</strong> | Seuraava lohko: <span class="text-purple-300">172.32.0.0 /12</span>
                </div>
            </div>

            <!-- 4. Pro-vinkki / Supernetting -->
            <div class="p-3 bg-amber-950/30 rounded-lg border border-amber-500/40 text-xs text-amber-200/90 space-y-1 leading-relaxed">
                <p class="font-bold text-amber-400 flex items-center gap-1.5">
                    <span>💡</span> Pro-vinkki / Palomuurisäännöt yhdellä rivillä:
                </p>
                <p>
                    Koko 16:n B-luokan verkon kokoelma (<span class="font-mono text-white">172.16.0.0 – 172.31.255.255</span>) voidaan palomuurissa sallia tai estää yhdellä ainoalla säännöllä:
                    <span class="font-mono text-white">permit ip 172.16.0.0 255.240.0.0</span>. Ilman /12-summarointia sääntötauluun tarvittaisiin 16 erillistä sääntöä tai 4 096 riviä!
                </p>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // -------------------------------------------------------------------------
    // /8 - Luokan A megalohko
    // -------------------------------------------------------------------------
    slash8: (details, cidr) => `
        <div class="bg-slate-800/95 p-4 rounded-xl border border-slate-700/80 space-y-3.5 shadow-lg">
            <!-- 1. Pääotsikko ja reaalimaailman käyttökohde -->
            <div class="flex items-center justify-between pb-2 border-b border-slate-700/70">
                <h4 class="text-sm font-bold text-white flex items-center gap-2">
                    <span class="text-cyan-400 text-base">🌌</span>
                    <span>/8 – Luokan A Megalohko (16 777 216 IP-osoitetta)</span>
                </h4>
                <span class="px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold">
                    Peite: 255.0.0.0
                </span>
            </div>

            <div class="p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 text-xs text-slate-300 leading-relaxed space-y-1">
                <p class="font-bold text-cyan-300 flex items-center gap-1.5">
                    <span>🌐</span> Reaalimaailman käyttökohde:
                </p>
                <p>
                    Internetin varhaiset jättivaraukset (Class A Legacy Allocations: esim. Apple 17.0.0.0/8, Ford 19.0.0.0/8, MIT 18.0.0.0/8),
                    alueelliset internet-rekisterit (RIR, kuten RIPE NCC ja ARIN) sekä maailman ylivoimaisesti suosituin
                    yksityinen suuryritysverkko: <strong>10.0.0.0/8</strong> (RFC 1918 Class A).
                </p>
            </div>

            <!-- 2. Matematiikka ja monioktettilaskenta -->
            <div class="p-3 bg-indigo-950/30 rounded-lg border border-indigo-500/30 text-xs text-slate-200 space-y-2 leading-relaxed">
                <p class="font-bold text-indigo-300 flex items-center gap-1.5">
                    <span>🧮</span> Matematiikka ja monioktettilaskenta:
                </p>
                <ul class="list-disc list-inside space-y-1.5 text-slate-300 pl-0.5">
                    <li>
                        <strong class="text-white">Aktiivinen oktetti:</strong> <span class="font-mono text-amber-300 font-bold">1. oktetti!</span>
                        Vain ensimmäinen tavu (8 bittiä) kuuluu verkolle. Loput kolme kokonaista tavua kuuluvat isännille:
                        <span class="font-mono text-cyan-300">24 isäntäbittiä</span> (32 − 8 = 24).
                    </li>
                    <li>
                        <strong class="text-white">Peitteen laskenta:</strong> Ensimmäinen tavu on 255 ja loput kolme ovat nollia:
                        <span class="font-mono text-cyan-300 font-bold">255.0.0.0</span>.
                    </li>
                    <li>
                        <strong class="text-white">Lohkokoko:</strong> 1. oktetti kasvaa aina <strong>1:n välein</strong> (esim. 10.x.x.x, 11.x.x.x, 12.x.x.x).
                        Yksi /8-verkko sisältää uskomattomat <strong>256 kappaletta /16-luokkia</strong> tai <strong>65 536 kappaletta /24-aliverkkoja</strong>!
                    </li>
                    <li>
                        <strong class="text-white">Rajat yli kolmen tavun:</strong>
                        Verkko-osoitteessa kolme viimeistä oktettia ovat <span class="font-mono text-emerald-300">0.0.0</span>.
                        Broadcast-osoitteessa kaikki kolme viimeistä oktettia ovat täynnä: <span class="font-mono text-amber-300">255.255.255</span>!
                    </li>
                </ul>
            </div>

            <!-- 3. Havainnollinen malliesimerkki numeroilla -->
            <div class="p-3 bg-slate-900/90 rounded-lg border border-cyan-500/30 text-xs font-mono space-y-1.5 text-slate-200">
                <div class="font-sans font-bold text-cyan-400 text-xs flex items-center gap-1.5 mb-1">
                    <span>📐</span> Malliesimerkki: Verkko 10.0.0.0 /8 (Yksityinen Megalohko)
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1 text-[11px]">
                    <div><span class="text-slate-400">Verkko-osoite:</span> <span class="text-emerald-300 font-bold">10.0.0.0</span></div>
                    <div><span class="text-slate-400">Ensimmäinen isäntä:</span> <span class="text-cyan-300">10.0.0.1</span></div>
                    <div><span class="text-slate-400">Toimipisteen laite:</span> <span class="text-cyan-300">10.128.45.19</span> (laillinen isäntä)</div>
                    <div><span class="text-slate-400">Konesalipalvelin:</span> <span class="text-cyan-300">10.250.200.1</span> (laillinen isäntä)</div>
                    <div><span class="text-slate-400">Viimeinen isäntä:</span> <span class="text-cyan-300">10.255.255.254</span></div>
                    <div><span class="text-slate-400">Broadcast-osoite:</span> <span class="text-amber-300 font-bold">10.255.255.255</span></div>
                </div>
                <div class="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                    Osoitteita yhteensä: 2²⁴ = 16 777 216 kpl | Käytettävissä: <strong class="text-white">16 777 214 isäntää</strong> | Seuraava verkko: <span class="text-purple-300">11.0.0.0</span>
                </div>
            </div>

            <!-- 4. Pro-vinkki / Supernetting -->
            <div class="p-3 bg-amber-950/30 rounded-lg border border-amber-500/40 text-xs text-amber-200/90 space-y-1 leading-relaxed">
                <p class="font-bold text-amber-400 flex items-center gap-1.5">
                    <span>💡</span> Pro-vinkki / Hierarkkinen yritysosoitteisto:
                </p>
                <p>
                    Suuryritykset jakavat <span class="font-mono text-white">10.0.0.0/8</span> -avaruuden hierarkkisesti 2. oktetin perusteella maantieteellisesti:
                    esim. Eurooppa (<span class="font-mono text-white">10.1.0.0/16</span> ... <span class="font-mono text-white">10.50.0.0/16</span>), Amerikka (<span class="font-mono text-white">10.51.0.0/16</span> ... <span class="font-mono text-white">10.100.0.0/16</span>).
                    Yrityksen runkoreitittimien ja palomuurien taulussa koko sisäverkko summaroidaan yhdellä rivillä: <span class="font-mono text-white">10.0.0.0/8</span>.
                </p>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TEACHING_PART_2;
}


// teaching_part3.js
// Kattava ja syvällinen suomenkielinen opetusmateriaali (Full Teaching)
// Aiheet: vlsm, dmz_vlsm, dmz, cloud_vpn, san, ha_firewall, bgp, smart_city

const TEACHING_PART_3 = {
    // ==========================================
    // 1. VLSM – VAIHTUVAPITUUKSISET ALIVERKOT
    // ==========================================
    vlsm: (details, cidr) => `
        <div class="bg-slate-800/95 p-4 rounded-xl border border-slate-600 space-y-3.5">
            <div class="flex items-center justify-between border-b border-slate-700 pb-2">
                <h4 class="text-sm font-extrabold text-blue-400 flex items-center gap-2">
                    <span>📐</span> VLSM-osastointi (Variable Length Subnet Mask)
                </h4>
                <span class="px-2 py-0.5 text-[10px] font-bold bg-blue-500/20 text-blue-300 rounded border border-blue-500/30">L3 Arkkitehtuuri</span>
            </div>

            <p class="text-xs text-slate-300 leading-relaxed">
                <strong class="text-white">VLSM (Variable Length Subnet Masking)</strong> on modernin verkkosuunnittelun kulmakivi. Perinteisessä kiinteässä aliverkotuksessa (FLSM) kaikille osastoille jaettiin saman kokoinen lohko, mikä johti valtavaan IP-osoitteiden haaskaukseen. VLSM mahdollistaa yhden osoiteavaruuden (esim. <code class="text-cyan-300">192.168.50.0/24</code>) pilkkomisen erikokoisiin osiin kunkin osaston todellisen laitetarpeen mukaan.
            </p>

            <!-- Arkkitehtuuri- ja laskentasäännöt -->
            <div class="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/80 text-xs text-slate-200 space-y-2.5">
                <div class="font-bold text-cyan-400 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                    <span>⚙️</span> Arkkitehtuuri- ja laskentasäännöt
                </div>
                <ul class="list-disc list-inside space-y-1.5 text-slate-300 leading-relaxed">
                    <li><strong class="text-amber-300">1. Kultainen sääntö – Suurimmasta pienimpään:</strong> Aliverkot on AINA järjestettävä ja jaettava suurimmasta isäntätarpeesta pienimpään (<span class="font-mono text-cyan-300">Largest to Smallest</span>). Jos aloitat pienistä lohkoista (/29 tai /30), osoiteavaruus pirstaloituu eikä suurille aliverkoille löydy enää binäärirajoihin sopivaa tilaa.</li>
                    <li><strong class="text-amber-300">2. Lohkokoon valinta (2^h):</strong> Etsi pienin kahden potenssi, johon mahtuu osaston laitemäärä + 2 (Network ID ja Broadcast): <span class="font-mono text-purple-300">2^h ≥ N + 2</span>. Isäntäbitit ovat <span class="font-mono text-purple-300">h</span> ja uusi prefiksi on <span class="font-mono text-purple-300">32 − h</span>.</li>
                    <li><strong class="text-amber-300">3. Peräkkäislaskenta ilman päällekkäisyyksiä:</strong> Ensimmäinen verkko alkaa osoitteesta <code class="text-emerald-400 font-mono">.0</code>. Kukin seuraava aliverkko alkaa tasan edellisen aliverkon Broadcast-osoitteen seuraavasta luvusta: <code class="text-emerald-400 font-mono">Seuraava Network ID = Edellinen Broadcast + 1</code>. Jokaisen aliverkon alkuosoitteen on oltava tasan jaollinen sen lohkokoolla!</li>
                    <li><strong class="text-amber-300">4. Turvasegmentointi:</strong> Jokainen aliverkko muodostaa itsenäisen broadcast-alueen ja VLANin. Laitteet eivät voi kommunikoida osastojen yli ilman reitittimen tai L3-kytkimen suorittamaa reititystä ja pääsylistoja (ACL).</li>
                </ul>
            </div>

            <!-- Malliesimerkki numeroilla -->
            <div class="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/80 text-xs space-y-2">
                <div class="font-bold text-amber-400 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                    <span>📊</span> Malliesimerkki: Tehdasverkko 192.168.50.0/24
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left font-mono text-[11px] text-slate-300 border-collapse">
                        <thead>
                            <tr class="border-b border-slate-700 text-slate-400">
                                <th class="py-1">Osasto / Käyttö</th>
                                <th class="py-1">Lohko</th>
                                <th class="py-1">Network ID</th>
                                <th class="py-1">Käyttökelpoiset IP:t</th>
                                <th class="py-1">Broadcast</th>
                                <th class="py-1">Peite</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-800">
                            <tr>
                                <td class="py-1 text-white font-sans font-medium">Linja 1 (30 host)</td>
                                <td class="py-1 text-cyan-300">/27 (32)</td>
                                <td class="py-1 text-emerald-400">.0</td>
                                <td class="py-1">.1 – .30</td>
                                <td class="py-1 text-amber-300">.31</td>
                                <td class="py-1">.224</td>
                            </tr>
                            <tr>
                                <td class="py-1 text-white font-sans font-medium">Linja 2 (30 host)</td>
                                <td class="py-1 text-cyan-300">/27 (32)</td>
                                <td class="py-1 text-emerald-400">.32</td>
                                <td class="py-1">.33 – .62</td>
                                <td class="py-1 text-amber-300">.63</td>
                                <td class="py-1">.224</td>
                            </tr>
                            <tr>
                                <td class="py-1 text-white font-sans font-medium">Valvomo (14 host)</td>
                                <td class="py-1 text-cyan-300">/28 (16)</td>
                                <td class="py-1 text-emerald-400">.64</td>
                                <td class="py-1">.65 – .78</td>
                                <td class="py-1 text-amber-300">.79</td>
                                <td class="py-1">.240</td>
                            </tr>
                            <tr>
                                <td class="py-1 text-white font-sans font-medium">Palvelimet (14 host)</td>
                                <td class="py-1 text-cyan-300">/28 (16)</td>
                                <td class="py-1 text-emerald-400">.80</td>
                                <td class="py-1">.81 – .94</td>
                                <td class="py-1 text-amber-300">.95</td>
                                <td class="py-1">.240</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Pro-vinkki -->
            <div class="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-lg text-xs text-emerald-200 space-y-1">
                <div class="font-bold flex items-center gap-1.5 text-emerald-300">
                    <span>💡</span> Pro-vinkki: Binäärirajojen tasaus (Binary Boundary Alignment)
                </div>
                <p class="leading-relaxed">
                    VLSM-aliverkkoa ei voi aloittaa mistä tahansa parillisesta luvusta. Esimerkiksi /27-aliverkon (koko 32) aloitusosoitteen on oltava 32:lla jaollinen (.0, .32, .64, .96...). Vastaavasti /28-aliverkon (koko 16) on alettava 16:lla jaollisesta osoitteesta (.0, .16, .32, .48, .64...). Käytä aina IPAM-työkalua tai dokumentoitua aliverkkotaulukkoa estääksesi päällekkäiset IP-konfliktit.
                </p>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // ==========================================
    // 2. DMZ_VLSM – KONESALIN MONITASOINEN DMZ
    // ==========================================
    dmz_vlsm: (details, cidr) => `
        <div class="bg-slate-800/95 p-4 rounded-xl border border-slate-600 space-y-3.5">
            <div class="flex items-center justify-between border-b border-slate-700 pb-2">
                <h4 class="text-sm font-extrabold text-blue-400 flex items-center gap-2">
                    <span>🛡️</span> Konesalin DMZ & VLSM-turvavyöhykkeet
                </h4>
                <span class="px-2 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">Multi-Tier DMZ</span>
            </div>

            <p class="text-xs text-slate-300 leading-relaxed">
                Modernissa konesaliarkkitehtuurissa julkiset palvelimet ja kriittiset tietokannat eivät koskaan sijaitse samassa verkossa. <strong class="text-white">Monitasoinen DMZ-VLSM</strong> eristää julkisen etupään (Web-tier), suojatun taustajärjestelmän (DB-tier), palomuurikäytävän sekä hallintavalvomon (NOC) toisistaan tiukasti mitoitetuilla aliverkoilla, joita keskitetty Next-Generation Firewall (NGFW) valvoo.
            </p>

            <!-- Arkkitehtuuri- ja laskentasäännöt -->
            <div class="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/80 text-xs text-slate-200 space-y-2.5">
                <div class="font-bold text-cyan-400 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                    <span>⚙️</span> Arkkitehtuuri ja vyöhykesäännöt
                </div>
                <ul class="list-disc list-inside space-y-1.5 text-slate-300 leading-relaxed">
                    <li><strong class="text-amber-300">Eriytetyt kerrokset (Tiering):</strong> Web-palvelimet sijoitetaan julkiseen DMZ-vyöhykkeeseen (/27), jonne on pääsy Internetistä. Tietokannat sijoitetaan sisäiseen DB-vyöhykkeeseen (/27), jonne EI ole suoraa reittiä ulkoverkosta.</li>
                    <li><strong class="text-amber-300">Laskenta ilman aukkoja (10.0.1.0/24):</strong> Suuremmat /27-lohkot lasketaan ensin: Web-alue (.0/27, lohko 32) ja DB-alue (.32/27, lohko 32). Tämän jälkeen pienemmät /28-lohkot: Palomuurivyöhyke (.64/28, lohko 16) ja NOC-valvomo (.80/28, lohko 16).</li>
                    <li><strong class="text-amber-300">Tietoturvan oletuskielto (Zero Trust / Deny All):</strong> Kaikki liikenne vyöhykkeiden välillä on oletuksena estetty. Vain eksplisiittisesti määritellyt portit sallitaan tilallisella (stateful) tarkastuksella.</li>
                    <li><strong class="text-amber-300">Yhteyksien aloitussääntö:</strong> Internet voi ottaa yhteyden Web-palvelimeen (portit 80/443). Web-palvelin voi ottaa yhteyden tietokantaan (portti 3306/5432). DMZ:stä EI KOSKAAN sallita uusien yhteyksien avaamista sisäverkkoon tai NOC-alueelle päin!</li>
                </ul>
            </div>

            <!-- Malliesimerkki numeroilla -->
            <div class="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/80 text-xs space-y-2">
                <div class="font-bold text-amber-400 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                    <span>📊</span> Malliesimerkki: Konesalin osoiteavaruus 10.0.1.0/24
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left font-mono text-[11px] text-slate-300 border-collapse">
                        <thead>
                            <tr class="border-b border-slate-700 text-slate-400">
                                <th class="py-1">Vyöhyke</th>
                                <th class="py-1">CIDR</th>
                                <th class="py-1">Network ID</th>
                                <th class="py-1">Käyttökelpoiset IP:t</th>
                                <th class="py-1">Broadcast</th>
                                <th class="py-1">Palomuurikäytäntö</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-800">
                            <tr>
                                <td class="py-1 text-white font-sans font-medium">Web-DMZ</td>
                                <td class="py-1 text-cyan-300">/27 (.224)</td>
                                <td class="py-1 text-emerald-400">10.0.1.0</td>
                                <td class="py-1">10.0.1.1 – .30</td>
                                <td class="py-1 text-amber-300">10.0.1.31</td>
                                <td class="py-1 text-blue-300">In: 80, 443 (WAN)</td>
                            </tr>
                            <tr>
                                <td class="py-1 text-white font-sans font-medium">DB-Sisäverkko</td>
                                <td class="py-1 text-cyan-300">/27 (.224)</td>
                                <td class="py-1 text-emerald-400">10.0.1.32</td>
                                <td class="py-1">10.0.1.33 – .62</td>
                                <td class="py-1 text-amber-300">10.0.1.63</td>
                                <td class="py-1 text-purple-300">In: SQL vain Webistä</td>
                            </tr>
                            <tr>
                                <td class="py-1 text-white font-sans font-medium">Palomuurikäytävä</td>
                                <td class="py-1 text-cyan-300">/28 (.240)</td>
                                <td class="py-1 text-emerald-400">10.0.1.64</td>
                                <td class="py-1">10.0.1.65 – .78</td>
                                <td class="py-1 text-amber-300">10.0.1.79</td>
                                <td class="py-1 text-emerald-300">Reititys & Tarkastus</td>
                            </tr>
                            <tr>
                                <td class="py-1 text-white font-sans font-medium">NOC-Valvomo</td>
                                <td class="py-1 text-cyan-300">/28 (.240)</td>
                                <td class="py-1 text-emerald-400">10.0.1.80</td>
                                <td class="py-1">10.0.1.81 – .94</td>
                                <td class="py-1 text-amber-300">10.0.1.95</td>
                                <td class="py-1 text-amber-300">Hallinta (SSH/mTLS)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Pro-vinkki -->
            <div class="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-lg text-xs text-emerald-200 space-y-1">
                <div class="font-bold flex items-center gap-1.5 text-emerald-300">
                    <span>💡</span> Pro-vinkki: Murtosuojattu mTLS-tietokantayhteys
                </div>
                <p class="leading-relaxed">
                    Jos julkinen Web-palvelin kompromettoidaan (esim. haavoittuvan verkkosovelluksen kautta), hyökkääjä yrittää välittömästi kartoittaa DB-aliverkkoa. Palomuurisäännön lisäksi Web- ja DB-palvelimien välinen liikenne tulee suojata molemminpuolisella TLS-varmenteella (mutual TLS). Tällöin hyökkääjä ei pysty suorittamaan suoria kyselyitä tietokantaan ilman palvelimen salattua asiakassertifikaattia.
                </p>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // ==========================================
    // 3. DMZ – DEMILITARISOITU VYÖHYKE
    // ==========================================
    dmz: (details, cidr) => `
        <div class="bg-slate-800/95 p-4 rounded-xl border border-slate-600 space-y-3.5">
            <div class="flex items-center justify-between border-b border-slate-700 pb-2">
                <h4 class="text-sm font-extrabold text-blue-400 flex items-center gap-2">
                    <span>🏰</span> DMZ – Demilitarisoitu vyöhyke (/28)
                </h4>
                <span class="px-2 py-0.5 text-[10px] font-bold bg-rose-500/20 text-rose-300 rounded border border-rose-500/30">Reunaturva</span>
            </div>

            <p class="text-xs text-slate-300 leading-relaxed">
                <strong class="text-white">DMZ (Demilitarized Zone)</strong> on eristetty puskuriverkko julkisen Internetin ja organisaation suojatun sisäverkon (LAN) välissä. Kaikki julkisuuteen näkyvät palvelimet – kuten Web-, Mail- ja DNS-palvelimet – sijoitetaan DMZ-verkkoon. Vaikka ulkopuolinen hyökkääjä onnistuisi murtamaan DMZ-palvelimen, hän ei pääse suoraan käsiksi sisäverkon työasemiin tai tiedostoihin.
            </p>

            <!-- Arkkitehtuuri- ja laskentasäännöt -->
            <div class="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/80 text-xs text-slate-200 space-y-2.5">
                <div class="font-bold text-cyan-400 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                    <span>⚙️</span> /28-aliverkon laskenta ja reititys
                </div>
                <ul class="list-disc list-inside space-y-1.5 text-slate-300 leading-relaxed">
                    <li><strong class="text-amber-300">Isäntäbitit ja lohko:</strong> Prefiksi /28 jättää isännille <span class="font-mono text-purple-300">32 − 28 = 4 bittiä</span>. Lohkon koko on <span class="font-mono text-purple-300">2^4 = 16 osoitetta</span>.</li>
                    <li><strong class="text-amber-300">Aliverkon peite:</strong> Viimeisen tavun arvo on <span class="font-mono text-purple-300">256 − 16 = 240</span>, joten peite on <code class="text-cyan-300 font-mono">255.255.255.240</code>.</li>
                    <li><strong class="text-amber-300">Käyttökelpoiset osoitteet:</strong> 16 osoitteesta 2 varataan (Network ID ja Broadcast), joten käytettävissä on tasan <span class="font-mono text-emerald-400 font-bold">14 isäntää</span>.</li>
                    <li><strong class="text-amber-300">Kolmijalkainen palomuuri (Tri-Homed Firewall):</strong> Palomuurilla on kolme fyysistä rajapintaa:
                        <br>1. <span class="text-rose-400 font-semibold">WAN (Untrusted)</span> – Suodattamaton ulkoverkko.
                        <br>2. <span class="text-amber-400 font-semibold">DMZ (Semi-Trusted)</span> – Julkiset palvelimet tiukoilla sisääntuloporttisäännöillä.
                        <br>3. <span class="text-emerald-400 font-semibold">LAN (Trusted)</span> – Sisäverkon hallintakoneet ja käyttäjät.
                    </li>
                </ul>
            </div>

            <!-- Malliesimerkki numeroilla -->
            <div class="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/80 text-xs space-y-2">
                <div class="font-bold text-amber-400 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                    <span>📊</span> Malliesimerkki: IT-tuen DMZ 172.16.99.0/28
                </div>
                <div class="p-3 bg-slate-950/80 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                    <p><span class="text-slate-400">Verkko-osoite (Network ID):</span> <span class="text-emerald-400 font-bold">172.16.99.0</span></p>
                    <p><span class="text-slate-400">Default Gateway (Palomuuri):</span> <span class="text-cyan-300 font-bold">172.16.99.1</span></p>
                    <p><span class="text-slate-400">Käyttökelpoiset isännät:</span> <span class="text-white font-bold">172.16.99.1 – 172.16.99.14</span> (14 kpl)</p>
                    <p><span class="text-slate-400">Yleislähetys (Broadcast):</span> <span class="text-amber-300 font-bold">172.16.99.15</span></p>
                    <p><span class="text-slate-400">Aliverkon peite:</span> <span class="text-purple-300 font-bold">255.255.255.240</span> (/28)</p>
                </div>
            </div>

            <!-- Pro-vinkki -->
            <div class="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-lg text-xs text-emerald-200 space-y-1">
                <div class="font-bold flex items-center gap-1.5 text-emerald-300">
                    <span>💡</span> Pro-vinkki: DMZ:n identiteettieristys
                </div>
                <p class="leading-relaxed">
                    Älä koskaan liitä DMZ-palvelimia suoraan yrityksen sisäverkon Active Directory -toimialueeseen samoilla Domain Admin -tunnuksilla. Jos DMZ-palvelin murretaan, muistista dumpatut tunnukset (esim. Mimikatz) vaarantaisivat koko organisaation. Käytä DMZ-palvelimilla erillistä tunnistusmetsää (Forest) tai paikallisia tilejä ilman luottosuhdetta sisäverkkoon.
                </p>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // ==========================================
    // 4. CLOUD_VPN – PILVI & SITE-TO-SITE VPN
    // ==========================================
    cloud_vpn: (details, cidr) => `
        <div class="bg-slate-800/95 p-4 rounded-xl border border-slate-600 space-y-3.5">
            <div class="flex items-center justify-between border-b border-slate-700 pb-2">
                <h4 class="text-sm font-extrabold text-blue-400 flex items-center gap-2">
                    <span>☁️</span> Pilvi-integraatio & Site-to-Site IPsec VPN
                </h4>
                <span class="px-2 py-0.5 text-[10px] font-bold bg-sky-500/20 text-sky-300 rounded border border-sky-500/30">Hybrid Cloud</span>
            </div>

            <p class="text-xs text-slate-300 leading-relaxed">
                Hybridipilviarkkitehtuurissa yrityksen paikallinen konesali (On-Premises) yhdistetään julkiseen pilvipalveluun (AWS VPC, Azure VNet tai Google Cloud) vahvasti salatulla <strong class="text-white">IPsec Site-to-Site VPN</strong> -tunnelilla. Paikallisen verkon palvelimet ja pilvessä ajettavat Web- ja tietokantakerrokset kommunikoivat saumattomasti keskenään aivan kuin ne olisivat samassa lähiverkossa.
            </p>

            <!-- Arkkitehtuuri- ja laskentasäännöt -->
            <div class="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/80 text-xs text-slate-200 space-y-2.5">
                <div class="font-bold text-cyan-400 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                    <span>⚙️</span> Hybridiverkon arkkitehtuuri ja säännöt
                </div>
                <ul class="list-disc list-inside space-y-1.5 text-slate-300 leading-relaxed">
                    <li><strong class="text-amber-300">1. Ei koskaan päällekkäisiä verkkoja (Non-overlapping CIDRs):</strong> Paikallinen konesali ja pilven virtuaaliverkot eivät saa käyttää samaa osoiteavaruutta! Jos molemmat käyttäisivät osoitteita <code class="text-rose-400">192.168.1.0/24</code>, reititys rikkoutuisi ilman monimutkaista ja vika-altista kahdensuuntaista NAT-käännöstä.</li>
                    <li><strong class="text-amber-300">2. VPN-siirtovyöhyke (/29 Transit):</strong> Palomuurin ja pilven VPN Gatewayn välinen yhteys muodostetaan dedikoidussa siirtoverkossa (esim. <code class="text-cyan-300">192.168.100.0/29</code>, lohko 8 osoitetta, peite <code class="text-cyan-300">255.255.255.248</code>).</li>
                    <li><strong class="text-amber-300">3. Monitasoinen pilviverkko (Multi-Tier VPC):</strong> Pilvessä sovellukset jaetaan erillisiin aliverkkoihin:
                        <br>• <span class="text-sky-300 font-semibold">Web-tier (172.31.1.0/24)</span> – Julkiset etupään mikropalvelut.
                        <br>• <span class="text-purple-300 font-semibold">DB-tier (172.31.2.0/24)</span> – Eristetty tietokantakerros vain sisäisellä reitityksellä.
                    </li>
                    <li><strong class="text-amber-300">4. IPsec-tunneli (IKEv2):</strong> Liikenne kapseloidaan ja salataan AES-256-GCM / SHA-256 -kryptografialla julkisen verkon yli.</li>
                </ul>
            </div>

            <!-- Malliesimerkki numeroilla -->
            <div class="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/80 text-xs space-y-2">
                <div class="font-bold text-amber-400 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                    <span>📊</span> Malliesimerkki: Hybridipilven osoitesuunnitelma
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left font-mono text-[11px] text-slate-300 border-collapse">
                        <thead>
                            <tr class="border-b border-slate-700 text-slate-400">
                                <th class="py-1">Verkkoalue</th>
                                <th class="py-1">CIDR</th>
                                <th class="py-1">Peite</th>
                                <th class="py-1">Gateway</th>
                                <th class="py-1">Käyttö</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-800">
                            <tr>
                                <td class="py-1 text-white font-sans font-medium">On-Prem Konesali</td>
                                <td class="py-1 text-emerald-400">192.168.1.0/24</td>
                                <td class="py-1">255.255.255.0</td>
                                <td class="py-1 text-cyan-300">192.168.1.1</td>
                                <td class="py-1 text-slate-300">Paikalliset palvelimet & NOC</td>
                            </tr>
                            <tr>
                                <td class="py-1 text-white font-sans font-medium">VPN Gateway Transit</td>
                                <td class="py-1 text-emerald-400">192.168.100.0/29</td>
                                <td class="py-1">255.255.255.248</td>
                                <td class="py-1 text-cyan-300">192.168.100.1</td>
                                <td class="py-1 text-slate-300">Palomuurin ja pilven VPN-pääte</td>
                            </tr>
                            <tr>
                                <td class="py-1 text-white font-sans font-medium">Pilvi VPC Web-Tier</td>
                                <td class="py-1 text-emerald-400">172.31.1.0/24</td>
                                <td class="py-1">255.255.255.0</td>
                                <td class="py-1 text-cyan-300">172.31.1.1</td>
                                <td class="py-1 text-slate-300">Julkiset pilvipalvelimet</td>
                            </tr>
                            <tr>
                                <td class="py-1 text-white font-sans font-medium">Pilvi VPC DB-Tier</td>
                                <td class="py-1 text-emerald-400">172.31.2.0/24</td>
                                <td class="py-1">255.255.255.0</td>
                                <td class="py-1 text-cyan-300">172.31.2.1</td>
                                <td class="py-1 text-slate-300">Suojatut pilvitietokannat</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Pro-vinkki -->
            <div class="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-lg text-xs text-emerald-200 space-y-1">
                <div class="font-bold flex items-center gap-1.5 text-emerald-300">
                    <span>💡</span> Pro-vinkki: Dynaaminen BGP-reititys VPN-tunnelissa
                </div>
                <p class="leading-relaxed">
                    Älä käytä tuotantoverkon pilviyhteyksissä staattisia reittejä. Kun määrität VPN-tunnelin yli kulkemaan dynaamisen BGP-reitityksen (esim. On-Prem ASN 65000 ja Cloud ASN 64512), reitittimet jakavat aliverkkotiedot automaattisesti. Jos toinen rinnakkaisista VPN-tunneleista vikaantuu, BGP kääntää liikennevirran varatunnelille sekunneissa ilman manuaalista työtä.
                </p>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // ==========================================
    // 5. SAN – STORAGE AREA NETWORK
    // ==========================================
    san: (details, cidr) => `
        <div class="bg-slate-800/95 p-4 rounded-xl border border-slate-600 space-y-3.5">
            <div class="flex items-center justify-between border-b border-slate-700 pb-2">
                <h4 class="text-sm font-extrabold text-blue-400 flex items-center gap-2">
                    <span>💾</span> SAN – Konesalin tallennusverkko (/24)
                </h4>
                <span class="px-2 py-0.5 text-[10px] font-bold bg-purple-500/20 text-purple-300 rounded border border-purple-500/30">Storage Fabric</span>
            </div>

            <p class="text-xs text-slate-300 leading-relaxed">
                <strong class="text-white">SAN (Storage Area Network)</strong> on konesalin kriittinen erillisverkko, joka yhdistää virtualisointipalvelimet (VMware ESXi, Proxmox, Hyper-V) ja nopeat massatallennusjärjestelmät (All-Flash SAN Array, NVMe-oF, iSCSI). SAN-verkossa vaaditaan äärimmäisen matalaa latenssia (alle 1 ms) ja 0 % pakettihukkaa, sillä pienikin viive pysäyttää tietokantojen luku- ja kirjoitusoperaatiot.
            </p>

            <!-- Arkkitehtuuri- ja laskentasäännöt -->
            <div class="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/80 text-xs text-slate-200 space-y-2.5">
                <div class="font-bold text-cyan-400 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                    <span>⚙️</span> SAN-arkkitehtuuri ja suunnittelusäännöt
                </div>
                <ul class="list-disc list-inside space-y-1.5 text-slate-300 leading-relaxed">
                    <li><strong class="text-amber-300">1. Eristetty L2-verkko – Ei reititystä ulos:</strong> SAN-verkkoa (<code class="text-cyan-300 font-mono">10.99.99.0/24</code>) EI KOSKAAN reititetä toimistoverkkoon tai julkiseen Internetiin. Se pidetään täysin suljettuna tallennusklusterin sisäisenä kytkinverkkona.</li>
                    <li><strong class="text-amber-300">2. Dual-Fabric kahdennus (Fabric A & B):</strong> SAN rakennetaan aina kahtena toisistaan täysin riippumattomana fyysisenä kytkinverkkona. Jokaisessa palvelimessa ja levyhyllyssä on vähintään kaksi verkkoliitäntää. Jos Kytkin A hajoaa, MPIO-monipolkuprotokolla (Multipath I/O) ohjaa datavirran välittömästi Kytkimen B kautta.</li>
                    <li><strong class="text-amber-300">3. Looginen /24-osoitejaottelu:</strong> Vaikka verkko on yhtenäinen /24 (254 isäntää), osoitteet segmentoidaan selkeisiin lohkoihin:
                        <br>• <span class="text-purple-300">.1 – .10</span>: Tallennuskytkimet ja ohjainyksiköt (Controllers A/B)
                        <br>• <span class="text-cyan-300">.11 – .50</span>: Massamuistiräkit ja NVMe-levyhyllyt
                        <br>• <span class="text-emerald-300">.51 – .100</span>: Sovelluspalvelimien ja hypervisorien SAN-liitännät
                    </li>
                </ul>
            </div>

            <!-- Malliesimerkki numeroilla -->
            <div class="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/80 text-xs space-y-2">
                <div class="font-bold text-amber-400 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                    <span>📊</span> Malliesimerkki: Konesalin SAN 10.99.99.0/24
                </div>
                <div class="p-3 bg-slate-950/80 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                    <p><span class="text-slate-400">Verkko-osoite (Network ID):</span> <span class="text-emerald-400 font-bold">10.99.99.0</span></p>
                    <p><span class="text-slate-400">Aliverkon peite:</span> <span class="text-purple-300 font-bold">255.255.255.0</span> (/24)</p>
                    <p><span class="text-slate-400">SAN Switch Fabric A:</span> <span class="text-cyan-300 font-bold">10.99.99.1</span></p>
                    <p><span class="text-slate-400">SAN Switch Fabric B:</span> <span class="text-cyan-300 font-bold">10.99.99.2</span></p>
                    <p><span class="text-slate-400">Tallennuspalvelinräkit:</span> <span class="text-white font-bold">10.99.99.11 – 10.99.99.14</span></p>
                    <p><span class="text-slate-400">Sovelluspalvelimet:</span> <span class="text-white font-bold">10.99.99.51 – 10.99.99.54</span></p>
                    <p><span class="text-slate-400">Broadcast-osoite:</span> <span class="text-amber-300 font-bold">10.99.99.255</span></p>
                </div>
            </div>

            <!-- Pro-vinkki -->
            <div class="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-lg text-xs text-emerald-200 space-y-1">
                <div class="font-bold flex items-center gap-1.5 text-emerald-300">
                    <span>💡</span> Pro-vinkki: Jumbo Frames (MTU 9000) & Vuonohjaus (PFC)
                </div>
                <p class="leading-relaxed">
                    Normaali Ethernet-paketti on 1500 tavua (MTU 1500). SAN-tallennusverkoissa kytkimiin ja palvelimiin konfiguroidaan aina <strong class="text-white">Jumbo Frames (MTU 9000)</strong>. Tämä vähentää TCP-otsikoiden suhteellista määrää 83 % ja vapauttaa palvelimien suoritintehoa massiivisissa I/O-siirroissa. Ota lisäksi käyttöön <strong class="text-white">Priority Flow Control (PFC)</strong>, joka takaa häviöttömän siirron ilman pakettipudotuksia.
                </p>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // ==========================================
    // 6. HA_FIREWALL – HA-PALOMUURIKLUSTERI
    // ==========================================
    ha_firewall: (details, cidr) => `
        <div class="bg-slate-800/95 p-4 rounded-xl border border-slate-600 space-y-3.5">
            <div class="flex items-center justify-between border-b border-slate-700 pb-2">
                <h4 class="text-sm font-extrabold text-blue-400 flex items-center gap-2">
                    <span>🔒</span> HA-Palomuuriklusteri & Sydänlanka (/29)
                </h4>
                <span class="px-2 py-0.5 text-[10px] font-bold bg-red-500/20 text-red-300 rounded border border-red-500/30">High Availability</span>
            </div>

            <p class="text-xs text-slate-300 leading-relaxed">
                Kriittisissä yritys- ja konesaliverkoissa yksittäinen palomuuri on vaarallinen vikaantumispiste (Single Point of Failure). <strong class="text-white">Korkean käytettävyyden (High Availability, HA) palomuuripari</strong> toimii Active/Passive- tai Active/Active-tilassa. Laitteet jakavat pienen /29-siirtoverkon ja synkronoivat tilatietonsa suoran <strong class="text-white">Heartbeat-sydänlankalinkin</strong> kautta.
            </p>

            <!-- Arkkitehtuuri- ja laskentasäännöt -->
            <div class="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/80 text-xs text-slate-200 space-y-2.5">
                <div class="font-bold text-cyan-400 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                    <span>⚙️</span> /29-laskenta ja HA-arkkitehtuuri
                </div>
                <ul class="list-disc list-inside space-y-1.5 text-slate-300 leading-relaxed">
                    <li><strong class="text-amber-300">Tarkka /29-lohkon mitoitus:</strong> Prefiksi /29 antaa <span class="font-mono text-purple-300">32 − 29 = 3 isäntäbittiä</span>. Lohkokoko on <span class="font-mono text-purple-300">2^3 = 8 osoitetta</span> ja peite on <code class="text-cyan-300 font-mono">255.255.255.248</code> (256 − 8 = 248).</li>
                    <li><strong class="text-amber-300">6 käyttökelpoista osoitetta:</strong> HA-klusteri vaatii tasan:
                        <br>1. <span class="text-amber-300">VIP (Virtual IP / Gateway)</span>: Yhteinen kelluva osoite, johon reititin ja DMZ-laitteet viittaavat.
                        <br>2. <span class="text-cyan-300">FW-01 fyysinen IP</span>: Ensisijaisen palomuurin oma osoite.
                        <br>3. <span class="text-cyan-300">FW-02 fyysinen IP</span>: Toissijaisen palomuurin oma osoite.
                        <br>4. <span class="text-emerald-300">SOC-valvonta & Reititin</span>: Hallinta- ja reitityspisteet.
                    </li>
                    <li><strong class="text-amber-300">Sydänlankalinkki (Stateful Synchronization):</strong> Palomuurit kytketään toisiinsa suoralla kaapelilla ilman välikytkimiä. Sen yli replikoidaan jatkuvasti aktiiviset TCP/UDP-sessiot, VPN-avaimet ja NAT-taulut. Jos FW-01 kaatuu, FW-02 jatkaa ilman yhdenkään käyttäjäyhteyden katkeamista (Stateful Failover).</li>
                </ul>
            </div>

            <!-- Malliesimerkki numeroilla -->
            <div class="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/80 text-xs space-y-2">
                <div class="font-bold text-amber-400 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                    <span>📊</span> Malliesimerkki: HA-klusterin jako 192.0.2.0/29
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left font-mono text-[11px] text-slate-300 border-collapse">
                        <thead>
                            <tr class="border-b border-slate-700 text-slate-400">
                                <th class="py-1">Laite / Rooli</th>
                                <th class="py-1">IP-osoite</th>
                                <th class="py-1">Peite</th>
                                <th class="py-1">Funktio</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-800">
                            <tr>
                                <td class="py-1 text-slate-400 font-sans">Network ID</td>
                                <td class="py-1 text-emerald-400">192.0.2.0</td>
                                <td class="py-1">255.255.255.248</td>
                                <td class="py-1 text-slate-500">Varattu aliverkolle</td>
                            </tr>
                            <tr>
                                <td class="py-1 text-white font-sans font-medium">Reunareititin / VIP</td>
                                <td class="py-1 text-cyan-300">192.0.2.1</td>
                                <td class="py-1">255.255.255.248</td>
                                <td class="py-1 text-amber-300">Default Gateway</td>
                            </tr>
                            <tr>
                                <td class="py-1 text-white font-sans font-medium">Palomuuri 1 (Active)</td>
                                <td class="py-1 text-cyan-300">192.0.2.2</td>
                                <td class="py-1">255.255.255.248</td>
                                <td class="py-1 text-emerald-300">Ensisijainen liikenne</td>
                            </tr>
                            <tr>
                                <td class="py-1 text-white font-sans font-medium">Palomuuri 2 (Standby)</td>
                                <td class="py-1 text-cyan-300">192.0.2.3</td>
                                <td class="py-1">255.255.255.248</td>
                                <td class="py-1 text-sky-300">Kuuma varalaite</td>
                            </tr>
                            <tr>
                                <td class="py-1 text-white font-sans font-medium">SOC Valvonta / Hallinta</td>
                                <td class="py-1 text-cyan-300">192.0.2.4</td>
                                <td class="py-1">255.255.255.248</td>
                                <td class="py-1 text-slate-300">SNMP / Syslog-seuranta</td>
                            </tr>
                            <tr>
                                <td class="py-1 text-slate-400 font-sans">Broadcast</td>
                                <td class="py-1 text-amber-300">192.0.2.7</td>
                                <td class="py-1">255.255.255.248</td>
                                <td class="py-1 text-slate-500">Yleislähetysosoite</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Pro-vinkki -->
            <div class="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-lg text-xs text-emerald-200 space-y-1">
                <div class="font-bold flex items-center gap-1.5 text-emerald-300">
                    <span>💡</span> Pro-vinkki: Split-Brain -katastrofin esto
                </div>
                <p class="leading-relaxed">
                    Jos HA-palomuurien välinen sydänlankakaapeli vaurioituu, syntyy <strong class="text-white">Split-Brain</strong> -tila: molemmat laitteet luulevat toisen kuolleen ja yrittävät aktivoida saman VIP-osoitteen. Tämä johtaa välittömään ARP-flappingiin ja verkon kaatumiseen. Tuotannossa käytetään aina vähintään kahta toisistaan erillistä fyysistä Heartbeat-linkkiä eri verkkokorteilla (Redundant Heartbeat Interfaces).
                </p>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // ==========================================
    // 7. BGP – REUNAREITITYS & SIIRTOVERKOT
    // ==========================================
    bgp: (details, cidr) => `
        <div class="bg-slate-800/95 p-4 rounded-xl border border-slate-600 space-y-3.5">
            <div class="flex items-center justify-between border-b border-slate-700 pb-2">
                <h4 class="text-sm font-extrabold text-blue-400 flex items-center gap-2">
                    <span>⚡</span> BGP-Reititys & P2P-siirtoverkot (/30)
                </h4>
                <span class="px-2 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">Border Gateway Protocol</span>
            </div>

            <p class="text-xs text-slate-300 leading-relaxed">
                <strong class="text-white">BGP (Border Gateway Protocol)</strong> on koko globaalin Internetin selkäranka. Se ohjaa datapaketteja itsenäisten järjestelmien (Autonomous System, AS) välillä. Kun yrityksen reunareititin (AS-BR) liitetään kahteen tai useampaan teleoperaattoriin (Multi-homing), kytkentään käytetään erittäin tiukkoja <strong class="text-white">/30-pisteestä-pisteeseen (Point-to-Point)</strong> siirtoverkkoja.
            </p>

            <!-- Arkkitehtuuri- ja laskentasäännöt -->
            <div class="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/80 text-xs text-slate-200 space-y-2.5">
                <div class="font-bold text-cyan-400 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                    <span>⚙️</span> /30-laskenta ja BGP-arkkitehtuuri
                </div>
                <ul class="list-disc list-inside space-y-1.5 text-slate-300 leading-relaxed">
                    <li><strong class="text-amber-300">Tasan kaksi isäntää (/30 P2P):</strong> Isäntäbittejä on <span class="font-mono text-purple-300">32 − 30 = 2</span>. Lohkokoko on <span class="font-mono text-purple-300">2^2 = 4 osoitetta</span>. Peite on <code class="text-cyan-300 font-mono">255.255.255.252</code>. Käyttökelpoisia osoitteita on tasan kaksi (<span class="font-mono text-emerald-400">4 − 2 = 2</span>) – yksi yrityksen reitittimelle ja yksi operaattorille ilman ainoatakaan hukkaosoitetta.</li>
                    <li><strong class="text-amber-300">Peräkkäiset 4:n lohkot:</strong> Jokainen /30-linkki kuluttaa tarkalleen neljän numeron lohkon:
                        <br>• Linkki 1: <code class="text-cyan-300">.0/30</code> (Net .0, Hostit .1 & .2, BC .3)
                        <br>• Linkki 2: <code class="text-cyan-300">.4/30</code> (Net .4, Hostit .5 & .6, BC .7)
                        <br>• Sisäinen Core: <code class="text-cyan-300">.8/30</code> (Net .8, Hostit .9 & .10, BC .11)
                    </li>
                    <li><strong class="text-amber-300">BGP Peering ja ASN:</strong> Operaattorin ja yrityksen reitittimet muodostavat TCP-istunnon (portti 179). eBGP-protokolla vaihtaa reititystauluja ja valitsee aina lyhimmän AS-Path -reitin. Jos toinen operaattoriyhteys katkeaa, BGP kääntää kaiken liikenteen toiselle operaattorille automaattisesti.</li>
                </ul>
            </div>

            <!-- Malliesimerkki numeroilla -->
            <div class="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/80 text-xs space-y-2">
                <div class="font-bold text-amber-400 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                    <span>📊</span> Malliesimerkki: BGP-siirtoverkot 10.255.0.0
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left font-mono text-[11px] text-slate-300 border-collapse">
                        <thead>
                            <tr class="border-b border-slate-700 text-slate-400">
                                <th class="py-1">Siirtoyhteys</th>
                                <th class="py-1">CIDR</th>
                                <th class="py-1">Network ID</th>
                                <th class="py-1">Yrityksen IP</th>
                                <th class="py-1">Vastapään IP</th>
                                <th class="py-1">Broadcast</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-800">
                            <tr>
                                <td class="py-1 text-white font-sans font-medium">ISP 1 Peering</td>
                                <td class="py-1 text-cyan-300">/30 (.252)</td>
                                <td class="py-1 text-emerald-400">10.255.0.0</td>
                                <td class="py-1 text-white font-bold">10.255.0.1</td>
                                <td class="py-1 text-slate-300">10.255.0.2</td>
                                <td class="py-1 text-amber-300">10.255.0.3</td>
                            </tr>
                            <tr>
                                <td class="py-1 text-white font-sans font-medium">ISP 2 Peering</td>
                                <td class="py-1 text-cyan-300">/30 (.252)</td>
                                <td class="py-1 text-emerald-400">10.255.0.4</td>
                                <td class="py-1 text-white font-bold">10.255.0.5</td>
                                <td class="py-1 text-slate-300">10.255.0.6</td>
                                <td class="py-1 text-amber-300">10.255.0.7</td>
                            </tr>
                            <tr>
                                <td class="py-1 text-white font-sans font-medium">Yrityksen Reuna (AS-BR)</td>
                                <td class="py-1 text-cyan-300">/30 (.252)</td>
                                <td class="py-1 text-emerald-400">10.255.0.8</td>
                                <td class="py-1 text-white font-bold">10.255.0.9</td>
                                <td class="py-1 text-slate-300">10.255.0.10</td>
                                <td class="py-1 text-amber-300">10.255.0.11</td>
                            </tr>
                            <tr>
                                <td class="py-1 text-white font-sans font-medium">BGP Valvomo (NOC)</td>
                                <td class="py-1 text-cyan-300">/28 (.240)</td>
                                <td class="py-1 text-emerald-400">10.255.0.16</td>
                                <td class="py-1 text-white">.17 – .30</td>
                                <td class="py-1 text-slate-300">NOC-työasemat</td>
                                <td class="py-1 text-amber-300">10.255.0.31</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Pro-vinkki -->
            <div class="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-lg text-xs text-emerald-200 space-y-1">
                <div class="font-bold flex items-center gap-1.5 text-emerald-300">
                    <span>💡</span> Pro-vinkki: RPKI & BGP TCP-AO -reunaturva
                </div>
                <p class="leading-relaxed">
                    BGP ei oletuksena varmenna vastaanotettuja reitti-ilmoituksia, mikä mahdollistaa vaaralliset reittikaappaukset (BGP Hijacking). Ota reunareitittimillä käyttöön <strong class="text-white">RPKI (Resource Public Key Infrastructure)</strong>, joka hylkää automaattisesti luvattomat reitit. Lisäksi BGP-sessiot operaattorien välillä tulee aina suojata <strong class="text-white">TCP Authentication Option (TCP-AO)</strong>- tai MD5-avaimella ja GTSM-suojauksella (TTL=255).
                </p>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // ==========================================
    // 8. SMART_CITY – ÄLYKAUPUNGIN IoT-RUNKOVERKKO
    // ==========================================
    smart_city: (details, cidr) => `
        <div class="bg-slate-800/95 p-4 rounded-xl border border-slate-600 space-y-3.5">
            <div class="flex items-center justify-between border-b border-slate-700 pb-2">
                <h4 class="text-sm font-extrabold text-blue-400 flex items-center gap-2">
                    <span>🏙️</span> Älykaupungin IoT-verkko & Luokan B /16-avaruus
                </h4>
                <span class="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">Metropolitan IoT</span>
            </div>

            <p class="text-xs text-slate-300 leading-relaxed">
                Metropolialueen älykaupunki-infrastruktuuri yhdistää kymmeniä tuhansia laitteita: liikennevaloja, valvontakameroita, sääasemia, ilmanlaatuantureita ja liikenteenohjauskeskuksen palvelimia. Näin valtava laitemäärä vaatii yhtenäisen suuraliverkon, kuten Luokan B <strong class="text-white">/16-osoiteavaruuden (65 534 käyttökelpoista osoitetta)</strong>, jota hallitaan hierarkkisella osoitesuunnittelulla.
            </p>

            <!-- Arkkitehtuuri- ja laskentasäännöt -->
            <div class="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/80 text-xs text-slate-200 space-y-2.5">
                <div class="font-bold text-cyan-400 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                    <span>⚙️</span> /16-aliverkon matematiikka ja hierarkia
                </div>
                <ul class="list-disc list-inside space-y-1.5 text-slate-300 leading-relaxed">
                    <li><strong class="text-amber-300">Kaksi ensimmäistä tavua verkolle (/16):</strong> Prefiksi /16 tarkoittaa, että ensimmäiset 16 bittiä muodostavat verkko-osan (<code class="text-cyan-300">10.100.x.x</code>). Isännille jää <span class="font-mono text-purple-300">32 − 16 = 16 bittiä</span> (3. ja 4. oktetti).</li>
                    <li><strong class="text-amber-300">Kapasiteetti ja peite:</strong> Osoitteita on yhteensä <span class="font-mono text-purple-300">2^16 = 65 536 kpl</span>. Aliverkon peite on selkeä <code class="text-cyan-300 font-mono">255.255.0.0</code>. Käyttökelpoisia isäntiä on <span class="font-mono text-emerald-400 font-bold">65 534 kpl</span> (.0.1 – .255.254).</li>
                    <li><strong class="text-amber-300">Hierarkkinen 3. oktetin lohkojaottelu:</strong> Vaikka peite on /16, reitityksen ja dokumentoinnin selkeyttämiseksi 3. oktettia käytetään aluekohtaisena tunnisteena:
                        <br>• <code class="text-cyan-300">10.100.1.x</code>: Keskustan risteysalue 1 (Tori)
                        <br>• <code class="text-cyan-300">10.100.2.x</code>: Kehätien risteysalue 2 (Valtaväylä)
                        <br>• <code class="text-cyan-300">10.100.10.x</code>: Liikennekeskuksen analytiikkapalvelimet
                        <br>• <code class="text-cyan-300">10.100.20.x</code>: NOC-valvomo ja operaattorien työasemat
                    </li>
                    <li><strong class="text-amber-300">Yleislähetysmyrskyjen esto (Broadcast Isolation):</strong> 65 000 laitetta samassa kytkentäsilmukassa romahduttaisi verkon broadcast-myrskyihin. Älykaupungeissa käytetään <strong class="text-white">Private VLAN (PVLAN)</strong> -eristystä, jossa kukin katutason IoT-laite voi kommunikoida vain keskitetyn yhdyskäytävän kanssa, ei toisten antureiden kanssa.</li>
                </ul>
            </div>

            <!-- Malliesimerkki numeroilla -->
            <div class="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/80 text-xs space-y-2">
                <div class="font-bold text-amber-400 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                    <span>📊</span> Malliesimerkki: Älykaupunkirunko 10.100.0.0/16
                </div>
                <div class="p-3 bg-slate-950/80 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                    <p><span class="text-slate-400">Verkko-osoite (Network ID):</span> <span class="text-emerald-400 font-bold">10.100.0.0</span></p>
                    <p><span class="text-slate-400">Aliverkon peite:</span> <span class="text-purple-300 font-bold">255.255.0.0</span> (/16)</p>
                    <p><span class="text-slate-400">Default Gateway (Reititin):</span> <span class="text-cyan-300 font-bold">10.100.0.1</span></p>
                    <p><span class="text-slate-400">Ensimmäinen ja viimeinen isäntä:</span> <span class="text-white font-bold">10.100.0.1 – 10.100.255.254</span></p>
                    <p><span class="text-slate-400">Yleislähetys (Broadcast):</span> <span class="text-amber-300 font-bold">10.100.255.255</span></p>
                    <p><span class="text-slate-400">Kapasiteetti:</span> <span class="text-emerald-300 font-bold">65 534 laitetta</span></p>
                </div>
            </div>

            <!-- Pro-vinkki -->
            <div class="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-lg text-xs text-emerald-200 space-y-1">
                <div class="font-bold flex items-center gap-1.5 text-emerald-300">
                    <span>💡</span> Pro-vinkki: Zero Trust IoT & 802.1X Porttitodennus
                </div>
                <p class="leading-relaxed">
                    Liikennevalojen kytkinkaapit ja kameratolpat sijaitsevat julkisilla kaduilla, missä ne ovat alttiina fyysiselle ilkivallalle. Jos hyökkääjä avaa katukaapin ja kytkee oman läppärinsä vapaaseen RJ45-porttiin, verkkoon ei saa syntyä pääsyä. Kaikissa reunakytkimissä on oltava käytössä <strong class="text-white">IEEE 802.1X -porttitodennus</strong> laitesertifikaateilla (EAP-TLS), <strong class="text-white">MACsec-linkkisalaus</strong> ja porttikohtainen lukitus (<code class="text-white">port-security violation shutdown</code>).
                </p>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`
};

/**
 * TEACHING_PART_EXTENDED - Täydentävät pedagogiset moduulit:
 * - magic_number: Päässälaskutekniikka (256 - maski = lohkokoko)
 * - bitwise_and: Reitittimen bittitason AND-operaatio
 * - classful_networking: Luokat A, B, C, D, E vs. CIDR (RFC 1519)
 * - special_ips: RFC 1918 Yksityiset verkot, APIPA 169.254.x.x ja Loopback
 * - point_to_point_31: RFC 3021 /31 ja /32 konesaleissa ja reititinlinkeissä
 * - wildcard_masks: Käänteinen peite palomuureille (ACL) ja OSPF:lle
 */
const TEACHING_PART_EXTENDED = {
    // -------------------------------------------------------------------------
    // 25. MAGIC_NUMBER (Päässälaskukaava)
    // -------------------------------------------------------------------------
    magic_number: (details, cidr) => `
        <div class="space-y-3">
            <div class="bg-slate-800/90 p-4 rounded-xl border border-slate-600 shadow-md">
                <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        ⚡ CCNA PRO -PÄÄSSÄLASKU
                    </span>
                    <span class="text-xs font-mono text-slate-400">Magic Number = 256 − Maski</span>
                </div>
                <h4 class="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                    🎩 Magic Number -menetelmä: Aliverkotus 5 sekunnissa
                </h4>
                <p class="text-slate-300 text-xs leading-relaxed mb-2.5">
                    Tuotantoverkoissa tai sertifiointitenteissä (kuten Cisco CCNA) kenelläkään ei ole aikaa piirtää 32-bittisiä bittikaavioita tai laskea potensseja. Insinöörit käyttävät aina <strong class="text-amber-300">Magic Number</strong> -menetelmää.
                </p>
                <div class="bg-slate-900/90 p-3 rounded-lg border border-slate-700/80 text-xs text-slate-200 space-y-2">
                    <div class="font-bold text-cyan-300 text-sm">Kolme askelta:</div>
                    <p>1. <strong class="text-white">Tunnista muuttuva oktetti:</strong> Esim. maskissa <span class="font-mono text-cyan-300">255.255.255.224</span> (/27) muutos tapahtuu 4. oktetissa (<code class="text-amber-300 font-bold">224</code>).</p>
                    <p>2. <strong class="text-white">Laske Magic Number:</strong> Vähennä luvusta 256: <span class="font-mono text-emerald-300 font-bold">256 − 224 = 32</span>. Lohkokoko on siis <strong class="text-emerald-300">32</strong>!</p>
                    <p>3. <strong class="text-white">Hyppää lohkokoon välein:</strong> Aliverkot alkavat: <span class="font-mono text-purple-300">.0, .32, .64, .96, .128, .160, .192, .224</span>.</p>
                </div>
            </div>

            <!-- Esimerkkianalyysi -->
            <div class="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-1.5">
                <div class="font-bold text-white flex items-center gap-1.5">
                    <span>🎯</span> Esimerkki: Mihin aliverkkoon IP 192.168.1.75 kuuluu maskilla /27?
                </div>
                <p class="leading-relaxed">
                    Lohkokoko on 32. Luvut ovat 0, 32, 64, 96... Luku 75 sijoittuu lukujen <strong class="text-cyan-300">64</strong> ja <strong class="text-slate-400">96</strong> väliin.
                    Aliverkon osoite on siis <strong class="text-emerald-300">192.168.1.64</strong>, ensimmäinen isäntä on <strong class="text-white">.65</strong>, viimeinen isäntä on <strong class="text-white">.94</strong> ja broadcast on <strong class="text-amber-300">.95</strong> (yhtä vaille seuraava lohko 96)!
                </p>
            </div>

            <div class="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-lg text-xs text-emerald-200 space-y-1">
                <div class="font-bold flex items-center gap-1.5 text-emerald-300">
                    <span>💡</span> Pro-vinkki: Maskiarvot ja Magic Numberit ulkoa
                </div>
                <p class="leading-relaxed font-mono text-[11px]">
                    /25 (.128) → 256−128 = 128 | /26 (.192) → 256−192 = 64 | /27 (.224) → 256−224 = 32<br>
                    /28 (.240) → 256−240 = 16  | /29 (.248) → 256−248 = 8  | /30 (.252) → 256−252 = 4
                </p>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // -------------------------------------------------------------------------
    // 26. BITWISE_AND (Reitittimen logiikka)
    // -------------------------------------------------------------------------
    bitwise_and: (details, cidr) => `
        <div class="space-y-3">
            <div class="bg-slate-800/90 p-4 rounded-xl border border-slate-600 shadow-md">
                <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                        ⚙️ RAUTATASON LOGIIKKA
                    </span>
                    <span class="text-xs font-mono text-slate-400">Bitwise AND Operation</span>
                </div>
                <h4 class="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                    🧩 Miten tietokone tietää, onko kohde paikallisverkossa?
                </h4>
                <p class="text-slate-300 text-xs leading-relaxed mb-2.5">
                    Kun tietokone haluaa lähettää paketin IP-osoitteeseen B, käyttöjärjestelmän TCP/IP-pino tekee <strong class="text-amber-300">loogisen AND-operaation</strong> kahdesti:
                </p>
                <ol class="list-decimal list-inside text-xs text-slate-200 space-y-1 mb-2.5">
                    <li><code class="text-cyan-300">Oma IP AND Oma Maski = Oma Network ID</code></li>
                    <li><code class="text-cyan-300">Kohteen IP AND Oma Maski = Kohteen Network ID</code></li>
                </ol>
                <p class="text-slate-300 text-xs leading-relaxed">
                    Jos tulokset ovat <strong class="text-emerald-300">identtiset</strong>, laite tietää kohteen olevan samassa kytkimessä ja lähettää suoraan ARP-kyselyn. Jos tulokset ovat <strong class="text-rose-300">erilaiset</strong>, paketti ohjataan <strong class="text-white">Oletusyhdyskäytävälle (Default Gateway)</strong>.
                </p>
            </div>

            <!-- Totuustaulu & Esimerkki -->
            <div class="bg-slate-900/90 p-3 rounded-lg border border-slate-700/80 text-xs text-slate-200 space-y-2">
                <div class="font-bold text-cyan-400 text-xs">Bitwise AND -totuustaulu:</div>
                <div class="font-mono text-xs grid grid-cols-4 gap-2 bg-slate-800 p-2 rounded text-center">
                    <div>1 AND 1 = <strong class="text-emerald-400">1</strong></div>
                    <div>1 AND 0 = <strong class="text-slate-400">0</strong></div>
                    <div>0 AND 1 = <strong class="text-slate-400">0</strong></div>
                    <div>0 AND 0 = <strong class="text-slate-400">0</strong></div>
                </div>
                <p class="text-slate-300 text-[11px] leading-relaxed">
                    Maskissa jokainen <span class="text-emerald-300 font-bold">1-bitti</span> kopioi IP-osoitteen bitin suoraan verkko-osoitteeseen, ja jokainen <span class="text-amber-300 font-bold">0-bitti</span> pakottaa tuloksen nollaksi (isäntäosa nollautuu).
                </p>
            </div>

            <div class="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-lg text-xs text-emerald-200 space-y-1">
                <div class="font-bold flex items-center gap-1.5 text-emerald-300">
                    <span>💡</span> Pro-vinkki: Laitteistokiihdytys (TCAM)
                </div>
                <p class="leading-relaxed">
                    Yritysreitittimet eivät laske AND-operaatiota ohjelmallisella CPU:lla, vaan erikoistuneilla <strong class="text-white">TCAM (Ternary Content-Addressable Memory)</strong> -piireillä rinnakkain nanosekunneissa sadoille miljoonille paketeille sekunnissa (Line-rate forwarding).
                </p>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // -------------------------------------------------------------------------
    // 27. CLASSFUL_NETWORKING (Luokat A, B, C, D, E vs CIDR)
    // -------------------------------------------------------------------------
    classful_networking: (details, cidr) => `
        <div class="space-y-3">
            <div class="bg-slate-800/90 p-4 rounded-xl border border-slate-600 shadow-md">
                <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                        📜 HISTORIA & STANDARDI
                    </span>
                    <span class="text-xs font-mono text-slate-400">RFC 791 vs RFC 1519</span>
                </div>
                <h4 class="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                    🏛️ Luokallinen verkko (Classful) vs. Luokaton CIDR
                </h4>
                <p class="text-slate-300 text-xs leading-relaxed mb-2.5">
                    Alun perin vuonna 1981 (RFC 791) aliverkon peitteitä ei lähetetty reititystauluissa! IP-osoitteet oli jaettu kiinteisiin luokkiin ensimmäisen oktetin mukaan:
                </p>
                <div class="space-y-1.5 text-xs font-mono">
                    <div class="p-2 bg-slate-900 rounded border border-slate-700/60 flex justify-between">
                        <span class="text-blue-300 font-bold">Luokka A (1–126)</span>
                        <span class="text-slate-300">Maski /8 (255.0.0.0) · 16,7M isäntää</span>
                    </div>
                    <div class="p-2 bg-slate-900 rounded border border-slate-700/60 flex justify-between">
                        <span class="text-purple-300 font-bold">Luokka B (128–191)</span>
                        <span class="text-slate-300">Maski /16 (255.255.0.0) · 65 534 isäntää</span>
                    </div>
                    <div class="p-2 bg-slate-900 rounded border border-slate-700/60 flex justify-between">
                        <span class="text-emerald-300 font-bold">Luokka C (192–223)</span>
                        <span class="text-slate-300">Maski /24 (255.255.255.0) · 254 isäntää</span>
                    </div>
                    <div class="p-2 bg-slate-900 rounded border border-slate-700/60 flex justify-between">
                        <span class="text-amber-300 font-bold">Luokka D (224–239)</span>
                        <span class="text-slate-300">Multicast (Ryhmälähetys, esim. OSPF)</span>
                    </div>
                    <div class="p-2 bg-slate-900 rounded border border-slate-700/60 flex justify-between">
                        <span class="text-rose-300 font-bold">Luokka E (240–255)</span>
                        <span class="text-slate-300">Kokeellinen / Varattu tulevaisuuteen</span>
                    </div>
                </div>
            </div>

            <!-- CIDR-vallankumous -->
            <div class="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-1.5">
                <div class="font-bold text-white flex items-center gap-1.5">
                    <span>🚀</span> Miksi CIDR (Classless Inter-Domain Routing) luotiin 1993?
                </div>
                <p class="leading-relaxed">
                    Yritykselle, joka tarvitsi 300 osoitetta, oli annettava koko Luokka B (65 534 IP-osoitetta), jolloin 65 234 osoitetta meni hukkaan! Vuonna 1993 <strong class="text-cyan-300">CIDR (RFC 1519)</strong> vapautti peitteet mielivaltaisiksi (/8 – /32). Nyt verkko voidaan mitoittaa tarkasti tarpeen mukaan (esim. /23 = 510 isäntää).
                </p>
            </div>

            <div class="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-lg text-xs text-emerald-200 space-y-1">
                <div class="font-bold flex items-center gap-1.5 text-emerald-300">
                    <span>💡</span> Pro-vinkki: Miksi osoite 127.0.0.0 puuttuu luokista?
                </div>
                <p class="leading-relaxed">
                    Koko osoitealue <code class="text-white font-bold">127.0.0.0/8</code> (yli 16 miljoonaa osoitetta!) varattiin aikoinaan pelkkään laitteen sisäiseen silmukkaan (<strong class="text-cyan-300">Loopback / Localhost</strong>). Tämän päivän silmin tämä oli valtavaa osoitehukkaa, mutta standardi on pysyvä.
                </p>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // -------------------------------------------------------------------------
    // 28. SPECIAL_IPS (RFC 1918, APIPA, Loopback)
    // -------------------------------------------------------------------------
    special_ips: (details, cidr) => `
        <div class="space-y-3">
            <div class="bg-slate-800/90 p-4 rounded-xl border border-slate-600 shadow-md">
                <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        🛡️ ERIKOISOSOITTEET
                    </span>
                    <span class="text-xs font-mono text-slate-400">RFC 1918 & RFC 3927</span>
                </div>
                <h4 class="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                    🔒 Yksityiset verkot, APIPA ja Vianmääritys
                </h4>
                <p class="text-slate-300 text-xs leading-relaxed mb-2.5">
                    Kaikkia IPv4-osoitteita ei saa reitittää julkiseen Internettiin. Insinöörin on tunnettava nämä ulkoa:
                </p>
                <div class="space-y-2 text-xs">
                    <div class="p-2.5 bg-slate-900 rounded-lg border border-slate-700/80">
                        <div class="font-bold text-cyan-300 mb-1">1. RFC 1918 – Yksityiset IP-osoitteet (Private IPs):</div>
                        <p class="text-slate-300 mb-1">Ilmaiseksi kenen tahansa käytettävissä sisäverkoissa. Internetin reitittimet hylkäävät nämä välittömästi ilman <strong class="text-amber-300">NAT-osoitteenmuunnosta</strong>:</p>
                        <ul class="list-disc list-inside font-mono text-slate-200 text-[11px] space-y-0.5">
                            <li><strong class="text-white">10.0.0.0/8</strong> (10.0.0.0 – 10.255.255.255)</li>
                            <li><strong class="text-white">172.16.0.0/12</strong> (172.16.0.0 – 172.31.255.255)</li>
                            <li><strong class="text-white">192.168.0.0/16</strong> (192.168.0.0 – 192.168.255.255)</li>
                        </ul>
                    </div>

                    <div class="p-2.5 bg-slate-900 rounded-lg border border-slate-700/80">
                        <div class="font-bold text-amber-300 mb-1">2. APIPA (Automatic Private IP Addressing, RFC 3927):</div>
                        <p class="text-slate-300">
                            Osoitealue <span class="font-mono text-white font-bold">169.254.0.0/16</span>. Jos tietokoneessa näkyy tämä osoite, se on <strong class="text-rose-400">hälytysmerkki</strong>: DHCP-palvelin on alhaalla, kaapeli irti tai VLAN-määritys väärin!
                        </p>
                    </div>
                </div>
            </div>

            <div class="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-lg text-xs text-emerald-200 space-y-1">
                <div class="font-bold flex items-center gap-1.5 text-emerald-300">
                    <span>💡</span> Pro-vinkki: CGNAT (100.64.0.0/10, RFC 6598)
                </div>
                <p class="leading-relaxed">
                    Jos mobiililiittymäsi tai kotireitittimesi WAN-portti saa osoitteen väliltä <code class="text-white">100.64.0.0 – 100.127.255.255</code>, operaattorisi käyttää <strong class="text-cyan-300">Carrier-Grade NAT</strong> -tekniikkaa. Tällöin sinulla ei ole julkista IP-osoitetta, eikä portinohjaus (Port Forwarding) toimi ilman IPv6- tai VPN-tunnelia!
                </p>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // -------------------------------------------------------------------------
    // 29. POINT_TO_POINT_31 (RFC 3021 /31 ja /32 Konesaleissa)
    // -------------------------------------------------------------------------
    point_to_point_31: (details, cidr) => `
        <div class="space-y-3">
            <div class="bg-slate-800/90 p-4 rounded-xl border border-slate-600 shadow-md">
                <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        🏢 KONESALISTANDARDI
                    </span>
                    <span class="text-xs font-mono text-slate-400">RFC 3021 & RFC 4632</span>
                </div>
                <h4 class="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                    ⚡ /31 ja /32: Miten modernit runkoverkot säästävät IP-osoitteita?
                </h4>
                <p class="text-slate-300 text-xs leading-relaxed mb-2.5">
                    Perinteisesti kahden reitittimen välille luotiin <strong class="text-amber-300">/30-aliverkko</strong> (4 osoitetta: 1 verkko, 1 broadcast, 2 isäntää). Tämä tuhlaa 50% osoitteista!
                </p>
                <div class="bg-slate-900/90 p-3 rounded-lg border border-slate-700/80 text-xs text-slate-200 space-y-2">
                    <div class="font-bold text-cyan-300 text-sm">RFC 3021: Kahden isännän /31-linkit:</div>
                    <p class="text-slate-300">
                        Konesaliverkoissa (Spine-Leaf) ja runkoreitittimien välissä käytetään poikkeuksetta <strong class="text-emerald-300">/31-aliverkkoa</strong> (peite <span class="font-mono text-white">255.255.255.254</span>).
                    </p>
                    <p class="text-slate-300">
                        Koska linkissä on vain kaksi laitetta, <span class="text-white font-bold">verkko- ja broadcast-osoitteita ei tarvita!</span> Molemmat osoitteet (esim. <code class="text-cyan-300">10.0.0.0</code> ja <code class="text-cyan-300">10.0.0.1</code>) toimivat isäntäosoitteina reititinpäissä. Tämä tuplaa runkoverkon kapasiteetin.
                    </p>
                </div>
            </div>

            <!-- /32 Host Route -->
            <div class="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-1.5">
                <div class="font-bold text-white flex items-center gap-1.5">
                    <span>📍</span> /32 (255.255.255.255): Yhden laitteen reitti (Host Route)
                </div>
                <p class="leading-relaxed">
                    /32 tarkoittaa, että kaikki 32 bittiä kuuluvat verkolle (0 isäntäbittiä). Sitä käytetään reitittimen virtuaalisessa <strong class="text-purple-300">Loopback0-rajapinnassa</strong> (OSPF/BGP Router ID) sekä palomuurien säännöissä, jotka koskevat täsmälleen yhtä ainoaa palvelinta.
                </p>
            </div>

            <div class="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-lg text-xs text-emerald-200 space-y-1">
                <div class="font-bold flex items-center gap-1.5 text-emerald-300">
                    <span>💡</span> Pro-vinkki: Kaapelimodeemit ja point-to-point
                </div>
                <p class="leading-relaxed">
                    Kaikki modernit yrityskytkimet (Cisco IOS-XE, Juniper Junos, Arista EOS) tukevat suoraan /31-osoitteita. Jos yrität määrittää vanhaan Windows XP -koneeseen /31-osoitetta, käyttöjärjestelmä estää sen, koska vanhat pinot vaativat perinteisen broadcast-osoitteen.
                </p>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`,

    // -------------------------------------------------------------------------
    // 30. WILDCARD_MASKS (Käänteinen peite palomuureille)
    // -------------------------------------------------------------------------
    wildcard_masks: (details, cidr) => `
        <div class="space-y-3">
            <div class="bg-slate-800/90 p-4 rounded-xl border border-slate-600 shadow-md">
                <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                        🔥 PALOMUURIT & ACL
                    </span>
                    <span class="text-xs font-mono text-slate-400">Wildcard Mask (Inverse Mask)</span>
                </div>
                <h4 class="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                    🔄 Mikä on Wildcard Mask ja miten se lasketaan?
                </h4>
                <p class="text-slate-300 text-xs leading-relaxed mb-2.5">
                    Cisco-palomuureissa (Access Control Lists, ACL) ja OSPF/EIGRP-reititysprotokollissa ei käytetä tavallista aliverkon peitettä, vaan <strong class="text-amber-300">Wildcard Maskia (käänteistä peitettä)</strong>.
                </p>
                <div class="bg-slate-900/90 p-3 rounded-lg border border-slate-700/80 text-xs text-slate-200 space-y-2">
                    <div class="font-bold text-cyan-300 text-sm">Yksinkertainen laskukaava:</div>
                    <div class="p-2 bg-slate-800 rounded font-mono text-sm text-center text-emerald-300 font-bold">
                        255.255.255.255 − Aliverkon Peite = Wildcard Mask
                    </div>
                    <p class="text-slate-300">
                        Esimerkki: Aliverkon /27 peite on <span class="font-mono text-white">255.255.255.224</span>.<br>
                        Vähennetään: <span class="font-mono text-purple-300">255.255.255.255 − 255.255.255.224 = 0.0.0.31</span>.
                    </p>
                </div>
            </div>

            <!-- Merkitys biteissä -->
            <div class="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-1.5">
                <div class="font-bold text-white flex items-center gap-1.5">
                    <span>💡</span> Mitä bitit tarkoittavat palomuurille?
                </div>
                <ul class="list-disc list-inside text-xs text-slate-200 space-y-1">
                    <li><strong class="text-emerald-400">0-bitti:</strong> "Tämän bitin on vastattava tarkasti" (Match exactly).</li>
                    <li><strong class="text-amber-400">1-bitti:</strong> "Tällä bitillä ei ole väliä" (Ignore / Wildcard).</li>
                </ul>
                <p class="text-slate-400 text-[11px] mt-1">
                    Siksi yksittäinen isäntäosoite (/32) määritellään ACL:ssä: <code class="text-cyan-300">host 192.168.1.50</code> tai <code class="text-cyan-300">192.168.1.50 0.0.0.0</code>.
                </p>
            </div>

            <div class="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-lg text-xs text-emerald-200 space-y-1">
                <div class="font-bold flex items-center gap-1.5 text-emerald-300">
                    <span>💡</span> Pro-vinkki: Epäjatkuvat Wildcardit (Discontiguous Mask)
                </div>
                <p class="leading-relaxed">
                    Toisin kuin aliverkon peitteen, Wildcard Maskin ykkösten ja nollien ei tarvitse olla peräkkäisiä! Maskilla <code class="text-white">0.0.0.1</code> voidaan yhdellä ACL-säännöllä suodattaa kaikki aliverkon parittomat IP-osoitteet kerralla.
                </p>
            </div>
        </div>
        ${subnetBlock(details, cidr)}`
};

// Yhdistetty globaali opetusmateriaali
const TEACHING_CONTENT = Object.assign({},
    typeof TEACHING_PART_1 !== 'undefined' ? TEACHING_PART_1 : {},
    typeof TEACHING_PART_2 !== 'undefined' ? TEACHING_PART_2 : {},
    typeof TEACHING_PART_3 !== 'undefined' ? TEACHING_PART_3 : {},
    typeof TEACHING_PART_EXTENDED !== 'undefined' ? TEACHING_PART_EXTENDED : {}
);

if (typeof window !== 'undefined') {
    window.TEACHING_CONTENT = TEACHING_CONTENT;
}
if (typeof globalThis !== 'undefined') {
    globalThis.TEACHING_CONTENT = TEACHING_CONTENT;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TEACHING_CONTENT;
}
