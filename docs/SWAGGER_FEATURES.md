# Resumen de Funcionalidades - Media Types en Swagger

## ✅ Cambios Implementados

### 🎯 Formato TOON Correcto

**IMPORTANTE:** Esta librería ahora usa la especificación oficial de TOON (Token-Oriented Object Notation) de https://github.com/toon-format/toon

TOON **NO** es "TOON::" + JSON en mayúsculas. Es un formato estructurado optimizado para LLMs que:

- Reduce tokens en ~30-60% vs JSON
- Usa formato tabular para arrays de objetos uniformes
- Indentación tipo YAML para objetos
- Headers explícitos con longitud y campos

**Ejemplo real:**
```javascript
// JSON (100 tokens aprox)
{
  "users": [
    { "id": 1, "name": "Alice", "role": "admin" },
    { "id": 2, "name": "Bob", "role": "user" }
  ]
}

// TOON (40-60 tokens aprox - ahorro 40-60%)
users[2]{id,name,role}:
  1,Alice,admin
  2,Bob,user
```

### 1. **Decoradores Swagger Mejorados**

#### `@ApiToonResponse` - Mejorado
- Ahora registra **dos respuestas separadas** en Swagger (status 200)
- Una respuesta para `application/json`
- Una respuesta para `application/toon`
- Genera automáticamente el ejemplo TOON desde el ejemplo JSON
- Acepta parámetro `exampleData` opcional

```typescript
@ApiToonResponse(
  'Devuelve datos del usuario',
  { id: 1, name: 'John', email: 'john@example.com' }
)
```

**En Swagger se verá:**
- ✅ Response 200 (application/json): `{"id":1,"name":"John","email":"john@example.com"}`
- ✅ Response 200 (application/toon): `TOON::{"ID":1,"NAME":"JOHN","EMAIL":"JOHN@EXAMPLE.COM"}`

#### `@ApiJsonResponse` - Nuevo
- Para endpoints que solo devuelven JSON
- Registra solo `application/json` en Swagger

```typescript
@ApiJsonResponse(
  'Solo JSON',
  { status: 'ok', data: [] }
)
```

#### `@ApiDualResponse` - Nuevo (Avanzado)
- Máximo control sobre la documentación
- Opciones para JSON only, TOON only, o ambos
- Personalización completa de ejemplos

```typescript
@ApiDualResponse({
  description: 'Datos del usuario',
  status: 200,
  jsonExample: {
    id: 123,
    name: 'John Doe',
    active: true
  },
  jsonOnly: false,
  toonOnly: false,
  toonOptions: {
    delimiter: '\t',    // Usar tabs para máxima eficiencia
    lengthMarker: '#'   // Agregar # a las longitudes
  }
})
```

**Opciones TOON disponibles:**
- `delimiter`: `','` (comma), `'\t'` (tab - más eficiente), `'|'` (pipe)
- `lengthMarker`: Agregar `#` antes de las longitudes (ej: `users[#3]`)
- `indent`: Espacios de indentación (default: 2)

**Opciones disponibles:**
- `description`: Descripción de la respuesta
- `status`: Código HTTP (default: 200)
- `jsonExample`: Objeto ejemplo para JSON
- `toonExample`: String personalizado para TOON
- `jsonOnly`: Solo mostrar JSON en Swagger
- `toonOnly`: Solo mostrar TOON en Swagger

### 2. **Nuevos Endpoints de Ejemplo**

Se agregaron 2 nuevos endpoints en `example.controller.ts`:

1. **`/api/dual-format`** - Demuestra `@ApiDualResponse`
   - Muestra ambos media types
   - Ejemplo con datos de usuario

2. **`/api/toon-only-dual`** - Demuestra `@ApiDualResponse` con `toonOnly: true`
   - Solo muestra TOON en Swagger
   - Header forzado a `application/toon`

### 3. **Estructura de Archivos**

```
lib/
├── decorators/
│   ├── api-toon-response.decorator.ts  ← Mejorado
│   └── api-dual-response.decorator.ts  ← Nuevo
└── index.ts  ← Actualizado con exports
```

### 4. **Documentación Actualizada**

- **README.md**: Sección completa sobre integración Swagger
- Ejemplos de uso de cada decorador
- Explicación de media types
- API reference completa

## 🎯 Resultados en Swagger

### Antes (sin media types explícitos)
```
Responses:
  200 - Success
    application/json: { ... }
```

### Ahora (con media types explícitos y formato TOON real)
```
Responses:
  200 - Respuesta exitosa - Formato JSON
    application/json: {
      "id": 123,
      "name": "John Doe",
      "email": "john@example.com"
    }
  
  200 - Respuesta exitosa - Formato TOON
    application/toon:
      id: 123
      name: John Doe
      email: john@example.com
```

**Nota:** El formato TOON ahora usa la especificación oficial, no "TOON::" + JSON mayúsculas.

## 🚀 Endpoints Disponibles (6 total)

1. **`GET /api/toon-method`** - Interceptor a nivel método
2. **`GET /api/toon-custom`** - Content-Type TOON personalizado
3. **`GET /api/json-only`** - Solo JSON
4. **`GET /api/normal`** - Formato flexible
5. **`GET /api/dual-format`** ⭐ NUEVO - ApiDualResponse dual
6. **`GET /api/toon-only-dual`** ⭐ NUEVO - ApiDualResponse solo TOON

## 📊 Media Types Registrados

Todos los endpoints ahora registran correctamente en Swagger:

- ✅ `application/json` - Con ejemplos JSON
- ✅ `application/toon` - Con ejemplos TOON generados automáticamente

## 🧪 Cómo Probar en Swagger

1. Iniciar la app: `npm run example`
2. Abrir: http://localhost:3000/api/docs
3. Expandir cualquier endpoint
4. Buscar la sección "Responses"
5. Ver múltiples media types (200 JSON y 200 TOON)
6. Hacer clic en "Try it out"
7. En "Accept header", elegir:
   - `application/json` para respuesta JSON
   - `application/toon` para respuesta TOON

## 💡 Ventajas

✅ **Claridad**: Swagger muestra claramente ambos formatos disponibles  
✅ **Ejemplos automáticos**: No hay que escribir el ejemplo TOON manualmente  
✅ **Flexibilidad**: Tres decoradores para diferentes necesidades  
✅ **Documentación completa**: Los consumidores de la API ven todas las opciones  
✅ **Type-safe**: Todo tipado con TypeScript  

## 🔄 Migración

Si ya usabas `@ApiToonResponse` antiguo, no necesitas cambiar nada.
El decorador mejorado es **retrocompatible** y ahora genera mejores docs automáticamente.

Para aprovechar las nuevas features:

```typescript
// Antes
@ApiToonResponse('Descripción')

// Ahora (con ejemplo personalizado)
@ApiToonResponse('Descripción', { 
  id: 1, 
  name: 'Example' 
})

// O usar el decorador avanzado
@ApiDualResponse({
  description: 'Descripción',
  jsonExample: { id: 1, name: 'Example' }
})
```
