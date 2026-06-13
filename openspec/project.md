# Project Context

## Purpose
`@soyerno/nestjs-toon` es una librería de herramientas para APIs con interceptors personalizados para NestJS. Su objetivo principal es proporcionar soporte nativo para el formato TOON (Token-Oriented Object Notation) en APIs NestJS, optimizando las respuestas para LLMs (Large Language Models) con un ahorro del 30-60% en tokens comparado con JSON tradicional.

**Objetivos principales:**
- Transformar respuestas de API al formato TOON oficial automáticamente
- Integración transparente con el ecosistema NestJS
- Documentación Swagger con soporte dual (JSON + TOON)
- Facilitar el uso del formato TOON sin modificar la lógica de negocio existente

## Tech Stack
- **TypeScript 5.3.3** - Lenguaje principal
- **NestJS 10.x** - Framework backend (peer dependency)
- **Swagger/OpenAPI 7.x** - Documentación de API
- **@toon-format/toon** - Librería oficial de TOON
- **Husky 9.x** - Git hooks para validación pre-commit/pre-push
- **ts-node** - Ejecución de ejemplos TypeScript
- **Node.js 20+** - Runtime requerido

**Nota importante:** Este proyecto usa la especificación oficial TOON (github.com/toon-format/toon), NO un formato custom.

## Project Conventions

### Code Style
- **Lenguaje:** TypeScript con configuración moderadamente permisiva (strict mode parcial)
- **Indentación:** 2 espacios
- **Comillas:** Simple quotes preferidas
- **Punto y coma:** Requerido al final de statements
- **Naming conventions:**
  - Clases: PascalCase (ej: `ToonInterceptor`)
  - Funciones/métodos: camelCase (ej: `toToonFormat`)
  - Constantes: UPPER_SNAKE_CASE para exports públicos
  - Archivos: kebab-case con sufijos descriptivos (`.decorator.ts`, `.interceptor.ts`, `.util.ts`)
- **Documentación:** JSDoc obligatorio para APIs públicas
- **Imports:** Path aliases con `@/` apuntando al root del proyecto

**⚠️ Estado actual:** No hay ESLint ni Prettier configurado (está en el backlog de mejoras)

### Architecture Patterns
- **Estructura modular por tipo:**
  - `/lib/decorators/` - Decoradores de Swagger y metadata
  - `/lib/interceptors/` - Interceptors de NestJS
  - `/lib/utils/` - Funciones utilitarias puras
  - `/examples/` - Aplicaciones de ejemplo y tests manuales
  - `/docs/` - Documentación exhaustiva del proyecto

- **Patrón de Interceptor:**
  - `ToonInterceptor` implementa `NestInterceptor` estándar
  - Detección del header `Accept: application/toon` para activar transformación
  - No modifica la respuesta si no se solicita TOON explícitamente

- **Patrón de Decoradores:**
  - `@ApiToonResponse` - Dual JSON + TOON en Swagger
  - `@ApiDualResponse` - Con opciones avanzadas (delimiters, length markers)
  - Decoradores componen sobre `@nestjs/swagger` existente

- **Exports centralizados:** Todo se exporta desde `/lib/index.ts`

### Testing Strategy
**⚠️ ESTADO ACTUAL: Sin tests unitarios (score 0/10)**

Actualmente el proyecto NO tiene tests reales:
- No hay framework de testing configurado (Jest/Vitest)
- Scripts `npm test` ejecutan ejemplos manuales, no tests automatizados
- No hay coverage configurado
- Sin validación automática en CI/CD

**Testing manual existente:**
- `examples/test-toon.ts` - Validación manual del formato TOON
- `examples/test-dual-format.ts` - Validación manual de decoradores Swagger
- `examples/main.ts` - Aplicación NestJS completa para pruebas manuales

**Objetivo futuro (según ENGINEERING_STANDARDS.md):**
- Implementar Jest con @nestjs/testing
- Objetivo de 80% code coverage mínimo
- Tests unitarios para: ToonInterceptor, toToonFormat, decoradores
- Tests de integración con NestJS

### Git Workflow
- **Branches:** Desarrollo directo en `main` (proyecto en etapa inicial)
- **Commits:** Sin conventional commits enforced actualmente
- **Git Hooks (Husky):**
  - **Pre-commit:** Type checking + build TypeScript
  - **Pre-push:** Build completo + tests manuales TOON
  - Bypass disponible con `--no-verify` (solo emergencias)

**Workflow típico:**
```bash
git add .
git commit -m "mensaje"  # ← ejecuta tsc para validar
git push                 # ← ejecuta build + test:toon
```

**Historial de versiones:** Sin CHANGELOG.md ni semantic-release configurado

## Domain Context

### Formato TOON (Token-Oriented Object Notation)
El conocimiento central de este proyecto es el formato TOON:

**Características clave:**
- Basado en indentación (tipo YAML)
- Arrays tabulares: declara claves una vez, datos en filas
- Optimizado para reducir tokens en LLMs
- Soporte para delimiters: comma (default), tab, pipe

**Ejemplo de transformación:**
```javascript
// Input JSON (formato tradicional)
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

**Tipos de datos soportados:**
- Arrays de objetos uniformes → formato tabular
- Objetos simples → estructura indentada
- Arrays primitivos → formato inline compacto
- Headers con metadata: longitud y campos explícitos

**Documentación completa:** Ver `/docs/TOON_FORMAT.md`

### Content Negotiation
El sistema responde según el header `Accept`:
- `Accept: application/json` → Respuesta JSON estándar
- `Accept: application/toon` → Respuesta transformada a TOON
- Sin header → JSON por defecto

### Integración Swagger
Los decoradores automáticamente:
- Generan ejemplos TOON a partir de DTOs TypeScript
- Registran ambos media types en OpenAPI schema
- Muestran ejemplos lado a lado en Swagger UI

## Important Constraints

### Técnicas
- **Peer Dependencies estrictas:**
  - Requiere NestJS 10.x exactamente
  - Requiere @nestjs/swagger 7.x
  - Compatible solo con TypeScript 5.x+
  
- **Target ES2021:** No soporta navegadores antiguos ni Node.js < 16

- **Sin strict mode completo:**
  ```json
  {
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false
  }
  ```
  Esto es una decisión temporal para facilitar desarrollo inicial, pero implica menor type safety.

- **Formato TOON oficial:** Debe mantenerse 100% compatible con la especificación de github.com/toon-format/toon

### De Negocio/Producto
- Librería open source de soyerno, publicada bajo licencia MIT
- No está publicada en npm público (versión 1.0.0 es local)
- Documentación debe estar completamente en español

### Calidad
- **Score actual: 4/10** según evaluación de ingeniería
- NO listo para producción sin tests
- Falta metadata de package.json para publicación
- Sin LICENSE file (dice MIT pero archivo no existe)

## External Dependencies

### Dependencias Core
- **@toon-format/toon (^0.7.3):** Librería oficial de serialización TOON
  - Proporciona la función `toon()` para conversión
  - Única dependency directa del proyecto

### Peer Dependencies (requeridas por consumidores)
- **@nestjs/common (^10.0.0):** Core NestJS - decoradores, interfaces
- **@nestjs/core (^10.0.0):** Runtime NestJS
- **@nestjs/swagger (^7.0.0):** Generación OpenAPI/Swagger
- **reflect-metadata (^0.1.13):** Metadata reflection (requerido por decoradores)
- **rxjs (^7.0.0):** Reactive extensions (usado por NestJS)

### Dev Dependencies
- **Husky:** Git hooks para validación pre-commit
- **ts-node:** Ejecución de ejemplos sin compilar

### Servicios Externos
Ninguno - esta librería es completamente standalone y no se conecta a servicios externos.
