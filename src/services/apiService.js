// ============================================
// Service de récupération des données API PHP
// ============================================

import { PHP_API_BASE_URL, PHP_ENDPOINTS } from '../config/api';

// ── Utilitaire fetch générique ──────────────────────────────────────────────

/**
 * Effectue une requête vers l'API PHP.
 * @param {string} url      - URL complète de l'endpoint
 * @param {object} options  - Options fetch (method, body, headers…)
 * @returns {Promise<any>}  - Données JSON retournées par l'API
 */
async function apiFetch(url, options = {}) {
    const token = localStorage.getItem('token');

    const defaultHeaders = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(url, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...(options.headers || {}),
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
            `Erreur API [${response.status}] ${response.statusText}: ${errorText}`
        );
    }

    return response.json();
}

// ── Authentification ────────────────────────────────────────────────────────

/**
 * Inscription d'un nouvel utilisateur.
 * @param {{ name, email, password }} data
 */
export async function register(data) {
    return apiFetch(PHP_ENDPOINTS.REGISTER, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

/**
 * Connexion d'un utilisateur.
 * @param {{ email, password }} data
 */
export async function login(data) {
    return apiFetch(PHP_ENDPOINTS.LOGIN, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

/**
 * Déconnexion de l'utilisateur.
 */
export async function logout() {
    return apiFetch(PHP_ENDPOINTS.LOGOUT, { method: 'POST' });
}

// ── Utilisateur ─────────────────────────────────────────────────────────────

/**
 * Récupère le profil de l'utilisateur connecté.
 */
export async function getMe() {
    return apiFetch(PHP_ENDPOINTS.USER_ME);
}

/**
 * Récupère tous les utilisateurs.
 */
export async function getUsers() {
    return apiFetch(PHP_ENDPOINTS.USERS);
}

// ── Campagnes ───────────────────────────────────────────────────────────────

/**
 * Récupère toutes les campagnes.
 */
export async function getCampaigns() {
    return apiFetch(PHP_ENDPOINTS.CAMPAIGNS);
}

/**
 * Récupère les campagnes d'un utilisateur.
 * @param {string|number} userId
 */
export async function getCampaignsByUser(userId) {
    return apiFetch(PHP_ENDPOINTS.CAMPAIGN_USER(userId));
}

/**
 * Récupère une campagne par son ID.
 * @param {string|number} campaignId
 */
export async function getCampaignById(campaignId) {
    return apiFetch(PHP_ENDPOINTS.CAMPAIGN_GET(campaignId));
}

/**
 * Crée une nouvelle campagne.
 * @param {object} data
 */
export async function createCampaign(data) {
    return apiFetch(PHP_ENDPOINTS.CAMPAIGN_POST, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

/**
 * Met à jour une campagne.
 * @param {string|number} campaignId
 * @param {object} data
 */
export async function updateCampaign(campaignId, data) {
    return apiFetch(PHP_ENDPOINTS.CAMPAIGN_UPDATE(campaignId), {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

/**
 * Supprime une campagne.
 * @param {string|number} campaignId
 */
export async function deleteCampaign(campaignId) {
    return apiFetch(PHP_ENDPOINTS.CAMPAIGN_DELETE(campaignId), {
        method: 'DELETE',
    });
}

/**
 * Copie une campagne existante.
 * @param {object} data
 */
export async function copyCampaign(data) {
    return apiFetch(PHP_ENDPOINTS.CAMPAIGN_COPY, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

// ── Communes ────────────────────────────────────────────────────────────────

/**
 * Récupère toutes les communes.
 */
export async function getCommunes() {
    return apiFetch(PHP_ENDPOINTS.COMMUNES);
}

/**
 * Récupère les quartiers d'une commune.
 * @param {string|number} id
 */
export async function getCommuneQuartiers(id) {
    return apiFetch(PHP_ENDPOINTS.COMMUNE_QUARTIERS(id));
}

/**
 * Récupère les points chauds d'une commune.
 * @param {string|number} id
 */
export async function getCommunePointsChauds(id) {
    return apiFetch(PHP_ENDPOINTS.COMMUNE_POINTS_CHAUDS(id));
}

// ── Quartiers ───────────────────────────────────────────────────────────────

/**
 * Récupère tous les quartiers.
 */
export async function getQuartiers() {
    return apiFetch(PHP_ENDPOINTS.QUARTIERS);
}

/**
 * Récupère les points chauds d'un quartier.
 * @param {string|number} id
 */
export async function getQuartierPointsChauds(id) {
    return apiFetch(PHP_ENDPOINTS.QUARTIER_POINTS_CHAUDS(id));
}

// ── Types de campagne ───────────────────────────────────────────────────────

/**
 * Récupère tous les types de campagne avec leurs prix.
 */
export async function getCampaignTypes() {
    return apiFetch(PHP_ENDPOINTS.CAMPAIGN_TYPES_WITH_PRICE);
}

/**
 * Récupère un type de campagne par son ID.
 * @param {string|number} id
 */
export async function getCampaignTypeById(id) {
    return apiFetch(PHP_ENDPOINTS.CAMPAIGN_TYPES_ID(id));
}

// ── Packs Commerciaux ───────────────────────────────────────────────────────

/**
 * Récupère tous les packs commerciaux avec leurs fonctionnalités.
 */
export async function getPacksCommerciaux() {
    return apiFetch(PHP_ENDPOINTS.PACKS_COMMERCIAUX);
}

/**
 * Récupère un pack commercial par son ID.
 * @param {string|number} id
 */
export async function getPackCommercialById(id) {
    return apiFetch(PHP_ENDPOINTS.PACKS_COMMERCIAUX_ID(id));
}

/**
 * Récupère les packs commerciaux par catégorie.
 * @param {string} categorie
 */
export async function getPacksByCategorie(categorie) {
    return apiFetch(PHP_ENDPOINTS.PACKS_COMMERCIAUX_CATEGORIE(categorie));
}

/**
 * Récupère les options complémentaires.
 */
export async function getOptionsComplementaires() {
    return apiFetch(PHP_ENDPOINTS.OPTIONS_COMPLEMENTAIRES);
}

/**
 * Récupère les options recommandées pour un pack.
 * @param {string|number} packId
 */
export async function getOptionsRecommandees(packId) {
    return apiFetch(PHP_ENDPOINTS.OPTIONS_RECOMMANDEES_PACK(packId));
}

/**
 * Calcule le devis pour un pack avec options supplémentaires.
 * @param {object} data
 */
export async function calculerDevisPack(data) {
    return apiFetch(PHP_ENDPOINTS.CALCULER_DEVIS_PACK, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

// ── Packs Management ───────────────────────────────────────────────────────
/**
 * Crée un nouveau pack commercial.
 * @param {object} packData
 */
export async function createPack(packData) {
    return apiFetch(PHP_ENDPOINTS.PACKS_COMMERCIAUX, {
        method: 'POST',
        body: JSON.stringify(packData),
    });
}

/**
 * Met à jour un pack commercial.
 * @param {string|number} id
 * @param {object} packData
 */
export async function updatePack(id, packData) {
    return apiFetch(PHP_ENDPOINTS.PACKS_COMMERCIAUX_ID(id), {
        method: 'PUT',
        body: JSON.stringify(packData),
    });
}

/**
 * Supprime un pack commercial.
 * @param {string|number} id
 */
export async function deletePack(id) {
    return apiFetch(PHP_ENDPOINTS.PACKS_COMMERCIAUX_ID(id), {
        method: 'DELETE',
    });
}

// ── Packs (alias for getPacksCommerciaux) ───────────────────────────────────
/**
 * Récupère tous les packs commerciaux avec leurs fonctionnalités.
 * Alias pour getPacksCommerciaux pour compatibilité avec Campaigns.jsx
 */
export async function getPacks() {
    return getPacksCommerciaux();
}

// ── Prix de campagne ────────────────────────────────────────────────────────

/**
 * Récupère tous les prix de campagne.
 */
export async function getCampaignPrices() {
    return apiFetch(PHP_ENDPOINTS.CAMPAIGN_PRICES);
}

/**
 * Récupère un prix de campagne par son ID.
 * @param {string|number} id
 */
export async function getCampaignPriceById(id) {
    return apiFetch(PHP_ENDPOINTS.CAMPAIGN_PRICES_ID(id));
}

// ── Points chauds ───────────────────────────────────────────────────────────

/**
 * Récupère tous les points chauds.
 */
export async function getPointsChauds() {
    return apiFetch(PHP_ENDPOINTS.POINTS_CHAUDS);
}

/**
 * Récupère les points chauds d'une commune.
 * @param {string|number} communeId
 */
export async function getPointsChaudsCommune(communeId) {
    return apiFetch(PHP_ENDPOINTS.POINTS_CHAUDS_COMMUNE(communeId));
}

/**
 * Récupère les points chauds d'un quartier.
 * @param {string|number} quartierId
 */
export async function getPointsChaudsQuartier(quartierId) {
    return apiFetch(PHP_ENDPOINTS.POINTS_CHAUDS_QUARTIER(quartierId));
}

// ── Routes de transport ─────────────────────────────────────────────────────

/**
 * Récupère toutes les routes de transport.
 */
export async function getTransportRoutes() {
    return apiFetch(PHP_ENDPOINTS.TRANSPORT_ROUTES);
}

/**
 * Récupère les coordonnées d'une route.
 * @param {string|number} routeId
 */
export async function getRouteCoordinates(routeId) {
    return apiFetch(PHP_ENDPOINTS.ROUTE_COORDINATES_ROUTE(routeId));
}

// ── Agenda ──────────────────────────────────────────────────────────────────

/**
 * Récupère tous les événements agenda.
 */
export async function getAgendaEvents() {
    return apiFetch(PHP_ENDPOINTS.AGENDA_EVENTS);
}

/**
 * Récupère un événement agenda par son ID.
 * @param {string|number} eventId
 */
export async function getAgendaEventById(eventId) {
    return apiFetch(PHP_ENDPOINTS.AGENDA_EVENT(eventId));
}

/**
 * Récupère les événements agenda d'un utilisateur.
 * @param {string|number} userId
 */
export async function getAgendaEventsByUser(userId) {
    return apiFetch(PHP_ENDPOINTS.AGENDA_EVENTS_USER(userId));
}

/**
 * Récupère les événements du jour.
 */
export async function getAgendaEventsToday() {
    return apiFetch(PHP_ENDPOINTS.AGENDA_EVENTS_TODAY);
}

/**
 * Récupère les événements de la semaine.
 */
export async function getAgendaEventsWeek() {
    return apiFetch(PHP_ENDPOINTS.AGENDA_EVENTS_WEEK);
}

/**
 * Récupère les événements du mois.
 */
export async function getAgendaEventsMonth() {
    return apiFetch(PHP_ENDPOINTS.AGENDA_EVENTS_MONTH);
}

/**
 * Récupère les rappels d'événements.
 */
export async function getAgendaReminders() {
    return apiFetch(PHP_ENDPOINTS.AGENDA_EVENTS_REMINDERS);
}

// ── Notifications ───────────────────────────────────────────────────────────

/**
 * Récupère toutes les notifications.
 */
export async function getNotifications() {
    return apiFetch(PHP_ENDPOINTS.NOTIFICATIONS);
}

/**
 * Récupère une notification par son ID.
 * @param {number} id
 */
export async function getNotificationById(id) {
    return apiFetch(PHP_ENDPOINTS.NOTIFICATION(id));
}

/**
 * Récupère les notifications non lues.
 */
export async function getUnreadNotifications() {
    return apiFetch(PHP_ENDPOINTS.NOTIFICATIONS_UNREAD);
}

/**
 * Récupère les statistiques des notifications.
 */
export async function getNotificationsStats() {
    return apiFetch(PHP_ENDPOINTS.NOTIFICATIONS_STATS);
}

/**
 * Marque une notification comme lue.
 * @param {number} id
 */
export async function markNotificationRead(id) {
    return apiFetch(PHP_ENDPOINTS.NOTIFICATION_READ(id), { method: 'PUT' });
}

/**
 * Marque une notification comme non lue.
 * @param {number} id
 */
export async function markNotificationUnread(id) {
    return apiFetch(PHP_ENDPOINTS.NOTIFICATION_UNREAD(id), { method: 'PUT' });
}

/**
 * Rejette (dismiss) une notification.
 * @param {number} id
 */
export async function dismissNotification(id) {
    return apiFetch(PHP_ENDPOINTS.NOTIFICATION_DISMISS(id), { method: 'PUT' });
}

/**
 * Marque plusieurs notifications comme lues (bulk).
 * @param {number[]} ids
 */
export async function bulkReadNotifications(ids) {
    return apiFetch(PHP_ENDPOINTS.NOTIFICATIONS_BULK_READ, {
        method: 'PUT',
        body: JSON.stringify({ ids }),
    });
}

/**
 * Rejette plusieurs notifications (bulk).
 * @param {number[]} ids
 */
export async function bulkDismissNotifications(ids) {
    return apiFetch(PHP_ENDPOINTS.NOTIFICATIONS_BULK_DISMISS, {
        method: 'PUT',
        body: JSON.stringify({ ids }),
    });
}

/**
 * Supprime plusieurs notifications (bulk).
 * @param {number[]} ids
 */
export async function bulkDeleteNotifications(ids) {
    return apiFetch(PHP_ENDPOINTS.NOTIFICATIONS_BULK_DELETE, {
        method: 'DELETE',
        body: JSON.stringify({ ids }),
    });
}

// ── Hook React générique ────────────────────────────────────────────────────

/**
 * Hook pour récupérer des données depuis l'API avec gestion loading/error.
 * @param {Function} fetchFn  - Fonction de service à appeler
 * @param {any}      initial  - Valeur initiale ([] ou null)
 * @param {Array}    deps     - Dépendances supplémentaires (optionnel)
 * @returns {{ data, loading, error, refetch }}
 *
 * @example
 * const { data: campaigns, loading, error } = useApi(getCampaigns, []);
 * const { data: campaign } = useApi(() => getCampaignById(id), null, [id]);
 */
// ── Export base URL ─────────────────────────────────────────────────────────
export { PHP_API_BASE_URL };
