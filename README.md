# Mini Service Request Board - Technical Assessment

This project is a stripped-down, single-page version of a service request platform. It allows homeowners to post service requests and tradespeople to browse, view details, filter by category, and update job statuses.

## 🔗 Live Links
- **Live Frontend (Vercel):** https://mini-service-request-board-v-ashen-8223s-projects.vercel.app/
- **Live API (Vercel):** https://mini-service-request-board-vflx.vercel.app/

---

## 🛠 Tech Stack
- **Frontend:** Next.js (App Router), Tailwind CSS
- **Backend:** Node.js + Express.js (REST API)
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Deployment:** Vercel (Frontend & Backend)

---

## 📂 Project Structure
- `/backend`: Express server, MongoDB models, and API controllers.
- `/frontend`: Next.js application for the user interface.

---

## 🔑 Required Environment Variables

To run this project locally, create the following files:

### Backend (`/backend/.env`)

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/databaseName   
PORT=5001

### Frontend (/frontend/.env.local)

NEXT_PUBLIC_API_URL=http://localhost:5001/api

** Setup & Run Instructions

1. Clone the repository

git clone https://github.com/V-Ashen/Mini-Service-Request-Board.git
cd Mini-Service-Request-Board

2. Run the Backend

cd backend
npm install
npm start
(The API will be listening on http://localhost:5001)

3. Run the Frontend

cd ../frontend
npm install
npm run dev
The UI will be available at http://localhost:3000

** Features Implemented

Data Model: JobRequest collection with title, description, category, location, contact info, and status.
REST API: Complete CRUD endpoints for managing jobs.
Filtering: Filter jobs by category via the API and Frontend dropdown.
Validations: Server-side Mongoose validation and client-side form validation.
UI/UX:
-Home: Card-based list with category filters.
-New Job: Functional form to create requests.
-Details: View full job data, update status via dropdown, and delete requests (with confirmation).