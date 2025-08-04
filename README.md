# Connect Ecosystem API

![Node.js](https://img.shields.io/badge/node-v20.10.0-green) ![NPM](https://img.shields.io/badge/npm-10.2.3-blue) ![Express](https://img.shields.io/badge/express-4.21.2-yellow) ![MongoDB](https://img.shields.io/badge/mongodb-6.17.0-green) ![TypeScript](https://img.shields.io/badge/typescript-5.7.2-blue) ![Nx](https://img.shields.io/badge/nx-21.1.1-purple)

A microservices ecosystem built with **Nx monorepo**, **TypeScript**, **Express.js**, and **MongoDB**. This project provides a scalable architecture for building interconnected services with shared libraries, automatic API documentation generation, and consistent development practices.

[📚 View auth-service API in Swagger UI](https://petstore.swagger.io/?url=https://default-int.github.io/connect-ecosystem-api/auth/swagger.json)

## 🚀 Features

- **Microservices Architecture**: Independent, scalable services with API Gateway
- **Nx Monorepo**: Efficient build system and development experience
- **TypeScript**: Type-safe development across all services
- **Express.js**: Fast and lightweight web framework
- **MongoDB**: Flexible document database with strong typing
- **API Gateway**: Centralized routing with authentication middleware
- **Auto-generated Documentation**: Swagger/OpenAPI specs from Yup schemas
- **Inter-service Communication**: Dedicated API library for service interaction
- **Shared Libraries**: Reusable code across services
- **ESLint & Prettier**: Code quality and consistency
- **Hot Reload**: Fast development with live reloading

## 📁 Project Structure

```
connect-ecosystem-api/
├── apps/                           # Microservices applications
│   ├── api-gateway/                # API Gateway service
│   │   ├── src/
│   │   │   ├── main.ts            # Gateway entry point
│   │   │   ├── config/            # Configuration files
│   │   │   │   └── env.ts         # Environment variables
│   │   │   ├── middlewares/       # Gateway middlewares
│   │   │   │   ├── authMiddleware/ # Authentication middleware
│   │   │   │   │   ├── authMiddleware.ts
│   │   │   │   │   ├── utils/
│   │   │   │   │   │   ├── getAccessToken.ts
│   │   │   │   │   │   └── validateToken.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── createProxy/   # Service proxy middleware
│   │   │   │   │   ├── createProxy.ts
│   │   │   │   │   ├── utils/
│   │   │   │   │   │   ├── injectReqHeader.ts
│   │   │   │   │   │   ├── injectResHeader.ts
│   │   │   │   │   │   └── pathFilter.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── routes/            # API routing
│   │   │   │   ├── getApiServiceRoutes.ts
│   │   │   │   └── index.ts
│   │   │   └── utils/             # Gateway utilities
│   │   │       ├── chainProxyReqHandlers.ts
│   │   │       ├── generateReqId.ts
│   │   │       └── index.ts
│   │   ├── package.json
│   │   └── project.json           # Nx project configuration
│   ├── auth-service/               # Authentication service
│   │   ├── bin/                   # Build and generation scripts
│   │   │   └── generate-swagger.ts
│   │   ├── src/
│   │   │   ├── main.ts            # Auth service entry point
│   │   │   ├── config/            # Configuration files
│   │   │   │   ├── db.ts          # Database configuration
│   │   │   │   ├── env.ts         # Environment variables
│   │   │   │   └── swagger.ts     # Swagger configuration
│   │   │   ├── model/             # Auth data models
│   │   │   │   ├── dto/           # Data Transfer Objects
│   │   │   │   │   ├── auth/      # Authentication DTOs
│   │   │   │   │   │   ├── LoginRequestDto.ts
│   │   │   │   │   │   ├── RefreshTokenDto.ts
│   │   │   │   │   │   ├── TokenPairResponseDto.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── internal/  # Internal service DTOs
│   │   │   │   │   │   ├── RevokeTokenRequestDto.ts
│   │   │   │   │   │   ├── RevokeTokenResponseDto.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── entities/      # Auth entities
│   │   │   │   │   ├── AuthType.ts
│   │   │   │   │   ├── Credentials.ts
│   │   │   │   │   ├── RefreshToken.ts
│   │   │   │   │   ├── RevokedAccessToken.ts
│   │   │   │   │   ├── RevokeReason.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── exceptions/    # Custom exceptions
│   │   │   │   │   ├── 400/       # Bad Request errors
│   │   │   │   │   │   ├── UserAlreadyExistsError.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── 401/       # Unauthorized errors
│   │   │   │   │   │   ├── InvalidIdentifierError.ts
│   │   │   │   │   │   ├── InvalidPasswordError.ts
│   │   │   │   │   │   ├── InvalidTokenError.ts
│   │   │   │   │   │   ├── TokenExpiredError.ts
│   │   │   │   │   │   ├── TokenMismatchError.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── repositories/      # Data access layer
│   │   │   │   ├── CredentialsRepository.ts
│   │   │   │   ├── RefreshTokenRepository.ts
│   │   │   │   ├── RevokedAccessTokenRepository.ts
│   │   │   │   └── index.ts
│   │   │   ├── routes/            # API routes
│   │   │   │   ├── docs/          # Route documentation
│   │   │   │   │   ├── auth.ts
│   │   │   │   │   └── internal.ts
│   │   │   │   ├── getAuthRoutes.ts
│   │   │   │   ├── getInternalRoutes.ts
│   │   │   │   └── index.ts
│   │   │   ├── services/          # Business logic
│   │   │   │   ├── AuthService/
│   │   │   │   │   ├── AuthService.ts
│   │   │   │   │   ├── extensions/ # Service method extensions
│   │   │   │   │   │   ├── isTokenRevoked.ts
│   │   │   │   │   │   ├── login.ts
│   │   │   │   │   │   ├── logout.ts
│   │   │   │   │   │   ├── refresh.ts
│   │   │   │   │   │   ├── register.ts
│   │   │   │   │   │   ├── revokeAllUserSessions.ts
│   │   │   │   │   │   ├── validateAccessToken.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── utils/     # Service utilities
│   │   │   │   │   │   ├── verifyByOauthGoogle.ts
│   │   │   │   │   │   ├── verifyByPassword.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── swagger/           # Swagger documentation setup
│   │   │   │   ├── generateFullSpec.ts
│   │   │   │   ├── saveSpecToFile.ts
│   │   │   │   ├── setupSwagger.ts
│   │   │   │   └── index.ts
│   │   │   └── utils/             # Auth utilities
│   │   │       ├── cleanupTokens.ts
│   │   │       ├── jwtUtils/      # JWT utilities
│   │   │       │   ├── config.ts
│   │   │       │   ├── genAccessToken.ts
│   │   │       │   ├── genRawRefresh.ts
│   │   │       │   ├── genRefreshToken.ts
│   │   │       │   ├── parseRefreshToken.ts
│   │   │       │   └── index.ts
│   │   │       └── index.ts
│   │   ├── package.json
│   │   └── README-swagger.md      # Swagger documentation guide
│   └── user-service/               # User management service
│       ├── src/
│       │   ├── main.ts            # User service entry point
│       │   └── assets/            # Static assets
│       ├── package.json
│       └── project.json
├── libs/                           # Shared libraries
│   ├── api/                       # Inter-service communication library
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── api.ts         # Main API client
│   │   │   │   ├── config/        # API configuration
│   │   │   │   │   └── env.ts
│   │   │   │   ├── services/      # Service-specific clients
│   │   │   │   │   ├── auth/      # Auth service client
│   │   │   │   │   │   ├── dto/
│   │   │   │   │   │   │   ├── jwtAccessPayload.dto.ts
│   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   ├── internal/ # Internal auth endpoints
│   │   │   │   │   │   │   ├── dto/
│   │   │   │   │   │   │   │   ├── validateToken.request.ts
│   │   │   │   │   │   │   │   ├── validateToken.response.ts
│   │   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   │   ├── validateToken.ts
│   │   │   │   │   │   │   ├── index.dto.ts
│   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   ├── index.dto.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── index.dto.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── utils/         # HTTP utilities
│   │   │   │       ├── makeRequest.ts
│   │   │   │       ├── middlewares/
│   │   │   │       │   ├── addGetMethod.ts
│   │   │   │       │   ├── addInternalHeader.ts
│   │   │   │       │   ├── addPostMethod.ts
│   │   │   │       │   └── index.ts
│   │   │   │       └── request.ts
│   │   │   └── index.ts
│   │   └── package.json
│   ├── shared/                    # Common utilities and models
│   │   ├── src/
│   │   │   ├── middlewares/       # Express middlewares
│   │   │   │   ├── errorHandlerMiddleware.ts
│   │   │   │   ├── loggerMiddleware.ts
│   │   │   │   └── index.ts
│   │   │   ├── model/             # Common data models
│   │   │   │   ├── data/          # Repository interfaces
│   │   │   │   │   ├── Repository.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── entities/      # Base entities
│   │   │   │   │   ├── common.ts
│   │   │   │   │   ├── Entity.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── exceptions/    # Error handling
│   │   │   │   │   ├── BaseError.ts
│   │   │   │   │   ├── db/        # Database errors
│   │   │   │   │   │   ├── DbDeleteManyError.ts
│   │   │   │   │   │   ├── DbError.ts
│   │   │   │   │   │   ├── DbInvalidIdError.ts
│   │   │   │   │   │   ├── DbTransactionError.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── http/      # HTTP errors
│   │   │   │   │   │   ├── 400/   # Bad Request errors
│   │   │   │   │   │   │   ├── BadRequest400Error.ts
│   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   ├── 401/   # Unauthorized errors
│   │   │   │   │   │   │   ├── Unauthorized401Error.ts
│   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   ├── 404/   # Not Found errors
│   │   │   │   │   │   │   ├── NotFound404Error.ts
│   │   │   │   │   │   │   ├── NotImplementRouteError.ts
│   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   ├── 502/   # Bad Gateway errors
│   │   │   │   │   │   │   ├── BadGateway502Error.ts
│   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   ├── 504/   # Gateway Timeout errors
│   │   │   │   │   │   │   ├── GatewayTimeout504Error.ts
│   │   │   │   │   │   │   ├── ServiceTimeout504Error.ts
│   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   ├── BaseHttpError.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── repositories/      # Database repositories
│   │   │   │   ├── mongodb/       # MongoDB implementations
│   │   │   │   │   ├── MongoDbRepository.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   └── utils/             # Utility functions
│   │   │       ├── expressUtils/  # Express utilities
│   │   │       │   ├── asyncSaveHandler.ts
│   │   │       │   └── index.ts
│   │   │       ├── logger/        # Logging utilities
│   │   │       │   ├── appLogger.ts
│   │   │       │   └── index.ts
│   │   │       ├── mongodbUtils/  # MongoDB utilities
│   │   │       │   ├── ensureCollections.ts
│   │   │       │   ├── getInitMongo.ts
│   │   │       │   ├── prepareForInsert.ts
│   │   │       │   ├── prepareToUpdate.ts
│   │   │       │   └── index.ts
│   │   │       ├── parserUtils/   # Parsing utilities
│   │   │       │   ├── parseExpiresIn.ts
│   │   │       │   └── index.ts
│   │   │       └── index.ts
│   │   └── package.json
│   └── yup-to-swagger/            # Swagger generation from Yup schemas
│       ├── src/
│       │   ├── lib/
│       │   │   ├── createSwaggerMiddleware.ts
│       │   │   ├── generateOpenApiSpec.ts
│       │   │   ├── saveSpecToFile.ts
│       │   │   ├── types.ts
│       │   │   ├── yupConverter/  # Yup to OpenAPI conversion
│       │   │   │   ├── convertBooleanSchema.ts
│       │   │   │   ├── convertDescription.ts
│       │   │   │   ├── convertMixedSchema.ts
│       │   │   │   ├── convertNumberSchema.ts
│       │   │   │   ├── convertObjectSchema.ts
│       │   │   │   ├── convertStringSchema.ts
│       │   │   │   ├── convertYupSchema.ts
│       │   │   │   ├── numberTestHandlers.ts
│       │   │   │   ├── schemaConverters.ts
│       │   │   │   ├── stringTestHandlers.ts
│       │   │   │   ├── types.ts
│       │   │   │   └── index.ts
│       │   │   └── index.ts
│       │   └── index.ts
│       ├── package.json
│       └── README.md              # Detailed yup-to-swagger documentation
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

4. **Start all services:**
   ```bash
   npm run serve:all
   ```

   Or start individual services:
   ```bash
   npm run serve          # API Gateway only
   npm run serve:auth:dev # Auth service only
   ```

## 📋 Available Scripts

The following scripts are available in `package.json`:

| Script | Command | Description |
|--------|---------|-------------|
| `serve` | `nx serve api-gateway` | Start the API Gateway in development mode |
| `serve:prod` | `nx serve api-gateway --configuration=production` | Start the API Gateway in production mode |
| `serve:all` | `nx run-many --target=serve --projects=api-gateway,auth-service --parallel` | Start both API Gateway and Auth Service |
| `serve:auth:dev` | `nx serve auth-service --configuration=development` | Start the Auth Service in development mode |
| `serve:auth:prod` | `nx serve auth-service --configuration=production` | Start the Auth Service in production mode |
| `lint:auth` | `nx lint auth-service` | Lint Auth Service specifically |
| `lint:affected` | `npx nx affected -t lint --parallel=3` | Lint only affected projects |
| `build:affected` | `npx nx affected -t build --parallel=3` | Build only affected projects |
| `tsc:affected` | `npx nx affected -t typecheck --parallel=3` | Type-check only affected projects |
| `list:affected` | `npx nx show projects --affected --with-target=build` | List affected projects |

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
| `npx nx generate:swagger auth-service` | Generate Swagger documentation for auth service |

## 🏗️ Architecture Overview

### API Gateway
The `api-gateway` acts as the single entry point for all client requests, providing:
- **Authentication Middleware**: Token validation before routing to services
- **Service Proxying**: Intelligent request routing to microservices
- **Request/Response Transformation**: Header injection and path filtering
- **Load Balancing**: Future-ready for multiple service instances

### Authentication Service
The `auth-service` provides comprehensive authentication features:
- **Multiple Auth Methods**: Password-based and OAuth (Google) authentication
- **JWT Token Management**: Access and refresh token generation/validation
- **Session Management**: Token revocation and cleanup
- **Auto-generated Documentation**: Swagger UI with type-safe DTOs

### Service Communication
The `libs/api` library enables type-safe inter-service communication:
- **HTTP Client Utilities**: Standardized request/response handling
- **Service-specific Clients**: Dedicated interfaces for each service
- **Internal Endpoints**: Secure service-to-service communication

### Shared Libraries

#### `libs/shared`
Core functionality shared across all services:
- **MongoDB Repository Pattern**: Type-safe database operations
- **Error Handling**: Comprehensive HTTP and database error classes
- **Logging**: Structured logging with Winston
- **Validation**: Schema validation utilities

#### `libs/yup-to-swagger`
Automatic API documentation generation:
- **Schema Conversion**: Transform Yup validation schemas to OpenAPI
- **Swagger UI Integration**: Ready-to-use Express middleware
- **Type Safety**: Full TypeScript support without any types

## 🆕 Adding New Services

To add a new microservice to the ecosystem:

### 1. Generate a new Express application:
```bash
npx nx g @nx/express:application apps/my-new-service
```

### 2. For a custom Node.js service:
```bash
npx nx g @nx/node:application apps/my-new-service
```

### 3. Configure dependencies:
```bash
# Add shared dependencies
npm install --workspace=apps/my-new-service @connect-ecosystem-api/shared @connect-ecosystem-api/api
```

### 4. Update API Gateway routing:
```typescript
// apps/api-gateway/src/routes/getApiServiceRoutes.ts
router.use('/my-service',
  authMiddleware({
    authServerUrl: env.serviceUrls.auth,
  }),
  createProxy('my-new-service', env.serviceUrls.myService),
);
```

### 5. Example service structure:
```
apps/my-new-service/
├── src/
│   ├── main.ts              # Service entry point
│   ├── config/              # Configuration
│   ├── controllers/         # Request handlers
│   ├── services/           # Business logic
│   ├── models/             # Data models
│   ├── routes/             # API routes
│   └── swagger/            # API documentation
├── package.json
├── project.json
└── tsconfig.app.json
```

## 📚 Adding New Libraries

To add a new shared library:

### 1. Generate a publishable library:
```bash
npx nx g @nx/js:library libs/my-new-lib --publishable --importPath=@connect-ecosystem-api/my-new-lib
```

### 2. Generate a simple library:
```bash
npx nx g @nx/js:library libs/my-new-lib
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
- **Type Safety**: Full TypeScript integration with MongoDB operations

### Database Connection
```typescript
// Automatic connection and cleanup handling
const { client, db } = await initDb()
const repository = new SomeRepository(client, db)
```

## 📖 API Documentation

### Automatic Swagger Generation
The project uses the `yup-to-swagger` library for automatic API documentation:

1. **Define Yup schemas** for your DTOs
2. **Generate OpenAPI spec** from schemas
3. **Serve Swagger UI** automatically

```typescript
// Example: Auth service documentation
const loginSchema = Yup.object().shape({
  identifier: Yup.string().required(),
  password: Yup.string().required()
});

// Automatically generates Swagger documentation
setupSwagger(app); // Available at /api-docs
```

### Available Documentation
- **Auth Service**: `http://localhost:4001/api-docs`
- **API Specs**: `http://localhost:4001/api-docs.json`

## 🧪 Development Workflow

1. **Start all services:**
   ```bash
   npm run serve:all
   ```

2. **Build specific service:**
   ```bash
   npx nx build auth-service
   ```

3. **Run linting (affected only):**
   ```bash
   npm run lint:affected
   ```

4. **Type checking:**
   ```bash
   npm run tsc:affected
   ```

5. **View project graph:**
   ```bash
   npx nx graph
   ```

6. **Generate API documentation:**
   ```bash
   npx nx generate:swagger auth-service
   ```

## 🔧 Technologies Used

- **[Nx](https://nx.dev/)** - Smart monorepos build system
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Express.js](https://expressjs.com/)** - Web application framework
- **[MongoDB](https://www.mongodb.com/)** - Document database
- **[Yup](https://github.com/jquense/yup)** - Schema validation
- **[Winston](https://github.com/winstonjs/winston)** - Logging
- **[Swagger/OpenAPI](https://swagger.io/)** - API documentation
- **[ESBuild](https://esbuild.github.io/)** - Fast JavaScript bundler
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Token Revocation**: Ability to invalidate tokens
- **Internal APIs**: Protected service-to-service communication
- **Request Validation**: Schema-based input validation
- **Error Handling**: Secure error responses without sensitive data leakage

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

Built with ❤️ using [Nx](https://nx.dev), [TypeScript](https://www.typescriptlang.org/), and [Express.js](https://expressjs.com/)
