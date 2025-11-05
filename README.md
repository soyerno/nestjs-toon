# @modo/api-tools

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Librería de herramientas para APIs con interceptors personalizados para NestJS.

> 📖 **[Guía de Uso Rápido →](./docs/USAGE.md)** - Empieza en 5 minutos  
> � **[Documentación Completa →](./docs/)** - Todas las guías disponibles  
> � **[Notas de Desarrollo →](./docs/development/)** - Para contribuidores

## 🚀 Características

- **ToonInterceptor**: Interceptor que transforma respuestas al formato TOON oficial
- **Formato TOON**: Usa la especificación oficial (30-60% ahorro de tokens vs JSON)
- **Integración con Swagger**: Documentación automática con ejemplos reales
- **Flexible**: Aplicación global o a nivel de método
- **Opciones avanzadas**: Soporte para delimiters (tab, pipe), length markers

> ⚠️ **Nota:** Esta librería usa la [especificación oficial TOON](https://github.com/toon-format/toon), no un formato custom.

## 📦 Instalación

```bash
npm install @modo/api-tools
```

## 🎯 Formato TOON

**TOON (Token-Oriented Object Notation)** es un formato de serialización compacto diseñado específicamente para optimizar el uso de tokens en LLMs (Large Language Models).

### ¿Por qué TOON?

- 💸 **Eficiente en tokens**: Típicamente 30-60% menos tokens que JSON
- 🤖 **Optimizado para LLMs**: Diseñado para input/output de modelos de IA
- 📐 **Basado en indentación**: Similar a YAML, usa espacios en lugar de llaves
- 🧺 **Arrays tabulares**: Declara claves una vez, datos en filas

### Ejemplo de Conversión

```javascript
// Input JSON
{
  users: [
    { id: 1, name: "Alice", role: "admin" },
    { id: 2, name: "Bob", role: "user" }
  ]
}

// Output TOON (30-60% menos tokens)
users[2]{id,name,role}:
  1,Alice,admin
  2,Bob,user
```

### Características del Formato

- **Arrays de objetos uniformes**: Formato tabular eficiente
- **Objetos simples**: Estructura indentada tipo YAML
- **Arrays primitivos**: Formato inline compacto
- **Validación LLM**: Headers con longitud y campos explícitos

📖 **Documentación completa:** Ver [TOON_FORMAT.md](./docs/TOON_FORMAT.md) para ejemplos detallados, benchmarks y uso avanzado.

🔗 **Especificación oficial:** [github.com/toon-format/toon](https://github.com/toon-format/toon)

## 🔧 Uso

### 1. Aplicación Global (Recomendado)

Aplica el interceptor a todos los endpoints de tu aplicación:

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { ToonInterceptor } from '@modo/api-tools';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Aplicar interceptor globalmente
  app.useGlobalInterceptors(new ToonInterceptor());
  
  await app.listen(3000);
}

bootstrap();
```

### 2. Aplicación a Nivel de Controlador

```typescript
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ToonInterceptor } from '@modo/api-tools';

@Controller('api')
@UseInterceptors(ToonInterceptor)
export class MyController {
  @Get('data')
  getData() {
    return { message: 'Hello World' };
  }
}
```

### 3. Aplicación a Nivel de Método

```typescript
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ToonInterceptor } from '@modo/api-tools';

@Controller('api')
export class MyController {
  @Get('toon')
  @UseInterceptors(ToonInterceptor)
  getToonData() {
    return { message: 'Hello TOON' };
  }
  
  @Get('normal')
  getNormalData() {
    return { message: 'Hello Normal' };
  }
}
```

### 4. Con Header Content-Type Personalizado

```typescript
import { Controller, Get, Header } from '@nestjs/common';

@Controller('api')
export class MyController {
  @Get('toon')
  @Header('Content-Type', 'application/toon')
  getToonData() {
    return { message: 'Auto TOON' };
  }
}
```

## 📖 Integración con Swagger

La librería proporciona múltiples decoradores para documentar endpoints en Swagger con soporte para ambos media types.

### 1. Decorador `@ApiToonResponse` (Recomendado)

Documenta endpoints que soportan tanto JSON como TOON:

```typescript
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ApiToonResponse } from '@modo/api-tools';

@ApiTags('examples')
@Controller('api')
export class MyController {
  @Get('data')
  @ApiOperation({ summary: 'Obtener datos' })
  @ApiToonResponse(
    'Devuelve datos en formato TOON o JSON',
    { 
      message: 'Hello World',
      timestamp: '2025-11-04T10:00:00.000Z' 
    }
  )
  getData() {
    return { 
      message: 'Hello World',
      timestamp: new Date().toISOString() 
    };
  }
}
```

### 2. Decorador `@ApiDualResponse` (Avanzado)

Para mayor control sobre la documentación de Swagger:

```typescript
import { Controller, Get } from '@nestjs/common';
import { ApiDualResponse } from '@modo/api-tools';

@Controller('api')
export class MyController {
  // Soporta ambos formatos
  @Get('user')
  @ApiDualResponse({
    description: 'Datos del usuario',
    jsonExample: {
      id: 123,
      name: 'John Doe',
      email: 'john@example.com',
      active: true
    }
  })
  getUser() {
    return {
      id: 123,
      name: 'John Doe',
      email: 'john@example.com',
      active: true
    };
  }

  // Solo JSON
  @Get('json-strict')
  @ApiDualResponse({
    description: 'Solo JSON',
    jsonOnly: true,
    jsonExample: { message: 'JSON only' }
  })
  getJsonStrict() {
    return { message: 'JSON only' };
  }

  // Solo TOON
  @Get('toon-strict')
  @ApiDualResponse({
    description: 'Solo TOON',
    toonOnly: true,
    jsonExample: { format: 'toon' }
  })
  getToonStrict() {
    return { format: 'toon' };
  }
}
```

### 3. Decorador `@ApiJsonResponse`

Para endpoints que solo devuelven JSON:

```typescript
import { ApiJsonResponse } from '@modo/api-tools';

@Controller('api')
export class MyController {
  @Get('json-only')
  @ApiJsonResponse(
    'Solo formato JSON',
    { status: 'ok', data: [] }
  )
  getJsonOnly() {
    return { status: 'ok', data: [] };
  }
}
```

### Media Types en Swagger

Los decoradores registran automáticamente los siguientes media types en Swagger:

- **application/json**: Respuesta JSON estándar
- **application/toon**: Respuesta en formato TOON

En la interfaz de Swagger podrás:
1. Ver ejemplos de ambos formatos
2. Seleccionar el media type deseado
3. Ver la estructura de cada formato

### Configuración de Swagger

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ToonInterceptor } from '@modo/api-tools';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Interceptor global
  app.useGlobalInterceptors(new ToonInterceptor());
  
  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('Mi API')
    .setDescription('API con soporte para formato TOON')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  await app.listen(3000);
}

bootstrap();
```

## 🧪 Pruebas

### Con curl

```bash
# Respuesta normal (JSON)
curl http://localhost:3000/api/data \
  -H "Accept: application/json"

# Respuesta TOON
curl http://localhost:3000/api/data \
  -H "Accept: application/toon"
```

### Respuestas esperadas

**JSON normal:**
```json
{
  "message": "Hello World",
  "status": "success"
}
```

**Formato TOON:**
```
TOON::{"MESSAGE":"HELLO WORLD","STATUS":"SUCCESS"}
```

## 🏗️ Estructura del Proyecto

```
modo-llms-api-tools/
├── lib/                                    # Código fuente de la librería
│   ├── interceptors/
│   │   └── toon.interceptor.ts            # Interceptor principal
│   ├── decorators/
│   │   ├── api-toon-response.decorator.ts # Decoradores Swagger básicos
│   │   └── api-dual-response.decorator.ts # Decorador Swagger avanzado
│   ├── utils/
│   │   └── toon-format.util.ts            # Función de conversión
│   └── index.ts                           # Punto de entrada
├── examples/                              # Ejemplos de uso
│   ├── main.ts                            # Aplicación de ejemplo
│   ├── app.module.ts                      # Módulo de ejemplo
│   └── example.controller.ts              # Controlador con 6 ejemplos
├── docs/                                  # Documentación
│   ├── USAGE.md                           # Guía de uso rápido
│   ├── TOON_FORMAT.md                     # Formato TOON detallado
│   ├── SWAGGER_FEATURES.md                # Integración con Swagger
│   └── development/                       # Notas de desarrollo
├── package.json
├── tsconfig.json
└── README.md                              # Documentación principal
```

## 🔑 API

### ToonInterceptor

Interceptor que detecta el header `Accept: application/toon` y transforma la respuesta.

```typescript
class ToonInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any>
}
```

### toToonFormat(data: any, options?: object): string

Función que convierte cualquier dato al formato TOON usando la especificación oficial.

```typescript
import { toToonFormat } from '@modo/api-tools';

// Uso básico
const result = toToonFormat({ 
  users: [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]
});
// users[2]{id,name}:
//   1,Alice
//   2,Bob

// Con opciones
const resultWithTabs = toToonFormat(data, {
  delimiter: '\t',     // Usar tabs (más eficiente en tokens)
  indent: 2,           // Espacios de indentación
  lengthMarker: '#'    // Agregar # a las longitudes: users[#2]
});
```

**Opciones disponibles:**
- `delimiter`: `','` (default), `'\t'` (tab), `'|'` (pipe)
- `indent`: Número de espacios (default: 2)
- `lengthMarker`: `'#'` o `false` (default: false)

### @ApiToonResponse(description?: string, exampleData?: any)

Decorador para documentar en Swagger endpoints que soportan JSON y TOON.

```typescript
@ApiToonResponse(
  'Descripción personalizada',
  { message: 'Example', status: 'ok' }
)
```

**Genera en Swagger:**
- Media type: `application/json` con ejemplo JSON
- Media type: `application/toon` con ejemplo TOON (generado automáticamente)

### @ApiJsonResponse(description?: string, exampleData?: any)

Decorador para endpoints que solo devuelven JSON.

```typescript
@ApiJsonResponse(
  'Solo JSON',
  { data: [] }
)
```

### @ApiDualResponse(options: DualResponseOptions)

Decorador avanzado con opciones completas:

```typescript
interface DualResponseOptions {
  description?: string;      // Descripción de la respuesta
  status?: number;           // Código HTTP (default: 200)
  jsonExample?: any;         // Ejemplo JSON
  toonExample?: string;      // Ejemplo TOON personalizado
  jsonOnly?: boolean;        // Solo JSON
  toonOnly?: boolean;        // Solo TOON
}
```

**Ejemplo:**
```typescript
@ApiDualResponse({
  description: 'Datos del usuario',
  status: 200,
  jsonExample: { id: 1, name: 'John' },
  jsonOnly: false,
  toonOnly: false
})
```

## 📋 Requisitos

- NestJS >= 10.0.0
- RxJS >= 7.0.0
- @nestjs/swagger >= 7.0.0 (opcional, para integración con Swagger)

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

MIT

## 🚀 Roadmap

- [ ] Soporte para más formatos personalizados
- [ ] Interceptor para logging
- [ ] Interceptor para rate limiting
- [ ] Decoradores adicionales para transformación de datos
- [ ] Tests unitarios y de integración

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias, por favor abre un issue en el repositorio.
