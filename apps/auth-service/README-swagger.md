# 📚 Swagger Documentation for Auth Service

## 🎯 Overview

This project implements automatic generation of OpenAPI (Swagger) documentation from **Yup validation schemas**. This allows:

- ✅ Automatically generate API documentation from existing Yup schemas
- ✅ Preserve all validation rules in OpenAPI specification  
- ✅ Avoid duplication - single source of truth for validation and documentation
- ✅ Get detailed documentation with constraints, formats and descriptions

## 🏗️ Solution Architecture

```
src/
├── swagger/
│   ├── AuthServiceSchemaGenerator.ts # Specification generator for service
│   └── index.ts                     # Middleware for Express
├── model/
│   └── dto/
│       ├── LoginRequestDto.ts       # DTO + Yup schema
│       ├── RefreshTokenDto.ts       # DTO + Yup schema  
│       └── TokenPairResponseDto.ts  # DTO + Yup schema
└── main.ts                         # Swagger UI integration

# Common utilities in shared library:
libs/shared/src/utils/swaggerUtils/
├── convertYupSchema.ts              # Yup schema to OpenAPI converter
├── generateOpenApiSpec.ts           # OpenAPI specification generation
├── createSwaggerMiddleware.ts       # Express middleware
├── saveSpecToFile.ts               # Save to file
└── index.ts                        # Main export
```

## 🔧 Usage

### Running Service with Documentation

```bash
# Run in development mode
npm run serve:auth:dev

# Available documentation endpoints:
# http://localhost:4001/docs - endpoint information
# http://localhost:4001/api-docs - Swagger UI
# http://localhost:4001/api-docs.json - OpenAPI JSON specification
```

### Using swaggerUtils from shared

```typescript
import { swaggerUtils } from '@connect-ecosystem-api/yup-to-swagger';

// Instead of local YupToOpenApiConverter now using:
const spec = swaggerUtils.generateOpenApiSpec(schemas, info);
swaggerUtils.createSwaggerMiddleware(app, { spec });
swaggerUtils.saveSpecToFile(spec, filePath);
```

### Static Specification Generation

```bash
# Generate swagger.json file
npm run generate:swagger
```

## 📝 Creating DTO with Yup Schema

Each DTO must contain both TypeScript interface and Yup schema:

```typescript
// LoginRequestDto.ts
import * as Yup from 'yup';
import { AuthType } from '../entities';

export interface LoginRequestDto {
  authType: AuthType;
  identifier: string;
  password?: string | null;
  appId: string;
}

export const loginRequestSchema = Yup.object().shape({
  authType: Yup
    .mixed<AuthType>()
    .oneOf(Object.values(AuthType) as AuthType[], 'Invalid authType')
    .required('AuthType is required'),
  identifier: Yup.string()
    .when('authType', {
      is: (authType: AuthType) => authType === AuthType.EmailPassword,
      then: schema => schema.email('Email is invalid'),
    })
    .required('identifier is required'),
  password: Yup.string().nullable()
    .when('authType', {
      is: (authType: AuthType) => onlyPasswordRequired.includes(authType),
      then: schema => schema
        .required('password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])/, 'Password must contain at least one lowercase letter'),
    }),
  appId: Yup.string().required('appId is required'),
});
```

## 🔄 Converting Yup Rules to OpenAPI

Our converter supports the following Yup rules:

| **Yup Rule**           | **OpenAPI Result**                                                  |
|------------------------|---------------------------------------------------------------------|
| `.string()`            | `type: "string"`                                                    |
| `.number()`            | `type: "number"`                                                    |
| `.boolean()`           | `type: "boolean"`                                                   |
| `.required()`          | Added to the `required` array                                       |
| `.nullable()`          | `nullable: true`                                                    |
| `.min(8)`              | `minLength: 8` (for strings), `minimum: 8` (for numbers)            |
| `.max(20)`             | `maxLength: 20` (for strings), `maximum: 20` (for numbers)          |
| `.email()`             | `format: "email"`                                                   |
| `.matches(/regex/)`    | `pattern: "regex"`                                                  |
| `.oneOf([values])`     | `enum: [values]`                                                    |

## 📊 Generation Result

From Yup schema `loginRequestSchema` generates:

```json
{
  "LoginRequestDto": {
    "type": "object",
    "properties": {
      "authType": {
        "type": "string",
        "enum": ["email-password", "username-password", "oauth-google"]
      },
      "identifier": {
        "type": "string"
      },
      "password": {
        "type": "string",
        "nullable": true
      },
      "appId": {
        "type": "string"
      }
    },
    "required": ["authType", "identifier", "appId"]
  }
}
```

## 🛠️ Adding New DTO

1. **Create DTO with Yup schema:**
```typescript
// NewDto.ts
export interface NewDto {
  field: string;
}

export const newDtoSchema = Yup.object().shape({
  field: Yup.string().required()
});
```

2. **Add to generator:**
```typescript
// AuthServiceSchemaGenerator.ts
const schemas = {
  LoginRequestDto: loginRequestSchema,
  RefreshTokenDto: refreshTokenSchema,
  TokenPairResponseDto: tokenPairResponseSchema,
  NewDto: newDtoSchema // add here
};
```

3. **Regenerate specification:**
```bash
npm run generate:swagger
```

## 🌟 Approach Benefits

### ✅ **Single Source of Truth**
- Yup schemas are used for both validation and documentation
- No duplication of validation rules

### ✅ **Automatic Synchronization**
- Changes in Yup schemas automatically reflect in documentation
- Impossible to "forget" to update documentation

### ✅ **Detailed Documentation**
- All validation constraints get into OpenAPI specification
- Formats, patterns, enum values are automatically documented

### ✅ **Integration with Existing Code**
- Minimal changes to existing code
- Uses already written Yup schemas

## 🔧 System Extension

The system easily extends to support:
- New types of Yup validation
- Custom descriptions and examples
- Additional OpenAPI metadata

## 📱 Available Endpoints

After running the service, available:

- **Swagger UI**: http://localhost:4001/api-docs
- **OpenAPI JSON**: http://localhost:4001/api-docs.json  
- **Documentation info**: http://localhost:4001/docs

## 🎯 Next Steps

1. Implement similar system for `user-service`
2. Add support for more complex Yup rules (e.g., `.when()`)
3. Integrate client SDK generation from OpenAPI
4. Add response schema validation in routes 
