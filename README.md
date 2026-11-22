# home-energy-dashboard

Ett enkelt dashboard för att visa aktuell elförbrukning och exporterad el från en HomeWizard P1-mätare.

## Förutsättningar

1. Aktivera **Local API** i HomeWizard Energy-appen.
2. P1-mätaren använder IP-adressen `192.168.32.8`.

## Kör

```bash
npm start
```

Öppna `http://localhost:3000`.

## API

Servern hämtar data från `http://192.168.32.8/api/measurement`.
