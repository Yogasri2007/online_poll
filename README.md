# OnlinePoll
INTERN ID : CITS1390
NAME : YOGARSI M
NO.OF WEEKS : 4
PROJECT NAME : REAL-TIME POLL APPLICATION
A React + Vite application for creating, managing, and analyzing polls. This project includes authentication, poll creation, templates, analytics, bookmarks, and user profile settings.

## Features

- Create and publish polls with multiple question types
- View poll details and analytics
- User authentication with login/register pages
- Template library for quick poll creation
- Bookmark polls for later access
- Responsive UI with charts and interactive components
- Notifications, comments, and sharing support

## Tech Stack

- React 18
- Vite
- React Router DOM
- Bootstrap 5
- Chart.js and react-chartjs-2
- Framer Motion
- React Icons
- UUID

## Project Structure

- `src/`
  - `App.jsx` - main app component
  - `main.jsx` - entry point
  - `components/` - reusable UI components
  - `context/` - authentication and theme context providers
  - `pages/` - application pages and views
  - `services/` - storage utilities
  - `styles/` - global CSS
  - `utils/` - helper utilities

## Setup

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview the production build locally

```bash
npm run preview
```

## Notes

- This is a client-side application scaffolded with Vite.
- If authentication or backend features are required, connect the app to an API or add local storage support in `src/services/storage.js`.

## License

This project is currently private and does not include a license file.
