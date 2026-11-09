# Personal Finance Dashboard

A data-heavy React + TypeScript application for tracking personal finances, visualizing spending trends, and managing budgets.

## Status

🚧 In active development — core features complete, now adding testing and deeper analytics.

## Features

- ✅ Dashboard with monthly spending summary and category breakdown
- ✅ Transaction management (add, edit, delete) with React Hook Form + Zod validation
- ✅ Analytics page — monthly bar chart and category breakdown (Recharts)
- ✅ Skeleton loading states and reusable UI components (modal, stat cards, change badges)
- ✅ Data layer — storage helper, seed data, formatters
- ✅ Local persistence via localStorage

## Tech Stack

- **React 18 + TypeScript** — component architecture and type safety
- **Vite** — build tooling
- **TanStack Query** — server state and data management
- **React Hook Form + Zod** — form handling and schema validation
- **Recharts** — data visualization and charts
- **Tailwind CSS** — styling
- **React Router** — client-side routing

## Roadmap

- [ ] Unit and component tests (Vitest + React Testing Library)
- [ ] Budget tracking with savings-goal progress
- [ ] CSV import/export of transactions
- [ ] Recurring transactions
- [ ] Code-split routes with React.lazy to reduce bundle size
- [ ] Dark mode
- [ ] Deploy to Netlify with a live demo link

## Local Setup

```bash
npm install
npm run dev
```

## Author

Omar Alzubi — [Portfolio](https://omar-alzubi-portfolio.netlify.app) · [LinkedIn](https://linkedin.com/in/omaralzubi-007oa)
