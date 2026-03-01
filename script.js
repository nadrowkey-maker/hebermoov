"use strict";

// ==========================================================================
// 1. BASE DE DONNÉES MASSIVE (ENTRAÎNEMENTS & ZONES)
// ==========================================================================
const DB = {
    familles: ["Marche", "Course", "Quadrupedie", "Saut", "Equilibre", "Grimper", "Lever", "Lancer", "Defense", "Natation"],
    routes: {
        "gayeulles-1": { title: "La Ceinture Forestière", type: "Forêt Dense", time: "55 min", kcal: 520, level: "Intermédiaire", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Course d'approche", d: "1km d'échauffement.", c: "Course", xp: 50 }, { t: "Saut de fossé", d: "Franchir 1.5m sans élan.", c: "Saut", xp: 80 }, { t: "Équilibre tronc", d: "Marche sur 5m sans tomber.", c: "Equilibre", xp: 60 }, { t: "Rampé sous branchages", d: "Passer sous un bosquet dense.", c: "Quadrupedie", xp: 90 }] },
        "gayeulles-2": { title: "Le Cœur Sombre", type: "Survie", time: "30 min", kcal: 600, level: "Élite", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Portage lourd", d: "Soulever et porter une souche de 20kg.", c: "Lever", xp: 150 }, { t: "Grimper de chêne", d: "Atteindre la 1ère branche à 2.5m.", c: "Grimper", xp: 200 }, { t: "Course boueuse", d: "Maintenir l'allure sur sol instable.", c: "Course", xp: 130 }] },
        "thabor-1": { title: "L'Enfer des Marches", type: "Parc Urbain", time: "35 min", kcal: 400, level: "Intense", img: "https://images.unsplash.com/photo-1508349937151-22b68b72d5b1?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Montée d'escaliers", d: "Course dans les marches.", c: "Course", xp: 90 }, { t: "Sauts de marches", d: "10 sauts pieds joints.", c: "Saut", xp: 110 }, { t: "Équilibre muret", d: "Marche stricte sur les rebords.", c: "Equilibre", xp: 70 }] },
        "beaulieu-1": { title: "Béton & Verdure", type: "Campus", time: "40 min", kcal: 350, level: "Intermédiaire", img: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Course urbaine", d: "Slalom entre les bâtiments.", c: "Course", xp: 60 }, { t: "Traction sur barre", d: "Trouver une structure et tirer son poids.", c: "Grimper", xp: 120 }] },
        "apigne-1": { title: "Le Tour des Étangs", type: "Bord d'eau", time: "45 min", kcal: 380, level: "Intermédiaire", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Course souple", d: "Footing sur sentier meuble.", c: "Course", xp: 70 }, { t: "Sprint sur sable", d: "Accélération sur sol absorbant.", c: "Course", xp: 100 }] },
        "stmartin-1": { title: "Sentier des Bûcherons", type: "Forêt", time: "50 min", kcal: 450, level: "Intense", img: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Soulevé de roche", d: "Trouver une grosse pierre, soulevé de terre.", c: "Lever", xp: 150 }, { t: "Lancer de roche", d: "Jeté explosif à deux mains.", c: "Lancer", xp: 110 }] }
    }
};

// ==========================================================================
// 2. GESTIONNAIRE D'ÉTAT & MÉMOIRE LOCALE
// ==========================================================================
class Store {
    static KEY = 'hebermoov_ceo_v12_1';
    static data = {
        onboarding: false, xp: 0, level: 1, weight: '', streak: 0, lastActiveDate: null,
        profile: { name: 'Flavien R.', bio: 'Pilote Système' }, avatar: null,
        stats: { parks: 0, kcal: 0, actions: 0, water: 0 },
        skills: { Marche: 5, Course: 8, Quadrupedie: 3, Saut: 6, Equilibre: 4, Grimper: 2, Lever: 4, Lancer: 1, Defense: 0, Natation: 0 },
        inventory: [], history: [], settings: { particles: true, tactical: false }
    };

    static init() {
        try {
            const local = localStorage.getItem(this.KEY);
            if (local) {
                const parsed = JSON.parse(local);
                this.data = { ...this.data, ...parsed };
                this.data.skills = { ...this.data.skills, ...parsed.skills };
                this.data.profile = { ...this.data.profile, ...parsed.profile };
                this.data.stats = { ...this.data.stats, ...parsed.stats };
                this.data.settings = { ...this.data.settings, ...parsed.settings };
            }
            this.computeLevel();
        } catch(e) { console.error("Store Init Error", e); }
    }

    static save() { this.computeLevel(); localStorage.setItem(this.KEY, JSON.stringify(this.data)); }
    static computeLevel() { this.data.level = Math.floor(this.data.xp / 1000) + 1; }
    static reset() { localStorage.removeItem(this.KEY); window.location.reload(); }
}

// ==========================================================================
// 3. DYNAMIC ISLAND (NOTIFICATIONS APPLE)
// ==========================================================================
class DynamicIsland {
    static timer;
    static show(title, msg, icon = 'bolt', isAlert = false) {
        const di = document.getElementById('dynamic-island');
        const iIcon = document.getElementById('di-icon');
        if(!di || !iIcon) return;

        const color = isAlert ? '#ef4444' : (Store.data.settings.tactical ? '#ff003c' : '#ccff00');
        iIcon.style.backgroundColor = color;
        iIcon.innerHTML = `<i class="fas fa-${icon}"></i>`;
        
        App.setText('di-title', title);
        App.setText('di-msg', msg);

        di.style.transform = 'translateY(var(--safe-top)) translateX(-50%)';
        if (navigator.vibrate) navigator.vibrate(isAlert ? [50, 50, 50] : [50]);

        clearTimeout(this.timer);
        this.timer = setTimeout(() => { di.style.transform = 'translateY(-200%) translateX(-50%)'; }, 3500); 
    }
}

// ==========================================================================
// 4. MOTEUR GRAPHIQUE (PARTICULES)
// ==========================================================================
class Graphics {
    static canvas; static ctx; static particles = []; static active = true;

    static init() {
        this.canvas = document.getElementById('particle-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d', { alpha: true });
        window.addEventListener('resize', () => this.resize());
        this.resize();
        if (Store.data.settings.particles) { this.generate(); this.animate(); }
    }

    static resize() { this.canvas.width = window.innerWidth; this.canvas.height = window.innerHeight; }

    static generate() {
        this.particles = [];
        const count = window.innerWidth < 768 ? 25 : 40;
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width, y: Math.random() * this.canvas.height,
                s: Math.random() * 1.5 + 0.5, vx: Math.random() * 0.4 - 0.2, vy: Math.random() * 0.8 + 0.2, a: Math.random() * 0.5 + 0.1
            });
        }
    }

    static animate() {
        if (!this.active || !Store.data.settings.particles) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = Store.data.settings.tactical ? '#ff003c' : '#ccff00';
        for (let p of this.particles) {
            p.y += p.vy; p.x += p.vx + Math.sin(p.y * 0.01) * 0.2;
            if (p.y > this.canvas.height) { p.y = -10; p.x = Math.random() * this.canvas.width; }
            this.ctx.globalAlpha = p.a; this.ctx.beginPath(); this.ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2); this.ctx.fill();
        }
        requestAnimationFrame(() => this.animate());
    }
}

// ==========================================================================
// 5. RADAR MULTIJOUEURS (IA & DISPERSION)
// ==========================================================================
class MapManager {
    static map = null;
    static routeMarkers = [];
    static liveMarkers = [];
    static liveInterval = null;

    static init() {
        if (this.map) return; 
        const container = document.getElementById('map-container');
        if (!container || typeof L === 'undefined') return;

        try {
            this.map = L.map('map-container', { zoomControl: false, attributionControl: false }).setView([48.1172, -1.6777], 12);
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { subdomains: 'abcd', maxZoom: 19 }).addTo(this.map);
            this.drawRoutes();
            // Force l'invalidation pour contrer le bug de taille sur iPad
            setTimeout(() => this.map.invalidateSize(), 500);
            setTimeout(() => this.map.invalidateSize(), 1500);
        } catch(e) { console.log("Leaflet Map Error : Initialisation échouée."); }
    }

    static drawRoutes() {
        if(!this.map) return;
        this.clearMarkers(this.liveMarkers);
        const spots = [
            { id: 'gayeulles', name: 'Les Gayeulles', coords: [48.136, -1.642] },
            { id: 'thabor', name: 'Thabor', coords: [48.114, -1.666] },
            { id: 'beaulieu', name: 'Campus', coords: [48.118, -1.637] },
            { id: 'apigne', name: 'Apigné', coords: [48.098, -1.735] },
            { id: 'stmartin', name: 'St-Martin', coords: [48.127, -1.682] }
        ];

        const c = Store.data.settings.tactical ? '#ff003c' : '#ccff00';
        const pin = L.divIcon({ className: 'custom-pin', html: `<div style="width:16px;height:16px;background:${c};border-radius:50%;box-shadow:0 0 15px ${c}; border: 2px solid #000;"></div>` });

        spots.forEach(s => {
            const m = L.marker(s.coords, {icon: pin}).addTo(this.map);
            m.bindPopup(`<div style="text-align:center;"><b style="color:var(--white);font-size:14px;">${s.name}</b><br><button onclick="App.switchPark('${s.id}', document.querySelector('.tab-explore'))" style="color:${c};margin-top:8px;font-weight:900;text-transform:uppercase;font-size:10px;padding:4px 8px;border:1px solid ${c};border-radius:12px;background:transparent;">Focus</button></div>`);
            this.routeMarkers.push(m);
        });
    }

    static drawLive() {
        if(!this.map) return;
        this.clearMarkers(this.routeMarkers);
        
        // 20 Profils aléatoires dans un rayon étendu
        const centerLat = 48.1172; const centerLng = -1.6777;
        const colors = ['#3b82f6', '#a855f7', '#06b6d4', '#ef4444', '#14b8a6', '#f97316'];
        
        for(let i=0; i<20; i++) {
            const lat = centerLat + (Math.random() - 0.5) * 0.15;
            const lng = centerLng + (Math.random() - 0.5) * 0.15;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const speed = (Math.random() * 0.0003) + 0.0001;
            
            const pin = L.divIcon({ className: 'custom-pin', html: `<div style="width:14px;height:14px;background:${color};border-radius:50%;box-shadow:0 0 15px ${color}; border: 2px solid #000; animation: pulse 2s infinite;"></div>` });
            const m = L.marker([lat, lng], {icon: pin}).addTo(this.map);
            this.liveMarkers.push({ marker: m, data: { coords: [lat, lng], speed: speed }});
        }

        // IA Simulation des mouvements
        this.liveInterval = setInterval(() => {
            this.liveMarkers.forEach(lm => {
                const lat = lm.data.coords[0] + (Math.random() - 0.5) * lm.data.speed;
                const lng = lm.data.coords[1] + (Math.random() - 0.5) * lm.data.speed;
                lm.data.coords = [lat, lng];
                lm.marker.setLatLng([lat, lng]);
            });
        }, 1500);
    }

    static clearMarkers(arr) {
        arr.forEach(m => { if(m.marker) this.map.removeLayer(m.marker); else this.map.removeLayer(m); });
        arr.length = 0;
        if(this.liveInterval) clearInterval(this.liveInterval);
    }
}

// ==========================================================================
// 6. MOTEUR ANALYTIQUE (CHART.JS)
// ==========================================================================
class Charts {
    static radar; static ring; static trendChart;

    static getThemeColor() { return Store.data.settings.tactical ? '#ff003c' : '#ccff00'; }

    static renderRadar() {
        const c = document.getElementById('radar-chart-canvas');
        if (!c || typeof Chart === 'undefined') return;
        if (this.radar) this.radar.destroy();
        const color = this.getThemeColor();
        const data = DB.familles.map(f => Store.data.skills[f] || 0);

        this.radar = new Chart(c, {
            type: 'radar',
            data: { labels: DB.familles, datasets: [{ data: data, backgroundColor: `${color}33`, borderColor: color, borderWidth: 1.5, pointBackgroundColor: '#000', pointBorderColor: color, pointRadius: 2 }] },
            options: { responsive: true, maintainAspectRatio: false, scales: { r: { angleLines: { color: 'rgba(255,255,255,0.05)' }, grid: { color: 'rgba(255,255,255,0.05)', circular: true }, pointLabels: { color: '#a3a3a3', font: { family: 'Inter', size: 9 } }, ticks: { display: false, min: 0 } } }, plugins: { legend: { display: false } } }
        });
    }

    static renderRing() {
        const c = document.getElementById('home-ring-chart');
        if (!c || typeof Chart === 'undefined') return;
        if (this.ring) this.ring.destroy();
        const color = this.getThemeColor();
        const xpLevel = Store.data.xp % 1000;
        this.ring = new Chart(c, {
            type: 'doughnut', data: { datasets: [{ data: [xpLevel, 1000 - xpLevel], backgroundColor: [color, '#1a1a1a'], borderWidth: 0, cutout: '85%' }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { tooltip: { enabled: false }, legend: { display: false } }, animation: { duration: 2000, easing: 'easeOutQuart' } }
        });
    }

    static updateTrendData(range) {
        const c = document.getElementById('trend-chart-canvas');
        if (!c || typeof Chart === 'undefined') return;
        if (this.trendChart) this.trendChart.destroy();
        const color = this.getThemeColor();
        let labels = []; let data = [];
        const todayKcal = Store.data.stats.kcal > 0 ? Store.data.stats.kcal : 200;

        if (range === '7') { labels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Auj']; data = [320, 480, 150, 620, 400, 850, todayKcal]; } 
        else if (range === '30') { labels = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4']; data = [2100, 3400, 1800, 2900 + todayKcal]; } 
        else { labels = ['Janv', 'Févr', 'Mars']; data = [12000, 15000, 5000 + todayKcal]; }

        this.trendChart = new Chart(c, {
            type: 'line',
            data: { labels: labels, datasets: [{ label: 'Kcal', data: data, borderColor: color, backgroundColor: (ctx) => { const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200); gradient.addColorStop(0, `${color}66`); gradient.addColorStop(1, 'rgba(0,0,0,0)'); return gradient; }, borderWidth: 3, pointBackgroundColor: '#111', pointBorderColor: color, pointRadius: 4, fill: true, tension: 0.4 }] },
            options: { responsive: true, maintainAspectRatio: false, scales: { x: { grid: { display: false }, ticks: { color: '#737373', font: { family: 'Inter', size: 10, weight:'bold' } } }, y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { display: false } } }, plugins: { legend: { display: false }, tooltip: { backgroundColor: '#111', titleColor: '#fff', bodyColor: color } }, animation: { duration: 1500, easing: 'easeOutQuart' } }
        });
    }
}

// ==========================================================================
// 7. CONTRÔLEUR PRINCIPAL DU SYSTÈME (LE CERVEAU)
// ==========================================================================
class App {
    static session = { active: false, route: null, step: 0 };
    static onboardSlide = 1;
    static warmupTimer; static cooldownTimer;

    static init() {
        Store.init();
        Graphics.init();
        this.applyTacticalMode(); 
        this.updateDate();
        this.updateStreak();
        this.refreshUI();
        
        setTimeout(() => MapManager.init(), 1000); 

        // DESTRUCTION DU SPLASH SCREEN
        setTimeout(() => {
            const s = document.getElementById('splash-screen');
            if (s) {
                s.style.opacity = '0';
                s.style.pointerEvents = 'none';
                setTimeout(() => { s.classList.add('hidden'); s.style.display = 'none'; }, 700);
            }

            if (!Store.data.onboarding) {
                const obs = document.getElementById('onboarding-overlay');
                if(obs) { obs.classList.remove('hidden'); obs.style.display='flex'; setTimeout(() => obs.classList.remove('opacity-0'), 50); }
            } else {
                DynamicIsland.show('Reconnaissance FaceID', 'Bienvenue CEO.', 'fingerprint');
            }
        }, 1800);
    }

    static setHTML(id, val) { const el = document.getElementById(id); if (el) el.innerHTML = val; }
    static setText(id, val) { const el = document.getElementById(id); if (el) el.innerText = val; }
    static setValue(id, val) { const el = document.getElementById(id); if (el) el.value = val; }

    static updateDate() {
        const el = document.getElementById('date-display');
        if(el) el.innerText = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    }

    static refreshUI() {
        this.setText('header-xp', Store.data.xp);
        this.setText('shop-wallet', Store.data.xp + ' XP');
        this.setHTML('dash-kcal', `${Store.data.stats.kcal} <span class="text-sm text-gray-500 font-semibold">kcal</span>`);
        this.setHTML('dash-actions', `${Store.data.stats.actions} <span class="text-sm text-gray-500 font-semibold">act</span>`);
        this.setHTML('dash-parks', `${Store.data.stats.parks} <span class="text-sm text-gray-500 font-semibold">parcs</span>`);
        this.setText('dash-level', Store.data.level);
        this.setHTML('dash-streak', `${Store.data.streak} <span class="text-sm text-gray-500 font-semibold">Jrs</span>`);
        
        // Hydratation
        this.setHTML('dash-water', `${Store.data.stats.water.toFixed(1)} <span class="text-sm text-gray-400 font-semibold">/ 3 L</span>`);
        const waterBar = document.getElementById('dash-water-bar');
        if(waterBar) waterBar.style.width = `${Math.min((Store.data.stats.water / 3) * 100, 100)}%`;

        // Profil
        this.setText('profile-name', Store.data.profile.name);
        this.setText('profile-bio', Store.data.profile.bio);
        this.setText('profile-lvl', Store.data.level);
        this.setText('stat-parks', Store.data.stats.parks);
        this.setText('stat-kcal', Store.data.stats.kcal);
        this.setText('stat-acts', Store.data.stats.actions);
        this.setValue('set-name', Store.data.profile.name);
        this.setValue('set-bio', Store.data.profile.bio);

        // Avatar
        const avatarSrc = Store.data.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(Store.data.profile.name)}&background=${Store.data.settings.tactical ? 'ff003c' : 'ccff00'}&color=000&font-size=0.4&bold=true`;
        document.querySelectorAll('.avatar-img').forEach(img => { if(img) img.src = avatarSrc; });
        
        this.updateLeaderboardRank();

        const pToggle = document.getElementById('toggle-tactical-ball');
        const bg = document.getElementById('toggle-tactical');
        if (Store.data.settings.tactical) {
            document.body.classList.add('tactical-mode');
            if(pToggle) pToggle.style.transform = 'translateX(24px)';
            if(bg) bg.style.backgroundColor = '#ff003c'; 
        } else {
            document.body.classList.remove('tactical-mode');
            if(pToggle) pToggle.style.transform = 'translateX(0)';
            if(bg) bg.style.backgroundColor = '#404040'; 
        }

        const pRing = document.getElementById('profile-ring');
        if(pRing) {
            const p = (Store.data.xp % 1000) / 1000;
            pRing.style.strokeDashoffset = 351.8 - (p * 351.8);
        }

        this.renderHistory(); this.renderInventory(); Charts.renderRing();
        if(document.getElementById('view-profile').classList.contains('active')) Charts.renderRadar();
    }

    // ALGORITHME DE CLASSEMENT
    static updateLeaderboardRank() {
        const fakeScores = [25800, 21400, 19200, 18800, 14200, 13900, 12400, 9100, 8300];
        let myXp = Store.data.xp;
        let rank = 1;
        for(let score of fakeScores) { if(myXp < score) rank++; }
        
        const rankEl = document.getElementById('leaderboard-my-rank');
        if(rankEl) rankEl.innerText = rank;
        const nameEl = document.getElementById('leaderboard-my-name');
        if(nameEl) nameEl.innerText = Store.data.profile.name + ' (Toi)';
        const xpEl = document.getElementById('leaderboard-my-xp');
        if(xpEl) xpEl.innerText = myXp + ' XP';
    }

    // GESTION DE L'EAU
    static addWater(amount) {
        let current = parseFloat(Store.data.stats.water) || 0;
        current += amount;
        if(current < 0) current = 0;
        if(current > 3.0) current = 3.0;
        
        Store.data.stats.water = current; 
        Store.save(); 
        this.refreshUI();
        
        if (amount > 0) {
            if (current === 3.0) DynamicIsland.show('Hydratation', 'Niveau maximal (3L) atteint. Corps optimal.', 'check');
            else DynamicIsland.show('Hydratation', `+0.5L ajouté. Maintenance vitale.`, 'tint');
        } else {
            DynamicIsland.show('Hydratation', `Correction: -0.5L retiré.`, 'tint', true);
        }
    }

    // DIGITAL TWIN (SVG)
    static highlightBody(part, color, message) {
        const parts = { 'arms': ['dt-arm-l', 'dt-arm-r'], 'core': ['dt-core'], 'legs': ['dt-leg-l', 'dt-leg-r'] };
        // Reset all
        ['dt-core', 'dt-arm-l', 'dt-arm-r', 'dt-leg-l', 'dt-leg-r'].forEach(id => {
            const el = document.getElementById(id);
            if(el) el.setAttribute('fill', '#404040');
        });
        // Fill selected
        if(parts[part]) {
            parts[part].forEach(id => {
                const el = document.getElementById(id);
                if(el) el.setAttribute('fill', color);
            });
        }
        DynamicIsland.show('Analyse IA', message, 'satellite-dish');
    }

    static handleAvatarUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            Store.data.avatar = e.target.result;
            Store.save();
            this.refreshUI();
            DynamicIsland.show('Bio-Identification', 'Holo-portrait synchronisé.', 'camera');
        };
        reader.readAsDataURL(file);
    }

    static updateStreak() {
        const todayStr = new Date().toDateString();
        if (Store.data.lastActiveDate === todayStr) return;
        if (Store.data.lastActiveDate) {
            const diffDays = Math.ceil(Math.abs(new Date(todayStr) - new Date(Store.data.lastActiveDate)) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) Store.data.streak += 1; else Store.data.streak = 1;
        } else { Store.data.streak = 1; }
        Store.data.lastActiveDate = todayStr;
        Store.save();
    }

    static toggleTacticalMode() {
        Store.data.settings.tactical = !Store.data.settings.tactical;
        Store.save();
        this.refreshUI(); 
        DynamicIsland.show('Mode Infrarouge', Store.data.settings.tactical ? 'Engagé.' : 'Désactivé.', 'eye', Store.data.settings.tactical);
    }

    static applyTacticalMode() {
        if (Store.data.settings.tactical) document.body.classList.add('tactical-mode');
        else document.body.classList.remove('tactical-mode');
    }

    static nextOnboarding() {
        if (this.onboardSlide < 3) {
            const current = document.getElementById(`slide-${this.onboardSlide}`);
            if(current) current.style.transform = 'translateX(-100%)';
            this.onboardSlide++;
            const next = document.getElementById(`slide-${this.onboardSlide}`);
            if(next) next.style.transform = 'translateX(0)';

            const dots = document.getElementById('onboarding-dots');
            if(dots) {
                for (let i = 0; i < 3; i++) {
                    dots.children[i].className = i === this.onboardSlide - 1 ? 'w-8 h-2 rounded-full bg-volt transition-all duration-300' : 'w-2 h-2 rounded-full bg-gray-700 transition-all duration-300';
                }
            }
            if (this.onboardSlide === 3) this.setText('btn-next-onboarding', "DÉMARRER LA MISSION");
        } else {
            Store.data.onboarding = true;
            Store.save();
            const obs = document.getElementById('onboarding-overlay');
            if(obs) {
                obs.style.opacity = '0';
                setTimeout(() => { obs.style.display = 'none'; obs.classList.add('hidden'); }, 500);
                DynamicIsland.show('Système prêt', 'Accès accordé CEO.', 'check');
            }
        }
    }

    static nav(targetId, btn = null) {
        document.querySelectorAll('.spa-view').forEach(v => {
            v.classList.remove('active'); v.classList.add('opacity-0');
            setTimeout(() => { if (!v.classList.contains('active')) v.style.display = 'none'; }, 300);
        });

        const t = document.getElementById(targetId);
        if(t) { t.style.display = 'flex'; setTimeout(() => { t.classList.add('active'); t.classList.remove('opacity-0'); }, 20); }

        if (btn && btn.classList.contains('nav-item')) {
            document.querySelectorAll('.nav-item').forEach(b => {
                b.classList.remove('text-white'); b.classList.add('text-gray-500');
                const ind = b.querySelector('.indicator');
                if(ind) { ind.classList.remove('bg-white'); ind.classList.add('opacity-0'); }
            });
            btn.classList.remove('text-gray-500'); btn.classList.add('text-white');
            const btnInd = btn.querySelector('.indicator');
            if(btnInd) { btnInd.classList.remove('opacity-0'); btnInd.classList.add('bg-white'); }
        }

        if (targetId === 'view-profile') setTimeout(() => Charts.renderRadar(), 300);
        if (targetId === 'view-explore' && MapManager.map) setTimeout(() => MapManager.map.invalidateSize(), 300);
        const mc = document.getElementById('main-content');
        if(mc) mc.scrollTo({ top: 0, behavior: 'smooth' });
    }

    static toggleMapMode(mode) {
        const bg = document.getElementById('map-toggle-bg');
        const bRoute = document.getElementById('btn-map-routes');
        const bLive = document.getElementById('btn-map-live');
        if(mode === 'routes') {
            if(bg) bg.style.transform = 'translateX(0)';
            bRoute.classList.replace('text-gray-500', 'text-black'); bLive.classList.replace('text-black', 'text-gray-500');
            MapManager.drawRoutes(); DynamicIsland.show('Cartographie', 'Bases Hébertistes affichées.', 'map');
        } else {
            if(bg) bg.style.transform = 'translateX(100%)';
            bLive.classList.replace('text-gray-500', 'text-black'); bRoute.classList.replace('text-black', 'text-gray-500');
            MapManager.drawLive(); DynamicIsland.show('Radar Surnaturel', 'Interception globale active.', 'radar', true);
        }
    }

    static switchPark(id, btn) {
        document.querySelectorAll('.tab-explore').forEach(b => {
            b.classList.remove('active', 'bg-white', 'text-black', 'shadow-md', 'border-transparent');
            b.classList.add('bg-gray-900', 'text-gray-400');
        });
        btn.classList.remove('bg-gray-900', 'text-gray-400');
        btn.classList.add('active', 'bg-white', 'text-black', 'shadow-md', 'border-transparent');
        document.querySelectorAll('.park-container').forEach(p => p.classList.add('hidden'));
        const pTarget = document.getElementById(`park-${id}`);
        if(pTarget) pTarget.classList.remove('hidden');
    }

    static switchSocialTab(id) {
        ['feed', 'leaderboard'].forEach(t => {
            const btn = document.getElementById(`btn-soc-${t}`);
            const content = document.getElementById(`social-content-${t}`);
            if(btn) { btn.classList.replace('bg-white', 'bg-transparent'); btn.classList.replace('text-black', 'text-gray-500'); }
            if(content) { content.classList.remove('block'); content.classList.add('hidden'); }
        });
        const actBtn = document.getElementById(`btn-soc-${id}`);
        const actContent = document.getElementById(`social-content-${id}`);
        if(actBtn) { actBtn.classList.replace('bg-transparent', 'bg-white'); actBtn.classList.replace('text-gray-500', 'text-black'); }
        if(actContent) { actContent.classList.remove('hidden'); actContent.classList.add('block'); actContent.style.animation = 'none'; actContent.offsetHeight; actContent.style.animation = null; }
    }

    static showModal(id) {
        document.querySelectorAll('.modal-sheet').forEach(s => s.classList.remove('active-sheet'));
        const target = document.getElementById(id);
        if(target) target.classList.add('active-sheet');
        const ml = document.getElementById('modal-layer');
        const bd = document.getElementById('modal-backdrop');
        if(bd) bd.classList.remove('pointer-events-none', 'opacity-0');
        if(ml) ml.classList.add('modal-open');

        if(id === 'analytics-sheet') this.updateTrendChart('7'); 
    }

    static closeAllModals() {
        const ml = document.getElementById('modal-layer');
        const bd = document.getElementById('modal-backdrop');
        if(ml) ml.classList.remove('modal-open');
        if(bd) bd.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => document.querySelectorAll('.modal-sheet').forEach(s => s.classList.remove('active-sheet')), 500);
    }

    static updateTrendChart(range) {
        ['7d', '30d', 'all'].forEach(r => {
            const btn = document.getElementById(`tab-${r}`);
            if(btn) { btn.classList.remove('bg-white', 'text-black', 'shadow-md'); btn.classList.add('text-gray-400'); }
        });
        const activeBtn = document.getElementById(`tab-${range === '7' ? '7d' : range === '30' ? '30d' : 'all'}`);
        if(activeBtn) { activeBtn.classList.remove('text-gray-400'); activeBtn.classList.add('bg-white', 'text-black', 'shadow-md'); }
        
        const loader = document.getElementById('chart-loader'); const canvas = document.getElementById('trend-chart-canvas');
        if(loader) loader.classList.remove('hidden'); if(canvas) canvas.classList.add('opacity-0');
        setTimeout(() => { Charts.updateTrendData(range); if(loader) loader.classList.add('hidden'); if(canvas) canvas.classList.remove('opacity-0'); }, 800); 
    }

    static saveSettings() {
        const nEl = document.getElementById('set-name'); const bEl = document.getElementById('set-bio');
        if (nEl && nEl.value) Store.data.profile.name = nEl.value;
        if (bEl && bEl.value) Store.data.profile.bio = bEl.value;
        Store.save(); this.refreshUI(); this.closeAllModals();
        DynamicIsland.show('Système', 'Paramètres CEO mis à jour.', 'cog');
    }

    static resetData() { if(confirm("DANGER : Purger l'entiereté du serveur local ? Action irréversible.")) Store.reset(); }

    static buyItem(name, price) {
        if (Store.data.inventory.includes(name)) return DynamicIsland.show('Boutique', 'Matériel déjà possédé.', 'box');
        if (Store.data.xp >= price) {
            Store.data.xp -= price; Store.data.inventory.push(name); Store.save(); this.refreshUI();
            DynamicIsland.show('Achat Validé', `${name} sécurisé dans l'inventaire.`, 'shopping-cart');
        } else {
            DynamicIsland.show('Fonds Insuffisants', `Il manque ${price - Store.data.xp} XP.`, 'lock', true);
        }
    }

    static renderHistory() {
        const c = document.getElementById('history-container'); 
        if (!c) return;
        if (Store.data.history.length === 0) { c.innerHTML = '<p class="text-gray-500 text-sm text-center mt-10">Aucune expédition terminée.</p>'; return; }
        let html = ''; const rev = [...Store.data.history].reverse();
        rev.forEach(h => { html += `<div class="bg-gray-800 rounded-[24px] p-5 flex justify-between items-center border border-white-5 shadow-sm"><div class="flex flex-col"><span class="font-bold text-base text-white">${h.n}</span><span class="text-xs text-gray-400 mt-1">${h.d}</span></div><div class="flex flex-col text-right"><span class="font-black text-volt text-lg">${h.x}</span><span class="text-xs font-bold text-gray-500 mt-1">${h.k} kcal</span></div></div>`; });
        c.innerHTML = html;
    }

    static renderInventory() {
        const c = document.getElementById('inventory-container');
        if (!c) return;
        if (Store.data.inventory.length === 0) { c.innerHTML = '<p class="text-gray-500 text-sm text-center mt-10">Sac tactique vide. Visitez la boutique.</p>'; return; }
        c.innerHTML = Store.data.inventory.map(i => `<div class="bg-gray-800 rounded-[24px] p-5 flex items-center gap-5 border border-white-5 shadow-sm"><div class="w-12 h-12 rounded-full bg-volt/10 text-volt flex items-center justify-center text-lg"><i class="fas fa-check"></i></div><span class="font-bold text-base text-white">${i}</span></div>`).join('');
    }

    // ==========================================================================
    // 8. MOTEUR D'ENTRAÎNEMENT & TRACKING IA (CAMERA)
    // ==========================================================================
    static openRoutePreview(id) {
        const r = DB.routes[id];
        if (!r) {
            DynamicIsland.show('Erreur Géospatiale', 'Coordonnées de la zone introuvables.', 'times', true);
            return;
        }
        this.session.route = r;
        const img = document.getElementById('sheet-img'); if(img) img.src = r.img;
        this.setText('sheet-type', r.type); this.setText('sheet-title', r.title);
        const chk = document.getElementById('sheet-checkpoints');
        if(chk) chk.innerHTML = r.steps.map((s, i) => `<div class="relative"><div class="absolute -left-[25px] top-1 w-3 h-3 bg-gray-900 border-2 border-volt rounded-full shadow-volt"></div><strong class="text-base font-bold text-white block">${i + 1}. ${s.t}</strong><span class="text-sm text-gray-400">${s.d}</span></div>`).join('');
        this.showModal('route-preview-sheet');
    }

    static triggerWarmup() {
        this.closeAllModals(); 
        const wOverlay = document.getElementById('warmup-overlay');
        if(!wOverlay) return this.startSession();
        wOverlay.classList.remove('hidden'); wOverlay.style.display = 'flex';
        setTimeout(() => wOverlay.classList.remove('opacity-0'), 50);
        
        let timeLeft = 30;
        const ring = document.getElementById('warmup-ring');
        if(ring) { ring.style.transition = 'none'; ring.style.strokeDashoffset = '0'; setTimeout(() => { ring.style.transition = 'stroke-dashoffset 30s linear'; ring.style.strokeDashoffset = '339.29'; }, 50); }
        this.setText('warmup-timer', timeLeft);
        this.warmupTimer = setInterval(() => { 
            timeLeft--; this.setText('warmup-timer', timeLeft); 
            if (timeLeft <= 0) this.skipWarmup(); 
        }, 1000);
    }

    static skipWarmup() {
        clearInterval(this.warmupTimer);
        const wOverlay = document.getElementById('warmup-overlay');
        if(wOverlay) { wOverlay.classList.add('opacity-0'); setTimeout(() => { wOverlay.classList.add('hidden'); wOverlay.style.display = 'none'; this.startSession(); }, 500); }
        else this.startSession();
    }

    static startSession() {
        this.session.active = true; this.session.step = 0;
        const s = document.getElementById('session-active-modal');
        if(s) { s.classList.remove('hidden'); setTimeout(() => s.style.transform = 'translateY(0)', 10); }
        this.updateSessionUI();
        DynamicIsland.show('Système Embarqué', 'Enregistrement biomécanique en cours.', 'video');
    }

    static updateSessionUI() {
        if(!this.session.route) return;
        const st = this.session.route.steps[this.session.step];
        const tot = this.session.route.steps.length;
        this.setText('session-step-current', this.session.step + 1); this.setText('session-step-total', tot);
        this.setText('session-step-title', st.t); this.setText('session-step-desc', st.d);
        const prog = document.getElementById('session-progress');
        if(prog) prog.style.width = `${((this.session.step) / tot) * 100}%`;
    }

    static handleNativePhoto(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const overlay = document.getElementById('photo-analysis-overlay');
        const text = document.getElementById('analysis-text');
        const img = document.getElementById('analysis-preview-img');
        
        const reader = new FileReader();
        reader.onload = (e) => {
            if(img) img.src = e.target.result;
            if(overlay) { overlay.classList.remove('hidden'); overlay.style.display = 'flex'; setTimeout(() => overlay.classList.remove('opacity-0'), 10); }
            if(text) { text.innerText = "Tracking 3D en cours..."; text.classList.remove('text-volt', 'text-red-500'); text.classList.add('text-white'); }
            
            setTimeout(() => { if(text) text.innerText = "Calcul des vecteurs de force..."; }, 1200);
            setTimeout(() => { if(text) { text.innerText = "Effort Validé par l'IA."; text.classList.replace('text-white', Store.data.settings.tactical ? 'text-red-500' : 'text-volt'); } }, 2400);
            
            setTimeout(() => {
                if(overlay) overlay.classList.add('opacity-0');
                setTimeout(() => {
                    if(overlay) { overlay.classList.add('hidden'); overlay.style.display = 'none'; }
                    this.nextStep(); 
                    event.target.value = ''; 
                }, 500);
            }, 3200);
        };
        reader.readAsDataURL(file);
    }

    static nextStep() {
        const r = this.session.route; const st = r.steps[this.session.step];
        
        const finalXp = Math.floor(st.xp * 1.2); 
        Store.data.xp += finalXp; 
        Store.data.stats.actions += 1;
        if (Store.data.skills[st.c] !== undefined) Store.data.skills[st.c] += 1;

        if (this.session.step < r.steps.length - 1) {
            this.session.step++; this.updateSessionUI();
            DynamicIsland.show('Validation IA', `+${finalXp} XP ajoutés.`, 'check');
        } else {
            this.concludeSession();
        }
    }

    static concludeSession() {
        const sModal = document.getElementById('session-active-modal');
        if(sModal) { sModal.style.transform = 'translateY(100%)'; setTimeout(() => sModal.classList.add('hidden'), 500); }
        const cOverlay = document.getElementById('cooldown-overlay');
        if(!cOverlay) return this.finishCooldown();

        cOverlay.classList.remove('hidden'); cOverlay.style.display = 'flex';
        setTimeout(() => cOverlay.classList.remove('opacity-0'), 50);

        let timeLeft = 30; const ring = document.getElementById('cooldown-ring');
        if(ring) { ring.style.transition = 'none'; ring.style.strokeDashoffset = '0'; setTimeout(() => { ring.style.transition = 'stroke-dashoffset 30s linear'; ring.style.strokeDashoffset = '339.29'; }, 50); }
        this.setText('cooldown-timer', timeLeft);

        this.cooldownTimer = setInterval(() => { timeLeft--; this.setText('cooldown-timer', timeLeft); if (timeLeft <= 0) this.finishCooldown(); }, 1000);
    }

    static finishCooldown() {
        clearInterval(this.cooldownTimer);
        const cOverlay = document.getElementById('cooldown-overlay');
        if(cOverlay) {
            cOverlay.classList.add('opacity-0');
            setTimeout(() => {
                cOverlay.classList.add('hidden'); cOverlay.style.display = 'none';
                
                const r = this.session.route;
                Store.data.stats.parks += 1; 
                Store.data.stats.kcal += r.kcal; 
                Store.data.xp += 100; // Bonus final
                
                Store.data.history.push({ d: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }), n: r.title, x: "Victoire", k: r.kcal });
                Store.save(); this.session.active = false; this.refreshUI();
                this.nav('view-profile', document.getElementById('nav-profile'));
                DynamicIsland.show('Mission Terminée', 'Gains enregistrés. Données synchronisées.', 'flag-checkered');
            }, 500);
        }
    }

    static abortSession() {
        const sModal = document.getElementById('session-active-modal');
        if(sModal) { sModal.style.transform = 'translateY(100%)'; setTimeout(() => sModal.classList.add('hidden'), 500); }
        this.session.active = false;
        DynamicIsland.show('Abandon Tactique', 'Repli confirmé. Aucun gain.', 'times', true);
    }
}

// LANCEMENT IMMEDIAT
App.init();
