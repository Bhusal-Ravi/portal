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

## Route and Data Flow

### High-level flow

1. User interacts with React pages in `frontend/src/components`.
2. Components call backend APIs with `fetch` using `${VITE_BASE_URL}/api/...` and `credentials: 'include'`.
3. Express receives requests in `backend/server.ts` and forwards them to route modules under `backend/routes`.
4. Validation middleware checks inputs (`validate_signup`, `validate_login`, `validate_property`).
5. Auth-protected routes run `authMiddleware`, which reads JWT from the `token` cookie and sets `req.user`.
6. Route handlers run SQL from `backend/queries` using the PostgreSQL pool in `backend/connections/db_connection.ts`.
7. JSON response is returned to the frontend, which updates UI state (list, favourites, user data, etc.).

### Route map (frontend -> backend -> DB)

- Signup
	- Frontend: `POST /api/signup` from `Signup.tsx`
	- Backend: `routes/sign_up.ts` -> `validateSignup` -> hash password -> `createUser`
	- DB effect: inserts a new user row

- Login
	- Frontend: `POST /api/login` from `Login.tsx`
	- Backend: `routes/login.ts` -> `validateLogin` -> `checkUser` -> compare hash -> set `token` cookie
	- DB effect: reads user row and returns auth session cookie

- List all properties
	- Frontend: `GET /api/propertylist?offset=&limit=` from `Properties.tsx`
	- Backend: `routes/properties_list.ts` -> `authMiddleware` -> `offsetPropertyQuery`
	- DB effect: reads paginated properties with user-aware favourite state

- Add property
	- Frontend: `POST /api/property/add` from `Addproperty.tsx`
	- Backend: `routes/add_property.ts` -> `authMiddleware` -> `validateProperty` -> `insertProperty`
	- DB effect: inserts a new property linked to authenticated user

- Add/remove favourite
	- Frontend: `PUT /api/favourite/add` and `PUT /api/favourite/delete` from `Properties.tsx` and `Favourites.tsx`
	- Backend: `routes/favourite.ts` -> `authMiddleware` -> `insertIntoFavourite` or `deleteFromFavourite`
	- DB effect: inserts/deletes rows in favourites relation

- List current user favourites
	- Frontend: `GET /api/userfavourite?offset=&limit=` from `Favourites.tsx`
	- Backend: `routes/user_favourite.ts` -> `authMiddleware` -> `listuserFavourite`
	- DB effect: reads paginated favourite properties for current user

- List current user properties
	- Frontend: `GET /api/userproperty?offset=&limit=` from `Yourproperty.tsx`
	- Backend: `routes/user_property.ts` -> `authMiddleware` -> `listuserProperty`
	- DB effect: reads paginated properties owned by current user

- Delete own property
	- Frontend: `DELETE /api/delete/:id` from `Yourproperty.tsx`
	- Backend: `routes/delete_properties.ts` -> `authMiddleware` -> `deleteProperty`
	- DB effect: deletes a property only if it belongs to current user

- Get logged-in user info
	- Frontend: `GET /api/user` from `Navbar.tsx`
	- Backend: `routes/userinfo.ts` -> `authMiddleware` -> returns `name` and `email` from `req.user`
	- DB effect: no DB write, returns user identity from validated token

- Health check
	- Backend: `GET /api/health` in `routes/health_check.ts`
	- DB effect: no DB access, quick service status check
