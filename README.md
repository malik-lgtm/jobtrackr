# JobTrackr

A job application tracker. Add every job you apply to, drag it across **Applied → Interview → Offer → Rejected**, and see how your search is going on a dashboard.

**Live demo:** https://your-app.vercel.app
**Demo login:** demo@example.com / your-demo-password

![Board screenshot](screenshots/board.png)
![Dashboard screenshot](screenshots/dashboard.png)

## Features

- Sign up, log in and log out (Supabase Auth) with protected routes
- Add, edit and delete jobs, with form validation (React Hook Form + Zod)
- Kanban board with drag and drop, including touch and keyboard support
- Search, filter by status and sort
- Dashboard with a status chart and applications per week (Recharts)
- Loading, error and empty states on every screen
- Dark mode, responsive layout, keyboard accessible
- Unit tests with Vitest and React Testing Library

## Tech stack

React 18, JavaScript (JSX), Vite, Tailwind CSS v4, React Router, TanStack Query, React Hook Form, Zod, dnd-kit, Recharts, Supabase (Postgres + Auth), Vitest.

## Run it locally

```bash
git clone https://github.com/malik-lgtm/jobtrackr.git
cd jobtrackr
npm install
cp .env.example .env     # then add your Supabase keys
npm run dev
```

### Set up Supabase (free)

1. Create a project at https://supabase.com
2. Open **SQL Editor**, paste the contents of `supabase/schema.sql` and run it
3. Open **Project Settings → API** and copy the Project URL and the anon public key into `.env`
4. For quick testing, turn off email confirmation under **Authentication → Providers → Email**

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Build for production |
| `npm test` | Run the tests |

## Deploy to Vercel

1. Push the project to GitHub
2. Import the repo on https://vercel.com
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under **Environment Variables**
4. Deploy. `vercel.json` already handles page refreshes on routes like `/board`

## Challenges I solved

Replace these with your own words after you build it. Examples:

- **Keeping each user's data private.** I used Supabase Row Level Security so the database only returns rows where `user_id` matches the logged-in user.
- **Making drag and drop feel instant.** I update the cache optimistically with React Query and roll back if the request fails.
- **Drag and drop on phones and keyboards.** I configured separate mouse, touch (press and hold) and keyboard sensors so scrolling, clicking and Space-to-move all work.
- **Keeping the first load fast.** The Dashboard page is lazy-loaded so the charts library isn't downloaded until needed.

## Future improvements

- Reminders for follow-ups
- Interview timeline per job
- CSV export
