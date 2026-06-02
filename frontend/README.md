# Forum TNTU Frontend

A React + TypeScript frontend for the Forum TNTU application.

## Features

- User authentication (Login/Register)
- Browse forum posts
- View comments on posts
- Create new posts
- Coming soon: Notifications, Settings, Comments creation, Likes, Save posts

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will run on `http://localhost:3000` and proxy API requests to `http://localhost:8000`.

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/        # Reusable components
├── pages/            # Page components
├── services/         # API service layer
├── styles/           # Global styles
├── App.tsx           # Root component
└── main.tsx          # Entry point
```

## API Integration

The frontend is configured to proxy requests to the backend at `http://localhost:8000`.

### Available Endpoints

- `GET /users` - Login
- `POST /users` - Register
- `GET /users/count` - Get user count
- `GET /posts` - List posts (paginated)
- `POST /posts` - Create post
- `GET /comments` - Get comments
- `POST /comments` - Create comment

## Coming Soon Features

- Add/edit/delete comments
- Like and save posts
- User notifications
- User settings
- Advanced search
