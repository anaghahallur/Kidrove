# Kidrove AI & Robotics Summer Workshop Landing Page

A complete full-stack project featuring a highly responsive, modern educational landing page built with React.js (TypeScript, Vite, Tailwind CSS v4) and an Express.js (TypeScript) enquiry service.

---

## 🚀 Tech Stack & Design Aesthetics

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons.
- **Backend**: Express.js, TypeScript, Mongoose (MongoDB), local file system database fallback.
- **Design Choices**: Clean card layout, rounded typography, harmonious HSL color system (Vibrant Blue, Teal Growth, Playful Purple, Creative Orange) to evoke trust and creativity, matching the family-centric style of `kidrove.com`.

---

## 🛠️ Project Structure

```
kidrove-workshop/
├── package.json               # Root scripts to start both services concurrently
├── README.md                  # Documentation and Submission details
├── frontend/                  # React + TS + Tailwind CSS (Vite)
│   ├── src/
│   │   ├── components/        # Header, Hero, Details, Outcomes, FAQ, RegistrationForm, Footer
│   │   ├── App.tsx            # App Layout & Smooth Scroll handlers
│   │   ├── index.css          # Tailwind imports & CSS-driven @theme configuration
│   │   └── main.tsx           # Entry point
│   ├── vite.config.ts         # Vite configuration with @tailwindcss/vite plugin
│   └── package.json
└── backend/                   # Express.js API (TypeScript)
    ├── src/
    │   ├── server.ts          # Main Express server entry point with input validation & fallback db
    │   └── models/            # Enquiry mongoose schema
    └── package.json
```

---

## 📦 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+) and `npm` installed.

### Installation

Run the installation script in the root directory to download dependencies for the root orchestrator, frontend, and backend packages:

```bash
npm run install:all
```

### Running Locally (Development Mode)

Start both the React development server (Vite) and Express API server concurrently using:

```bash
npm run dev
```

- **Frontend** will be running at: `http://localhost:5173`
- **Backend API** will be running at: `http://localhost:5001`

---

## 💾 Database Strategy (Robust Fallback)

To ensure the application runs smoothly out-of-the-box on any machine, the backend implements a **dual-persistence system**:
1. **Primary**: Connects to local MongoDB at `mongodb://127.0.0.1:27017/kidrove`.
2. **Fallback**: If MongoDB connection fails, registrations are saved directly to `backend/data/enquiries.json` inside the backend directory.

---

## 📝 Submission & Approach Details

### Our Approach

For this assignment, we developed a highly modular, component-driven React application structured under a single monorepo orchestrator. We prioritized visual excellence and layout responsiveness using **Tailwind CSS v4** with a custom CSS `@theme` setup. The frontend incorporates client-side input checking (regex validations), custom-generated robot artwork representing AI & Robotics, and loading state animations. The Express backend uses TypeScript and exposes `POST /api/enquiry` with server-side validation checks, and features a bulletproof local JSON storage fallback to guarantee zero data loss, even if local MongoDB is unavailable.

### Future Improvements

If given more time, we would make the following improvements:
1. **Interactive Workshop Schedule**: Add an interactive scheduling tool or Google Calendar booking modal where parents can choose specific time slots for live batches.
2. **Payment Integration**: Implement Stripe Checkout to allow immediate purchase of the ₹2,999 workshop seat directly after form validation.
3. **Admin Dashboard**: Build a protected dashboard (`/admin`) for Kidrove administrators to view, search, and export enquiries as CSVs.
4. **CI/CD & Cloud deployment**: Deploy the frontend to Vercel/Netlify and the backend database to MongoDB Atlas with server hosting on Render or Railway.
5. **E2E Testing**: Add Cypress or Playwright end-to-end tests to automate registration validation testing.
