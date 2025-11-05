## 1. Habilitar Strict Mode en tsconfig.json
- [ ] 1.1 Cambiar `"strict": false` a `"strict": true`
- [ ] 1.2 Cambiar `"strictNullChecks": false` a `"strictNullChecks": true`
- [ ] 1.3 Cambiar `"noImplicitAny": false` a `"noImplicitAny": true`
- [ ] 1.4 Cambiar `"strictBindCallApply": false` a `"strictBindCallApply": true`

## 2. Agregar Opciones Adicionales de Calidad
- [ ] 2.1 Agregar `"noUnusedLocals": true`
- [ ] 2.2 Agregar `"noUnusedParameters": true`
- [ ] 2.3 Considerar `"noImplicitReturns": true`
- [ ] 2.4 Considerar `"noFallthroughCasesInSwitch": true` (cambiar de false)

## 3. Compilar y Analizar Errores
- [ ] 3.1 Ejecutar `npm run build` y capturar todos los errores de tipo
- [ ] 3.2 Categorizar errores por tipo (null checks, any, unused vars, etc.)
- [ ] 3.3 Crear plan de corrección priorizado por severidad

## 4. Corregir ToonInterceptor
- [ ] 4.1 Revisar tipos en método `intercept()`
- [ ] 4.2 Agregar tipos explícitos a parámetros si es necesario
- [ ] 4.3 Manejar casos null/undefined en response handling
- [ ] 4.4 Verificar tipos de Observable y operadores RxJS

## 5. Corregir toToonFormat Utility
- [ ] 5.1 Revisar firma de función y parámetros
- [ ] 5.2 Agregar tipos explícitos para parámetro `data`
- [ ] 5.3 Manejar casos null/undefined correctamente
- [ ] 5.4 Revisar tipo de retorno (string)
- [ ] 5.5 Corregir any implícitos en recursión o helpers

## 6. Corregir Decoradores
- [ ] 6.1 Revisar `api-toon-response.decorator.ts`
- [ ] 6.2 Revisar `api-dual-response.decorator.ts`
- [ ] 6.3 Agregar tipos a funciones decoradoras
- [ ] 6.4 Manejar metadata de Swagger correctamente tipada
- [ ] 6.5 Verificar tipos de opciones y parámetros

## 7. Corregir Ejemplos
- [ ] 7.1 Revisar `examples/main.ts`
- [ ] 7.2 Revisar `examples/example.controller.ts`
- [ ] 7.3 Revisar `examples/app.module.ts`
- [ ] 7.4 Corregir errores de tipo en tests manuales
- [ ] 7.5 Asegurar que ejemplos compilan sin errores

## 8. Manejar Variables No Usadas
- [ ] 8.1 Eliminar variables declaradas pero no usadas
- [ ] 8.2 Usar prefijo `_` para parámetros intencionales no usados (ej: `_req`)
- [ ] 8.3 Revisar imports no usados y eliminarlos

## 9. Validación de Tipos
- [ ] 9.1 Ejecutar `tsc --noEmit` para verificar sin generar archivos
- [ ] 9.2 Verificar 0 errores de tipo
- [ ] 9.3 Ejecutar `npm run build` exitosamente
- [ ] 9.4 Verificar que archivos `.d.ts` generados son correctos

## 10. Testing Post-Cambios
- [ ] 10.1 Ejecutar ejemplos y verificar funcionamiento: `npm run example`
- [ ] 10.2 Ejecutar tests manuales: `npm run test:toon`, `npm run test:dual`
- [ ] 10.3 Verificar que no hay regresiones en comportamiento
- [ ] 10.4 Si tests unitarios existen (de add-jest-testing), ejecutarlos

## 11. Documentación
- [ ] 11.1 Actualizar `docs/ENGINEERING_STANDARDS.md` - cambiar score de TypeScript config de 6/10 a 9/10
- [ ] 11.2 Documentar decisiones de tipo tomadas si hubo casos complejos
- [ ] 11.3 Actualizar README si aplica (probablemente no necesario)

## 12. Code Review y Refinamiento
- [ ] 12.1 Revisar todos los cambios de tipo agregados
- [ ] 12.2 Asegurar que tipos son precisos, no solo `any` para silenciar errores
- [ ] 12.3 Verificar que null/undefined están manejados apropiadamente
- [ ] 12.4 Hacer commit con mensaje descriptivo
