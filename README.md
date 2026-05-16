# StudentSupportNavigator

# Description
This website is an application that helps students search for campus resources like libraries, dining halls, etc.

# Targeted Browsers
This application is targeted for desktop & mobile browsers such as Google Chrome and Safari.

# Developer Manual Link
See the Developer Manual below:

docs/developer-manual.md

# Developer Manual

## Installation Instructions

### 1. Clone the Repository

git clone https://github.com/grantt123/StudentSupportNavigator.git

---

### 2. Type these in Terminal

cd client
npm install

---

### 3. Type these in Terminal after

cd server
npm install

---

## Create a .env file inside the server folder and put this in it:

SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

---

## Supabase Setup

Run the following SQL code inside the Supabase SQL Editor:

create table favorites (
  id bigint generated always as identity primary key,
  name text,
  latitude text,
  longitude text,
  category text
);

Then run this after you run the previous code:

GRANT SELECT ON public.favorites TO anon;
GRANT INSERT ON public.favorites TO anon;
GRANT DELETE ON public.favorites TO anon;

---

### To Start Backend Application Run This

cd server
npm run dev

Backend runs on:
http://localhost:5000

---

### Start Frontend Application Run This

Open another terminal and run:

cd client
npm run dev

Frontend runs on:

http://127.0.0.1:5500/client/index.html

You can use VS Code Extension 'Live Server' as well

---

# API Endpoints

## GET `/api/search`

Searches campus locations using the OpenStreetMap Nominatim API.

## GET `/api/favorites`

Retrieves all saved favorite resources from Supabase.

---

## POST `/api/favorites`

Saves a new favorite resource to Supabase.

---

## DELETE `/api/favorites/:id`

Deletes a favorite resource by ID.

---

# Frontend Libraries Used

## Leaflet.js

Used for displaying interactive maps and markers.

## Chart.js

Used for displaying resource statistics and visualizations.

---

# Known Bugs

- Some OpenStreetMap searches may return inconsistent results depending on wording.
- Map marker icons may need additional configuration in the deployment.
- Mobile responsiveness can be improved.

---

# Future Development Roadmap

- User authentication
- Personalized recommendations
- Category filters
- Expanded campus datasets
- Improved chart analytics

---

# Deployment

The application is intended to be deployed using Vercel.