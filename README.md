🛍️ E-Commerce Platform

A full-stack E-Commerce web application built with React.js, Node.js, Express, and MongoDB — featuring secure user authentication, dynamic product management, and responsive design for modern shopping experiences.

🚀 Features

• User authentication (register/login with JWT)

• Browse and search product catalog

• Add/remove items from cart

• Place and track orders

• Admin dashboard for managing products and users

• Responsive design for mobile and desktop

🛠️ Tech Stack

Frontend:

React.js

React Router

Axios

Tailwind CSS (or standard CSS)

Backend:

Node.js

Express.js

MongoDB

JWT for authentication

Stripe (or mock integration) for payments

📦 Installation

1️⃣ Clone the repository

    git clone https://github.com/AgHard/E-Commerce.git

    cd E-Commerce
    
2️⃣ Backend Setup

    cd backend

    npm install

Create a .env file inside the backend/ directory:

    PORT=5000

    MONGO_URI=your_mongodb_connection_string

    JWT_SECRET=your_jwt_secret

    STRIPE_SECRET_KEY=your_stripe_secret_key

Run the backend server:

    npm run dev

The backend will be running at http://localhost:5000.

3️⃣ Frontend Setup

    cd ../frontend
    npm install
    npm start
The frontend will be running at http://localhost:3000.

📁 Project Structure

    E-Commerce/

    ├── backend/               # Express backend API

    │   ├── controllers/       # Business logic

    │   ├── models/            # Mongoose models

    │   ├── routes/            # API route definitions

    │   ├── middleware/        # Auth middleware

    │   └── server.js          # Entry point
    │
    ├── frontend/              # React frontend

    │   ├── public/            # Static assets

    │   ├── src/

    │   │   ├── components/    # Reusable UI components

    │   │   ├── pages/         # Page components

    │   │   └── App.js         # Main app

    │
    ├── package.json           # Root config (optional)

    └── README.md              # Project documentation

🧪 Available Scripts

Backend:

npm run dev – Start backend with nodemon

npm run start – Start backend in production

Frontend:

npm start – Run React app

npm run build – Create production build

npm test – Run test suite (if configured)

🤝 Contributing

Contributions are welcome!

• Fork the repository and submit a pull request with improvements or new features.

📄 License

• This project is licensed under the MIT License.

