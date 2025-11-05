## Why
El proyecto carece de herramientas de linting y formateo de código, lo que resulta en inconsistencias de estilo, dificulta el mantenimiento, y puede introducir bugs comunes que herramientas automatizadas detectarían fácilmente.

## What Changes
- Instalar ESLint con parser y plugins de TypeScript
- Instalar Prettier para formateo consistente
- Configurar reglas específicas de NestJS
- Crear configuración .eslintrc.js con reglas apropiadas
- Crear configuración .prettierrc con estilo del proyecto
- Agregar scripts de linting y formateo a package.json
- Integrar lint en Husky pre-commit hook
- Agregar .eslintignore y .prettierignore

## Impact
- **Affected specs:** `code-quality` (nueva capability)
- **Affected code:**
  - `package.json` - Nuevas devDependencies y scripts
  - Nuevo archivo `.eslintrc.js` en root
  - Nuevo archivo `.prettierrc` en root
  - Nuevo archivo `.eslintignore` en root
  - Nuevo archivo `.prettierignore` en root
  - `.husky/pre-commit` - Agregar validación de lint
  - Todos los archivos `.ts` del proyecto serán formateados

**Score esperado:** Pasar de 0/10 a 9/10 en categoría Linting/Formateo
