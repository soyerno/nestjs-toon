## ADDED Requirements

### Requirement: Test Framework Configuration
El proyecto SHALL tener Jest configurado como framework de testing con soporte completo para TypeScript y NestJS.

#### Scenario: Jest ejecuta tests TypeScript
- **WHEN** se ejecuta `npm test`
- **THEN** Jest compila y ejecuta archivos `.spec.ts` usando ts-jest

#### Scenario: Coverage report generado
- **WHEN** se ejecuta `npm run test:cov`
- **THEN** se genera reporte de coverage en directorio `./coverage`
- **AND** se muestran métricas de branches, functions, lines, statements

### Requirement: Coverage Thresholds
El proyecto SHALL mantener un mínimo de 80% de code coverage en todas las métricas.

#### Scenario: Tests fallan si coverage < 80%
- **WHEN** el coverage es menor al 80% en cualquier métrica
- **THEN** Jest retorna exit code 1
- **AND** muestra mensaje de error indicando threshold no alcanzado

#### Scenario: Coverage excluye archivos irrelevantes
- **WHEN** se calcula coverage
- **THEN** se excluyen archivos: `node_modules/`, `dist/`, `**/*.spec.ts`, `index.ts`

### Requirement: ToonInterceptor Tests
El ToonInterceptor SHALL tener tests unitarios que validen su comportamiento de transformación.

#### Scenario: Transformación activada con header correcto
- **WHEN** request tiene header `Accept: application/toon`
- **THEN** interceptor transforma respuesta a formato TOON
- **AND** Content-Type de respuesta es `application/toon`

#### Scenario: No transformación sin header TOON
- **WHEN** request tiene header `Accept: application/json` o sin header
- **THEN** interceptor NO transforma respuesta
- **AND** respuesta se retorna en formato JSON original

#### Scenario: Manejo de errores en transformación
- **WHEN** toToonFormat lanza excepción
- **THEN** interceptor propaga error apropiadamente
- **AND** no corrompe la respuesta original

### Requirement: toToonFormat Utility Tests
La función toToonFormat SHALL tener tests exhaustivos para todos los tipos de datos soportados.

#### Scenario: Arrays de objetos uniformes
- **WHEN** se convierte array como `[{id:1,name:"A"},{id:2,name:"B"}]`
- **THEN** genera formato tabular TOON: `array[2]{id,name}:\n  1,A\n  2,B`

#### Scenario: Objetos simples
- **WHEN** se convierte objeto simple `{message: "Hello", code: 200}`
- **THEN** genera formato indentado: `message: Hello\ncode: 200`

#### Scenario: Arrays primitivos
- **WHEN** se convierte array primitivo `[1, 2, 3]`
- **THEN** genera formato inline compacto

#### Scenario: Diferentes delimiters
- **WHEN** se usa delimiter "tab" o "pipe"
- **THEN** formato tabular usa el delimiter especificado en lugar de comma

#### Scenario: Valores especiales
- **WHEN** objeto contiene null, undefined, o strings con caracteres especiales
- **THEN** valores son serializados correctamente sin errores

### Requirement: Decorators Tests
Los decoradores de Swagger SHALL tener tests que validen la generación de metadata y ejemplos.

#### Scenario: ApiToonResponse genera metadata dual
- **WHEN** decorador @ApiToonResponse es aplicado a un método
- **THEN** metadata de Swagger incluye `application/json` y `application/toon`
- **AND** ejemplos para ambos formatos son generados

#### Scenario: ApiDualResponse soporta opciones
- **WHEN** decorador @ApiDualResponse recibe opciones de delimiter
- **THEN** ejemplos TOON usan el delimiter especificado
- **AND** metadata refleja las opciones correctamente

### Requirement: Test Execution Scripts
El package.json SHALL proveer scripts convenientes para ejecutar tests en diferentes modos.

#### Scenario: Script test ejecuta suite completa
- **WHEN** se ejecuta `npm test`
- **THEN** todos los archivos `.spec.ts` en `lib/` son ejecutados

#### Scenario: Script test:watch para desarrollo
- **WHEN** se ejecuta `npm run test:watch`
- **THEN** Jest entra en modo watch
- **AND** re-ejecuta tests automáticamente al modificar archivos

#### Scenario: Script test:cov con coverage completo
- **WHEN** se ejecuta `npm run test:cov`
- **THEN** tests son ejecutados con coverage
- **AND** reporte HTML es generado en `./coverage`

### Requirement: Git Hooks Integration
Los tests SHALL ejecutarse automáticamente en git hooks para prevenir commits/pushes con código roto.

#### Scenario: Pre-push ejecuta tests
- **WHEN** se ejecuta `git push`
- **THEN** Husky hook ejecuta `npm test` antes de permitir push
- **AND** push es bloqueado si tests fallan

#### Scenario: Tests completan en tiempo razonable
- **WHEN** se ejecutan todos los tests
- **THEN** ejecución completa en menos de 10 segundos
- **AND** no bloquean workflow de desarrollo
