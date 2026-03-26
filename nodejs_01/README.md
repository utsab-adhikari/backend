# Node.js Backend Project

This is a generalized backend project built with Node.js, Prisma, and Docker support. It provides a modular structure for scalable backend development, including API routing, controllers, middleware, and database integration.

## Features

- **Node.js**: Modern JavaScript runtime for backend development
- **Prisma**: Type-safe ORM for database access
- **Docker**: Containerized deployment for consistency across environments
- **Modular Structure**: Organized into controllers, services, middleware, and routes
- **API Documentation**: General documentation available [here](https://www.utsabadhikari.me/i-tried/69c3c4b99dcae9cea0787b5e)

## Project Structure

```text
nodejs_01/
├── docker-compose.yml
├── Dockerfile
├── package.json
├── prisma.config.ts
├── generated/
├── prisma/
├── src/
```

- `generated/`: Auto-generated Prisma client and related files
- `prisma/`: Prisma schema and migrations
- `src/`: Application source code (controllers, routes, middleware, etc.)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v20 or above recommended)
- [Docker](https://www.docker.com/) (for containerized setup)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/utsab-adhikari/backend/tree/main/nodejs_01
   cd nodejs_01
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Generate Prisma client:
   ```sh
   npx prisma generate
   ```

### Running the Project

#### Locally
```sh
npm start
```

#### With Docker
```sh
docker build -t nodejs_01 .
docker run -p 8000:8000 nodejs_01
```

#### With Docker Compose
```sh
docker-compose up --build
```

## Database Migrations

- Edit your Prisma schema in `prisma/schema.prisma`.
- Run migrations:
  ```sh
  npx prisma migrate dev
  ```

## Documentation

For detailed API documentation and usage, visit:
[General Docs](https://www.utsabadhikari.me/i-tried/69c3c4b99dcae9cea0787b5e)

---

**Author:** Utsab Adhikari

