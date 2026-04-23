<div align="left">

# Kezzy (Vizsgaremek Frontend)

Frontend alkalmazás a **Kezzy** webalkalmazáshoz.

</div>

---

## Bevezetés

Ez a dokumentáció a vizsgaremek frontend alkalmazás felépítését és működését mutatja be.

A frontend feladata:

* a felhasználói felület megjelenítése
* kommunikáció a backend API-val
* adatok kezelése és megjelenítése

### Projekt célja

A **Kezzy** egy webalkalmazás, amely a lakótárs- és lakáskeresés megkönnyítésére jött létre.
Célja, hogy a felhasználók egyszerűen és átlátható módon találjanak egymásra, illetve számukra megfelelő lakhatási lehetőségeket.

Az alkalmazás:

* felhasználóbarát felületet biztosít
* alapvető keresési és szűrési funkciókat kínál

---

## Alkalmazott technológiák

* Vite
* React / TypeScript
* Tailwind CSS
* shadcn/ui
* leo-profanity
* lucide (ikonok)

---
## Gyors indítás

Kövesd az alábbi lépéseket a projekt futtatásához:

```bash
git clone https://github.com/SzofiaKaszas/vizsgaremek_frontend.git
cd vizsgaremek_frontend
npm install
npm run dev
```

---

## Ha nem indul el

Előfordulhat, hogy néhány csomagot manuálisan kell telepíteni:

```bash
npm install shadcn
npm install tailwindcss
npm install leo-profanity
```

Ezután indítsd újra:

```bash
npm run dev
```

---

## Architektúra

Az alkalmazás komponens-alapú architektúrát használ.

Fő részei:

* **Komponensek** – újrafelhasználható UI elemek
* **Oldalak (pages)** – route-okhoz tartozó nézetek
* **Kontextusok** – backendről történő adatlekérés kezelése
* **Hookok** – logika újrafelhasználására

---

## 📁 Projekt struktúra
```bash
src/
├── components/   # UI komponensek (shadcn/ui)
├── pages/        # oldalak (saját komponensek)
├── context/      # adatkezelés / fetch logika
└── assets/       # statikus fájlok (pl. enumok)
```

---

## 🔌 API kommunikáció

A frontend HTTP kéréseken keresztül kommunikál a backenddel.

Példa:


fetch("http://localhost:3000/api/data")


Az API hívások külön logikában (pl. context / service réteg) vannak kezelve.

---

## UI és stíluskezelés

* Tailwind CSS a gyors és hatékony stílusozáshoz
* shadcn/ui komponensek az egységes megjelenésért
* Reszponzív design (mobilbarát felület)

---

## Állapotkezelés

Az alkalmazás lokális state-et használ:

* `useState` – komponens szintű állapot
* `useEffect` – lifecycle kezelés

---

## Validáció és adatkezelés

* Input ellenőrzés frontend és backend oldalon
* Nem megfelelő szavak szűrése (`leo-profanity`)

---

## Hibakezelés

* API hibák kezelése (`try/catch`)
* Hibák megjelenítése a felhasználónak
* Konzol logolás fejlesztéshez

---

## Tesztelés

* Manuális tesztelés frontend oldalon

---

## Továbbfejlesztési lehetőségek

* Globális state management (Redux / Zustand)
* Dark mode
* Unit tesztek
* Teljesítmény optimalizálás

---
</div>
