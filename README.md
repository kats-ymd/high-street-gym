# High Street Gym Web Application

**High Street Gym** is a fullstack web application consisting of both frontend and backend components that work together to provide a mobile gym application for managing gym users and activity bookings. This application allows gym customers to explore and book various gym classes from different activities, dates, or instructors. This application also allows gym instructors and administration staff to add new classes, update existing classes, as well as add or update activities. In addition, the application offers mini blog feature that allows users to share short thoughts and interact with each other.


## Features
- Create account
- Log in / Log out
- Listing offered classes by days
- Booking classes
- Managing bookings
- Reading / Creating short posts in the blog
- Updating logged-in user's detail


## Screenshots / Live Demo
Screenshots - to be added shortly...

![LIVE DEMO](https://gym.katsyamada.com/)


## Technologies Used

This application utilized various technologies and libraries in both the frontend and backend components.

### Frontend ()

- [React](https://www.npmjs.com/package/react): A JavaScript library for building component based user interfaces.

- [React Router DOM](https://www.npmjs.com/package/react-router-dom): A library for adding routing functionality to React applications.

- [DaisyUI](https://www.npmjs.com/package/daisyui): A UI component library for tailwindcss.

- [vite](https://www.npmjs.com/package/vite): A build tool that serves your code via native ES modules with dynamic imports.

- [tailwindcss](https://www.npmjs.com/package/tailwindcss): A utility-first CSS framework for rapidly building custom designs.

### Backend ()

- [Express](https://www.npmjs.com/package/express): A fast and minimalist web framework for Node.js, used for handling routing, middleware, and HTTP request/response management.

- [bcryptjs](https://www.npmjs.com/package/bcryptjs): A library for secure password hashing.

- [cors](https://www.npmjs.com/package/cors): Middleware for enabling cross-origin resource sharing.

- [dotenv](https://www.npmjs.com/package/dotenv): Middleware for enabling use of .env file.

- [express-fileupload](https://www.npmjs.com/package/express-fileupload): Middleware for handling file uploads.

- [mysql2](https://www.npmjs.com/package/mysql2): A Node.js-based MySQL client library.

- [uuid](https://www.npmjs.com/package/uuid): A library for generating UUIDs.

- [validator](https://www.npmjs.com/package/validator): A library for various input validation & sanitization.

- [xml2js](https://www.npmjs.com/package/xml2js): A library for parsing XML data.


## Getting Started

To get started with the **High Street Gym Web Application**, follow these steps:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up your database (sample DB in `mysql-dump/high-street-gym-sample-db.sql`) and configure the connection  string in a `.env` file.

3. Start the backend API server :

   ```bash
   npm run backend
   ```

4. Start the frontend vite development server :

   ```bash
   # In another terminal
   npm run frontend
   ```

**Disclaimer**: This source code is provided without any warranty, express or implied. Usage of the resources within this repository is at your own risk.
