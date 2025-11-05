# Guía de Uso Rápido - TOON Interceptor

## 🎯 Inicio Rápido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Ejecutar el ejemplo

```bash
npm run example
```

La aplicación estará disponible en:
- API: http://localhost:3000
- Swagger: http://localhost:3000/api/docs

## 🧪 Probar los Endpoints

### Endpoint 1: `/api/normal`
Endpoint normal que responde en JSON o TOON según el header.

```bash
# Respuesta JSON
curl http://localhost:3000/api/normal

# Respuesta TOON
curl http://localhost:3000/api/normal -H "Accept: application/toon"
```

### Endpoint 2: `/api/toon-method`
Interceptor aplicado a nivel de método.

```bash
# JSON
curl http://localhost:3000/api/toon-method

# TOON
curl http://localhost:3000/api/toon-method -H "Accept: application/toon"
```

### Endpoint 3: `/api/toon-custom`
Con Content-Type personalizado.

```bash
curl http://localhost:3000/api/toon-custom
```

## 📊 Ejemplos de Respuesta

### JSON Normal
```json
{
  "message": "Hello World",
  "version": "1.0.0",
  "features": ["toon-format", "interceptors", "swagger"]
}
```

### Formato TOON (Optimizado para LLMs)
```
message: Hello World
version: 1.0.0
features[3]: toon-format,interceptors,swagger
```

**Nota:** TOON reduce el uso de tokens ~30-60% comparado con JSON, ideal para:
- Input/output de LLMs
- Datasets tabulares grandes
- APIs que consumen modelos de IA

## 🔍 Verificar en Swagger

1. Abre http://localhost:3000/api/docs
2. Busca los endpoints de ejemplo
3. Haz clic en "Try it out"
4. En "Request headers" agrega:
   ```
   Accept: application/toon
   ```
5. Ejecuta y observa la respuesta en formato TOON

## 💡 Casos de Uso

### Caso 1: Aplicación Global
Todos los endpoints soportan TOON automáticamente.

```typescript
// main.ts
app.useGlobalInterceptors(new ToonInterceptor());
```

### Caso 2: Endpoints Específicos
Solo ciertos endpoints usan TOON.

```typescript
@Get('special')
@UseInterceptors(ToonInterceptor)
getSpecial() { ... }
```

### Caso 3: Forzar TOON
Siempre devolver en formato TOON.

```typescript
@Get('toon-only')
@Header('Content-Type', 'application/toon')
getToonOnly() { ... }
```

## 🛠️ Desarrollo

### Compilar la librería
```bash
npm run build
```

### Modo desarrollo
```bash
npm run dev
```

## 📝 Notas

- El interceptor verifica el header `Accept`
- Si contiene `application/toon`, transforma la respuesta
- Si no, devuelve JSON normal
- El formato TOON es: `TOON::` + JSON en mayúsculas
- Compatible con Swagger automáticamente
