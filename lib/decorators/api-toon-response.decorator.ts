import { applyDecorators } from '@nestjs/common';
import { ApiProduces, ApiResponse } from '@nestjs/swagger';
import { toToonFormat } from '../utils/toon-format.util';

/**
 * Decorador que registra los tipos TOON y JSON en Swagger
 * Indica que el endpoint puede devolver respuestas en ambos formatos
 *
 * @param description - Descripción de la respuesta
 * @param exampleData - Objeto de ejemplo para mostrar en Swagger
 */
export function ApiToonResponse(
  description: string = 'Respuesta en formato TOON o JSON',
  exampleData?: any,
) {
  const jsonExample = exampleData || {
    message: 'Hello World',
    status: 'success',
  };

  // Generar ejemplo TOON real usando la librería oficial
  const toonExample = toToonFormat(jsonExample);

  return applyDecorators(
    ApiProduces('application/json', 'application/toon'),
    ApiResponse({
      status: 200,
      description,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: jsonExample,
            description: 'Respuesta en formato JSON estándar',
          },
        },
        'application/toon': {
          schema: {
            type: 'string',
            example: toonExample,
            description:
              'Formato TOON (Token-Oriented Object Notation): optimizado para LLMs con reducción de tokens vs JSON',
          },
        },
      },
    }),
  );
}

/**
 * Decorador para endpoints que solo devuelven JSON
 *
 * @param description - Descripción de la respuesta
 * @param exampleData - Objeto de ejemplo
 */
export function ApiJsonResponse(
  description: string = 'Respuesta en formato JSON',
  exampleData?: any,
) {
  return applyDecorators(
    ApiProduces('application/json'),
    ApiResponse({
      status: 200,
      description,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: exampleData || { message: 'Success' },
          },
        },
      },
    }),
  );
}
