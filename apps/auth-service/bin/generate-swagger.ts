#!/usr/bin/env ts-node
import { resolve } from 'path';
import { saveSpecToFile } from '@connect-ecosystem-api/yup-to-swagger';
import { swaggerSpec } from '../src/config/swagger';

/**
 * Script for generating static OpenAPI specification
 */
const main = () => {
  console.log('🔄 Generating OpenAPI specification for Auth Service...');

  try {
    const outputPath = resolve(__dirname, '../dist/swagger.json');
    saveSpecToFile(swaggerSpec, outputPath);

  } catch (error) {
    console.error('❌ Error generating specification:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  main();
}
