-- Structure SQL pour la table des Packs Commerciaux Onekana
-- Annexe I - PACKS ONEKANA

-- Création de la table des packs commerciaux
CREATE TABLE IF NOT EXISTS packs_commerciaux (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    budget_min DECIMAL(10,2),
    budget_max DECIMAL(10,2),
    budget_description VARCHAR(200), -- Pour les cas comme "À partir de"
    description TEXT NOT NULL,
    categorie VARCHAR(50),
    ideal_pour TEXT,
    est_actif BOOLEAN DEFAULT TRUE,
    ordre_affichage INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_ordre_affichage (ordre_affichage),
    INDEX idx_categorie (categorie),
    INDEX idx_actif (est_actif)
);

-- Création de la table des fonctionnalités
CREATE TABLE IF NOT EXISTS fonctionnalites_pack (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pack_id INT NOT NULL,
    fonctionnalite VARCHAR(200) NOT NULL,
    description_detaillee TEXT,
    est_incluse BOOLEAN DEFAULT TRUE,
    ordre_affichage INT DEFAULT 0,
    
    FOREIGN KEY (pack_id) REFERENCES packs_commerciaux(id) ON DELETE CASCADE,
    INDEX idx_pack_id (pack_id),
    INDEX idx_ordre_affichage (ordre_affichage)
);

-- Insertion des packs commerciaux
INSERT INTO packs_commerciaux (nom, budget_min, budget_max, budget_description, description, categorie, ideal_pour, ordre_affichage) VALUES
('START VISIBILITÉ', 250.00, 600.00, NULL, 'Être vu localement', 'visibilité', 'Idéal commerces & tests de marché', 1),
('IMPACT TRAFIC', 700.00, 1500.00, NULL, 'Générer des visiteurs', 'trafic', 'ROI visible et mesurable', 2),
('DOMINATION URBAINE', 2000.00, 5000.00, NULL, 'Devenir incontournable', 'domination', 'Image forte & leadership local', 3),
('ACTIVATION ÉVÉNEMENTIELLE', 1200.00, 3000.00, NULL, 'Créer de l''émotion & des leads', 'événementiel', 'Jeunesse, sport, culture', 4),
('SUR-MESURE STRATÉGIQUE', 5000.00, NULL, 'À partir de 5 000 $', 'Vision long terme', 'stratégique', 'Institutions & grands comptes', 5);

-- Insertion des fonctionnalités pour START VISIBILITÉ
INSERT INTO fonctionnalites_pack (pack_id, fonctionnalite, ordre_affichage) VALUES
(1, 'Affichage mobile simple', 1),
(1, 'Flyers ciblés', 2),
(1, 'QR WhatsApp', 3),
(1, 'Suivi terrain', 4);

-- Insertion des fonctionnalités pour IMPACT TRAFIC
INSERT INTO fonctionnalites_pack (pack_id, fonctionnalite, ordre_affichage) VALUES
(2, 'Sac écran ou taxi premium', 1),
(2, 'Street marketing', 2),
(2, 'QR + CTA', 3),
(2, 'WhatsApp / SMS', 4),
(2, 'Leads + reporting', 5);

-- Insertion des fonctionnalités pour DOMINATION URBAINE
INSERT INTO fonctionnalites_pack (pack_id, fonctionnalite, ordre_affichage) VALUES
(3, 'Réseau taxis', 1),
(3, 'DOOH stratégique', 2),
(3, 'Street marketing renforcé', 3),
(3, 'Supports utiles', 4),
(3, 'WhatsApp + SMS', 5),
(3, 'Reporting avancé', 6);

-- Insertion des fonctionnalités pour ACTIVATION ÉVÉNEMENTIELLE
INSERT INTO fonctionnalites_pack (pack_id, fonctionnalite, ordre_affichage) VALUES
(4, 'Fan Experience', 1),
(4, 'Animations sponsorisées', 2),
(4, 'Collecte de données', 3),
(4, 'Relance post-event', 4);

-- Insertion des fonctionnalités pour SUR-MESURE STRATÉGIQUE
INSERT INTO fonctionnalites_pack (pack_id, fonctionnalite, ordre_affichage) VALUES
(5, 'Audit terrain', 1),
(5, 'Stratégie omnicanale', 2),
(5, 'Pilotage mensuel', 3),
(5, 'Optimisation & ROI', 4);

-- Création d'une vue pour afficher les packs avec leurs fonctionnalités
CREATE VIEW vue_packs_commerciaux AS
SELECT 
    p.id,
    p.nom,
    p.budget_min,
    p.budget_max,
    p.budget_description,
    CASE 
        WHEN p.budget_description IS NOT NULL THEN p.budget_description
        WHEN p.budget_min IS NOT NULL AND p.budget_max IS NOT NULL THEN CONCAT(p.budget_min, ' $ – ', p.budget_max, ' $')
        WHEN p.budget_min IS NOT NULL THEN CONCAT('À partir de ', p.budget_min, ' $')
        ELSE 'Sur devis'
    END AS budget_affichage,
    p.description,
    p.categorie,
    p.ideal_pour,
    p.ordre_affichage,
    GROUP_CONCAT(fp.fonctionnalite ORDER BY fp.ordre_affichage SEPARATOR ' | ') AS fonctionnalites_liste,
    COUNT(fp.id) AS nombre_fonctionnalites
FROM packs_commerciaux p
LEFT JOIN fonctionnalites_pack fp ON p.id = fp.pack_id AND fp.est_incluse = TRUE
WHERE p.est_actif = TRUE
GROUP BY p.id
ORDER BY p.ordre_affichage;

-- Index supplémentaires pour les performances
CREATE INDEX idx_packs_budget_range ON packs_commerciaux (budget_min, budget_max);
CREATE INDEX idx_fonctionnalites_pack_incluse ON fonctionnalites_pack (pack_id, est_incluse);

-- Exemples de requêtes utiles

-- 1. Tous les packs avec leurs fonctionnalités
-- SELECT * FROM vue_packs_commerciaux;

-- 2. Packs par catégorie
-- SELECT * FROM vue_packs_commerciaux WHERE categorie = 'visibilité';

-- 3. Packs dans une fourchette de budget
-- SELECT * FROM vue_packs_commerciaux WHERE budget_min >= 500 AND budget_max <= 2000;

-- 4. Packs avec un nombre minimum de fonctionnalités
-- SELECT * FROM vue_packs_commerciaux WHERE nombre_fonctionnalites >= 5;

-- 5. Recherche de packs contenant une fonctionnalité spécifique
-- SELECT vp.* FROM vue_packs_commerciaux vp 
-- WHERE vp.fonctionnalites_liste LIKE '%WhatsApp%';

-- 6. Packs classés par budget croissant
-- SELECT * FROM vue_packs_commerciaux ORDER BY budget_min ASC;

-- 7. Packs les plus complets (plus de fonctionnalités)
-- SELECT * FROM vue_packs_commerciaux ORDER BY nombre_fonctionnalites DESC;

-- Fonction pour formater l'affichage du budget
DELIMITER //
CREATE FUNCTION formater_budget(
    budget_min DECIMAL(10,2),
    budget_max DECIMAL(10,2),
    budget_description VARCHAR(200)
) RETURNS VARCHAR(100)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE result VARCHAR(100);
    
    IF budget_description IS NOT NULL THEN
        SET result = budget_description;
    ELSEIF budget_min IS NOT NULL AND budget_max IS NOT NULL THEN
        SET result = CONCAT(budget_min, ' $ – ', budget_max, ' $');
    ELSEIF budget_min IS NOT NULL THEN
        SET result = CONCAT('À partir de ', budget_min, ' $');
    ELSE
        SET result = 'Sur devis';
    END IF;
    
    RETURN result;
END//
DELIMITER ;

-- Procédure pour ajouter un nouveau pack
DELIMITER //
CREATE PROCEDURE ajouter_pack_commercial(
    IN p_nom VARCHAR(100),
    IN p_budget_min DECIMAL(10,2),
    IN p_budget_max DECIMAL(10,2),
    IN p_budget_description VARCHAR(200),
    IN p_description TEXT,
    IN p_categorie VARCHAR(50),
    IN p_ideal_pour TEXT,
    IN p_ordre_affichage INT,
    IN p_fonctionnalites TEXT -- Liste séparée par des virgules
)
BEGIN
    DECLARE pack_id INT;
    DECLARE done INT DEFAULT FALSE;
    DECLARE func_name VARCHAR(200);
    DECLARE func_pos INT DEFAULT 1;
    DECLARE func_len INT;
    DECLARE func_separator_pos INT;
    
    -- Insérer le pack
    INSERT INTO packs_commerciaux (
        nom, budget_min, budget_max, budget_description, description, categorie, ideal_pour, ordre_affichage
    ) VALUES (
        p_nom, p_budget_min, p_budget_max, p_budget_description, p_description, p_categorie, p_ideal_pour, p_ordre_affichage
    );
    
    SET pack_id = LAST_INSERT_ID();
    
    -- Insérer les fonctionnalités si fournies
    IF p_fonctionnalites IS NOT NULL AND LENGTH(TRIM(p_fonctionnalites)) > 0 THEN
        WHILE func_pos <= LENGTH(p_fonctionnalites) DO
            SET func_separator_pos = LOCATE(',', p_fonctionnalites, func_pos);
            
            IF func_separator_pos = 0 THEN
                -- Dernière fonctionnalité ou seule fonctionnalité
                SET func_name = TRIM(SUBSTRING(p_fonctionnalites, func_pos));
                SET func_pos = LENGTH(p_fonctionnalites) + 1;
            ELSE
                SET func_name = TRIM(SUBSTRING(p_fonctionnalites, func_pos, func_separator_pos - func_pos));
                SET func_pos = func_separator_pos + 1;
            END IF;
            
            IF LENGTH(func_name) > 0 THEN
                INSERT INTO fonctionnalites_pack (pack_id, fonctionnalite, ordre_affichage) 
                VALUES (pack_id, func_name, func_pos);
            END IF;
        END WHILE;
    END IF;
    
    SELECT pack_id AS nouveau_pack_id;
END//
DELIMITER ;

-- Exemple d'utilisation de la procédure
-- CALL ajouter_pack_commercial(
--     'NOUVEAU PACK',
--     1000.00,
--     2500.00,
--     NULL,
--     'Description du nouveau pack',
--     'nouvelle_categorie',
--     'Public cible',
--     6,
--     'Fonctionnalité 1, Fonctionnalité 2, Fonctionnalité 3'
-- );