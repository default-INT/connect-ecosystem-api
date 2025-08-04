export interface OpenApiResponse {
  description: string;
  content?: {
    'application/json': {
      schema: {
        $ref?: string;
        type?: string;
        properties?: Record<string, { type: string }>;
      };
    };
  };
}

export interface OpenApiRequestBody {
  required: boolean;
  content: {
    'application/json': {
      schema: {
        $ref: string;
      };
    };
  };
}

export interface OpenApiOperation {
  summary: string;
  description: string;
  tags: string[];
  requestBody?: OpenApiRequestBody;
  responses: Record<string, OpenApiResponse>;
}

export interface OpenApiPathItem {
  post?: OpenApiOperation;
  get?: OpenApiOperation;
  put?: OpenApiOperation;
  delete?: OpenApiOperation;
}

export type OpenApiPaths = Record<string, OpenApiPathItem>;
