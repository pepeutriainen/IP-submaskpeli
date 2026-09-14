// --- Saavutusjärjestelmä & Pokaalikaappi (Achievements) ---

const ACHIEVEMENTS_DATA = [
    {
        id: 'first_cable',
        title: 'Ensimmäinen Linkki',
        desc: 'Kytke ensimmäinen toimiva verkkokaapeli kahden laitteen välille.',
        icon: '🔌',
        reward: '50 XP'
    },
    {
        id: 'subnet_ninja',
        title: 'Subnet Ninja',
        desc: 'Läpäise taso käyttämättä apulaskinta tai Cheat Sheet -muistilappua.',
        icon: '⚡',
        reward: '200 XP'
    },
    {
        id: 'ping_master',
        title: 'Ping Mestari',
        desc: 'Suorita onnistunut ICMP Ping -testi terminaalista tai diagnostiikkatyökalulla.',
        icon: '📡',
        reward: '100 XP'
    },
    {
        id: 'traceroute_master',
        title: 'Reitityksen Jäljittäjä',
        desc: 'Jäljitä verkkoreitti päätelaitteelta aina Internet-pilveen asti (traceroute).',
        icon: '🗺️',
        reward: '150 XP'
    },
    {
        id: 'speed_demon',
        title: 'Salamannopea Verkottaja',
        desc: 'Konfiguroi ja läpäise taso alle 60 sekunnissa.',
        icon: '⏱️',
        reward: '250 XP'
    },
    {
        id: 'core_architect',
        title: 'Konesaliarkkitehti',
        desc: 'Kytke 10G-kuitukaapelilla Ydinlinkki (Core Switch) ja palvelin.',
        icon: '🏢',
        reward: '300 XP'
    },
    {
        id: 'ccna_hero',
        title: 'CCNA Pro Master',
        desc: 'Läpäise vähintään 10 eri tasoa täydellisinä ilman apuvälineitä.',
        icon: '🎓',
        reward: '500 XP'
    },
    {
        id: 'network_legend',
        title: 'Verkkoarkkitehtuurin Legenda',
        desc: 'Läpäise pelin kaikki 61 tasoa!',
        icon: '👑',
        reward: '1000 XP'
    }
];

class AchievementSystem {
    constructor() {
        this.unlocked = JSON.parse(localStorage.getItem('subnetArchitect_achievements') || '[]');
        this.levelStartTime = Date.now();
    }

    has(id) {
        return this.unlocked.includes(id);
    }

    unlock(id) {
        if (this.has(id)) return;
        const ach = ACHIEVEMENTS_DATA.find(a => a.id === id);
        if (!ach) return;

        this.unlocked.push(id);
        localStorage.setItem('subnetArchitect_achievements', JSON.stringify(this.unlocked));

        this.showToast(ach);
        if (typeof audio !== 'undefined') {
            audio.playVictory();
        }
    }

    showToast(ach) {
        const toastEl = document.getElementById('achievement-toast');
        const iconEl = document.getElementById('achievement-toast-icon');
        const titleEl = document.getElementById('achievement-toast-title');
        const descEl = document.getElementById('achievement-toast-desc');

        if (!toastEl) return;

        if (iconEl) iconEl.innerText = ach.icon;
        if (titleEl) titleEl.innerText = ach.title;
        if (descEl) descEl.innerText = ach.desc;

        toastEl.classList.remove('hidden');
        // Pieni trigger animaatiolle
        setTimeout(() => {
            toastEl.classList.remove('translate-y-[-120%]', 'opacity-0');
            toastEl.classList.add('translate-y-0', 'opacity-100');
        }, 10);

        setTimeout(() => {
            toastEl.classList.remove('translate-y-0', 'opacity-100');
            toastEl.classList.add('translate-y-[-120%]', 'opacity-0');
            setTimeout(() => toastEl.classList.add('hidden'), 400);
        }, 4000);
    }

    openModal() {
        const modal = document.getElementById('achievements-modal');
        const grid = document.getElementById('achievements-grid');
        const countEl = document.getElementById('achievements-unlocked-count');
        if (!modal || !grid) return;

        if (countEl) {
            countEl.innerText = `${this.unlocked.length} / ${ACHIEVEMENTS_DATA.length}`;
        }

        grid.innerHTML = ACHIEVEMENTS_DATA.map(a => {
            const isUnlocked = this.has(a.id);
            return `
                <div class="p-4 rounded-2xl border ${isUnlocked ? 'bg-slate-850/95 border-amber-500/50 shadow-lg shadow-amber-950/30' : 'bg-slate-900/60 border-slate-800 opacity-60'} flex items-start gap-3.5 transition-all">
                    <div class="w-12 h-12 rounded-xl ${isUnlocked ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-500 border border-slate-700'} flex items-center justify-center text-2xl flex-shrink-0">
                        ${a.icon}
                    </div>
                    <div class="min-w-0 flex-1">
                        <div class="flex items-center justify-between gap-2">
                            <h4 class="text-sm font-black ${isUnlocked ? 'text-white' : 'text-slate-400'} truncate">${a.title}</h4>
                            <span class="text-[11px] font-mono font-bold ${isUnlocked ? 'text-amber-400' : 'text-slate-500'}">${a.reward}</span>
                        </div>
                        <p class="text-xs text-slate-400 mt-1 leading-relaxed">${a.desc}</p>
                        <div class="mt-2.5">
                            <span class="text-[10px] font-mono uppercase tracking-wider font-extrabold px-2 py-0.5 rounded ${isUnlocked ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-500'}">
                                ${isUnlocked ? '✅ Suoritettu' : '🔒 Lukittu'}
                            </span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        modal.classList.remove('hidden');
        if (typeof audio !== 'undefined') audio.playUiClick();
    }

    closeModal() {
        const modal = document.getElementById('achievements-modal');
        if (modal) {
            modal.classList.add('hidden');
            if (typeof audio !== 'undefined') audio.playUiClick();
        }
    }
}

// Globaali instanssi
const achievements = new AchievementSystem();
function unlockAchievement(id) {
    achievements.unlock(id);
}
function openAchievementsModal() {
    achievements.openModal();
}
function closeAchievementsModal() {
    achievements.closeModal();
}

if (typeof window !== 'undefined') {
    window.achievements = achievements;
    window.unlockAchievement = unlockAchievement;
    window.openAchievementsModal = openAchievementsModal;
    window.closeAchievementsModal = closeAchievementsModal;
}
