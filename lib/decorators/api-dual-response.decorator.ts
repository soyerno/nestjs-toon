import { applyDecorators } from '@nestjs/common';
import { ApiProduces, ApiResponse } from '@nestjs/swagger';
import { toToonFormat } from '../utils/toon-format.util';

/**
 * Opciones para el decorador ApiDualResponse
 */
export interface DualResponseOptions {
  /** Descripción de la respuesta */
  description?: string;
  /** Código de estado HTTP */
  status?: number;
  /** Ejemplo de datos JSON */
  jsonExample?: any;
  /** Ejemplo de datos TOON (se genera automáticamente si no se provee) */
  toonExample?: string;
  /** Incluir solo JSON */
  jsonOnly?: boolean;
  /** Incluir solo TOON */
  toonOnly?: boolean;
  /** Opciones para el encoder TOON */
  toonOptions?: {
    delimiter?: ',' | '\t' | '|';
    indent?: number;
    lengthMarker?: '#' | false;
  };
}

/**
 * Decorador avanzado que registra múltiples media types en Swagger
 * Muestra claramente JSON y TOON como opciones separadas
 *
 * @param options - Opciones de configuración
 */
export function ApiDualResponse(options: DualResponseOptions = {}) {
  const {
    description = 'Respuesta exitosa',
    status = 200,
    jsonExample = { message: 'Success', status: 'ok' },
    toonExample,
    jsonOnly = false,
    toonOnly = false,
    toonOptions = {},
  } = options;

  // Generar ejemplo TOON usando la librería oficial
  const generatedToonExample = toonExample || toToonFormat(jsonExample, toonOptions);

  const decorators: Array<MethodDecorator & ClassDecorator> = [];

  // Definir media types producidos
  if (toonOnly) {
    decorators.push(ApiProduces('application/toon'));
  } else if (jsonOnly) {
    decorators.push(ApiProduces('application/json'));
  } else {
    decorators.push(ApiProduces('application/json', 'application/toon'));
  }

  // Agregar respuesta con ambos formatos o solo uno
  if (!toonOnly && !jsonOnly) {
    // Ambos formatos en una sola respuesta
    decorators.push(
      ApiResponse({
        status,
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
              example: generatedToonExample,
              description: 'Formato TOON (Token-Oriented Object Notation): optimizado para LLMs',
            },
          },
        },
      }),
    );
  } else if (jsonOnly) {
    // Solo JSON
    decorators.push(
      ApiResponse({
        status,
        description: `${description} - Formato JSON`,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              example: jsonExample,
            },
          },
        },
      }),
    );
  } else if (toonOnly) {
    // Solo TOON
    decorators.push(
      ApiResponse({
        status,
        description: `${description} - Formato TOON`,
        content: {
          'application/toon': {
            schema: {
              type: 'string',
              example: generatedToonExample,
              description: 'TOON (Token-Oriented Object Notation): formato optimizado para LLMs',
            },
          },
        },
      }),
    );
  }

  return applyDecorators(...decorators);
}
