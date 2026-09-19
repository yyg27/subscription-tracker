<div align="center">
  <h1>SubTrack</h1>
  <p>A modern, full-stack subscription tracking application designed with a sleek OLED & Lime aesthetic.</p>

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
</div>

The application provides a seamless way to track recurring expenses, manage digital subscriptions, and monitor total monthly budgets. It features a unique responsive design that behaves as a sleek desktop hardware mockup on larger screens, while seamlessly adapting into a native-feeling, full-screen Progressive Web App (PWA) layout on mobile devices.

The project was built using the **MERN** stack (MongoDB, Express, React, Node.js) combined with **Vite** and **Tailwind CSS v4**, focusing on minimal dependencies, high performance, and robust backend security.

## Live Demo

**[Coming Soon - Vercel/Render](#)**

----------

## Features

- **Responsive Design:** Native full-screen PWA layout on mobile, physical titanium phone mockup on desktop.
- **Dependency-Free Animations:** Custom HTML5 Canvas `BeamsBackground` ensuring smooth 60fps performance without heavy libraries like Framer Motion.
- **Secure Authentication:** JWT-based user login and registration with Bcrypt password hashing and user-specific data isolation.
- **i18n Localization:** Native lightweight Context API for instant English / Turkish translations without external packages.
- **Expense Dashboard:** Track active, cancelled, and expired subscriptions, view renewal dates, and monitor your total monthly wallet summary.
- **Robust Backend:** Node.js/Express API with strict Mongoose schemas and graceful error handling for third-party workflows (Arcjet / Upstash).

----------

## Tech Stack

### Frontend (Client)
-   **React 18**
-   **Vite**
-   **Tailwind CSS v4**
-   **React Router DOM**

### Backend (Server)
-   **Node.js & Express**
-   **MongoDB & Mongoose**
-   **JSON Web Tokens (JWT) & Bcrypt**
-   **Arcjet (Security) & Upstash (Workflows)**

----------

## Getting Started

### Prerequisites

Make sure you have **Node.js**, **npm**, and a **MongoDB** connection string.

### Installation

Clone the repository and install the dependencies for both client and server:

```bash
git clone https://github.com/yyg27/subscription-tracker-backend.git
cd subscription-tracker-backend

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Environment Variables

Create `.env.development.local` in the `server` directory and add your credentials:

```env
PORT=3000
NODE_ENV=development
DB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/subscription-tracker
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
ARCJET_ENV=development
ARCJET_KEY=your_arcjet_key
QSTASH_URL=your_qstash_url
QSTASH_TOKEN=your_qstash_token
```

### Development

You will need two terminal instances to run the full stack locally.

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
# The API will be available at: http://localhost:3000
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
# The Client will be available at: http://localhost:5173
```

----------

## Project Structure

```text
.
├── client/                 # React Frontend
│   ├── public/
│   │   └── favicon.svg     # Custom Lime Credit Card Favicon
│   ├── src/
│   │   ├── components/
│   │   ├── Dashboard.jsx   # Expense management & total calculations
│   │   ├── Login.jsx       # Secure Auth Form
│   │   ├── Register.jsx    # Secure Auth Form
│   │   ├── LanguageContext # Custom i18n logic
│   │   ├── BeamsBackground # Dependency-free canvas animation
│   │   ├── App.jsx
│   │   └── index.css       # Tailwind v4 configuration & theme
│   └── vite.config.js
│
├── server/                 # Node.js API Backend
│   ├── controllers/        # Auth, User, and Subscription logic
│   ├── middlewares/        # JWT auth, Arcjet security, error handling
│   ├── models/             # Mongoose schemas (User, Subscription)
│   ├── routes/             # Express API endpoints
│   ├── config/             # Upstash & Arcjet configurations
│   └── app.js              # Express app entry point
│
└── README.md
```

----------

## Images & Media

Static media files and icons are optimized and stored in the `client/public` directory. The custom Credit Card SVG favicon (`favicon.svg`) is served as a standalone static asset to keep the HTML structure clean and maintain the OLED/Lime aesthetic.

----------

## Deployment

The application is structured for split deployment:
- **Frontend (`/client`)**: Optimized for **Vercel** or **Netlify**.
- **Backend (`/server`)**: Optimized for **Render**, **Railway**, or **Heroku**.

Make sure to set the production environment variables respectively on your hosting platforms.

----------

## Developer

**Yusuf Yiğit Gültekin**

GitHub: **[@yyg27](https://github.com/yyg27)**

----------

## License

MIT License
