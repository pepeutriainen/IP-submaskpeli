// --- IP Matematiikka ja aliverkkolaskenta ---

/**
 * Muuntaa IPv4-merkkijonon 32-bittiseksi etumerkittömäksi kokonaisluvuksi.
 * @param {string} ip esim. "192.168.1.1"
 * @returns {number}
 */
function ip2long(ip) {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
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
 * Laskee aliverkon tiedot annetun verkko-IP:n ja CIDR-prefiksin perusteella.
 * Toimii kaikilla prefikseillä /8 – /30.
 * @param {string} networkIp  esim. "10.0.0.0"
 * @param {number} cidr       esim. 24
 * @returns {Object} { network, broadcast, firstHost, lastHost, mask, cidr, totalIps, usableHosts }
 */
function calculateSubnetDetails(networkIp, cidr) {
    const cidrNum = parseInt(cidr, 10);
    const netLong = ip2long(networkIp);
    const mask = cidrNum === 0 ? 0 : (~((1 << (32 - cidrNum)) - 1)) >>> 0;
    const networkAddress = netLong & mask;
    const broadcastAddress = networkAddress | (~mask >>> 0);
    const totalIps = Math.pow(2, 32 - cidrNum);
    const usableHosts = totalIps > 2 ? totalIps - 2 : 0;

    return {
        network: long2ip(networkAddress),
        broadcast: long2ip(broadcastAddress),
        firstHost: long2ip(networkAddress + 1),
        lastHost: long2ip(broadcastAddress - 1),
        mask: long2ip(mask),
        cidr: cidrNum,
        totalIps: totalIps,
        usableHosts: usableHosts
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
    const mask = (~((1 << (32 - cidr)) - 1)) >>> 0;
    return (ip2long(ip) & mask) === (ip2long(networkIp) & mask);
}
