# Portal App

Video Demo: https://youtu.be/ExyVedMCz3M
Deployed Link: https://assignment.bhusalravi.com.np

Simple full-stack property portal with React (frontend) and Express + PostgreSQL (backend).

## Run the app

1. Install dependencies:

```bash
cd backend
npm install

cd ../frontend
npm install
```

2. Create environment files:

- Copy `backend/.env.example` to `backend/.env`
- Copy `frontend/.env.example` to `frontend/.env`

3. Once the DB environment variables are written, run migration:

```bash
cd backend
npx tsx script/migrate.ts
```

4. Start backend (Terminal 1):

```bash
cd backend
npm run dev
```

5. Start frontend (Terminal 2):

```bash
cd frontend
npm run dev
```

6. Open the frontend URL shown by Vite (usually `http://localhost:5173`).

## Example flows

1. Sign up -> Login -> Add favourite
- Create account from the signup page.
- Login with the same credentials.
- Browse properties and click favourite on any property.
- Open favourites page to verify it was saved.

2. Add property -> View your properties
- Login.
- Open add property page and submit a new listing.
- Open your properties page to confirm your listing appears.

3. Remove favourite
- Login and open favourites page.
- Remove one item from favourites.
- Refresh to confirm it is no longer listed.
