import { swaggerUtils, OpenApiSpec } from '@connect-ecosystem-api/shared';
import { generateFullSpec } from './generateFullSpec';

export const saveSpecToFile = (filePath: string): OpenApiSpec => {
  const spec = generateFullSpec();

  return swaggerUtils.saveSpecToFile(spec, filePath);
};
