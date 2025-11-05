## Why
El package.json tiene metadatos incompletos que afectan la capacidad de publicar la librería a npm de manera profesional. Faltan campos críticos como repository, author, bugs, homepage, y el campo `files` que controla qué se publica.

## What Changes
- Agregar campo `repository` con URL del repositorio Git
- Completar campo `author` con información del desarrollador
- Agregar campo `bugs` para reporte de issues
- Agregar campo `homepage` para documentación
- Agregar campo `files` para controlar qué se incluye en publicación npm
- Agregar keywords adicionales relevantes para discoverability
- Revisar clasificación de `@toon-format/toon` (dependencies vs peer dependencies)

## Impact
- **Affected specs:** `package-configuration` (nueva capability)
- **Affected code:**
  - `package.json` - Actualización de metadata

**Score esperado:** Pasar de 4/10 a 9/10 en categoría Package metadata
**Beneficio:** Listo para publicación profesional en npm
