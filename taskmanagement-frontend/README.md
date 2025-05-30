# ✅ Task Management App

A full-stack task management application with user authentication, task creation, updating, and deletion. Built using the **MERN** stack with **JWT authentication** and a responsive **React.js** frontend.

---

## 🔑 Features  

- User Registration & Login (JWT-based)
- Create, Read, Update, Delete (CRUD) tasks
- Responsive UI
- RESTful API with secure access

---

## ⚙️ Tech Stack

- **Frontend:** Next.js (React), Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Auth:** JWT (JSON Web Token)

---

## 📁 Folder Structure

taskmanagementapp/ 
│ ├── index.js # Main backend file
    ├── package.json # Backend dependencies and scripts 
  ├── /taskmanagement-frontend 
  │ ├── package.json # Frontend dependencies and scripts 
  │ ├── README.md # Frontend documentation 
    │ └── /src 
    │ ├── App.js 
    │ ├── index.js 
    │ ├── Login.js 
    │ ├── Signup.js 
    │ ├── Task.js 
    │ ├── App.css
    | ├── LemonPay Logo.png

### 1. Clone the Repository

git clone <your-repo-url>
cd taskmanagementapp

### 2. Install Backend Dependencies

npm install

### 3. Start MongoDB

Run the Mongodb Locally (default: mongodb://localhost:27017/) 

###  4. Start the Backend Server

npx nodemon

### 5. Setup the Frontend

cd taskmanagement-frontend
npm install

### 6. Start the Frontend

npm start

frontend will start on http://localhost:3001

### Usage

Visit the frontend URL in your browser.
Register a new user or log in with existing credentials.
Add, edit, and delete tasks using the UI.

