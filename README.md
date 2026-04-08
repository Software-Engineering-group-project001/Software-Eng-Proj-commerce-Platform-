# Software_Eng_Proj_Ecommerce-Platform
 Building a fully functional e-commerce platform with user authentication, product catalog, shopping cart, and order management.

 🛒 CampusCartAi
 
 Overview
This project is a full-stack e-commerce web application built with a team of 6 developers. The goal is to create a scalable platform where users can browse products, manage accounts, add items to a cart, and complete purchases.
The application includes both frontend (React) and backend (Node.js/Express + PostgreSQL) components, along with authentication, payments, and admin features.

 Features
User registration and login (JWT authentication)
Product browsing and search
Shopping cart functionality
Order creation and checkout flow
Admin dashboard for product management
Payment integration (Stripe - test mode)
Reviews and ratings system
Secure backend with role-based access

 Tech Stack
Frontend
React
Context API (state management)
CSS / Styling
Backend
Node.js
Express.js
PostgreSQL
Other Tools
JWT (Authentication)
Stripe (Payments)
AWS (Deployment - planned)
GitHub Actions (CI/CD - planned)

👥 Team Breakdown
 Frontend Lead (UI & UX) — Marvin Ampofo
Builds UI components and pages
Handles routing and layout
Ensures consistent user experience
Key Files:
frontend/src/pages/
frontend/src/components/
frontend/src/styles/

 Authentication & User Management — Love Nepali
User login & registration
JWT authentication
Role-based access (user/admin)
Key Files:
backend/src/routes/authRoutes.js
backend/src/controllers/authController.js
backend/src/models/User.js

 Product & Admin Management — Peace Enweriku
Product CRUD operations
Admin dashboard logic
Inventory management
Key Files:
backend/src/models/Product.js
backend/src/routes/productRoutes.js
backend/src/controllers/productController.js

 Cart & Order Management — Felistus Karanja
Shopping cart logic
Order creation and history
Checkout process
Key Files:
frontend/src/context/CartContext.js
backend/src/models/Order.js
backend/src/routes/orderRoutes.js

 Payments, Reviews & Ratings — Person 5
Stripe integration
Payment handling
Product reviews system
Key Files:
backend/src/routes/paymentRoutes.js
backend/src/models/Review.js

 DevOps, Database & Security — Person 6
Database design (PostgreSQL)
Environment configuration
Deployment setup (AWS)
Security best practices
Key Files:
backend/src/config/db.js
backend/.env



project-root/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   └── styles/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── config/
│   └── .env
│
└── README.md


How to Get Started
1. Clone the Repository
git clone https://github.com/your-repo-name.git
cd your-repo-name

3. Install Dependencies
Frontend
cd frontend
npm install
Backend
cd backend
npm install

5. Set Up Environment Variables
Create a .env file inside /backend and add:
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key

7. Run the Application
Start Backend
cd backend
npm run dev
Start Frontend
cd frontend
npm start

Current Status
In Development
Core features are being built in parallel by team members
Deployment and CI/CD setup in progress
