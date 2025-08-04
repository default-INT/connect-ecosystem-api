import {
  OpenApiSpec,
  saveSpecToFile as saveSwaggerSpecToFile,
} from '@connect-ecosystem-api/yup-to-swagger';
import { generateFullSpec } from './generateFullSpec';

export const saveSpecToFile = (filePath: string): OpenApiSpec => {
  const spec = generateFullSpec();

  return saveSwaggerSpecToFile(spec, filePath);
};
