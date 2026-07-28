// ============================================
// Configuration de l'API PHP - Onekana
// ============================================

export const PHP_API_BASE_URL = '/api';

// PHP API endpoints
export const PHP_ENDPOINTS = {
    // ── Routes publiques ──────────────────────────────────────────────────
    REGISTER: `${PHP_API_BASE_URL}/register`,
    LOGIN: `${PHP_API_BASE_URL}/login.php`,

    // ── Routes protégées (authentification requise) ───────────────────────
    USER: `${PHP_API_BASE_URL}/user`,
    LOGOUT: `${PHP_API_BASE_URL}/logout.php`,
    USER_ME: `${PHP_API_BASE_URL}/user/me`,
    USER_CAMPAIGNS: `${PHP_API_BASE_URL}/user/campaigns`,

    // ── Utilisateurs ─────────────────────────────────────────────────────
    USERS: `${PHP_API_BASE_URL}/users`,

    // ── Campagnes ─────────────────────────────────────────────────────────
    CAMPAIGNS: `${PHP_API_BASE_URL}/campaigns.php`,
    CAMPAIGN_POST: `${PHP_API_BASE_URL}/campaigns/post.php`,
    CAMPAIGN_USER: (userId) => `${PHP_API_BASE_URL}/campaigns/user.php?user_id=${userId}`,
    CAMPAIGN_GET: (campaignId) => `${PHP_API_BASE_URL}/campaigns/get.php?campaign_id=${campaignId}`,
    CAMPAIGN_UPDATE: (campaignId) => `${PHP_API_BASE_URL}/campaigns/put.php?campaign_id=${campaignId}`,
    CAMPAIGN_DELETE: (campaignId) => `${PHP_API_BASE_URL}/campaigns/delete.php?id=${campaignId}`,
    CAMPAIGN_COPY: `${PHP_API_BASE_URL}/campaigns/copy.php`,

    // ── Communes ──────────────────────────────────────────────────────────
    COMMUNES: `${PHP_API_BASE_URL}/communes/get.php`,
    COMMUNE_QUARTIERS: (id) => `${PHP_API_BASE_URL}/communes/${id}/quartiers`,
    COMMUNE_POINTS_CHAUDS: (id) => `${PHP_API_BASE_URL}/communes/${id}/points-chauds`,

    // ── Quartiers ─────────────────────────────────────────────────────────
    QUARTIERS: `${PHP_API_BASE_URL}/quartiers`,
    QUARTIER_POINTS_CHAUDS: (id) => `${PHP_API_BASE_URL}/quartiers/${id}/points-chauds`,

    // ── Types de campagne ─────────────────────────────────────────────────
    CAMPAIGN_TYPES: `${PHP_API_BASE_URL}/campaign_types/get.php`,
    CAMPAIGN_TYPES_WITH_PRICE: `${PHP_API_BASE_URL}/campaign_types/with_prices.php`,
    CAMPAIGN_TYPES_ID: (id) => `${PHP_API_BASE_URL}/campaign-types/get.php?id=${id}`,

    // ── Prix de campagne ──────────────────────────────────────────────────
    CAMPAIGN_PRICES: `${PHP_API_BASE_URL}/campaign_prices/get.php`,
    CAMPAIGN_PRICES_ID: (id) => `${PHP_API_BASE_URL}/campaign_prices/get.php?id=${id}`,

    // ── Points chauds ─────────────────────────────────────────────────────
    POINTS_CHAUDS: `${PHP_API_BASE_URL}/points_chauds/get.php`,
    POINTS_CHAUDS_COMMUNE: (communeId) => `${PHP_API_BASE_URL}/points-chauds/commune/${communeId}`,
    POINTS_CHAUDS_QUARTIER: (quartierId) => `${PHP_API_BASE_URL}/points-chauds/quartier/${quartierId}`,

    // ── Pages ─────────────────────────────────────────────────────────────
    PAGES: `${PHP_API_BASE_URL}/pages`,
    PAGES_USER: (userId) => `${PHP_API_BASE_URL}/pages/user/${userId}`,

    // ── Routes de transport ───────────────────────────────────────────────
    TRANSPORT_ROUTES: `${PHP_API_BASE_URL}/transport_routes/get.php`,

    // ── Coordonnées de routes ─────────────────────────────────────────────
    ROUTE_COORDINATES: `${PHP_API_BASE_URL}/route-coordinates`,
    ROUTE_COORDINATES_ROUTE: (routeId) => `${PHP_API_BASE_URL}/route-coordinates/route/${routeId}`,

    // ── Agenda ────────────────────────────────────────────────────────────
    AGENDA_EVENTS: `${PHP_API_BASE_URL}/agenda_events.php`,
    AGENDA_EVENT: (eventId) => `${PHP_API_BASE_URL}/agenda/events/${eventId}`,
    AGENDA_EVENTS_USER: (userId) => `${PHP_API_BASE_URL}/agenda_events/get.php?user_id=${userId}`,
    AGENDA_EVENTS_TODAY: `${PHP_API_BASE_URL}/agenda/events/today.php`,
    AGENDA_EVENTS_WEEK: `${PHP_API_BASE_URL}/agenda/events/week.php`,
    AGENDA_EVENTS_MONTH: `${PHP_API_BASE_URL}/agenda/events/month.php`,
    AGENDA_EVENTS_REMINDERS: `${PHP_API_BASE_URL}/agenda/events/reminders.php`,

    // ── Notifications ─────────────────────────────────────────────────────
    NOTIFICATIONS: `${PHP_API_BASE_URL}/notifications`,
    NOTIFICATION: (id) => `${PHP_API_BASE_URL}/notifications/${id}`,
    NOTIFICATIONS_UNREAD: `${PHP_API_BASE_URL}/notifications/unread`,
    NOTIFICATIONS_STATS: `${PHP_API_BASE_URL}/notifications/stats`,
    NOTIFICATIONS_TYPES: `${PHP_API_BASE_URL}/notifications/types`,
    NOTIFICATIONS_PRIORITIES: `${PHP_API_BASE_URL}/notifications/priorities`,
    NOTIFICATIONS_CATEGORIES: `${PHP_API_BASE_URL}/notifications/categories`,
    NOTIFICATION_READ: (id) => `${PHP_API_BASE_URL}/notifications/${id}/read`,
    NOTIFICATION_UNREAD: (id) => `${PHP_API_BASE_URL}/notifications/${id}/unread`,
    NOTIFICATION_DISMISS: (id) => `${PHP_API_BASE_URL}/notifications/${id}/dismiss`,
    NOTIFICATIONS_BULK_READ: `${PHP_API_BASE_URL}/notifications/bulk/read`,
    NOTIFICATIONS_BULK_DISMISS: `${PHP_API_BASE_URL}/notifications/bulk/dismiss`,
    NOTIFICATIONS_BULK_DELETE: `${PHP_API_BASE_URL}/notifications/bulk/delete`,

    // ── Packs Commerciaux ─────────────────────────────────────────────────────
    PACKS_COMMERCIAUX: `${PHP_API_BASE_URL}/packs_commerciaux/get.php`,
    PACKS_COMMERCIAUX_ID: (id) => `${PHP_API_BASE_URL}/packs_commerciaux/get.php?id=${id}`,
    PACKS_COMMERCIAUX_CATEGORIE: (categorie) => `${PHP_API_BASE_URL}/packs_commerciaux/get.php?categorie=${categorie}`,
    OPTIONS_COMPLEMENTAIRES: `${PHP_API_BASE_URL}/options_complementaires/get.php`,
    OPTIONS_RECOMMANDEES_PACK: (packId) => `${PHP_API_BASE_URL}/options_recommandees/get.php?pack_id=${packId}`,
    CALCULER_DEVIS_PACK: `${PHP_API_BASE_URL}/devis/calculer.php`,

    // ── Messages de Contact ─────────────────────────────────────────────────────
    CONTACT_MESSAGES: `${PHP_API_BASE_URL}/contact_messages/get.php`,
    CONTACT_MESSAGE: (id) => `${PHP_API_BASE_URL}/contact_messages/get.php?id=${id}`,
    CONTACT_MESSAGE_POST: `${PHP_API_BASE_URL}/contact_messages/post.php`,
    CONTACT_MESSAGE_PUT: `${PHP_API_BASE_URL}/contact_messages/put.php`,
    CONTACT_MESSAGE_DELETE: (id) => `${PHP_API_BASE_URL}/contact_messages/delete.php?id=${id}`,
};
