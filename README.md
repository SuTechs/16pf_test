# 🧠 16PF Personality Assessment

A sleek, client-side Single Page Application for the **16 Personality Factor (16PF) Questionnaire** — a classic psychological assessment that measures 16 scientifically validated personality dimensions.

### 🔗 [**Live Demo → sutechs.github.io/16pf_test**](https://sutechs.github.io/16pf_test/)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Deploy](https://github.com/SuTechs/16pf_test/actions/workflows/deploy.yml/badge.svg)

---

## ✨ Features

- **105 questions** displayed one at a time for a frictionless experience
- **Auto-save** — progress is persisted to `localStorage`, so users never lose progress
- **3-step scoring engine** — raw scores → MD corrections → Sten conversion
- **Custom profile chart** — CSS Grid replicating the physical 16PF profile document with SVG connecting line
- **Motivational Distortion (MD)** detection with automatic score adjustments
- **Gender-specific Sten tables** — separate conversion norms for male and female college students
- **Mobile-first** — fully responsive dark theme with touch-friendly controls
- **Zero backend** — everything runs client-side in the browser
- **Auto-deploy** — pushes to `main` trigger GitHub Actions → GitHub Pages

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm

### Installation

```bash
git clone https://github.com/SuTechs/16pf_test.git
cd 16pf_test
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── types.ts                        # Core TypeScript interfaces
├── App.tsx                         # Root component with phase-based routing
├── data/
│   ├── questions.json              # 105 questions with scoring metadata
│   └── factorDescriptions.ts       # 16 factor labels & descriptions
├── hooks/
│   └── useTestState.ts             # State management + localStorage persistence
├── utils/
│   └── scoring.ts                  # Scoring engine (raw → MD adjust → Sten)
└── components/
    ├── OnboardingScreen.tsx         # Gender/age form + intro
    ├── QuestionnaireScreen.tsx      # Progress bar + question + options
    ├── ProcessingScreen.tsx         # Loading animation (2s)
    └── ResultsScreen.tsx           # Custom profile grid + factor details
```

## 🧪 How Scoring Works

The scoring follows the standard 16PF three-step process:

### 1. Raw Score Calculation
Each answer (a/b/c) maps to a weight (0, 1, or 2). Weights are summed per factor across 105 questions.

### 2. Motivational Distortion (MD) Corrections
The MD Sten score detects social desirability bias and adjusts affected factors:
- **MD Sten 10**: ±2 adjustments to O, Q4, C, Q3; ±1 to L, N, Q2, A, G, H
- **MD Sten 8–9**: ±1 adjustments to L, N, O, Q2, Q4, A, C, G, H, Q3
- **MD Sten 7**: ±1 adjustments to O, Q4, C, Q3

### 3. Sten Conversion
Adjusted raw scores are mapped to a 1–10 standardized scale using gender-specific lookup tables (Male/Female College Students, Form C).

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| [React](https://react.dev) | UI framework |
| [TypeScript](https://typescriptlang.org) | Type safety |
| [Vite](https://vite.dev) | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling |
| [Lucide React](https://lucide.dev) | Icons |

## 🚢 Deployment

This project auto-deploys to **GitHub Pages** via GitHub Actions on every push to `main`.

To enable on your fork:
1. Go to **Settings → Pages → Source** and select **GitHub Actions**
2. Push to `main` — the workflow handles the rest

## 📱 App Flow

```
Onboarding → Questionnaire (105 Qs) → Processing → Results
     │              │                                  │
     └─ gender/age  └─ auto-save to localStorage       └─ Profile grid + factor details
```

## 👤 Contributors

| | Name | Role | Links |
|---|------|------|-------|
| 🧑‍💻 | **Su Mit** | Developer | [LinkedIn](https://www.linkedin.com/in/su-mit/) · [Website](https://sutechs.com/) |
| 🎓 | **Nimisha Das** | Behavioral Science | [LinkedIn](https://www.linkedin.com/in/uxnimisha/) |

## 📄 License

MIT

---

<p align="center">
  Built with ❤️ for personality science
</p>
