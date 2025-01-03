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

## Images
- **Home Page**: ![Screenshot 2025-01-03 234020](https://github.com/user-attachments/assets/8e437237-6143-42fb-9f29-b07f6cb5d5d6)

- **Booking Page**: ![Screenshot 2025-01-03 234052](https://github.com/user-attachments/assets/3ce1784c-ad04-4ae4-92d5-47c487c994ad)

- **Booking Page( Booked time slot in non clickable and light in color )**: ![Screenshot 2025-01-03 234209](https://github.com/user-attachments/assets/1590e392-1f6b-4562-a7b8-173ca7b9c9c0)

- - **Manage Bookings Page( User also have the option to delete a booking )**:![Screenshot 2025-01-03 234231](https://github.com/user-attachments/assets/c1c48aa1-1791-40d0-9ac8-cd76b9f9c9fb)


