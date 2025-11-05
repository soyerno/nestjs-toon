# ✅ Checklist de Verificación - @modo/api-tools

Verifica que todo funciona correctamente antes de usar en producción.

---

## 📋 Pre-requisitos

- [ ] Node.js 18+ instalado
- [ ] npm instalado
- [ ] Dependencias instaladas (`npm install`)

---

## 🧪 Tests Funcionales

### 1. Test de Formato TOON
```bash
npm run test:toon
```

**✅ Debe mostrar:**
```
users[2]{id,name,role}:
  1,Alice,admin
  2,Bob,user
```

- [ ] Test ejecuta sin errores
- [ ] Output muestra formato tabular correcto
- [ ] Tabs funcionan correctamente
- [ ] Length marker funciona

---

### 2. Compilación TypeScript
```bash
npm run build
```

**✅ Debe:**
- [ ] Compilar sin errores de tipo
- [ ] Generar carpeta `dist/`
- [ ] Crear archivos `.d.ts` (tipos)
- [ ] Crear archivos `.js` (compilados)

---

### 3. Ejemplos de Servidor
```bash
npm run example
```

**✅ Debe:**
- [ ] Iniciar servidor en puerto 3000
- [ ] Mostrar mensaje "Aplicación iniciada"
- [ ] Swagger disponible en http://localhost:3000/api/docs
- [ ] Sin errores en consola

---

## 🌐 Tests de API

### 4. Endpoint JSON Normal
```bash
curl http://localhost:3000/api/normal
```

**✅ Debe retornar:**
```json
{
  "message": "Hello World",
  "version": "1.0.0",
  "features": ["toon-format", "interceptors", "swagger"]
}
```

- [ ] Respuesta es JSON válido
- [ ] Content-Type: `application/json`
- [ ] Datos correctos

---

### 5. Endpoint TOON
```bash
curl http://localhost:3000/api/normal -H "Accept: application/toon"
```

**✅ Debe retornar:**
```
message: Hello World
version: 1.0.0
features[3]: toon-format,interceptors,swagger
```

- [ ] Respuesta es TOON válido
- [ ] Content-Type: `application/toon`
- [ ] Formato tabular correcto
- [ ] NO es "TOON::" + JSON mayúsculas

---

### 6. Todos los Endpoints

Verifica que todos los endpoints responden:

```bash
# 1. Normal (dual)
curl http://localhost:3000/api/normal
curl http://localhost:3000/api/normal -H "Accept: application/toon"

# 2. Toon method
curl http://localhost:3000/api/toon-method
curl http://localhost:3000/api/toon-method -H "Accept: application/toon"

# 3. Toon custom
curl http://localhost:3000/api/toon-custom

# 4. JSON only
curl http://localhost:3000/api/json-only

# 5. Dual format
curl http://localhost:3000/api/dual-format
curl http://localhost:3000/api/dual-format -H "Accept: application/toon"

# 6. Toon only dual
curl http://localhost:3000/api/toon-only-dual
```

- [ ] Todos responden 200 OK
- [ ] Formatos correctos según endpoint
- [ ] Headers Accept respetados

---

## 📖 Tests de Swagger

### 7. Swagger UI
Abre: http://localhost:3000/api/docs

**✅ Debe mostrar:**
- [ ] Swagger UI carga correctamente
- [ ] 6 endpoints visibles
- [ ] Tag "examples" presente
- [ ] Cada endpoint tiene descripción

---

### 8. Media Types en Swagger

Para cada endpoint, verifica en Swagger:

**Endpoints duales (normal, toon-method, dual-format):**
- [ ] Muestra "Responses" section
- [ ] Response 200 con `application/json`
- [ ] Response 200 con `application/toon`
- [ ] Ejemplos JSON correctos
- [ ] Ejemplos TOON correctos (formato tabular)

**Endpoint json-only:**
- [ ] Solo muestra `application/json`
- [ ] No muestra `application/toon`

**Endpoint toon-custom y toon-only-dual:**
- [ ] Muestra `application/toon`
- [ ] Ejemplo TOON correcto

---

### 9. Probar desde Swagger

En Swagger UI:

1. **Endpoint `/api/normal`:**
   - [ ] Click "Try it out"
   - [ ] Agregar header `Accept: application/json`
   - [ ] Ejecutar → Respuesta JSON
   - [ ] Cambiar a `Accept: application/toon`
   - [ ] Ejecutar → Respuesta TOON

2. **Endpoint `/api/dual-format`:**
   - [ ] Click "Try it out"
   - [ ] Sin headers → Respuesta JSON
   - [ ] Con `Accept: application/toon` → Respuesta TOON

---

## 📚 Tests de Documentación

### 10. Archivos de Documentación

Verifica que existen:

- [ ] `README.md`
- [ ] `START_HERE.md`
- [ ] `SUMMARY.md`
- [ ] `TOON_FORMAT.md`
- [ ] `USAGE.md`
- [ ] `SWAGGER_FEATURES.md`
- [ ] `CORRECTION_SUMMARY.md`
- [ ] `COMMANDS.md`
- [ ] `DOCS_INDEX.md`

---

### 11. Enlaces Funcionan

Abre `README.md` y verifica:

- [ ] Enlace a `START_HERE.md` funciona
- [ ] Enlace a `SUMMARY.md` funciona
- [ ] Enlace a `DOCS_INDEX.md` funciona
- [ ] Enlace a spec TOON (externo) funciona

---

## 🔧 Tests de Código

### 12. Estructura de Archivos

Verifica que existen:

```
lib/
├── interceptors/
│   └── toon.interceptor.ts         [ ]
├── decorators/
│   ├── api-toon-response.decorator.ts  [ ]
│   └── api-dual-response.decorator.ts  [ ]
├── utils/
│   └── toon-format.util.ts         [ ]
└── index.ts                        [ ]

examples/
├── main.ts                         [ ]
├── app.module.ts                   [ ]
├── example.controller.ts           [ ]
└── test-toon.ts                    [ ]
```

---

### 13. Exports Públicos

Verifica que se pueden importar:

```typescript
import {
  ToonInterceptor,
  toToonFormat,
  ApiToonResponse,
  ApiJsonResponse,
  ApiDualResponse
} from '@modo/api-tools';
```

- [ ] Todos los imports funcionan
- [ ] No hay errores de tipos
- [ ] Autocomplete funciona en IDE

---

## 📦 Tests de Package

### 14. package.json

Verifica:

- [ ] `name`: `@modo/api-tools`
- [ ] `version`: `1.0.0`
- [ ] `main`: `dist/index.js`
- [ ] `types`: `dist/index.d.ts`
- [ ] Scripts definidos: `build`, `dev`, `example`, `test:toon`
- [ ] Dependencia `@toon-format/toon` presente

---

### 15. Scripts npm

Todos deben ejecutar sin errores:

```bash
npm run build       # [ ] OK
npm run dev         # [ ] OK (modo watch)
npm run example     # [ ] OK (inicia servidor)
npm run test:toon   # [ ] OK (muestra tests)
```

---

## 🎯 Tests de Formato TOON

### 16. Formato TOON Correcto

**❌ NO debe ser:**
```
TOON::{"MESSAGE":"HELLO WORLD"}
```

**✅ DEBE ser:**
```
message: Hello World
```

Para arrays:
**✅ DEBE ser formato tabular:**
```
users[2]{id,name,role}:
  1,Alice,admin
  2,Bob,user
```

- [ ] No tiene prefijo "TOON::"
- [ ] No está en mayúsculas
- [ ] Arrays usan formato tabular
- [ ] Headers incluyen longitud `[N]`
- [ ] Headers incluyen campos `{key1,key2}`

---

### 17. Opciones TOON

Verifica que funcionan:

```typescript
// Comma (default)
toToonFormat(data)
// users[2]{id,name}:
//   1,Alice
//   2,Bob
```
- [ ] ✅ Comma funciona

```typescript
// Tab
toToonFormat(data, { delimiter: '\t' })
// users[2	]{id	name}:
//   1	Alice
//   2	Bob
```
- [ ] ✅ Tab funciona

```typescript
// Length marker
toToonFormat(data, { lengthMarker: '#' })
// users[#2]{id,name}:
//   1,Alice
//   2,Bob
```
- [ ] ✅ Length marker funciona

---

## 🚀 Tests de Producción

### 18. Build para Producción

```bash
npm run build
```

Verifica `dist/`:
- [ ] `index.js` existe
- [ ] `index.d.ts` existe
- [ ] `interceptors/` compilado
- [ ] `decorators/` compilado
- [ ] `utils/` compilado
- [ ] No hay archivos `.ts` (solo `.js` y `.d.ts`)

---

### 19. Integración en Otro Proyecto

Crea un proyecto test:

```bash
mkdir test-integration
cd test-integration
npm init -y
npm install ../modo-llms-api-tools
```

```typescript
// test.ts
import { toToonFormat } from '@modo/api-tools';

console.log(toToonFormat({ message: 'Test' }));
```

- [ ] Import funciona
- [ ] Tipos disponibles
- [ ] Ejecuta correctamente

---

## ✅ Checklist Final

### Funcionalidad Core
- [ ] Interceptor detecta Accept header
- [ ] Conversión TOON funciona
- [ ] Formato TOON es correcto (spec oficial)
- [ ] Swagger muestra ambos formatos

### Código
- [ ] TypeScript compila sin errores
- [ ] Todos los exports funcionan
- [ ] Ejemplos ejecutan

### Documentación
- [ ] 9 archivos de docs presentes
- [ ] Enlaces funcionan
- [ ] Ejemplos son correctos

### Tests
- [ ] Test suite ejecuta
- [ ] Todos los endpoints responden
- [ ] Formatos son correctos

### Package
- [ ] package.json correcto
- [ ] Scripts funcionan
- [ ] Dependencias instaladas

---

## 🎯 Resultado Esperado

### ✅ TODO VERDE = PRODUCTION READY

Si todos los checkboxes están marcados:

**🎉 ¡Tu librería está lista para producción!**

Puedes:
- Publicar a npm
- Usar en tus proyectos NestJS
- Compartir con el equipo

---

### ⚠️ ALGÚN ROJO = REVISAR

Si algo falla:

1. Ver `CORRECTION_SUMMARY.md` para entender cambios
2. Ver `COMMANDS.md` para comandos de debug
3. Ver `TOON_FORMAT.md` para entender TOON
4. Ejecutar `npm install` de nuevo

---

## 📞 Ayuda

Si algo no funciona:

1. **Ver logs:** `npm run example` muestra errores
2. **Reinstalar:** `rm -rf node_modules && npm install`
3. **Recompilar:** `npm run build`
4. **Ver docs:** `DOCS_INDEX.md` tiene toda la info

---

**¡Marca todos los checkboxes y estarás listo! ✅**
