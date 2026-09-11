// --- Tasojen luonti ja määrittely ---
// 61 real-world skenaariota: aloittelijasta ammattilaiseen verkkosuunnittelijaksi.
// Kaikissa tasoissa on aito arkkitehtoninen pohjapiirros ja huoneet (Sairaala & Autokorjaamo -standardi).

/**
 * Generoi kaikki 61 tasoa valmiiksi levels-taulukkoon.
 */
function generateLevels() {
    levels = [
        {
            id: 1,
            name: "Kotiverkko (/24)",
            difficulty: 1,
            phase: "🟢 Pienverkot (SOHO)",
            scenario: "Tervetuloa Subnet Architect -peliin! Aloitetaan kodin /24-pienverkosta. Eteisessä on talojakamo, josta yhteys jaetaan fyysisellä kytkimellä työhuoneen toimistoyksikköön ja olohuoneen laitteille.",
            hint: "1. Vedä kaapelit: Default Gateway → Kytkin → Toimisto. 2. Valitse toimisto ja syötä IP (esim. 192.168.1.10) ja aliverkon peite 255.255.255.0.",
            teachingTopic: "ip_basics",
            network: "192.168.1.0",
            cidr: 24,
            allowedTools: ["switch"],
            requiredConnections: [{"from":"gateway","to":"switch"},{"from":"switch","to":"office"}],
            zones: [
          {
                    "x": 0,
                    "z": 0,
                    "w": 14,
                    "d": 8,
                    "color": 6583435,
                    "name": "Eteinen & Jakamo .0/24",
                    "subnet": "192.168.1.0/24"
          },
          {
                    "x": -7,
                    "z": 11,
                    "w": 14,
                    "d": 14,
                    "color": 3900150,
                    "name": "Työhuone .0/24",
                    "subnet": "192.168.1.0/24"
          },
          {
                    "x": 7,
                    "z": 11,
                    "w": 14,
                    "d": 14,
                    "color": 2278750,
                    "name": "Olohuone .0/24",
                    "subnet": "192.168.1.0/24"
          }
],
            requiredNodes: [
          {
                    "type": "switch",
                    "pos": {
                              "x": 0,
                              "z": 1.5
                    }
          },
          {
                    "type": "office",
                    "pos": {
                              "x": -7,
                              "z": 11
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 7,
                              "z": 11
                    }
          }
]
        },
        {
            id: 2,
            name: "Kahvila Bittipannu (/25)",
            difficulty: 1,
            phase: "🟢 Pienverkot (SOHO)",
            scenario: "Kahvila Bittipannu ottaa käyttöön /25-aliverkon (126 isäntää). Tiskillä on kassapääte ja kuittitulostin, asiakassalissa langaton verkko asiakkaiden kannettaville, ja keittiössä taukotilan työasema.",
            hint: "/25-verkon aliverkon peite on 255.255.255.128! Osoitealue on .1 – .126. Yhdistä läppärit WiFi-tukiasemaan ja kassa kytkimeen.",
            teachingTopic: "slash25",
            network: "192.168.2.0",
            cidr: 25,
            allowedTools: ["switch","wifi"],
            
            zones: [
          {
                    "x": -6,
                    "z": 2,
                    "w": 20,
                    "d": 8,
                    "color": 16096779,
                    "name": "Tiski & Kassa .0/25",
                    "subnet": "192.168.2.0/25"
          },
          {
                    "x": 10,
                    "z": 2,
                    "w": 12,
                    "d": 8,
                    "color": 6583435,
                    "name": "Keittiö & Taukotila .0/25",
                    "subnet": "192.168.2.0/25"
          },
          {
                    "x": 0,
                    "z": 12,
                    "w": 32,
                    "d": 12,
                    "color": 11032055,
                    "name": "Asiakassali .0/25",
                    "subnet": "192.168.2.0/25"
          }
],
            requiredNodes: [
          {
                    "type": "switch",
                    "pos": {
                              "x": -12,
                              "z": 2
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -6,
                              "z": 2
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": 0,
                              "z": 2
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 10,
                              "z": 2
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": 0,
                              "z": 9
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -9,
                              "z": 13
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 9,
                              "z": 13
                    }
          }
]
        },
        {
            id: 3,
            name: "Pieni tilitoimisto (/26)",
            difficulty: 1,
            phase: "🟢 Pienverkot (SOHO)",
            scenario: "Pienen tilitoimiston työasemat, arkistopalvelin ja verkkotulostin jaetaan turvalliseen /26-aliverkkoon (62 isäntää).",
            hint: "/26-aliverkon peite on 255.255.255.192. Kytke laitteet kytkimeen ja määritä kullekin uniikki IP alueelta .1 – .62.",
            teachingTopic: "slash26",
            network: "192.168.3.0",
            cidr: 26,
            allowedTools: ["switch"],
            
            zones: [
          {
                    "x": -8,
                    "z": 8,
                    "w": 14,
                    "d": 20,
                    "color": 3900150,
                    "name": "Kirjanpitäjät .0/26",
                    "subnet": "192.168.3.0/26"
          },
          {
                    "x": 7,
                    "z": 3,
                    "w": 16,
                    "d": 10,
                    "color": 2278750,
                    "name": "Asiakaspalvelu .0/26",
                    "subnet": "192.168.3.0/26"
          },
          {
                    "x": 7,
                    "z": 13,
                    "w": 16,
                    "d": 10,
                    "color": 9133302,
                    "name": "Arkisto & Tulostus .0/26",
                    "subnet": "192.168.3.0/26"
          }
],
            requiredNodes: [
          {
                    "type": "switch",
                    "pos": {
                              "x": -8,
                              "z": 1
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -11,
                              "z": 8
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -5,
                              "z": 8
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -8,
                              "z": 14
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 7,
                              "z": 3
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 3,
                              "z": 13
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": 10,
                              "z": 13
                    }
          }
]
        },
        {
            id: 4,
            name: "Parturiliike (/27)",
            difficulty: 2,
            phase: "🟢 Pienverkot (SOHO)",
            scenario: "Parturiliike Saksiniekka tarvitsee kompaktin /27-aliverkon (30 isäntää). Verkko yhdistää parturisalin kassajärjestelmän, ajanvarauskoneet, asiakas-WiFi:n ja takahuoneen.",
            hint: "/27-peite on 255.255.255.224 (30 isäntää). Sallitut osoitteet ovat .1 – .30. Kytke laitteet kytkimeen ja langattomat WiFi-tukiasemaan.",
            teachingTopic: "slash27",
            network: "192.168.4.0",
            cidr: 27,
            allowedTools: ["switch","wifi"],
            
            zones: [
          {
                    "x": 0,
                    "z": 2,
                    "w": 28,
                    "d": 8,
                    "color": 11032055,
                    "name": "Odotustila .0/27",
                    "subnet": "192.168.4.0/27"
          },
          {
                    "x": -5,
                    "z": 12,
                    "w": 18,
                    "d": 12,
                    "color": 16096779,
                    "name": "Parturisali .0/27",
                    "subnet": "192.168.4.0/27"
          },
          {
                    "x": 9,
                    "z": 12,
                    "w": 10,
                    "d": 12,
                    "color": 6583435,
                    "name": "Takahuone .0/27",
                    "subnet": "192.168.4.0/27"
          }
],
            requiredNodes: [
          {
                    "type": "wifi",
                    "pos": {
                              "x": 0,
                              "z": 2
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 8,
                              "z": 2
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -5,
                              "z": 8
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -10,
                              "z": 13
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 0,
                              "z": 13
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": 9,
                              "z": 12
                    }
          }
]
        },
        {
            id: 5,
            name: "Etätyöpiste (/28)",
            difficulty: 2,
            phase: "🟢 Pienverkot (SOHO)",
            scenario: "IT-konsultin kotikonttori ja etätyöpiste eristetään tiukkaan /28-aliverkkoon (14 isäntää). Tekniikkanurkkaus yhdistää kotikonttorin tehotyöaseman ja olohuoneen laitteet suojatusti.",
            hint: "/28-aliverkon peite on 255.255.255.240. Isäntäosoitteet ovat .1 – .14. Kytke laitteet kytkimeen ja määritä IP-osoitteet.",
            teachingTopic: "slash28",
            network: "192.168.5.0",
            cidr: 28,
            allowedTools: ["switch"],
            
            zones: [
          {
                    "x": 0,
                    "z": 2,
                    "w": 28,
                    "d": 8,
                    "color": 6583435,
                    "name": "Tekniikkanurkkaus .0/28",
                    "subnet": "192.168.5.0/28"
          },
          {
                    "x": -7,
                    "z": 12,
                    "w": 14,
                    "d": 12,
                    "color": 3900150,
                    "name": "Kotikonttori .0/28",
                    "subnet": "192.168.5.0/28"
          },
          {
                    "x": 7,
                    "z": 12,
                    "w": 14,
                    "d": 12,
                    "color": 2278750,
                    "name": "Olohuone .0/28",
                    "subnet": "192.168.5.0/28"
          }
],
            requiredNodes: [
          {
                    "type": "switch",
                    "pos": {
                              "x": 0,
                              "z": 2
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 8,
                              "z": 2
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -9,
                              "z": 12
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -4,
                              "z": 12
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 7,
                              "z": 12
                    }
          }
]
        },
        {
            id: 6,
            name: "Kioskin valvontakamerat (/29)",
            difficulty: 2,
            phase: "🟢 Pienverkot (SOHO)",
            scenario: "Kioskin suljettu kameravalvonta ja hälytinjärjestelmä käyttää pientä /29-aliverkkoa (vain 6 isäntää: .1 – .6). Valvontatilassa on videotallennin (NVR) ja myymälässä valvontalaitteet.",
            hint: "/29-peite on 255.255.255.248. Vain 6 IP-osoitetta (.1 – .6) on käytettävissä. Laske osoitteet tarkasti ja kytke laitteet!",
            teachingTopic: "slash29",
            network: "192.168.6.0",
            cidr: 29,
            allowedTools: ["switch"],
            
            zones: [
          {
                    "x": -5,
                    "z": 2,
                    "w": 20,
                    "d": 8,
                    "color": 15680580,
                    "name": "Valvontatila .0/29",
                    "subnet": "192.168.6.0/29"
          },
          {
                    "x": 10,
                    "z": 2,
                    "w": 10,
                    "d": 8,
                    "color": 6583435,
                    "name": "Toimisto .0/29",
                    "subnet": "192.168.6.0/29"
          },
          {
                    "x": 0,
                    "z": 12,
                    "w": 30,
                    "d": 12,
                    "color": 16096779,
                    "name": "Myymälätila .0/29",
                    "subnet": "192.168.6.0/29"
          }
],
            requiredNodes: [
          {
                    "type": "switch",
                    "pos": {
                              "x": -10,
                              "z": 2
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -2,
                              "z": 2
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 10,
                              "z": 2
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": -8,
                              "z": 12
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 8,
                              "z": 12
                    }
          }
]
        },
        {
            id: 7,
            name: "Reitittimen hallintalinkki (/30)",
            difficulty: 2,
            phase: "🟢 Pienverkot (SOHO)",
            scenario: "/30-aliverkkoa käytetään kahden pisteen väliseen Point-to-Point -linkkiin pääkeskuksen (MDF) ja etäjakamon (IDF) välillä. Verkossa on vain 2 käyttökelpoista osoitetta: .1 ja .2.",
            hint: "/30-peite on 255.255.255.252. Käytettävissä ovat vain osoitteet .1 ja .2 (broadcast on .3). Aseta kummankin pään laitteelle oma osoite.",
            teachingTopic: "slash30",
            network: "10.0.0.0",
            cidr: 30,
            allowedTools: [],
            
            zones: [
          {
                    "x": -9,
                    "z": 8,
                    "w": 14,
                    "d": 16,
                    "color": 9133302,
                    "name": "Pääkeskus MDF .0/30",
                    "subnet": "10.0.0.0/30"
          },
          {
                    "x": 0,
                    "z": 8,
                    "w": 4,
                    "d": 16,
                    "color": 6583435,
                    "name": "Runkokaapelikouru",
                    "subnet": "10.0.0.0/30"
          },
          {
                    "x": 9,
                    "z": 8,
                    "w": 14,
                    "d": 16,
                    "color": 3900150,
                    "name": "Etäjakamo IDF .0/30",
                    "subnet": "10.0.0.0/30"
          }
],
            requiredNodes: [
          {
                    "type": "router",
                    "pos": {
                              "x": -9,
                              "z": 8
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 9,
                              "z": 8
                    }
          }
]
        },
        {
            id: 8,
            name: "Pienvaraston skannerit (/26)",
            difficulty: 2,
            phase: "🟢 Pienverkot (SOHO)",
            scenario: "Pienvaraston viivakoodiskannerit, trukkipäätteet ja lähetystoimisto käyttävät /26-aliverkkoa (62 isäntää). Varastohyllyille tarvitaan laaja langaton kuuluvuus.",
            hint: "/26-peite on 255.255.255.192. Kytke WiFi-tukiasema ja toimistotietokoneet kytkimeen ja anna kannettaville skannereille sallitut IP:t.",
            teachingTopic: "slash26",
            network: "10.1.1.0",
            cidr: 26,
            allowedTools: ["switch","wifi"],
            
            zones: [
          {
                    "x": -9,
                    "z": 2,
                    "w": 14,
                    "d": 8,
                    "color": 3900150,
                    "name": "Varastotoimisto .0/26",
                    "subnet": "10.1.1.0/26"
          },
          {
                    "x": 7,
                    "z": 2,
                    "w": 18,
                    "d": 8,
                    "color": 16096779,
                    "name": "Lastauslaituri .0/26",
                    "subnet": "10.1.1.0/26"
          },
          {
                    "x": 0,
                    "z": 12,
                    "w": 32,
                    "d": 12,
                    "color": 11032055,
                    "name": "Varastohyllyt .0/26",
                    "subnet": "10.1.1.0/26"
          }
],
            requiredNodes: [
          {
                    "type": "switch",
                    "pos": {
                              "x": -12,
                              "z": 2
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -6,
                              "z": 2
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": 3,
                              "z": 2
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 11,
                              "z": 2
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": 0,
                              "z": 9
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -9,
                              "z": 14
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 9,
                              "z": 14
                    }
          }
]
        },
        {
            id: 9,
            name: "Autokorjaamo (/27)",
            difficulty: 2,
            phase: "🟢 Pienverkot (SOHO)",
            scenario: "Pienen autokorjaamon verkko jaetaan /27-aliverkkoon (30 isäntää). Huoltohallin diagnostiikkalaitteet, vastaanoton asiakaspääte ja työkaluvaraston komponenttipalvelin tarvitsevat suojatut yhteydet.",
            hint: "/27-peite on 255.255.255.224. Yhdistä huoltohallin laitteet kytkimen ja WiFin kautta. Huolehdi että IP-osoitteet ovat alueella .1 – .30.",
            teachingTopic: "slash27",
            network: "172.16.5.0",
            cidr: 27,
            allowedTools: ["switch","wifi"],
            
            zones: [
          {
                    "x": -9,
                    "z": 2,
                    "w": 14,
                    "d": 8,
                    "color": 3900150,
                    "name": "Vastaanotto .0/27",
                    "subnet": "172.16.5.0/27"
          },
          {
                    "x": 7,
                    "z": 2,
                    "w": 18,
                    "d": 8,
                    "color": 6583435,
                    "name": "Työkaluvarasto .0/27",
                    "subnet": "172.16.5.0/27"
          },
          {
                    "x": 0,
                    "z": 12,
                    "w": 32,
                    "d": 12,
                    "color": 16096779,
                    "name": "Huoltohalli .0/27",
                    "subnet": "172.16.5.0/27"
          }
],
            requiredNodes: [
          {
                    "type": "pc",
                    "pos": {
                              "x": -12,
                              "z": 2
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": -6,
                              "z": 2
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 3,
                              "z": 2
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 11,
                              "z": 2
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": 0,
                              "z": 8.5
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -9,
                              "z": 13.5
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 9,
                              "z": 13.5
                    }
          }
]
        },
        {
            id: 10,
            name: "Maatilan IoT-laitteet (/25)",
            difficulty: 2,
            phase: "🟢 Pienverkot (SOHO)",
            scenario: "Moderni maatila käyttää laajaa /25-aliverkkoa (126 isäntää) IoT-antureille, viljankuivaamon ohjaukselle ja navetan automaattiselle robottilypsylle.",
            hint: "/25-peite on 255.255.255.128. Käytettävissä ovat osoitteet .1 – .126. Yhdistä robottilypsy ja viljankuivaamon valvontapalvelin keskitettyyn verkkoon.",
            teachingTopic: "slash25",
            network: "192.168.10.0",
            cidr: 25,
            allowedTools: ["switch","wifi"],
            
            zones: [
          {
                    "x": 0,
                    "z": 2,
                    "w": 32,
                    "d": 8,
                    "color": 3900150,
                    "name": "Päärakennus .0/25",
                    "subnet": "192.168.10.0/25"
          },
          {
                    "x": -8,
                    "z": 12,
                    "w": 16,
                    "d": 12,
                    "color": 2278750,
                    "name": "Navetta & Robotti .0/25",
                    "subnet": "192.168.10.0/25"
          },
          {
                    "x": 8,
                    "z": 12,
                    "w": 16,
                    "d": 12,
                    "color": 16096779,
                    "name": "Viljankuivaamo .0/25",
                    "subnet": "192.168.10.0/25"
          }
],
            requiredNodes: [
          {
                    "type": "switch",
                    "pos": {
                              "x": -10,
                              "z": 2
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -2,
                              "z": 2
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 8,
                              "z": 2
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": -8,
                              "z": 8.5
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -8,
                              "z": 14
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 8,
                              "z": 12
                    }
          }
]
        },
        {
            id: 11,
            name: "Mainostoimiston renderöintifarmi (/26)",
            difficulty: 3,
            phase: "🔵 Segmentointi ja Pk",
            scenario: "Mainostoimiston raskaat työasemat ja renderöintifarmi eristetään omaan /26-aliverkkoonsa suuren kaistanleveyden takaamiseksi.",
            hint: "Kytke laitteet kytkimeen ja WiFiin. Laske /26-peite (255.255.255.192, 62 isäntää) ja määritä osoitteet huoneiden laitteille.",
            teachingTopic: "slash26",
            network: "10.20.0.0",
            cidr: 26,
            allowedTools: [],
            
            zones: [
          {
                    "x": -11,
                    "z": 7,
                    "w": 14,
                    "d": 10,
                    "color": 9133302,
                    "name": "Renderöintifarmi .0/26",
                    "subnet": "10.20.0.0/26"
          },
          {
                    "x": 7,
                    "z": 7,
                    "w": 22,
                    "d": 10,
                    "color": 2278750,
                    "name": "Keittiö & Taukotila .0/26",
                    "subnet": "10.20.0.0/26"
          },
          {
                    "x": -6,
                    "z": 18,
                    "w": 24,
                    "d": 12,
                    "color": 3900150,
                    "name": "Avokonttori .0/26",
                    "subnet": "10.20.0.0/26"
          },
          {
                    "x": 12,
                    "z": 18,
                    "w": 12,
                    "d": 12,
                    "color": 11032055,
                    "name": "Neuvotteluhuone .0/26",
                    "subnet": "10.20.0.0/26"
          }
],
            requiredNodes: [
          {
                    "type": "switch",
                    "pos": {
                              "x": -11,
                              "z": 5
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -15,
                              "z": 9
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -7,
                              "z": 9
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": 4,
                              "z": 6
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 12,
                              "z": 6
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -13,
                              "z": 16
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -6,
                              "z": 16
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 1,
                              "z": 16
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": -6,
                              "z": 21
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 12,
                              "z": 16
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 12,
                              "z": 20
                    }
          }
]
        },
        {
            id: 12,
            name: "Koulun ATK-luokka (/25)",
            difficulty: 3,
            phase: "🔵 Segmentointi ja Pk",
            scenario: "Koulun ATK-luokka tarvitsee laajan /25-verkon opiskelijoiden työasemille, opettajalle ja jakamon palvelimille.",
            hint: "Laske /25-peite (255.255.255.128, 126 isäntää) ja määritä koneille omat uniikit IP-osoitteet verkkoalueelta .1–.126.",
            teachingTopic: "slash25",
            network: "172.17.10.0",
            cidr: 25,
            allowedTools: [],
            
            zones: [
          {
                    "x": -13,
                    "z": 7,
                    "w": 12,
                    "d": 8,
                    "color": 9133302,
                    "name": "Palvelinjakamo .0/25",
                    "subnet": "172.17.10.0/25"
          },
          {
                    "x": -13,
                    "z": 18,
                    "w": 12,
                    "d": 14,
                    "color": 11032055,
                    "name": "Opettajan tila .0/25",
                    "subnet": "172.17.10.0/25"
          },
          {
                    "x": 6,
                    "z": 14,
                    "w": 26,
                    "d": 22,
                    "color": 440020,
                    "name": "Tietokoneluokka .0/25",
                    "subnet": "172.17.10.0/25"
          }
],
            requiredNodes: [
          {
                    "type": "switch",
                    "pos": {
                              "x": -13,
                              "z": 6
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -16,
                              "z": 8
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -10,
                              "z": 8
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -13,
                              "z": 15
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": -13,
                              "z": 21
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -16,
                              "z": 18
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 6,
                              "z": 6
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -2,
                              "z": 10
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 5,
                              "z": 10
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 12,
                              "z": 10
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -2,
                              "z": 16
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 5,
                              "z": 16
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 12,
                              "z": 16
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": 14,
                              "z": 21
                    }
          }
]
        },
        {
            id: 13,
            name: "Terveyskeskuksen potilasverkko (/26)",
            difficulty: 3,
            phase: "🔵 Segmentointi ja Pk",
            scenario: "Terveyskeskuksen vastaanoton, lääkärin ja hoitohuoneen kriittiset laitteet sijoitetaan suljettuun /26-verkkoon potilasturvallisuuden vuoksi.",
            hint: "Laske /26-peite (255.255.255.192) ja sijoita IP:t huolellisesti kytkimen kautta yhdistetyille laitteille.",
            teachingTopic: "slash26",
            network: "10.100.1.0",
            cidr: 26,
            allowedTools: [],
            
            zones: [
          {
                    "x": 0,
                    "z": 8,
                    "w": 36,
                    "d": 8,
                    "color": 3900150,
                    "name": "Vastaanotto .0/26",
                    "subnet": "10.100.1.0/26"
          },
          {
                    "x": -9,
                    "z": 18,
                    "w": 18,
                    "d": 12,
                    "color": 15680580,
                    "name": "Lääkärin vastaanotto .0/26",
                    "subnet": "10.100.1.0/26"
          },
          {
                    "x": 9,
                    "z": 18,
                    "w": 18,
                    "d": 12,
                    "color": 2278750,
                    "name": "Hoitohuone .0/26",
                    "subnet": "10.100.1.0/26"
          }
],
            requiredNodes: [
          {
                    "type": "switch",
                    "pos": {
                              "x": 0,
                              "z": 7
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -8,
                              "z": 8
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 8,
                              "z": 8
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": -13,
                              "z": 8
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -12,
                              "z": 17
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -5,
                              "z": 17
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": -9,
                              "z": 21
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 6,
                              "z": 17
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 13,
                              "z": 17
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": 9,
                              "z": 21
                    }
          }
]
        },
        {
            id: 14,
            name: "Terveyskeskuksen vieras-WiFi (/25)",
            difficulty: 3,
            phase: "🔵 Segmentointi ja Pk",
            scenario: "Terveyskeskus tarjoaa laajan /25-vierasverkon odotusaulan potilaille, infopisteelle ja henkilökunnan taukotilaan.",
            hint: "Laske /25-peite (255.255.255.128) ja kytke laitteet kytkimeen sekä WiFi-tukiasemiin.",
            teachingTopic: "slash25",
            network: "192.168.200.0",
            cidr: 25,
            allowedTools: [],
            
            zones: [
          {
                    "x": -12,
                    "z": 8,
                    "w": 14,
                    "d": 10,
                    "color": 11032055,
                    "name": "Neuvonta .0/25",
                    "subnet": "192.168.200.0/25"
          },
          {
                    "x": -12,
                    "z": 19,
                    "w": 14,
                    "d": 12,
                    "color": 2278750,
                    "name": "Taukotila .0/25",
                    "subnet": "192.168.200.0/25"
          },
          {
                    "x": 7,
                    "z": 14,
                    "w": 24,
                    "d": 22,
                    "color": 1096065,
                    "name": "Odotusaula .0/25",
                    "subnet": "192.168.200.0/25"
          }
],
            requiredNodes: [
          {
                    "type": "switch",
                    "pos": {
                              "x": -12,
                              "z": 6
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -15,
                              "z": 9
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": -9,
                              "z": 9
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": -12,
                              "z": 17
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -15,
                              "z": 21
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -9,
                              "z": 21
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": 7,
                              "z": 7
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": 7,
                              "z": 18
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 1,
                              "z": 11
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 13,
                              "z": 11
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 1,
                              "z": 21
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 13,
                              "z": 21
                    }
          }
]
        },
        {
            id: 15,
            name: "Pienpanimon automaatioverkko (/27)",
            difficulty: 3,
            phase: "🔵 Segmentointi ja Pk",
            scenario: "Pienpanimon tuotantohallin PLC-ohjaimet, päävalvomo ja toimisto yhdistetään suojattuun /27-aliverkkoon.",
            hint: "Määritä automaatio- ja toimistolaitteille IP:t laskemalla /27-verkon vapaat osoitteet (.1–.30, peite 255.255.255.224).",
            teachingTopic: "slash27",
            network: "10.50.50.0",
            cidr: 27,
            allowedTools: [],
            
            zones: [
          {
                    "x": -7,
                    "z": 14,
                    "w": 24,
                    "d": 22,
                    "color": 16096779,
                    "name": "Panimohalli .0/27",
                    "subnet": "10.50.50.0/27"
          },
          {
                    "x": 12,
                    "z": 8,
                    "w": 14,
                    "d": 10,
                    "color": 9133302,
                    "name": "Valvomo .0/27",
                    "subnet": "10.50.50.0/27"
          },
          {
                    "x": 12,
                    "z": 19,
                    "w": 14,
                    "d": 12,
                    "color": 3900150,
                    "name": "Toimisto .0/27",
                    "subnet": "10.50.50.0/27"
          }
],
            requiredNodes: [
          {
                    "type": "switch",
                    "pos": {
                              "x": -7,
                              "z": 6
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -14,
                              "z": 12
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -14,
                              "z": 19
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 0,
                              "z": 16
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 12,
                              "z": 6
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 9,
                              "z": 10
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 15,
                              "z": 10
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 9,
                              "z": 17
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": 15,
                              "z": 17
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 12,
                              "z": 21
                    }
          }
]
        },
        {
            id: 16,
            name: "Ravintolan kassapäätteet (/28)",
            difficulty: 3,
            phase: "🔵 Segmentointi ja Pk",
            scenario: "Maksuliikenteen ja PCI-DSS-vaatimusten vuoksi ravintolasalin tilauspäätteet, baaritiskin kassa ja keittiön tulostin eristetään tiukkaan /28-verkkoon.",
            hint: "Laske /28-peite (255.255.255.240, 14 isäntää) laskimella ja ohjaa IP:t huoneiden kassalaitteille.",
            teachingTopic: "slash28",
            network: "192.168.10.0",
            cidr: 28,
            allowedTools: [],
            
            zones: [
          {
                    "x": -8,
                    "z": 14,
                    "w": 20,
                    "d": 22,
                    "color": 15680580,
                    "name": "Ravintolasali .0/28",
                    "subnet": "192.168.10.0/28"
          },
          {
                    "x": 10,
                    "z": 8,
                    "w": 16,
                    "d": 10,
                    "color": 3900150,
                    "name": "Baaritiski & Kassa .0/28",
                    "subnet": "192.168.10.0/28"
          },
          {
                    "x": 10,
                    "z": 19,
                    "w": 16,
                    "d": 12,
                    "color": 16728140,
                    "name": "Keittiö .0/28",
                    "subnet": "192.168.10.0/28"
          }
],
            requiredNodes: [
          {
                    "type": "switch",
                    "pos": {
                              "x": 10,
                              "z": 6
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 6,
                              "z": 10
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 14,
                              "z": 10
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": 7,
                              "z": 18
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 13,
                              "z": 18
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": -8,
                              "z": 8
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -13,
                              "z": 15
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -3,
                              "z": 15
                    }
          }
]
        },
        {
            id: 17,
            name: "Hotellin kerrosverkko (/24)",
            difficulty: 3,
            phase: "🔵 Segmentointi ja Pk",
            scenario: "Hotellikerroksen kerrosaula, hotellihuoneiden älylaitteet ja kerroksen huoltotila jakavat selkeän /24-aliverkon.",
            hint: "Kytke huoltotilan kytkin, aulan ja huonesiiven WiFi-tukiasemat sekä päätelaitteet. Laske /24-peite (255.255.255.0).",
            teachingTopic: "slash24",
            network: "172.16.1.0",
            cidr: 24,
            allowedTools: [],
            
            zones: [
          {
                    "x": -12,
                    "z": 7,
                    "w": 14,
                    "d": 8,
                    "color": 6583435,
                    "name": "Huoltotila .0/24",
                    "subnet": "172.16.1.0/24"
          },
          {
                    "x": -12,
                    "z": 18,
                    "w": 14,
                    "d": 14,
                    "color": 11032055,
                    "name": "Kerrosaula .0/24",
                    "subnet": "172.16.1.0/24"
          },
          {
                    "x": 7,
                    "z": 14,
                    "w": 24,
                    "d": 22,
                    "color": 3900150,
                    "name": "Huoneet 101-104 .0/24",
                    "subnet": "172.16.1.0/24"
          }
],
            requiredNodes: [
          {
                    "type": "switch",
                    "pos": {
                              "x": -12,
                              "z": 6
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -16,
                              "z": 8
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -8,
                              "z": 8
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": -12,
                              "z": 16
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": -15,
                              "z": 21
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -9,
                              "z": 21
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": 7,
                              "z": 7
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 0,
                              "z": 12
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 14,
                              "z": 12
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 0,
                              "z": 19
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 14,
                              "z": 19
                    }
          }
]
        },
        {
            id: 18,
            name: "Lakitoimiston hallintoverkko (/27)",
            difficulty: 3,
            phase: "🔵 Segmentointi ja Pk",
            scenario: "Lakitoimiston arkistopalvelimet, asianajajan työhuone ja neuvotteluhuone suojataan omaan /27-aliverkkoonsa.",
            hint: "Tarkista verkkoalue 10.0.10.0/27 ja laske /27-peite (255.255.255.224, 30 isäntää) laskimella.",
            teachingTopic: "slash27",
            network: "10.0.10.0",
            cidr: 27,
            allowedTools: [],
            
            zones: [
          {
                    "x": -9,
                    "z": 9,
                    "w": 18,
                    "d": 12,
                    "color": 1976635,
                    "name": "Asianajajan työhuone .0/27",
                    "subnet": "10.0.10.0/27"
          },
          {
                    "x": -9,
                    "z": 20,
                    "w": 18,
                    "d": 10,
                    "color": 9133302,
                    "name": "Arkisto & Tulostin .0/27",
                    "subnet": "10.0.10.0/27"
          },
          {
                    "x": 9,
                    "z": 14,
                    "w": 18,
                    "d": 22,
                    "color": 11032055,
                    "name": "Neuvotteluhuone .0/27",
                    "subnet": "10.0.10.0/27"
          }
],
            requiredNodes: [
          {
                    "type": "switch",
                    "pos": {
                              "x": -9,
                              "z": 18
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -14,
                              "z": 22
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": -4,
                              "z": 22
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -13,
                              "z": 8
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -5,
                              "z": 8
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": -9,
                              "z": 12
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 9,
                              "z": 8
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": 9,
                              "z": 15
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 4,
                              "z": 21
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 14,
                              "z": 21
                    }
          }
]
        },
        {
            id: 19,
            name: "Kirjaston yleisökoneet (/25)",
            difficulty: 3,
            phase: "🔵 Segmentointi ja Pk",
            scenario: "Julkisten yleisökoneiden ja lainauspisteen laitteiden suuren määrän takia kirjasto varaa /25-aliverkon vieraiden ja asiakkaiden käyttöön.",
            hint: "Määritä kytkimet, tulostimet ja PC:t /25-verkon asetuksilla (peite 255.255.255.128, osoitteet .1–.126).",
            teachingTopic: "slash25",
            network: "192.168.100.0",
            cidr: 25,
            allowedTools: [],
            
            zones: [
          {
                    "x": -12,
                    "z": 7.5,
                    "w": 14,
                    "d": 9,
                    "color": 6583435,
                    "name": "Kirjavarasto .0/25",
                    "subnet": "192.168.100.0/25"
          },
          {
                    "x": -12,
                    "z": 18.5,
                    "w": 14,
                    "d": 13,
                    "color": 15680580,
                    "name": "Lainauspiste .0/25",
                    "subnet": "192.168.100.0/25"
          },
          {
                    "x": 7,
                    "z": 14,
                    "w": 24,
                    "d": 22,
                    "color": 1357990,
                    "name": "Lukusali .0/25",
                    "subnet": "192.168.100.0/25"
          }
],
            requiredNodes: [
          {
                    "type": "switch",
                    "pos": {
                              "x": -12,
                              "z": 6
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -15,
                              "z": 9
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -9,
                              "z": 9
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -14,
                              "z": 17
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -8,
                              "z": 17
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": -11,
                              "z": 22
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 7,
                              "z": 6
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 0,
                              "z": 11
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 7,
                              "z": 11
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 14,
                              "z": 11
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 0,
                              "z": 17
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 7,
                              "z": 17
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 14,
                              "z": 17
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": 7,
                              "z": 22
                    }
          }
]
        },
        {
            id: 20,
            name: "Kuntosalin infonäytöt (/26)",
            difficulty: 3,
            phase: "🔵 Segmentointi ja Pk",
            scenario: "Kuntosalin kuntosalitilan infonäytöt, vastaanottotiski ja valmentajien laitteet kytketään yhtenäiseen /26-aliverkkoon.",
            hint: "Kytke laitteet kytkimeen ja WiFiin ja aseta IP:t. Laske /26-peite (255.255.255.192, 62 isäntää) huolellisesti.",
            teachingTopic: "slash26",
            network: "172.20.10.0",
            cidr: 26,
            allowedTools: [],
            
            zones: [
          {
                    "x": -12,
                    "z": 8,
                    "w": 14,
                    "d": 10,
                    "color": 3900150,
                    "name": "Vastaanottotiski .0/26",
                    "subnet": "172.20.10.0/26"
          },
          {
                    "x": -12,
                    "z": 19,
                    "w": 14,
                    "d": 12,
                    "color": 2278750,
                    "name": "Valmentajien tila .0/26",
                    "subnet": "172.20.10.0/26"
          },
          {
                    "x": 7,
                    "z": 14,
                    "w": 24,
                    "d": 22,
                    "color": 15485081,
                    "name": "Kuntosali .0/26",
                    "subnet": "172.20.10.0/26"
          }
],
            requiredNodes: [
          {
                    "type": "switch",
                    "pos": {
                              "x": -12,
                              "z": 6
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -15,
                              "z": 10
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": -9,
                              "z": 10
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -14,
                              "z": 17
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -8,
                              "z": 17
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": -12,
                              "z": 22
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": 7,
                              "z": 6
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 0,
                              "z": 11
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 14,
                              "z": 11
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 0,
                              "z": 18
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 14,
                              "z": 18
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 7,
                              "z": 22
                    }
          }
]
        },
        {
            id: 21,
            name: "Supermarketin myymäläverkko (/23)",
            difficulty: 4,
            phase: "🟡 Keskisuuret (VLSM)",
            scenario: "Nykyaikaisen supermarketin myymäläverkko yhdistää kassa-alueen POS-terminaalit, myymälähyllyjen langattomat viivakoodinlukijat, kylmävaraston sensorit sekä myymäläpäällikön toimiston. Koko kiinteistö toimii yhtenäisellä /23-aliverkolla (510 isäntää).",
            hint: "TOPOLOGIA: Reititin yhdistää myymäläpäällikön toimistoon. Kassa-alueella on oma kytkin kassapäätteille (.20+). Hyllystössä WiFi-tukiasemat palvelevat kannettavia käsipäätteitä. Kylmätiloissa palvelin valvoo lämpötiloja. Laske /23-aliverkon peite (255.255.254.0) ja määritä osoitteet sallitulta väliltä 172.16.0.1 – 172.16.1.254.",
            teachingTopic: "slash23",
            network: "172.16.0.0",
            cidr: 23,
            
            
            zones: [
          {
                    "x": 4,
                    "z": -4,
                    "w": 24,
                    "d": 10,
                    "color": 16096779,
                    "name": "Kassa-alue",
                    "subnet": "172.16.0.0/23"
          },
          {
                    "x": 4,
                    "z": 12,
                    "w": 24,
                    "d": 20,
                    "color": 11032055,
                    "name": "Myymälähyllyt (WiFi)",
                    "subnet": "172.16.0.0/23"
          },
          {
                    "x": -16,
                    "z": -4,
                    "w": 14,
                    "d": 10,
                    "color": 3900150,
                    "name": "Myymäläpäällikön toimisto",
                    "subnet": "172.16.0.0/23"
          },
          {
                    "x": -16,
                    "z": 12,
                    "w": 14,
                    "d": 20,
                    "color": 6583435,
                    "name": "Kylmätilat & Varasto",
                    "subnet": "172.16.0.0/23"
          }
],
            requiredNodes: [
          {
                    "type": "router",
                    "pos": {
                              "x": -16,
                              "z": -7
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -16,
                              "z": -4
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -19,
                              "z": -2
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": -13,
                              "z": -2
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 4,
                              "z": -6
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -4,
                              "z": -3
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 2,
                              "z": -3
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 8,
                              "z": -3
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 13,
                              "z": -3
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": -1,
                              "z": 8
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": 9,
                              "z": 15
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -3,
                              "z": 14
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 5,
                              "z": 9
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 7,
                              "z": 19
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -16,
                              "z": 5
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -16,
                              "z": 10
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -19,
                              "z": 16
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -13,
                              "z": 16
                    }
          }
]
        },
        {
            id: 22,
            name: "Logistiikkakeskuksen trukkipäätteet (/23)",
            difficulty: 4,
            phase: "🟡 Keskisuuret (VLSM)",
            scenario: "Valtavan logistiikkakeskuksen trukkipäätteet liikkuvat saapuvan tavaran laiturilta trukkialueen hyllyköiden kautta lähtevän tavaran laiturille. Katkeamaton roaming vaatii yhden laajan /23-verkon (10.10.0.0/23, 510 osoitetta).",
            hint: "TOPOLOGIA: Reititin ja toimiston kytkin jakavat yhteyden laituriswitchien ja WiFi-tukiasemien kautta. Trukkien langattomat päätteet saavat IP:t dynaamisesti samasta /23-osoiteavaruudesta. Rahtikirjatulostin ja WMS-palvelin toimivat staattisilla osoitteilla.",
            teachingTopic: "slash23",
            network: "10.10.0.0",
            cidr: 23,
            
            
            zones: [
          {
                    "x": 0,
                    "z": -8,
                    "w": 32,
                    "d": 14,
                    "color": 3900150,
                    "name": "Logistiikkatoimisto",
                    "subnet": "10.10.0.0/23"
          },
          {
                    "x": -21,
                    "z": 12,
                    "w": 14,
                    "d": 24,
                    "color": 2278750,
                    "name": "Saapuvan tavaran laituri",
                    "subnet": "10.10.0.0/23"
          },
          {
                    "x": 0,
                    "z": 12,
                    "w": 26,
                    "d": 24,
                    "color": 16096779,
                    "name": "Trukkialue & Hyllystöt",
                    "subnet": "10.10.0.0/23"
          },
          {
                    "x": 21,
                    "z": 12,
                    "w": 14,
                    "d": 24,
                    "color": 15680580,
                    "name": "Lähtevän tavaran laituri",
                    "subnet": "10.10.0.0/23"
          }
],
            requiredNodes: [
          {
                    "type": "router",
                    "pos": {
                              "x": 0,
                              "z": -12
                    }
          },
          {
                    "type": "core_switch",
                    "pos": {
                              "x": 0,
                              "z": -6
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 10,
                              "z": -10
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -8,
                              "z": -6
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -12,
                              "z": -10
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": 8,
                              "z": -6
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -21,
                              "z": 4
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": -21,
                              "z": 10
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -21,
                              "z": 16
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -21,
                              "z": 21
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": -6,
                              "z": 6
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": 6,
                              "z": 16
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -6,
                              "z": 12
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 0,
                              "z": 18
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 6,
                              "z": 8
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 21,
                              "z": 4
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": 21,
                              "z": 10
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 21,
                              "z": 16
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": 21,
                              "z": 21
                    }
          }
]
        },
        {
            id: 23,
            name: "Tehdasalueen tuotantolinjat (VLSM)",
            difficulty: 4,
            phase: "🟡 Keskisuuret (VLSM)",
            scenario: "Tehdasalue koostuu kahdesta itsenäisestä tuotantolinjasta, keskitetystä valvomosta sekä IT/OT-palvelintilasta. Verkko jaetaan VLSM-periaatteella: Linjat tarvitsevat 30 osoitetta (/27) ja valvomo sekä palvelintila 14 osoitetta (/28).",
            hint: "VLSM-JAKO: Linja 1 (.0/27, peite .224), Linja 2 (.32/27, peite .224), Valvomo (.64/28, peite .240), Palvelintila (.80/28, peite .240). Yhdistä kukin alue omaan kytkimeensä ja kytkimet palvelintilan jakamoon.",
            teachingTopic: "vlsm",
            network: "192.168.50.0",
            cidr: 24,
            
            
            zones: [
          {
                    "x": -12,
                    "z": 12,
                    "w": 20,
                    "d": 24,
                    "color": 3900150,
                    "name": "Linja 1 .0/27",
                    "subnet": "192.168.50.0/27"
          },
          {
                    "x": 12,
                    "z": 12,
                    "w": 20,
                    "d": 24,
                    "color": 2278750,
                    "name": "Linja 2 .32/27",
                    "subnet": "192.168.50.32/27"
          },
          {
                    "x": 12,
                    "z": -7,
                    "w": 20,
                    "d": 12,
                    "color": 16096779,
                    "name": "Valvomo .64/28",
                    "subnet": "192.168.50.64/28"
          },
          {
                    "x": -12,
                    "z": -7,
                    "w": 20,
                    "d": 12,
                    "color": 9133302,
                    "name": "Palvelintila .80/28",
                    "subnet": "192.168.50.80/28"
          }
],
            requiredNodes: [
          {
                    "type": "router",
                    "pos": {
                              "x": -12,
                              "z": -10
                    }
          },
          {
                    "type": "core_switch",
                    "pos": {
                              "x": -12,
                              "z": -5
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -17,
                              "z": -5
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -7,
                              "z": -5
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 12,
                              "z": -10
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 7,
                              "z": -5
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 17,
                              "z": -5
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": 12,
                              "z": -4
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -12,
                              "z": 4
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -17,
                              "z": 9
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -7,
                              "z": 9
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -17,
                              "z": 18
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": -7,
                              "z": 18
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 12,
                              "z": 4
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 7,
                              "z": 9
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 17,
                              "z": 9
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 7,
                              "z": 18
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 17,
                              "z": 18
                    }
          }
]
        },
        {
            id: 24,
            name: "VoIP-puhelinverkko puhelinvaihteella (/25)",
            difficulty: 4,
            phase: "🟡 Keskisuuret (VLSM)",
            scenario: "Yrityksen reaaliaikainen puheliikenne eristetään QoS-laadun takaamiseksi omaan /25-aliverkkoonsa (10.20.30.0/25, 126 isäntää). Kokonaisuuteen kuuluvat keskitetty IP-puhelinvaihde, asiakaspalvelukeskus sekä johdon neuvotteluhuone.",
            hint: "TOPOLOGIA: Reititin ja Core-kytkin sijaitsevat puhelinvaihdetilassa PBX-palvelinten rinnalla. Asiakaspalvelukeskus ja johtoryhmän huone liittyvät kytkimillä runkoon. Syötä laitteille /25-peite (255.255.255.128) ja VoIP-puhelimille varatut IP-osoitteet.",
            teachingTopic: "slash25",
            network: "10.20.30.0",
            cidr: 25,
            
            
            zones: [
          {
                    "x": -16,
                    "z": 0,
                    "w": 14,
                    "d": 24,
                    "color": 9133302,
                    "name": "Puhelinvaihdetila",
                    "subnet": "10.20.30.0/25"
          },
          {
                    "x": 6,
                    "z": -5,
                    "w": 28,
                    "d": 14,
                    "color": 3900150,
                    "name": "Asiakaspalvelukeskus",
                    "subnet": "10.20.30.0/25"
          },
          {
                    "x": 6,
                    "z": 9,
                    "w": 28,
                    "d": 12,
                    "color": 15680580,
                    "name": "Johtoryhmän huone",
                    "subnet": "10.20.30.0/25"
          }
],
            requiredNodes: [
          {
                    "type": "router",
                    "pos": {
                              "x": -16,
                              "z": -8
                    }
          },
          {
                    "type": "core_switch",
                    "pos": {
                              "x": -16,
                              "z": -3
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -16,
                              "z": 3
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -16,
                              "z": 8
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 6,
                              "z": -9
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": -3,
                              "z": -7
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 3,
                              "z": -7
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 9,
                              "z": -7
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 15,
                              "z": -7
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -3,
                              "z": -3
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 3,
                              "z": -3
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 9,
                              "z": -3
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 15,
                              "z": -3
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 6,
                              "z": 6
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 6,
                              "z": 11
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 0,
                              "z": 11
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 12,
                              "z": 11
                    }
          }
]
        },
        {
            id: 25,
            name: "IT-tuen DMZ-alue palomuurilla (/28)",
            difficulty: 4,
            phase: "🟡 Keskisuuret (VLSM)",
            scenario: "IT-tuen ylläpitämä DMZ (Demilitarized Zone) mahdollistaa organisaation julkisten palvelimien tarjoamisen ulkoverkkoon vaarantamatta sisäverkon työasemia. Suodatuksen hoitaa keskitetty palomuuri tiukalla /28-aliverkolla (14 käyttökelpoista osoitetta).",
            hint: "TIETOTURVATOPOLOGIA: Ulkoyhteys kulkee Reitittimen ja Palomuurin kautta. DMZ-vyöhykkeellä sijaitsevat Web- ja Mail-palvelimet. Sisäverkossa toimivat IT-tuen hallintakoneet. Laske /28-aliverkon peite (255.255.255.240) ja konfiguroi laitteet.",
            teachingTopic: "dmz",
            network: "172.16.99.0",
            cidr: 28,
            
            
            zones: [
          {
                    "x": -16,
                    "z": 8,
                    "w": 16,
                    "d": 20,
                    "color": 16728140,
                    "name": "Julkinen DMZ .0/28",
                    "subnet": "172.16.99.0/28"
          },
          {
                    "x": 0,
                    "z": 8,
                    "w": 14,
                    "d": 20,
                    "color": 15680580,
                    "name": "Palomuurivyöhyke",
                    "subnet": "172.16.99.0/28"
          },
          {
                    "x": 16,
                    "z": 8,
                    "w": 16,
                    "d": 20,
                    "color": 3900150,
                    "name": "Sisäverkko (Työasemat)",
                    "subnet": "172.16.99.0/28"
          }
],
            requiredNodes: [
          {
                    "type": "router",
                    "pos": {
                              "x": 0,
                              "z": 2
                    }
          },
          {
                    "type": "firewall",
                    "pos": {
                              "x": 0,
                              "z": 7
                    }
          },
          {
                    "type": "core_switch",
                    "pos": {
                              "x": 0,
                              "z": 13
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -16,
                              "z": 2
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -19,
                              "z": 8
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -13,
                              "z": 8
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -16,
                              "z": 14
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 16,
                              "z": 2
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 12,
                              "z": 8
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 20,
                              "z": 8
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": 12,
                              "z": 14
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 20,
                              "z": 14
                    }
          }
]
        },
        {
            id: 26,
            name: "Kunnanviraston kampusverkko (/22)",
            difficulty: 4,
            phase: "🟡 Keskisuuret (VLSM)",
            scenario: "Kunnanviraston kampus kokoaa yhteen virastotalon toimistot, julkisen asiakaspalveluaulan, kriittisen IT-keskuksen sekä virallisen arkiston. Suuri /22-verkko (10.10.0.0/22) tarjoaa jopa 1022 osoitetta yhtenäiseen hallintaan.",
            hint: "KAMPUSRUNKO: IT-keskuksen Core-kytkin ja reititin jakavat yhteyden virastotalolle, arkistolle ja palveluaulan kytkimille. Laske /22-aliverkon peite (255.255.252.0) ja osoitealue 10.10.0.1 – 10.10.3.254.",
            teachingTopic: "slash22",
            network: "10.10.0.0",
            cidr: 22,
            
            
            zones: [
          {
                    "x": -14,
                    "z": -6,
                    "w": 18,
                    "d": 14,
                    "color": 9133302,
                    "name": "IT-keskus (MDF)",
                    "subnet": "10.10.0.0/22"
          },
          {
                    "x": 14,
                    "z": -6,
                    "w": 22,
                    "d": 14,
                    "color": 3900150,
                    "name": "Virastotalo",
                    "subnet": "10.10.0.0/22"
          },
          {
                    "x": -14,
                    "z": 12,
                    "w": 18,
                    "d": 18,
                    "color": 6583435,
                    "name": "Arkisto",
                    "subnet": "10.10.0.0/22"
          },
          {
                    "x": 14,
                    "z": 12,
                    "w": 22,
                    "d": 18,
                    "color": 2278750,
                    "name": "Asiakaspalveluaula",
                    "subnet": "10.10.0.0/22"
          }
],
            requiredNodes: [
          {
                    "type": "router",
                    "pos": {
                              "x": -14,
                              "z": -10
                    }
          },
          {
                    "type": "core_switch",
                    "pos": {
                              "x": -14,
                              "z": -5
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -19,
                              "z": -5
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -9,
                              "z": -5
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 14,
                              "z": -10
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 8,
                              "z": -6
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 14,
                              "z": -6
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 20,
                              "z": -6
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": 14,
                              "z": -2
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -14,
                              "z": 6
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -19,
                              "z": 11
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -9,
                              "z": 11
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": -14,
                              "z": 17
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 14,
                              "z": 6
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": 14,
                              "z": 12
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 8,
                              "z": 12
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 20,
                              "z": 12
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 8,
                              "z": 17
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 20,
                              "z": 17
                    }
          }
]
        },
        {
            id: 27,
            name: "Ohjelmistotalon Dev ja Prod (VLSM)",
            difficulty: 4,
            phase: "🟡 Keskisuuret (VLSM)",
            scenario: "Kasvava ohjelmistoyritys eristää kriittisen tuotantoympäristön kehittäjien ja testaajien tiloista. Aliverkot mitoitetaan tarpeen mukaan: Kehitystiimi (.0/27), Tuotanto (.32/27), QA/Testaus (.64/28) ja Palvelinsali (.80/28).",
            hint: "VLSM-ERISTYS: Kehitys .0/27 ja Tuotanto .32/27 vaativat 30 osoitetta (peite .224). QA .64/28 ja Palvelinsali .80/28 vaativat 14 osoitetta (peite .240). Palomuuri ja Core-kytkin suojaavat palvelinsalin ja ohjaavat liikennettä.",
            teachingTopic: "vlsm",
            network: "192.168.100.0",
            cidr: 24,
            
            
            zones: [
          {
                    "x": -14,
                    "z": -5,
                    "w": 22,
                    "d": 16,
                    "color": 3900150,
                    "name": "Kehitystiimi .0/27",
                    "subnet": "192.168.100.0/27"
          },
          {
                    "x": -14,
                    "z": 12,
                    "w": 22,
                    "d": 14,
                    "color": 11032055,
                    "name": "QA/Testaus .64/28",
                    "subnet": "192.168.100.64/28"
          },
          {
                    "x": 14,
                    "z": -5,
                    "w": 20,
                    "d": 16,
                    "color": 15680580,
                    "name": "Palvelinsali .80/28",
                    "subnet": "192.168.100.80/28"
          },
          {
                    "x": 14,
                    "z": 12,
                    "w": 20,
                    "d": 14,
                    "color": 16096779,
                    "name": "Tuotanto/Prod .32/27",
                    "subnet": "192.168.100.32/27"
          }
],
            requiredNodes: [
          {
                    "type": "firewall",
                    "pos": {
                              "x": 14,
                              "z": -10
                    }
          },
          {
                    "type": "core_switch",
                    "pos": {
                              "x": 14,
                              "z": -5
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 9,
                              "z": -5
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 19,
                              "z": -5
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 14,
                              "z": 0
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 14,
                              "z": 8
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 9,
                              "z": 12
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 19,
                              "z": 12
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 14,
                              "z": 16
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -14,
                              "z": -10
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -20,
                              "z": -5
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -14,
                              "z": -5
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -8,
                              "z": -5
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -20,
                              "z": 0
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -8,
                              "z": 0
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -14,
                              "z": 8
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -20,
                              "z": 12
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -8,
                              "z": 12
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -14,
                              "z": 16
                    }
          }
]
        },
        {
            id: 28,
            name: "Elokuvateatterin digiprojektorit (/26)",
            difficulty: 4,
            phase: "🟡 Keskisuuret (VLSM)",
            scenario: "Monisaliteatterin digitaaliset DCI-projektoripalvelimet vaativat korkean kaistanleveyden ja häiriöttömän verkon. Projektiohuone, asiakasaulan lippukassat sekä hallintotoimisto yhdistetään optimoituun /26-verkkoon (62 isäntää).",
            hint: "TOPOLOGIA: Projektiohuoneen mediasiirtopalvelimet yhdistyvät Core-kytkimen ja Reitittimen kautta. Lippukassat ja toimisto saavat omat kytkimensä. Laske /26-peite (255.255.255.192) ja aseta IP-osoitteet.",
            teachingTopic: "slash26",
            network: "10.0.40.0",
            cidr: 26,
            
            
            zones: [
          {
                    "x": 0,
                    "z": -7,
                    "w": 36,
                    "d": 12,
                    "color": 6583435,
                    "name": "Projektiohuone (Projektoripalvelimet)",
                    "subnet": "10.0.40.0/26"
          },
          {
                    "x": -10,
                    "z": 9,
                    "w": 20,
                    "d": 16,
                    "color": 16096779,
                    "name": "Lippukassa & Aula",
                    "subnet": "10.0.40.0/26"
          },
          {
                    "x": 10,
                    "z": 9,
                    "w": 16,
                    "d": 16,
                    "color": 3900150,
                    "name": "Hallinto",
                    "subnet": "10.0.40.0/26"
          }
],
            requiredNodes: [
          {
                    "type": "router",
                    "pos": {
                              "x": 0,
                              "z": -10
                    }
          },
          {
                    "type": "core_switch",
                    "pos": {
                              "x": 0,
                              "z": -5
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -12,
                              "z": -6
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -6,
                              "z": -6
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 6,
                              "z": -6
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 12,
                              "z": -6
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -10,
                              "z": 4
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -16,
                              "z": 9
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -10,
                              "z": 9
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -4,
                              "z": 9
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": -10,
                              "z": 14
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 10,
                              "z": 4
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 6,
                              "z": 9
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 14,
                              "z": 9
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": 10,
                              "z": 14
                    }
          }
]
        },
        {
            id: 29,
            name: "Älyrakennuksen automaatio (/24)",
            difficulty: 4,
            phase: "🟡 Keskisuuret (VLSM)",
            scenario: "Modernin toimitilakiinteistön taloautomaatio ohjaa ilmanvaihtoa, lämmitystä ja valaistusta satojen antureiden avulla. LVI-valvomo, IoT-anturiverkosto sekä kiinteistöhallinto toimivat keskitetyssä /24-verkossa (254 isäntää).",
            hint: "AUTOMAATIOTOPOLOGIA: Kiinteistöhallinto yhdistää reitittimeen. LVI-valvomon BMS-palvelin kerää automaatiotiedot anturiverkoston IoT-tukiasemilta ja kenttälaitteilta. Laske /24-peite (255.255.255.0) ja konfiguroi verkon laitteet.",
            teachingTopic: "slash24",
            network: "172.30.0.0",
            cidr: 24,
            
            
            zones: [
          {
                    "x": 0,
                    "z": -7,
                    "w": 34,
                    "d": 12,
                    "color": 3900150,
                    "name": "Kiinteistöhallinto",
                    "subnet": "172.30.0.0/24"
          },
          {
                    "x": -10,
                    "z": 8,
                    "w": 18,
                    "d": 16,
                    "color": 2278750,
                    "name": "LVI-valvomo",
                    "subnet": "172.30.0.0/24"
          },
          {
                    "x": 10,
                    "z": 8,
                    "w": 18,
                    "d": 16,
                    "color": 1096065,
                    "name": "Anturiverkosto (IoT)",
                    "subnet": "172.30.0.0/24"
          }
],
            requiredNodes: [
          {
                    "type": "router",
                    "pos": {
                              "x": 0,
                              "z": -10
                    }
          },
          {
                    "type": "core_switch",
                    "pos": {
                              "x": 0,
                              "z": -5
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -8,
                              "z": -6
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 8,
                              "z": -6
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": 0,
                              "z": -3
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -10,
                              "z": 3
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -15,
                              "z": 8
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -10,
                              "z": 8
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -5,
                              "z": 8
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": -10,
                              "z": 13
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 10,
                              "z": 3
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": 5,
                              "z": 8
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": 15,
                              "z": 8
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 10,
                              "z": 10
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 10,
                              "z": 13
                    }
          }
]
        },
        {
            id: 30,
            name: "Sataman konttiterminaali (/23)",
            difficulty: 4,
            phase: "🟡 Keskisuuret (VLSM)",
            scenario: "Kansainvälisen sataman konttiterminaali kattaa laiturialueen jättinosturit, laajan konttikentän lukkikuljettajat, terminaalitoimiston toiminnanohjauksen (TOS) sekä porttirakennuksen rekkaliikenteen tunnistuksen. Verkko kattaa 510 laitetta /23-osoiteavaruudella.",
            hint: "LAAJA ULKOALUETOPOLOGIA: Terminaalitoimiston Reititin ja TOS-palvelin ohjaavat liikennettä. Konttikentän Core-kytkin yhdistää laiturialueen ja kentän ulko-WiFi-tukiasemat lukkipäätteille sekä porttirakennuksen tarkastuspisteelle. Laske /23-peite (255.255.254.0).",
            teachingTopic: "slash23",
            network: "172.16.8.0",
            cidr: 23,
            
            
            zones: [
          {
                    "x": 0,
                    "z": -10,
                    "w": 44,
                    "d": 14,
                    "color": 3900150,
                    "name": "Laiturialue (Nosturit & WiFi)",
                    "subnet": "172.16.8.0/23"
          },
          {
                    "x": 0,
                    "z": 5,
                    "w": 44,
                    "d": 14,
                    "color": 6583435,
                    "name": "Konttikenttä",
                    "subnet": "172.16.8.0/23"
          },
          {
                    "x": -12,
                    "z": 19,
                    "w": 20,
                    "d": 12,
                    "color": 11032055,
                    "name": "Terminaalitoimisto",
                    "subnet": "172.16.8.0/23"
          },
          {
                    "x": 12,
                    "z": 19,
                    "w": 20,
                    "d": 12,
                    "color": 16096779,
                    "name": "Porttirakennus",
                    "subnet": "172.16.8.0/23"
          }
],
            requiredNodes: [
          {
                    "type": "switch",
                    "pos": {
                              "x": 0,
                              "z": -14
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": -14,
                              "z": -10
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": 14,
                              "z": -10
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -14,
                              "z": -6
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 14,
                              "z": -6
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 0,
                              "z": -7
                    }
          },
          {
                    "type": "core_switch",
                    "pos": {
                              "x": 0,
                              "z": 0
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": -14,
                              "z": 5
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": 14,
                              "z": 5
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -10,
                              "z": 8
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 10,
                              "z": 8
                    }
          },
          {
                    "type": "router",
                    "pos": {
                              "x": -12,
                              "z": 16
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -17,
                              "z": 18
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -7,
                              "z": 18
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -17,
                              "z": 22
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": -7,
                              "z": 22
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 12,
                              "z": 16
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 7,
                              "z": 19
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 17,
                              "z": 19
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 12,
                              "z": 22
                    }
          }
]
        },
        {
            id: 31,
            name: "🏥 Sairaalan laaja kampusverkko (/21)",
            difficulty: 5,
            phase: "🟠 Kampus ja Suuryritykset",
            scenario: "Sairaalan suuri kampusverkko yhdistää viisi erillistä siipeä laajaan /21-aliverkkoon (2046 isäntäosoitetta). Keskus-IT:n MDF-jakamo syöttää runkoyhteydet hallintoon, laboratorioon, päivystykseen ja vuodeosastoille.",
            hint: "Laske /21-aliverkon peite (255.255.248.0). Yhdistä Keskus-IT:n ydinlinkki (Core Switch) siipien kytkimiin ja konfiguroi osoitteet alueelta 10.20.0.1 - 10.20.7.254.",
            teachingTopic: "slash21",
            network: "10.20.0.0",
            cidr: 21,
            allowedTools: [],
            
            zones: [
          {
                    "x": 0,
                    "z": 2,
                    "w": 18,
                    "d": 12,
                    "color": 9133302,
                    "name": "Keskus-IT (MDF) .0/21",
                    "subnet": "10.20.0.0/21"
          },
          {
                    "x": -18,
                    "z": 2,
                    "w": 16,
                    "d": 12,
                    "color": 11032055,
                    "name": "Hallinto & Johto .0/21",
                    "subnet": "10.20.0.0/21"
          },
          {
                    "x": 18,
                    "z": 2,
                    "w": 16,
                    "d": 12,
                    "color": 16096779,
                    "name": "Laboratorio & Kuvantaminen .0/21",
                    "subnet": "10.20.0.0/21"
          },
          {
                    "x": -14,
                    "z": 18,
                    "w": 22,
                    "d": 16,
                    "color": 15680580,
                    "name": "Päivystyspoliklinikka .0/21",
                    "subnet": "10.20.0.0/21"
          },
          {
                    "x": 14,
                    "z": 18,
                    "w": 22,
                    "d": 16,
                    "color": 3900150,
                    "name": "Osastosiipi .0/21",
                    "subnet": "10.20.0.0/21"
          }
],
            requiredNodes: [
          {
                    "type": "core_switch",
                    "pos": {
                              "x": 0,
                              "z": 2
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -5,
                              "z": 4
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 5,
                              "z": 4
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -18,
                              "z": 0
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -22,
                              "z": 4
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -14,
                              "z": 4
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": -18,
                              "z": 5
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 18,
                              "z": 0
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 14,
                              "z": 4
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 22,
                              "z": 4
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": 18,
                              "z": 5
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -14,
                              "z": 13
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": -21,
                              "z": 15
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -14,
                              "z": 18
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -7,
                              "z": 18
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": -19,
                              "z": 21
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -19,
                              "z": 24
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": -10,
                              "z": 22
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 14,
                              "z": 13
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 9,
                              "z": 17
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 14,
                              "z": 17
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": 19,
                              "z": 17
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 9,
                              "z": 22
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 15,
                              "z": 22
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 21,
                              "z": 22
                    }
          }
]
        },
        {
            id: 32,
            name: "🎓 Yliopiston tiedekunnan verkko (/20)",
            difficulty: 5,
            phase: "🟠 Kampus ja Suuryritykset",
            scenario: "Tiedekunnan laaja kampus kattaa luentosalit, tietokonelaboratorion, tutkijoiden työhuoneet, kirjaston ja IT-palvelinkeskuksen. Koko kampus käyttää yhtenäistä /20-verkkoa (4094 isäntäosoitetta) BYOD- ja tutkimuskäyttöön.",
            hint: "Laske /20-aliverkon peite (255.255.240.0). Kytke IT-keskuksen ydinlinkistä yhteydet luentosaleihin, laboratorioon ja kirjastoon.",
            teachingTopic: "slash20",
            network: "172.20.16.0",
            cidr: 20,
            allowedTools: [],
            
            zones: [
          {
                    "x": 0,
                    "z": 0,
                    "w": 16,
                    "d": 10,
                    "color": 9133302,
                    "name": "IT-palvelinkeskus .16.0/20",
                    "subnet": "172.20.16.0/20"
          },
          {
                    "x": -19,
                    "z": 0,
                    "w": 20,
                    "d": 14,
                    "color": 16096779,
                    "name": "Luentosalit .16.0/20",
                    "subnet": "172.20.16.0/20"
          },
          {
                    "x": 19,
                    "z": 0,
                    "w": 20,
                    "d": 14,
                    "color": 11032055,
                    "name": "Tutkijoiden työhuoneet .16.0/20",
                    "subnet": "172.20.16.0/20"
          },
          {
                    "x": -16,
                    "z": 18,
                    "w": 24,
                    "d": 16,
                    "color": 3900150,
                    "name": "Tietokonelaboratorio .16.0/20",
                    "subnet": "172.20.16.0/20"
          },
          {
                    "x": 14,
                    "z": 18,
                    "w": 26,
                    "d": 16,
                    "color": 2278750,
                    "name": "Kirjasto & Oppimiskeskus .16.0/20",
                    "subnet": "172.20.16.0/20"
          }
],
            requiredNodes: [
          {
                    "type": "core_switch",
                    "pos": {
                              "x": 0,
                              "z": -1
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -4,
                              "z": 2
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 4,
                              "z": 2
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": -19,
                              "z": -2
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -24,
                              "z": -3
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -24,
                              "z": 3
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -19,
                              "z": 3
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -14,
                              "z": 3
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 19,
                              "z": -3
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 14,
                              "z": -1
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": 24,
                              "z": -1
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 14,
                              "z": 3
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 24,
                              "z": 3
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -16,
                              "z": 13
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -23,
                              "z": 17
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -16,
                              "z": 17
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -9,
                              "z": 17
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -23,
                              "z": 22
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": -16,
                              "z": 22
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -9,
                              "z": 22
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 7,
                              "z": 13
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": 18,
                              "z": 13
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 6,
                              "z": 18
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 6,
                              "z": 22
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": 12,
                              "z": 22
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 17,
                              "z": 19
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 23,
                              "z": 19
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 20,
                              "z": 23
                    }
          }
]
        },
        {
            id: 33,
            name: "🛍️ Kauppakeskuksen turvaverkko (/22)",
            difficulty: 5,
            phase: "🟠 Kampus ja Suuryritykset",
            scenario: "Kauppakeskuksen keskitetty turva- ja valvontaverkko pyörii /22-aliverkossa (1022 isäntäosoitetta). Valvomo, tekniikkatila, huoltokäytävät, myymälätori ja maanalainen pysäköintihalli on kytketty yhteen reaaliaikaista CCTV- ja kulunvalvontaa varten.",
            hint: "Laske /22-aliverkon peite (255.255.252.0). Kytke CCTV-palvelimet ja valvontakamerat (VOIP) omiin kerroskytkimiinsä tekniikkatilan Core-kytkimen kautta.",
            teachingTopic: "slash22",
            network: "192.168.0.0",
            cidr: 22,
            allowedTools: [],
            
            zones: [
          {
                    "x": -16,
                    "z": 2,
                    "w": 20,
                    "d": 14,
                    "color": 15680580,
                    "name": "Valvomo (CCTV & SOC) .0/22",
                    "subnet": "192.168.0.0/22"
          },
          {
                    "x": 14,
                    "z": 2,
                    "w": 22,
                    "d": 14,
                    "color": 9133302,
                    "name": "Tekniikkatila & Jakamo .0/22",
                    "subnet": "192.168.0.0/22"
          },
          {
                    "x": 0,
                    "z": 13,
                    "w": 46,
                    "d": 8,
                    "color": 6583435,
                    "name": "Huoltokäytävät .0/22",
                    "subnet": "192.168.0.0/22"
          },
          {
                    "x": -14,
                    "z": 25,
                    "w": 22,
                    "d": 16,
                    "color": 16096779,
                    "name": "Myymälätori .0/22",
                    "subnet": "192.168.0.0/22"
          },
          {
                    "x": 14,
                    "z": 25,
                    "w": 22,
                    "d": 16,
                    "color": 3900150,
                    "name": "Pysäköintihalli .0/22",
                    "subnet": "192.168.0.0/22"
          }
],
            requiredNodes: [
          {
                    "type": "switch",
                    "pos": {
                              "x": -16,
                              "z": 0
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": -22,
                              "z": -1
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -22,
                              "z": 4
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -16,
                              "z": 5
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -10,
                              "z": 4
                    }
          },
          {
                    "type": "core_switch",
                    "pos": {
                              "x": 10,
                              "z": 0
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 18,
                              "z": -1
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 18,
                              "z": 4
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 10,
                              "z": 5
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 0,
                              "z": 13
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": -15,
                              "z": 13
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 15,
                              "z": 13
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -14,
                              "z": 20
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": -8,
                              "z": 24
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -20,
                              "z": 25
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": -20,
                              "z": 29
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": -8,
                              "z": 29
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 14,
                              "z": 20
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 7,
                              "z": 26
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 21,
                              "z": 26
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 14,
                              "z": 28
                    }
          }
]
        },
        {
            id: 34,
            name: "🏛️ Pankkikonttorien suojattu WAN (/30)",
            difficulty: 5,
            phase: "🟠 Kampus ja Suuryritykset",
            scenario: "Pankin pääkonttorin konesali ja alueellinen haarakonttori yhdistetään toisiinsa dedikoidulla ja salatulla piste-piste-runkoverkolla. Kahden pisteen välillä käytetään tiukkaa /30-aliverkkoa.",
            hint: "Piste-piste (/30) -verkossa on vain 2 käyttökelpoista IP-osoitetta (.1 ja .2) ja peite on 255.255.255.252. Konfiguroi konesalien suorat linkit.",
            teachingTopic: "slash30",
            network: "10.255.255.0",
            cidr: 30,
            allowedTools: [],
            
            zones: [
          {
                    "x": -22,
                    "z": 6,
                    "w": 16,
                    "d": 14,
                    "color": 9133302,
                    "name": "Pääkonttori: Konesali .0/30",
                    "subnet": "10.255.255.0/30"
          },
          {
                    "x": -22,
                    "z": 22,
                    "w": 16,
                    "d": 14,
                    "color": 3900150,
                    "name": "Pääkonttori: Operaatiot .0/30",
                    "subnet": "10.255.255.0/30"
          },
          {
                    "x": 0,
                    "z": 14,
                    "w": 20,
                    "d": 12,
                    "color": 1976635,
                    "name": "Salattu WAN-runkoyhteys .0/30",
                    "subnet": "10.255.255.0/30"
          },
          {
                    "x": 22,
                    "z": 6,
                    "w": 16,
                    "d": 14,
                    "color": 15680580,
                    "name": "Haarakonttori: Kytkentätila .0/30",
                    "subnet": "10.255.255.0/30"
          },
          {
                    "x": 22,
                    "z": 22,
                    "w": 16,
                    "d": 14,
                    "color": 2278750,
                    "name": "Haarakonttori: Asiakaspalvelu .0/30",
                    "subnet": "10.255.255.0/30"
          }
],
            requiredNodes: [
          {
                    "type": "firewall",
                    "pos": {
                              "x": -17,
                              "z": 6
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -24,
                              "z": 3
                    }
          },
          {
                    "type": "core_switch",
                    "pos": {
                              "x": -24,
                              "z": 9
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -22,
                              "z": 18
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -26,
                              "z": 24
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -18,
                              "z": 24
                    }
          },
          {
                    "type": "router",
                    "pos": {
                              "x": -5,
                              "z": 14
                    }
          },
          {
                    "type": "router",
                    "pos": {
                              "x": 5,
                              "z": 14
                    }
          },
          {
                    "type": "firewall",
                    "pos": {
                              "x": 17,
                              "z": 6
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 24,
                              "z": 3
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 24,
                              "z": 9
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 22,
                              "z": 18
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 18,
                              "z": 24
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 26,
                              "z": 24
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": 22,
                              "z": 26
                    }
          }
]
        },
        {
            id: 35,
            name: "🌐 Ketjun Hub-and-Spoke (VLSM)",
            difficulty: 5,
            phase: "🟠 Kampus ja Suuryritykset",
            scenario: "Myymäläketjun tähtitopologia (Hub-and-Spoke). Pääkeskus Hub toimii verkossa .0/26, Toimipiste A verkossa .64/27, Toimipiste B verkossa .96/27, ja toimipisteiden runkoyhteydet WAN-linkeissä .128/30 ja .132/30.",
            hint: "VLSM-hierarkia: Hub .0/26 (peite .192), Toimipiste A .64/27 (peite .224), Toimipiste B .96/27 (peite .224), WAN-linkit .128/30 ja .132/30 (peite .252).",
            teachingTopic: "vlsm",
            network: "10.0.0.0",
            cidr: 25,
            allowedTools: [],
            
            zones: [
          {
                    "x": -18,
                    "z": 14,
                    "w": 22,
                    "d": 24,
                    "color": 3900150,
                    "name": "Pääkeskus Hub .0/26",
                    "subnet": "10.0.0.0/26"
          },
          {
                    "x": 2,
                    "z": 6,
                    "w": 14,
                    "d": 8,
                    "color": 1976635,
                    "name": "WAN-linkki A .128/30",
                    "subnet": "10.0.0.128/30"
          },
          {
                    "x": 2,
                    "z": 22,
                    "w": 14,
                    "d": 8,
                    "color": 1976635,
                    "name": "WAN-linkki B .132/30",
                    "subnet": "10.0.0.132/30"
          },
          {
                    "x": 20,
                    "z": 6,
                    "w": 18,
                    "d": 14,
                    "color": 2278750,
                    "name": "Toimipiste A .64/27",
                    "subnet": "10.0.0.64/27"
          },
          {
                    "x": 20,
                    "z": 22,
                    "w": 18,
                    "d": 14,
                    "color": 16096779,
                    "name": "Toimipiste B .96/27",
                    "subnet": "10.0.0.96/27"
          }
],
            requiredNodes: [
          {
                    "type": "core_switch",
                    "pos": {
                              "x": -18,
                              "z": 7
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -24,
                              "z": 6
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -24,
                              "z": 11
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -18,
                              "z": 15
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -24,
                              "z": 19
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -18,
                              "z": 21
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": -12,
                              "z": 20
                    }
          },
          {
                    "type": "router",
                    "pos": {
                              "x": -1,
                              "z": 6
                    }
          },
          {
                    "type": "router",
                    "pos": {
                              "x": 5,
                              "z": 6
                    }
          },
          {
                    "type": "router",
                    "pos": {
                              "x": -1,
                              "z": 22
                    }
          },
          {
                    "type": "router",
                    "pos": {
                              "x": 5,
                              "z": 22
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 20,
                              "z": 3
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 15,
                              "z": 7
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 25,
                              "z": 7
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 20,
                              "z": 9
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 20,
                              "z": 19
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 15,
                              "z": 23
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 25,
                              "z": 23
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": 20,
                              "z": 25
                    }
          }
]
        },
        {
            id: 36,
            name: "🎮 Peliyhtiön testauslaboratorio (/22)",
            difficulty: 5,
            phase: "🟠 Kampus ja Suuryritykset",
            scenario: "Pelistudion laaja testauslaboratorio ja CI/CD-kehitysympäristö jakavat /22-verkon (1022 IP-osoitetta). Pelikehitys, äänistudio, QA-automaatiolabra ja moninpelitestauksen lounge kytkeytyvät Build-palvelinsaliin.",
            hint: "Laske /22-aliverkon peite (255.255.252.0). Kytke kehittäjien tehotyöasemat ja QA-testauskoneet palvelinsalin ydinlinkkiin.",
            teachingTopic: "slash22",
            network: "10.5.0.0",
            cidr: 22,
            allowedTools: [],
            
            zones: [
          {
                    "x": 0,
                    "z": 2,
                    "w": 18,
                    "d": 12,
                    "color": 9133302,
                    "name": "Palvelinsali (Build & CI) .0/22",
                    "subnet": "10.5.0.0/22"
          },
          {
                    "x": -19,
                    "z": 2,
                    "w": 16,
                    "d": 12,
                    "color": 3900150,
                    "name": "Pelikehitysstudio .0/22",
                    "subnet": "10.5.0.0/22"
          },
          {
                    "x": 19,
                    "z": 2,
                    "w": 16,
                    "d": 12,
                    "color": 11032055,
                    "name": "Äänistudio .0/22",
                    "subnet": "10.5.0.0/22"
          },
          {
                    "x": -14,
                    "z": 18,
                    "w": 22,
                    "d": 16,
                    "color": 16096779,
                    "name": "QA & Testauslaboratorio .0/22",
                    "subnet": "10.5.0.0/22"
          },
          {
                    "x": 14,
                    "z": 18,
                    "w": 22,
                    "d": 16,
                    "color": 2278750,
                    "name": "Moninpeli & Demo Lounge .0/22",
                    "subnet": "10.5.0.0/22"
          }
],
            requiredNodes: [
          {
                    "type": "core_switch",
                    "pos": {
                              "x": 0,
                              "z": 0
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -5,
                              "z": 4
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 5,
                              "z": 4
                    }
          },
          {
                    "type": "firewall",
                    "pos": {
                              "x": 0,
                              "z": 5
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -19,
                              "z": 0
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -24,
                              "z": 4
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -14,
                              "z": 4
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": -19,
                              "z": 5
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 19,
                              "z": 0
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 15,
                              "z": 4
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 23,
                              "z": 4
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -14,
                              "z": 13
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -21,
                              "z": 17
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -14,
                              "z": 17
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -7,
                              "z": 17
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -21,
                              "z": 22
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -14,
                              "z": 22
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -7,
                              "z": 22
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 14,
                              "z": 13
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": 14,
                              "z": 18
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 8,
                              "z": 16
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 20,
                              "z": 16
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 8,
                              "z": 22
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 20,
                              "z": 22
                    }
          }
]
        },
        {
            id: 37,
            name: "🏭 Teollisuuspuiston runkoverkko (/20)",
            difficulty: 5,
            phase: "🟠 Kampus ja Suuryritykset",
            scenario: "Laaja teollisuuspuisto kattaa kaksi tuotantolaitosta (konepaja ja robottikokoonpano), yhteisen logistiikkakeskuksen, energialaitoksen ja hallintorakennuksen. Laitteet ja SCADA-järjestelmät hyödyntävät /20-runkoverkkoa.",
            hint: "Laske /20-aliverkon peite (255.255.240.0). Kytke tehtaiden ja logistiikan kytkimet hallintokeskuksen Core Switchiin.",
            teachingTopic: "slash20",
            network: "172.16.128.0",
            cidr: 20,
            allowedTools: [],
            
            zones: [
          {
                    "x": 0,
                    "z": 2,
                    "w": 20,
                    "d": 12,
                    "color": 9133302,
                    "name": "Hallintorakennus & SCADA .128.0/20",
                    "subnet": "172.16.128.0/20"
          },
          {
                    "x": -21,
                    "z": 3,
                    "w": 18,
                    "d": 14,
                    "color": 3900150,
                    "name": "Tehdas A (Konepaja) .128.0/20",
                    "subnet": "172.16.128.0/20"
          },
          {
                    "x": 21,
                    "z": 3,
                    "w": 18,
                    "d": 14,
                    "color": 15680580,
                    "name": "Tehdas B (Kokoonpano) .128.0/20",
                    "subnet": "172.16.128.0/20"
          },
          {
                    "x": -14,
                    "z": 20,
                    "w": 22,
                    "d": 16,
                    "color": 16096779,
                    "name": "Yhteinen Logistiikka .128.0/20",
                    "subnet": "172.16.128.0/20"
          },
          {
                    "x": 14,
                    "z": 20,
                    "w": 22,
                    "d": 16,
                    "color": 6583435,
                    "name": "Energialaitos & Muuntamo .128.0/20",
                    "subnet": "172.16.128.0/20"
          }
],
            requiredNodes: [
          {
                    "type": "core_switch",
                    "pos": {
                              "x": 0,
                              "z": 0
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -5,
                              "z": 4
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 5,
                              "z": 4
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": 0,
                              "z": 5
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -21,
                              "z": 0
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -26,
                              "z": 5
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -16,
                              "z": 5
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": -21,
                              "z": 6
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 21,
                              "z": 0
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 16,
                              "z": 5
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 26,
                              "z": 5
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 21,
                              "z": 6
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -14,
                              "z": 15
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -20,
                              "z": 18
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": -8,
                              "z": 18
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": -14,
                              "z": 21
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -20,
                              "z": 24
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -8,
                              "z": 24
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 14,
                              "z": 15
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 9,
                              "z": 20
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 19,
                              "z": 20
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 14,
                              "z": 24
                    }
          }
]
        },
        {
            id: 38,
            name: "🛫 Lentokentän lähtöselvitys (/21)",
            difficulty: 5,
            phase: "🟠 Kampus ja Suuryritykset",
            scenario: "Kansainvälisen lentokentän Terminaali 1:n matkustajavirrat ja lentotoiminnot on integroitu luotettavaan /21-aliverkkoon (2046 IP:tä). Operaatiokeskus (AOC) valvoo lähtöselvitystiskejä, turvatarkastuslinjastoa, porttialuetta ja matkatavaran käsittelyä.",
            hint: "Laske /21-aliverkon peite (255.255.248.0). Kytke AOC-valvomon palvelimet ja eri terminaaliosien kytkimet toimivaan tähtiverkkoon.",
            teachingTopic: "slash21",
            network: "10.100.16.0",
            cidr: 21,
            allowedTools: [],
            
            zones: [
          {
                    "x": 0,
                    "z": 2,
                    "w": 20,
                    "d": 12,
                    "color": 9133302,
                    "name": "Operaatiokeskus (AOC) .16.0/21",
                    "subnet": "10.100.16.0/21"
          },
          {
                    "x": -20,
                    "z": 4,
                    "w": 18,
                    "d": 16,
                    "color": 3900150,
                    "name": "Lähtöselvitystiskit .16.0/21",
                    "subnet": "10.100.16.0/21"
          },
          {
                    "x": 20,
                    "z": 4,
                    "w": 18,
                    "d": 16,
                    "color": 15680580,
                    "name": "Turvatarkastuslinjasto .16.0/21",
                    "subnet": "10.100.16.0/21"
          },
          {
                    "x": -14,
                    "z": 22,
                    "w": 22,
                    "d": 16,
                    "color": 2278750,
                    "name": "Porttialue (Gate 1-10) .16.0/21",
                    "subnet": "10.100.16.0/21"
          },
          {
                    "x": 14,
                    "z": 22,
                    "w": 22,
                    "d": 16,
                    "color": 16096779,
                    "name": "Matkatavaran käsittely (BHS) .16.0/21",
                    "subnet": "10.100.16.0/21"
          }
],
            requiredNodes: [
          {
                    "type": "core_switch",
                    "pos": {
                              "x": 0,
                              "z": -1
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -5,
                              "z": 3
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 5,
                              "z": 3
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 0,
                              "z": 5
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -20,
                              "z": 0
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -25,
                              "z": 4
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": -21,
                              "z": 4
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -25,
                              "z": 8
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": -21,
                              "z": 8
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -15,
                              "z": 6
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 20,
                              "z": 0
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 15,
                              "z": 4
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 25,
                              "z": 4
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 20,
                              "z": 8
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -14,
                              "z": 17
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -20,
                              "z": 20
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -8,
                              "z": 20
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": -14,
                              "z": 23
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -20,
                              "z": 26
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -8,
                              "z": 26
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": -14,
                              "z": 27
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 14,
                              "z": 17
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 9,
                              "z": 22
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 19,
                              "z": 22
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": 14,
                              "z": 26
                    }
          }
]
        },
        {
            id: 39,
            name: "🏙️ Kaupungin julkinen WiFi (/16)",
            difficulty: 5,
            phase: "🟠 Kampus ja Suuryritykset",
            scenario: "Älykaupungin keskusverkko tarjoaa yli 65 000 IP-osoitteen (/16) yhtenäisen infrastruktuurin kaupunkilaisille ja matkailijoille. NOC-valvomo ohjaa verkkoa kaupungintalon, pääkirjaston, kauppatorin ja puistoalueen välillä.",
            hint: "Luokan B /16-verkossa kaksi ensimmäistä tavua määrittelevät verkon ja kaksi viimeistä isännät. Peite on 255.255.0.0. Suojaa runko palomuurilla.",
            teachingTopic: "slash16",
            network: "10.10.0.0",
            cidr: 16,
            allowedTools: [],
            
            zones: [
          {
                    "x": 0,
                    "z": 2,
                    "w": 20,
                    "d": 12,
                    "color": 9133302,
                    "name": "NOC-valvomo & Konesali .0/16",
                    "subnet": "10.10.0.0/16"
          },
          {
                    "x": -20,
                    "z": 4,
                    "w": 18,
                    "d": 16,
                    "color": 3900150,
                    "name": "Kaupungintalon aula .0/16",
                    "subnet": "10.10.0.0/16"
          },
          {
                    "x": 20,
                    "z": 4,
                    "w": 18,
                    "d": 16,
                    "color": 11032055,
                    "name": "Pääkirjasto & Mediatila .0/16",
                    "subnet": "10.10.0.0/16"
          },
          {
                    "x": -14,
                    "z": 22,
                    "w": 22,
                    "d": 16,
                    "color": 16096779,
                    "name": "Kauppatori (Ulko-WiFi) .0/16",
                    "subnet": "10.10.0.0/16"
          },
          {
                    "x": 14,
                    "z": 22,
                    "w": 22,
                    "d": 16,
                    "color": 2278750,
                    "name": "Keskuspuisto & Esplanadi .0/16",
                    "subnet": "10.10.0.0/16"
          }
],
            requiredNodes: [
          {
                    "type": "firewall",
                    "pos": {
                              "x": 0,
                              "z": -1
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -5,
                              "z": 3
                    }
          },
          {
                    "type": "core_switch",
                    "pos": {
                              "x": 0,
                              "z": 3
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 5,
                              "z": 3
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 0,
                              "z": 6
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -20,
                              "z": 0
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": -20,
                              "z": 5
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -25,
                              "z": 6
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -15,
                              "z": 6
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": -20,
                              "z": 9
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 20,
                              "z": 0
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": 20,
                              "z": 5
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 15,
                              "z": 6
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 25,
                              "z": 6
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 20,
                              "z": 9
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -14,
                              "z": 17
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": -18,
                              "z": 21
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": -10,
                              "z": 21
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -19,
                              "z": 26
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -14,
                              "z": 26
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -9,
                              "z": 26
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 14,
                              "z": 17
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": 14,
                              "z": 21
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 9,
                              "z": 26
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 19,
                              "z": 26
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 14,
                              "z": 27
                    }
          }
]
        },
        {
            id: 40,
            name: "🏢 Kansainvälisen yrityksen HQ (/16)",
            difficulty: 5,
            phase: "🟠 Kampus ja Suuryritykset",
            scenario: "Monikansallisen konsernin pääkonttori (HQ) kokoaa yhteen johtoryhmän siiven, R&D-tuotekehityksen, globaalin markkinoinnin, edustusaulan ja yrityksen konesalin. Koko kompleksi käyttää keskitettyä /16-pääverkkoa.",
            hint: "Aseta yrityksen laitteet globaaliin /16-verkkoon (peite 255.255.0.0). Konesalin klusteripalvelimet ja Core-kytkin jakavat yhteydet eri osastoille palomuurin suojassa.",
            teachingTopic: "slash16",
            network: "172.16.0.0",
            cidr: 16,
            allowedTools: [],
            
            zones: [
          {
                    "x": 0,
                    "z": 2,
                    "w": 20,
                    "d": 12,
                    "color": 9133302,
                    "name": "Globaali Konesali .0/16",
                    "subnet": "172.16.0.0/16"
          },
          {
                    "x": -20,
                    "z": 4,
                    "w": 18,
                    "d": 16,
                    "color": 11032055,
                    "name": "Johtoryhmän siipi .0/16",
                    "subnet": "172.16.0.0/16"
          },
          {
                    "x": 20,
                    "z": 4,
                    "w": 18,
                    "d": 16,
                    "color": 16096779,
                    "name": "Markkinointi & Myynti .0/16",
                    "subnet": "172.16.0.0/16"
          },
          {
                    "x": -14,
                    "z": 22,
                    "w": 22,
                    "d": 16,
                    "color": 3900150,
                    "name": "R&D Tuotekehitys .0/16",
                    "subnet": "172.16.0.0/16"
          },
          {
                    "x": 14,
                    "z": 22,
                    "w": 22,
                    "d": 16,
                    "color": 2278750,
                    "name": "Pääaula & Neuvottelukeskus .0/16",
                    "subnet": "172.16.0.0/16"
          }
],
            requiredNodes: [
          {
                    "type": "firewall",
                    "pos": {
                              "x": 0,
                              "z": -1
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -5,
                              "z": 2
                    }
          },
          {
                    "type": "core_switch",
                    "pos": {
                              "x": 0,
                              "z": 3
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 5,
                              "z": 2
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -5,
                              "z": 5
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 5,
                              "z": 5
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -20,
                              "z": 0
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -25,
                              "z": 4
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -15,
                              "z": 4
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": -20,
                              "z": 6
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": -20,
                              "z": 9
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 20,
                              "z": 0
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 15,
                              "z": 4
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 25,
                              "z": 4
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 15,
                              "z": 8
                    }
          },
          {
                    "type": "printer",
                    "pos": {
                              "x": 25,
                              "z": 8
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -14,
                              "z": 17
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -21,
                              "z": 20
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -14,
                              "z": 20
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -7,
                              "z": 20
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -21,
                              "z": 25
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -14,
                              "z": 25
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -7,
                              "z": 25
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 14,
                              "z": 17
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 8,
                              "z": 20
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 20,
                              "z": 20
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": 14,
                              "z": 22
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 8,
                              "z": 26
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 20,
                              "z": 26
                    }
          }
]
        },
        {
            id: 41,
            name: "Konesalin Web ja DB (DMZ)",
            difficulty: 5,
            phase: "🔴 Konesalit ja ISP",
            scenario: "Konesalin moderni arkkitehtuuri: Julkiset Web-palvelimet sijaitsevat eristetyssä DMZ-räkkirivissä (.0/27) ja kriittiset tietokannat suojatussa DB-räkkirivissä (.32/27). Liikennettä vartioi keskitetty palomuurikäytävä (.64/28), ja valvonnasta vastaa NOC (.80/28).",
            hint: "TOPOLOGIA: DMZ-palomuuri reitittää julkisen Web-aliverkon (.0/27) ja sisäisen DB-aliverkon (.32/27) välillä. NOC-valvomo hallitsee kytkimiä .80/28 -alueelta.",
            teachingTopic: "dmz_vlsm",
            network: "10.0.1.0",
            cidr: 24,
            allowedTools: [],
            
            zones: [
          {
                    "x": 0,
                    "z": 2,
                    "w": 16,
                    "d": 12,
                    "color": 15680580,
                    "name": "Palomuurikäytävä .64/28",
                    "subnet": "10.0.1.64/28"
          },
          {
                    "x": -20,
                    "z": 2,
                    "w": 20,
                    "d": 18,
                    "color": 3900150,
                    "name": "Julkinen Räkkirivi (Web) .0/27",
                    "subnet": "10.0.1.0/27"
          },
          {
                    "x": 20,
                    "z": 2,
                    "w": 20,
                    "d": 18,
                    "color": 9133302,
                    "name": "Suojattu Räkkirivi (DB) .32/27",
                    "subnet": "10.0.1.32/27"
          },
          {
                    "x": -10,
                    "z": 20,
                    "w": 20,
                    "d": 12,
                    "color": 2278750,
                    "name": "NOC-valvomo .80/28",
                    "subnet": "10.0.1.80/28"
          },
          {
                    "x": 10,
                    "z": 20,
                    "w": 20,
                    "d": 12,
                    "color": 6583435,
                    "name": "Sähkö- ja LVI-tila .96/28",
                    "subnet": "10.0.1.96/28"
          }
],
            requiredNodes: [
          {
                    "type": "firewall",
                    "pos": {
                              "x": -3,
                              "z": 0
                    }
          },
          {
                    "type": "firewall",
                    "pos": {
                              "x": 3,
                              "z": 0
                    }
          },
          {
                    "type": "core_switch",
                    "pos": {
                              "x": 0,
                              "z": 4
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -16,
                              "z": -2
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -24,
                              "z": 3
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -16,
                              "z": 3
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -24,
                              "z": 7
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 16,
                              "z": -2
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 16,
                              "z": 3
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 24,
                              "z": 3
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 20,
                              "z": 7
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -10,
                              "z": 17
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -16,
                              "z": 22
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -10,
                              "z": 22
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -4,
                              "z": 22
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 5,
                              "z": 18
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 14,
                              "z": 21
                    }
          }
]
        },
        {
            id: 42,
            name: "Konesalin Rack-kohtainen jako (/26)",
            difficulty: 5,
            phase: "🔴 Konesalit ja ISP",
            scenario: "Konesalihallissa jokainen palvelinräkki (Rack A, B ja C) on eriytetty omaan /26-aliverkkoonsa (62 käytettävää osoitetta). Keskitetty Top-of-Rack (ToR) -jakamo ohjaa runkoliikennettä ja huoltokäytävällä operoivat järjestelmäasiantuntijat.",
            hint: "Laske /26-peite (255.255.255.192). Räkki A (.64/26), Räkki B (.128/26) ja Räkki C (.192/26) kytketään omiin ToR-kytkimiinsä ja runkoon.",
            teachingTopic: "slash26",
            network: "10.200.10.0",
            cidr: 24,
            allowedTools: [],
            
            zones: [
          {
                    "x": 0,
                    "z": -2,
                    "w": 32,
                    "d": 12,
                    "color": 16096779,
                    "name": "Jakamokaappi (MDF) .0/26",
                    "subnet": "10.200.10.0/26"
          },
          {
                    "x": -20,
                    "z": 14,
                    "w": 16,
                    "d": 16,
                    "color": 3900150,
                    "name": "Palvelinräkki A .64/26",
                    "subnet": "10.200.10.64/26"
          },
          {
                    "x": 0,
                    "z": 14,
                    "w": 16,
                    "d": 16,
                    "color": 9133302,
                    "name": "Palvelinräkki B .128/26",
                    "subnet": "10.200.10.128/26"
          },
          {
                    "x": 20,
                    "z": 14,
                    "w": 16,
                    "d": 16,
                    "color": 11032055,
                    "name": "Palvelinräkki C .192/26",
                    "subnet": "10.200.10.192/26"
          },
          {
                    "x": 0,
                    "z": 27,
                    "w": 56,
                    "d": 8,
                    "color": 6583435,
                    "name": "Huoltokäytävä .0/26",
                    "subnet": "10.200.10.0/26"
          }
],
            requiredNodes: [
          {
                    "type": "core_switch",
                    "pos": {
                              "x": -6,
                              "z": -2
                    }
          },
          {
                    "type": "router",
                    "pos": {
                              "x": 6,
                              "z": -2
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -20,
                              "z": 9
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -24,
                              "z": 15
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -16,
                              "z": 15
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -20,
                              "z": 19
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 0,
                              "z": 9
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -4,
                              "z": 15
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 4,
                              "z": 15
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 0,
                              "z": 19
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 20,
                              "z": 9
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 16,
                              "z": 15
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 24,
                              "z": 15
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 20,
                              "z": 19
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -18,
                              "z": 27
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 0,
                              "z": 27
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 18,
                              "z": 27
                    }
          }
]
        },
        {
            id: 43,
            name: "Pilvihybridi Site-to-Site VPN",
            difficulty: 5,
            phase: "🔴 Konesalit ja ISP",
            scenario: "Yrityksen paikallinen konesali (192.168.1.0/24) ja NOC yhdistetään salatulla IPsec Site-to-Site VPN -tunnelilla julkisen pilvipalvelun VPC-verkkoon (Web-tier 172.31.1.0/24 ja DB-tier 172.31.2.0/24). Palomuuri muodostaa tunnelin VPN Gateway -alueella.",
            hint: "Kytke On-Premises konesali ja NOC palomuuriin. Palomuuri yhdistyy pilven VPC Web- ja DB-aliverkkoihin reitittimen kautta.",
            teachingTopic: "cloud_vpn",
            network: "192.168.1.0",
            cidr: 24,
            allowedTools: [],
            
            zones: [
          {
                    "x": -22,
                    "z": 4,
                    "w": 20,
                    "d": 20,
                    "color": 3900150,
                    "name": "On-Premises Konesali /24",
                    "subnet": "192.168.1.0/24"
          },
          {
                    "x": 0,
                    "z": 4,
                    "w": 16,
                    "d": 14,
                    "color": 15680580,
                    "name": "VPN Gateway -vyöhyke /29",
                    "subnet": "192.168.100.0/29"
          },
          {
                    "x": 22,
                    "z": -2,
                    "w": 20,
                    "d": 14,
                    "color": 11032055,
                    "name": "Pilvi VPC Web-tier /24",
                    "subnet": "172.31.1.0/24"
          },
          {
                    "x": 22,
                    "z": 13,
                    "w": 20,
                    "d": 14,
                    "color": 9133302,
                    "name": "Pilvi VPC DB-tier /24",
                    "subnet": "172.31.2.0/24"
          },
          {
                    "x": -22,
                    "z": 20,
                    "w": 20,
                    "d": 10,
                    "color": 2278750,
                    "name": "On-Prem NOC-valvomo /24",
                    "subnet": "192.168.1.0/24"
          }
],
            requiredNodes: [
          {
                    "type": "core_switch",
                    "pos": {
                              "x": -22,
                              "z": -1
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -27,
                              "z": 6
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -17,
                              "z": 6
                    }
          },
          {
                    "type": "firewall",
                    "pos": {
                              "x": -3,
                              "z": 1
                    }
          },
          {
                    "type": "router",
                    "pos": {
                              "x": 3,
                              "z": 1
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 0,
                              "z": 6
                    }
          },
          {
                    "type": "cloud",
                    "pos": {
                              "x": 22,
                              "z": -5
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 17,
                              "z": 0
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 27,
                              "z": 0
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 17,
                              "z": 10
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 25,
                              "z": 10
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 22,
                              "z": 16
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -27,
                              "z": 19
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -22,
                              "z": 21
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -17,
                              "z": 19
                    }
          }
]
        },
        {
            id: 44,
            name: "ISP:n alueellinen solmu (/18)",
            difficulty: 5,
            phase: "🔴 Konesalit ja ISP",
            scenario: "Internet-palveluntarjoajan (ISP) alueellinen solmupiste yhdistää kokonaisen kaupunginosan laajakaistat valtavaan /18-aliverkkoon (16 382 osoitetta). Kuitupäätehuoneesta signaali saapuu ydinreitittimille ja asiakasjakamoon, jota operoidaan NOC-valvomosta.",
            hint: "Laske /18-peite: 255.255.192.0. Ydinreitittimet ja asiakasjakamon kytkimet ohjaavat valtavaa tilaajakantaa.",
            teachingTopic: "slash18",
            network: "100.64.0.0",
            cidr: 18,
            allowedTools: [],
            
            zones: [
          {
                    "x": 0,
                    "z": 0,
                    "w": 22,
                    "d": 14,
                    "color": 16096779,
                    "name": "Reititinsali (Core) /18",
                    "subnet": "100.64.0.0/18"
          },
          {
                    "x": -20,
                    "z": 0,
                    "w": 16,
                    "d": 14,
                    "color": 9133302,
                    "name": "Kuitupäätehuone /18",
                    "subnet": "100.64.0.0/18"
          },
          {
                    "x": 20,
                    "z": 0,
                    "w": 16,
                    "d": 14,
                    "color": 3900150,
                    "name": "Asiakasjakamo /18",
                    "subnet": "100.64.0.0/18"
          },
          {
                    "x": -11,
                    "z": 15,
                    "w": 22,
                    "d": 12,
                    "color": 2278750,
                    "name": "ISP Valvomo (NOC) /18",
                    "subnet": "100.64.0.0/18"
          },
          {
                    "x": 11,
                    "z": 15,
                    "w": 22,
                    "d": 12,
                    "color": 6583435,
                    "name": "Varavoimatila /18",
                    "subnet": "100.64.0.0/18"
          }
],
            requiredNodes: [
          {
                    "type": "core_switch",
                    "pos": {
                              "x": -5,
                              "z": -2
                    }
          },
          {
                    "type": "router",
                    "pos": {
                              "x": 5,
                              "z": -2
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 0,
                              "z": 3
                    }
          },
          {
                    "type": "cloud",
                    "pos": {
                              "x": -20,
                              "z": -3
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -24,
                              "z": 2
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -16,
                              "z": 2
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 17,
                              "z": -2
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 23,
                              "z": -2
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 20,
                              "z": 3
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -16,
                              "z": 13
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -11,
                              "z": 17
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -5,
                              "z": 13
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 6,
                              "z": 14
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 15,
                              "z": 16
                    }
          }
]
        },
        {
            id: 45,
            name: "Konesalin SAN (Storage Area Network)",
            difficulty: 5,
            phase: "🔴 Konesalit ja ISP",
            scenario: "Korkean suorituskyvyn SAN-tallennusverkko (Storage Area Network). Massiiviset levyryhmät ja nopeat NVMe-tallennuspalvelimet tarvitsevat matalan latenssin eristetyn /24-aliverkon, jota kytkevät redundanteilla kuitukytkimillä varustetut SAN-kytkimet sovellusklusterille.",
            hint: "SAN-kuitukytkimet (Fabric A & B) tarjoavat kahdennetun reitin tallennuslevyjen ja sovelluspalvelimien välille ilman viiveitä.",
            teachingTopic: "san",
            network: "10.99.99.0",
            cidr: 24,
            allowedTools: [],
            
            zones: [
          {
                    "x": 0,
                    "z": 2,
                    "w": 22,
                    "d": 12,
                    "color": 16096779,
                    "name": "SAN-kytkinvyöhyke /24",
                    "subnet": "10.99.99.0/24"
          },
          {
                    "x": 0,
                    "z": -12,
                    "w": 42,
                    "d": 14,
                    "color": 6583435,
                    "name": "Tallennuspalvelinräkit /24",
                    "subnet": "10.99.99.0/24"
          },
          {
                    "x": -14,
                    "z": 17,
                    "w": 22,
                    "d": 14,
                    "color": 3900150,
                    "name": "Sovelluspalvelimet /24",
                    "subnet": "10.99.99.0/24"
          },
          {
                    "x": 14,
                    "z": 17,
                    "w": 22,
                    "d": 14,
                    "color": 2278750,
                    "name": "Hallintotila /24",
                    "subnet": "10.99.99.0/24"
          }
],
            requiredNodes: [
          {
                    "type": "core_switch",
                    "pos": {
                              "x": -5,
                              "z": 2
                    }
          },
          {
                    "type": "core_switch",
                    "pos": {
                              "x": 5,
                              "z": 2
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -14,
                              "z": -12
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -5,
                              "z": -12
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 5,
                              "z": -12
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 14,
                              "z": -12
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -14,
                              "z": 13
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -19,
                              "z": 19
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -9,
                              "z": 19
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 9,
                              "z": 15
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 18,
                              "z": 15
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 14,
                              "z": 20
                    }
          }
]
        },
        {
            id: 46,
            name: "HA Palomuuriklusteri (/29)",
            difficulty: 5,
            phase: "🔴 Konesalit ja ISP",
            scenario: "Kriittinen High Availability (HA) -palomuuripari (Active/Passive) jakaa pienen /29-julkishallintoverkon (6 osoitetta) ja synkronoi tilansa suoran sydänlankalinkin (Heartbeat) kautta. Palomuurit suojaavat yrityksen DMZ- ja sisäverkkoympäristöä.",
            hint: "Laske tarkka /29-peite (255.255.255.248). Vain 6 IP-osoitetta on käytettävissä. Määritä HA-parille peräkkäiset osoitteet.",
            teachingTopic: "ha_firewall",
            network: "192.0.2.0",
            cidr: 29,
            allowedTools: [],
            
            zones: [
          {
                    "x": 0,
                    "z": 0,
                    "w": 20,
                    "d": 12,
                    "color": 15680580,
                    "name": "Palomuuripari HA /29",
                    "subnet": "192.0.2.0/29"
          },
          {
                    "x": 0,
                    "z": -11,
                    "w": 20,
                    "d": 8,
                    "color": 16096779,
                    "name": "Sydänlanka (Sync) /29",
                    "subnet": "192.0.2.0/29"
          },
          {
                    "x": -20,
                    "z": 5,
                    "w": 18,
                    "d": 18,
                    "color": 9133302,
                    "name": "DMZ-palvelimet /29",
                    "subnet": "192.0.2.0/29"
          },
          {
                    "x": 20,
                    "z": 5,
                    "w": 18,
                    "d": 18,
                    "color": 3900150,
                    "name": "Sisäverkon reititys /29",
                    "subnet": "192.0.2.0/29"
          },
          {
                    "x": 0,
                    "z": 18,
                    "w": 32,
                    "d": 10,
                    "color": 2278750,
                    "name": "SOC Valvomo /29",
                    "subnet": "192.0.2.0/29"
          }
],
            requiredNodes: [
          {
                    "type": "firewall",
                    "pos": {
                              "x": -5,
                              "z": 0
                    }
          },
          {
                    "type": "firewall",
                    "pos": {
                              "x": 5,
                              "z": 0
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -4,
                              "z": -11
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 4,
                              "z": -11
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -20,
                              "z": 0
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -24,
                              "z": 7
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -16,
                              "z": 7
                    }
          },
          {
                    "type": "core_switch",
                    "pos": {
                              "x": 20,
                              "z": 0
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 16,
                              "z": 7
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 24,
                              "z": 7
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -10,
                              "z": 18
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 0,
                              "z": 18
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 10,
                              "z": 18
                    }
          }
]
        },
        {
            id: 47,
            name: "BGP-reitittimien siirtoverkko (/30)",
            difficulty: 5,
            phase: "🔴 Konesalit ja ISP",
            scenario: "Yrityksen reunareititin (Border Gateway) yhdistyy kahteen itsenäiseen ISP-operaattoriin käyttäen tiukkoja /30-siirtoverkkoja (Transit P2P). BGP (Border Gateway Protocol) valitsee nopeimman reitin globaaliin verkkoon.",
            hint: "Kumpikin P2P-siirtoyhteys käyttää /30-peitettä (255.255.255.252), jossa on tasan 2 käyttökelpoista osoitetta.",
            teachingTopic: "bgp",
            network: "10.255.0.0",
            cidr: 30,
            allowedTools: [],
            
            zones: [
          {
                    "x": -18,
                    "z": -4,
                    "w": 18,
                    "d": 14,
                    "color": 3900150,
                    "name": "ISP 1 Peering .0/30",
                    "subnet": "10.255.0.0/30"
          },
          {
                    "x": 18,
                    "z": -4,
                    "w": 18,
                    "d": 14,
                    "color": 11032055,
                    "name": "ISP 2 Peering .4/30",
                    "subnet": "10.255.0.4/30"
          },
          {
                    "x": 0,
                    "z": 4,
                    "w": 22,
                    "d": 14,
                    "color": 15680580,
                    "name": "Yrityksen Reuna (AS-BR) .8/30",
                    "subnet": "10.255.0.8/30"
          },
          {
                    "x": 0,
                    "z": 19,
                    "w": 32,
                    "d": 12,
                    "color": 2278750,
                    "name": "BGP Valvomo .16/28",
                    "subnet": "10.255.0.16/28"
          }
],
            requiredNodes: [
          {
                    "type": "router",
                    "pos": {
                              "x": -18,
                              "z": -6
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -18,
                              "z": 0
                    }
          },
          {
                    "type": "router",
                    "pos": {
                              "x": 18,
                              "z": -6
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 18,
                              "z": 0
                    }
          },
          {
                    "type": "firewall",
                    "pos": {
                              "x": -5,
                              "z": 1
                    }
          },
          {
                    "type": "core_switch",
                    "pos": {
                              "x": 5,
                              "z": 1
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 0,
                              "z": 7
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 0,
                              "z": 16
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -10,
                              "z": 21
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 10,
                              "z": 21
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 0,
                              "z": 21
                    }
          }
]
        },
        {
            id: 48,
            name: "Älykaupungin liikennevalot (/16)",
            difficulty: 5,
            phase: "🔴 Konesalit ja ISP",
            scenario: "Metropolialueen älyliikenneverkko: Tuhannet risteysten liikennevalot, valvontakamerat ja sääanturit kerääntyvät yhteen massiiviseen /16-runkoverkkoon (65 534 laitetta). Liikennekeskuksen palvelimet ja operaattorien valvontatila ohjaavat liikennevirtoja reaaliajassa.",
            hint: "Laske luokan B /16-peite (255.255.0.0). Kaksi ensimmäistä tavua (10.100) määrittelevät verkon ja kaksi viimeistä osoittavat laitteet.",
            teachingTopic: "smart_city",
            network: "10.100.0.0",
            cidr: 16,
            allowedTools: [],
            
            zones: [
          {
                    "x": -20,
                    "z": -2,
                    "w": 20,
                    "d": 16,
                    "color": 16096779,
                    "name": "Risteysalue 1 (Tori) /16",
                    "subnet": "10.100.0.0/16"
          },
          {
                    "x": 20,
                    "z": -2,
                    "w": 20,
                    "d": 16,
                    "color": 11032055,
                    "name": "Risteysalue 2 (Kehätie) /16",
                    "subnet": "10.100.0.0/16"
          },
          {
                    "x": 0,
                    "z": 8,
                    "w": 24,
                    "d": 16,
                    "color": 9133302,
                    "name": "Liikennekeskuksen Palvelimet /16",
                    "subnet": "10.100.0.0/16"
          },
          {
                    "x": -18,
                    "z": 22,
                    "w": 20,
                    "d": 14,
                    "color": 3900150,
                    "name": "Valvontatila /16",
                    "subnet": "10.100.0.0/16"
          },
          {
                    "x": 18,
                    "z": 22,
                    "w": 20,
                    "d": 14,
                    "color": 2278750,
                    "name": "Huoltovarikko /16",
                    "subnet": "10.100.0.0/16"
          }
],
            requiredNodes: [
          {
                    "type": "switch",
                    "pos": {
                              "x": -20,
                              "z": -6
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": -25,
                              "z": 0
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": -15,
                              "z": 0
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 20,
                              "z": -6
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 15,
                              "z": 0
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 25,
                              "z": 0
                    }
          },
          {
                    "type": "core_switch",
                    "pos": {
                              "x": 0,
                              "z": 4
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -6,
                              "z": 10
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 6,
                              "z": 10
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -23,
                              "z": 19
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -13,
                              "z": 19
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": -18,
                              "z": 24
                    }
          },
          {
                    "type": "wifi",
                    "pos": {
                              "x": 18,
                              "z": 19
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 13,
                              "z": 24
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 23,
                              "z": 24
                    }
          }
]
        },
        {
            id: 49,
            name: "Pilvipalveluntarjoajan AZ (/12)",
            difficulty: 5,
            phase: "🔴 Konesalit ja ISP",
            scenario: "Hyperscale-pilvipalveluntarjoajan saatavuusalue (Availability Zone, AZ). Massiivinen /12-verkkoalue tarjoaa yli miljoona IP-osoitetta virtuaalikoneille kahdessa konesalihallissa. Runkoreitittimet jakavat liikenteen ja automaatio huolehtii jäähdytyksestä ja varavoimasta.",
            hint: "Laske /12-peite (255.240.0.0). 20 bittiä isännille mahdollistaa yli miljoonan laitteen osoitteistuksen konesalikompleksissa.",
            teachingTopic: "slash12",
            network: "10.0.0.0",
            cidr: 12,
            allowedTools: [],
            
            zones: [
          {
                    "x": 0,
                    "z": -5,
                    "w": 36,
                    "d": 12,
                    "color": 15680580,
                    "name": "Runkoreititinhuone /12",
                    "subnet": "10.0.0.0/12"
          },
          {
                    "x": -20,
                    "z": 12,
                    "w": 20,
                    "d": 18,
                    "color": 3900150,
                    "name": "Datakeskushalli 1 /12",
                    "subnet": "10.0.0.0/12"
          },
          {
                    "x": 0,
                    "z": 12,
                    "w": 18,
                    "d": 18,
                    "color": 9133302,
                    "name": "Datakeskushalli 2 /12",
                    "subnet": "10.0.0.0/12"
          },
          {
                    "x": 20,
                    "z": 12,
                    "w": 20,
                    "d": 18,
                    "color": 6583435,
                    "name": "Jäähdytys & Voimansiirto /12",
                    "subnet": "10.0.0.0/12"
          },
          {
                    "x": 0,
                    "z": 28,
                    "w": 44,
                    "d": 10,
                    "color": 2278750,
                    "name": "Cloud NOC-valvomo /12",
                    "subnet": "10.0.0.0/12"
          }
],
            requiredNodes: [
          {
                    "type": "cloud",
                    "pos": {
                              "x": 0,
                              "z": -7
                    }
          },
          {
                    "type": "core_switch",
                    "pos": {
                              "x": -10,
                              "z": -3
                    }
          },
          {
                    "type": "firewall",
                    "pos": {
                              "x": 10,
                              "z": -3
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -20,
                              "z": 7
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -25,
                              "z": 13
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -15,
                              "z": 13
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -20,
                              "z": 17
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 0,
                              "z": 7
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -5,
                              "z": 13
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 5,
                              "z": 13
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 0,
                              "z": 17
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 20,
                              "z": 7
                    }
          },
          {
                    "type": "voip",
                    "pos": {
                              "x": 15,
                              "z": 14
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 25,
                              "z": 14
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": -14,
                              "z": 28
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 0,
                              "z": 28
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 14,
                              "z": 28
                    }
          }
]
        },
        {
            id: 50,
            name: "THE MASTER ARCHITECT (/8)",
            difficulty: 5,
            phase: "🔴 Konesalit ja ISP",
            scenario: "MESTARITASO: Koko globaali A-luokan 10.0.0.0/8 -pääverkko (yli 16 miljoonaa IP-osoitetta). Valtamerikaapelin pääteasemalta kuituvirta saapuu konesalikompleksin ydinjakamoon, josta se jaetaan hyperscale-konesaliin ja varmennuskeskukseen kansainvälisen NOC-keskuksen ohjauksessa.",
            hint: "Olet saavuttanut huipun. Koko 10.0.0.0/8 -alue (peite 255.0.0.0) on arkkitehtuurisi hallussa. Yhdistä mannertenväliset yhteydet ydinreitittimiin!",
            teachingTopic: "slash8",
            network: "10.0.0.0",
            cidr: 8,
            allowedTools: [],
            
            zones: [
          {
                    "x": -20,
                    "z": -5,
                    "w": 20,
                    "d": 16,
                    "color": 16096779,
                    "name": "Valtamerikaapelin Pääteasema /8",
                    "subnet": "10.0.0.0/8"
          },
          {
                    "x": 10,
                    "z": -5,
                    "w": 36,
                    "d": 16,
                    "color": 15680580,
                    "name": "Ydinjakamo (Core) /8",
                    "subnet": "10.0.0.0/8"
          },
          {
                    "x": -16,
                    "z": 13,
                    "w": 28,
                    "d": 16,
                    "color": 3900150,
                    "name": "Globaali Konesali /8",
                    "subnet": "10.0.0.0/8"
          },
          {
                    "x": 16,
                    "z": 13,
                    "w": 28,
                    "d": 16,
                    "color": 2278750,
                    "name": "Kansainvälinen NOC /8",
                    "subnet": "10.0.0.0/8"
          },
          {
                    "x": 0,
                    "z": 28,
                    "w": 40,
                    "d": 12,
                    "color": 9133302,
                    "name": "Varmennuskeskus (DR) /8",
                    "subnet": "10.0.0.0/8"
          }
],
            requiredNodes: [
          {
                    "type": "cloud",
                    "pos": {
                              "x": -20,
                              "z": -9
                    }
          },
          {
                    "type": "router",
                    "pos": {
                              "x": -25,
                              "z": -2
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -15,
                              "z": -2
                    }
          },
          {
                    "type": "core_switch",
                    "pos": {
                              "x": 0,
                              "z": -5
                    }
          },
          {
                    "type": "core_switch",
                    "pos": {
                              "x": 12,
                              "z": -5
                    }
          },
          {
                    "type": "firewall",
                    "pos": {
                              "x": 22,
                              "z": -5
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -16,
                              "z": 9
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -24,
                              "z": 15
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -16,
                              "z": 15
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": -8,
                              "z": 15
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": 16,
                              "z": 9
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 8,
                              "z": 15
                    }
          },
          {
                    "type": "pc",
                    "pos": {
                              "x": 16,
                              "z": 15
                    }
          },
          {
                    "type": "laptop",
                    "pos": {
                              "x": 24,
                              "z": 15
                    }
          },
          {
                    "type": "switch",
                    "pos": {
                              "x": -12,
                              "z": 27
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 0,
                              "z": 27
                    }
          },
          {
                    "type": "server",
                    "pos": {
                              "x": 12,
                              "z": 27
                    }
          }
]
        },
{
            id: 51,
            name: "🏫 Koulu – 3 rakennusta + vierailijaWiFi",
            difficulty: 5,
            phase: "🏫 Realistiset Infrastruktuurit",
            scenario: "Koululla on kolme erillistä rakennusta kampuksella: iso Opetusrakennus vasemmalla (.0/25), pieni Hallinto-rakennus oikealla yläosassa (.128/26) ja Liikuntahalli oikealla alaosassa (.192/26). Niiden välissä on koulupiha. Rakenna koko kampuksen verkkoinfra!",
            hint: "VLSM-JAKO: Opetus .0/25 (peite .128) → PC:t (.20+). Hallinto .128/26 (peite .192) → Server (.1+), Tulostin. Liikunta .192/26 → WiFi-AP + Läppärit. Core-kytkin kampuksen keskelle!",
            teachingTopic: "vlsm",
            network: "172.16.10.0",
            cidr: 24,
            zones: [
                { x: -20, z: 14, w: 22, d: 18, color: 3900150,  name: "Opetusrakennus .0/25",     subnet: "172.16.10.0/25" },
                { x: 16,  z: 5,  w: 14, d: 12, color: 9133302,  name: "Hallinto .128/26",          subnet: "172.16.10.128/26" },
                { x: 18,  z: 24, w: 18, d: 14, color: 11032055, name: "Liikuntahalli .192/26",     subnet: "172.16.10.192/26" }
            ],
            requiredNodes: [
                { type: nodeTypes.CORE_SWITCH, pos: { x: 0,   z: 8  } },
                { type: nodeTypes.SWITCH,      pos: { x: -20, z: 8  } },
                { type: nodeTypes.SWITCH,      pos: { x: 16,  z: 4  } },
                { type: nodeTypes.SWITCH,      pos: { x: 18,  z: 20 } },
                { type: nodeTypes.PC,          pos: { x: -26, z: 12 } },
                { type: nodeTypes.PC,          pos: { x: -22, z: 16 } },
                { type: nodeTypes.PC,          pos: { x: -18, z: 18 } },
                { type: nodeTypes.PC,          pos: { x: -14, z: 14 } },
                { type: nodeTypes.LAPTOP,      pos: { x: -20, z: 20 } },
                { type: nodeTypes.PRINTER,     pos: { x: -24, z: 18 } },
                { type: nodeTypes.SERVER,      pos: { x: 13,  z: 6  } },
                { type: nodeTypes.PC,          pos: { x: 19,  z: 6  } },
                { type: nodeTypes.PRINTER,     pos: { x: 16,  z: 10 } },
                { type: nodeTypes.WIFI,        pos: { x: 14,  z: 22 } },
                { type: nodeTypes.WIFI,        pos: { x: 22,  z: 22 } },
                { type: nodeTypes.LAPTOP,      pos: { x: 12,  z: 26 } },
                { type: nodeTypes.LAPTOP,      pos: { x: 18,  z: 28 } },
                { type: nodeTypes.LAPTOP,      pos: { x: 24,  z: 26 } }
            ]
        },
        {
            id: 52,
            name: "🏥 Sairaala – Pohjapiirroksen huoneet (VLSM)",
            difficulty: 5,
            phase: "🏫 Realistiset Infrastruktuurit",
            scenario: "SUURSAIRAALA: Pohjapiirroksen mukainen U-kampus jaettu omiin huoneisiinsa! Keskus IT (.0/28), Hallinto (.16/28), Avokonttori (.32/28), Aula (.48/28), Potilashuoneet (.64/26), Hoitajien asema (.128/28), Labra & Röntgen (.144/28), Leikkaussalit (.160/28) ja Intensiiviosasto (.192/27).",
            hint: "TOPOLOGIA: Reititin → Core-kytkin (MDF). Coresta runkokaapelit 3 kytkimeen: Päärakennuksen kytkin, IDF 1 (vasen siipi) ja IDF 2 (oikea siipi). Kunkin huoneen laitteet yhdistyvät suoraan oman alueensa kytkimeen tai WiFiin!",
            teachingTopic: "vlsm",
            network: "10.20.0.0",
            cidr: 24,
            cameraCenter: { x: 0, z: 24 },
            allowedTools: [],
            zones: [
                // PÄÄRAKENNUS (Yläosa)
                { x: 20,  z: 10, w: 16, d: 16, color: 9133302,  name: "Keskus IT (MDF) .0/28",        subnet: "10.20.0.0/28" },
                { x: 0,   z: 6,  w: 24, d: 8,  color: 11032055, name: "Hallinto .16/28",               subnet: "10.20.0.16/28" },
                { x: -20, z: 10, w: 16, d: 16, color: 3900150,  name: "Avokonttori .32/28",            subnet: "10.20.0.32/28" },
                { x: 0,   z: 14, w: 24, d: 8,  color: 2278750,  name: "Aula & Vastaanotto .48/28",     subnet: "10.20.0.48/28" },

                // VASEN SIIPI (Potilasosasto)
                { x: -20, z: 28, w: 16, d: 20, color: 6583435,  name: "Potilashuoneet 1-8 .64/26",     subnet: "10.20.0.64/26" },
                { x: -20, z: 44, w: 16, d: 12, color: 440020,   name: "Hoitajien Asema .128/28",       subnet: "10.20.0.128/28" },

                // OIKEA SIIPI (Kliiniset tilat)
                { x: 20,  z: 24, w: 16, d: 12, color: 16096779, name: "Labra & Röntgen .144/28",       subnet: "10.20.0.144/28" },
                { x: 20,  z: 35, w: 16, d: 10, color: 16728140, name: "Leikkaussalit .160/28",         subnet: "10.20.0.160/28" },
                { x: 20,  z: 45, w: 16, d: 10, color: 15680580, name: "Intensiiviosasto (ICU) .192/27", subnet: "10.20.0.192/27" }
            ],
            requiredNodes: [
                // === PÄÄRAKENNUS: KESKUS IT (MDF) ===
                { type: nodeTypes.CORE_SWITCH, pos: { x: 16, z: 10 } },
                { type: nodeTypes.SERVER,      pos: { x: 24, z: 6  } },
                { type: nodeTypes.SERVER,      pos: { x: 24, z: 10 } },
                { type: nodeTypes.SERVER,      pos: { x: 24, z: 14 } },

                // === PÄÄRAKENNUS: AULA & VASTAANOTTO ===
                { type: nodeTypes.PC,          pos: { x: -4, z: 14 } },
                { type: nodeTypes.PRINTER,     pos: { x: 0,  z: 14 } },
                { type: nodeTypes.PRINTER,     pos: { x: 4,  z: 14 } },

                // === PÄÄRAKENNUS: HALLINTO & LÄÄKÄRIT ===
                { type: nodeTypes.PC,          pos: { x: -8, z: 6  } },
                { type: nodeTypes.PRINTER,     pos: { x: -3, z: 6  } },
                { type: nodeTypes.PC,          pos: { x: 3,  z: 6  } },
                { type: nodeTypes.PC,          pos: { x: 8,  z: 6  } },

                // === PÄÄRAKENNUS: AVOKONTTORI & PÄÄKYTKIN ===
                { type: nodeTypes.SWITCH,      pos: { x: -14, z: 10 } }, // Päärakennuksen kytkin
                { type: nodeTypes.PC,          pos: { x: -24, z: 6  } },
                { type: nodeTypes.PC,          pos: { x: -18, z: 6  } },
                { type: nodeTypes.PC,          pos: { x: -24, z: 10 } },
                { type: nodeTypes.PC,          pos: { x: -18, z: 10 } },
                { type: nodeTypes.PRINTER,     pos: { x: -24, z: 14 } },
                { type: nodeTypes.PRINTER,     pos: { x: -18, z: 14 } },

                // === VASEN SIIPI: POTILASHUONEET 1–8 ===
                { type: nodeTypes.WIFI,        pos: { x: -20, z: 28 } }, // Potilas-WiFi (kattaa huoneet)
                { type: nodeTypes.LAPTOP,      pos: { x: -24, z: 22 } },
                { type: nodeTypes.LAPTOP,      pos: { x: -24, z: 28 } },
                { type: nodeTypes.LAPTOP,      pos: { x: -24, z: 34 } },
                { type: nodeTypes.LAPTOP,      pos: { x: -16, z: 22 } },
                { type: nodeTypes.LAPTOP,      pos: { x: -16, z: 28 } },
                { type: nodeTypes.LAPTOP,      pos: { x: -16, z: 34 } },

                // === VASEN SIIPI: HOITAJIEN ASEMA & IDF 1 ===
                { type: nodeTypes.SWITCH,      pos: { x: -20, z: 40 } }, // IDF 1 -kytkin
                { type: nodeTypes.PC,          pos: { x: -24, z: 45 } },
                { type: nodeTypes.PRINTER,     pos: { x: -20, z: 47 } },
                { type: nodeTypes.VOIP,        pos: { x: -25, z: 48 } },
                { type: nodeTypes.PC,          pos: { x: -16, z: 45 } },

                // === OIKEA SIIPI: LABRA & RÖNTGEN ===
                { type: nodeTypes.PC,          pos: { x: 16, z: 22 } },
                { type: nodeTypes.PC,          pos: { x: 24, z: 22 } },
                { type: nodeTypes.PRINTER,     pos: { x: 20, z: 22 } },
                { type: nodeTypes.PC,          pos: { x: 18, z: 27 } }, // Röntgen kuvantaminen
                { type: nodeTypes.PC,          pos: { x: 24, z: 27 } }, // Röntgen ohjaus

                // === OIKEA SIIPI: LEIKKAUSSALIT & IDF 2 ===
                { type: nodeTypes.SWITCH,      pos: { x: 15, z: 35 } }, // IDF 2 -kytkin
                { type: nodeTypes.PC,          pos: { x: 20, z: 33 } }, // Leikkaussali 1 Kirurgianäyttö
                { type: nodeTypes.PC,          pos: { x: 25, z: 33 } }, // Leikkaussali 1 Potilasmonitori
                { type: nodeTypes.VOIP,        pos: { x: 17, z: 37 } }, // Leikkaussali intercom
                { type: nodeTypes.PC,          pos: { x: 21, z: 37 } }, // Leikkaussali 2 Kirurgianäyttö
                { type: nodeTypes.PC,          pos: { x: 25, z: 37 } }, // Leikkaussali 2 Potilasmonitori

                // === OIKEA SIIPI: INTENSIIVIOSASTO (ICU) ===
                { type: nodeTypes.WIFI,        pos: { x: 15, z: 45 } }, // ICU WiFi
                { type: nodeTypes.PRINTER,     pos: { x: 18, z: 47 } }, // EKG-tulostin
                { type: nodeTypes.PC,          pos: { x: 21, z: 43 } }, // ICU Monitori 1
                { type: nodeTypes.PC,          pos: { x: 25, z: 43 } }, // ICU Monitori 2
                { type: nodeTypes.PC,          pos: { x: 21, z: 47 } }, // ICU Monitori 3
                { type: nodeTypes.PC,          pos: { x: 25, z: 47 } }  // ICU Monitori 4
            ]
        },
        {
            id: 53,
            name: "🏨 Hotelli – Vieraat, Vastaanotto ja Turva",
            difficulty: 5,
            phase: "🏫 Realistiset Infrastruktuurit",
            scenario: "Hotellilla on kolme aluetta: Vierasalue+Allaspiha vasemmalla (.0/25, julkinen WiFi), Vastaanotto ja POS-kassat oikealla ylhäällä (.128/26) ja Turvakeskus+IP-kamerat oikealla alhaalla (.192/26). Rakenna koko hotellin verkko!",
            hint: "TOPOLOGIA: Palomuuri → 3 kytkintä eri alueille. Vieraat: WiFi-AP:t + Läppärit DHCP:lla. Kassat: PC:t (.148+). Kamerat: Server (.193+) ja valvontaPC. Laske peitteet!",
            teachingTopic: "vlsm",
            network: "192.168.50.0",
            cidr: 24,
            zones: [
                { x: -20, z: 16, w: 22, d: 22, color: 1357990,  name: "Vieraat & Allaspiha .0/25",  subnet: "192.168.50.0/25" },
                { x: 16,  z: 4,  w: 14, d: 12, color: 16096779, name: "Vastaanotto & Kassat .128/26", subnet: "192.168.50.128/26" },
                { x: 18,  z: 24, w: 14, d: 12, color: 959977,   name: "Turvakeskus .192/26",         subnet: "192.168.50.192/26" }
            ],
            requiredNodes: [
                { type: nodeTypes.FIREWALL,    pos: { x: 0,   z: 0  } },
                { type: nodeTypes.SWITCH,      pos: { x: -20, z: 8  } },
                { type: nodeTypes.SWITCH,      pos: { x: 16,  z: 2  } },
                { type: nodeTypes.SWITCH,      pos: { x: 18,  z: 20 } },
                { type: nodeTypes.WIFI,        pos: { x: -26, z: 14 } },
                { type: nodeTypes.WIFI,        pos: { x: -14, z: 14 } },
                { type: nodeTypes.WIFI,        pos: { x: -20, z: 24 } },
                { type: nodeTypes.LAPTOP,      pos: { x: -26, z: 20 } },
                { type: nodeTypes.LAPTOP,      pos: { x: -20, z: 22 } },
                { type: nodeTypes.LAPTOP,      pos: { x: -14, z: 20 } },
                { type: nodeTypes.LAPTOP,      pos: { x: -20, z: 28 } },
                { type: nodeTypes.PC,          pos: { x: 13,  z: 4  } },
                { type: nodeTypes.PC,          pos: { x: 19,  z: 4  } },
                { type: nodeTypes.PRINTER,     pos: { x: 16,  z: 8  } },
                { type: nodeTypes.SERVER,      pos: { x: 14,  z: 22 } },
                { type: nodeTypes.PC,          pos: { x: 22,  z: 22 } },
                { type: nodeTypes.PC,          pos: { x: 18,  z: 28 } }
            ]
        },
        {
            id: 54,
            name: "🏭 Tehdas – IT-toimisto, Tuotantolinja ja Serveritila",
            difficulty: 5,
            phase: "🏫 Realistiset Infrastruktuurit",
            scenario: "Tehtaassa on IT-toimisto vasemmalla ylhäällä (.0/24) ja iso OT-tuotantoalue oikealla alhaalla (.1.0/25). Palomuuri eristää ne TÄYSIN toisistaan. Lisäksi erillinen serveritila takana vasemmalla (.1.128/26). Rakenna koko tehdasverkko!",
            hint: "KRIITTINEN ERISTYS: IT-toimisto (.0/24) ← Palomuuri → OT-tuotanto (.1.0/25). Serveritila (.1.128/26) on vain IT-puolella. OT-laitteet eivät saa näkyä IT-verkkoon. Laske kaikki peitteet!",
            teachingTopic: "dmz_vlsm",
            network: "10.50.0.0",
            cidr: 22,
            zones: [
                { x: -18, z: 6,  w: 18, d: 14, color: 3900150,  name: "IT-Toimisto .0/24",         subnet: "10.50.0.0/24" },
                { x: 16,  z: 20, w: 24, d: 20, color: 440020,   name: "OT-Tuotantolinja .1.0/25",  subnet: "10.50.1.0/25" },
                { x: -18, z: 26, w: 16, d: 10, color: 6583435,  name: "Serveritila .1.128/26",     subnet: "10.50.1.128/26" }
            ],
            requiredNodes: [
                { type: nodeTypes.FIREWALL,    pos: { x: 0,   z: 6  } },
                { type: nodeTypes.CORE_SWITCH, pos: { x: -12, z: 4  } },
                { type: nodeTypes.SWITCH,      pos: { x: 16,  z: 14 } },
                { type: nodeTypes.SWITCH,      pos: { x: -18, z: 22 } },
                { type: nodeTypes.SERVER,      pos: { x: -24, z: 4  } },
                { type: nodeTypes.PC,          pos: { x: -18, z: 6  } },
                { type: nodeTypes.PC,          pos: { x: -12, z: 8  } },
                { type: nodeTypes.PC,          pos: { x: -20, z: 10 } },
                { type: nodeTypes.PRINTER,     pos: { x: -14, z: 10 } },
                { type: nodeTypes.PC,          pos: { x: 8,   z: 18 } },
                { type: nodeTypes.PC,          pos: { x: 16,  z: 20 } },
                { type: nodeTypes.PC,          pos: { x: 24,  z: 18 } },
                { type: nodeTypes.PC,          pos: { x: 20,  z: 26 } },
                { type: nodeTypes.PC,          pos: { x: 10,  z: 26 } },
                { type: nodeTypes.SERVER,      pos: { x: -22, z: 26 } },
                { type: nodeTypes.SERVER,      pos: { x: -14, z: 26 } }
            ]
        },
        {
            id: 55,
            name: "🏢 Toimistotorni – 4 osastoa eri siivissä",
            difficulty: 5,
            phase: "🏫 Realistiset Infrastruktuurit",
            scenario: "Toimistotornissa on neljä osastoa eri siivissä: Myynti vasemmalla ylhäällä (.0/26), HR vasemmalla alhaalla (.64/26), IT-osasto oikealla ylhäällä (.128/26) ja Johto oikealla alhaalla (.192/26). Ydinlinkki tornin sydämessä yhdistää kaikki siipet. Rakenna koko tornin verkko!",
            hint: "HUB-AND-SPOKE: Core (tornin sydämessä) → 4 osastokytkintä. Myynti .0/26 (PC .20+), HR .64/26 (PC .84+), IT .128/26 (Server+PC .148+), Johto .192/26 (PC .212+, VoIP). Laske peite jokaiselle!",
            teachingTopic: "vlsm",
            network: "10.10.10.0",
            cidr: 24,
            zones: [
                { x: -18, z: 8,  w: 16, d: 14, color: 3900150,  name: "Myynti .0/26",      subnet: "10.10.10.0/26" },
                { x: -18, z: 26, w: 16, d: 14, color: 2278750,  name: "HR .64/26",          subnet: "10.10.10.64/26" },
                { x: 16,  z: 8,  w: 16, d: 14, color: 16096779, name: "IT-osasto .128/26",  subnet: "10.10.10.128/26" },
                { x: 16,  z: 26, w: 16, d: 14, color: 1357990,  name: "Johto .192/26",      subnet: "10.10.10.192/26" }
            ],
            requiredNodes: [
                { type: nodeTypes.CORE_SWITCH, pos: { x: 0,   z: 16 } },
                { type: nodeTypes.SWITCH,      pos: { x: -18, z: 6  } },
                { type: nodeTypes.SWITCH,      pos: { x: -18, z: 22 } },
                { type: nodeTypes.SWITCH,      pos: { x: 16,  z: 6  } },
                { type: nodeTypes.SWITCH,      pos: { x: 16,  z: 22 } },
                { type: nodeTypes.PC,          pos: { x: -24, z: 8  } },
                { type: nodeTypes.PC,          pos: { x: -18, z: 10 } },
                { type: nodeTypes.PC,          pos: { x: -12, z: 8  } },
                { type: nodeTypes.PRINTER,     pos: { x: -20, z: 14 } },
                { type: nodeTypes.PC,          pos: { x: -24, z: 26 } },
                { type: nodeTypes.PC,          pos: { x: -18, z: 28 } },
                { type: nodeTypes.PC,          pos: { x: -12, z: 26 } },
                { type: nodeTypes.VOIP,        pos: { x: -20, z: 30 } },
                { type: nodeTypes.SERVER,      pos: { x: 10,  z: 8  } },
                { type: nodeTypes.PC,          pos: { x: 16,  z: 10 } },
                { type: nodeTypes.PC,          pos: { x: 22,  z: 8  } },
                { type: nodeTypes.LAPTOP,      pos: { x: 10,  z: 26 } },
                { type: nodeTypes.PC,          pos: { x: 16,  z: 28 } },
                { type: nodeTypes.PC,          pos: { x: 22,  z: 26 } }
            ]
        },
        {
            id: 56,
            name: "🎓 Ammattikoulu – Laboratoriot, Hallinto ja Oppilas-WiFi",
            difficulty: 5,
            phase: "🏫 Realistiset Infrastruktuurit",
            scenario: "Ammattikoulussa on iso IT-laboratorio vasemmalla (.0/26), Hallinto+Opettajat ylhäällä oikealla (.64/26) ja suuri langaton Oppilas-WiFi-alue oikealla alhaalla (.128/25). Palomuuri suojaa hallinto-osaston. Rakenna koko kouluverkko!",
            hint: "TOPOLOGIA: Palomuuri → Core → 3 kytkintä. IT-lab: PC:t (.20+). Hallinto: Server (.1+), PC, Tulostin (.200+). Oppilas-WiFi: 3× AP:ta + läppärit. Laske kaikki peitteet!",
            teachingTopic: "vlsm",
            network: "192.168.20.0",
            cidr: 24,
            zones: [
                { x: -22, z: 18, w: 20, d: 22, color: 6583435,  name: "IT-Laboratorio .0/26",     subnet: "192.168.20.0/26" },
                { x: 14,  z: 6,  w: 16, d: 14, color: 9133302,  name: "Hallinto+Opettajat .64/26", subnet: "192.168.20.64/26" },
                { x: 16,  z: 24, w: 20, d: 18, color: 11032055, name: "Oppilas-WiFi .128/25",     subnet: "192.168.20.128/25" }
            ],
            requiredNodes: [
                { type: nodeTypes.FIREWALL,    pos: { x: 0,   z: 0  } },
                { type: nodeTypes.CORE_SWITCH, pos: { x: 0,   z: 8  } },
                { type: nodeTypes.SWITCH,      pos: { x: -22, z: 10 } },
                { type: nodeTypes.SWITCH,      pos: { x: 14,  z: 4  } },
                { type: nodeTypes.SWITCH,      pos: { x: 16,  z: 18 } },
                { type: nodeTypes.PC,          pos: { x: -28, z: 16 } },
                { type: nodeTypes.PC,          pos: { x: -22, z: 16 } },
                { type: nodeTypes.PC,          pos: { x: -16, z: 16 } },
                { type: nodeTypes.PC,          pos: { x: -28, z: 22 } },
                { type: nodeTypes.PC,          pos: { x: -22, z: 24 } },
                { type: nodeTypes.PC,          pos: { x: -16, z: 22 } },
                { type: nodeTypes.PRINTER,     pos: { x: -22, z: 28 } },
                { type: nodeTypes.SERVER,      pos: { x: 10,  z: 6  } },
                { type: nodeTypes.PC,          pos: { x: 18,  z: 6  } },
                { type: nodeTypes.PRINTER,     pos: { x: 14,  z: 12 } },
                { type: nodeTypes.VOIP,        pos: { x: 10,  z: 12 } },
                { type: nodeTypes.WIFI,        pos: { x: 10,  z: 22 } },
                { type: nodeTypes.WIFI,        pos: { x: 16,  z: 22 } },
                { type: nodeTypes.WIFI,        pos: { x: 22,  z: 22 } },
                { type: nodeTypes.LAPTOP,      pos: { x: 10,  z: 28 } },
                { type: nodeTypes.LAPTOP,      pos: { x: 16,  z: 30 } },
                { type: nodeTypes.LAPTOP,      pos: { x: 22,  z: 28 } }
            ]
        },
        {
            id: 57,
            name: "🛒 Kauppakeskus – Myymälät, POS, Turva ja Vieraat",
            difficulty: 5,
            phase: "🏫 Realistiset Infrastruktuurit",
            scenario: "Kauppakeskuksessa on neljä erillistä verkkoa: iso Myymäläverkko keskellä (.0/25), POS-maksuverkko vasemmalla ylhäällä (.128/26), Turvakameraverkko oikealla ylhäällä (.192/27) ja Vierasverkko sisäänkäynnin edessä alhaalla (.224/27). Palomuuri on pakollinen POS-verkon edessä!",
            hint: "KRIITTINEN: POS-maksuverkko on eristettävä palomuurilla! Myymälät: Server+PC. POS: PC (.148+). Turva: Server+PC (.212+). Vieraat: WiFi-AP:t + Läppärit. Laske kaikki 4 peitettä!",
            teachingTopic: "vlsm",
            network: "10.20.20.0",
            cidr: 24,
            zones: [
                { x: -2,  z: 18, w: 24, d: 20, color: 3900150,  name: "Myymäläverkko .0/25",   subnet: "10.20.20.0/25" },
                { x: -20, z: 5,  w: 14, d: 12, color: 16096779, name: "POS-kassat .128/26",    subnet: "10.20.20.128/26" },
                { x: 18,  z: 5,  w: 12, d: 12, color: 1976635,  name: "Turvakamerat .192/27",  subnet: "10.20.20.192/27" },
                { x: 0,   z: 32, w: 18, d: 10, color: 1357990,  name: "Vieraat-WiFi .224/27",  subnet: "10.20.20.224/27" }
            ],
            requiredNodes: [
                { type: nodeTypes.FIREWALL,    pos: { x: -20, z: 0  } },
                { type: nodeTypes.CORE_SWITCH, pos: { x: 0,   z: 10 } },
                { type: nodeTypes.SWITCH,      pos: { x: -2,  z: 12 } },
                { type: nodeTypes.SWITCH,      pos: { x: -20, z: 4  } },
                { type: nodeTypes.SWITCH,      pos: { x: 18,  z: 4  } },
                { type: nodeTypes.SWITCH,      pos: { x: 0,   z: 28 } },
                { type: nodeTypes.SERVER,      pos: { x: -10, z: 16 } },
                { type: nodeTypes.PC,          pos: { x: -2,  z: 18 } },
                { type: nodeTypes.PC,          pos: { x: 6,   z: 16 } },
                { type: nodeTypes.PRINTER,     pos: { x: -8,  z: 22 } },
                { type: nodeTypes.PC,          pos: { x: -4,  z: 24 } },
                { type: nodeTypes.PC,          pos: { x: 4,   z: 24 } },
                { type: nodeTypes.PC,          pos: { x: -26, z: 4  } },
                { type: nodeTypes.PC,          pos: { x: -20, z: 6  } },
                { type: nodeTypes.PC,          pos: { x: -14, z: 4  } },
                { type: nodeTypes.SERVER,      pos: { x: 14,  z: 4  } },
                { type: nodeTypes.PC,          pos: { x: 22,  z: 4  } },
                { type: nodeTypes.WIFI,        pos: { x: -6,  z: 30 } },
                { type: nodeTypes.WIFI,        pos: { x: 6,   z: 30 } },
                { type: nodeTypes.LAPTOP,      pos: { x: -6,  z: 34 } },
                { type: nodeTypes.LAPTOP,      pos: { x: 0,   z: 36 } },
                { type: nodeTypes.LAPTOP,      pos: { x: 6,   z: 34 } }
            ]
        },
        {
            id: 58,
            name: "🏦 Pankki – Toimisto, ATM-verkko ja DMZ",
            difficulty: 5,
            phase: "🏫 Realistiset Infrastruktuurit",
            scenario: "Pankin infra koostuu kolmesta vyöhykkeestä: iso Toimisto-LAN vasemmalla (.0/25), ATM-verkko oikealla (.128/26, maksuautomaatit) ja DMZ-palvelimet takana keskellä (.192/27, julkiset palvelut). Kaksoispalomuuri suojaa: Internet → FW1 → DMZ → FW2 → sisäverkko!",
            hint: "KAKSITASOINEN SUOJAUS: Cloud → FW1 → DMZ (.192/27, julkiset Serverit). FW1 → FW2 → Core → Toimisto (.0/25, PC:t) + ATM (.128/26, PC .148+). Laske kaikki peitteet!",
            teachingTopic: "dmz_vlsm",
            network: "10.30.0.0",
            cidr: 24,
            zones: [
                { x: -20, z: 18, w: 22, d: 18, color: 3900150,  name: "Toimisto-LAN .0/25",      subnet: "10.30.0.0/25" },
                { x: 18,  z: 14, w: 16, d: 16, color: 2278750,  name: "ATM-verkko .128/26",       subnet: "10.30.0.128/26" },
                { x: -2,  z: 32, w: 16, d: 10, color: 440020,   name: "DMZ-palvelimet .192/27",   subnet: "10.30.0.192/27" }
            ],
            requiredNodes: [
                { type: nodeTypes.CLOUD,       pos: { x: 0,   z: -8 } },
                { type: nodeTypes.FIREWALL,    pos: { x: -6,  z: -2 } },
                { type: nodeTypes.FIREWALL,    pos: { x: 6,   z: -2 } },
                { type: nodeTypes.CORE_SWITCH, pos: { x: -6,  z: 8  } },
                { type: nodeTypes.SWITCH,      pos: { x: -20, z: 12 } },
                { type: nodeTypes.SWITCH,      pos: { x: 18,  z: 8  } },
                { type: nodeTypes.SWITCH,      pos: { x: -2,  z: 28 } },
                { type: nodeTypes.SERVER,      pos: { x: -28, z: 16 } },
                { type: nodeTypes.PC,          pos: { x: -22, z: 18 } },
                { type: nodeTypes.PC,          pos: { x: -16, z: 18 } },
                { type: nodeTypes.PC,          pos: { x: -24, z: 22 } },
                { type: nodeTypes.PC,          pos: { x: -18, z: 24 } },
                { type: nodeTypes.PRINTER,     pos: { x: -22, z: 26 } },
                { type: nodeTypes.VOIP,        pos: { x: -14, z: 22 } },
                { type: nodeTypes.PC,          pos: { x: 12,  z: 14 } },
                { type: nodeTypes.PC,          pos: { x: 18,  z: 14 } },
                { type: nodeTypes.PC,          pos: { x: 24,  z: 14 } },
                { type: nodeTypes.PC,          pos: { x: 18,  z: 20 } },
                { type: nodeTypes.SERVER,      pos: { x: -6,  z: 32 } },
                { type: nodeTypes.SERVER,      pos: { x: 4,   z: 32 } }
            ]
        },
        {
            id: 59,
            name: "✈️ Lentokenttä – 2 Terminaalia, Operaatiot ja Hallinto",
            difficulty: 5,
            phase: "🏫 Realistiset Infrastruktuurit",
            scenario: "Lentokentällä on neljä erillistä aluetta: Terminaali A vasemmalla (.0/24, matkustajat+WiFi), Terminaali B oikealla (.1.0/24, matkustajat+WiFi), Operaatiokeskus ylhäällä (.2.0/24, lähtöselvitys+palvelimet) ja Hallinto alhaalla (.3.0/24, toimistot). Rakenna koko lentokenttäinfra!",
            hint: "TOPOLOGIA: Core-kytkin → 4 aliverkkoa. Terminaalit: WiFi-AP:t + Läppärit. Operaatiot: Server + PC:t. Hallinto: Palomuuri + Server + Tulostin. Laske /24-peite kaikille neljälle alueelle!",
            teachingTopic: "slash22",
            network: "10.60.0.0",
            cidr: 22,
            zones: [
                { x: -22, z: 18, w: 20, d: 20, color: 1096065,  name: "Terminaali A .0/24",      subnet: "10.60.0.0/24" },
                { x: 20,  z: 18, w: 20, d: 20, color: 3900150,  name: "Terminaali B .1.0/24",    subnet: "10.60.1.0/24" },
                { x: 0,   z: 5,  w: 18, d: 12, color: 2278750,  name: "Operaatiokeskus .2.0/24", subnet: "10.60.2.0/24" },
                { x: 0,   z: 32, w: 16, d: 12, color: 9133302,  name: "Hallinto .3.0/24",        subnet: "10.60.3.0/24" }
            ],
            requiredNodes: [
                { type: nodeTypes.CORE_SWITCH, pos: { x: 0,   z: 10 } },
                { type: nodeTypes.SWITCH,      pos: { x: -22, z: 12 } },
                { type: nodeTypes.SWITCH,      pos: { x: 20,  z: 12 } },
                { type: nodeTypes.SWITCH,      pos: { x: 0,   z: 4  } },
                { type: nodeTypes.SWITCH,      pos: { x: 0,   z: 28 } },
                { type: nodeTypes.WIFI,        pos: { x: -28, z: 16 } },
                { type: nodeTypes.WIFI,        pos: { x: -16, z: 16 } },
                { type: nodeTypes.WIFI,        pos: { x: -22, z: 24 } },
                { type: nodeTypes.LAPTOP,      pos: { x: -28, z: 22 } },
                { type: nodeTypes.LAPTOP,      pos: { x: -22, z: 26 } },
                { type: nodeTypes.LAPTOP,      pos: { x: -16, z: 22 } },
                { type: nodeTypes.WIFI,        pos: { x: 14,  z: 16 } },
                { type: nodeTypes.WIFI,        pos: { x: 26,  z: 16 } },
                { type: nodeTypes.WIFI,        pos: { x: 20,  z: 24 } },
                { type: nodeTypes.LAPTOP,      pos: { x: 14,  z: 22 } },
                { type: nodeTypes.LAPTOP,      pos: { x: 20,  z: 26 } },
                { type: nodeTypes.LAPTOP,      pos: { x: 26,  z: 22 } },
                { type: nodeTypes.SERVER,      pos: { x: -6,  z: 4  } },
                { type: nodeTypes.SERVER,      pos: { x: 0,   z: 6  } },
                { type: nodeTypes.PC,          pos: { x: 6,   z: 4  } },
                { type: nodeTypes.PRINTER,     pos: { x: 0,   z: 10 } },
                { type: nodeTypes.FIREWALL,    pos: { x: 0,   z: 24 } },
                { type: nodeTypes.SERVER,      pos: { x: -6,  z: 32 } },
                { type: nodeTypes.PC,          pos: { x: 6,   z: 32 } }
            ]
        },
        {
            id: 60,
            name: "🏙️ MESTARIARKKITEHTI – Koko kaupunginosa",
            difficulty: 5,
            phase: "🏫 Realistiset Infrastruktuurit",
            scenario: "HUIPPUTASO! Rakenna koko kaupunginosakompleksin verkko: Koulu ylhäällä vasemmalla (.16.0/20), Sairaala ylhäällä oikealla (.32.0/20), Pankki alhaalla vasemmalla (.48.0/20) ja Kauppakeskus alhaalla oikealla (.64.0/20). Niiden välissä on katuverkosto. Kaikki yhdistyvät palomuurin kautta internettiin!",
            hint: "MEGA-TOPOLOGIA: Cloud → Palomuuri → 2× Core-kytkin → 4 kaupunginosaa (/20, peite 255.255.240.0). Aseta laitteet oikeisiin /20-aliverkkoihinsa. Jokaisella kaupunginosalla oma kytkin!",
            teachingTopic: "slash20",
            network: "10.0.0.0",
            cidr: 16,
            zones: [
                { x: -22, z: 8,  w: 18, d: 16, color: 3900150,  name: "Koulu .16.0/20",        subnet: "10.0.16.0/20" },
                { x: 20,  z: 8,  w: 18, d: 16, color: 15680580, name: "Sairaala .32.0/20",      subnet: "10.0.32.0/20" },
                { x: -22, z: 30, w: 18, d: 16, color: 440020,   name: "Pankki .48.0/20",        subnet: "10.0.48.0/20" },
                { x: 20,  z: 30, w: 18, d: 16, color: 16096779, name: "Kauppakeskus .64.0/20",  subnet: "10.0.64.0/20" }
            ],
            requiredNodes: [
                { type: nodeTypes.CLOUD,       pos: { x: 0,   z: -8 } },
                { type: nodeTypes.FIREWALL,    pos: { x: 0,   z: -2 } },
                { type: nodeTypes.CORE_SWITCH, pos: { x: -10, z: 6  } },
                { type: nodeTypes.CORE_SWITCH, pos: { x: 10,  z: 6  } },
                { type: nodeTypes.SWITCH,      pos: { x: -22, z: 4  } },
                { type: nodeTypes.SWITCH,      pos: { x: 20,  z: 4  } },
                { type: nodeTypes.SWITCH,      pos: { x: -22, z: 24 } },
                { type: nodeTypes.SWITCH,      pos: { x: 20,  z: 24 } },
                { type: nodeTypes.PC,          pos: { x: -28, z: 8  } },
                { type: nodeTypes.PC,          pos: { x: -22, z: 10 } },
                { type: nodeTypes.SERVER,      pos: { x: -16, z: 8  } },
                { type: nodeTypes.WIFI,        pos: { x: -22, z: 14 } },
                { type: nodeTypes.LAPTOP,      pos: { x: -28, z: 14 } },
                { type: nodeTypes.SERVER,      pos: { x: 14,  z: 8  } },
                { type: nodeTypes.SERVER,      pos: { x: 20,  z: 10 } },
                { type: nodeTypes.PC,          pos: { x: 26,  z: 8  } },
                { type: nodeTypes.PRINTER,     pos: { x: 20,  z: 14 } },
                { type: nodeTypes.FIREWALL,    pos: { x: -22, z: 22 } },
                { type: nodeTypes.SERVER,      pos: { x: -28, z: 30 } },
                { type: nodeTypes.PC,          pos: { x: -22, z: 32 } },
                { type: nodeTypes.PC,          pos: { x: -16, z: 30 } },
                { type: nodeTypes.CORE_SWITCH, pos: { x: 10,  z: 22 } },
                { type: nodeTypes.SERVER,      pos: { x: 14,  z: 30 } },
                { type: nodeTypes.PC,          pos: { x: 20,  z: 32 } },
                { type: nodeTypes.PC,          pos: { x: 26,  z: 30 } },
                { type: nodeTypes.WIFI,        pos: { x: 20,  z: 36 } },
                { type: nodeTypes.LAPTOP,      pos: { x: 26,  z: 36 } },
                { type: nodeTypes.PRINTER,     pos: { x: 14,  z: 36 } }
            ]
        },
        {
            id: 61,
            name: "🛠️ AUTOKORJAAMO – Edistynyt simulaatio",
            difficulty: 5,
            phase: "🏫 Realistiset Infrastruktuurit",
            scenario: "MESTARITASO: Iso Autokorjaamo. Pohjapiirroksen mukainen tarkka layout! Rakenna verkko ja yhdistä ne palomuurin ja core-kytkimen kautta!",
            hint: "Rakenna verkko: Vastaanotto (.0/27), Huoltohalli (.32/27), Diagnostiikka (.64/28), Varaosavarasto (.80/28), Taukohuone (.96/28), Tekniikkatila (.112/28), Pysäköinti (.128/27). (Kameroiden korvikkeena toimivat VOIP-laitteet).",
            teachingTopic: "vlsm",
            network: "192.168.10.0",
            cidr: 24,
            zones: [
                { x: -22, z: -12, w: 16, d: 16, color: 3900150,  name: "Vastaanotto .0/27",         subnet: "192.168.10.0/27" },
                { x: 0,   z: -12, w: 28, d: 16, color: 11032055, name: "Huoltohalli .32/27",        subnet: "192.168.10.32/27" },
                { x: 22,  z: -12, w: 16, d: 16, color: 16096779, name: "Diagnostiikka .64/28",      subnet: "192.168.10.64/28" },
                { x: -35, z: 3,   w: 10, d: 14, color: 6583435,  name: "Pysäköinti .128/27",        subnet: "192.168.10.128/27" },
                { x: 0,   z: 3,   w: 60, d: 14, color: 11032055, name: "Työpisteet .32/27",         subnet: "192.168.10.32/27" },
                { x: 35,  z: 3,   w: 10, d: 14, color: 6583435,  name: "Ulkoalue .128/27",          subnet: "192.168.10.128/27" },
                { x: -16, z: 18,  w: 28, d: 16, color: 9133302,  name: "Varaosavarasto .80/28",     subnet: "192.168.10.80/28" },
                { x: 7,   z: 18,  w: 18, d: 16, color: 2278750,  name: "Taukohuone .96/28",         subnet: "192.168.10.96/28" },
                { x: 23,  z: 18,  w: 14, d: 16, color: 15680580, name: "Tekniikkatila .112/28",     subnet: "192.168.10.112/28" },
                { x: 37,  z: 18,  w: 14, d: 16, color: 6583435,  name: "Autopaikat .128/27",        subnet: "192.168.10.128/27" }
            ],
            requiredNodes: [
                // TEKNIIKKATILA (Ydinverkko)
                { type: nodeTypes.FIREWALL,    pos: { x: 23,  z: 14 } },
                { type: nodeTypes.CORE_SWITCH, pos: { x: 23,  z: 18 } },
                { type: nodeTypes.SERVER,      pos: { x: 20,  z: 22 } },
                { type: nodeTypes.SERVER,      pos: { x: 26,  z: 22 } },

                // VASTAANOTTO
                { type: nodeTypes.SWITCH,      pos: { x: -24, z: -16 } },
                { type: nodeTypes.PC,          pos: { x: -26, z: -12 } },
                { type: nodeTypes.PRINTER,     pos: { x: -20, z: -12 } },
                { type: nodeTypes.WIFI,        pos: { x: -22, z: -8 } },
                
                // DIAGNOSTIIKKA
                { type: nodeTypes.SWITCH,      pos: { x: 22,  z: -16 } },
                { type: nodeTypes.PC,          pos: { x: 18,  z: -12 } },
                { type: nodeTypes.PC,          pos: { x: 26,  z: -12 } },
                { type: nodeTypes.LAPTOP,      pos: { x: 18,  z: -8 } },
                { type: nodeTypes.LAPTOP,      pos: { x: 26,  z: -8 } },

                // HUOLTOHALLI (Nosturit & Työpisteet)
                { type: nodeTypes.SWITCH,      pos: { x: -16, z: 0  } },
                { type: nodeTypes.LAPTOP,      pos: { x: -6,  z: -12} },
                { type: nodeTypes.LAPTOP,      pos: { x: 6,   z: -12} },
                { type: nodeTypes.PC,          pos: { x: -24, z: 4  } },
                { type: nodeTypes.PC,          pos: { x: -16, z: 4  } },
                { type: nodeTypes.PC,          pos: { x: -8,  z: 4  } },

                // VARAOSAVARASTO
                { type: nodeTypes.SWITCH,      pos: { x: -16, z: 14 } },
                { type: nodeTypes.PC,          pos: { x: -22, z: 18 } },
                { type: nodeTypes.PC,          pos: { x: -16, z: 22 } },
                { type: nodeTypes.LAPTOP,      pos: { x: -10, z: 22 } },

                // TAUKOHUONE
                { type: nodeTypes.SWITCH,      pos: { x: 7,   z: 14 } },
                { type: nodeTypes.WIFI,        pos: { x: 4,   z: 16 } },
                { type: nodeTypes.WIFI,        pos: { x: 12,  z: 22 } },
                { type: nodeTypes.LAPTOP,      pos: { x: 2,   z: 20 } },
                { type: nodeTypes.LAPTOP,      pos: { x: 10,  z: 18 } },

                // PYSÄKÖINTI / KAMERAT
                { type: nodeTypes.SWITCH,      pos: { x: 37,  z: 12 } },
                { type: nodeTypes.VOIP,        pos: { x: -35, z: 3  } }, // Vasen kamera
                { type: nodeTypes.VOIP,        pos: { x: 35,  z: 18 } }, // Oikea kamera 1
                { type: nodeTypes.VOIP,        pos: { x: 39,  z: 18 } }  // Oikea kamera 2
            ]
        }
    
    ];

    // Täytetään jokaisen tason aliverkkotiedot valmiiksi
    levels.forEach(level => {
        level.subnetDetails = calculateSubnetDetails(level.network, level.cidr);
    });
}
