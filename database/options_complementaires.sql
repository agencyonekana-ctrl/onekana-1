-- Structure SQL pour les Options Complémentaires
-- Annexes aux Packs Commerciaux Onekana

-- Création de la table des options complémentaires
CREATE TABLE IF NOT EXISTS options_complementaires (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(200) NOT NULL,
    description TEXT,
    prix DECIMAL(10,2),
    type_prix ENUM('fixe', 'pourcentage', 'sur_devis') DEFAULT 'fixe',
    pourcentage_base DECIMAL(5,2), -- Pour les options calculées en pourcentage
    est_actif BOOLEAN DEFAULT TRUE,
    categorie VARCHAR(50), -- Catégorie de l'option
    ordre_affichage INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_categorie (categorie),
    INDEX idx_actif (est_actif),
    INDEX idx_ordre_affichage (ordre_affichage)
);

-- Insertion des options complémentaires
INSERT INTO options_complementaires (nom, description, prix, type_prix, categorie, ordre_affichage) VALUES
('Impression flyers', 'Impression de flyers pour distribution', 80.00, 'fixe', 'impression', 1),
('WhatsApp supplémentaire', 'Campagne WhatsApp additionnelle', 100.00, 'fixe', 'digital', 2),
('Landing + QR tracking', 'Page de destination avec suivi QR', 120.00, 'fixe', 'digital', 3),
('Extension durée', 'Prolongation de la campagne', NULL, 'pourcentage', 'extension', 4),
('Extension zone', 'Extension géographique de la campagne', NULL, 'pourcentage', 'extension', 5),
('Exclusivité zone', 'Exclusivité géographique pour la campagne', NULL, 'pourcentage', 'exclusivite', 6),
('Création visuelle', 'Design et création graphique', 150.00, 'fixe', 'creation', 7),
('Création visuelle premium', 'Design premium avec animations', 300.00, 'fixe', 'creation', 8),
('Suivi terrain intensif', 'Suivi terrain renforcé', 200.00, 'fixe', 'suivi', 9),
('Reporting avancé', 'Reporting détaillé et analyses', 250.00, 'fixe', 'reporting', 10);

-- Table de liaison entre packs et options (options recommandées par pack)
CREATE TABLE IF NOT EXISTS options_recommandees_pack (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pack_id INT NOT NULL,
    option_id INT NOT NULL,
    est_obligatoire BOOLEAN DEFAULT FALSE,
    est_recommandee BOOLEAN DEFAULT TRUE,
    commentaire TEXT,
    
    FOREIGN KEY (pack_id) REFERENCES packs_commerciaux(id) ON DELETE CASCADE,
    FOREIGN KEY (option_id) REFERENCES options_complementaires(id) ON DELETE CASCADE,
    UNIQUE KEY unique_pack_option (pack_id, option_id)
);

-- Association des options recommandées par pack
INSERT INTO options_recommandees_pack (pack_id, option_id, est_obligatoire, est_recommandee, commentaire) VALUES
-- START VISIBILITÉ
(1, 1, FALSE, TRUE, 'Recommandé pour maximiser la portée'),
(1, 2, FALSE, TRUE, 'Option digitale complémentaire'),
(1, 3, FALSE, FALSE, 'Option premium'),
(1, 7, FALSE, FALSE, 'Design personnalisé'),

-- IMPACT TRAFIC  
(2, 1, FALSE, TRUE, 'Pour renforcer la visibilité'),
(2, 2, TRUE, TRUE, 'Essentiel pour le trafic'),
(2, 3, TRUE, TRUE, 'Suivi des conversions indispensable'),
(2, 4, FALSE, TRUE, 'Extension possible'),
(2, 8, FALSE, FALSE, 'Design premium'),

-- DOMINATION URBAINE
(3, 1, FALSE, TRUE, 'Pour couvrir l''ensemble du territoire'),
(3, 2, TRUE, TRUE, 'Campagne digitale complète'),
(3, 3, TRUE, TRUE, 'Tracking indispensable'),
(3, 4, TRUE, TRUE, 'Durée standard 3 mois'),
(3, 5, TRUE, TRUE, 'Couverture totale de la zone'),
(3, 6, TRUE, TRUE, 'Exclusivité recommandée'),
(3, 9, TRUE, TRUE, 'Suivi renforcé'),
(3, 10, TRUE, TRUE, 'Reporting mensuel'),

-- ACTIVATION ÉVÉNEMENTIELLE
(4, 1, FALSE, TRUE, 'Pour l''événement'),
(4, 2, TRUE, TRUE, 'Interaction digitale'),
(4, 3, TRUE, TRUE, 'Tracking événementiel'),
(4, 4, FALSE, TRUE, 'Selon durée de l''événement'),
(4, 7, TRUE, TRUE, 'Design événementiel'),
(4, 8, TRUE, TRUE, 'Design premium événementiel'),

-- SUR-MESURE STRATÉGIQUE
(5, 1, TRUE, TRUE, 'Selon stratégie définie'),
(5, 2, TRUE, TRUE, 'Campagne digitale intégrée'),
(5, 3, TRUE, TRUE, 'Tracking complet'),
(5, 4, TRUE, TRUE, 'Durée personnalisée'),
(5, 5, TRUE, TRUE, 'Zone personnalisée'),
(5, 6, TRUE, TRUE, 'Exclusivité stratégique'),
(5, 7, TRUE, TRUE, 'Design sur mesure'),
(5, 8, TRUE, TRUE, 'Design premium sur mesure'),
(5, 9, TRUE, TRUE, 'Suivi stratégique'),
(5, 10, TRUE, TRUE, 'Reporting stratégique');

-- Vue pour afficher les options par pack
CREATE VIEW vue_options_pack AS
SELECT 
    p.id AS pack_id,
    p.nom AS pack_nom,
    p.categorie AS pack_categorie,
    op.id AS option_id,
    op.nom AS option_nom,
    op.description AS option_description,
    op.prix AS option_prix,
    op.type_prix AS option_type_prix,
    op.pourcentage_base AS option_pourcentage,
    op.categorie AS option_categorie,
    opr.est_obligatoire,
    opr.est_recommandee,
    opr.commentaire
FROM packs_commerciaux p
INNER JOIN options_recommandees_pack opr ON p.id = opr.pack_id
INNER JOIN options_complementaires op ON opr.option_id = op.id
WHERE p.est_actif = TRUE AND op.est_actif = TRUE
ORDER BY p.ordre_affichage, op.categorie, op.ordre_affichage;

-- Vue pour calculer le coût total d'un pack avec options
CREATE VIEW vue_cout_pack_complet AS
SELECT 
    p.id AS pack_id,
    p.nom AS pack_nom,
    p.budget_min,
    p.budget_max,
    p.budget_description,
    SUM(CASE 
        WHEN op.type_prix = 'fixe' THEN op.prix
        WHEN op.type_prix = 'pourcentage' AND op.pourcentage_base IS NOT NULL THEN 
            (p.budget_min * op.pourcentage_base / 100)
        ELSE 0
    END) AS cout_options_obligatoires,
    SUM(CASE 
        WHEN op.type_prix = 'fixe' AND opr.est_recommandee = TRUE THEN op.prix
        WHEN op.type_prix = 'pourcentage' AND op.pourcentage_base IS NOT NULL AND opr.est_recommandee = TRUE THEN 
            (p.budget_min * op.pourcentage_base / 100)
        ELSE 0
    END) AS cout_options_recommandees,
    COUNT(opr.id) AS nombre_options_totales,
    COUNT(CASE WHEN opr.est_obligatoire = TRUE THEN 1 END) AS nombre_options_obligatoires,
    COUNT(CASE WHEN opr.est_recommandee = TRUE THEN 1 END) AS nombre_options_recommandees
FROM packs_commerciaux p
LEFT JOIN options_recommandees_pack opr ON p.id = opr.pack_id
LEFT JOIN options_complementaires op ON opr.option_id = op.id AND op.est_actif = TRUE
WHERE p.est_actif = TRUE
GROUP BY p.id, p.nom, p.budget_min, p.budget_max, p.budget_description
ORDER BY p.ordre_affichage;

-- Index pour les performances
CREATE INDEX idx_options_categorie ON options_complementaires (categorie, type_prix);
CREATE INDEX idx_options_recommandees_pack ON options_recommandees_pack (pack_id, est_obligatoire, est_recommandee);

-- Exemples de requêtes utiles

-- 1. Toutes les options par catégorie
-- SELECT * FROM options_complementaires WHERE est_actif = TRUE ORDER BY categorie, ordre_affichage;

-- 2. Options recommandées pour un pack spécifique
-- SELECT * FROM vue_options_pack WHERE pack_id = 2;

-- 3. Options obligatoires par pack
-- SELECT * FROM vue_options_pack WHERE est_obligatoire = TRUE;

-- 4. Coût total d'un pack avec options
-- SELECT * FROM vue_cout_pack_complet WHERE pack_id = 3;

-- 5. Options les plus fréquemment recommandées
-- SELECT option_nom, COUNT(*) as frequence 
-- FROM vue_options_pack 
-- GROUP BY option_id 
-- ORDER BY frequence DESC;

-- 6. Options par type de prix
-- SELECT type_prix, COUNT(*) as nombre, AVG(prix) as prix_moyen
-- FROM options_complementaires 
-- WHERE est_actif = TRUE 
-- GROUP BY type_prix;

-- 7. Packs avec leurs options classées par budget total estimé
-- SELECT 
--     vpc.pack_nom,
--     vpc.budget_min,
--     vpc.budget_max,
--     vpc.cout_options_obligatoires,
--     (vpc.budget_min + vpc.cout_options_obligatoires) AS budget_min_total,
--     (vpc.budget_max + vpc.cout_options_obligatoires) AS budget_max_total
-- FROM vue_cout_pack_complet vpc
-- ORDER BY budget_min_total ASC;

-- Procédure pour calculer le devis complet d'un pack
DELIMITER //
CREATE PROCEDURE calculer_devis_pack(
    IN p_pack_id INT,
    IN p_options_supplementaires TEXT -- Liste d'IDs d'options supplémentaires séparées par des virgules
)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE option_id INT;
    DECLARE option_pos INT DEFAULT 1;
    DECLARE option_separator_pos INT;
    DECLARE option_prix DECIMAL(10,2) DEFAULT 0;
    DECLARE option_type VARCHAR(20);
    DECLARE option_pourcentage DECIMAL(5,2);
    DECLARE total_options DECIMAL(10,2) DEFAULT 0;
    
    -- Table temporaire pour stocker les options supplémentaires
    CREATE TEMPORARY TABLE temp_options_supplementaires (
        option_id INT,
        prix DECIMAL(10,2),
        type_prix VARCHAR(20),
        pourcentage_base DECIMAL(5,2)
    );
    
    -- Insérer les options de base (obligatoires et recommandées)
    INSERT INTO temp_options_supplementaires (option_id, prix, type_prix, pourcentage_base)
    SELECT 
        op.id,
        op.prix,
        op.type_prix,
        op.pourcentage_base
    FROM options_recommandees_pack opr
    INNER JOIN options_complementaires op ON opr.option_id = op.id
    WHERE opr.pack_id = p_pack_id 
    AND opr.est_obligatoire = TRUE 
    AND op.est_actif = TRUE;
    
    -- Traiter les options supplémentaires
    IF p_options_supplementaires IS NOT NULL AND LENGTH(TRIM(p_options_supplementaires)) > 0 THEN
        WHILE option_pos <= LENGTH(p_options_supplementaires) DO
            SET option_separator_pos = LOCATE(',', p_options_supplementaires, option_pos);
            
            IF option_separator_pos = 0 THEN
                SET option_id = CAST(TRIM(SUBSTRING(p_options_supplementaires, option_pos)) AS UNSIGNED);
                SET option_pos = LENGTH(p_options_supplementaires) + 1;
            ELSE
                SET option_id = CAST(TRIM(SUBSTRING(p_options_supplementaires, option_pos, option_separator_pos - option_pos)) AS UNSIGNED);
                SET option_pos = option_separator_pos + 1;
            END IF;
            
            IF option_id > 0 THEN
                SELECT prix, type_prix, pourcentage_base INTO option_prix, option_type, option_pourcentage
                FROM options_complementaires 
                WHERE id = option_id AND est_actif = TRUE;
                
                IF option_prix IS NOT NULL THEN
                    INSERT INTO temp_options_supplementaires (option_id, prix, type_prix, pourcentage_base)
                    VALUES (option_id, option_prix, option_type, option_pourcentage);
                END IF;
            END IF;
        END WHILE;
    END IF;
    
    -- Calculer le total
    SELECT SUM(CASE 
        WHEN type_prix = 'fixe' THEN prix
        WHEN type_prix = 'pourcentage' AND pourcentage_base IS NOT NULL THEN 
            (SELECT budget_min FROM packs_commerciaux WHERE id = p_pack_id) * pourcentage_base / 100
        ELSE 0
    END) INTO total_options
    FROM temp_options_supplementaires;
    
    -- Afficher le pack avec le total
    SELECT 
        p.id,
        p.nom,
        p.budget_min,
        p.budget_max,
        p.budget_description,
        total_options AS cout_options,
        (p.budget_min + total_options) AS budget_total_min,
        (p.budget_max + total_options) AS budget_total_max,
        total_options AS cout_total_options
    FROM packs_commerciaux p
    WHERE p.id = p_pack_id AND p.est_actif = TRUE;
    
    -- Afficher les options incluses
    SELECT 
        op.id,
        op.nom,
        op.description,
        op.prix,
        op.type_prix,
        op.pourcentage_base,
        CASE 
            WHEN op.type_prix = 'fixe' THEN op.prix
            WHEN op.type_prix = 'pourcentage' AND op.pourcentage_base IS NOT NULL THEN 
                (SELECT budget_min FROM packs_commerciaux WHERE id = p_pack_id) * op.pourcentage_base / 100
            ELSE 0
        END AS cout_reel
    FROM temp_options_supplementaires tos
    INNER JOIN options_complementaires op ON tos.option_id = op.id
    ORDER BY op.categorie, op.ordre_affichage;
    
    DROP TEMPORARY TABLE temp_options_supplementaires;
END//
DELIMITER ;

-- Exemple d'utilisation de la procédure
-- CALL calculer_devis_pack(2, '1,3,7'); -- Pack IMPACT TRAFIC avec options supplémentaires 1, 3, 7