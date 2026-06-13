# Comandos Útiles - @soyerno/nestjs-toon

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Verificar formato TOON
npm run test:toon

# Ejecutar ejemplos
npm run example
```

## 🧪 Probar los Endpoints

### 1. Iniciar servidor
```bash
npm run example
```

El servidor estará disponible en:
- API: http://localhost:3000
- Swagger: http://localhost:3000/api/docs

### 2. Probar endpoints con curl

#### Endpoint: `/api/normal`
```bash
# Respuesta JSON
curl http://localhost:3000/api/normal

# Respuesta TOON
curl http://localhost:3000/api/normal -H "Accept: application/toon"
```

#### Endpoint: `/api/dual-format`
```bash
# JSON
curl http://localhost:3000/api/dual-format

# TOON
curl http://localhost:3000/api/dual-format -H "Accept: application/toon"
```

#### Endpoint: `/api/toon-method`
```bash
# JSON
curl http://localhost:3000/api/toon-method

# TOON
curl http://localhost:3000/api/toon-method -H "Accept: application/toon"
```

#### Endpoint: `/api/json-only`
```bash
# Solo JSON (ignora Accept header)
curl http://localhost:3000/api/json-only -H "Accept: application/toon"
```

### 3. Comparar formatos

```bash
# Guardar respuestas
curl http://localhost:3000/api/normal > response.json
curl http://localhost:3000/api/normal -H "Accept: application/toon" > response.toon

# Ver diferencias
cat response.json
cat response.toon
```

## 📊 Verificar Swagger

```bash
# Abrir Swagger en el navegador
open http://localhost:3000/api/docs

# O con curl
curl http://localhost:3000/api/docs
```

En Swagger podrás:
1. Ver ejemplos de ambos formatos (JSON y TOON)
2. Probar endpoints con diferentes Accept headers
3. Ver la documentación de los media types

## 🔧 Desarrollo

### Compilar la librería
```bash
# Una vez
npm run build

# Modo watch
npm run dev
```

### Estructura de archivos compilados
```bash
# Ver archivos compilados
ls -la dist/
```

## 🧪 Tests de Formato TOON

```bash
# Test completo de formato
npm run test:toon
```

Esto mostrará:
- Objeto simple
- Array de objetos (sweet spot)
- Con tabs (más eficiente)
- Con length marker
- Ejemplo del README

## 📦 Uso como Librería

### 1. Instalar en tu proyecto
```bash
npm install @soyerno/nestjs-toon
```

### 2. Importar y usar
```typescript
import { ToonInterceptor, toToonFormat } from '@soyerno/nestjs-toon';

// Usar función directamente
const toonData = toToonFormat({ message: 'Hello' });

// Aplicar interceptor
app.useGlobalInterceptors(new ToonInterceptor());
```

## 📝 Documentación

### Ver documentación local
```bash
# README principal
cat README.md

# Guía de uso rápido
cat USAGE.md

# Formato TOON completo
cat TOON_FORMAT.md

# Features de Swagger
cat SWAGGER_FEATURES.md

# Resumen de correcciones
cat CORRECTION_SUMMARY.md
```

### Abrir en editor
```bash
# Con VS Code
code README.md
code TOON_FORMAT.md

# Con vim
vim README.md
```

## 🎯 Ejemplos de Uso

### Ejemplo 1: Test rápido con httpie
```bash
# Instalar httpie (si no lo tienes)
brew install httpie

# Probar endpoint
http GET localhost:3000/api/normal Accept:application/toon
```

### Ejemplo 2: Test con Postman
1. Importar colección desde Swagger
2. Agregar header `Accept: application/toon`
3. Ejecutar requests

### Ejemplo 3: Script de prueba
```bash
#!/bin/bash

echo "=== Testing TOON API ==="
echo ""

echo "1. JSON Response:"
curl -s http://localhost:3000/api/normal
echo ""
echo ""

echo "2. TOON Response:"
curl -s http://localhost:3000/api/normal -H "Accept: application/toon"
echo ""
echo ""

echo "3. Dual Format Example:"
curl -s http://localhost:3000/api/dual-format -H "Accept: application/toon"
echo ""
```

Guardar como `test-api.sh` y ejecutar:
```bash
chmod +x test-api.sh
./test-api.sh
```

## 🐛 Debug

### Ver logs del servidor
```bash
# Ejecutar con logs detallados
DEBUG=* npm run example
```

### Verificar tipos TypeScript
```bash
# Compilar sin ejecutar
npx tsc --noEmit
```

### Limpiar y reinstalar
```bash
# Limpiar
rm -rf node_modules dist

# Reinstalar
npm install

# Recompilar
npm run build
```

## 🔍 Análisis de Tokens

### Comparar tokens entre formatos
```typescript
// Crear archivo compare-tokens.ts
import { toToonFormat } from './lib/utils/toon-format.util';

const data = {
  users: [
    { id: 1, name: 'Alice', role: 'admin' },
    { id: 2, name: 'Bob', role: 'user' },
    { id: 3, name: 'Charlie', role: 'user' }
  ]
};

const jsonStr = JSON.stringify(data);
const toonStr = toToonFormat(data);

console.log('JSON length:', jsonStr.length);
console.log('TOON length:', toonStr.length);
console.log('Savings:', Math.round((1 - toonStr.length / jsonStr.length) * 100) + '%');
```

Ejecutar:
```bash
npx ts-node compare-tokens.ts
```

## 📚 Recursos Externos

```bash
# Clonar repo oficial TOON
git clone https://github.com/toon-format/toon.git

# Ver spec
curl https://raw.githubusercontent.com/toon-format/spec/main/SPEC.md

# Playground online
open https://www.curiouslychase.com/playground/format-tokenization-exploration
```

## ✅ Checklist de Verificación

Antes de usar en producción:

- [ ] Tests de formato TOON pasan: `npm run test:toon`
- [ ] Ejemplos funcionan: `npm run example`
- [ ] Swagger muestra formatos correctos: http://localhost:3000/api/docs
- [ ] Headers Accept funcionan correctamente
- [ ] Respuestas JSON normales sin interceptor
- [ ] Respuestas TOON con `Accept: application/toon`
- [ ] Documentación revisada y actualizada
