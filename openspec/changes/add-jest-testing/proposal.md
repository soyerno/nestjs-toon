## Why
El proyecto actualmente carece de tests unitarios, lo que representa un riesgo crítico para la calidad del código y la protección contra regresiones. Sin tests automatizados, no hay garantías de que los cambios futuros no rompan funcionalidad existente.

## What Changes
- Instalar y configurar Jest como framework de testing
- Instalar @nestjs/testing para testing de componentes NestJS
- Crear configuración de Jest (jest.config.js)
- Configurar coverage con objetivo mínimo del 80%
- Crear tests unitarios para `ToonInterceptor`
- Crear tests unitarios para `toToonFormat` utility
- Crear tests unitarios para decoradores `@ApiToonResponse` y `@ApiDualResponse`
- Actualizar scripts de package.json para ejecutar tests reales
- Integrar tests en Husky hooks (pre-push)

## Impact
- **Affected specs:** `testing` (nueva capability)
- **Affected code:**
  - `package.json` - Nuevas devDependencies y scripts
  - `lib/interceptors/toon.interceptor.ts` - Tests en archivo paralelo
  - `lib/utils/toon-format.util.ts` - Tests en archivo paralelo
  - `lib/decorators/*.ts` - Tests en archivos paralelos
  - `.husky/pre-push` - Agregar validación de tests
  - Nuevo archivo `jest.config.js` en root

**Score esperado:** Pasar de 0/10 a 8/10 en categoría Testing
