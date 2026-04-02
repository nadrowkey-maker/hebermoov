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
        "stmartin-1": { title: "Sentier des Bûcherons", type: "Forêt", time: "50 min", kcal: 450, level: "Intense", img: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Soulevé de roche", d: "Trouver une grosse pierre, soulevé de terre.", c: "Lever", xp: 150 }, { t: "Lancer de roche", d: "Jeté explosif à deux mains.", c: "Lancer", xp: 110 }] },

        // ===== PARCOURS SUPPLÉMENTAIRES PARCS EXISTANTS =====
        "gayeulles-3": { title: "Le Défi des Collines", type: "Trail", time: "40 min", kcal: 430, level: "Intense", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Montée explosive", d: "Sprint en côte sur 200m de dénivelé.", c: "Course", xp: 100 }, { t: "Descente maîtrisée", d: "Courir en descente raide sans perdre l'équilibre.", c: "Equilibre", xp: 80 }, { t: "Franchissement naturel", d: "Saut par-dessus un fossé en contrebas.", c: "Saut", xp: 90 }] },
        "gayeulles-4": { title: "Le Sentier du Prédateur", type: "Survie Nocturne", time: "25 min", kcal: 320, level: "Élite", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Déplacement silencieux", d: "Marcher 500m sans faire de bruit sur sol de feuilles mortes.", c: "Marche", xp: 120 }, { t: "Embuscade simulée", d: "Monter sur un chêne et rester immobile 30 secondes.", c: "Grimper", xp: 180 }] },
        "thabor-2": { title: "Le Tour du Thabor Express", type: "Parc Urbain", time: "20 min", kcal: 280, level: "Débutant", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Footing doux", d: "2 tours du parc en jogging léger.", c: "Course", xp: 50 }, { t: "Abdos plein air", d: "20 crunchs sur un banc de parc.", c: "Lever", xp: 70 }] },
        "beaulieu-2": { title: "Le Parcours STAPS", type: "Campus Intensity", time: "30 min", kcal: 330, level: "Intermédiaire", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Navette inter-bâtiments", d: "Sprint entre bâtiments A et B (100m aller-retour x3).", c: "Course", xp: 80 }, { t: "Pompes murales", d: "20 pompes contre le mur du gymnase.", c: "Lever", xp: 90 }] },
        "apigne-2": { title: "L'Aquatique Challenge", type: "Bord d'eau", time: "50 min", kcal: 460, level: "Intense", img: "https://images.unsplash.com/photo-1500829243541-74b677fecc30?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Longée d'étang", d: "Courir le contour complet du grand étang (2km).", c: "Course", xp: 90 }, { t: "Saut de digue", d: "Franchir 3 mini-digues en saut à deux pieds.", c: "Saut", xp: 100 }, { t: "Transport de kayak", d: "Soulever et porter un kayak sur 50m.", c: "Lever", xp: 130 }] },
        "stmartin-2": { title: "Les Ravines Sauvages", type: "Forêt Extrême", time: "65 min", kcal: 580, level: "Élite", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Descente de ravine", d: "Descendre en quadrupedie une pente de 40° sur 30m.", c: "Quadrupedie", xp: 150 }, { t: "Remontée explosive", d: "Sprint de montée dans la ravine.", c: "Course", xp: 120 }, { t: "Lancer de rocher", d: "Lancer une pierre de 3kg à 8m de distance.", c: "Lancer", xp: 110 }] },

        // ===== BOIS DE SOEUVRES =====
        "soeuvres-1": { title: "La Tranchée de Soeuvres", type: "Forêt Dense", time: "60 min", kcal: 570, level: "Intense", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Infiltration sous-bois", d: "Ramper sur 20m sous des branches à 60cm du sol.", c: "Quadrupedie", xp: 130 }, { t: "Escalade de chêne", d: "Atteindre la branche à 3m d'un chêne centenaire.", c: "Grimper", xp: 200 }, { t: "Course trail", d: "1.5km de sentier sinueux en montée.", c: "Course", xp: 100 }] },
        "soeuvres-2": { title: "Les Sous-Bois Cachés", type: "Nature & Équilibre", time: "45 min", kcal: 420, level: "Intermédiaire", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Marche de prospection", d: "2km de marche rapide en terrain varié.", c: "Marche", xp: 60 }, { t: "Saut de buissons", d: "Franchir 5 buissons épineux sans les toucher.", c: "Saut", xp: 90 }, { t: "Équilibre sur tronc", d: "Traverser un tronc couché en équilibre (10m).", c: "Equilibre", xp: 80 }] },
        "soeuvres-3": { title: "Le Piège Sylvestre", type: "Survie", time: "35 min", kcal: 380, level: "Intense", img: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Déplacement reptation", d: "30m de reptation militaire sous ronces.", c: "Quadrupedie", xp: 160 }, { t: "Lancer défensif", d: "Lancer précis sur cible naturelle à 8m.", c: "Lancer", xp: 100 }] },

        // ===== BOIS DU RHEU =====
        "rheu-1": { title: "Le Circuit du Rheu", type: "Forêt & Campagne", time: "55 min", kcal: 490, level: "Intermédiaire", img: "https://images.unsplash.com/photo-1534774867929-7763fcfe95c0?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Trail bocager", d: "Courir 2km entre champs et haies bocagères.", c: "Course", xp: 80 }, { t: "Portage en terrain mou", d: "Porter une charge de 10kg sur 100m en sol meuble.", c: "Lever", xp: 140 }, { t: "Haie naturelle", d: "Franchir 4 haies vives en saut contrôlé.", c: "Saut", xp: 90 }] },
        "rheu-2": { title: "La Traversée Forestière", type: "Endurance Pure", time: "45 min", kcal: 410, level: "Intense", img: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Course longue endurance", d: "3km de trail forestier non-stop à allure modérée.", c: "Course", xp: 110 }, { t: "Lancer de précision", d: "Atteindre une cible naturelle à 5m avec une pierre.", c: "Lancer", xp: 80 }] },
        "rheu-3": { title: "La Boucle des Pâtures", type: "Mixte", time: "40 min", kcal: 360, level: "Débutant", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Marche active", d: "3km de marche nordique rythmée.", c: "Marche", xp: 60 }, { t: "Gainage naturel", d: "Tenir 60s en position de planche sur sol herbeux.", c: "Equilibre", xp: 70 }] },

        // ===== FORÊT DE LIFFRÉ =====
        "lifre-1": { title: "L'Expédition Nordique", type: "Forêt Profonde", time: "75 min", kcal: 660, level: "Élite", img: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Marche nordique active", d: "3km de marche rapide avec bâtons naturels.", c: "Marche", xp: 80 }, { t: "Portage de bûche", d: "Porter une bûche de 25kg sur 200m en forêt.", c: "Lever", xp: 200 }, { t: "Grimper de falaise", d: "Escalader une paroi rocheuse de 4m sans aide.", c: "Grimper", xp: 220 }, { t: "Sprint final", d: "800m de sprint sur terrain meuble.", c: "Course", xp: 130 }] },
        "lifre-2": { title: "Le Chemin des Korrigans", type: "Trail Magique", time: "50 min", kcal: 490, level: "Intense", img: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Sentier enchanté", d: "Courir 2km sur chemin tortueux, respecter la faune.", c: "Course", xp: 90 }, { t: "Franchissement de ruisseau", d: "Passer un ruisseau en saut sans se mouiller.", c: "Saut", xp: 100 }, { t: "Défense naturelle", d: "Se protéger 30s d'un partenaire (simulation combat).", c: "Defense", xp: 120 }] },
        "lifre-3": { title: "La Diagonale des Hêtres", type: "Forêt", time: "60 min", kcal: 530, level: "Intense", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Traversée forestière", d: "2.5km en forêt de hêtres anciens.", c: "Course", xp: 100 }, { t: "Équilibre branchu", d: "Monter et avancer sur 3 branches consécutives.", c: "Equilibre", xp: 90 }, { t: "Portage montée", d: "Porter 15kg sur une côte de 200m.", c: "Lever", xp: 160 }] },

        // ===== FORÊT DE TEILLAY =====
        "teillay-1": { title: "La Frontière Sauvage", type: "Forêt Extrême", time: "80 min", kcal: 720, level: "Élite", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Mise en condition", d: "2km de marche rapide en forêt primaire bretonne.", c: "Marche", xp: 70 }, { t: "Escalade intensive", d: "Grimper 5 arbres différents en moins de 20min.", c: "Grimper", xp: 250 }, { t: "Portage extrême", d: "Porter 30kg sur 100m en terrain accidenté.", c: "Lever", xp: 200 }, { t: "Course d'évasion", d: "1km de sprint sur terrain inconnu et varié.", c: "Course", xp: 150 }] },
        "teillay-2": { title: "La Piste Celtique", type: "Nature", time: "40 min", kcal: 380, level: "Intermédiaire", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Course sur piste", d: "1.5km sur piste boisée en terrain souple.", c: "Course", xp: 70 }, { t: "Équilibre celtique", d: "Marcher sur 3 troncs posés au sol consécutivement.", c: "Equilibre", xp: 80 }] },
        "teillay-3": { title: "Le Rituel de l'Aube", type: "Survie Extrême", time: "55 min", kcal: 510, level: "Élite", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80", steps: [{ t: "Reptation boueuse", d: "30m de reptation sur sol détrempé.", c: "Quadrupedie", xp: 170 }, { t: "Défense en forêt", d: "Simuler 3 séquences de défense naturelle.", c: "Defense", xp: 140 }, { t: "Sprint d'urgence", d: "500m en sprint maximum sur terrain meuble.", c: "Course", xp: 120 }] },
 // ===== BOIS DE BEAUREGARD =====
        "beauregard-1": {
            title: "Le Parcours Beauregard",
            type: "Forêt Débutant",
            time: "30 min",
            kcal: 280,
            level: "Débutant",
            zone: "Bois de Beauregard",
            img: "https://i.ibb.co/6cKjjJzS/Parc-de-Beauregard-Quinc-1.jpg",
            gps: { lat: 48.1372, lng: -1.6901 },
            steps: [
                {
                    t: "Équilibre : marche sur grand mur",
                    d: "Trouve un grand mur ou muret stable. Monte dessus et marche sur toute sa longueur en gardant l'équilibre. Bras écartés, regard fixé devant toi. Fais 3 allers-retours.",
                    c: "Equilibre",
                    xp: 70,
                    video_id: "Au6klnSQMgY"
                },
                {
                    t: "Courir 2km à une bonne allure",
                    d: "Parcours 2km sur les sentiers du Bois de Beauregard à une allure soutenue mais régulière. Maintiens une respiration contrôlée. Objectif : tenir l'allure sans t'arrêter.",
                    c: "Course",
                    xp: 80,
                    video_id: "hzx_JN3XWz0"
                },
                {
                    t: "Franchissement d'obstacle avec banc ou muret",
                    d: "Repère un banc ou un muret dans le parc. Franchis-le de plusieurs façons : saut à pieds joints, appui d'une main, passage en roulé. 5 franchissements de chaque côté.",
                    c: "Saut",
                    xp: 90,
                    video_id: "G-gz3evrryg"
                },
                {
                    t: "Lancer un bâton à 15/20 mètres",
                    d: "Ramasse un bâton solide d'environ 60cm. Depuis une position stable, lance-le le plus loin possible en visant 15 à 20 mètres. Travaille le geste, la rotation du buste et l'extension du bras. 8 lancers.",
                    c: "Lancer",
                    xp: 85,
                    video_id: "y58V3dTKDpk"
                }
            ]
        }
    }
};

// ==========================================================================
// 2. BASE DE DONNÉES SOCIALE (52 PROFILS FACTICES + MESSAGERIE)
// ==========================================================================
const SOCIAL_DB = {
    // 52 profils d'utilisateurs factices avec avatars, grades et localisations
    profiles: [
        { id: 1,  name: "Léa Martin",          initials: "LM", grade: "L3 STAPS",     location: "Gayeulles", xp: 25800, img: "https://i.pravatar.cc/150?img=47", color: "#a855f7" },
        { id: 2,  name: "Antoine Dubois",       initials: "AD", grade: "M1 STAPS",     location: "Thabor",    xp: 21400, img: "https://i.pravatar.cc/150?img=11", color: "#6b7280" },
        { id: 3,  name: "Marc Bernard",         initials: "MB", grade: "L2 Maths",     location: "St-Martin", xp: 19200, img: "https://i.pravatar.cc/150?img=15", color: "#d97706" },
        { id: 4,  name: "Sophie Girard",        initials: "SG", grade: "L1 Bio",       location: "Apigné",    xp: 18800, img: "https://i.pravatar.cc/150?img=25", color: "#ec4899" },
        { id: 5,  name: "Hugo Lefèvre",         initials: "HL", grade: "L2 INFO",      location: "Campus",    xp: 14200, img: "https://i.pravatar.cc/150?img=13", color: "#3b82f6" },
        { id: 6,  name: "Camille Moreau",       initials: "CM", grade: "M2 Sport",     location: "Gayeulles", xp: 13900, img: "https://i.pravatar.cc/150?img=32", color: "#6366f1" },
        { id: 7,  name: "Julien Petit",         initials: "JP", grade: "L3 Droit",     location: "Thabor",    xp: 12400, img: "https://i.pravatar.cc/150?img=17", color: "#f97316" },
        { id: 8,  name: "Emma Rousseau",        initials: "ER", grade: "L1 STAPS",     location: "Gayeulles", xp: 11200, img: "https://i.pravatar.cc/150?img=44", color: "#14b8a6" },
        { id: 9,  name: "Lucas Simon",          initials: "LS", grade: "M1 Kiné",      location: "Liffré",    xp: 10800, img: "https://i.pravatar.cc/150?img=19", color: "#8b5cf6" },
        { id: 10, name: "Inès Fontaine",        initials: "IF", grade: "L2 STAPS",     location: "Soeuvres",  xp: 10100, img: "https://i.pravatar.cc/150?img=36", color: "#f43f5e" },
        { id: 11, name: "Thomas Laurent",       initials: "TL", grade: "L3 Géo",       location: "St-Martin", xp: 9800,  img: "https://i.pravatar.cc/150?img=20", color: "#0ea5e9" },
        { id: 12, name: "Clara Dupont",         initials: "CD", grade: "M1 STAPS",     location: "Apigné",    xp: 9400,  img: "https://i.pravatar.cc/150?img=38", color: "#22c55e" },
        { id: 13, name: "Mathieu Picard",       initials: "MP", grade: "L2 EPS",       location: "Le Rheu",   xp: 8900,  img: "https://i.pravatar.cc/150?img=22", color: "#f59e0b" },
        { id: 14, name: "Jade Leroy",           initials: "JL", grade: "L1 Bio",       location: "Gayeulles", xp: 8600,  img: "https://i.pravatar.cc/150?img=40", color: "#e879f9" },
        { id: 15, name: "Romain Mercier",       initials: "RM", grade: "L3 STAPS",     location: "Campus",    xp: 8100,  img: "https://i.pravatar.cc/150?img=12", color: "#64748b" },
        { id: 16, name: "Lucie Bonnet",         initials: "LB", grade: "M1 Kiné",      location: "Thabor",    xp: 7800,  img: "https://i.pravatar.cc/150?img=49", color: "#06b6d4" },
        { id: 17, name: "Nicolas Garnier",      initials: "NG", grade: "L2 Maths",     location: "St-Martin", xp: 7400,  img: "https://i.pravatar.cc/150?img=18", color: "#84cc16" },
        { id: 18, name: "Chloé Renard",         initials: "CR", grade: "L1 STAPS",     location: "Apigné",    xp: 7100,  img: "https://i.pravatar.cc/150?img=45", color: "#fb7185" },
        { id: 19, name: "Alexis Morin",         initials: "AM", grade: "L3 INFO",      location: "Liffré",    xp: 6800,  img: "https://i.pravatar.cc/150?img=16", color: "#7c3aed" },
        { id: 20, name: "Manon Blanc",          initials: "MB", grade: "L2 Bio",       location: "Gayeulles", xp: 6500,  img: "https://i.pravatar.cc/150?img=33", color: "#c084fc" },
        { id: 21, name: "Baptiste Simon",       initials: "BS", grade: "M1 EPS",       location: "Campus",    xp: 6200,  img: "https://i.pravatar.cc/150?img=21", color: "#38bdf8" },
        { id: 22, name: "Zoé Gauthier",         initials: "ZG", grade: "L1 STAPS",     location: "Thabor",    xp: 5900,  img: "https://i.pravatar.cc/150?img=41", color: "#fb923c" },
        { id: 23, name: "Tristan Dupuis",       initials: "TD", grade: "L3 EPS",       location: "Le Rheu",   xp: 5600,  img: "https://i.pravatar.cc/150?img=10", color: "#4ade80" },
        { id: 24, name: "Laura Perrin",         initials: "LP", grade: "M2 STAPS",     location: "Soeuvres",  xp: 5400,  img: "https://i.pravatar.cc/150?img=28", color: "#f472b6" },
        { id: 25, name: "Quentin Blanc",        initials: "QB", grade: "L2 Droit",     location: "St-Martin", xp: 5100,  img: "https://i.pravatar.cc/150?img=14", color: "#2dd4bf" },
        { id: 26, name: "Anaïs Fournier",       initials: "AF", grade: "L1 STAPS",     location: "Gayeulles", xp: 4800,  img: "https://i.pravatar.cc/150?img=29", color: "#a78bfa" },
        { id: 27, name: "Arnaud Girard",        initials: "AG", grade: "L3 Bio",       location: "Liffré",    xp: 4500,  img: "https://i.pravatar.cc/150?img=9",  color: "#fbbf24" },
        { id: 28, name: "Pauline Leblanc",      initials: "PL", grade: "M1 STAPS",     location: "Apigné",    xp: 4200,  img: "https://i.pravatar.cc/150?img=30", color: "#60a5fa" },
        { id: 29, name: "Kevin Masson",         initials: "KM", grade: "L2 EPS",       location: "Campus",    xp: 3900,  img: "https://i.pravatar.cc/150?img=8",  color: "#34d399" },
        { id: 30, name: "Julie Faure",          initials: "JF", grade: "L1 Bio",       location: "Thabor",    xp: 3700,  img: "https://i.pravatar.cc/150?img=48", color: "#f87171" },
        { id: 31, name: "Vincent Rousseau",     initials: "VR", grade: "L3 STAPS",     location: "Le Rheu",   xp: 3500,  img: "https://i.pravatar.cc/150?img=7",  color: "#818cf8" },
        { id: 32, name: "Océane Roy",           initials: "OR", grade: "M1 Kiné",      location: "St-Martin", xp: 3300,  img: "https://i.pravatar.cc/150?img=46", color: "#67e8f9" },
        { id: 33, name: "Sébastien Adam",       initials: "SA", grade: "L2 STAPS",     location: "Soeuvres",  xp: 3100,  img: "https://i.pravatar.cc/150?img=6",  color: "#a3e635" },
        { id: 34, name: "Marion Muller",        initials: "MM", grade: "L1 Géo",       location: "Gayeulles", xp: 2900,  img: "https://i.pravatar.cc/150?img=35", color: "#e879f9" },
        { id: 35, name: "Alexandre Brunet",     initials: "AB", grade: "L3 Maths",     location: "Campus",    xp: 2700,  img: "https://i.pravatar.cc/150?img=3",  color: "#94a3b8" },
        { id: 36, name: "Audrey Franck",        initials: "AF", grade: "M2 EPS",       location: "Liffré",    xp: 2500,  img: "https://i.pravatar.cc/150?img=27", color: "#fb7185" },
        { id: 37, name: "Maxime Schmitt",       initials: "MS", grade: "L2 INFO",      location: "Apigné",    xp: 2300,  img: "https://i.pravatar.cc/150?img=4",  color: "#7dd3fc" },
        { id: 38, name: "Caroline Bertrand",    initials: "CB", grade: "L1 STAPS",     location: "Thabor",    xp: 2100,  img: "https://i.pravatar.cc/150?img=26", color: "#f9a8d4" },
        { id: 39, name: "François Leclerc",     initials: "FL", grade: "L3 Droit",     location: "Le Rheu",   xp: 1900,  img: "https://i.pravatar.cc/150?img=2",  color: "#5eead4" },
        { id: 40, name: "Stéphanie Colin",      initials: "SC", grade: "M1 Bio",       location: "St-Martin", xp: 1800,  img: "https://i.pravatar.cc/150?img=43", color: "#fcd34d" },
        { id: 41, name: "Guillaume Lambert",    initials: "GL", grade: "L2 EPS",       location: "Gayeulles", xp: 1600,  img: "https://i.pravatar.cc/150?img=23", color: "#86efac" },
        { id: 42, name: "Nathalie Guérin",      initials: "NG", grade: "L1 STAPS",     location: "Soeuvres",  xp: 1500,  img: "https://i.pravatar.cc/150?img=31", color: "#c4b5fd" },
        { id: 43, name: "Laurent Morel",        initials: "LM", grade: "M2 Kiné",      location: "Liffré",    xp: 1400,  img: "https://i.pravatar.cc/150?img=24", color: "#93c5fd" },
        { id: 44, name: "Anne-Sophie Torres",   initials: "AT", grade: "L3 STAPS",     location: "Apigné",    xp: 1300,  img: "https://i.pravatar.cc/150?img=42", color: "#fda4af" },
        { id: 45, name: "Pierre Roux",          initials: "PR", grade: "L2 Bio",       location: "Campus",    xp: 1200,  img: "https://i.pravatar.cc/150?img=1",  color: "#6ee7b7" },
        { id: 46, name: "Émilie Gonzalez",      initials: "EG", grade: "L1 STAPS",     location: "Thabor",    xp: 1100,  img: "https://i.pravatar.cc/150?img=37", color: "#fdba74" },
        { id: 47, name: "Benoît Christophe",    initials: "BC", grade: "L3 INFO",      location: "Le Rheu",   xp: 1000,  img: "https://i.pravatar.cc/150?img=5",  color: "#d8b4fe" },
        { id: 48, name: "Jennifer Clément",     initials: "JC", grade: "M1 STAPS",     location: "St-Martin", xp: 900,   img: "https://i.pravatar.cc/150?img=34", color: "#99f6e4" },
        { id: 49, name: "Julien Potier",        initials: "JP", grade: "L2 EPS",       location: "Gayeulles", xp: 800,   img: "https://i.pravatar.cc/150?img=55", color: "#cbd5e1" },
        { id: 50, name: "Aurélie Marchand",     initials: "AM", grade: "L1 Géo",       location: "Soeuvres",  xp: 700,   img: "https://i.pravatar.cc/150?img=39", color: "#f0abfc" },
        { id: 51, name: "Christophe Barbier",   initials: "CB", grade: "L3 STAPS",     location: "Liffré",    xp: 600,   img: "https://i.pravatar.cc/150?img=56", color: "#bfdbfe" },
        { id: 52, name: "Sandrine Torres",      initials: "ST", grade: "M2 EPS",       location: "Teillay",   xp: 500,   img: "https://i.pravatar.cc/150?img=50", color: "#fecaca" }
    ],

    // Réponses aléatoires du bot de messagerie (20 réponses pré-définies)
    botReplies: [
        "T'es chaud aujourd'hui ! 💪",
        "Respect, l'algo a tout validé ?",
        "Je vais y aller demain matin !",
        "Tu bats mes records là... 😤",
        "GG ! C'est quoi ton prochain objectif ?",
        "L'algo est plus clément avec toi qu'avec moi 😭",
        "J'aurais pas tenu autant longtemps !",
        "Sérieusement ? T'as fait tout ça en une session ?",
        "On doit faire ça ensemble un de ces jours !",
        "Trop bien ! La météo était parfaite pour ça ?",
        "J'ai raté ma session aujourd'hui, flemme totale...",
        "C'est fou, tu progresses vraiment vite !",
        "Tu as essayé le nouveau parcours là-bas ?",
        "Haha, l'algo est impitoyable avec moi aussi ! 😂",
        "Super ! On se retrouve sur le terrain bientôt ?",
        "Le terrain était boueux ? J'aime bien ça en fait.",
        "Wah, t'es une machine ! 🤖",
        "Moi j'ai fait que 2 ateliers... t'es trop fort·e.",
        "La semaine prochaine j'y retourne, tu viens ?",
        "Génial ! Ton niveau monte à une vitesse folle."
    ],

    // Historique de fausses conversations pré-remplies (5 conversations)
    chatHistory: {
        1: [
            { from: 'them', text: "Salut ! T'as fait les Gayeulles ce matin ?", time: "09:14" },
            { from: 'me', text: "Oui ! Session de grimper, c'était brutal.", time: "09:16" },
            { from: 'them', text: "L'algo a validé ta posture du premier coup ?", time: "09:17" },
            { from: 'me', text: "À la 2ème prise seulement 😅", time: "09:18" },
            { from: 'them', text: "Haha pareil pour moi ! Je suis à 25k XP, t'en es où ?", time: "09:20" }
        ],
        3: [
            { from: 'them', text: "Yo ! T'as vu le nouveau parcours à St-Martin ?", time: "Hier" },
            { from: 'me', text: "Pas encore, c'est bien ?", time: "Hier" },
            { from: 'them', text: "Intense ! Portage lourd sur 1km, les jambes flambent.", time: "Hier" },
            { from: 'me', text: "Je tente ça ce week-end !", time: "Hier" }
        ],
        5: [
            { from: 'them', text: "Salut ! Je vous vois souvent au Campus, t'es en INFO ?", time: "Lun." },
            { from: 'me', text: "Pas exactement mais j'entraîne là-bas oui !", time: "Lun." },
            { from: 'them', text: "Cool, on peut faire une session ensemble ?", time: "Lun." },
            { from: 'them', text: "Les tractions sur barre, j'ai besoin de motivation 😅", time: "Lun." }
        ],
        9: [
            { from: 'them', text: "La Forêt de Liffré c'est ouf ! Jamais fait un truc aussi dur.", time: "Mar." },
            { from: 'me', text: "C'est loin mais ça vaut le déplacement non ?", time: "Mar." },
            { from: 'them', text: "Totalement. 650 kcal en une session c'est du jamais vu pour moi.", time: "Mar." }
        ],
        16: [
            { from: 'them', text: "T'as essayé Le Tour du Thabor Express ? C'est parfait pour débuter.", time: "Mer." },
            { from: 'me', text: "Je suis plus niveau débutant mais merci 😄", time: "Mer." },
            { from: 'them', text: "Ahah t'as raison, on le fait ensemble alors ? Pour la coach 😉", time: "Mer." }
        ]
    }
};

// ==========================================================================
// 3. GESTIONNAIRE D'ÉTAT & MÉMOIRE LOCALE
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
            { id: 'stmartin', name: 'St-Martin', coords: [48.127, -1.682] },
            // Nouvelles zones forestières autour de Rennes
            { id: 'soeuvres', name: 'Bois de Soeuvres', coords: [48.090, -1.740] },
            { id: 'rheu', name: 'Bois du Rheu', coords: [48.069, -1.793] },
            { id: 'lifre', name: 'Forêt de Liffré', coords: [48.212, -1.512] },
            { id: 'teillay', name: 'Forêt de Teillay', coords: [47.968, -1.501] }
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
             const profile = SOCIAL_DB.profiles[i % SOCIAL_DB.profiles.length];
            const m = L.marker([lat, lng], {icon: pin}).addTo(this.map);
            m.on('click', () => MapProfiles.showProfile(profile));
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

// Aperçu messages sur la home
            setTimeout(() => {
                const container = document.getElementById('home-messages-preview');
                if (!container || !SOCIAL_DB) return;
                const preview = SOCIAL_DB.profiles.slice(0, 3);
                container.innerHTML = preview.map(p => `
                    <div onclick="App.nav('view-social', document.getElementById('nav-social')); setTimeout(()=>{ App.switchSocialTab('messages'); if(window.Messaging) Messaging.openChat(${p.id}); }, 200)"
                         class="flex items-center gap-3 p-3 rounded-2xl bg-gray-800/50 cursor-pointer active:scale-95 transition-transform mb-2">
                        <img src="${p.img}" class="w-10 h-10 rounded-full object-cover border border-white-10"
                             onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(p.initials)}&background=333&color=fff'">
                        <div class="flex-1 min-w-0">
                            <div class="font-bold text-white text-sm">${p.name}</div>
                            <div class="text-xs text-gray-500 truncate">${p.grade} • ${p.location}</div>
                        </div>
                        <span class="w-2 h-2 rounded-full bg-volt flex-shrink-0"></span>
                    </div>
                `).join('');
            }, 2200);

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
        // Support de 3 onglets : feed, leaderboard, messages
        ['feed', 'leaderboard', 'messages'].forEach(t => {
            const btn = document.getElementById(`btn-soc-${t}`);
            const content = document.getElementById(`social-content-${t}`);
            if(btn) { btn.classList.replace('bg-white', 'bg-transparent'); btn.classList.replace('text-black', 'text-gray-500'); }
            if(content) { content.classList.remove('block'); content.classList.add('hidden'); }
        });
        const actBtn = document.getElementById(`btn-soc-${id}`);
        const actContent = document.getElementById(`social-content-${id}`);
        if(actBtn) { actBtn.classList.replace('bg-transparent', 'bg-white'); actBtn.classList.replace('text-gray-500', 'text-black'); }
        if(actContent) { actContent.classList.remove('hidden'); actContent.classList.add('block'); actContent.style.animation = 'none'; actContent.offsetHeight; actContent.style.animation = null; }
        // Initialise la messagerie quand l'onglet Messages est activé
        if (id === 'messages') setTimeout(() => Messaging.renderInbox(), 50);
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
    if(chk) chk.innerHTML = r.steps.map((s, i) => `
        <div class="relative flex items-start gap-3 bg-gray-900 border border-white-10 rounded-2xl p-4 mb-3">
            <div class="w-7 h-7 rounded-full bg-volt/10 border border-volt/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-volt font-black text-xs">${i + 1}</span>
            </div>
            <div class="flex-1 min-w-0">
                <strong class="text-base font-bold text-white block mb-1">${s.t}</strong>
                <span class="text-sm text-gray-400 leading-relaxed">${s.d}</span>
                <div class="flex items-center gap-2 mt-2">
                    <span class="text-xs font-bold text-volt bg-volt/10 border border-volt/20 px-2 py-1 rounded-full">+${s.xp} XP</span>
                    <span class="text-xs text-gray-500 uppercase font-bold tracking-wide">${s.c}</span>
                </div>
            </div>
            ${s.video_id ? `
                <button class="step-video-btn flex-shrink-0"
                    onclick="VideoPlayer.open('${s.video_id}', '${s.t.replace(/'/g, "&#39;")}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="black"><path d="M8 5v14l11-7z"/></svg>
                </button>
            ` : ''}
        </div>
    `).join('');
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

    // Lancer automatiquement la vidéo de la première étape
    const firstStep = this.session.route.steps[0];
    if (firstStep && firstStep.video_id && window.VideoPlayer) {
        setTimeout(() => {
            VideoPlayer.open(firstStep.video_id, firstStep.t);
        }, 800);
    }
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
        if (!this.session.route) return;
        if (window.VideoPlayer) VideoPlayer.close();
        this.session.step++;
        if (this.session.step >= this.session.route.steps.length) {
            this.concludeSession();
            return;
        }
        this.updateSessionUI();
        const newStep = this.session.route.steps[this.session.step];
        if (newStep && newStep.video_id && window.VideoPlayer) {
            setTimeout(() => {
                VideoPlayer.open(newStep.video_id, newStep.t);
            }, 600);
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

// ==========================================================================
// 8. RÉSEAU SOCIAL — FIL D'ACTUALITÉ DYNAMIQUE & SYSTÈME DE LIKES
// Pourquoi : crée une vraie dynamique communautaire autour des parcours
// ==========================================================================
class Social {
    // Stockage persistant des posts likés
    static likedPosts = new Set(JSON.parse(localStorage.getItem('hm_liked') || '[]'));

    // Génère les posts dynamiques du fil d'actualité depuis SOCIAL_DB
    static getFeedPosts() {
        return [
            { id: 'p1', userId: 3,  text: "Grosse session à St-Martin aujourd'hui. Portage de roche + grimper. 🌲 L'algo était intransigeant mais j'ai tout validé !", img: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80", likes: 67, time: "Il y a 1h", comments: [{ userId: 1, text: "Wow ! La section portage de St-Martin est brutale 💪" }, { userId: 4, text: "J'y vais demain, je vais essayer de battre ça !" }] },
            { id: 'p2', userId: 9,  text: "Première fois à la Forêt de Liffré. 75 min d'entraînement nordique, 660 kcal. Le terrain est parfait pour le trail extrême ⚡", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80", likes: 44, time: "Il y a 3h", comments: [{ userId: 8, text: "C'est loin de Rennes mais ça vaut largement le déplacement !" }, { userId: 2, text: "Je savais pas qu'on pouvait y aller avec l'app !" }] },
            { id: 'p3', userId: 4,  text: "Session quadrupedie à Apigné sur les berges. Slippery terrain = double XP de fun 😂 L'algo a validé... la 4ème fois 🙈", img: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80", likes: 31, time: "Il y a 5h", comments: [{ userId: 7, text: "La 4ème fois ahahah 😂 l'algo sans pitié !" }] },
            { id: 'p4', userId: 16, text: "Qui veut faire le Thabor demain matin à 7h ? Je cherche un binôme pour l'escalier de l'enfer 🔥 L'ambiance matinale est incredible.", img: null, likes: 18, time: "Il y a 6h", comments: [{ userId: 22, text: "Je suis dispo ! On se retrouve à l'entrée ?" }, { userId: 5, text: "J'aurais voulu mais j'ai cours tôt... 😔" }] },
            { id: 'p5', userId: 10, text: "Découverte du Bois de Soeuvres aujourd'hui ! Complètement oublié de tous, des sentiers incroyables pour la quadrupedie. 🍃", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80", likes: 89, time: "Il y a 8h", comments: [{ userId: 6, text: "J'avais même pas entendu parler de cet endroit ! Coordonnées ?" }, { userId: 12, text: "Je mets ça dans ma liste pour le week-end !" }, { userId: 19, text: "Tu m'envoies les détails du parcours STP ?" }] },
            { id: 'p6', userId: 24, text: "Record personnel : 3 sessions consécutives cette semaine ! Mon streak est à 7 jours. La discipline ça paye vraiment ⚡💪", img: null, likes: 112, time: "Hier", comments: [{ userId: 1, text: "7 jours de streak c'est massif, bravo !! 🔥" }, { userId: 3, text: "Je vais finir par te rejoindre au classement à ce rythme 😤" }, { userId: 8, text: "Mon record c'est 4 jours... t'es un boss 👑" }] }
        ];
    }

    // Affiche les posts dynamiques dans le conteneur dédié
    static renderFeed() {
        const container = document.getElementById('dynamic-feed-posts');
        if (!container) return;
        const posts = this.getFeedPosts();

        container.innerHTML = posts.map(post => {
            const profile = SOCIAL_DB.profiles.find(p => p.id === post.userId);
            if (!profile) return '';
            const isLiked = this.likedPosts.has(post.id);
            const likeCount = post.likes + (isLiked ? 1 : 0);

            const commentsHtml = post.comments.map(c => {
                const cp = SOCIAL_DB.profiles.find(p => p.id === c.userId);
                if (!cp) return '';
                return `<div class="flex gap-3">
                    <div class="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center font-black text-white text-[9px] overflow-hidden" style="background:${cp.color};">
                        <img src="${cp.img}" class="w-full h-full object-cover" onerror="this.style.display='none';this.parentNode.innerText='${cp.initials}'">
                    </div>
                    <div class="flex flex-col"><span class="font-bold text-xs text-white">${cp.name}</span><span class="text-xs text-gray-400">${c.text}</span></div>
                </div>`;
            }).join('');

            return `<div class="w-full bg-gray-900/80 backdrop-blur-md rounded-[32px] p-6 border border-white-10 shadow-lg">
                <div class="flex items-center justify-between mb-5">
                    <div class="flex items-center gap-4">
                        <div class="w-14 h-14 rounded-full overflow-hidden border-2 flex-shrink-0 flex items-center justify-center font-black text-white text-lg" style="border-color:${profile.color};background:${profile.color}22;">
                            <img src="${profile.img}" class="w-full h-full object-cover" onerror="this.style.display='none';this.parentNode.innerText='${profile.initials}'">
                        </div>
                        <div class="flex flex-col">
                            <span class="font-bold text-base text-white">${profile.name}</span>
                            <span class="text-xs text-gray-500 font-bold tracking-widest uppercase mt-1"><i class="fas fa-map-marker-alt mr-1" style="color:${profile.color}"></i>${profile.location} • ${profile.time}</span>
                        </div>
                    </div>
                    <button class="text-xs font-bold text-gray-500 px-3 py-1.5 rounded-full border border-white-10 hover:bg-gray-800 transition-colors" onclick="Messaging.openChat(${profile.id}); App.switchSocialTab('messages');">Message</button>
                </div>
                <p class="text-base font-medium leading-relaxed mb-5 text-gray-300">${post.text}</p>
                ${post.img ? `<div class="w-full h-64 rounded-[24px] bg-gray-800 overflow-hidden mb-5 border border-white-5 shadow-inner"><img src="${post.img}" class="w-full h-full object-cover"></div>` : ''}
                <div class="flex items-center gap-6 pt-3 border-t border-white-5 mb-5">
                    <button class="flex items-center gap-2 font-bold text-base transition-all active:scale-90" onclick="Social.toggleLike('${post.id}', ${post.likes})" id="like-btn-${post.id}">
                        <i class="fas fa-heart text-xl transition-all" id="like-heart-${post.id}" style="color:${isLiked ? '#ef4444' : '#737373'};"></i>
                        <span id="like-count-${post.id}" style="color:${isLiked ? '#ef4444' : '#737373'}">${likeCount}</span>
                    </button>
                </div>
                ${commentsHtml ? `<div class="flex flex-col gap-3 bg-gray-800/50 rounded-3xl p-4 border border-white-5">${commentsHtml}</div>` : ''}
            </div>`;
        }).join('');
    }

    // Toggle like avec animation et persistance localStorage
    static toggleLike(postId, baseLikes) {
        const countEl = document.getElementById(`like-count-${postId}`);
        const heartEl = document.getElementById(`like-heart-${postId}`);
        if (!countEl || !heartEl) return;

        const wasLiked = this.likedPosts.has(postId);
        if (wasLiked) {
            this.likedPosts.delete(postId);
            countEl.textContent = baseLikes;
            heartEl.style.color = '#737373';
            countEl.style.color = '#737373';
        } else {
            this.likedPosts.add(postId);
            countEl.textContent = baseLikes + 1;
            heartEl.style.color = '#ef4444';
            countEl.style.color = '#ef4444';
            heartEl.style.transform = 'scale(1.5)';
            setTimeout(() => { heartEl.style.transform = 'scale(1)'; }, 300);
        }
        heartEl.style.transition = 'transform 0.3s var(--spring), color 0.2s';
        localStorage.setItem('hm_liked', JSON.stringify([...this.likedPosts]));
    }
}

// ==========================================================================
// 9. SYSTÈME DE MESSAGERIE — INBOX + CHAT + BOT AUTO-RÉPONDEUR
// Pourquoi : crée de l'engagement entre utilisateurs et valorise les parcours
// ==========================================================================
class Messaging {
    static currentChatUserId = null;
    static conversations = JSON.parse(localStorage.getItem('hm_convs') || '{}');

    // Initialise les conversations depuis l'historique factice pré-rempli
    static init() {
        Object.keys(SOCIAL_DB.chatHistory).forEach(userId => {
            const id = parseInt(userId);
            if (!this.conversations[id]) {
                this.conversations[id] = [...SOCIAL_DB.chatHistory[id]];
            }
        });
    }

    // Affiche la liste des conversations (inbox)
    static renderInbox() {
        const container = document.getElementById('messaging-inbox-list');
        if (!container) return;

        // Priorité aux contacts avec historique, puis autres profils
        const withHistory = Object.keys(SOCIAL_DB.chatHistory).map(Number);
        const priority = SOCIAL_DB.profiles.filter(p => withHistory.includes(p.id));
        const others = SOCIAL_DB.profiles.filter(p => !withHistory.includes(p.id)).slice(0, 10);
        const displayed = [...priority, ...others];

        container.innerHTML = displayed.map(profile => {
            const conv = this.conversations[profile.id] || SOCIAL_DB.chatHistory[profile.id] || [];
            const lastMsg = conv[conv.length - 1];
            const preview = lastMsg ? lastMsg.text.substring(0, 38) + (lastMsg.text.length > 38 ? '...' : '') : 'Commencer une conversation...';
            const timeLabel = lastMsg ? lastMsg.time : '';

            return `<button class="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-800 active:scale-95 transition-all text-left border border-transparent hover:border-white-5" onclick="Messaging.openChat(${profile.id})">
                <div class="w-14 h-14 rounded-full overflow-hidden border-2 flex-shrink-0 flex items-center justify-center font-black text-white text-lg relative" style="border-color:${profile.color};background:${profile.color}22;">
                    <img src="${profile.img}" class="w-full h-full object-cover" onerror="this.style.display='none'">
                    <span class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-gray-900"></span>
                </div>
                <div class="flex flex-col flex-1 min-w-0">
                    <div class="flex items-center justify-between mb-1">
                        <span class="font-bold text-white text-base">${profile.name}</span>
                        <span class="text-[10px] text-gray-500 font-medium flex-shrink-0 ml-2">${timeLabel}</span>
                    </div>
                    <span class="text-sm text-gray-400 truncate">${preview}</span>
                </div>
            </button>`;
        }).join('');
    }

    // Ouvre le chat avec un profil spécifique
    static openChat(userId) {
        this.currentChatUserId = userId;
        const profile = SOCIAL_DB.profiles.find(p => p.id === userId);
        if (!profile) return;

        if (!this.conversations[userId]) {
            this.conversations[userId] = SOCIAL_DB.chatHistory[userId] ? [...SOCIAL_DB.chatHistory[userId]] : [];
        }

        const inboxEl = document.getElementById('messaging-inbox');
        const chatEl = document.getElementById('messaging-chat');
        if (inboxEl) inboxEl.style.display = 'none';
        if (chatEl) chatEl.style.display = 'flex';

        App.setText('chat-user-name', profile.name);
        App.setText('chat-user-grade', profile.grade + ' • ' + profile.location);
        const avatarEl = document.getElementById('chat-user-avatar');
        if (avatarEl) { avatarEl.src = profile.img; avatarEl.style.borderColor = profile.color; }

        this.renderChat(userId);
    }

    // Ferme le chat et revient à la liste
    static closeChat() {
        const inboxEl = document.getElementById('messaging-inbox');
        const chatEl = document.getElementById('messaging-chat');
        if (inboxEl) inboxEl.style.display = '';
        if (chatEl) chatEl.style.display = 'none';
        this.currentChatUserId = null;
        this.renderInbox();
    }

    // Envoie un message et déclenche la réponse bot après délai
    static sendMessage(text) {
        if (!text || !text.trim() || !this.currentChatUserId) return;
        const userId = this.currentChatUserId;
        if (!this.conversations[userId]) this.conversations[userId] = [];

        const now = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        this.conversations[userId].push({ from: 'me', text: text.trim(), time: now });
        this.saveConversations();
        this.renderChat(userId);

        const input = document.getElementById('chat-input');
        if (input) input.value = '';

        // Le bot répond après un délai aléatoire (1.2s - 3s)
        const delay = 1200 + Math.random() * 1800;
        const typingEl = document.getElementById('chat-typing');
        if (typingEl) { typingEl.style.display = 'flex'; }
        setTimeout(() => {
            if (typingEl) typingEl.style.display = 'none';
            const response = this.getBotResponse(text, userId);
            const replyTime = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            this.conversations[userId].push({ from: 'them', text: response, time: replyTime });
            this.saveConversations();
            this.renderChat(userId);
            const profile = SOCIAL_DB.profiles.find(p => p.id === userId);
            if (profile) DynamicIsland.show(profile.name, response.substring(0, 35) + (response.length > 35 ? '...' : ''), 'comment');
        }, delay);
    }

    // Génère une réponse contextuelle ou aléatoire selon le message envoyé
    static getBotResponse(message, userId) {
        const msg = message.toLowerCase();
        const profile = SOCIAL_DB.profiles.find(p => p.id === userId);

        if (msg.includes('gayeulles') || msg.includes('forêt') || msg.includes('foret') || msg.includes('soeuvres') || msg.includes('liffré') || msg.includes('rheu') || msg.includes('teillay')) {
            const r = ["Les forêts de Rennes sont incroyables ! 🌲 Mon terrain préféré.", `${profile?.location} c'est excellent pour l'Hébert, j'y vais souvent !`, "Ouais c'est mon terrain de prédilection, la section grimper est top !"]; return r[Math.floor(Math.random() * r.length)];
        }
        if (msg.includes('xp') || msg.includes('level') || msg.includes('niveau')) {
            return `Moi je suis à ${((profile?.xp || 5000) / 1000).toFixed(1)}k XP ! Tu me rattrapes ? 😤`;
        }
        if (msg.includes('session') || msg.includes('entraînement') || msg.includes('training') || msg.includes('parcours')) {
            const r = ["Super session ! L'algo a été sympa avec toi ? 😂", "Respect ! Moi j'ai skippé aujourd'hui, trop fatigué...", "Tu as fait combien d'ateliers en tout ?"]; return r[Math.floor(Math.random() * r.length)];
        }
        if (msg.includes('kcal') || msg.includes('calorie')) return "Woooh, t'as tout cramé ! Faut se ravitailler en tartines maintenant 🥪";
        if (msg.includes('salut') || msg.includes('bonjour') || msg.includes('coucou') || msg.includes('yo') || msg.includes('hello')) {
            return `Salut ${Store.data.profile.name.split(' ')[0]} ! 👋 Tu vas t'entraîner aujourd'hui ?`;
        }
        if (msg.includes('gg') || msg.includes('bravo') || msg.includes('félicitations') || msg.includes('top')) return "Merci ! Et toi, tu as fait une session récemment ? 💪";
        if (msg.includes('météo') || msg.includes('pluie') || msg.includes('temps')) return "La pluie ça donne +20% XP ! Perso j'adore m'entraîner sous les averses bretonnes. 🌧️";
        if (msg.includes('?')) {
            const r = ["Bonne question ! Demande à l'algo 😄", "Franchement j'en sais rien, faut tester !", "Je pense que oui, mais reste prudent·e !"]; return r[Math.floor(Math.random() * r.length)];
        }
        return SOCIAL_DB.botReplies[Math.floor(Math.random() * SOCIAL_DB.botReplies.length)];
    }

    // Affiche les bulles de messages dans la vue chat
    static renderChat(userId) {
        const container = document.getElementById('chat-messages');
        if (!container) return;
        const conversation = this.conversations[userId] || [];
        container.innerHTML = conversation.map(msg => {
            const isMe = msg.from === 'me';
            return `<div class="flex ${isMe ? 'justify-end' : 'justify-start'} mb-2">
                <div class="max-w-[78%] ${isMe ? 'bg-volt text-black' : 'bg-gray-800 text-white border border-white-5'} rounded-[20px] ${isMe ? 'rounded-br-md' : 'rounded-bl-md'} px-4 py-3 shadow-sm">
                    <p class="text-sm font-medium leading-relaxed">${msg.text}</p>
                    <span class="text-[10px] ${isMe ? 'text-black/50' : 'text-gray-500'} font-bold mt-1 block text-right">${msg.time}</span>
                </div>
            </div>`;
        }).join('');
        container.scrollTop = container.scrollHeight;
    }

    static saveConversations() { localStorage.setItem('hm_convs', JSON.stringify(this.conversations)); }
}

// ==========================================================================
// 10. SYSTÈME DE RECHERCHE AVANCÉE — FILTRAGE EN TEMPS RÉEL
// Pourquoi : améliore massivement la découverte des parcours (19 routes !)
// ==========================================================================
class Search {
    // Filtre les parcours en temps réel selon la saisie utilisateur
    static filter(query) {
        const q = query.toLowerCase().trim();
        const searchResults = document.getElementById('search-results');
        const parkSection = document.getElementById('parks-section');
        const clearBtn = document.getElementById('search-clear-btn');
        if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';

        if (!q) {
            if (searchResults) searchResults.classList.add('hidden');
            if (parkSection) parkSection.classList.remove('hidden');
            return;
        }
        if (parkSection) parkSection.classList.add('hidden');
        if (searchResults) searchResults.classList.remove('hidden');

        // Cherche dans tous les parcours (titre, type, niveau, familles)
        const matches = Object.keys(DB.routes).filter(id => {
            const r = DB.routes[id];
            return r.title.toLowerCase().includes(q) || r.type.toLowerCase().includes(q) ||
                   r.level.toLowerCase().includes(q) || r.steps.some(s => s.c && s.c.toLowerCase().includes(q));
        }).map(id => ({ id, ...DB.routes[id] }));

        if (matches.length === 0) {
            searchResults.innerHTML = `<div class="text-center py-10 text-gray-500"><i class="fas fa-search text-3xl mb-4 block opacity-30"></i><p class="font-bold">Aucun parcours pour "${query}"</p><p class="text-sm mt-2 font-medium">Essayez : forêt, grimper, Élite, Course…</p></div>`;
            return;
        }

        const levelColor = l => l === 'Élite' ? '#ef4444' : l === 'Intense' ? '#f97316' : l === 'Débutant' ? '#22c55e' : '#a3a3a3';
        searchResults.innerHTML = `<p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">${matches.length} parcours trouvé${matches.length > 1 ? 's' : ''}</p>` +
            matches.map(r => `<div class="w-full bg-gray-900/80 backdrop-blur-md rounded-[24px] p-4 border border-white-10 cursor-pointer active:scale-95 transition-transform shadow-md flex gap-4 items-center mb-3" onclick="App.openRoutePreview('${r.id}')">
                <img src="${r.img}" class="w-16 h-16 rounded-[16px] object-cover flex-shrink-0 border border-white-5">
                <div class="flex flex-col flex-1 min-w-0">
                    <h4 class="font-bold text-white text-base truncate">${r.title}</h4>
                    <p class="text-xs font-bold mt-1 uppercase tracking-wide" style="color:var(--volt)">${r.type}</p>
                    <div class="flex items-center gap-3 mt-1.5 text-xs font-bold text-gray-400">
                        <span><i class="fas fa-stopwatch mr-1"></i>${r.time}</span>
                        <span><i class="fas fa-fire mr-1"></i>${r.kcal} kcal</span>
                        <span style="color:${levelColor(r.level)}">${r.level}</span>
                    </div>
                </div>
                <i class="fas fa-chevron-right text-gray-600 text-sm flex-shrink-0"></i>
            </div>`).join('');
    }

    static clearSearch() {
        const input = document.getElementById('explore-search');
        if (input) input.value = '';
        this.filter('');
    }
}

// ==========================================================================
// 11. SYSTÈME DE BADGES — RÉCOMPENSES VISUELLES DÉBLOQUABLES
// Pourquoi : gamification renforcée, motive à diversifier les entraînements
// ==========================================================================
const BADGES_DB = [
    { id: 'first-session', icon: 'fa-star',           name: 'Première Mission',   desc: 'Complétez votre 1ère session',       color: '#ccff00', condition: s => s.stats.parks >= 1 },
    { id: 'hydration',     icon: 'fa-tint',            name: 'Hydro-Pro',          desc: 'Atteignez 3L d\'eau en une journée', color: '#3b82f6', condition: s => s.stats.water >= 3 },
    { id: 'nomade',        icon: 'fa-tree',            name: 'Nomade Forestier',   desc: 'Visitez 5 zones différentes',        color: '#22c55e', condition: s => s.stats.parks >= 5 },
    { id: 'kcal1k',        icon: 'fa-fire',            name: 'Incendiaire',        desc: 'Brûlez 1000 kcal au total',          color: '#ef4444', condition: s => s.stats.kcal >= 1000 },
    { id: 'level5',        icon: 'fa-bolt',            name: 'CEO Niveau 5',       desc: 'Atteignez le niveau 5',              color: '#f97316', condition: s => s.level >= 5 },
    { id: 'actionist',     icon: 'fa-dumbbell',        name: 'Actionniste',        desc: 'Complétez 20 ateliers',              color: '#a855f7', condition: s => s.stats.actions >= 20 },
    { id: 'grimper',       icon: 'fa-mountain',        name: 'Grimpeur Pro',       desc: 'Maîtrisez Grimper (x10)',            color: '#14b8a6', condition: s => (s.skills.Grimper || 0) >= 10 },
    { id: 'streak7',       icon: 'fa-calendar-check',  name: 'Semaine de Feu',     desc: 'Série de 7 jours consécutifs',       color: '#f59e0b', condition: s => s.streak >= 7 }
];

class Badges {
    static getEarned() { return BADGES_DB.filter(b => b.condition(Store.data)); }

    // Rendu visuel de tous les badges (débloqués + verrouillés en grisé)
    static renderBadges() {
        const container = document.getElementById('badges-container');
        if (!container) return;
        const earned = new Set(this.getEarned().map(b => b.id));
        container.innerHTML = BADGES_DB.map(badge => {
            const unlocked = earned.has(badge.id);
            return `<div class="flex flex-col items-center gap-2 cursor-pointer active:scale-90 transition-transform" onclick="DynamicIsland.show('${badge.name}', '${badge.desc}', '${badge.icon.replace('fa-', '')}')">
                <div class="w-16 h-16 rounded-[20px] flex items-center justify-center text-2xl shadow-lg transition-all ${unlocked ? '' : 'opacity-20 grayscale'}" style="background:${badge.color}22;border:2px solid ${unlocked ? badge.color : '#333'};">
                    <i class="fas ${badge.icon}" style="color:${badge.color}"></i>
                </div>
                <span class="text-[9px] font-bold text-center leading-tight ${unlocked ? 'text-white' : 'text-gray-600'}" style="max-width:64px;">${badge.name}</span>
            </div>`;
        }).join('');
    }
}

// ==========================================================================
// 12. DÉFI QUOTIDIEN — CHALLENGE ALÉATOIRE AVEC COMPTE À REBOURS
// Pourquoi : crée un rituel journalier qui booste l'engagement quotidien
// ==========================================================================
const DAILY_CHALLENGES = [
    { icon: 'fa-running',       title: '1 Minute de Sprint',     desc: 'Courez le plus vite possible pendant 60 secondes. Tout terrain valide.', xp: 150, duration: 60 },
    { icon: 'fa-street-view',   title: '2min de Gainage',        desc: 'Position de planche, dos plat, respiration maîtrisée. 2 minutes.', xp: 120, duration: 120 },
    { icon: 'fa-dumbbell',      title: '20 Pompes Explosives',   desc: 'Pompes avec clap au sommet, explosivité maximale sur chaque rep.', xp: 130, duration: 120 },
    { icon: 'fa-horse-head',    title: '30 Squats Profonds',     desc: 'Cuisses parallèles au sol, descent lente (3s), remontée explosive.', xp: 110, duration: 90 },
    { icon: 'fa-mountain',      title: 'Grimper 5min',          desc: 'Trouvez un arbre ou une structure et grimpez en continu 5 minutes.', xp: 200, duration: 300 },
    { icon: 'fa-water',         title: 'Boire 1L Maintenant',   desc: 'Hydratation d\'urgence : boire 1 litre d\'eau sur les 20 prochaines minutes.', xp: 80, duration: 20 * 60 }
];

class DailyChallenge {
    static timer = null;
    static timeLeft = 0;
    static isRunning = false;

    // Récupère le défi du jour (change chaque jour grâce à la date)
    static getTodayChallenge() {
        const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
        return DAILY_CHALLENGES[dayOfYear % DAILY_CHALLENGES.length];
    }

    // Met à jour l'affichage de la carte de défi quotidien
    static renderCard() {
        const titleEl = document.getElementById('daily-challenge-title');
        const descEl = document.getElementById('daily-challenge-desc');
        const xpEl = document.getElementById('daily-challenge-xp');
        const iconEl = document.getElementById('daily-challenge-icon');
        const challenge = this.getTodayChallenge();
        if (titleEl) titleEl.textContent = challenge.title;
        if (descEl) descEl.textContent = challenge.desc;
        if (xpEl) xpEl.textContent = '+' + challenge.xp + ' XP';
        if (iconEl) { iconEl.className = 'fas ' + challenge.icon + ' text-3xl'; }
    }

    // Lance le compte à rebours du défi
    static startTimer() {
        const challenge = this.getTodayChallenge();
        if (this.isRunning) { this.stopTimer(); return; }
        this.isRunning = true;
        this.timeLeft = challenge.duration;
        const btn = document.getElementById('daily-challenge-btn');
        if (btn) btn.textContent = 'STOPPER';

        this.timer = setInterval(() => {
            this.timeLeft--;
            const timerEl = document.getElementById('daily-challenge-timer');
            if (timerEl) {
                const m = Math.floor(this.timeLeft / 60);
                const s = this.timeLeft % 60;
                timerEl.textContent = `${m > 0 ? m + 'm ' : ''}${s}s`;
                timerEl.style.display = 'block';
            }
            if (this.timeLeft <= 0) {
                this.stopTimer();
                Store.data.xp += challenge.xp;
                Store.save();
                App.refreshUI();
                DynamicIsland.show('Défi Quotidien', `+${challenge.xp} XP ! Mission accomplie.`, 'trophy');
                const timerEl = document.getElementById('daily-challenge-timer');
                if (timerEl) timerEl.textContent = '✓ Complété !';
                const btn = document.getElementById('daily-challenge-btn');
                if (btn) { btn.textContent = 'COMPLÉTÉ ✓'; btn.disabled = true; btn.style.opacity = '0.5'; }
            }
        }, 1000);
        DynamicIsland.show('Défi Quotidien', 'Compte à rebours lancé. En avant !', 'stopwatch');
    }

    static stopTimer() {
        if (this.timer) clearInterval(this.timer);
        this.isRunning = false;
        this.timer = null;
        const btn = document.getElementById('daily-challenge-btn');
        if (btn && btn.textContent !== 'COMPLÉTÉ ✓') btn.textContent = 'RELANCER';
    }
}
// VideoPlayer — Modal YouTube pour les étapes avec vidéo
const VideoPlayer = {
    open(videoId, title) {
        const existing = document.getElementById('video-modal-overlay');
        if (existing) existing.remove();
 
        const overlay = document.createElement('div');
        overlay.id = 'video-modal-overlay';
        overlay.style.cssText = [
            'position:fixed', 'inset:0', 'z-index:99999',
            'background:rgba(0,0,0,0.93)', 'backdrop-filter:blur(14px)',
            'display:flex', 'flex-direction:column',
            'align-items:center', 'justify-content:center',
            'padding:24px', 'animation:fadeInModal 0.2s ease'
        ].join(';');
 
        overlay.addEventListener('click', (e) => { if (e.target === overlay) VideoPlayer.close(); });
 
        const titleEl = document.createElement('div');
        titleEl.style.cssText = 'color:white;font-weight:900;font-size:15px;margin-bottom:14px;text-align:center;max-width:320px;line-height:1.3';
        titleEl.textContent = title;
 
        const iframeWrap = document.createElement('div');
        iframeWrap.style.cssText = [
            'width:100%', 'max-width:340px',
            'aspect-ratio:9/16',
            'border-radius:20px', 'overflow:hidden',
            'border:1.5px solid rgba(204,255,0,0.3)',
            'box-shadow:0 0 40px rgba(204,255,0,0.15)',
            'background:#000'
        ].join(';');
 
        const iframe = document.createElement('iframe');
iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&mute=1&controls=0`;        iframe.style.cssText = 'width:100%;height:100%;border:none';
        iframe.allow = 'autoplay; fullscreen';
        iframeWrap.appendChild(iframe);
 
        const closeBtn = document.createElement('button');
        closeBtn.style.cssText = [
            'margin-top:18px',
            'background:rgba(255,255,255,0.1)',
            'border:1px solid rgba(255,255,255,0.2)',
            'color:white', 'font-weight:800',
            'padding:12px 32px', 'border-radius:100px',
            'font-size:13px', 'cursor:pointer',
            'letter-spacing:0.05em', 'width:100%',
            'max-width:340px'
        ].join(';');
        closeBtn.textContent = '✕  FERMER';
        closeBtn.addEventListener('click', () => VideoPlayer.close());
 
        overlay.appendChild(titleEl);
        overlay.appendChild(iframeWrap);
        overlay.appendChild(closeBtn);
        document.body.appendChild(overlay);
    },
 
    close() {
        const overlay = document.getElementById('video-modal-overlay');
        if (overlay) {
            const iframe = overlay.querySelector('iframe');
            if (iframe) iframe.src = '';
            overlay.remove();
        }
    }
};
 
// GeoBeauregard — Géolocalisation vers le Bois de Beauregard
const GeoBeauregard = {
    destination: { lat: 48.1372, lng: -1.6901 },
 
    haversine(lat1, lon1, lat2, lon2) {
        const R = 6371000;
        const φ1 = lat1 * Math.PI / 180, φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(Δφ/2)**2 + Math.cos(φ1)*Math.cos(φ2)*Math.sin(Δλ/2)**2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    },
 
    showModal() {
        const existing = document.getElementById('geo-modal-overlay');
        if (existing) existing.remove();
 
        const overlay = document.createElement('div');
        overlay.id = 'geo-modal-overlay';
        overlay.style.cssText = 'position:fixed;inset:0;z-index:99998;background:rgba(0,0,0,0.94);backdrop-filter:blur(16px);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:28px';
        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
 
        overlay.innerHTML = `
            <div style="max-width:340px;width:100%;text-align:center;">
                <div style="width:64px;height:64px;border-radius:50%;background:rgba(204,255,0,0.1);border:2px solid rgba(204,255,0,0.4);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
                    <span style="font-size:28px;">📍</span>
                </div>
                <h2 style="color:white;font-weight:900;font-size:22px;margin:0 0 8px;">Bois de Beauregard</h2>
                <p style="color:#6b7280;font-size:13px;margin:0 0 28px;">Calcul de ton itinéraire en temps réel...</p>
                <div id="geo-loading" style="color:#ccff00;font-size:13px;font-weight:700;">⚡ Localisation en cours...</div>
                <div id="geo-result" style="display:none;"></div>
                <div id="geo-error" style="display:none;color:#ef4444;font-size:13px;font-weight:600;"></div>
                <button onclick="document.getElementById('geo-modal-overlay').remove()"
                    style="margin-top:28px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:white;font-weight:800;padding:12px 32px;border-radius:100px;font-size:13px;cursor:pointer;width:100%;">
                    FERMER
                </button>
            </div>
        `;
        document.body.appendChild(overlay);
 
        if (!navigator.geolocation) {
            document.getElementById('geo-loading').style.display = 'none';
            document.getElementById('geo-error').style.display = 'block';
            document.getElementById('geo-error').textContent = 'Géolocalisation non supportée sur cet appareil.';
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const dist = GeoBeauregard.haversine(pos.coords.latitude, pos.coords.longitude, GeoBeauregard.destination.lat, GeoBeauregard.destination.lng);
                const walkMin = Math.round(dist / 80);
                const bikeMin = Math.round(dist / 250);
                const distText = dist < 1000 ? `${Math.round(dist)} m` : `${(dist/1000).toFixed(1)} km`;
                document.getElementById('geo-loading').style.display = 'none';
                document.getElementById('geo-result').style.display = 'block';
                document.getElementById('geo-result').innerHTML = `
                    <div style="background:rgba(204,255,0,0.06);border:1.5px solid rgba(204,255,0,0.25);border-radius:20px;padding:20px;margin-bottom:12px;">
                        <div style="color:#ccff00;font-size:36px;font-weight:900;line-height:1;">${distText}</div>
                        <div style="color:#9ca3af;font-size:12px;font-weight:600;margin-top:4px;text-transform:uppercase;letter-spacing:0.08em;">depuis ta position actuelle</div>
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
                        <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:16px;text-align:center;">
                            <div style="font-size:22px;margin-bottom:4px;">🚶</div>
                            <div style="color:white;font-weight:800;font-size:18px;">${walkMin} min</div>
                            <div style="color:#6b7280;font-size:11px;font-weight:600;">À pied</div>
                        </div>
                        <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:16px;text-align:center;">
                            <div style="font-size:22px;margin-bottom:4px;">🚲</div>
                            <div style="color:white;font-weight:800;font-size:18px;">${bikeMin} min</div>
                            <div style="color:#6b7280;font-size:11px;font-weight:600;">En vélo</div>
                        </div>
                    </div>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${GeoBeauregard.destination.lat},${GeoBeauregard.destination.lng}&travelmode=walking"
                       target="_blank"
                       style="display:block;background:#ccff00;color:black;font-weight:900;text-decoration:none;padding:14px;border-radius:16px;font-size:13px;text-align:center;">
                        🗺️ &nbsp;Ouvrir dans Google Maps
                    </a>
                `;
            },
            (err) => {
                document.getElementById('geo-loading').style.display = 'none';
                document.getElementById('geo-error').style.display = 'block';
                const msgs = { 1: 'Accès à la localisation refusé.', 2: 'Position introuvable.', 3: 'Délai dépassé, réessaie.' };
                document.getElementById('geo-error').textContent = msgs[err.code] || 'Erreur de localisation.';
            },
            { timeout: 10000, maximumAge: 60000 }
        );
    }
};
 
// MapProfiles — Profils cliquables sur la carte live
const MapProfiles = {
    showProfile(profile) {
        const existing = document.getElementById('map-profile-modal');
        if (existing) existing.remove();
 
        const xpBadge = profile.xp >= 10000 ? 'Platine' : profile.xp >= 5000 ? 'Or' : profile.xp >= 1000 ? 'Argent' : 'Bronze';
        const badgeColor = { Platine:'#e5e4e2', Or:'#f59e0b', Argent:'#9ca3af', Bronze:'#92400e' }[xpBadge];
 
        const modal = document.createElement('div');
        modal.id = 'map-profile-modal';
        modal.style.cssText = 'position:fixed;inset:0;z-index:9997;background:rgba(0,0,0,0.85);backdrop-filter:blur(12px);display:flex;align-items:flex-end;justify-content:center;padding:0 0 32px';
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
        modal.innerHTML = `
            <div style="width:100%;max-width:400px;background:#111;border:1px solid rgba(255,255,255,0.1);border-radius:32px 32px 0 0;padding:28px 24px 24px;animation:slideUpModal 0.3s ease;">
                <div style="width:40px;height:4px;background:rgba(255,255,255,0.15);border-radius:2px;margin:0 auto 24px;"></div>
                <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">
                    <img src="${profile.img}" style="width:64px;height:64px;border-radius:50%;object-fit:cover;border:2px solid ${profile.color};"
                         onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=333&color=fff'">
                    <div>
                        <div style="color:white;font-weight:900;font-size:18px;line-height:1.2;">${profile.name}</div>
                        <div style="color:#9ca3af;font-size:12px;font-weight:600;margin-top:3px;">${profile.grade}</div>
                        <div style="display:inline-block;margin-top:6px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:100px;padding:3px 10px;font-size:11px;font-weight:700;color:${badgeColor};">${xpBadge}</div>
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:20px;">
                    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px;text-align:center;">
                        <div style="color:#ccff00;font-weight:900;font-size:16px;">${profile.xp.toLocaleString('fr')}</div>
                        <div style="color:#6b7280;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-top:2px;">XP</div>
                    </div>
                    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px;text-align:center;">
                        <div style="color:white;font-weight:900;font-size:16px;">📍</div>
                        <div style="color:#6b7280;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-top:2px;">${profile.location}</div>
                    </div>
                    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px;text-align:center;">
                        <div style="color:white;font-weight:900;font-size:16px;">🟢</div>
                        <div style="color:#6b7280;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-top:2px;">En ligne</div>
                    </div>
                </div>
                <button onclick="App.nav('view-social', document.getElementById('nav-social')); setTimeout(()=>App.switchSocialTab('messages'),100); document.getElementById('map-profile-modal').remove();"
                    style="width:100%;background:#ccff00;color:black;font-weight:900;padding:15px;border-radius:18px;border:none;cursor:pointer;font-size:14px;margin-bottom:10px;">
                    💬 &nbsp;Envoyer un message
                </button>
                <button onclick="document.getElementById('map-profile-modal').remove()"
                    style="width:100%;background:rgba(255,255,255,0.06);color:white;font-weight:700;padding:13px;border-radius:18px;border:1px solid rgba(255,255,255,0.1);cursor:pointer;font-size:13px;">
                    Fermer
                </button>
            </div>
        `;
        document.body.appendChild(modal);
    }
};
 
window.VideoPlayer  = VideoPlayer;
window.GeoBeauregard = GeoBeauregard;
window.MapProfiles  = MapProfiles;

// ==========================================================================
// LANCEMENT IMMEDIAT
App.init();

// Initialisation des nouveaux systèmes après le démarrage principal
setTimeout(() => {
    Messaging.init();
    Social.renderFeed();
    Badges.renderBadges();
    DailyChallenge.renderCard();
}, 200);
