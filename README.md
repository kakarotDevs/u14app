# North Lakes United FC U14

Static single-page site for the U14 team. Uses HTML, Tailwind (CDN), and htmx to load fixtures and news.

## Local dev

- Start a simple static server on port 3000 (Node example):

```bash
npx serve -l 3000
```

- Open `http://localhost:3000` in your browser.

## Project structure

- `index.html` main page layout and content
- Tailwind is loaded via CDN in `index.html`
- `partials/` HTML snippets loaded by htmx
- `assets/` images and static assets

## Chat

Team chat is available via the "Open Chat" button. Currently uses localStorage (each device has its own data).

- Set your name to post messages
- Create or switch rooms
- Edit/delete only your own messages
- For shared chat across users, a backend will be needed later
