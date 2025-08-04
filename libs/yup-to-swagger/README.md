# 🛠️ SwaggerUtils

A set of utilities for automatic generation of OpenAPI (Swagger) documentation from Yup validation schemas.

## 📦 Structure

```
swaggerUtils/
├── yupConverter/              # Yup to OpenAPI conversion (modular architecture)
│   ├── types.ts              # Types and interfaces
│   ├── convertYupSchema.ts   # Main conversion function
│   ├── convertDescription.ts # Central description conversion function
│   ├── schemaConverters.ts   # Schema converters object
│   ├── convertObjectSchema.ts   # Object schema converter
│   ├── convertStringSchema.ts   # String schema converter
│   ├── convertNumberSchema.ts   # Number schema converter
│   ├── convertBooleanSchema.ts  # Boolean schema converter
│   ├── convertMixedSchema.ts    # Mixed schema converter
│   ├── stringTestHandlers.ts    # String test handlers
│   ├── numberTestHandlers.ts    # Number test handlers
│   └── index.ts              # Export all yupConverter functions
├── generateOpenApiSpec.ts     # Full OpenAPI specification generation
├── createSwaggerMiddleware.ts # Express + Swagger UI middleware
├── saveSpecToFile.ts         # Save specification to file
└── index.ts                  # Main export
```

## 🚀 Usage

### Import

```typescript
import { swaggerUtils } from '@connect-ecosystem-api/yup-to-swagger';
```

### Basic Example

```typescript
// 1. Prepare Yup schemas
const userSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  age: Yup.number().min(18).max(100)
});

// 2. Generate OpenAPI specification
const spec = swaggerUtils.generateOpenApiSpec(
  { UserDto: userSchema },
  {
    title: 'User Service API',
    version: '1.0.0',
    description: 'API for user management'
  }
);

// 3. Setup Swagger UI in Express
swaggerUtils.createSwaggerMiddleware(app, { spec });

// 4. Save to file (optional)
swaggerUtils.saveSpecToFile(spec, './swagger.json');
```

### Working with Modular Architecture

If you need to use individual components:

```typescript
// Direct import of specific functions
import { 
  convertYupSchema, 
  convertStringSchema,
  stringTestHandlers 
} from '@connect-ecosystem-api/yup-to-swagger/utils/swaggerUtils/yupConverter';

// Custom string test handling
const customStringHandlers = {
  ...stringTestHandlers,
  customRule: (schema, test) => {
    schema.customField = test.params?.value;
  }
};
```

## 🔧 API

### `swaggerUtils.convertYupSchema(schema)`
Converts a single Yup schema to OpenAPI schema.

```typescript
const yupSchema = Yup.string().min(3).max(50).required();
const openApiSchema = swaggerUtils.convertYupSchema(yupSchema);
// Result: { type: 'string', minLength: 3, maxLength: 50 }
```

### `swaggerUtils.generateOpenApiSpec(schemas, info)`
Generates a complete OpenAPI specification.

```typescript
const spec = swaggerUtils.generateOpenApiSpec(
  {
    LoginDto: loginSchema,
    UserDto: userSchema
  },
  {
    title: 'My API',
    version: '1.0.0',
    description: 'API description'
  }
);
```

### `swaggerUtils.createSwaggerMiddleware(app, config)`
Creates Swagger UI middleware for Express application.

```typescript
swaggerUtils.createSwaggerMiddleware(app, {
  spec,                          // OpenAPI specification
  uiPath: '/api-docs',          // Path to Swagger UI (default)
  jsonPath: '/api-docs.json',   // Path to JSON specification
  infoPath: '/docs',            // Path to documentation info
  customOptions: {              // Custom Swagger UI settings
    customSiteTitle: 'My API Docs'
  }
});
```

### `swaggerUtils.saveSpecToFile(spec, filePath)`
Saves specification to JSON file.

```typescript
swaggerUtils.saveSpecToFile(spec, './swagger.json');
```

## 🔄 Supported Yup Rules

| Yup rule | OpenAPI result |
|----------|----------------|
| `.string()` | `type: "string"` |
| `.number()` | `type: "number"` |
| `.boolean()` | `type: "boolean"` |
| `.required()` | Added to `required` array |
| `.nullable()` | `nullable: true` |
| `.min(n)` | `minLength: n` (strings), `minimum: n` (numbers) |
| `.max(n)` | `maxLength: n` (strings), `maximum: n` (numbers) |
| `.email()` | `format: "email"` |
| `.matches(regex)` | `pattern: "regex"` |
| `.oneOf([values])` | `enum: [values]` |
| `.integer()` | `type: "integer"` |

## 🏗️ Service Integration

### 1. Create Schema Generator

```typescript
// src/swagger/ServiceSchemaGenerator.ts
import { swaggerUtils } from '@connect-ecosystem-api/yup-to-swagger';
import { schema1, schema2 } from '../model';

export class ServiceSchemaGenerator {
  static generateFullSpec() {
    const schemas = { Dto1: schema1, Dto2: schema2 };
    
    const baseSpec = swaggerUtils.generateOpenApiSpec(schemas, {
      title: 'Service API',
      version: '1.0.0'
    });

    return {
      ...baseSpec,
      servers: [{ url: 'http://localhost:4001' }],
      paths: this.generatePaths() // your routes
    };
  }

  static saveSpecToFile(filePath: string) {
    const spec = this.generateFullSpec();
    return swaggerUtils.saveSpecToFile(spec, filePath);
  }
}
```

### 2. Integrate with Express

```typescript
// src/main.ts
import { swaggerUtils } from '@connect-ecosystem-api/yup-to-swagger';
import { ServiceSchemaGenerator } from './swagger/ServiceSchemaGenerator';

const app = express();

const spec = ServiceSchemaGenerator.generateFullSpec();
swaggerUtils.createSwaggerMiddleware(app, { spec });
```

### 3. Add Generation Script

```typescript
// scripts/generate-swagger.ts
import { ServiceSchemaGenerator } from '../src/swagger/ServiceSchemaGenerator';

const spec = ServiceSchemaGenerator.saveSpecToFile('./swagger.json');
console.log('✅ Specification generated!');
```

## 🎯 Benefits

- **🔄 Automation**: Generation from existing Yup schemas
- **📝 Single Source**: No duplication of validation and documentation
- **🎨 Flexibility**: Easily customizable for project needs
- **🚀 Reusability**: Common utilities for all services
- **📦 Modularity**: Each function in a separate file
- **🔧 Extensibility**: Easy to add new types and handlers
- **🔒 Type Safety**: Full typing without `any` types
- **🧹 Maintainability**: Clean architecture with clear separation of concerns

## 📱 Result

After integration, each service provides:
- **Swagger UI**: `http://localhost:PORT/api-docs`
- **OpenAPI JSON**: `http://localhost:PORT/api-docs.json`
- **Information**: `http://localhost:PORT/docs`
- **Static file**: `./swagger.json` 
