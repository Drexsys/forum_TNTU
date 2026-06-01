# Forum TNTU - Full Stack Application

A modern forum application built with Spring Boot backend and React frontend.

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 16+ (for local development)
- Java 17+ (for backend development)

### Running with Docker Compose

```bash
docker-compose up
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000
- **Database**: PostgreSQL on localhost:5433

### Local Development

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

Backend API will be automatically proxied to http://localhost:8000.

#### Backend

```bash
cd forum_tntu
./mvnw spring-boot:run
```

## 📁 Project Structure

```
.
├── frontend/              # React + TypeScript frontend
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Page-level components
│   │   ├── services/     # API integration layer
│   │   └── main.tsx      # Entry point
│   └── package.json
│
└── forum_tntu/            # Spring Boot backend
    ├── src/
    │   ├── main/java/
    │   │   ├── controllers/  # REST API endpoints
    │   │   ├── models/       # JPA entities
    │   │   ├── repositories/ # Data access layer
    │   │   └── dto/          # Data transfer objects
    │   └── main/resources/
    │       └── application.properties
    └── pom.xml
```

## 🌐 API Endpoints

### Users
- `GET /users?username=X&password=Y` - Login user
- `POST /users` - Register new user
- `GET /users/count` - Get total user count

### Posts
- `GET /posts?page=0&pageSize=10` - List posts (paginated)
- `POST /posts` - Create new post

### Comments
- `GET /comments?parentId=X` - Get comments for a post
- `GET /comments?parentCommentId=X` - Get replies to a comment
- `POST /comments` - Create new comment

## ✨ Features

### Implemented
- ✅ User authentication (Login/Register)
- ✅ Browse forum posts with pagination
- ✅ View comments on posts
- ✅ Create new posts
- ✅ View nested comments

### Coming Soon
- 🚀 Create comments
- 🚀 Like posts
- 🚀 Save posts
- 🚀 User notifications
- 🚀 User settings and profiles
- 🚀 Advanced search
- 🚀 Edit/Delete posts
- 🚀 Edit/Delete comments
- 🚀 Admin panel

## 🛠 Technology Stack

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: CSS Modules

### Backend
- **Framework**: Spring Boot 3
- **Language**: Java 17
- **Database**: PostgreSQL 16
- **ORM**: JPA/Hibernate

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Frontend Port**: 3000
- **Backend Port**: 8000
- **Database Port**: 5433

## 📝 Development

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Development

```bash
cd forum_tntu

# Run with Maven
./mvnw spring-boot:run

# Build
./mvnw clean package
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
POSTGRES_DB=forum_tntu
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
```

## 🐛 Troubleshooting

### Frontend can't connect to backend
- Ensure backend is running on http://localhost:8000
- Check that CORS is properly configured on the backend
- Verify the vite proxy configuration in `vite.config.ts`

### Database connection issues
- Ensure PostgreSQL container is running: `docker-compose ps`
- Check database credentials in `.env`
- Verify port 5433 is not in use

### Node/npm issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Update npm: `npm install -g npm@latest`

## 📚 Documentation

- [Frontend README](./frontend/README.md)
- [Backend Documentation](./forum_tntu/README.md) (coming soon)

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add new feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a pull request

## 📄 License

This project is part of the TNTU forum system.

## 🎯 Coming Soon Features - Placeholder UI

The frontend includes "Coming Soon" placeholder tables for features that are not yet implemented:
- Click "Coming Soon" buttons to see what's planned
- Navigate to Notifications and Settings tabs for future features
- Reply to comments functionality is in progress

## 🔐 Security Notes

⚠️ **Development Only**: This is a development setup. For production:
- Use environment variables for secrets
- Enable HTTPS
- Implement proper authentication (JWT, OAuth2)
- Add rate limiting
- Implement CORS properly
- Use strong password hashing (bcrypt/argon2)

---

For support or questions, please check the individual component READMEs or contact the development team.
