"use strict";

// ==========================================================================
// 1. BASE DE DONNÉES MASSIVE (65 ATELIERS - 11 PARCOURS - 5 FORÊTS)
// ==========================================================================
const DB = {
    familles: ["Marche", "Course", "Quadrupedie", "Saut", "Equilibre", "Grimper", "Lever", "Lancer", "Defense", "Natation"],
    routes: {
        // --- LES GAYEULLES ---
        "gayeulles-1": { 
            title: "La Ceinture Forestière", type: "Forêt Dense", time: "55 min", kcal: 520, level: "Intermédiaire", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800", 
            steps: [
                { t: "Course d'approche", d: "1km d'échauffement.", c: "Course", xp: 50 }, 
                { t: "Saut de fossé", d: "Franchir 1.5m sans élan.", c: "Saut", xp: 80 }, 
                { t: "Équilibre tronc", d: "Marche sur 5m sans tomber.", c: "Equilibre", xp: 60 },
                { t: "Rampé sous branchages", d: "Passer sous un bosquet dense.", c: "Quadrupedie", xp: 90 },
                { t: "Lancer de précision", d: "Viser un arbre à 10m avec une pomme de pin.", c: "Lancer", xp: 40 },
                { t: "Grimper de talus", d: "Ascension avec appuis mains/pieds.", c: "Grimper", xp: 110 },
                { t: "Marche rapide", d: "Retour au calme actif sur 500m.", c: "Marche", xp: 40 },
                { t: "Sprint final", d: "100m pleine puissance.", c: "Course", xp: 100 }
            ] 
        },
        "gayeulles-2": { 
            title: "Le Cœur Sombre", type: "Survie", time: "30 min", kcal: 600, level: "Élite", img: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=800", 
            steps: [
                { t: "Portage lourd", d: "Soulever et porter une souche de 20kg sur 100m.", c: "Lever", xp: 150 }, 
                { t: "Grimper de chêne", d: "Atteindre la 1ère branche à 2.5m.", c: "Grimper", xp: 200 },
                { t: "Saut en contrebas", d: "Réception contrôlée depuis 1m de haut.", c: "Saut", xp: 120 },
                { t: "Esquive de branches", d: "Passage rapide en forêt très dense.", c: "Defense", xp: 80 },
                { t: "Course boueuse", d: "Maintenir l'allure sur sol instable.", c: "Course", xp: 130 }
            ] 
        },
        "gayeulles-3": { 
            title: "Initiation Douce", type: "Clairière", time: "20 min", kcal: 150, level: "Débutant", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800", 
            steps: [
                { t: "Marche active", d: "Activation articulaire.", c: "Marche", xp: 30 },
                { t: "Quadrupédie sur herbe", d: "10m de déplacement à 4 pattes.", c: "Quadrupedie", xp: 50 },
                { t: "Équilibre au sol", d: "Tenir sur une jambe 30s.", c: "Equilibre", xp: 40 },
                { t: "Lancer léger", d: "Lancer de cailloux.", c: "Lancer", xp: 30 }
            ] 
        },
        // --- THABOR ---
        "thabor-1": { 
            title: "L'Enfer des Marches", type: "Parc Urbain", time: "35 min", kcal: 400, level: "Intense", img: "https://images.unsplash.com/photo-1508349937151-22b68b72d5b1?q=80&w=800", 
            steps: [
                { t: "Montée d'escaliers", d: "Course dans les marches de l'enfer.", c: "Course", xp: 90 },
                { t: "Sauts de marches", d: "10 sauts pieds joints.", c: "Saut", xp: 110 },
                { t: "Équilibre muret", d: "Marche stricte sur les rebords.", c: "Equilibre", xp: 70 },
                { t: "Descente quadrupédique", d: "Descendre les marches à 4 pattes face au vide.", c: "Quadrupedie", xp: 130 },
                { t: "Sprint plat", d: "Accélération dans l'allée centrale.", c: "Course", xp: 80 },
                { t: "Franchissement grille", d: "Passer par-dessus une structure basse.", c: "Grimper", xp: 100 }
            ] 
        },
        "thabor-2": { 
            title: "Équilibre Floral", type: "Jardins", time: "25 min", kcal: 200, level: "Débutant", img: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=800", 
            steps: [
                { t: "Marche sur bordure", d: "Travail proprioceptif fin.", c: "Equilibre", xp: 60 },
                { t: "Saut de parterre", d: "Franchir sans abîmer les fleurs.", c: "Saut", xp: 50 },
                { t: "Quadrupédie lente", d: "Déplacement félin.", c: "Quadrupedie", xp: 60 },
                { t: "Lancer de précision", d: "Viser la corbeille avec des feuilles.", c: "Lancer", xp: 30 },
                { t: "Marche de récupération", d: "Respiration nasale stricte.", c: "Marche", xp: 40 }
            ] 
        },
        // --- CAMPUS BEAULIEU ---
        "beaulieu-1": { 
            title: "Béton & Verdure", type: "Campus", time: "40 min", kcal: 350, level: "Intermédiaire", img: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=800", 
            steps: [
                { t: "Course urbaine", d: "Slalom entre les bâtiments.", c: "Course", xp: 60 },
                { t: "Franchissement de banc", d: "Saut d'obstacle urbain direct.", c: "Saut", xp: 80 },
                { t: "Équilibre sur tube", d: "Marcher sur une structure tubulaire.", c: "Equilibre", xp: 100 },
                { t: "Rampé sous barrière", d: "Passage au sol technique.", c: "Quadrupedie", xp: 90 },
                { t: "Traction sur barre", d: "Trouver une structure et tirer son poids.", c: "Grimper", xp: 120 },
                { t: "Lancer lourd", d: "Lancer de sac par-dessus un muret.", c: "Lancer", xp: 70 },
                { t: "Sprint Campus", d: "Sprint final vers le Diapason.", c: "Course", xp: 90 }
            ] 
        },
        "beaulieu-2": { 
            title: "Sprint Universitaire", type: "Piste", time: "20 min", kcal: 250, level: "Intense", img: "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?q=80&w=800", 
            steps: [
                { t: "Départ explosif", d: "Mise en action immédiate.", c: "Course", xp: 70 },
                { t: "Saut de haies nature", d: "Franchir 3 obstacles bas en rythme.", c: "Saut", xp: 110 },
                { t: "Vitesse Max", d: "Sprint pur sur 100m.", c: "Course", xp: 100 },
                { t: "Marche militaire", d: "Décélération contrôlée.", c: "Marche", xp: 40 }
            ] 
        },
        // --- ÉTANGS D'APIGNÉ ---
        "apigne-1": { 
            title: "Le Tour des Étangs", type: "Bord d'eau", time: "45 min", kcal: 380, level: "Intermédiaire", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800", 
            steps: [
                { t: "Course souple", d: "Footing sur sentier meuble.", c: "Course", xp: 70 },
                { t: "Saut au-dessus de racines", d: "Lecture de terrain rapide.", c: "Saut", xp: 90 },
                { t: "Lancer dans l'eau", d: "Faire des ricochets (technique de bras).", c: "Lancer", xp: 40 },
                { t: "Équilibre sur berge", d: "Marcher au ras de l'eau sans tomber.", c: "Equilibre", xp: 80 },
                { t: "Immersion pieds", d: "Traverser un gué ou un bord immergé.", c: "Natation", xp: 60 },
                { t: "Sprint sur sable", d: "Accélération sur sol absorbant.", c: "Course", xp: 100 }
            ] 
        },
        "apigne-2": { 
            title: "Bain de Boue", type: "Marais", time: "60 min", kcal: 550, level: "Intense", img: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=800", 
            steps: [
                { t: "Course engagée", d: "Sol boueux, glissant.", c: "Course", xp: 90 },
                { t: "Rampé sous rondins", d: "Traversée en quadrupédie basse.", c: "Quadrupedie", xp: 140 },
                { t: "Portage de bûche humide", d: "Charge morte de 15kg glissante.", c: "Lever", xp: 160 },
                { t: "Saut de mare", d: "Franchir l'eau d'un seul bond.", c: "Saut", xp: 110 },
                { t: "Grimper de talus d'argile", d: "Ancrage des doigts dans la terre.", c: "Grimper", xp: 150 },
                { t: "Équilibre précaire", d: "Traverser un pont de bois mouillé.", c: "Equilibre", xp: 120 },
                { t: "Esquive d'obstacles", d: "Passages sous et sur.", c: "Defense", xp: 80 },
                { t: "Extraction", d: "Marche de survie hors de la zone.", c: "Marche", xp: 50 }
            ] 
        },
        // --- ST MARTIN ---
        "stmartin-1": { 
            title: "Sentier des Bûcherons", type: "Forêt", time: "50 min", kcal: 450, level: "Intense", img: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=800", 
            steps: [
                { t: "Marche d'approche lourde", d: "Pas appuyés en dénivelé.", c: "Marche", xp: 60 },
                { t: "Soulevé de roche", d: "Trouver une grosse pierre, soulevé de terre.", c: "Lever", xp: 150 },
                { t: "Lancer de roche", d: "Jeté explosif à deux mains.", c: "Lancer", xp: 110 },
                { t: "Course fractionnée", d: "30s sprint / 30s trot.", c: "Course", xp: 100 },
                { t: "Grimper aux branches", d: "Tractions strictes sur une branche haute.", c: "Grimper", xp: 130 },
                { t: "Saut de tronc", d: "Passer une barrière naturelle.", c: "Saut", xp: 90 },
                { t: "Quadrupédie forestière", d: "Ramper dans la mousse.", c: "Quadrupedie", xp: 100 }
            ] 
        },
        "stmartin-2": { 
            title: "Défense Naturelle", type: "Tactique", time: "30 min", kcal: 300, level: "Intermédiaire", img: "https://images.unsplash.com/photo-1444124818704-4d89a495bbae?q=80&w=800", 
            steps: [
                { t: "Posture de garde", d: "Travail d'appuis ancrés au sol.", c: "Defense", xp: 80 },
                { t: "Esquive latérale", d: "Changements de direction brusques entre les arbres.", c: "Defense", xp: 120 },
                { t: "Lancer défensif", d: "Lancer de cailloux ciblés.", c: "Lancer", xp: 70 },
                { t: "Saut de fuite", d: "Franchir un fossé en urgence.", c: "Saut", xp: 100 },
                { t: "Sprint d'éloignement", d: "Vitesse max sur 50m.", c: "Course", xp: 110 }
            ] 
        }
    }
};

// ==========================================================================
// 2. GESTIONNAIRE D'ÉTAT (LOCAL STORAGE)
// ==========================================================================
class Store {
    static KEY = 'hebermoov_v8_data'; // Nouvelle clé pour forcer le refresh de la nouvelle BDD
    static data = {
        onboarding: false,
        xp: 0,
        level: 1,
        weight: '',
        profile: { name: 'Flavien R.', bio: 'L2 Maths • CEO' },
        stats: { parks: 0, kcal: 0, actions: 0, water: 0 },
        skills: { Marche: 5, Course: 6, Quadrupedie: 3, Saut: 7, Equilibre: 4, Grimper: 2, Lever: 5, Lancer: 2, Defense: 0, Natation: 0 },
        inventory: [],
        history: [],
        settings: { particles: true }
    };

    static init() {
        const local = localStorage.getItem(this.KEY);
        if (local) {
            const parsed = JSON.parse(local);
            this.data = { ...this.data, ...parsed };
            this.data.skills = { ...this.data.skills, ...parsed.skills };
            this.data.profile = { ...this.data.profile, ...parsed.profile };
            this.data.stats = { ...this.data.stats, ...parsed.stats };
        }
        this.computeLevel();
    }

    static save() {
        this.computeLevel();
        localStorage.setItem(this.KEY, JSON.stringify(this.data));
    }

    static computeLevel() {
        this.data.level = Math.floor(this.data.xp / 1000) + 1;
    }

    static reset() {
        localStorage.removeItem(this.KEY);
        window.location.reload();
    }
}

// ==========================================================================
// 3. MOTEUR GRAPHIQUE (PARTICULES)
// ==========================================================================
class Graphics {
    static canvas;
    static ctx;
    static particles = [];
    static active = true;

    static init() {
        this.canvas = document.getElementById('particle-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d', { alpha: true });
        window.addEventListener('resize', () => this.resize());
        this.resize();
        if (Store.data.settings.particles) {
            this.generate();
            this.animate();
        }
    }

    static resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    static generate() {
        this.particles = [];
        const count = window.innerWidth < 768 ? 30 : 50;
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                s: Math.random() * 1.5 + 0.5,
                vx: Math.random() * 0.5 - 0.25,
                vy: Math.random() * 1 + 0.2,
                a: Math.random() * 0.5 + 0.1
            });
        }
    }

    static animate() {
        if (!this.active || !Store.data.settings.particles) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#ccff00';

        for (let p of this.particles) {
            p.y += p.vy;
            p.x += p.vx + Math.sin(p.y * 0.01) * 0.2;
            if (p.y > this.canvas.height) { p.y = -10; p.x = Math.random() * this.canvas.width; }
            this.ctx.globalAlpha = p.a;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
            this.ctx.fill();
        }
        requestAnimationFrame(() => this.animate());
    }
}

// ==========================================================================
// 4. GRAPHIQUES (CHART.JS)
// ==========================================================================
class Charts {
    static radar;
    static ring;

    static renderRadar() {
        const c = document.getElementById('radar-chart-canvas');
        if (!c || typeof Chart === 'undefined') return;
        if (this.radar) this.radar.destroy();

        const data = DB.familles.map(f => Store.data.skills[f] || 0);
        this.radar = new Chart(c, {
            type: 'radar',
            data: {
                labels: DB.familles,
                datasets: [{
                    data: data,
                    backgroundColor: 'rgba(204, 255, 0, 0.2)',
                    borderColor: '#ccff00',
                    borderWidth: 1.5,
                    pointBackgroundColor: '#000',
                    pointBorderColor: '#ccff00',
                    pointRadius: 2
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: { r: { angleLines: { color: 'rgba(255,255,255,0.05)' }, grid: { color: 'rgba(255,255,255,0.05)', circular: true }, pointLabels: { color: '#a3a3a3', font: { family: 'Inter', size: 9 } }, ticks: { display: false, min: 0 } } },
                plugins: { legend: { display: false } }
            }
        });
    }

    static renderRing() {
        const c = document.getElementById('home-ring-chart');
        if (!c || typeof Chart === 'undefined') return;
        if (this.ring) this.ring.destroy();

        const xpLevel = Store.data.xp % 1000;
        this.ring = new Chart(c, {
            type: 'doughnut',
            data: { datasets: [{ data: [xpLevel, 1000 - xpLevel], backgroundColor: ['#ccff00', '#1a1a1a'], borderWidth: 0, cutout: '85%' }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { tooltip: { enabled: false }, legend: { display: false } }, animation: { duration: 2000, easing: 'easeOutQuart' } }
        });
    }
}

// ==========================================================================
// 5. CONTRÔLEUR PRINCIPAL DE L'APPLICATION
// ==========================================================================
class App {
    static session = { active: false, route: null, step: 0 };
    static onboardSlide = 1;
    static warmupTimer;
    static cooldownTimer;

    static init() {
        Store.init();
        Graphics.init();
        this.updateDate();
        this.refreshUI();

        // Gestion du Splash Screen
        setTimeout(() => {
            const s = document.getElementById('splash-screen');
            if (s) {
                s.classList.add('opacity-0');
                setTimeout(() => s.classList.add('hidden'), 500);
            }

            if (!Store.data.onboarding) {
                const obs = document.getElementById('onboarding-overlay');
                if(obs) {
                    obs.classList.remove('hidden');
                    setTimeout(() => obs.classList.remove('opacity-0'), 50);
                }
            }
        }, 1500);
    }

    static updateDate() {
        const d = new Date();
        const el = document.getElementById('date-display');
        if(el) el.innerText = d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    }

    // FONCTIONS SÉCURISÉES (Anti-Crash null reference)
    static setHTML(id, htmlContent) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = htmlContent;
    }
    static setText(id, textContent) {
        const el = document.getElementById(id);
        if (el) el.innerText = textContent;
    }
    static setValue(id, val) {
        const el = document.getElementById(id);
        if (el) el.value = val;
    }

    static refreshUI() {
        this.setText('header-xp', Store.data.xp);
        this.setText('shop-wallet', Store.data.xp + ' XP');
        this.setHTML('dash-kcal', `${Store.data.stats.kcal} <span class="text-sm text-gray-500 font-semibold">kcal</span>`);
        this.setHTML('dash-actions', `${Store.data.stats.actions} <span class="text-sm text-gray-500 font-semibold">act</span>`);
        this.setHTML('dash-parks', `${Store.data.stats.parks} <span class="text-sm text-gray-500 font-semibold">parcs</span>`);
        this.setText('dash-level', Store.data.level);

        this.setText('profile-name', Store.data.profile.name);
        this.setText('profile-bio', Store.data.profile.bio);
        this.setText('profile-lvl', Store.data.level);
        this.setText('stat-parks', Store.data.stats.parks);
        this.setText('stat-kcal', Store.data.stats.kcal);
        this.setText('stat-acts', Store.data.stats.actions);
        this.setValue('input-weight', Store.data.weight);
        this.setText('leaderboard-my-xp', Store.data.xp + ' XP');
        this.setText('water-counter', `${Store.data.stats.water} / 3 Litres`);

        const pRing = document.getElementById('profile-ring');
        if(pRing) {
            const p = (Store.data.xp % 1000) / 1000;
            pRing.style.strokeDashoffset = 351.8 - (p * 351.8);
        }

        this.renderHistory();
        this.renderInventory();
        Charts.renderRing();
    }

    // --- NAVIGATION ---
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
            if (this.onboardSlide === 3) this.setText('btn-next-onboarding', "DÉMARRER");
        } else {
            Store.data.onboarding = true;
            Store.save();
            const obs = document.getElementById('onboarding-overlay');
            if(obs) {
                obs.classList.add('opacity-0');
                setTimeout(() => obs.classList.add('hidden'), 500);
            }
        }
    }

    static nav(targetId, btn = null) {
        document.querySelectorAll('.spa-view').forEach(v => {
            v.classList.remove('active');
            v.classList.add('opacity-0');
            setTimeout(() => { if (!v.classList.contains('active')) v.style.display = 'none'; }, 300);
        });

        const t = document.getElementById(targetId);
        if(t) {
            t.style.display = 'flex';
            setTimeout(() => { t.classList.add('active'); t.classList.remove('opacity-0'); }, 20);
        }

        if (btn && btn.classList.contains('nav-item')) {
            document.querySelectorAll('.nav-item').forEach(b => {
                b.classList.remove('text-white');
                b.classList.add('text-gray-500');
                const ind = b.querySelector('.indicator');
                if(ind) {
                    ind.classList.remove('bg-white');
                    ind.classList.add('opacity-0', 'bg-volt');
                }
            });
            btn.classList.remove('text-gray-500', 'hover:text-white');
            btn.classList.add('text-white');
            const btnInd = btn.querySelector('.indicator');
            if(btnInd) {
                btnInd.classList.remove('opacity-0', 'bg-volt');
                btnInd.classList.add('bg-white');
            }
        }

        if (targetId === 'view-profile') setTimeout(() => Charts.renderRadar(), 300);
        const mc = document.getElementById('main-content');
        if(mc) mc.scrollTo({ top: 0, behavior: 'smooth' });
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
        ['feed', 'squads', 'leaderboard'].forEach(t => {
            const btn = document.getElementById(`btn-soc-${t}`);
            const content = document.getElementById(`social-content-${t}`);
            if(btn) {
                btn.classList.replace('bg-white', 'bg-transparent');
                btn.classList.replace('text-black', 'text-gray-500');
            }
            if(content) {
                content.classList.remove('block');
                content.classList.add('hidden');
            }
        });
        
        const actBtn = document.getElementById(`btn-soc-${id}`);
        const actContent = document.getElementById(`social-content-${id}`);
        if(actBtn) {
            actBtn.classList.replace('bg-transparent', 'bg-white');
            actBtn.classList.replace('text-gray-500', 'text-black');
        }
        if(actContent) {
            actContent.classList.remove('hidden');
            actContent.classList.add('block');
        }
    }

    // --- MODALES ---
    static showModal(id) {
        document.querySelectorAll('.modal-sheet').forEach(sheet => {
            sheet.classList.remove('active-sheet');
        });

        const target = document.getElementById(id);
        if(target) target.classList.add('active-sheet');
        
        const ml = document.getElementById('modal-layer');
        const bd = document.getElementById('modal-backdrop');
        if(bd) bd.classList.remove('pointer-events-none', 'opacity-0');
        if(ml) ml.classList.add('modal-open');
    }

    static closeAllModals() {
        const ml = document.getElementById('modal-layer');
        const bd = document.getElementById('modal-backdrop');
        if(ml) ml.classList.remove('modal-open');
        if(bd) bd.classList.add('opacity-0', 'pointer-events-none');
        
        setTimeout(() => {
            document.querySelectorAll('.modal-sheet').forEach(sheet => {
                sheet.classList.remove('active-sheet');
            });
        }, 500);
    }

    static toast(title, msg) {
        const tc = document.getElementById('toast-container');
        if(!tc) return;
        const id = 't' + Date.now();
        tc.insertAdjacentHTML('beforeend', `<div id="${id}" class="w-full bg-gray-900/90 backdrop-blur-xl rounded-2xl p-4 border border-white-10 flex items-center gap-4 transform -translate-y-4 opacity-0 transition-all duration-300 shadow-xl"><div class="w-10 h-10 rounded-full bg-volt/10 flex items-center justify-center text-volt"><i class="fas fa-bell"></i></div><div class="flex flex-col"><span class="font-bold text-sm text-white">${title}</span><span class="text-xs text-gray-400">${msg}</span></div></div>`);
        const el = document.getElementById(id);
        setTimeout(() => { el.style.transform = 'translateY(0)'; el.style.opacity = '1'; }, 10);
        setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 300); }, 3000);
        if (navigator.vibrate) navigator.vibrate([50]);
    }

    // --- ACTIONS ---
    static saveWeight() {
        const wEl = document.getElementById('input-weight');
        if (!wEl || !wEl.value) return;
        Store.data.weight = wEl.value;
        Store.save();
        this.toast('Biométrie', `Masse enregistrée : ${wEl.value}kg.`);
    }

    static addWater() {
        if(Store.data.stats.water < 3) {
            Store.data.stats.water += 0.5;
            Store.save();
            this.refreshUI();
            this.toast('Hydratation', '+0.5L ajouté. Continuez.');
        } else {
            this.toast('Objectif Atteint', 'Hydratation maximale (3L) atteinte.');
        }
    }

    static saveSettings() {
        const nEl = document.getElementById('set-name');
        const bEl = document.getElementById('set-bio');
        if (nEl && nEl.value) Store.data.profile.name = nEl.value;
        if (bEl && bEl.value) Store.data.profile.bio = bEl.value;
        Store.save();
        this.refreshUI();
        this.closeAllModals();
        this.toast('Identité', 'Profil mis à jour.');
    }

    static buyItem(name, price) {
        if (Store.data.inventory.includes(name)) return this.toast('Boutique', 'Équipement déjà possédé.');
        if (Store.data.xp >= price) {
            Store.data.xp -= price;
            Store.data.inventory.push(name);
            Store.save();
            this.refreshUI();
            this.toast('Achat validé', `${name} ajouté au sac.`);
        } else {
            this.toast('Fonds Insuffisants', 'Continuez à vous entraîner.');
        }
    }

    static renderHistory() {
        const c = document.getElementById('history-container');
        const p = document.getElementById('home-history-preview');
        if (!c || !p) return;
        if (Store.data.history.length === 0) {
            c.innerHTML = '<p class="text-gray-500 text-sm text-center mt-10">Aucune expédition terminée.</p>';
            return;
        }
        let html = '';
        const rev = [...Store.data.history].reverse();
        rev.forEach(h => {
            html += `<div class="bg-gray-800 rounded-2xl p-4 flex justify-between items-center border border-white-5"><div class="flex flex-col"><span class="font-bold text-sm text-white">${h.n}</span><span class="text-xs text-gray-400">${h.d}</span></div><div class="flex flex-col text-right"><span class="font-black text-volt">+${h.x} XP</span><span class="text-xs font-bold text-gray-500">${h.k} kcal</span></div></div>`;
        });
        c.innerHTML = html;
        p.innerHTML = `<div class="w-full bg-gray-900/50 rounded-2xl p-4 border border-white-5 flex items-center justify-between"><div class="flex flex-col"><span class="font-bold text-sm text-white">${rev[0].n}</span><span class="text-xs text-gray-500">${rev[0].d}</span></div><span class="font-black text-volt">+${rev[0].x} XP</span></div>`;
    }

    static renderInventory() {
        const c = document.getElementById('inventory-container');
        if (!c) return;
        if (Store.data.inventory.length === 0) {
            c.innerHTML = '<p class="text-gray-500 text-sm text-center mt-10">Sac vide. Visitez la boutique.</p>';
            return;
        }
        c.innerHTML = Store.data.inventory.map(i => `<div class="bg-gray-800 rounded-2xl p-4 flex items-center gap-4 border border-white-5"><div class="w-10 h-10 rounded-full bg-volt/10 text-volt flex items-center justify-center"><i class="fas fa-check"></i></div><span class="font-bold text-sm text-white">${i}</span></div>`).join('');
    }

    // ==========================================================================
    // 6. MOTEUR D'ENTRAÎNEMENT COMPLET (ANTI-BUG CLASS HIDDEN)
    // ==========================================================================
    static openRoutePreview(id) {
        const r = DB.routes[id];
        if (!r) return;
        this.session.route = r;
        
        const img = document.getElementById('sheet-img');
        if(img) img.src = r.img;
        
        this.setText('sheet-type', r.type);
        this.setText('sheet-title', r.title);
        this.setText('sheet-time', r.time);
        this.setText('sheet-kcal', r.kcal);
        this.setText('sheet-level', r.level);

        const chk = document.getElementById('sheet-checkpoints');
        if(chk) {
            chk.innerHTML = r.steps.map((s, i) => `<div class="relative"><div class="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-gray-900 border-2 border-volt rounded-full"></div><strong class="text-sm font-bold text-white block">${i + 1}. ${s.t}</strong><span class="text-xs text-gray-400">${s.d}</span></div>`).join('');
        }
        this.showModal('route-preview-sheet');
    }

    static triggerWarmup() {
        this.closeAllModals(); // Ferme le preview de la forêt
        
        const wOverlay = document.getElementById('warmup-overlay');
        if(!wOverlay) return this.startSession();

        // RETRAIT ABSOLU DE LA CLASSE HIDDEN AVANT TOUTE CHOSE (Anti-Bug)
        wOverlay.classList.remove('hidden');
        wOverlay.style.display = 'flex';
        
        // Timeout pour déclencher la transition CSS d'opacité
        setTimeout(() => {
            wOverlay.classList.remove('opacity-0');
        }, 50);

        // Reset du ring et du timer
        let timeLeft = 30;
        const ring = document.getElementById('warmup-ring');
        if(ring) {
            ring.style.transition = 'none';
            ring.style.strokeDashoffset = '0';
            
            // Lancement de l'animation CSS (30s)
            setTimeout(() => {
                ring.style.transition = 'stroke-dashoffset 30s linear';
                ring.style.strokeDashoffset = '339.29'; // Périmètre de l'anneau
            }, 50);
        }

        this.setText('warmup-timer', timeLeft);

        // Boucle du chrono
        this.warmupTimer = setInterval(() => {
            timeLeft--;
            this.setText('warmup-timer', timeLeft);
            if (timeLeft <= 0) {
                this.skipWarmup(); // Fin du temps, on passe à la suite
            }
        }, 1000);
    }

    static skipWarmup() {
        clearInterval(this.warmupTimer);
        const wOverlay = document.getElementById('warmup-overlay');
        if(wOverlay) {
            wOverlay.classList.add('opacity-0'); // Transition de sortie
            setTimeout(() => {
                wOverlay.classList.add('hidden'); // On remet Hidden pour libérer le DOM
                wOverlay.style.display = 'none';
                this.startSession(); // Lancement officiel du parcours
            }, 500); // Temps de fondu
        } else {
            this.startSession();
        }
    }

    static startSession() {
        this.session.active = true;
        this.session.step = 0;
        const s = document.getElementById('session-active-modal');
        if(s) {
            s.classList.remove('hidden'); // S'assurer qu'il est visible
            setTimeout(() => s.style.transform = 'translateY(0)', 10);
        }
        this.updateSessionUI();
    }

    static updateSessionUI() {
        if(!this.session.route) return;
        const st = this.session.route.steps[this.session.step];
        const tot = this.session.route.steps.length;
        
        this.setText('session-step-current', this.session.step + 1);
        this.setText('session-step-total', tot);
        this.setText('session-step-title', st.t);
        this.setText('session-step-desc', st.d);
        
        const prog = document.getElementById('session-progress');
        if(prog) prog.style.width = `${((this.session.step) / tot) * 100}%`;
    }

    static handleNativePhoto(event) {
        const file = event.target.files[0];
        if (file) {
            this.toast('Analyse en cours', 'Validation algorithmique du franchissement...');
            
            // Simulation de validation IA
            setTimeout(() => {
                this.nextStep();
                event.target.value = ''; // Reset l'input pour la prochaine photo
            }, 1000);
        }
    }

    static nextStep() {
        const r = this.session.route;
        const st = r.steps[this.session.step];

        // Distribution de l'XP
        Store.data.xp += st.xp;
        Store.data.stats.actions += 1;
        if (Store.data.skills[st.c] !== undefined) Store.data.skills[st.c] += 1;

        if (this.session.step < r.steps.length - 1) {
            this.session.step++;
            this.updateSessionUI();
            this.toast('Atelier Validé', `+${st.xp} XP ajoutés.`);
        } else {
            this.concludeSession();
        }
    }

    static concludeSession() {
        // Cacher la modale de session
        const sModal = document.getElementById('session-active-modal');
        if(sModal) {
            sModal.style.transform = 'translateY(100%)';
            setTimeout(() => sModal.classList.add('hidden'), 500);
        }
        
        // Afficher l'écran de récupération (Même logique Anti-Bug Hidden que l'échauffement)
        const cOverlay = document.getElementById('cooldown-overlay');
        if(!cOverlay) return this.finishCooldown();

        cOverlay.classList.remove('hidden');
        cOverlay.style.display = 'flex';
        setTimeout(() => cOverlay.classList.remove('opacity-0'), 50);

        let timeLeft = 30;
        const ring = document.getElementById('cooldown-ring');
        if(ring) {
            ring.style.transition = 'none';
            ring.style.strokeDashoffset = '0';
            
            setTimeout(() => {
                ring.style.transition = 'stroke-dashoffset 30s linear';
                ring.style.strokeDashoffset = '339.29';
            }, 50);
        }

        this.setText('cooldown-timer', timeLeft);

        this.cooldownTimer = setInterval(() => {
            timeLeft--;
            this.setText('cooldown-timer', timeLeft);
            if (timeLeft <= 0) {
                this.finishCooldown();
            }
        }, 1000);
    }

    static finishCooldown() {
        clearInterval(this.cooldownTimer);
        const cOverlay = document.getElementById('cooldown-overlay');
        if(cOverlay) {
            cOverlay.classList.add('opacity-0');
            setTimeout(() => {
                cOverlay.classList.add('hidden');
                cOverlay.style.display = 'none';
                
                const r = this.session.route;
                
                // Gain final
                Store.data.stats.parks += 1;
                Store.data.stats.kcal += r.kcal;
                Store.data.xp += 100; // Bonus final de session complétée
                Store.data.history.push({
                    d: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
                    n: r.title, x: r.steps.reduce((a, b) => a + b.xp, 0) + 100, k: r.kcal
                });
                
                Store.save();
                this.session.active = false;
                this.refreshUI();
                
                // Retour au profil pour voir ses nouvelles stats
                this.nav('view-profile', document.getElementById('nav-profile'));
                this.toast('Opération Terminée', 'Gains enregistrés et radar mis à jour.');
            }, 500);
        }
    }

    static abortSession() {
        const sModal = document.getElementById('session-active-modal');
        if(sModal) {
            sModal.style.transform = 'translateY(100%)';
            setTimeout(() => sModal.classList.add('hidden'), 500);
        }
        this.session.active = false;
        this.toast('Abandon', 'Session interrompue. Lâcheté non récompensée.');
    }
}

// ==========================================================================
// DÉMARRAGE MOTEUR
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => App.init());
// ==========================================================================
// MOTEUR D'INSTALLATION PWA (Propose l'installation sur le téléphone)
// ==========================================================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((reg) => console.log('Moteur PWA activé avec succès.', reg))
            .catch((err) => console.log('Erreur PWA:', err));
    });
}
