# Marvin Checker
Petit programme en NodeJS pour notifier du passage de Marvin.
Utilise le cookie Microsoft pour se connecter à epitech.eu et récupérer les derniers checkups.
Utilise l'api de [PushOver](https://pushover.net/api) pour envoyer des notifications.

## Installation
    npm i
    touch .env

### Forme du .env

```env
#Cookie Microsoft
MARVIN_COOKIE=  

#Last checkup id
LAST_CHECKUP=1  

#PushOver
PO_USER= 
PO_TOKEN=
```