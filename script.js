/**
 * ==========================================================================
 * HEBERMOOV - ULTIMATE GLASS FOREST EDITION
 * Core JavaScript Engine (SPA Architecture)
 * Auteur : Flavien R.
 * Version : 3.0.0 (Build Pro STAPS)
 * ==========================================================================
 */

"use strict";

/* ==========================================================================
   1. BASE DE DONNÉES (MODÈLES DE DONNÉES)
   ========================================================================== */
const DATABASE = {
    parcours: [
        {
            id: 1, nom: "Forêt des Gayeulies", type: "Dense", niveau: "Intense", temps: "45m", kcal: 450,
            img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
            desc: "Le poumon vert de Rennes. Terrain naturellement gras, dénivelés légers et racines. Parfait pour l'Hébertisme lourd et la sollicitation des muscles stabilisateurs profonds.",
            etapes: [
                { t: "L'Équilibre Fuyant", d: "Trouvez un tronc moussus. Marchez sans poser le pied au sol sur 5 mètres.", xp: 50, photo: "Cadrez bien le tronc franchi dans son intégralité." },
                { t: "Saut de Fossé", d: "Franchissez un trou boueux de 1m50 sans élan, à pieds joints.", xp: 80, photo: "Photographiez la zone de réception (vos traces)." },
                { t: "Grimper de Chêne", d: "Hissez-vous à la première branche d'un chêne robuste (min 2m).", xp: 120, photo: "Prenez une photo en contre-plongée depuis votre perchoir." },
                { t: "Course Slalom", d: "Courez 100m en esquivant les arbres à vitesse maximale.", xp: 60, photo: "Prenez en photo votre ligne d'arrivée virtuelle." }
            ]
        },
        {
            id: 2, nom: "Sous-bois du Thabor", type: "Clairière", niveau: "Débutant", temps: "25m", kcal: 200,
            img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
            desc: "L'Enfer vert caché en pleine ville. Utilisez les zones non goudronnées pour travailler vos appuis en douceur. Attention aux promeneurs.",
            etapes: [
                { t: "Quadrupédie Basse", d: "Avancez à 4 pattes sous les branches basses sur 10m.", xp: 40, photo: "Montrez le tunnel végétal que vous venez de traverser." },
                { t: "Détente Sèche", d: "Sautez pour toucher la feuille la plus haute possible.", xp: 50, photo: "Prenez en photo la branche exacte que vous avez touchée." }
            ]
        },
        {
            id: 3, nom: "Forêt de Beauregard", type: "Dense", niveau: "Débutant", temps: "35m", kcal: 250,
            img: "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=800&q=80",
            desc: "Bois sauvage et sombre. Parfait pour se faufiler et s'initier aux techniques de franchissement bas et à l'orientation spatiale.",
            etapes: [
                { t: "Le Rampé Tactique", d: "Passez sous un enchevêtrement de ronces sèches sur 15m.", xp: 70, photo: "Photographiez la difficulté du passage." }
            ]
        },
        {
            id: 4, nom: "Bois de St-Martin", type: "Humide", niveau: "Intense", temps: "50m", kcal: 500,
            img: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80",
            desc: "Zone marécageuse exigeante pour le cardio. Sol lourd demandant un effort supplémentaire à chaque foulée.",
            etapes: [
                { t: "Portage de Souche", d: "Trouvez un rondin lourd. Portez-le sur 50m sans le faire tomber.", xp: 100, photo: "Prenez en photo le rondin posé à son point d'arrivée." },
                { t: "Saut Réception Molle", d: "Sautez d'une butte dans une zone de terre meuble. Amortissez en pliant les genoux.", xp: 60, photo: "Photographiez l'empreinte laissée par votre réception." }
            ]
        },
        {
            id: 5, nom: "Forêt Domaniale de Rennes", type: "Clairière", niveau: "Intermédiaire", temps: "60m", kcal: 620,
            img: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=800&q=80",
            desc: "Grandes allées bordées de chênes centenaires. L'espace idéal pour les sprints longs et l'endurance fondamentale.",
            etapes: [
                { t: "Sprint Naturel", d: "Sprint maximal sur 200m en attaquant par l'avant du pied.", xp: 70, photo: "Prenez en photo l'allée parcourue." },
                { t: "Lancer Lourd", d: "Lancez une grosse pierre le plus loin possible, 3 fois de suite.", xp: 50, photo: "Photographiez le point d'impact de la pierre." }
            ]
        },
        {
            id: 6, nom: "Les Bois d'Apigné", type: "Humide", niveau: "Intermédiaire", temps: "45m", kcal: 360,
            img: "https://images.unsplash.com/photo-1508349937151-22b68b72d5b1?w=800&q=80",
            desc: "Bordures d'eau, racines affleurantes. Un travail d'agilité extrême est requis pour ne pas glisser.",
            etapes: [
                { t: "Équilibre Mouillé", d: "Traversez une zone difficile en marchant uniquement sur les racines.", xp: 80, photo: "Montrez le réseau de racines complexe." }
            ]
        }
    ],
    articles: {
        fondamentaux: `
            <h2 class="text-neon mb-15 mt-20 font-heading text-xl">Les 10 Familles de la Méthode</h2>
            <p class="text-white mb-15 line-height-15">L'Hébertisme repose sur un principe fondateur : le développement complet et utilitaire du corps humain. La musculation isolée n'a pas sa place ici.</p>
            <ul class="text-muted mb-20 line-height-15 pl-20">
                <li class="mb-5"><strong class="text-white">Déplacements :</strong> Marche, Course, Quadrupédie, Natation.</li>
                <li class="mb-5"><strong class="text-white">Franchissements :</strong> Saut, Grimper, Équilibre.</li>
                <li class="mb-5"><strong class="text-white">Manipulations :</strong> Lancer, Lever, Défense.</li>
            </ul>
            <p class="text-white line-height-15">L'objectif final se résume par la célèbre devise de Georges Hébert : <br><br><em class="text-neon border-l-neon pl-15 block">"Être fort pour être utile."</em></p>
        `,
        physio: `
            <h2 class="text-neon mb-15 mt-20 font-heading text-xl">Physiologie de l'Effort Naturel</h2>
            <p class="text-white mb-15 line-height-15">S'entraîner sur un sol instable (forêt, boue, rochers) est fondamentalement différent d'une course sur tapis ou d'un exercice sur machine guidée.</p>
            <h3 class="text-white mb-10 text-lg">La Proprioception</h3>
            <p class="text-muted mb-15 line-height-15">Chaque racine esquivée, chaque trou amorti oblige vos chevilles, vos genoux et votre tronc à s'ajuster à la milliseconde. Ce travail invisible recrute les <strong>muscles stabilisateurs profonds</strong>.</p>
            <h3 class="text-white mb-10 text-lg">Perte de Poids & Densité</h3>
            <p class="text-muted line-height-15">L'Hébertisme mobilise des chaînes musculaires entières. Cela crée une forte dépense calorique post-effort (Afterburn Effect). C'est la méthode parfaite pour forger un physique de 80kg sec, dense et hautement fonctionnel, capable de protéger et d'agir en toute situation.</p>
        `,
        survie: `
            <h2 class="text-neon mb-15 mt-20 font-heading text-xl">Règles de Survie en Sous-Bois</h2>
            <p class="text-white mb-15 line-height-15">La forêt n'est pas aseptisée. Elle impose le respect de certaines règles de sécurité vitales.</p>
            <ul class="text-muted mb-20 line-height-15 pl-20">
                <li class="mb-10"><strong class="text-danger">Le Test des Appuis :</strong> Tirez toujours d'un coup sec sur une branche avant d'y suspendre votre poids de corps.</li>
                <li class="mb-10"><strong class="text-danger">Les Pièges Invisibles :</strong> Méfiez-vous des lits de feuilles mortes d'automne, ils cachent souvent des trous, des roches coupantes ou des ornières.</li>
                <li class="mb-10"><strong class="text-danger">Hydratation :</strong> En milieu sauvage, vous perdez beaucoup d'eau. Portez toujours une réserve.</li>
            </ul>
        `,
        histoire: `
            <h2 class="text-neon mb-15 mt-20 font-heading text-xl">Le Père Fondateur</h2>
            <p class="text-white mb-15 line-height-15">Georges Hébert (1875-1957) était un officier de la marine française. Son déclic a lieu en 1902, lors de la terrible éruption de la Montagne Pelée en Martinique.</p>
            <p class="text-muted mb-15 line-height-15">Il coordonne le sauvetage de 700 personnes et réalise avec effroi que la force pure, si elle n'est pas couplée à l'agilité, l'endurance et l'altruisme, ne sert à rien face au danger.</p>
            <p class="text-muted line-height-15">Au cours de ses voyages sur le continent africain, il observe des populations indigènes dont la musculature, l'agilité et la souplesse sont parfaites, développées uniquement par l'adaptation aux contraintes de leur environnement naturel. La Méthode Naturelle était née.</p>
        `,
        nutrition: `
            <h2 class="text-neon mb-15 mt-20 font-heading text-xl">Carburant du Pratiquant</h2>
            <p class="text-white mb-15 line-height-15">L'effort explosif en extérieur nécessite une nutrition stratégique.</p>
            <h3 class="text-white mb-10 text-lg">La Gestion de l'Eau et du Sel</h3>
            <p class="text-muted line-height-15">Le corps stocke environ 3g d'eau pour 1g de glycogène, et retient énormément d'eau lorsqu'il doit traiter un excès de sodium. Boire beaucoup d'eau n'est pas contre-intuitif après un repas lourd, c'est indispensable pour drainer l'organisme.</p>
        `
    },
    boutique: [
        { id: "item_tshirt", nom: "T-Shirt Technique Hébert", prix: 1000, icon: "fa-tshirt" },
        { id: "item_shoes", nom: "Chaussures Trail Minimalistes", prix: 2500, icon: "fa-shoe-prints" },
        { id: "item_flask", nom: "Gourde de Survie en Inox", prix: 500, icon: "fa-flask" },
        { id: "item_rope", nom: "Corde d'Escalade 15m", prix: 4000, icon: "fa-bezier-curve" },
        { id: "item_bag", nom: "Sac d'expédition 20L", prix: 3500, icon: "fa-backpack" }
    ],
    badgesList: [
        { id: "b_first", nom: "Le Réveil", desc: "Terminer son premier parcours.", icon: "fa-leaf", xpUnlock: 0, requiredParks: 1 },
        { id: "b_explorer", nom: "Explorateur", desc: "Visiter 3 forêts différentes.", icon: "fa-map-signs", xpUnlock: 0, requiredParks: 3 },
        { id: "b_veteran", nom: "L'Ancien", desc: "Atteindre 5000 XP.", icon: "fa-mountain", xpUnlock: 5000, requiredParks: 0 },
        { id: "b_rich", nom: "Acheteur Compulsif", desc: "Posséder 3 objets dans l'inventaire.", icon: "fa-shopping-bag", xpUnlock: 0, requiredParks: 0 }
    ],
    feedSocial: [
        { user: "Thomas STAPS", avatar: "T", action: "A terminé le parcours", park: "Gayeulies", time: "10 min", likes: 12, likedByMe: false },
        { user: "Léa M.", avatar: "L", action: "Nouveau record de saut (1m80)", park: "Thabor", time: "2h", likes: 34, likedByMe: true },
        { user: "Marc (Coach)", avatar: "M", action: "Séance de portage lourd extrême", park: "St-Martin", time: "Hier", likes: 56, likedByMe: false }
    ]
};


/* ==========================================================================
   2. GESTIONNAIRE D'ÉTAT GLOBAL (STATE MANAGER)
   ========================================================================== */
class AppState {
    constructor() {
        this.STORAGE_KEY = 'hebermoov_ultimate_state';
        this.data = this.loadState();
        
        // Données d'exécution (non sauvegardées)
        this.runtime = {
            activeView: 'view-explore',
            session: {
                active: false,
                parcoursObj: null,
                stepIndex: 0,
                timerInterval: null,
                cameraStream: null
            },
            onboardingFinished: this.data.hasCompletedOnboarding
        };
    }

    // Structure de données par défaut
    getDefaultState() {
        return {
            hasCompletedOnboarding: false,
            xp: 0,
            level: 1,
            stats: {
                parcoursTermines: 0,
                ateliersValides: 0,
                kcalBrulees: 0
            },
            history: [], // Array de { date, parcoursId, nom, xp, kcal }
            inventory: [], // Array de strings (noms d'items)
            unlockedBadges: [], // Array d'IDs de badges
            settings: {
                darkMode: true, // Forcé dans ce design
                highQualityPhoto: true
            }
        };
    }

    loadState() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            if (saved) return JSON.parse(saved);
        } catch (e) {
            console.error("Erreur de lecture du localStorage", e);
        }
        return this.getDefaultState();
    }

    saveState() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
            this.computeDerivedStats();
            updateAllUI();
        } catch (e) {
            console.error("Erreur d'écriture dans le localStorage", e);
        }
    }

    computeDerivedStats() {
        // Logique RPG : 1 niveau tous les 500 XP
        this.data.level = Math.floor(this.data.xp / 500) + 1;
        this.checkBadgesUnlock();
    }

    checkBadgesUnlock() {
        let newBadgeUnlocked = false;
        const parksDone = this.data.stats.parcoursTermines;
        const currentXp = this.data.xp;
        const invCount = this.data.inventory.length;

        DATABASE.badgesList.forEach(badge => {
            if (!this.data.unlockedBadges.includes(badge.id)) {
                let unlock = false;
                
                if (badge.id === "b_first" && parksDone >= 1) unlock = true;
                if (badge.id === "b_explorer" && parksDone >= 3) unlock = true;
                if (badge.id === "b_veteran" && currentXp >= 5000) unlock = true;
                if (badge.id === "b_rich" && invCount >= 3) unlock = true;

                if (unlock) {
                    this.data.unlockedBadges.push(badge.id);
                    newBadgeUnlocked = true;
                    setTimeout(() => triggerToast("🏆 Nouveau Trophée !", badge.nom), 1500);
                }
            }
        });
        // Si besoin de resave suite à un déblocage
        if (newBadgeUnlocked) this.saveState();
    }

    resetData() {
        this.data = this.getDefaultState();
        this.saveState();
        location.reload();
    }
}

const STORE = new AppState();


/* ==========================================================================
   3. CONTRÔLEUR D'INTERFACE UTILISATEUR (UI CONTROLLER)
   ========================================================================== */

// --- Système de Toasts (Notifications) ---
function triggerToast(title, message) {
    const container = document.getElementById('toast-container');
    document.getElementById('toast-title').innerText = title;
    document.getElementById('toast-msg').innerText = message;
    
    // Feedback haptique si disponible sur le téléphone
    if (navigator.vibrate) navigator.vibrate([50, 100, 50]);

    container.classList.add('show');
    
    // Auto-hide après 4 secondes
    setTimeout(() => {
        container.classList.remove('show');
    }, 4000);
}

// --- Moteur de Navigation Principale (SPA Routing) ---
function navigateMain(viewId, btnElement) {
    // Gestion du DOM Viewport
    document.querySelectorAll('.app-view').forEach(view => {
        view.classList.remove('active');
        view.classList.add('hidden'); // Optimisation perfs
    });
    
    const targetView = document.getElementById(viewId);
    targetView.classList.remove('hidden');
    // Micro-délai pour déclencher l'animation CSS d'opacité
    setTimeout(() => targetView.classList.add('active'), 10);

    // Mise à jour visuelle de la Tab Bar
    if (btnElement && btnElement.classList.contains('nav-tab')) {
        document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
        btnElement.classList.add('active');
    }

    // Scroll To Top propre
    targetView.scrollTo({ top: 0, behavior: 'smooth' });
    STORE.runtime.activeView = viewId;

    // Rendu dynamique si nécessaire
    if (viewId === 'view-explore') renderExplorer(DATABASE.parcours);
    if (viewId === 'view-challenges') renderShop();
    if (viewId === 'view-social') renderSocialFeed();
}

// --- Moteur d'Overlays (Plein écran & Sous-pages) ---
function openOverlay(overlayId) {
    const el = document.getElementById(overlayId);
    el.classList.remove('hidden');
    // Force le navigateur à repeindre pour appliquer l'animation
    void el.offsetWidth;
    el.classList.add('active');
}

function closeOverlay(overlayId) {
    const el = document.getElementById(overlayId);
    el.classList.remove('active');
    // Correspond à la durée de l'animation CSS (0.4s)
    setTimeout(() => el.classList.add('hidden'), 400);
}


/* ==========================================================================
   4. FONCTIONS DE RENDU DYNAMIQUE (VIEWS RENDERING)
   ========================================================================== */

// --- Mise à jour de l'UI Globale (Header, Profil) ---
function updateAllUI() {
    const data = STORE.data;
    const currentXpInLevel = data.xp % 500;
    const progressPercent = (currentXpInLevel / 500) * 100;

    // Header
    const elHeaderXp = document.getElementById('header-xp-val');
    if (elHeaderXp) elHeaderXp.innerText = data.xp;

    // Profil Général
    const elLvlBadge = document.getElementById('profile-level-badge');
    if (elLvlBadge) {
        elLvlBadge.innerText = data.level;
        document.getElementById('profile-xp-curr').innerText = currentXpInLevel;
        
        // Stats Boxes Profil
        document.getElementById('stat-val-parcours').innerText = data.stats.parcoursTermines;
        document.getElementById('stat-val-kcal').innerText = data.stats.kcalBrulees;
        document.getElementById('stat-val-ateliers').innerText = data.stats.ateliersValides;

        // Cercle SVG Profil (Circonférence = 2 * PI * r = 2 * 3.14159 * 56 ≈ 351.8)
        const circleOffset = 351.8 - (progressPercent / 100) * 351.8;
        const ring = document.getElementById('profile-ring-fill');
        if(ring) ring.style.strokeDashoffset = circleOffset;
    }

    // Défis / Boutique Wallet
    const elShopWallet = document.getElementById('shop-wallet-xp');
    if (elShopWallet) elShopWallet.innerText = data.xp + " XP";
    
    // Leaderboard Toi
    const elLbMe = document.getElementById('lb-my-xp');
    if (elLbMe) elLbMe.innerText = data.xp + " XP";
}

// --- Vue 1 : Explorer ---
function renderExplorer(parcoursArray) {
    const grid = document.getElementById('parcours-grid');
    if (!grid) return;
    grid.innerHTML = '';

    if (parcoursArray.length === 0) {
        grid.innerHTML = `<p class="text-center text-muted mt-30 w-100">Aucune forêt trouvée pour ces critères.</p>`;
        return;
    }

    parcoursArray.forEach(p => {
        const difficultyColor = p.niveau === 'Intense' ? 'text-warning' : 'text-neon';
        
        const cardHTML = `
            <div class="parcours-card" onclick="sessionPreFlightInit(${p.id})">
                <div class="card-bg-img absolute inset-0 bg-cover bg-center transition-transform" style="background-image: url('${p.img}')"></div>
                <div class="card-grad absolute inset-0"></div>
                
                <div class="card-content absolute bottom-0 left-0 w-100 p-20 z-10 flex-col">
                    <div class="flex-between w-100 mb-10">
                        <span class="badge-glass bg-dark-dim text-white text-xxs font-bold uppercase tracking-widest px-10 py-4 rounded-pill border-glass">${p.type}</span>
                        <div class="glass-btn-circular w-35 h-35"><i class="fas fa-play text-white text-xs pl-2"></i></div>
                    </div>
                    <h4 class="font-heading text-xl text-white m-0 text-shadow">${p.nom}</h4>
                    <div class="flex-align gap-15 mt-5">
                        <span class="text-xs font-bold text-white"><i class="fas fa-layer-group text-muted mr-5"></i>${p.etapes.length} Ateliers</span>
                        <span class="text-xs font-bold ${difficultyColor}"><i class="fas fa-signal mr-5"></i>${p.niveau}</span>
                    </div>
                </div>
            </div>
        `;
        grid.insertAdjacentHTML('beforeend', cardHTML);
    });
}

function applyFilter(type, btnElement) {
    document.querySelectorAll('.glass-filter-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
    
    let filtered = DATABASE.parcours;
    if (type !== 'Tous') {
        filtered = DATABASE.parcours.filter(p => p.type === type || p.niveau === type);
    }
    renderExplorer(filtered);
}

function searchParcours() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const filtered = DATABASE.parcours.filter(p => p.nom.toLowerCase().includes(input));
    
    // Retirer l'état actif des filtres visuels
    document.querySelectorAll('.glass-filter-btn').forEach(btn => btn.classList.remove('active'));
    renderExplorer(filtered);
}

// --- Vue 2 : Défis & Boutique ---
function renderShop() {
    // Les items sont statiques dans le HTML pour simplifier, 
    // mais la logique d'achat est gérée dynamiquement.
}

function buyItem(itemName, price) {
    if (STORE.data.inventory.includes(itemName)) {
        triggerToast("Erreur d'Achat", "Vous possédez déjà cet équipement.");
        return;
    }
    if (STORE.data.xp >= price) {
        STORE.data.xp -= price;
        STORE.data.inventory.push(itemName);
        STORE.saveState();
        triggerToast("Acquisition Réussie", `L'objet "${itemName}" a été ajouté à votre inventaire.`);
    } else {
        const missing = price - STORE.data.xp;
        triggerToast("Fonds Insuffisants", `Il vous manque ${missing} XP pour obtenir cet équipement.`);
    }
}

// --- Vue 3 : Apprendre (Wiki) ---
function openArticle(articleKey) {
    const content = DATABASE.articles[articleKey];
    if (!content) return;
    
    document.getElementById('subpage-header-title').innerText = "Manuel de Survie";
    document.getElementById('subpage-body-content').innerHTML = `<div class="article-format">${content}</div>`;
    openOverlay('universal-subpage');
}

// --- Vue 4 : Social ---
function switchSocialTab(tabName, btnElement) {
    document.querySelectorAll('.seg-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
    
    document.querySelectorAll('.social-content-tab').forEach(tab => {
        tab.classList.remove('active');
        tab.classList.add('hidden');
    });
    
    const targetTab = document.getElementById('social-tab-' + tabName);
    targetTab.classList.remove('hidden');
    setTimeout(() => targetTab.classList.add('active'), 10);
}

function renderSocialFeed() {
    const container = document.getElementById('social-feed-container');
    if(!container) return;
    container.innerHTML = '';

    DATABASE.feedSocial.forEach(post => {
        const heartClass = post.likedByMe ? 'fas fa-heart text-danger' : 'far fa-heart text-muted';
        
        const html = `
            <div class="feed-post glass-mirror p-20 rounded-2xl">
                <div class="flex-align gap-15 mb-15">
                    <div class="avatar w-40 h-40 rounded-full bg-dark-dim flex-center font-heading font-bold text-white border-glass">${post.avatar}</div>
                    <div class="flex-col">
                        <strong class="text-white text-sm font-heading">${post.user}</strong>
                        <span class="text-muted text-xs">${post.time} • 📍 ${post.park}</span>
                    </div>
                </div>
                <div class="post-content text-white text-sm mb-15 line-height-15 font-bold">
                    ${post.action}
                </div>
                <div class="post-img w-100 h-150 rounded-xl bg-cover bg-center mb-15 border-glass" style="background-image: url('${post.img}');"></div>
                <div class="post-actions flex-align gap-20 border-t-glass pt-15">
                    <button class="icon-btn flex-align gap-5 cursor-pointer hover-bg-light p-5-10 rounded-lg transition-bg">
                        <i class="${heartClass}"></i> <span class="text-muted text-sm font-bold">${post.likes}</span>
                    </button>
                    <button class="icon-btn flex-align gap-5 cursor-pointer hover-bg-light p-5-10 rounded-lg transition-bg" onclick="triggerToast('En construction', 'Le module de commentaires STAPS arrive bientôt.')">
                        <i class="far fa-comment text-muted"></i> <span class="text-muted text-sm font-bold">Réagir</span>
                    </button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', html);
    });
}

// --- Vue 5 : Profil (Sous-pages) ---
function openProfileSubpage(pageType) {
    let title = "";
    let htmlContent = "";

    switch(pageType) {
        case 'health':
            title = "Suivi Santé";
            htmlContent = `
                <div class="glass-mirror p-20 rounded-xl mb-15 flex-between border-l-neon">
                    <span class="text-muted font-bold text-sm">Poids enregistré</span>
                    <strong class="text-xl text-white font-heading">96.2 kg</strong>
                </div>
                <div class="glass-mirror p-20 rounded-xl mb-30 flex-between">
                    <span class="text-muted font-bold text-sm">Objectif Athlétique</span>
                    <strong class="text-xl text-neon font-heading">80.0 kg</strong>
                </div>
                <div class="alert-safety bg-info-dim border-info p-15 rounded-xl flex-align gap-15 text-left mb-30">
                    <i class="fas fa-tint text-info text-2xl"></i>
                    <p class="text-white text-xs m-0 line-height-15">L'hydratation est la clé. Buvez au minimum 2,5L d'eau par jour pour drainer le sel et récupérer de vos séances.</p>
                </div>
            `;
            break;

        case 'history':
            title = "Carnet d'Expéditions";
            if (STORE.data.history.length === 0) {
                htmlContent = `<div class="flex-col flex-center text-center mt-50 text-muted"><i class="fas fa-ghost text-5xl mb-20 opacity-50"></i><p>Vous n'avez pas encore osé affronter la forêt.</p></div>`;
            } else {
                const historyList = [...STORE.data.history].reverse().map(h => `
                    <div class="glass-mirror p-20 rounded-xl mb-15 flex-between border-l-neon">
                        <div class="flex-col text-left">
                            <strong class="text-white text-base font-heading mb-5">${h.nom}</strong>
                            <span class="text-muted text-xs"><i class="far fa-calendar-alt mr-5"></i>${h.date}</span>
                        </div>
                        <div class="flex-col text-right">
                            <strong class="text-neon text-lg font-black">+${h.xp} XP</strong>
                            <span class="text-warning text-xs font-bold">${h.kcal} kcal</span>
                        </div>
                    </div>
                `).join('');
                htmlContent = `<div class="history-list flex-col">${historyList}</div>`;
            }
            break;

        case 'inventory':
            title = "Mon Sac à Dos";
            if (STORE.data.inventory.length === 0) {
                htmlContent = `<div class="flex-col flex-center text-center mt-50 text-muted"><i class="fas fa-box-open text-5xl mb-20 opacity-50"></i><p>Votre sac est vide. Allez dans l'onglet Défis pour vous équiper.</p></div>`;
            } else {
                const invList = STORE.data.inventory.map(item => `
                    <div class="glass-mirror p-20 rounded-xl mb-15 flex-align gap-15">
                        <div class="w-40 h-40 rounded-full bg-dark-dim border-glass flex-center"><i class="fas fa-check text-neon"></i></div>
                        <strong class="text-white text-base font-heading">${item}</strong>
                    </div>
                `).join('');
                htmlContent = `<div class="inventory-list flex-col">${invList}</div>`;
            }
            break;

        case 'badges':
            title = "Mes Trophées";
            const badgesHtml = DATABASE.badgesList.map(b => {
                const isUnlocked = STORE.data.unlockedBadges.includes(b.id);
                const opacityClass = isUnlocked ? "opacity-100" : "opacity-20";
                const borderClass = isUnlocked ? "border-warning-glow" : "border-glass";
                const textClass = isUnlocked ? "text-warning" : "text-muted";
                
                return `
                <div class="glass-mirror p-20 rounded-xl mb-15 flex-align gap-20 ${opacityClass} ${borderClass}">
                    <div class="w-60 h-60 rounded-full bg-dark-dim border-glass flex-center text-3xl ${textClass}"><i class="fas ${b.icon}"></i></div>
                    <div class="flex-col flex-1">
                        <strong class="text-white text-base font-heading mb-5">${b.nom}</strong>
                        <p class="text-muted text-xs m-0 line-height-12">${b.desc}</p>
                    </div>
                    ${isUnlocked ? '<i class="fas fa-check-circle text-neon text-xl"></i>' : '<i class="fas fa-lock text-muted text-xl"></i>'}
                </div>`;
            }).join('');
            htmlContent = `<div class="badges-list flex-col">${badgesHtml}</div>`;
            break;
    }

    document.getElementById('subpage-header-title').innerText = title;
    document.getElementById('subpage-body-content').innerHTML = htmlContent;
    openOverlay('universal-subpage');
}

function closeSubpage() {
    closeOverlay('universal-subpage');
}

function resetAppConfirm() {
    if (confirm("⚠️ DANGER : Êtes-vous sûr de vouloir effacer l'intégralité de vos données STAPS ? Le retour en arrière est impossible.")) {
        STORE.resetData();
    }
}


/* ==========================================================================
   5. MOTEUR DE SÉANCE D'ENTRAÎNEMENT (LE COEUR DU SYSTÈME)
   ========================================================================== */

// --- 5.1 Résumé Pré-Départ (Phase A) ---
function sessionPreFlightInit(parcoursId) {
    const p = DATABASE.parcours.find(x => x.id === parcoursId);
    if (!p) return;
    
    STORE.runtime.session.parcoursObj = p;
    
    // Inject Data
    document.getElementById('pre-cover-image').style.backgroundImage = `url('${p.img}')`;
    document.getElementById('pre-badge-type').innerText = p.type;
    document.getElementById('pre-park-title').innerText = p.nom;
    document.getElementById('pre-park-desc').innerText = p.desc;
    
    document.getElementById('pre-val-time').innerText = p.temps;
    document.getElementById('pre-val-kcal').innerText = p.kcal;
    document.getElementById('pre-val-steps').innerText = p.etapes.length;
    
    const timeline = document.getElementById('pre-timeline-container');
    timeline.innerHTML = '';
    p.etapes.forEach((step, idx) => {
        timeline.innerHTML += `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <strong class="block text-white text-base font-heading mb-5">Étape ${idx + 1} : ${step.t}</strong>
                <p class="text-sm text-muted m-0 line-height-15">${step.d}</p>
            </div>
        `;
    });

    openOverlay('session-pre-flight');
}

// --- 5.2 Échauffement (Phase B) ---
function startWarmupPhase() {
    closeOverlay('session-pre-flight');
    openOverlay('session-warmup');
    
    let secondsLeft = 15; // Raccourci pour fluidité de l'appli (normalement 30 ou 60s)
    const timerDisplay = document.getElementById('timer-warmup-display');
    timerDisplay.innerText = "00:" + secondsLeft;
    
    STORE.runtime.session.timerInterval = setInterval(() => {
        secondsLeft--;
        const formatted = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;
        timerDisplay.innerText = "00:" + formatted;
        
        if (secondsLeft <= 0) {
            clearInterval(STORE.runtime.session.timerInterval);
            skipWarmup(); // Enchaînement automatique
        }
    }, 1000);
}

function skipWarmup() {
    if (STORE.runtime.session.timerInterval) {
        clearInterval(STORE.runtime.session.timerInterval);
    }
    closeOverlay('session-warmup');
    
    // Initialisation réelle du suivi de la séance
    STORE.runtime.session.active = true;
    STORE.runtime.session.stepIndex = 0;
    
    // Affichage de la barre de progression globale
    const pBar = document.getElementById('global-progress-bar');
    pBar.classList.remove('hidden');
    document.getElementById('progress-park-name').innerText = STORE.runtime.session.parcoursObj.nom;
    updateSessionProgressBar(0);
    
    loadInstructionPhase();
}

function updateSessionProgressBar(percent) {
    document.getElementById('progress-fill').style.width = percent + "%";
    document.getElementById('progress-percent').innerText = Math.round(percent) + "%";
}

// --- 5.3 Instruction Théorique (Phase C) ---
function loadInstructionPhase() {
    const stepObj = STORE.runtime.session.parcoursObj.etapes[STORE.runtime.session.stepIndex];
    
    document.getElementById('instr-step-num').innerText = STORE.runtime.session.stepIndex + 1;
    document.getElementById('instr-title').innerText = stepObj.t;
    document.getElementById('instr-desc').innerText = stepObj.d;
    
    openOverlay('session-instruction');
}

// --- 5.4 Caméra & Validation Pratique (Phase D) ---
async function startCameraPhase() {
    closeOverlay('session-instruction');
    
    const stepObj = STORE.runtime.session.parcoursObj.etapes[STORE.runtime.session.stepIndex];
    document.getElementById('cam-instruction-text').innerText = stepObj.photo;
    
    openOverlay('session-camera');
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment', width: { ideal: 1280 } } 
        });
        STORE.runtime.session.cameraStream = stream;
        document.getElementById('webcam-feed').srcObject = stream;
    } catch(err) {
        console.warn("Caméra indisponible ou refusée. Simulation affichée.", err);
        document.getElementById('webcam-feed').style.background = "var(--bg-deep)";
    }
}

// --- 5.5 Prise de Photo et Succès (Phase E) ---
function captureValidationPhoto() {
    // 1. Déclenchement de l'animation de Flash
    const flashEl = document.getElementById('camera-flash');
    flashEl.classList.remove('hidden');
    
    // L'animation CSS dure 0.5s. On recache l'élément juste après.
    setTimeout(() => {
        flashEl.classList.add('hidden');
    }, 500);

    // 2. Couper le flux de la caméra pour économiser la batterie du téléphone
    if (STORE.runtime.session.cameraStream) {
        STORE.runtime.session.cameraStream.getTracks().forEach(track => track.stop());
        STORE.runtime.session.cameraStream = null;
    }

    // 3. Logique d'ajout d'XP
    const stepObj = STORE.runtime.session.parcoursObj.etapes[STORE.runtime.session.stepIndex];
    STORE.data.xp += stepObj.xp;
    STORE.data.stats.ateliersValides += 1;
    STORE.saveState(); // Update les variables globales

    // 4. Mettre à jour la barre de progression
    const totalSteps = STORE.runtime.session.parcoursObj.etapes.length;
    const currentProgress = ((STORE.runtime.session.stepIndex + 1) / totalSteps) * 100;
    updateSessionProgressBar(currentProgress);

    // 5. Afficher Modale de Succès
    closeOverlay('session-camera');
    document.getElementById('success-xp-val').innerText = stepObj.xp;
    openOverlay('session-success');
}

// --- 5.6 Moteur de Routage interne de séance ---
function goToNextStep() {
    closeOverlay('session-success');
    
    const totalSteps = STORE.runtime.session.parcoursObj.etapes.length;
    
    if (STORE.runtime.session.stepIndex < totalSteps - 1) {
        // Reste des étapes -> Boucle
        STORE.runtime.session.stepIndex++;
        loadInstructionPhase();
    } else {
        // Parcours terminé -> Phase Étirements
        startStretchingPhase();
    }
}

// --- 5.7 Étirements & Clôture (Phase F) ---
function startStretchingPhase() {
    // Cacher la barre de progression en haut
    document.getElementById('global-progress-bar').classList.add('hidden');
    openOverlay('session-stretching');
    
    let secondsLeft = 15;
    const timerDisplay = document.getElementById('timer-stretch-display');
    timerDisplay.innerText = "00:" + secondsLeft;
    
    STORE.runtime.session.timerInterval = setInterval(() => {
        secondsLeft--;
        const formatted = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;
        timerDisplay.innerText = "00:" + formatted;
        
        if (secondsLeft <= 0) {
            clearInterval(STORE.runtime.session.timerInterval);
            concludeSession();
        }
    }, 1000);
}

function concludeSession() {
    if (STORE.runtime.session.timerInterval) {
        clearInterval(STORE.runtime.session.timerInterval);
    }
    closeOverlay('session-stretching');
    
    const parcoursObj = STORE.runtime.session.parcoursObj;
    
    // Mise à jour des statistiques finales
    STORE.data.stats.parcoursTermines += 1;
    STORE.data.stats.kcalBrulees += parcoursObj.kcal;
    STORE.data.xp += 150; // XP Bonus de complétion
    
    // Création de l'entrée Historique
    const todayStr = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    const totalXpGained = parcoursObj.etapes.reduce((sum, step) => sum + step.xp, 0) + 150;
    
    STORE.data.history.push({
        date: todayStr,
        nom: parcoursObj.nom,
        kcal: parcoursObj.kcal,
        xp: totalXpGained
    });
    
    // Sauvegarde Ultime
    STORE.saveState();
    
    // Nettoyage de l'état
    STORE.runtime.session.active = false;
    STORE.runtime.session.parcoursObj = null;
    
    // Feedback
    triggerToast("Expédition Terminée", `+150 XP Bonus. La forêt vous remercie.`);
    
    // Redirection auto vers l'onglet Profil pour voir les stats monter
    navigateMain('view-profile', document.querySelectorAll('.nav-tab')[4]);
}

// --- 5.8 Sécurité : Annulation Manuelle ---
function closeSessionOverlay(overlayId) {
    closeOverlay(overlayId);
}

function abortSessionConfirm() {
    if (confirm("⚠️ Souhaitez-vous déclarer forfait ? Votre progression sur cette forêt sera perdue.")) {
        // Couper caméra en urgence
        if (STORE.runtime.session.cameraStream) {
            STORE.runtime.session.cameraStream.getTracks().forEach(track => track.stop());
            STORE.runtime.session.cameraStream = null;
        }
        
        closeOverlay('session-camera');
        document.getElementById('global-progress-bar').classList.add('hidden');
        STORE.runtime.session.active = false;
        
        navigateMain('view-explore', document.querySelectorAll('.nav-tab')[0]);
    }
}


/* ==========================================================================
   6. ONBOARDING TUTORIAL LOGIC
   ========================================================================== */
let currentSlide = 1;
function nextOnboarding() {
    if (currentSlide < 3) {
        document.getElementById(`slide-${currentSlide}`).classList.remove('active');
        document.getElementById(`slide-${currentSlide}`).classList.add('hidden');
        
        // Mise à jour des points
        document.querySelectorAll('.dot')[currentSlide - 1].classList.remove('active');
        document.querySelectorAll('.dot')[currentSlide].classList.add('active');
        
        currentSlide++;
        
        document.getElementById(`slide-${currentSlide}`).classList.remove('hidden');
        // Force reflow
        void document.getElementById(`slide-${currentSlide}`).offsetWidth;
        document.getElementById(`slide-${currentSlide}`).classList.add('active');
        
        if (currentSlide === 3) {
            document.querySelector('.onboarding-controls button').innerText = "PÉNÉTRER LA FORÊT";
        }
    } else {
        // Fin de l'onboarding
        closeOverlay('onboarding-overlay');
        STORE.data.hasCompletedOnboarding = true;
        STORE.saveState();
    }
}


/* ==========================================================================
   7. INITIALISATION DU MOTEUR (BOOTSTRAP)
   ========================================================================== */
window.addEventListener('DOMContentLoaded', () => {
    try {
        // 1. Mise à jour de l'UI Globale basée sur le localStorage
        updateAllUI();
        
        // 2. Pré-génération des listes
        renderExplorer(DATABASE.parcours);
        renderSocialFeed();
        
        // 3. Gestion du Splash Screen et Onboarding
        setTimeout(() => {
            const splash = document.getElementById('splash-screen');
            splash.classList.remove('active');
            setTimeout(() => splash.classList.add('hidden'), 500); // Wait for transition
            
            // Si c'est la première fois que l'utilisateur lance l'app
            if (!STORE.data.hasCompletedOnboarding) {
                openOverlay('onboarding-overlay');
            } else {
                triggerToast("Connexion Réussie", "Bienvenue sur l'espace STAPS Flavien.");
            }
        }, 2000); // Simule 2 secondes de chargement pour l'effet pro

    } catch (e) {
        console.error("CRITICAL ERROR IN BOOTSTRAP :", e);
        alert("Une erreur critique est survenue lors de l'initialisation de l'application. Vérifiez les fichiers.");
    }
});
