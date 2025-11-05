## Why
La configuración actual de TypeScript es muy permisiva (strict mode deshabilitado), lo que aumenta la probabilidad de bugs en tiempo de ejecución que podrían detectarse en compile-time. Para una librería que será usada por otros proyectos, es crítico tener máxima type safety.

## What Changes
- Habilitar `"strict": true` en tsconfig.json
- Habilitar `strictNullChecks`, `noImplicitAny`, `strictBindCallApply`
- Habilitar `noUnusedLocals` y `noUnusedParameters`
- Corregir todos los errores de tipo resultantes en el código
- Agregar tipos explícitos donde TypeScript no puede inferirlos
- Manejar correctamente valores null/undefined
- **BREAKING**: Esta es una mejora interna sin cambios en API pública

## Impact
- **Affected specs:** `typescript-config` (nueva capability)
- **Affected code:**
  - `tsconfig.json` - Habilitar opciones strict
  - `lib/interceptors/toon.interceptor.ts` - Posibles ajustes de tipos
  - `lib/utils/toon-format.util.ts` - Posibles ajustes de tipos
  - `lib/decorators/*.ts` - Posibles ajustes de tipos
  - `examples/*.ts` - Posibles ajustes de tipos

**Score esperado:** Pasar de 6/10 a 9/10 en categoría TypeScript config
**Beneficio:** Código más robusto, menos bugs, mejor developer experience
