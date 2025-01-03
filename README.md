# Restaurant Table Booking App

This is a full-stack web application that allows users to book tables at restaurants. The application is built using Next.js for the frontend, Node.js for the backend, and MongoDB for the database.

## Features

- User authentication (Signup/Login)
- Book tables for specific dates and times
- View available slots for table booking
- Manage booked slots
- Responsive design for a seamless experience on different devices

## Tech Stack

### Frontend:
- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

### Backend:
- **Server**: Node.js with API routes
- **Database**: MongoDB

### Other Tools:
- [Axios](https://axios-http.com/) for API calls
- [React Hot Toast](https://react-hot-toast.com/) for notifications

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/alitaysir/Restaurant-Table-booking-App.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Restaurant-Table-booking-App
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up your environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     MONGODB_URI=<your-mongodb-connection-string>
     JWT_SECRET=<your-jwt-secret>
     ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open the application in your browser:
   ```
   http://localhost:3000
   ```
