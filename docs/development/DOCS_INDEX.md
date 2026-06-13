# 📚 Índice de Documentación - @soyerno/nestjs-toon

Guía de navegación por toda la documentación del proyecto.

---

## 🚀 Inicio Rápido

**¿Primera vez con el proyecto?** Empieza aquí:

1. 📘 **[SUMMARY.md](./SUMMARY.md)** - Resumen ejecutivo completo
2. 📖 **[README.md](./README.md)** - Documentación principal
3. ⚡ **[USAGE.md](./USAGE.md)** - Guía de uso rápido (5 min)

---

## 📖 Documentación Principal

### Para Usuarios

| Documento | Descripción | Para quién |
|-----------|-------------|------------|
| **[README.md](./README.md)** | Guía completa de instalación, uso y API | Todos |
| **[USAGE.md](./USAGE.md)** | Guía de inicio rápido | Nuevos usuarios |
| **[COMMANDS.md](./COMMANDS.md)** | Comandos útiles para desarrollo | Desarrolladores |
| **[HUSKY.md](./HUSKY.md)** | Configuración de Git Hooks | Contribuidores |

### Para Entender TOON

| Documento | Descripción | Para quién |
|-----------|-------------|------------|
| **[TOON_FORMAT.md](./TOON_FORMAT.md)** | Guía completa del formato TOON | Usuarios avanzados |
| **[Spec oficial TOON ↗](https://github.com/toon-format/toon)** | Especificación oficial v1.3 | Referencia técnica |

### Features y Correcciones

| Documento | Descripción | Para quién |
|-----------|-------------|------------|
| **[SWAGGER_FEATURES.md](./SWAGGER_FEATURES.md)** | Features de Swagger y media types | Integración Swagger |
| **[CORRECTION_SUMMARY.md](./CORRECTION_SUMMARY.md)** | Correcciones del formato TOON | Changelog técnico |
| **[SUMMARY.md](./SUMMARY.md)** | Resumen ejecutivo del proyecto | Overview general |

---

## 🎯 Por Objetivo

### Quiero instalar y usar la librería
1. [README.md - Instalación](./README.md#-instalación)
2. [README.md - Uso](./README.md#-uso)
3. [USAGE.md - Inicio rápido](./USAGE.md)

### Quiero entender el formato TOON
1. [TOON_FORMAT.md](./TOON_FORMAT.md)
2. [README.md - Formato TOON](./README.md#-formato-toon)
3. [Spec oficial ↗](https://github.com/toon-format/toon)

### Quiero integrar con Swagger
1. [README.md - Integración Swagger](./README.md#-integración-con-swagger)
2. [SWAGGER_FEATURES.md](./SWAGGER_FEATURES.md)
3. [README.md - API Decoradores](./README.md#-api)

### Quiero desarrollar/contribuir
1. [COMMANDS.md](./COMMANDS.md)
2. [README.md - Estructura del Proyecto](./README.md#-estructura-del-proyecto)
3. [SUMMARY.md - Verificación de Calidad](./SUMMARY.md#-verificación-de-calidad)

### Quiero ver ejemplos
1. [examples/test-toon.ts](./examples/test-toon.ts) - Tests de formato
2. [examples/example.controller.ts](./examples/example.controller.ts) - 6 endpoints
3. [examples/main.ts](./examples/main.ts) - App completa
4. [USAGE.md - Ejemplos de respuesta](./USAGE.md#-ejemplos-de-respuesta)

---

## 📁 Estructura de Archivos

```
nestjs-toon/
│
├── 📘 SUMMARY.md                    ← Resumen ejecutivo (EMPIEZA AQUÍ)
├── 📖 README.md                     ← Documentación principal
├── ⚡ USAGE.md                      ← Guía rápido (5 min)
├── 🎯 TOON_FORMAT.md                ← Guía completa TOON
├── 🔧 COMMANDS.md                   ← Comandos útiles
├── ✨ SWAGGER_FEATURES.md           ← Features Swagger
├── 📝 CORRECTION_SUMMARY.md         ← Correcciones implementadas
│
├── lib/                             ← Código fuente librería
│   ├── interceptors/
│   │   └── toon.interceptor.ts
│   ├── decorators/
│   │   ├── api-toon-response.decorator.ts
│   │   └── api-dual-response.decorator.ts
│   ├── utils/
│   │   └── toon-format.util.ts
│   └── index.ts
│
├── examples/                        ← Ejemplos de uso
│   ├── main.ts                      ← App NestJS completa
│   ├── app.module.ts
│   ├── example.controller.ts        ← 6 endpoints ejemplo
│   └── test-toon.ts                 ← Tests de formato
│
├── package.json                     ← Config npm
└── tsconfig.json                    ← Config TypeScript
```

---

## 🔍 Búsqueda Rápida

### Por Tema

**Instalación**
- [README.md - Instalación](./README.md#-instalación)

**Formato TOON**
- [TOON_FORMAT.md](./TOON_FORMAT.md)
- [README.md - Formato TOON](./README.md#-formato-toon)

**Interceptor**
- [README.md - Uso del Interceptor](./README.md#-uso)
- [lib/interceptors/toon.interceptor.ts](./lib/interceptors/toon.interceptor.ts)

**Swagger**
- [SWAGGER_FEATURES.md](./SWAGGER_FEATURES.md)
- [README.md - Integración Swagger](./README.md#-integración-con-swagger)

**API Reference**
- [README.md - API](./README.md#-api)
- [lib/index.ts](./lib/index.ts) - Exports públicos

**Ejemplos**
- [examples/](./examples/)
- [USAGE.md - Ejemplos](./USAGE.md#-ejemplos-de-respuesta)

**Tests**
- [examples/test-toon.ts](./examples/test-toon.ts)
- [COMMANDS.md - Tests](./COMMANDS.md#-tests-de-formato-toon)

---

## 💡 Flujos de Lectura Recomendados

### Para Nuevos Usuarios
```
1. SUMMARY.md          (5 min)  - Overview del proyecto
2. README.md           (10 min) - Instalación y uso básico
3. USAGE.md            (5 min)  - Guía práctica
4. npm run example     (-)      - Ver funcionando
```

### Para Usuarios Avanzados
```
1. TOON_FORMAT.md      (15 min) - Entender TOON profundamente
2. SWAGGER_FEATURES.md (10 min) - Features Swagger
3. README.md - API     (10 min) - API completa
4. examples/           (-)      - Ver código
```

### Para Desarrolladores/Contribuidores
```
1. COMMANDS.md         (10 min) - Comandos desarrollo
2. lib/                (-)      - Código fuente
3. examples/           (-)      - Ejemplos
4. CORRECTION_SUMMARY  (5 min)  - Cambios implementados
```

### Para Integración en Proyecto
```
1. README.md - Instalación
2. README.md - Uso
3. README.md - Integración Swagger
4. README.md - API
```

---

## 🔗 Enlaces Externos

### TOON Format
- 📋 [Especificación oficial](https://github.com/toon-format/toon)
- 📦 [npm package](https://www.npmjs.com/package/@toon-format/toon)
- 🎮 [Playground interactivo](https://www.curiouslychase.com/playground/format-tokenization-exploration)
- 🧪 [Tests de conformidad](https://github.com/toon-format/spec/tree/main/tests)

### NestJS
- 📖 [Documentación NestJS](https://docs.nestjs.com/)
- 🔌 [Interceptors en NestJS](https://docs.nestjs.com/interceptors)
- 📝 [Swagger en NestJS](https://docs.nestjs.com/openapi/introduction)

---

## 📞 Ayuda Rápida

| Pregunta | Documento |
|----------|-----------|
| ¿Cómo instalo esto? | [README.md - Instalación](./README.md#-instalación) |
| ¿Cómo funciona TOON? | [TOON_FORMAT.md](./TOON_FORMAT.md) |
| ¿Cómo lo uso en NestJS? | [README.md - Uso](./README.md#-uso) |
| ¿Cómo lo integro con Swagger? | [SWAGGER_FEATURES.md](./SWAGGER_FEATURES.md) |
| ¿Qué comandos puedo usar? | [COMMANDS.md](./COMMANDS.md) |
| ¿Hay ejemplos? | [examples/](./examples/) o [USAGE.md](./USAGE.md) |
| ¿Qué se corrigió? | [CORRECTION_SUMMARY.md](./CORRECTION_SUMMARY.md) |
| ¿Resumen del proyecto? | [SUMMARY.md](./SUMMARY.md) |

---

## ✅ Checklist de Lectura

Marca lo que has leído:

**Esenciales**
- [ ] SUMMARY.md - Resumen ejecutivo
- [ ] README.md - Documentación principal
- [ ] USAGE.md - Guía rápida

**Formato TOON**
- [ ] TOON_FORMAT.md - Guía completa
- [ ] Spec oficial en GitHub

**Swagger**
- [ ] SWAGGER_FEATURES.md - Features

**Desarrollo**
- [ ] COMMANDS.md - Comandos útiles
- [ ] examples/ - Ver código

**Changelog**
- [ ] CORRECTION_SUMMARY.md - Correcciones

---

## 🎯 Siguiente Paso

Según tu objetivo, te recomendamos:

**🆕 Si eres nuevo:**
👉 Empieza con [SUMMARY.md](./SUMMARY.md)

**⚡ Si quieres usar rápido:**
👉 Ve a [USAGE.md](./USAGE.md)

**🧠 Si quieres entender TOON:**
👉 Lee [TOON_FORMAT.md](./TOON_FORMAT.md)

**🔧 Si vas a desarrollar:**
👉 Revisa [COMMANDS.md](./COMMANDS.md)

**📖 Para referencia completa:**
👉 Consulta [README.md](./README.md)

---

**¡Feliz lectura! 📚**
