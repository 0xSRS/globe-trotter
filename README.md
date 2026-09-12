# 🌍 GlobeTrotter

### Empowering Personalized Travel Planning with a Collaborative, Multi-City Itinerary Builder

*Built for the Odoo Hackathon*

`React 19` · `Vite` · `Express.js` · `Prisma ORM` · `MySQL` · `JWT Auth` · `TailwindCSS`

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Core Features](#-core-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Database Schema](#-database-schema)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Project Structure](#-project-structure)
- [Scalability & Future Roadmap](#-scalability--future-roadmap)
- [Feasibility](#-feasibility)
- [Team](#-team)

---

## 🧭 Overview

**GlobeTrotter** is a full-stack, empowered travel planning platform that lets users design, visualize, and share multi-city trips end-to-end — from a first idea to a day-by-day itinerary with a live budget breakdown.

Rather than juggling spreadsheets, disconnected booking tabs, and group chats, a user can:

1. Search for cities and points of interest
2. Assemble them into an ordered, multi-stop trip
3. Slot in activities per stop with cost, timing, and duration
4. Track a running budget across the whole journey
5. View everything on a calendar or a shareable public itinerary page
6. Share highlights with a community of fellow travelers

It was built end-to-end for an **Odoo Hackathon**, with a clear split between a REST API backend and a modern single-page frontend.

---

## ✨ Core Features

| Module | What it does |
|---|---|
| 🔐 **Auth** | Registration & login with hashed passwords (bcrypt) and JWT-based sessions |
| 🗺️ **Trip Planner** | Create trips with name, dates, description, and cover photo |
| 📍 **Itinerary Builder** | Add ordered city "stops" to a trip, each with its own date range and per-section budget |
| 🎯 **Activities** | Attach searchable activities (cost, category, duration) to any stop, with optional cost overrides |
| 🔎 **Search** | Dedicated city and activity search/discovery endpoints |
| 💰 **Budget Tracking** | Auto-aggregated budget per trip, broken down by category, with manual expense entries |
| 📅 **Calendar View** | See all trips laid out on a month calendar |
| 🔗 **Public Sharing** | Generate a unique shareable slug so a trip's itinerary can be viewed without login |
| 🌐 **Community Hub** | Post about trips, like and comment on other travelers' posts |
| 👤 **Profile** | Manage personal info, saved/bookmarked destinations |
| 🛠️ **Admin Panel** | Platform-wide stats, top cities/activities, and user account management (activate/deactivate) |

---

## 🛠️ Tech Stack

### Frontend
- **React 19** — component-driven UI
- **Vite** — dev server & build tooling
- **Tailwind CSS 4** — utility-first styling
- **Axios / Fetch** — API communication via a centralized `api.js` client
- **Lucide React** — icon set

### Backend
- **Node.js + Express 4** — REST API server
- **Prisma ORM** — type-safe database access and migrations
- **MySQL** — relational data store
- **JWT (jsonwebtoken)** — stateless authentication
- **bcrypt** — password hashing
- **express-validator** — request validation middleware
- **nanoid** — short unique ID generation (e.g. share slugs)

### Tooling
- **ESLint** — frontend code quality
- **nodemon** — backend hot-reload in development
- **Prisma Migrate** — versioned schema migrations + seed script

---

## 🏗️ Architecture

GlobeTrotter follows a **decoupled client–server architecture**: a Single Page Application talks to a stateless REST API over HTTP, backed by a relational database.

```
┌──────────────────────────┐          HTTPS / JSON           ┌───────────────────────────┐
│        FRONTEND          │  ───────────────────────────▶   │          BACKEND          │
│   React 19 + Vite SPA    │  ◀───────────────────────────   │   Express REST API        │
│                           │        JWT in Authorization      │                            │
│  • Screen-based router    │        header on every call      │  Routes → Middleware →     │
│    (App.jsx state machine)│                                   │  Controllers → Models      │
│  • services/api.js        │                                   │                            │
│    (single fetch wrapper) │                                   │  • auth.middleware (JWT)   │
└──────────────────────────┘                                   │  • admin.middleware        │
                                                                 │  • validate.middleware     │
                                                                 └─────────────┬─────────────┘
                                                                               │
                                                                     Prisma ORM (typed queries)
                                                                               │
                                                                               ▼
                                                                 ┌───────────────────────────┐
                                                                 │          MySQL             │
                                                                 │  users · trips · cities    │
                                                                 │  trip_stops · activities   │
                                                                 │  trip_stop_activities      │
                                                                 │  budgets · community_*     │
                                                                 └───────────────────────────┘
```

**Backend layering** (`globetrotter-backend/src`):

- **`routes/`** — declares each REST endpoint and wires it to a controller. Route files are mounted independently in `app.js` (e.g. `trip.routes`, `itinerary.routes`, `budget.routes`, `community.routes`, `admin.routes`), which keeps each domain isolated and easy to extend.
- **`middleware/`** — cross-cutting concerns: `auth.middleware` verifies the JWT for protected routes, `admin.middleware` additionally checks the account is active/authorized, `validate.middleware` enforces request-shape rules from `express-validator`.
- **`controllers/`** — business logic per domain (auth, trips, itinerary, budget, search, community, sharing, admin) — this is where request data is validated against use-case rules and turned into Prisma calls.
- **`models/`** — thin data-access wrappers around Prisma Client per entity.
- **`utils/`** — shared helpers: JWT signing/verification, password hashing, slug generation, date grouping (for calendar view), budget calculation, pagination, and trip-status derivation.
- **`config/db.js`** — a single shared Prisma Client instance.

**Frontend layering** (`frontend/src`):

- Instead of a URL-based router, `App.jsx` currently drives navigation via a `currentScreen` state machine, rendering one full-screen route component (`routes/`) at a time and passing callback props to move between screens.
- `services/api.js` centralizes every HTTP call into one typed-feeling namespace (`api.auth`, `api.trips`, `api.itinerary`, `api.search`, `api.users`, `api.community`, `api.admin`), automatically attaching the JWT from `localStorage` and normalizing errors.
- Shared visuals (logo, hero imagery, city photography) live under `assets/`.

**Why this split works well for a hackathon:** two (or more) teams can build in parallel — one on backend domains, one on frontend screens — against a shared, documented API contract, without stepping on each other's files. You can see this directly in the code: the backend explicitly marks a boundary (`// === END OF MEMBER A ROUTES — Member B appends new app.use() lines below ===`) so contributors could add new modules without merge conflicts.

---

## 🗄️ Database Schema

Modeled with Prisma and MySQL. Key relations:

- **User** → has many **Trip**, **CommunityPost**, **CommunityComment**
- **Trip** → has many **TripStop** (ordered stops), belongs to a **User**
- **City** → referenced by **TripStop**, **Activity**, and **UserSavedCity** (bookmarks)
- **TripStop** → has many **TripStopActivity** (join table linking a stop to an **Activity**, with its own schedule/cost override)
- **Budget** → per-trip, per-category amount entries
- **CommunityPost** → has many **CommunityComment** and **CommunityLike**, optionally linked to a **Trip**

This normalized structure keeps itinerary data (stops → activities), budgeting, and social features cleanly separated while still relationally connected back to a single trip.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (LTS recommended)
- A running MySQL instance

### 1. Clone & install

```bash
git clone <your-repo-url>
cd globe-trotter-main
```

**Backend:**
```bash
cd globetrotter-backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure environment variables

Create a `.env` file inside `globetrotter-backend/`:

```env
DATABASE_URL="mysql://<user>:<password>@localhost:3306/globetrotter"
JWT_SECRET="your-long-random-secret"
PORT=3000
```

Create a `.env` file inside `frontend/` (optional — defaults to `http://localhost:3000/api`):

```env
VITE_API_BASE_URL="http://localhost:3000/api"
```

### 3. Set up the database

```bash
cd globetrotter-backend
npx prisma migrate deploy   # apply migrations
npx prisma db seed          # load demo cities/activities
```

### 4. Run it

**Backend** (from `globetrotter-backend/`):
```bash
npm run dev      # nodemon, hot-reload
# or
npm start
```

**Frontend** (from `frontend/`):
```bash
npm run dev
```

The app will be available at the Vite dev URL (typically `http://localhost:5173`), talking to the API at `http://localhost:3000/api`.

### 5. Try the flow

1. Register a new account → log in
2. Land on the main hub → **Plan a Trip**
3. Search a city, add it as a stop, set dates
4. Add activities to a stop, watch the budget update
5. Save the itinerary → view it on the calendar or your trip list
6. Generate a public share link
7. Post about it in the Community tab

---

## 📡 API Reference

All protected routes expect `Authorization: Bearer <token>`.

| Domain | Base Path | Examples |
|---|---|---|
| Auth | `/api/auth` | `POST /register`, `POST /login`, `POST /forgot-password` |
| Trips | `/api/trips` | `POST /`, `GET /`, `GET /:id`, `PUT /:id`, `DELETE /:id`, `GET /recommendations`, `GET /calendar` |
| Itinerary | `/api/trips/:id/stops` | `POST /`, `PUT /:stopId`, `DELETE /:stopId`, `PUT /reorder`, `POST /:stopId/activities` |
| Budget | `/api/trips/:id/budget` | `GET /`, `POST /` |
| Search | `/api/cities`, `/api/activities` | `GET /search` |
| Users | `/api/users` | `GET /me`, `PUT /me`, `DELETE /me`, `GET/POST/DELETE /me/saved-destinations` |
| Community | `/api/community` | `GET /posts`, `POST /posts`, `POST /posts/:id/like`, `POST /posts/:id/comments` |
| Sharing | `/api/trips/:id/share`, `/api/public` | `POST /share`, public read-only itinerary view |
| Admin | `/api/admin` | `GET /stats`, `GET /top-cities`, `GET /top-activities`, `GET /users`, `PUT /users/:id/status` |

---

## 📁 Project Structure

```
globe-trotter-main/
├── frontend/
│   ├── src/
│   │   ├── routes/        # Screen-level components (dashboard, login, itinerary, admin, etc.)
│   │   ├── services/api.js  # Centralized API client
│   │   ├── components/    # Shared UI pieces
│   │   ├── assets/        # Images, logo
│   │   └── App.jsx        # Screen router / app shell
│   └── package.json
└── globetrotter-backend/
    ├── prisma/
    │   ├── schema.prisma  # Data model
    │   └── seed.js        # Demo data
    └── src/
        ├── routes/        # Express route definitions
        ├── controllers/   # Business logic
        ├── models/        # Prisma data-access wrappers
        ├── middleware/     # Auth, admin, validation
        ├── utils/         # JWT, hashing, budget calc, pagination, etc.
        └── app.js / server.js
```

---

## 📈 Scalability & Future Roadmap

The current architecture is a solid hackathon-grade MVP; here's how it can grow into a production system:

- **Routing:** Move the frontend off the `currentScreen` state machine onto a real router (e.g. React Router) with URL-addressable pages — enables deep-linking, browser back/forward, and SEO for public trip pages.
- **Caching & performance:** Introduce Redis for session/token blacklisting, popular-city search caching, and rate limiting on public/share endpoints.
- **Search at scale:** As the `cities`/`activities` catalog grows, move search from raw SQL `LIKE` queries to a dedicated search engine (Elasticsearch/Meilisearch) or full-text indexes for typeahead and fuzzy matching.
- **Real external data:** Replace/augment the seeded `City`/`Activity` catalog with live data from a maps, places, or travel-content API for pricing, images, and opening hours.
- **File storage:** Move `profilePhoto` / `coverPhoto` off local paths to object storage (S3-compatible) with a CDN.
- **Notifications:** Add email/push notifications for trip reminders, community interactions, and collaborator invites.
- **Collaboration:** Extend `Trip` to support multiple collaborators (not just an owner), with role-based permissions — a natural next step given the existing `User ↔ Trip` relation.
- **Horizontal scaling:** The stateless JWT-based API and separate Prisma/MySQL layer already support running multiple API instances behind a load balancer; adding a managed MySQL (e.g. read replicas) supports read-heavy growth (browsing cities/community feed).
- **Observability:** Structured logging, request tracing, and error monitoring (e.g. Sentry) for production readiness.
- **CI/CD & containerization:** Dockerize both services and add a pipeline for migrations, tests, and deployments.
- **Testing:** The backend currently has no test suite (`npm test` is a placeholder) — adding unit tests for controllers/utils and integration tests for routes would harden it before scaling traffic.

---

## ✅ Feasibility

- **Technically proven:** every core feature (auth, trip CRUD, itinerary building, budgeting, sharing, community, admin) is already implemented and wired end-to-end between frontend and backend — this isn't a concept, it's a working prototype.
- **Low infrastructure cost to start:** Node.js + MySQL is cheap to host (a single small VM or managed MySQL + Node service) and scales vertically well before any re-architecture is needed.
- **Clear monetization/growth paths:** premium itinerary templates, partnered activity bookings/affiliate links, or a "pro" collaborative-trip tier are natural extensions of the existing `Trip`/`Activity` model.
- **Modular by design:** because routes, controllers, and models are split per domain, individual modules (e.g. Community, Admin) can be spun out, deprecated, or rebuilt without destabilizing the rest of the app.
- **Realistic gaps, not blockers:** the main missing pieces for production (real place data, tests, proper routing, file storage) are well-understood, incremental engineering tasks rather than open research problems — making the path from hackathon prototype to shippable product straightforward.

---

*Made with ✈️ for travelers who'd rather explore the world than manage a spreadsheet.*
