import { writeFileSync } from 'fs';
import { OpenApiSpec } from './generateOpenApiSpec';

export const saveSpecToFile = (spec: OpenApiSpec, filePath: string): OpenApiSpec => {
  writeFileSync(filePath, JSON.stringify(spec, null, 2));

  return spec;
};
