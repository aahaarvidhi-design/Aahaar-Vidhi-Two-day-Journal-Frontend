
# Aahaar Vidhi Assessment - Frontend

A mobile-first React application for conducting Ayurveda Body Constitution (Prakriti) assessment and collecting daily journal responses for research studies.

## Features

### User Features

- User Registration
- User Login
- JWT Authentication
- Body Constitution Assessment
- Vata / Pitta / Kapha Analysis
- Constitution Result Screen
- Daily Journal Submission
- Journal History
- Mobile Responsive Design
- Bottom Navigation
- Home Dashboard

### Admin Features

- Dashboard
- Manage Assessment Questions
- Manage Journals
- View Participants
- View Study Responses
- Reports

---

## Tech Stack

- React
- React Router DOM
- Axios
- Bootstrap 5
- React Bootstrap

---

## Installation

Clone the repository

```bash
git clone <repo-url>
```

Navigate to project

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

---

## Environment Variables

Create:

```bash
.env
```

Add:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Production:

```env
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

---

## Start Development Server

```bash
npm start
```

Application runs at:

```text
http://localhost:3000
```

---

## Build Production Version

```bash
npm run build
```

Build output:

```text
build/
```

---

## Folder Structure

```text
src/

├── api/
│   ├── axios.js
│   ├── authApi.js
│   ├── assessmentApi.js
│   ├── journalApi.js
│   └── adminApi.js
│
├── components/
│   ├── common/
│   │   ├── Navbar.jsx
│   │   ├── BottomNavigation.jsx
│   │   └── AdminSidebar.jsx
│   │
│   ├── assessment/
│   │   └── QuestionCard.jsx
│   │
│   └── journal/
│       └── MCQQuestion.jsx
│
├── context/
│   └── AuthContext.jsx
│
├── routes/
│   ├── ProtectedRoute.jsx
│   └── AdminRoute.jsx
│
├── pages/
│   ├── auth/
│   ├── assessment/
│   ├── journal/
│   ├── admin/
│   └── Home.jsx
│
├── App.js
└── index.js
```

---

## User Flow

```text
Login/Register
        ↓
Home
        ↓
Body Constitution Assessment
        ↓
Assessment Result
        ↓
Journal
        ↓
Journal History
```

---

## Admin Flow

```text
Admin Login
        ↓
Dashboard
        ↓
Questions
        ↓
Journals
        ↓
Participants
        ↓
Study Responses
        ↓
Reports
```

---

## Deployment

### Frontend

Recommended:

- Vercel
- Netlify

Example:

```bash
npm run build
```

Deploy the `build` folder.

---

## Author

Aahaar Vidhi Research Study
