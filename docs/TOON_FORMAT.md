# Formato TOON - Guía Completa

## ¿Qué es TOON?

**TOON (Token-Oriented Object Notation)** es un formato de serialización compacto y legible diseñado específicamente para optimizar el uso de tokens en Large Language Models (LLMs).

Repositorio oficial: https://github.com/toon-format/toon

## ¿Por qué TOON?

### Problema
Los LLMs cobran por tokens. JSON estándar es verbose y costoso en tokens:

```json
{
  "users": [
    { "id": 1, "name": "Alice", "role": "admin" },
    { "id": 2, "name": "Bob", "role": "user" }
  ]
}
```

### Solución TOON
El mismo contenido con **30-60% menos tokens**:

```
users[2]{id,name,role}:
  1,Alice,admin
  2,Bob,user
```

## Características Principales

✅ **Eficiente en tokens**: 30-60% menos tokens que JSON  
✅ **Validación LLM**: Headers explícitos con longitud y campos  
✅ **Sintaxis mínima**: Elimina llaves, corchetes y comillas redundantes  
✅ **Basado en indentación**: Como YAML, usa espacios  
✅ **Arrays tabulares**: Declara claves una vez, datos en filas  

## Ejemplos de Formato

### Objetos Simples

```javascript
// JSON
{
  "id": 123,
  "name": "Ada",
  "active": true
}

// TOON
id: 123
name: Ada
active: true
```

### Objetos Anidados

```javascript
// JSON
{
  "user": {
    "id": 123,
    "name": "Ada"
  }
}

// TOON
user:
  id: 123
  name: Ada
```

### Arrays Primitivos (Inline)

```javascript
// JSON
{
  "tags": ["admin", "ops", "dev"]
}

// TOON
tags[3]: admin,ops,dev
```

### Arrays de Objetos (Tabular) ⭐

Este es el **sweet spot** de TOON. Arrays de objetos uniformes:

```javascript
// JSON (verbose)
{
  "items": [
    { "sku": "A1", "qty": 2, "price": 9.99 },
    { "sku": "B2", "qty": 1, "price": 14.5 }
  ]
}

// TOON (compacto)
items[2]{sku,qty,price}:
  A1,2,9.99
  B2,1,14.5
```

### Arrays Mixtos

```javascript
// JSON
{
  "items": [
    1,
    { "a": 1 },
    "text"
  ]
}

// TOON
items[3]:
  - 1
  - a: 1
  - text
```

## Opciones de Encoding

### Delimitadores

#### Comma (default)
```
items[2]{sku,name,qty}:
  A1,Widget,2
  B2,Gadget,1
```

#### Tab (más eficiente) ⭐
```
items[2	]{sku	name	qty}:
  A1	Widget	2
  B2	Gadget	1
```

**Ventajas del tab:**
- Un solo carácter
- Tokeniza mejor que comas
- Raro en texto natural (menos quotes)

#### Pipe
```
items[2|]{sku|name|qty}:
  A1|Widget|2
  B2|Gadget|1
```

### Length Marker

Agregar `#` para enfatizar que es un contador:

```javascript
// Sin length marker
tags[3]: reading,gaming,coding

// Con length marker
tags[#3]: reading,gaming,coding
```

## Uso en Esta Librería

### Función toToonFormat

```typescript
import { toToonFormat } from '@modo/api-tools';

const data = {
  users: [
    { id: 1, name: 'Alice', role: 'admin' },
    { id: 2, name: 'Bob', role: 'user' }
  ]
};

// Básico
console.log(toToonFormat(data));
// users[2]{id,name,role}:
//   1,Alice,admin
//   2,Bob,user

// Con tabs (más eficiente)
console.log(toToonFormat(data, { delimiter: '\t' }));
// users[2	]{id	name	role}:
//   1	Alice	admin
//   2	Bob	user

// Con length marker
console.log(toToonFormat(data, { lengthMarker: '#' }));
// users[#2]{id,name,role}:
//   1,Alice,admin
//   2,Bob,user
```

### En el Interceptor

El interceptor automáticamente convierte la respuesta cuando detecta `Accept: application/toon`:

```bash
# Respuesta JSON normal
curl http://localhost:3000/api/data

# Respuesta TOON optimizada
curl http://localhost:3000/api/data -H "Accept: application/toon"
```

## Cuándo Usar TOON

### ✅ Excelente para:

- **Arrays de objetos uniformes** (mismos campos, valores primitivos)
- **Datasets grandes** con estructura consistente
- **Input/output de LLMs** donde los tokens cuestan
- **APIs que sirven modelos de IA**
- **Logs estructurados** para análisis con LLMs

### ⚠️ JSON es mejor para:

- **Datos no uniformes** (objetos con campos variables)
- **Estructuras profundamente anidadas**
- **APIs REST tradicionales** (compatibilidad)
- **Storage/database** (ecosistema establecido)

## Reglas de Quoteo

TOON solo agrega comillas cuando es necesario:

### Strings sin comillas (safe):
- `hello world` (espacios internos OK)
- `hello 👋 world` (Unicode/emoji OK)
- `user_name`, `user.name` (identificadores)

### Strings con comillas (required):
- `""` (string vacío)
- `" padded "` (espacios al inicio/fin)
- `"a,b"` (contiene delimitador activo)
- `"true"`, `"42"` (parece bool/número)
- `"- item"` (parece item de lista)

## Conversión de Tipos

| Tipo | TOON |
|------|------|
| Number finito | Decimal (no científico): `1000000` no `1e6` |
| NaN, ±Infinity | `null` |
| BigInt | Number o string según rango |
| Date | ISO string: `"2025-01-01T00:00:00.000Z"` |
| undefined | `null` |
| function | `null` |
| symbol | `null` |

## Benchmarks (de la spec oficial)

### Eficiencia de Tokens

Usando tokenizer GPT `o200k_base`:

```
⭐ GitHub Repositories (dataset)
   TOON:    8,745 tokens
   vs JSON: 15,145 tokens  (−42.3% ahorro)
   vs YAML: 13,129 tokens  (−33.4% ahorro)

📈 Daily Analytics (dataset)
   TOON:    4,507 tokens
   vs JSON: 10,977 tokens  (−58.9% ahorro)
   vs YAML:  8,810 tokens  (−48.8% ahorro)
```

### Precisión de LLMs

Pruebas con 154 preguntas de recuperación de datos:

```
gpt-5-nano:
  TOON: 96.1% precisión
  JSON: 86.4% precisión

gemini-2.5-flash:
  TOON: 86.4% precisión
  JSON: 76.6% precisión
```

**Conclusión:** TOON logra ~70% precisión vs 65% de JSON, usando 46% menos tokens.

## Recursos

- 📋 [Especificación completa](https://github.com/toon-format/spec)
- 🧪 [Tests de conformidad](https://github.com/toon-format/spec/tree/main/tests)
- 🎮 [Playground interactivo](https://www.curiouslychase.com/playground/format-tokenization-exploration)
- 📦 [Implementación TypeScript oficial](https://github.com/toon-format/toon)

## Implementaciones en Otros Lenguajes

- Python: [toon_format](https://github.com/toon-format/toon-python)
- Rust: [toon_format](https://github.com/toon-format/toon-rust)
- .NET: [ToonSharp](https://github.com/0xZunia/ToonSharp)
- Go: [gotoon](https://github.com/alpkeskin/gotoon)
- Java: [JToon](https://github.com/felipestanzani/JToon)
- Y muchas más...

## Licencia

MIT License © 2025 TOON Format Project
