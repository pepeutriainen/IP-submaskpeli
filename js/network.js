// --- IP Matematiikka ja aliverkkolaskenta ---
// Professional IT Studio -standardi (RFC 791, RFC 1519, RFC 1918, RFC 3021, RFC 3927, RFC 4632)

/**
 * Muuntaa IPv4-merkkijonon 32-bittiseksi etumerkittömäksi kokonaisluvuksi.
 * @param {string} ip esim. "192.168.1.1"
 * @returns {number}
 */
function ip2long(ip) {
    if (!ip || typeof ip !== 'string') return 0;
    return ip.trim().split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

/**
 * Muuntaa 32-bittisen kokonaisluvun IPv4-merkkijonoksi.
 * @param {number} long
 * @returns {string} esim. "192.168.1.1"
 */
function long2ip(long) {
    return [
        (long >>> 24),
        (long >> 16 & 255),
        (long >> 8 & 255),
        (long & 255)
    ].join('.');
}

/**
 * Palauttaa 32-bittisen binaaripeitteen CIDR-prefiksin perusteella.
 * @param {number} cidr 0..32
 * @returns {number}
 */
function cidrToMaskLong(cidr) {
    const c = Math.max(0, Math.min(32, parseInt(cidr, 10) || 0));
    if (c === 0) return 0;
    if (c === 32) return 0xFFFFFFFF >>> 0;
    return (~((1 << (32 - c)) - 1)) >>> 0;
}

/**
 * Laskee aliverkon tiedot annetun verkko-IP:n ja CIDR-prefiksin perusteella.
 * Tukee täysin standardeja /8 – /32, mukaan lukien RFC 3021 (/31 point-to-point) ja /32 (host route).
 * @param {string} networkIp  esim. "10.0.0.0"
 * @param {number} cidr       esim. 24
 * @returns {Object} { network, broadcast, firstHost, lastHost, mask, wildcardMask, cidr, totalIps, usableHosts, magicNumber }
 */
function calculateSubnetDetails(networkIp, cidr) {
    const cidrNum = Math.max(0, Math.min(32, parseInt(cidr, 10) || 0));
    const netLong = ip2long(networkIp);
    const mask = cidrToMaskLong(cidrNum);
    const networkAddress = (netLong & mask) >>> 0;
    const wildcardLong = (~mask) >>> 0;
    const broadcastAddress = (networkAddress | wildcardLong) >>> 0;
    const totalIps = Math.pow(2, 32 - cidrNum);

    let usableHosts = 0;
    let firstHost = '';
    let lastHost = '';

    if (cidrNum === 32) {
        // RFC 4632 / Host route: 1 isäntä (ei erillistä broadcastia)
        usableHosts = 1;
        firstHost = long2ip(networkAddress);
        lastHost = long2ip(networkAddress);
    } else if (cidrNum === 31) {
        // RFC 3021: Point-to-Point linkki (2 isäntää, molemmat käyttökelpoisia)
        usableHosts = 2;
        firstHost = long2ip(networkAddress);
        lastHost = long2ip(broadcastAddress);
    } else if (totalIps > 2) {
        usableHosts = totalIps - 2;
        firstHost = long2ip(networkAddress + 1);
        lastHost = long2ip(broadcastAddress - 1);
    } else {
        usableHosts = 0;
        firstHost = long2ip(networkAddress);
        lastHost = long2ip(broadcastAddress);
    }

    return {
        network: long2ip(networkAddress),
        broadcast: long2ip(broadcastAddress),
        firstHost: firstHost,
        lastHost: lastHost,
        mask: long2ip(mask),
        wildcardMask: long2ip(wildcardLong),
        cidr: cidrNum,
        totalIps: totalIps,
        usableHosts: usableHosts,
        magicNumber: getMagicNumber(cidrNum)
    };
}

/**
 * Tarkistaa kuuluuko annettu IP osoite tiettyyn aliverkkoon.
 * @param {string} ip         Tarkistettava IP-osoite
 * @param {string} networkIp  Aliverkon osoite
 * @param {number} cidr       CIDR-prefiksi
 * @returns {boolean}
 */
function isIpInSubnet(ip, networkIp, cidr) {
    const mask = cidrToMaskLong(cidr);
    return ((ip2long(ip) & mask) >>> 0) === ((ip2long(networkIp) & mask) >>> 0);
}

/**
 * Muuntaa IP-osoitteen 32-bittiseksi binaarimerkkijonoksi pistein eroteltuna (4x8 bittiä).
 * @param {string} ip esim. "192.168.1.1"
 * @returns {string} esim. "11000000.10101000.00000001.00000001"
 */
function ipToBinary(ip) {
    const octets = (ip || '0.0.0.0').trim().split('.');
    return octets.map(oct => {
        const num = parseInt(oct, 10) || 0;
        return num.toString(2).padStart(8, '0');
    }).join('.');
}

/**
 * Muuntaa 32-bittisen binaarimerkkijonon (pisteillä tai ilman) takaisin desimaali-IP:ksi.
 * @param {string} binStr esim. "11000000.10101000.00000001.00000001"
 * @returns {string} esim. "192.168.1.1"
 */
function binaryToIp(binStr) {
    if (!binStr) return '0.0.0.0';
    const clean = binStr.replace(/[^01]/g, '');
    if (clean.length !== 32) return '0.0.0.0';
    const octets = [];
    for (let i = 0; i < 32; i += 8) {
        octets.push(parseInt(clean.slice(i, i + 8), 2));
    }
    return octets.join('.');
}

/**
 * Laskee aliverkon Magic Number -lohkokoon ja muuttuvan oktetin.
 * Kaava: 256 - muuttuvan_oktetin_peitearvo = lohkokoko.
 * @param {number} cidr 0..32
 * @returns {{ octet: number, blockSize: number, maskByte: number, formula: string }}
 */
function getMagicNumber(cidr) {
    const c = Math.max(0, Math.min(32, parseInt(cidr, 10) || 0));
    let octet = 4;
    let bitsInOctet = 0;

    if (c <= 8) {
        octet = 1;
        bitsInOctet = c;
    } else if (c <= 16) {
        octet = 2;
        bitsInOctet = c - 8;
    } else if (c <= 24) {
        octet = 3;
        bitsInOctet = c - 16;
    } else {
        octet = 4;
        bitsInOctet = c - 24;
    }

    const maskByte = bitsInOctet === 0 ? 0 : (~((1 << (8 - bitsInOctet)) - 1) & 255);
    const blockSize = Math.pow(2, 8 - bitsInOctet);

    return {
        octet: octet,
        bitsInOctet: bitsInOctet,
        maskByte: maskByte,
        blockSize: blockSize,
        formula: `256 − ${maskByte} = ${blockSize}`
    };
}

/**
 * Laskee Wildcard Maskin (käänteisen peitteen) annetusta aliverkon peitteestä.
 * Käytetään Cisco ACL -palomuurisäännöissä ja OSPF:ssä.
 * @param {string|number} maskOrCidr esim. "255.255.255.224" tai 27
 * @returns {string} esim. "0.0.0.31"
 */
function getWildcardMask(maskOrCidr) {
    let maskLong = 0;
    if (typeof maskOrCidr === 'number' || (typeof maskOrCidr === 'string' && !maskOrCidr.includes('.'))) {
        maskLong = cidrToMaskLong(maskOrCidr);
    } else {
        maskLong = ip2long(maskOrCidr);
    }
    return long2ip((~maskLong) >>> 0);
}

/**
 * Tunnistaa historiallisen luokallisen luokan (Classful Addressing: A, B, C, D, E).
 * @param {string} ip
 * @returns {{ classType: string, defaultCidr: number, description: string }}
 */
function getIpClass(ip) {
    const firstOctet = parseInt((ip || '0').split('.')[0], 10) || 0;
    if (firstOctet >= 1 && firstOctet <= 126) {
        return { classType: 'A', defaultCidr: 8, description: 'Luokka A (Suuret organisaatiot /8, 16.7M isäntää)' };
    } else if (firstOctet === 127) {
        return { classType: 'Loopback', defaultCidr: 8, description: 'Loopback (Oma laite / paikallinen TCP/IP-pino)' };
    } else if (firstOctet >= 128 && firstOctet <= 191) {
        return { classType: 'B', defaultCidr: 16, description: 'Luokka B (Keskisuuret organisaatiot /16, 65 534 isäntää)' };
    } else if (firstOctet >= 192 && firstOctet <= 223) {
        return { classType: 'C', defaultCidr: 24, description: 'Luokka C (Pienverkot /24, 254 isäntää)' };
    } else if (firstOctet >= 224 && firstOctet <= 239) {
        return { classType: 'D', defaultCidr: 4, description: 'Luokka D (Multicast / Ryhmälähetys, esim. OSPF 224.0.0.5)' };
    } else {
        return { classType: 'E', defaultCidr: 4, description: 'Luokka E (Kokeellinen / Tutkimuskäyttöön varattu)' };
    }
}

/**
 * Tunnistaa erikoisosoitteet (RFC 1918 yksityiset, APIPA, Loopback, Broadcast, CGNAT jne.).
 * @param {string} ip
 * @returns {{ isSpecial: boolean, type: string, rfc: string, description: string }}
 */
function getSpecialIpType(ip) {
    const long = ip2long(ip);
    const octets = (ip || '').split('.').map(o => parseInt(o, 10) || 0);
    const first = octets[0];
    const second = octets[1];

    if (ip === '255.255.255.255') {
        return { isSpecial: true, type: 'Limited Broadcast', rfc: 'RFC 919', description: 'Rajoitettu yleislähetys paikalliseen lähiverkkoon (ei reitity)' };
    }
    if (ip === '0.0.0.0') {
        return { isSpecial: true, type: 'Default Route / Any', rfc: 'RFC 1122', description: 'Kaikki osoitteet / oletusreitti tai DHCP-aloitustila' };
    }
    if (first === 127) {
        return { isSpecial: true, type: 'Loopback', rfc: 'RFC 1122', description: 'Paikallinen silmukkaosoite (localhost)' };
    }
    if (first === 169 && second === 254) {
        return { isSpecial: true, type: 'APIPA (Link-Local)', rfc: 'RFC 3927', description: 'Automaattinen linkkiosoite (DHCP-palvelinta ei löytynyt!)' };
    }
    if (first === 10) {
        return { isSpecial: true, type: 'Private (RFC 1918 Class A)', rfc: 'RFC 1918', description: 'Yksityinen osoite (10.0.0.0/8, vaatii NAT-muunnoksen Internettiin)' };
    }
    if (first === 172 && second >= 16 && second <= 31) {
        return { isSpecial: true, type: 'Private (RFC 1918 Class B)', rfc: 'RFC 1918', description: 'Yksityinen osoite (172.16.0.0/12, vaatii NAT-muunnoksen Internettiin)' };
    }
    if (first === 192 && second === 168) {
        return { isSpecial: true, type: 'Private (RFC 1918 Class C)', rfc: 'RFC 1918', description: 'Yksityinen kotiverkko-/yritysosoite (192.168.0.0/16, vaatii NAT:in)' };
    }
    if (first === 100 && second >= 64 && second <= 127) {
        return { isSpecial: true, type: 'CGNAT (Carrier-Grade NAT)', rfc: 'RFC 6598', description: 'Operaattoritason NAT-osoiteavaruus (100.64.0.0/10)' };
    }
    if (first >= 224 && first <= 239) {
        return { isSpecial: true, type: 'Multicast', rfc: 'RFC 5771', description: 'Ryhmälähetysosoite' };
    }

    return { isSpecial: false, type: 'Public IPv4', rfc: 'RFC 791', description: 'Julkisesti reititettävä globaali Internet-osoite' };
}

/**
 * Tuottaa visuaalisen Bitwise AND -hajotelman syötetylle IP-osoitteelle ja aliverkon peitteelle.
 * @param {string} ip esim. "192.168.1.130"
 * @param {number|string} cidrOrMask esim. 25 tai "255.255.255.128"
 * @returns {Object}
 */
function getBitwiseAndBreakdown(ip, cidrOrMask) {
    const cidr = typeof cidrOrMask === 'number' || !cidrOrMask.includes('.')
        ? parseInt(cidrOrMask, 10)
        : maskToCidr(cidrOrMask);

    const mask = cidrToMaskLong(cidr);
    const maskIp = long2ip(mask);
    const ipLong = ip2long(ip);
    const netLong = (ipLong & mask) >>> 0;
    const netIp = long2ip(netLong);
    const details = calculateSubnetDetails(netIp, cidr);

    const ipBin = ipToBinary(ip);
    const maskBin = ipToBinary(maskIp);
    const netBin = ipToBinary(netIp);

    const isNetwork = ip === details.network;
    const isBroadcast = ip === details.broadcast && cidr < 31;
    const isUsable = (cidr >= 31)
        ? (ipLong >= ip2long(details.firstHost) && ipLong <= ip2long(details.lastHost))
        : (!isNetwork && !isBroadcast && ipLong >= ip2long(details.firstHost) && ipLong <= ip2long(details.lastHost));

    return {
        ip: ip,
        mask: maskIp,
        cidr: cidr,
        network: netIp,
        broadcast: details.broadcast,
        ipBinary: ipBin,
        maskBinary: maskBin,
        networkBinary: netBin,
        cidrCutIndex: cidr, // bittien määrä vasemmalta
        isNetworkAddress: isNetwork,
        isBroadcastAddress: isBroadcast,
        isUsableHost: isUsable,
        details: details
    };
}

/**
 * Apufunktio: Muuntaa desimaalisen maskin CIDR-numeroksi.
 * @param {string} mask esim. "255.255.255.192"
 * @returns {number} esim. 26
 */
function maskToCidr(mask) {
    const long = ip2long(mask);
    let count = 0;
    for (let i = 31; i >= 0; i--) {
        if ((long & (1 << i)) !== 0) count++;
        else break;
    }
    return count;
}

// Ympäristöintegraatio (Node.js & Selaintuki)
if (typeof window !== 'undefined') {
    window.ip2long = ip2long;
    window.long2ip = long2ip;
    window.cidrToMaskLong = cidrToMaskLong;
    window.calculateSubnetDetails = calculateSubnetDetails;
    window.isIpInSubnet = isIpInSubnet;
    window.ipToBinary = ipToBinary;
    window.binaryToIp = binaryToIp;
    window.getMagicNumber = getMagicNumber;
    window.getWildcardMask = getWildcardMask;
    window.getIpClass = getIpClass;
    window.getSpecialIpType = getSpecialIpType;
    window.getBitwiseAndBreakdown = getBitwiseAndBreakdown;
    window.maskToCidr = maskToCidr;
}
if (typeof globalThis !== 'undefined') {
    globalThis.calculateSubnetDetails = calculateSubnetDetails;
    globalThis.ip2long = ip2long;
    globalThis.long2ip = long2ip;
    globalThis.isIpInSubnet = isIpInSubnet;
    globalThis.ipToBinary = ipToBinary;
    globalThis.binaryToIp = binaryToIp;
    globalThis.getMagicNumber = getMagicNumber;
    globalThis.getWildcardMask = getWildcardMask;
    globalThis.getIpClass = getIpClass;
    globalThis.getSpecialIpType = getSpecialIpType;
    globalThis.getBitwiseAndBreakdown = getBitwiseAndBreakdown;
    globalThis.maskToCidr = maskToCidr;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ip2long,
        long2ip,
        cidrToMaskLong,
        calculateSubnetDetails,
        isIpInSubnet,
        ipToBinary,
        binaryToIp,
        getMagicNumber,
        getWildcardMask,
        getIpClass,
        getSpecialIpType,
        getBitwiseAndBreakdown,
        maskToCidr
    };
}
