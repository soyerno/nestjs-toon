import { Controller, Get, UseInterceptors, Header } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ToonInterceptor } from '../lib/interceptors/toon.interceptor';
import { ApiToonResponse, ApiJsonResponse } from '../lib/decorators/api-toon-response.decorator';
import { ApiDualResponse } from '../lib/decorators/api-dual-response.decorator';

@ApiTags('examples')
@Controller('api')
export class ExampleController {
  /**
   * Endpoint con formato TOON aplicado a nivel de método
   * Requiere header: Accept: application/toon
   * Soporta tanto JSON como TOON
   */
  @Get('toon-method')
  @UseInterceptors(ToonInterceptor)
  @ApiOperation({ summary: 'Ejemplo con interceptor a nivel de método' })
  @ApiToonResponse('Devuelve datos en formato TOON o JSON según header Accept', {
    message: 'Hello from method-level interceptor',
    timestamp: '2025-11-04T10:00:00.000Z',
    data: { value: 42 },
  })
  getToonMethod() {
    return {
      message: 'Hello from method-level interceptor',
      timestamp: new Date().toISOString(),
      data: { value: 42 },
    };
  }

  /**
   * Endpoint con Content-Type personalizado TOON
   * El interceptor global se encarga de la transformación
   */
  @Get('toon-custom')
  @Header('Content-Type', 'application/toon')
  @ApiOperation({ summary: 'Ejemplo con Content-Type personalizado TOON' })
  @ApiToonResponse('Devuelve datos en formato TOON automáticamente', {
    message: 'Hello with custom Content-Type',
    status: 'success',
  })
  getToonCustom() {
    return {
      message: 'Hello with custom Content-Type',
      status: 'success',
    };
  }

  /**
   * Endpoint con Content-Type JSON explícito
   * Devuelve JSON estándar
   */
  @Get('json-only')
  @Header('Content-Type', 'application/json')
  @ApiOperation({ summary: 'Endpoint que solo devuelve JSON' })
  @ApiJsonResponse('Devuelve solo JSON estándar', {
    message: 'Hello JSON',
    format: 'standard',
    contentType: 'application/json',
  })
  getJsonOnly() {
    return {
      message: 'Hello JSON',
      format: 'standard',
      contentType: 'application/json',
    };
  }

  /**
   * Endpoint normal (se transforma si Accept: application/toon)
   * Si el interceptor está aplicado globalmente, funcionará automáticamente
   * Soporta ambos formatos según el header Accept
   */
  @Get('normal')
  @ApiOperation({ summary: 'Endpoint flexible (JSON o TOON según Accept header)' })
  @ApiToonResponse('Devuelve JSON o TOON según el header Accept', {
    message: 'Hello World',
    version: '1.0.0',
    features: ['toon-format', 'interceptors', 'swagger'],
  })
  getNormal() {
    return {
      message: 'Hello World',
      version: '1.0.0',
      features: ['toon-format', 'interceptors', 'swagger'],
    };
  }

  /**
   * Endpoint con decorador avanzado ApiDualResponse
   * Muestra claramente ambos media types en Swagger
   */
  @Get('dual-format')
  @ApiOperation({ summary: 'Endpoint con documentación dual mejorada' })
  @ApiDualResponse({
    description: 'Datos del usuario',
    jsonExample: {
      id: 123,
      name: 'John Doe',
      email: 'john@example.com',
      active: true,
    },
  })
  getUserData() {
    return {
      id: 123,
      name: 'John Doe',
      email: 'john@example.com',
      active: true,
    };
  }

  /**
   * Endpoint con solo TOON usando ApiDualResponse
   */
  @Get('toon-only-dual')
  @Header('Content-Type', 'application/toon')
  @ApiOperation({ summary: 'Solo TOON con ApiDualResponse' })
  @ApiDualResponse({
    description: 'Respuesta siempre en TOON',
    toonOnly: true,
    jsonExample: {
      format: 'toon-only',
      timestamp: Date.now(),
    },
  })
  getToonOnlyDual() {
    return {
      format: 'toon-only',
      timestamp: Date.now(),
    };
  }
}
