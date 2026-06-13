🚀 *@soyerno/nestjs-toon*

Hola equipo! Les presento una nueva librería para compartir herramientas y optimizar nuestras APIs NestJS.

*¿Qué es?*
La primera funcionalidad de la librería es una herramienta que transforma automáticamente las respuestas de API al formato TOON (Token-Oriented Object Notation), optimizado para LLMs con un ahorro del 30-60% en tokens vs JSON tradicional, lo cual va a acelerar el procesamiento y bajar los costos/consumos de tokens.

*Características principales:*
✅ `ToonInterceptor` - Transformación automática según header `Accept: application/toon`
✅ Integración completa con Swagger/OpenAPI
✅ Decoradores: `@ApiToonResponse`, `@ApiDualResponse`
✅ TypeScript strict mode completo
✅ 97.82% test coverage (33 tests)

*Ejemplo de uso:*
```typescript
// En main.ts
app.useGlobalInterceptors(new ToonInterceptor());

// Request normal → JSON
GET /api/users
→ [{"id":1,"name":"Alice","role":"admin"}]

// Request TOON → 60% menos tokens
GET /api/users -H "Accept: application/toon"
→ users[1]{id,name,role}:
  1,Alice,admin
```

*Calidad del código:*
• 🧪 Jest configurado con excelente cobertura
• 🎨 ESLint + Prettier
• 📝 TypeScript strict mode
• ✅ Score: 8.5/10 (production-ready)
• 📦 Listo para publicar a npm

*Instalación:*
```bash
npm install @soyerno/nestjs-toon
```

*Documentación completa:*
📖 Ver README en el repositorio

*Beneficios para el equipo:*
🔹 Reducción significativa de costos en APIs que trabajan con LLMs
🔹 Sin cambios en código existente - solo agregar interceptor
🔹 Compatible con toda nuestra stack actual (NestJS 10+)
🔹 Ejemplos funcionales incluidos

¿Preguntas? ¡Estoy disponible para explicar más detalles! 👋

#nestjs #llm #optimization #api #typescript
