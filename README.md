# Onekana

Site public React/Vite de Onekana, avec formulaire de contact traité côté serveur en PHP.

## Développement local

Prérequis : Node.js, npm et PHP 8.1 ou supérieur.

Lancez simplement `npm run dev`.

Cette commande démarre automatiquement :

- Vite pour le site ;
- PHP sur `127.0.0.1:8787` pour `/api/contact.php` et `/api/chat.php` ;
- le proxy entre le site et les API PHP.

Copiez `.env.example` vers `.env.local`, puis renseignez une nouvelle valeur pour `CHATBOT_API_KEY`. Cette clé reste côté serveur et ne doit jamais être ajoutée au dépôt Git.

Le formulaire est public : le visiteur ne s’authentifie jamais et le destinataire reste fixé à `contact@onekana-agency.com`. L’envoi réel est effectué par le transport `mail()` de l’hébergement PHP.

## Production

Lancez `npm run build`, puis déployez tout le contenu de `dist`, y compris le dossier `dist/api`.

Les variables suivantes peuvent être configurées sur l’hébergement :

- `CONTACT_FROM_EMAIL` ;
- `CONTACT_RECIPIENT`, par défaut `contact@onekana-agency.com` ;
- `CHATBOT_API_ENDPOINT`, déjà renseigné dans `.env.example` ;
- `CHATBOT_API_KEY`, avec une nouvelle clé API active.

En production, l’API de contact utilise directement le transport `mail()` du serveur PHP. Le relais `/api/chat.php` transmet les messages au bot sans exposer sa clé dans le navigateur.
