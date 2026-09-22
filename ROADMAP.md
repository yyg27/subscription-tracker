# SubTrack - Development Roadmap

This document tracks upcoming features and architectural decisions. It serves as the single source of truth when switching development environments.

## 🎉 All Major Tasks Completed

The MVP (Minimum Viable Product) is fully realized. The following features have been successfully built and deployed:

**Profile & Settings Page (`/profile`)**
- [x] **Language Toggle:** Moved to the settings menu to clean up the Dashboard UI.
- [x] **Export Data (CSV):** Users can download all their subscriptions as a `.csv` file.
- [x] **Change Password:** Secure flow for users to change their password via the UI.
- [x] **Notification Preferences:** Toggles to enable/disable specific reminders, including Telegram integration.
- [x] **Account Management:** Form to update Name/Email, and a "Delete Account" button to wipe the user data.

**Authentication & Reminders**
- [x] **Forgot Password Flow:** Full UI and backend logic connected for password reset via email.
- [x] **Email & Telegram Reminders:** Upstash QStash integrated to automatically wake up and send alerts X days before renewal.
- [x] **"Keep me signed in":** Persistent 1-year token architecture supporting PWA standards.

## Backlog / Future Ideas (Post-MVP)

*Currently empty. The app is complete and follows the YAGNI (You Aren't Gonna Need It) principle.* 

## Completed Milestones
- [x] **Subscription Edit (Update):** Added pencil icon. Refactored Dashboard form to handle both Create/Update seamlessly. Fixed IDOR vulnerability.
- [x] **Total Budget Summary:** Implemented a dynamic grouped total (by currency: TL, USD, EUR).
- [x] **Email Infrastructure:** Nodemailer configured with environment variables.
- [x] **Responsive PWA Layout:** Optimized interface to render edge-to-edge on mobile screens (iOS Home Screen Web App).
