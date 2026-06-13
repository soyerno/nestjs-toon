## 1. Campo Repository
- [ ] 1.1 Agregar campo `repository` con estructura completa
- [ ] 1.2 Definir `type: "git"`
- [ ] 1.3 Definir URL del repositorio (actualizar con URL real cuando esté disponible)
- [ ] 1.4 Usar formato: `"url": "https://github.com/soyerno/nestjs-toon.git"`

## 2. Campo Author
- [ ] 2.1 Definir autor principal del proyecto
- [ ] 2.2 Usar formato: `"author": "Nombre <email@ejemplo.com>"`
- [ ] 2.3 Alternativamente usar formato objeto: `{ "name": "...", "email": "...", "url": "..." }`

## 3. Campo Bugs
- [ ] 3.1 Agregar campo `bugs` vinculado al repository
- [ ] 3.2 Usar formato: `{ "url": "https://github.com/soyerno/nestjs-toon/issues" }`

## 4. Campo Homepage
- [ ] 4.1 Agregar campo `homepage`
- [ ] 4.2 Apuntar al README del repositorio: `"https://github.com/soyerno/nestjs-toon#readme"`
- [ ] 4.3 Alternativamente, usar sitio de documentación si existe

## 5. Campo Files
- [ ] 5.1 Agregar campo `files` para controlar publicación
- [ ] 5.2 Incluir: `"dist"`
- [ ] 5.3 Incluir: `"README.md"`
- [ ] 5.4 Incluir: `"LICENSE"` (cuando exista)
- [ ] 5.5 Excluir implícitamente: `examples/`, `docs/development/`, tests, etc.

## 6. Keywords Mejorados
- [ ] 6.1 Revisar keywords actuales: `nestjs`, `interceptor`, `api`, `tools`
- [ ] 6.2 Agregar: `"toon"`, `"toon-format"`
- [ ] 6.3 Agregar: `"llm"`, `"token-optimization"`
- [ ] 6.4 Agregar: `"swagger"`, `"openapi"`
- [ ] 6.5 Agregar: `"typescript"`
- [ ] 6.6 Mantener array ordenado alfabéticamente

## 7. Revisión de Dependencies
- [ ] 7.1 Revisar si `@toon-format/toon` debe estar en `dependencies`
- [ ] 7.2 Evaluar si debería estar en `peerDependencies` (usuarios lo instalan)
- [ ] 7.3 Considerar que es librería core que siempre se necesita → probablemente OK en dependencies
- [ ] 7.4 Documentar decisión en comments o docs

## 8. Otros Campos Opcionales
- [ ] 8.1 Considerar agregar `contributors` si hay más desarrolladores
- [ ] 8.2 Considerar agregar `funding` si aplica
- [ ] 8.3 Verificar que `license: "MIT"` esté presente (ya existe)
- [ ] 8.4 Considerar agregar `engines` con versión mínima de Node.js

## 9. Validación
- [ ] 9.1 Ejecutar `npm pack --dry-run` para ver qué se incluiría en publicación
- [ ] 9.2 Verificar que solo archivos necesarios se incluyen
- [ ] 9.3 Verificar que tamaño del paquete es razonable (<100KB)
- [ ] 9.4 Ejecutar `npm run build` para asegurar compatibilidad

## 10. Documentación
- [ ] 10.1 Actualizar `docs/ENGINEERING_STANDARDS.md` - cambiar score de Package metadata de 4/10 a 9/10
- [ ] 10.2 Documentar en README cómo publicar el paquete
- [ ] 10.3 Crear checklist de pre-publicación si no existe
