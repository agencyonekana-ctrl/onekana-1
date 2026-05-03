# Base de Données Onekana - Packs Commerciaux

## Description

Cette structure de base de données gère les packs commerciaux et options complémentaires d'Onekana Agency.

## Structure Principale

### 1. Packs Commerciaux (`packs_commerciaux`)

Table principale contenant les différents packs proposés par Onekana.

**Champs principaux :**
- `id` : Identifiant unique
- `nom` : Nom du pack (ex: "START VISIBILITÉ")
- `budget_min/max` : Fourchette de budget
- `budget_description` : Description textuelle du budget
- `description` : Description du pack
- `categorie` : Catégorie du pack
- `ideal_pour` : Public cible
- `est_actif` : Statut d'activation
- `ordre_affichage` : Ordre d'affichage

### 2. Fonctionnalités (`fonctionnalites_pack`)

Table des fonctionnalités associées à chaque pack.

**Relations :**
- Clé étrangère vers `packs_commerciaux.id`
- Gestion de l'ordre d'affichage
- Possibilité de marquer des fonctionnalités comme non incluses

### 3. Options Complémentaires (`options_complementaires`)

Table des options supplémentaires pouvant être ajoutées aux packs.

**Types de prix :**
- `fixe` : Prix fixe (ex: 80.00 $)
- `pourcentage` : Pourcentage du budget de base
- `sur_devis` : Sur devis

### 4. Options Recommandées (`options_recommandees_pack`)

Table de liaison définissant quelles options sont recommandées/obligatoires pour chaque pack.

## Vues Créées

### `vue_packs_commerciaux`
Affiche les packs avec leurs fonctionnalités et budget formaté.

### `vue_options_pack`
Affiche les options recommandées par pack.

### `vue_cout_pack_complet`
Calcule le coût total d'un pack avec ses options.

## Procédures Stockées

### `ajouter_pack_commercial`
Permet d'ajouter un nouveau pack avec ses fonctionnalités en une seule opération.

### `calculer_devis_pack`
Calcule le devis complet d'un pack avec options supplémentaires.

## Exemples d'Utilisation

### 1. Afficher tous les packs
```sql
SELECT * FROM vue_packs_commerciaux;
```

### 2. Afficher les options pour un pack
```sql
SELECT * FROM vue_options_pack WHERE pack_id = 2;
```

### 3. Calculer un devis
```sql
CALL calculer_devis_pack(2, '1,3,7');
```

### 4. Ajouter un nouveau pack
```sql
CALL ajouter_pack_commercial(
    'NOUVEAU PACK',
    1000.00,
    2500.00,
    NULL,
    'Description du nouveau pack',
    'nouvelle_categorie',
    'Public cible',
    6,
    'Fonctionnalité 1, Fonctionnalité 2, Fonctionnalité 3'
);
```

## Index Créés

- `idx_ordre_affichage` : Pour le tri des packs
- `idx_categorie` : Pour le filtrage par catégorie
- `idx_actif` : Pour les packs actifs
- `idx_packs_budget_range` : Pour les recherches par budget
- `idx_options_categorie` : Pour le tri des options

## Contraintes

- Clés étrangères avec cascade delete
- Contraintes d'unicité sur les associations pack/option
- Validation des types de prix

## Installation

1. Exécuter `packs_commerciaux.sql`
2. Exécuter `options_complementaires.sql`

Les données de test sont incluses dans les fichiers SQL.