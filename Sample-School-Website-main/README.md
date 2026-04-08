# 🏫 M.M. Vidya Mandir Primary School - Complete MERN Stack Project

A comprehensive school management system built with MongoDB, Express.js, React, and Node.js featuring role-based dashboards, contact management, and analytics.

## ✨ Features Completed

### 🔐 Authentication & Authorization
- ✅ JWT-based authentication
- ✅ Role-based access control (Admin, Teacher, Student, Parent)
- ✅ Secure login/signup with validation
- ✅ Protected routes and API endpoints

### 📊 Dashboard Analytics
- ✅ Role-specific dashboards with real-time data
- ✅ Interactive charts and statistics
- ✅ User growth analytics
- ✅ Role distribution visualization
- ✅ Class-wise student distribution

### 📞 Contact Management System
- ✅ **Complete Contact Form** with backend integration
- ✅ **Email Notifications** - Users receive confirmation emails from rohitkhobare2005@gmail.com
- ✅ **Admin Email Alerts** - Admin gets notified of new submissions
- ✅ Form validation and error handling
- ✅ Success/error feedback messages
- ✅ Admin contact management dashboard
- ✅ Contact status tracking (Pending, In-Progress, Resolved)
- ✅ Contact statistics and analytics

### 👨💼 Admin CRUD Operations
- ✅ **Add New Students** - Complete student registration with user accounts
- ✅ **Add New Teachers** - Complete teacher hiring system with user accounts
- ✅ **Edit Student/Teacher Details** - Update information
- ✅ **Delete Students/Teachers** - Remove from system (deletes user accounts too)
- ✅ **View All Students/Teachers** - Management dashboard with search/filter
- ✅ **User Account Creation** - Automatic login credentials generation

### 🎯 Role-Based Features

#### 👨‍💼 Admin Dashboard
- ✅ Complete user management overview
- ✅ Student, teacher, parent statistics
- ✅ Contact form submissions management
- ✅ Analytics and reporting charts
- ✅ System-wide statistics

#### 👨‍🏫 Teacher Dashboard
- ✅ Class and student management
- ✅ Assigned classes overview
- ✅ Student statistics by class
- ✅ Teaching analytics

#### 👨‍🎓 Student Dashboard
- ✅ Personal profile information
- ✅ Class details and statistics
- ✅ Academic overview

#### 👨‍👩‍👧‍👦 Parent Dashboard
- ✅ Children's information
- ✅ Academic progress tracking
- ✅ Multi-child management

### 🎨 UI/UX Features
- ✅ Responsive mobile-first design
- ✅ Modern gradient-based theme
- ✅ Loading states and error handling
- ✅ Smooth animations and transitions
- ✅ Professional dashboard layouts

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1. Clone & Install

```bash
# Clone the repository
git clone <repository-url>
cd Sample-School-Website

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../
npm install
```

### 2. Environment Setup

Create `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URL=mongodb+srv://your-connection-string
JWT_SECRET=your-jwt-secret-key
ADMIN_EMAIL=admin@school.com
ADMIN_PASSWORD=SecureAdmin@2024
```

### 3. Database Setup

```bash
# Navigate to backend directory
cd backend

# Seed sample data (creates users, students, teachers, etc.)
npm run seed
```

### 4. Run the Application

```bash
# Terminal 1: Start backend server
cd backend
npm run dev

# Terminal 2: Start frontend development server
cd ../
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 🔑 Default Login Credentials

After running the seed script, use these credentials:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@school.com | admin123 |
| Teacher | sarah@school.com | teacher123 |
| Student | student1@school.com | student123 |
| Parent | parent1@school.com | parent123 |

## 📁 Project Structure

```
Sample-School-Website/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # API controllers
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── contactController.js
│   │   └── statisticsController.js
│   ├── middleware/      # Authentication middleware
│   ├── models/          # MongoDB models
│   │   ├── user.js
│   │   ├── student.js
│   │   ├── teacher.js
│   │   ├── parent.js
│   │   ├── class.js
│   │   └── contact.js
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── seedData.js      # Sample data seeder
│   └── server.js        # Main server file
├── src/
│   ├── components/
│   │   ├── Auth/        # Authentication components
│   │   ├── Contact/     # Contact form components
│   │   ├── Dashboard/   # Dashboard components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DashboardChartsSimple.jsx
│   │   │   ├── ContactManagement.jsx
│   │   │   └── StatsGrid.jsx
│   │   └── Layouts/     # Header, Footer
│   ├── context/         # React Context (Auth)
│   ├── services/        # API services
│   ├── utils/           # Utility functions
│   └── Pages/           # Page components
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Dashboard
- `GET /api/dashboard/admin` - Admin dashboard data
- `GET /api/dashboard/teacher` - Teacher dashboard data
- `GET /api/dashboard/student` - Student dashboard data
- `GET /api/dashboard/parent` - Parent dashboard data

### Admin Management
- `POST /api/admin/students` - Add new student (admin only)
- `GET /api/admin/students` - Get all students (admin only)
- `PUT /api/admin/students/:id` - Update student (admin only)
- `DELETE /api/admin/students/:id` - Delete student (admin only)
- `POST /api/admin/teachers` - Add new teacher (admin only)
- `GET /api/admin/teachers` - Get all teachers (admin only)
- `PUT /api/admin/teachers/:id` - Update teacher (admin only)
- `DELETE /api/admin/teachers/:id` - Delete teacher (admin only)

### Contact Management
- `POST /api/contact/submit` - Submit contact form (public)
- `GET /api/contact` - Get all contacts (admin only)
- `GET /api/contact/stats` - Contact statistics (admin only)
- `PUT /api/contact/:id` - Update contact status (admin only)
- `DELETE /api/contact/:id` - Delete contact (admin only)

### Statistics
- `GET /api/statistics` - Get dashboard statistics and chart data

## 🎨 Key Features Implemented

### 1. Complete Contact Form System
- **Frontend**: Form validation, loading states, success/error messages
- **Backend**: Data validation, spam prevention, status tracking
- **Admin Panel**: Contact management with filtering and status updates

### 2. Dashboard Analytics
- **Charts**: User distribution, student statistics, growth analytics
- **Role-specific data**: Customized based on user role
- **Real-time updates**: Live data from database

### 3. Authentication Flow
- **Secure JWT implementation**
- **Role-based redirects**
- **Token expiry handling**
- **Protected routes**

### 4. Responsive Design
- **Mobile-first approach**
- **Consistent theme throughout**
- **Professional UI components**
- **Smooth user experience**

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Nodemailer** - Email service

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **React Icons** - Icons
- **Context API** - State management

## 📊 Database Models

### User Model
- Basic user information
- Role-based access (admin, teacher, student, parent)
- Authentication credentials

### Student Model
- Student profile information
- Class and section details
- Parent linkage
- Academic information

### Teacher Model
- Teacher profile
- Subject specialization
- Assigned classes
- Experience details

### Parent Model
- Parent information
- Linked students
- Contact details

### Contact Model
- Contact form submissions
- Status tracking
- Admin management features

### Class Model
- Class information
- Student assignments
- Teacher assignments

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Role-based Authorization**: Endpoint protection based on user roles
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper cross-origin resource sharing setup

## 🚀 Deployment Ready

The project is fully configured for deployment with:
- Environment variable configuration
- Production-ready build scripts
- Database connection handling
- Error handling and logging

## 📝 Usage Instructions

1. **Admin Users**: Can manage all aspects of the system, view analytics, and handle contact submissions
2. **Teachers**: Can view their assigned classes and student information
3. **Students**: Can view their profile and academic information
4. **Parents**: Can monitor their children's academic progress
5. **Public Users**: Can submit contact forms and browse the website

## 🎯 Project Status: 100% Complete

✅ All authentication flows working
✅ All dashboards functional with real data
✅ Contact form fully integrated with backend
✅ Charts and analytics implemented
✅ Responsive design completed
✅ Database models and relationships established
✅ API endpoints tested and working
✅ Sample data seeding implemented
✅ Production-ready code quality

## 👨‍💻 Developer Handover Notes

This project is ready for immediate deployment and further development. All core features are implemented and tested. The codebase follows best practices with:

- Clean, commented code
- Modular architecture
- Proper error handling
- Security best practices
- Responsive design
- Professional UI/UX

The project can be easily extended with additional features like:
- Email notifications
- File upload functionality
- Advanced reporting
- Calendar integration
- Payment processing

---

**Project completed with professional quality and ready for production deployment.**
