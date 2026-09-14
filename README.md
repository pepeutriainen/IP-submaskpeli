# 🌐 Subnet Architect – Verkkoarkkitehti

> **Interaktiivinen 3D-verkkosuunnittelu- ja aliverkotussimulaattori (IPv4 / CIDR / VLSM)**  
> Opi tietoverkkojen suunnittelu, kaapelointi ja aliverkottaminen käytännössä – aina kotiverkoista konesaleihin ja ISP-runkoverkkoihin asti!

[![GitHub License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20WebGL%20%7C%20Three.js-emerald.svg)](index.html)
[![Levels](https://img.shields.io/badge/Tasot-61%20Teht%C3%A4v%C3%A4%C3%A4-cyan.svg)](js/levels.js)
[![Status](https://img.shields.io/badge/Status-Aktiivinen%20kehitys-brightgreen.svg)]()

---

## 📖 Sisällysluettelo
1. [Esittely](#-esittely)
2. [Pääominaisuudet](#-pääominaisuudet)
3. [Pedagogiikka & CCNA Pro Master](#-pedagogiikka--ccna-pro-master)
4. [Laitteet ja 3D-mallit](#-laitteet-ja-3d-mallit)
5. [Tasorakenne (61 Tehtävää)](#-tasorakenne-61-tehtävää)
6. [Tekninen arkkitehtuuri](#-tekninen-arkkitehtuuri)
7. [Asennus ja paikallinen käynnistys](#-asennus-ja-paikallinen-käynnistys)
8. [Jatkokehityssuunnitelma (Roadmap)](#-jatkokehityssuunnitelma-roadmap)

---

## 🎯 Esittely

**Subnet Architect** on suoraan selaimessa toimiva isometrinen 3D-oppimispeli, joka opettaa tietoliikenneverkkojen arkkitehtuuria ja IPv4-aliverkotusta. 

Pelissä ei vain lasketa numeroita paperilla, vaan **rakennetaan aitoja yritysverkkoja**: sijoitetaan kytkimiä, vedetään kuitu- ja kuparikaapeleita, konfiguroidaan reitittimiä ja palomuureja sekä määritetään laitteille oikeat IP-osoitteet, aliverkon peitteet (Subnet Mask), verkko-tunnukset (Network ID) ja yleislähetysosoitteet (Broadcast).

---

## ✨ Pääominaisuudet

- 🎮 **Aito 3D-maailma (Three.js WebGL)**: Isometrinen katselukulma, reaaliaikaiset varjot, dynaaminen kaapelointi ja laiteanimaatiot.
- 🏢 **Arkkitehtoniset huonepohjat**: Jokaisella tasolla on uniikki tilapohja (esim. sairaala, autokorjaamo, konesali, yliopistokampus) omine värikoodattuine aliverkkoineen.
- ⚡ **Cisco Enterprise Core-Access -hierarkia**:
  - **10G Kuitu (Trunk)** runkolaitteille (Core Switch, Gateway, Palomuuri, Palvelimet).
  - **1G Kupari (Access)** työasemille ja oheislaitteille.
  - Säännöt tähtitopologialle ja kytkinten ketjutukselle tilanteen mukaan.
- 📶 **Automaattinen langaton verkko (Wi-Fi & DHCP)**: Wi-Fi-tukiasema siltana (Layer 2) ja automaattinen DHCP-osoitteiden jako kuuluvuusalueella oleville kannettaville.
- 🧮 **Sisäänrakennettu Aliverkkolaskin**: Reaaliaikainen taikanumerolaskin (Magic Number), bittijakolaskuri ja 32-bittinen binäärinen AND-visualisoija.
- 🚀 **Offline-yhteensopivuus**: Toimii täysin ilman ulkoista palvelinta suoraan `file:///`-protokollan yli Base64-pakattujen 3D-mallien ansiosta.

---

## 🎓 Pedagogiikka & CCNA Pro Master

Pelissä hyödynnetään oppimistieteellistä **telineistämisen mallia (Instructional Scaffolding & Fading)**:

1. **Tasot 1–10 (🟢 Perusteet)**: Pelaajaa tuetaan vaiheittaisilla opastuksilla ja vapaasti käytettävissä olevalla Aliverkkotaulukolla (Cheat Sheet).
2. **Tasot 11–40 (🟡 Yritysverkot & DMZ)**: Pelaaja harjoittelee Magic Number -sääntöä (`256 − lohko = peite`) ja verkkojen jakamista mikrosegmentteihin.
3. **Tasot 41–61 (🔴 Konesalit & ISP)**: **CCNA Pro Master (Exam Mode)**:
   - Jos pelaaja ratkaisee tason **avaamatta Cheat Sheetiä**, hän ansaitsee kultaisen **🏆 Pro Master** -sertifiointitähden!
   - Jos pelaaja tarvitsee apua, taulukko on aina saatavilla, jolloin taso läpäistään normaalisti ilman jumiutumista.

---

## 🖲️ Laitteet ja 3D-mallit

Peli sisältää kustomoidut, erittäin kevyet ja optimoidut 3D-mallit:

| Laite | Tyyppi | Mallitiedosto | Kuvaus |
|---|---|---|---|
| **Default Gateway** | Runkolaite | `gateway-edge.glb` | 3U Enterprise Edge Gateway Internet-yhteydelle |
| **Reititin** | L3 Reititys | `router.glb` | 4-antenninen pöytäreititin |
| **Ydinlinkki (Core Switch)** | Runkolaite | `juniper-9204.glb` | 48-porttinen 10G modulaarinen runkokytkin |
| **LAN-kytkin** | L2 Kytkin | `juniper-9204.glb` | 24-porttinen huone-/osastokytkin |
| **Palomuuri** | Tietoturva | `firewall.glb` | Enterprise Next-Gen Firewall (NGFW) |
| **WiFi Tukiasema** | WLAN AP | `ap-ceiling.glb` | Kattoon asennettava Wi-Fi 7 -yritystukiasema |
| **VoIP-puhelin** | Päätelaite | `voip.glb` | Cisco/Polycom-tyylinen pöytäpuhelin LCD-näytöllä |
| **Palvelin** | Päätelaite | `server-4002.glb` | Räkkipalvelin konesali- ja arkistokäyttöön |
| **Pöytäkone (PC)** | Päätelaite | `pc.glb` | Työasema tornikotelolla |
| **Kannettava** | Päätelaite | `kannettava.glb` | Langaton kannettava tietokone |
| **Verkkotulostin** | Oheislaite | `tulostin.glb` | Monitoimitoimistotulostin |
| **Toimistoyksikkö** | Rakennus | `toimisto.glb` | Kokonainen huonekalustettu työtila |

---

## 🗺️ Tasorakenne (61 Tehtävää)

Peli jakautuu kuuteen vaiheeseen:

- **Vaihe 1: 🟢 Pienverkot (SOHO)** *(Tasot 1–10)*: /24 – /30 perusverkot, kotitoimistot, kahvilat ja pienyritykset.
- **Vaihe 2: 🟡 Yritysverkot & DMZ** *(Tasot 11–20)*: Osastoverkot, vieras-WLAN, DMZ-palvelimet ja IP-aluesuositukset.
- **Vaihe 3: 🟠 Kampusverkot & VLAN** *(Tasot 21–30)*: Monikerroksiset rakennukset, Voice VLAN, Core-Access -runkoverkot.
- **Vaihe 4: 🔴 Konesalit & VLSM** *(Tasot 31–40)*: Muuttuvanmittaiset aliverkon peitteet (VLSM), HA-klusterit ja palvelinsalit.
- **Vaihe 5: 🟣 Julkiset verkot & ISP** *(Tasot 41–50)*: Luokattomat superverkot (/20 – /23), runkoreititys ja operaattoriliittymät.
- **Vaihe 6: 🏆 Mestaritasot (CCNA Exam)** *(Tasot 51–61)*: Laajat infrastruktuurit, sairaaloiden hätäverkot ja vaativat vianmääritysskenaariot.

---

## 🛠️ Tekninen arkkitehtuuri

Projekti noudattaa puhdasta, modulaarista IT Studio -arkkitehtuuria ilman raskaita kehysriippuvuuksia:

```text
IP-submaskpeli/
├── assets/
│   ├── icons/            # Käyttöliittymäikonit
│   └── models/           # 3D GLB-mallit ja .glb.js Base64-lataajat
├── css/
│   └── style.css         # Kyber-tyylit, animaatiot ja loader-efektit
├── js/
│   ├── state.js          # Globaalit vakiot, tilanhallinta ja muistinhallinta
│   ├── network.js        # Aliverkkolaskennan matematiikka ja binääritoiminnot
│   ├── levels.js         # 61 tason konfiguraatiot, vyöhykkeet ja tavoitteet
│   ├── scene.js          # Three.js -skenen luonti, kamerat ja valot
│   ├── nodes.js          # Laitteiden 3D-renderöinti, LOD ja mallien elinkaari
│   ├── cables.js         # Kaapelointisäännöt, porttitarkistukset ja vektorikaapelit
│   ├── teaching.js       # Täysi suomenkielinen CCNA-opetusmateriaali ja kaavat
│   ├── ui.js             # Käyttöliittymä, HUD, laskin, modaalit ja hakujärjestelmä
│   └── game.js           # Pelisilmukka, tasonlataus ja edistymisen tallennus
├── graphify-out/         # Graphify-tietämysgraafi ja arkkitehtuuriraportit
└── index.html            # Pääsovellus ja käyttöliittymäkerros
```

---

## 💻 Asennus ja paikallinen käynnistys

Projekti ei vaadi monimutkaista asennusta tai Node.js-käännösvaihetta:

1. **Kloonaa repositorio**:
   ```bash
   git clone https://github.com/pepeutriainen/IP-submaskpeli.git
   cd IP-submaskpeli
   ```

2. **Käynnistä peli**:
   - Avaa `index.html` suoraan missä tahansa modernissa verkkoselaimessa (Chrome, Edge, Firefox, Safari).
   - *TAI* käytä paikallista palvelinta (esim. VS Coden Live Server tai Python):
     ```bash
     python -m http.server 8000
     ```
   - Siirry osoitteeseen `http://localhost:8000`.

---

## 🚀 Jatkokehityssuunnitelma (Roadmap)

Seuraavat ominaisuudet ja niiden tila:

- [x] **Pakettianimaatiot (Packet Simulation)**: Visuaaliset data-valopulssit kaapeleissa ja reaaliaikainen taustaliikenne.
- [x] **Äänimaailma (Sci-Fi Audio Engine)**: Natiivi Web Audio API -äänimoottori (kaapelit, virheet, ping, voittofanfaari) + HUD-mykistyskytkin.
- [x] **Vianmääritystila (Troubleshooting & Ping)**: Interaktiivinen ICMP Echo Ping -testaustyökalu, RTT-mittaus ja kerros 1–3 -vianmääritysopas.
- [ ] **IPv6-tuki (Vaihe 7)**: 128-bittiset heksadesimaaliosoitteet ja SLAAC-autokonfiguraatio.
- [ ] **Moninpeli / Opettajan hallintapaneeli**: Opettaja voi luoda omia aliverkkotehtäviä ja seurata luokan edistymistä reaaliajassa.

---

## 📄 Lisenssi

Tämä projekti on julkaistu [MIT](LICENSE)-lisenssin alaisuudessa.
Kehitetty ylpeydellä IT Studio -laatustandardien mukaisesti.
