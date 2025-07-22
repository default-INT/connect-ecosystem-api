# Connect Ecosystem API

![Node.js](https://img.shields.io/badge/node-v20.10.0-green) ![NPM](https://img.shields.io/badge/npm-10.2.3-blue) ![Express](https://img.shields.io/badge/express-4.21.2-yellow) ![MongoDB](https://img.shields.io/badge/mongodb-6.17.0-green) ![TypeScript](https://img.shields.io/badge/typescript-5.7.2-blue) ![Nx](https://img.shields.io/badge/nx-21.1.1-purple)

A microservices ecosystem built with **Nx monorepo**, **TypeScript**, **Express.js**, and **MongoDB**. This project provides a scalable architecture for building interconnected services with shared libraries and consistent development practices.

[📚 View auth-service API in Swagger UI](https://petstore.swagger.io/?url=https://default-int.github.io/connect-ecosystem-api/auth/swagger.json)

## 🚀 Features

- **Microservices Architecture**: Independent, scalable services
- **Nx Monorepo**: Efficient build system and development experience
- **TypeScript**: Type-safe development across all services
- **Express.js**: Fast and lightweight web framework
- **MongoDB**: Flexible document database with strong typing
- **Shared Libraries**: Reusable code across services
- **ESLint & Prettier**: Code quality and consistency
- **Hot Reload**: Fast development with live reloading

## 📁 Project Structure

```
connect-ecosystem-api/
├── apps/                          # Microservices applications
│   ├── api-gateway/               # API Gateway service
│   │   ├── src/
│   │   │   └── main.ts           # Gateway entry point
│   │   ├── package.json
│   │   └── project.json          # Nx project configuration
│   ├── auth-service/              # Authentication service
│   │   ├── src/
│   │   │   ├── main.ts           # Auth service entry point
│   │   │   ├── config/           # Configuration files
│   │   │   │   ├── db.ts         # Database configuration
│   │   │   │   └── env.ts        # Environment variables
│   │   │   ├── model/            # Auth data models
│   │   │   │   ├── dto/          # Data Transfer Objects
│   │   │   │   │   ├── LoginRequestDto.ts
│   │   │   │   │   ├── RefreshTokenDto.ts
│   │   │   │   │   ├── TokenPairResponseDto.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── entities/     # Auth entities
│   │   │   │   │   ├── AuthType.ts
│   │   │   │   │   ├── Credentials.ts
│   │   │   │   │   ├── RefreshToken.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── exceptions/   # Custom exceptions
│   │   │   │   │   ├── 400/      # Bad Request errors
│   │   │   │   │   │   ├── UserAlreadyExistsError.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── 401/      # Unauthorized errors
│   │   │   │   │   │   ├── InvalidIdentifierError.ts
│   │   │   │   │   │   ├── InvalidPasswordError.ts
│   │   │   │   │   │   ├── InvalidTokenError.ts
│   │   │   │   │   │   ├── TokenExpiredError.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── repositories/     # Data access layer
│   │   │   │   ├── CredentialsRepository.ts
│   │   │   │   ├── RefreshTokenRepository.ts
│   │   │   │   └── index.ts
│   │   │   ├── routes/           # API routes
│   │   │   │   ├── getAuthRoutes.ts
│   │   │   │   └── index.ts
│   │   │   └── services/         # Business logic
│   │   │       ├── AuthService.ts
│   │   │       ├── utils/        # Service utilities
│   │   │       │   ├── verifyByOauthGoogle.ts
│   │   │       │   ├── verifyByPassword.ts
│   │   │       │   └── index.ts
│   │   │       └── index.ts
│   │   └── package.json
│   └── user-service/              # User management service
│       ├── src/
│       │   └── main.ts           # User service entry point
│       └── package.json
├── libs/                          # Shared libraries
│   └── shared/                    # Common utilities and models
│       ├── src/
│       │   ├── lib/              # Shared business logic
│       │   ├── model/            # Common data models
│       │   │   ├── entities/     # Base entities
│       │   │   ├── data/         # Repository interfaces
│       │   │   └── exceptions/   # Error handling
│       │   ├── repositories/     # Database repositories
│       │   │   └── mongodb/      # MongoDB implementations
│       │   └── utils/            # Utility functions
│       └── package.json
├── package.json                   # Root package configuration
├── nx.json                       # Nx workspace configuration
└── tsconfig.base.json            # Base TypeScript configuration
```

## 🛠️ Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** v20.10.0 or higher
- **npm** v10.2.3 or higher
- **MongoDB** instance (local or cloud)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd connect-ecosystem-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the workspace:**
   ```bash
   npx nx run-many -t build
   ```

4. **Start the API Gateway:**
   ```bash
   npm run serve
   ```

## 📋 Available Scripts

The following scripts are available in `package.json`:

| Script | Command | Description |
|--------|---------|-------------|
| `serve` | `nx serve api-gateway` | Start the API Gateway in development mode |
| `serve:prod` | `nx serve api-gateway --configuration=production` | Start the API Gateway in production mode |
| `serve:auth:dev` | `nx serve auth-service --configuration=development` | Start the Auth Service in development mode |
| `serve:auth:prod` | `nx serve auth-service --configuration=production` | Start the Auth Service in production mode |

### Additional Nx Commands

| Command | Description |
|---------|-------------|
| `npx nx build <app-name>` | Build a specific application |
| `npx nx serve <app-name>` | Serve a specific application |
| `npx nx lint <app-name>` | Lint a specific application |
| `npx nx test <app-name>` | Run tests for a specific application |
| `npx nx run-many -t build` | Build all applications |
| `npx nx run-many -t lint` | Lint all applications |
| `npx nx graph` | View project dependency graph |

## 🆕 Adding New Services

To add a new microservice to the ecosystem:

### 1. Generate a new Node.js application:
```bash
npx nx g @nx/express:application my-new-service
```

### 2. For a custom Node.js service:
```bash
npx nx g @nx/node:application my-new-service
```

### 3. Configure the service:
- Update `apps/my-new-service/project.json` with build and serve targets
- Add service-specific dependencies to `apps/my-new-service/package.json`
- Configure TypeScript in `apps/my-new-service/tsconfig.app.json`

### 4. Example service structure:
```
apps/my-new-service/
├── src/
│   ├── main.ts              # Service entry point
│   ├── controllers/         # Request handlers
│   ├── services/           # Business logic
│   ├── models/             # Data models
│   └── routes/             # API routes
├── package.json
├── project.json
└── tsconfig.app.json
```

## 📚 Adding New Libraries

To add a new shared library:

### 1. Generate a publishable library:
```bash
npx nx g @nx/js:library my-new-lib --publishable --importPath=@connect-ecosystem-api/my-new-lib
```

### 2. Generate a simple library:
```bash
npx nx g @nx/js:library my-new-lib
```

### 3. Library best practices:
- Place reusable models in `libs/my-new-lib/src/model/`
- Add utilities in `libs/my-new-lib/src/utils/`
- Export public API through `libs/my-new-lib/src/index.ts`
- Update `tsconfig.base.json` paths if needed

### 4. Example library structure:
```
libs/my-new-lib/
├── src/
│   ├── index.ts            # Public API exports
│   ├── lib/               # Core library code
│   ├── models/            # Data models
│   └── utils/             # Utility functions
├── package.json
└── tsconfig.lib.json
```

## 🗄️ Database Configuration

The project uses **MongoDB** with the following setup:

- **Driver**: `mongodb@6.17.0`
- **Repository Pattern**: Located in `libs/shared/src/repositories/mongodb/`
- **Models**: Shared entities in `libs/shared/src/model/entities/`
- **Validation**: Using `yup@1.6.1` for schema validation

## 🧪 Development Workflow

1. **Start development:**
   ```bash
   npm run serve
   ```

2. **Build specific service:**
   ```bash
   npx nx build auth-service
   ```

3. **Run linting:**
   ```bash
   npx nx run-many -t lint
   ```

4. **View project graph:**
   ```bash
   npx nx graph
   ```

## 🔧 Technologies Used

- **[Nx](https://nx.dev/)** - Smart monorepos build system
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Express.js](https://expressjs.com/)** - Web application framework
- **[MongoDB](https://www.mongodb.com/)** - Document database
- **[ESBuild](https://esbuild.github.io/)** - Fast JavaScript bundler
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue in the repository.

---

Built with ❤️ using [Nx](https://nx.dev) and [TypeScript](https://www.typescriptlang.org/)
