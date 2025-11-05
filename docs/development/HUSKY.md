# 🪝 Git Hooks con Husky

Este proyecto usa **Husky** para ejecutar validaciones automáticas antes de commit y push.

---

## 🎯 Hooks Configurados

### 1. **Pre-commit** (antes de cada commit)
```bash
✅ TypeScript type checking
✅ Build del proyecto
```

**Se ejecuta automáticamente cuando haces:**
```bash
git commit -m "mensaje"
```

Si hay errores de tipos o el build falla, el commit será rechazado.

---

### 2. **Pre-push** (antes de cada push)
```bash
✅ Build del proyecto
✅ Tests de formato TOON (npm run test:toon)
```

**Se ejecuta automáticamente cuando haces:**
```bash
git push
```

Si el build o los tests fallan, el push será rechazado.

---

## 📦 Instalación

Husky se configura automáticamente al instalar las dependencias:

```bash
npm install
```

El script `prepare` en `package.json` se encarga de inicializar husky:
```json
{
  "scripts": {
    "prepare": "husky"
  }
}
```

---

## 🚀 Uso

### Workflow Normal

1. **Hacer cambios en el código**
2. **Agregar archivos:**
   ```bash
   git add .
   ```

3. **Commit** (ejecuta pre-commit hook):
   ```bash
   git commit -m "feat: nueva funcionalidad"
   ```
   
   Se ejecuta automáticamente:
   - ✅ TypeScript build
   
   Si pasa → commit exitoso ✅
   Si falla → commit rechazado ❌

4. **Push** (ejecuta pre-push hook):
   ```bash
   git push origin main
   ```
   
   Se ejecuta automáticamente:
   - ✅ Build completo
   - ✅ Tests TOON
   
   Si todo pasa → push exitoso ✅
   Si algo falla → push rechazado ❌

---

## ⚠️ Bypass (Solo en emergencias)

### Saltar pre-commit:
```bash
git commit -m "mensaje" --no-verify
```

### Saltar pre-push:
```bash
git push --no-verify
```

**⚠️ NO RECOMENDADO:** Solo usa esto en casos de emergencia. Las validaciones están para prevenir bugs.

---

## 🔧 Personalizar Hooks

### Editar pre-commit:
```bash
nano .husky/pre-commit
```

### Editar pre-push:
```bash
nano .husky/pre-push
```

### Agregar nuevo hook:
```bash
echo "#!/usr/bin/env sh" > .husky/commit-msg
echo ". \"\$(dirname -- \"\$0\")/_/husky.sh\"" >> .husky/commit-msg
echo "" >> .husky/commit-msg
echo "# Tu script aquí" >> .husky/commit-msg
chmod +x .husky/commit-msg
```

---

## 📋 Scripts Disponibles

Los hooks usan estos scripts de `package.json`:

```json
{
  "scripts": {
    "build": "tsc",                              // TypeScript compilation
    "test:toon": "ts-node examples/test-toon.ts" // TOON format tests
  }
}
```

---

## 🧪 Probar Hooks Manualmente

### Pre-commit:
```bash
.husky/pre-commit
```

### Pre-push:
```bash
.husky/pre-push
```

---

## 🐛 Troubleshooting

### Hook no se ejecuta:

1. **Verificar permisos:**
   ```bash
   chmod +x .husky/pre-commit
   chmod +x .husky/pre-push
   ```

2. **Reinstalar husky:**
   ```bash
   rm -rf .husky
   npm run prepare
   ```

3. **Verificar git hooks:**
   ```bash
   ls -la .git/hooks/
   ```

### Build falla en el hook:

```bash
# Ejecutar manualmente para ver el error
npm run build
```

### Tests fallan en el hook:

```bash
# Ejecutar manualmente
npm run test:toon
```

---

## 📚 Más Información

- [Husky Docs](https://typicode.github.io/husky/)
- [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

---

## ✅ Beneficios

1. **🛡️ Prevención de errores:** No pusheas código roto
2. **🚀 Automatización:** No olvidas correr tests
3. **📦 Calidad:** Build y tests siempre pasan
4. **👥 Equipo:** Todos siguen las mismas reglas
5. **⚡ CI/CD:** Menos fallos en pipelines

---

**¡Los hooks están listos! Ahora cada commit y push será validado automáticamente.** 🎉
