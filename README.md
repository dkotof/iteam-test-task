# JobSearch Application

A modern job search application built with Next.js 14, Tailwind CSS, and Express.js. Search for jobs, save favorites, and receive personalized job recommendations based on your profile.

## Features

- Search for jobs by title, company, or keywords
- View detailed job descriptions and apply directly
- Save favorite jobs for later review
- Create a profile to receive personalized job recommendations
- User authentication with email and password

## Tech Stack

### Frontend
- Next.js 14 with TypeScript
- Tailwind CSS for styling
- Formik and Yup for form handling and validation
- Axios for API requests
- SWR for data fetching and caching

### Backend
- Express.js for the API server
- MongoDB for database storage
- JWT for authentication
- Mongoose for database modeling

## Project Structure

```
src/
├── app/                # Next.js app router
├── components/         # Reusable components
│   ├── common/         # Common UI components
│   ├── forms/          # Form-related components
│   ├── jobs/           # Job-related components
│   └── layout/         # Layout components
├── hooks/              # Custom hooks
├── lib/                # Utility functions
├── services/           # API service functions
├── types/              # TypeScript interfaces
├── styles/             # Global styles
└── server/             # Express.js backend
    ├── models/         # Mongoose models
    ├── routes/         # API routes
    ├── middleware/     # Express middleware
    └── utils/          # Server utilities
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- MongoDB (local instance or MongoDB Atlas)
- RapidAPI key for JSearch API

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/jobsearch-app.git
   cd jobsearch-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_RAPIDAPI_KEY=your_rapidapi_key_here
   ```

4. Create a `.env` file in the server directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/jobsearch
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=15m
   RAPIDAPI_KEY=your_rapidapi_key_here
   ```

### Running the Application

#### Development Mode

1. Start the Next.js frontend:
   ```bash
   npm run dev
   ```

2. Start the Express.js backend (in a separate terminal):
   ```bash
   cd src/server
   npm run dev
   ```

#### Production Mode

1. Build the Next.js frontend:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Deployment

### Frontend

The Next.js frontend can be deployed to Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Configure environment variables in the Vercel dashboard

### Backend

The Express.js backend can be deployed to Render:

1. Create a new Web Service in Render
2. Connect your GitHub repository
3. Configure environment variables in the Render dashboard
4. Set the build command to `cd src/server && npm install`
5. Set the start command to `cd src/server && npm start`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [JSearch API](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch) for providing job search data
- [Next.js](https://nextjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Express.js](https://expressjs.com/) for the backend framework
