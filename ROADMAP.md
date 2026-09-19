# SubTrack - Development Roadmap

This document tracks upcoming features and architectural decisions. It serves as the single source of truth when switching development environments.

## Next Major Task: Profile & Settings Page
Instead of a modal, a dedicated full-screen `/profile` page (route) will be created to handle user settings.

**Features to implement in the Profile Page:**
- [ ] **Language Toggle:** Move the floating TR/EN button from the Dashboard into the settings menu to clean up the UI.
- [ ] **Export Data (CSV/JSON):** Allow users to download all their subscriptions (name, price, currency, renewal date) as a .csv file with a single click.
- [ ] **Change Password:** Secure flow for users to enter their old password and set a new one (Requires Backend + UI).
- [ ] **Notification Preferences:** Toggles to enable/disable specific reminders (e.g., "Email me 7 days before").
- [ ] **Account Management:** Form to update First/Last Name, and a "Delete Account" button to wipe the user and all associated subscriptions from the database.

## Backlog / Paused Features

- [ ] **Forgot Password Flow:**
  - Backend API is complete (JWT token generation + Nodemailer logic is ready).
  - *Pending:* Add "Forgot Password" button to the Login screen and connect the email request UI.
- [ ] **Email / Telegram Reminders:**
  - Automatically send reminders to users for upcoming renewals. Requires setting up Upstash QStash or a native node-cron/setInterval mechanism. (Email infrastructure via .env is ready).

## Completed Milestones
- [x] **Subscription Edit (Update):** Added a pencil icon to the list. Refactored the Dashboard form to handle both Create and Update seamlessly (YAGNI approach). Fixed an IDOR vulnerability in the backend update endpoint.
- [x] **Total Budget Summary:** Implemented a dynamic grouped total (by currency: TL, USD, EUR) displayed prominently at the top of the Dashboard.
- [x] **Email Infrastructure (Nodemailer):** Removed hardcoded personal email addresses. Transitioned to environment variables (.env) with App Passwords.
- [x] **Responsive PWA Layout:** Optimized the interface to render edge-to-edge on mobile screens without physical device frames.
