## ADDED Requirements

### Requirement: ESLint Configuration
El proyecto SHALL tener ESLint configurado con soporte completo para TypeScript y reglas específicas de NestJS.

#### Scenario: ESLint valida archivos TypeScript
- **WHEN** se ejecuta `npm run lint`
- **THEN** ESLint analiza todos los archivos `.ts` en `lib/` y `examples/`
- **AND** usa `@typescript-eslint/parser` para parsear código TypeScript

#### Scenario: Reglas TypeScript habilitadas
- **WHEN** ESLint analiza código
- **THEN** aplica reglas de `plugin:@typescript-eslint/recommended`
- **AND** detecta problemas comunes de TypeScript

#### Scenario: Configuración personalizada del proyecto
- **WHEN** código usa patrones específicos del proyecto
- **THEN** reglas custom permiten `explicit-function-return-type: off`
- **AND** permite `explicit-module-boundary-types: off`
- **AND** advierte sobre `any` pero no falla

### Requirement: Prettier Integration
El proyecto SHALL tener Prettier configurado para formateo automático consistente.

#### Scenario: Prettier formatea código
- **WHEN** se ejecuta `npm run format`
- **THEN** todos los archivos TypeScript son formateados
- **AND** aplica estilo: single quotes, trailing commas, semi, 2 spaces

#### Scenario: ESLint y Prettier no conflictúan
- **WHEN** se ejecuta `npm run lint`
- **THEN** ESLint NO reporta errores de formateo
- **AND** `eslint-config-prettier` deshabilita reglas conflictivas

#### Scenario: Verificación de formateo
- **WHEN** se ejecuta `npm run format:check`
- **THEN** retorna exit code 0 si todo está formateado
- **AND** retorna exit code 1 si hay archivos sin formatear

### Requirement: Auto-fix Capabilities
ESLint y Prettier SHALL proveer capacidad de auto-corrección para la mayoría de issues.

#### Scenario: ESLint corrige automáticamente
- **WHEN** se ejecuta `npm run lint:fix`
- **THEN** ESLint corrige issues automáticamente cuando sea posible
- **AND** solo deja issues que requieren intervención manual

#### Scenario: Formateo automático completo
- **WHEN** se ejecuta `npm run format`
- **THEN** todos los archivos quedan formateados según `.prettierrc`
- **AND** cambios son idempotentes (ejecutar dos veces no cambia nada)

### Requirement: Ignore Patterns
El linting y formateo SHALL excluir archivos irrelevantes para mejorar performance.

#### Scenario: Archivos ignorados por ESLint
- **WHEN** ESLint ejecuta
- **THEN** ignora `node_modules/`, `dist/`, `coverage/`
- **AND** no analiza archivos generados o de terceros

#### Scenario: Archivos ignorados por Prettier
- **WHEN** Prettier ejecuta
- **THEN** usa mismo patrón de ignore que ESLint
- **AND** mantiene consistencia entre herramientas

### Requirement: Git Hooks Integration
El linting SHALL ejecutarse automáticamente en pre-commit para prevenir código con problemas.

#### Scenario: Pre-commit ejecuta lint
- **WHEN** se ejecuta `git commit`
- **THEN** Husky hook ejecuta `npm run lint` antes de commit
- **AND** commit es bloqueado si hay errores de linting

#### Scenario: Hook performance aceptable
- **WHEN** se ejecuta pre-commit hook
- **THEN** lint completa en menos de 5 segundos
- **AND** no afecta significativamente el workflow de desarrollo

### Requirement: Code Style Consistency
El código SHALL seguir reglas de estilo consistentes definidas en configuración.

#### Scenario: Single quotes enforcement
- **WHEN** código usa double quotes
- **THEN** Prettier convierte a single quotes automáticamente

#### Scenario: Trailing commas en objetos/arrays
- **WHEN** objeto o array multi-línea existe
- **THEN** Prettier agrega trailing comma en último elemento

#### Scenario: Semicolons obligatorios
- **WHEN** statement no tiene semicolon
- **THEN** Prettier agrega semicolon automáticamente

#### Scenario: Indentación de 2 espacios
- **WHEN** código usa indentación inconsistente
- **THEN** Prettier normaliza a 2 espacios

### Requirement: TypeScript Specific Rules
ESLint SHALL aplicar reglas específicas de TypeScript que mejoran calidad del código.

#### Scenario: Unused variables detectados
- **WHEN** variable declarada pero no usada
- **THEN** ESLint reporta error
- **AND** permite variables que empiezan con `_` (convention para intentional unused)

#### Scenario: Any type advertencia
- **WHEN** tipo `any` es usado
- **THEN** ESLint emite warning (no error)
- **AND** desarrollador puede ignorar si es intencional
