# Task Management System

A robust and scalable Task Management System designed to streamline project workflows, team collaboration, and daily task reporting. The system features a role-based architecture with separate access levels for Admins/Managers, Team Leaders, and Team Members.

## 🚀 Features Overview

### 1. Role-Based Access Control
The platform supports three distinct roles with specific permissions:

* **Admin / Manager:**
  * Has global access to the workspace.
  * Can invite and add members to the project from a global pool of users.
  * Creates new Projects and Teams.
  * Assigns members to specific projects and selects a **Team Leader** from the added members.
  * Monitors overall project progress and team activities.
* **Team Leader:**
  * Manages their assigned team and project.
  * Further assigns specific tasks to their Team Members.
  * Tracks task completion and reviews daily reports.
* **Team Member (Interns/Employees):**
  * Receives assigned tasks from their Team Leader.
  * Submits daily work reports and updates task status.

### 2. Project & Team Management
* Dynamic project creation.
* Seamless team allocation from a global pool of invited users.

### 3. Task & Reporting Workflows
* Task assignment and tracking.
* Daily work report submission by team members.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** React.js + Vite
* **Routing:** React Router DOM
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **HTTP Client:** Axios
* **Icons:** Lucide React, React Icons
* **Notifications:** React Toastify
* **Data Parsing:** PapaParse (for CSV processing)

### Backend
* **Environment:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB with Mongoose
* **Authentication:** JSON Web Tokens (JWT) & bcrypt (Password Hashing)
* **Real-time Communication:** Socket.io
* **File Uploads:** Multer & Cloudinary
* **Data Processing:** CSV-Parser & xlsx

---

## 📂 Project Structure

```
TaskManagementSystem/
├── backend/                  # Node.js + Express Backend
│   ├── src/                  # Source code for API controllers, models, routes, etc.
│   ├── package.json          # Backend dependencies
│   └── ...
├── frontend/                 # React + Vite Frontend
│   ├── public/               # Static assets
│   ├── src/                  # Source code for components, pages, hooks, etc.
│   ├── package.json          # Frontend dependencies
│   ├── tailwind.config.js    # TailwindCSS configuration
│   └── vite.config.js        # Vite configuration
├── mock_users.csv            # Sample data for global user pool
├── intern_template.csv       # Sample data for intern structure
└── README.md                 # Project Documentation
```

---

## ⚙️ Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites
* [Node.js](https://nodejs.org/) (v16 or higher recommended)
* [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URL)
* [Cloudinary](https://cloudinary.com/) Account (For file uploads)

### 1. Clone the Repository
```bash
git clone <repository_url>
cd TaskManagementSystem
```

### 2. Backend Setup
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file and configure your environment variables (see below)
# Start the backend development server
npm run dev
```

### 3. Frontend Setup
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

---

## 🔐 Environment Variables

You will need to create a `.env` file in the `backend/` directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

*(Create a `.env` file in the `frontend/` directory if you have frontend-specific environment variables like `VITE_API_BASE_URL`)*

---

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License
This project is licensed under the ISC License.
