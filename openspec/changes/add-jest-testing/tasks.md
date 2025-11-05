## 1. Instalación de Dependencias
- [ ] 1.1 Instalar `jest`, `@types/jest`, `ts-jest`
- [ ] 1.2 Instalar `@nestjs/testing`
- [ ] 1.3 Verificar versiones compatibles con TypeScript 5.3.3

## 2. Configuración de Jest
- [ ] 2.1 Crear `jest.config.js` con configuración para TypeScript
- [ ] 2.2 Configurar preset `ts-jest`
- [ ] 2.3 Configurar `testEnvironment: 'node'`
- [ ] 2.4 Configurar `moduleFileExtensions: ['js', 'json', 'ts']`
- [ ] 2.5 Configurar `rootDir: 'lib'`
- [ ] 2.6 Configurar `testRegex: '.*\\.spec\\.ts$'`
- [ ] 2.7 Configurar `transform: { '^.+\\.(t|j)s$': 'ts-jest' }`

## 3. Configuración de Coverage
- [ ] 3.1 Configurar `collectCoverageFrom: ['**/*.(t|j)s']`
- [ ] 3.2 Excluir archivos de coverage: `node_modules`, `dist`, `**/*.spec.ts`, `index.ts`
- [ ] 3.3 Configurar threshold mínimo: `branches: 80, functions: 80, lines: 80, statements: 80`
- [ ] 3.4 Configurar `coverageDirectory: './coverage'`

## 4. Tests de ToonInterceptor
- [ ] 4.1 Crear `lib/interceptors/toon.interceptor.spec.ts`
- [ ] 4.2 Test: debe transformar respuesta cuando Accept header es application/toon
- [ ] 4.3 Test: no debe transformar si Accept header es application/json
- [ ] 4.4 Test: no debe transformar si no hay Accept header
- [ ] 4.5 Test: debe manejar errores en transformación
- [ ] 4.6 Test: debe preservar status codes y headers

## 5. Tests de toToonFormat Utility
- [ ] 5.1 Crear `lib/utils/toon-format.util.spec.ts`
- [ ] 5.2 Test: arrays de objetos uniformes → formato tabular
- [ ] 5.3 Test: objetos simples → formato indentado
- [ ] 5.4 Test: arrays primitivos → formato inline
- [ ] 5.5 Test: objetos anidados complejos
- [ ] 5.6 Test: manejo de valores null/undefined
- [ ] 5.7 Test: manejo de strings con caracteres especiales
- [ ] 5.8 Test: diferentes delimiters (comma, tab, pipe)

## 6. Tests de Decoradores
- [ ] 6.1 Crear `lib/decorators/api-toon-response.decorator.spec.ts`
- [ ] 6.2 Test: debe agregar metadata de Swagger correctamente
- [ ] 6.3 Test: debe generar ejemplos JSON y TOON
- [ ] 6.4 Crear `lib/decorators/api-dual-response.decorator.spec.ts`
- [ ] 6.5 Test: debe soportar opciones de delimiters
- [ ] 6.6 Test: debe generar ejemplos con opciones custom

## 7. Actualizar Scripts de package.json
- [ ] 7.1 Cambiar script `"test": "jest"` (reemplazar actual)
- [ ] 7.2 Agregar script `"test:watch": "jest --watch"`
- [ ] 7.3 Agregar script `"test:cov": "jest --coverage"`
- [ ] 7.4 Agregar script `"test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand"`
- [ ] 7.5 Mantener scripts actuales como `"test:toon:manual"` y `"test:dual:manual"`

## 8. Integración con Husky
- [ ] 8.1 Actualizar `.husky/pre-push` para incluir `npm test`
- [ ] 8.2 Verificar que build + tests se ejecuten antes de push
- [ ] 8.3 Documentar en `docs/development/HUSKY.md`

## 9. Documentación
- [ ] 9.1 Actualizar `README.md` con sección "Testing"
- [ ] 9.2 Agregar badges de coverage (preparación)
- [ ] 9.3 Actualizar `docs/ENGINEERING_STANDARDS.md` - cambiar score de Testing de 0/10 a 8/10
- [ ] 9.4 Documentar cómo ejecutar tests en `docs/development/COMMANDS.md`

## 10. Validación Final
- [ ] 10.1 Ejecutar `npm test` y verificar todos los tests pasan
- [ ] 10.2 Ejecutar `npm run test:cov` y verificar coverage >= 80%
- [ ] 10.3 Ejecutar build para asegurar no hay conflictos
- [ ] 10.4 Hacer commit y verificar que pre-push hook funciona con tests
