# Solución de Problemas - SARA App

## Error: `java.lang.String cannot be cast to java.lang.Boolean`

Este es un error común en React Native Android cuando hay incompatibilidad de tipos en las props.

### Solución 1: Limpiar Cache Completamente

```bash
# Detener cualquier servidor en ejecución
# Ctrl+C en la terminal donde corre Expo

# Limpiar cache de Expo
npx expo start --clear

# O limpiar todo
rm -rf node_modules/.cache .expo
npm start -- --reset-cache
```

### Solución 2: Verificar App.json

Asegúrate que `app.json` no tenga valores string donde deberían ser booleanos:

```json
{
  "expo": {
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    }
  }
}
```

### Solución 3: Reinstalar Dependencias

```bash
# Borrar node_modules
rm -rf node_modules

# Limpiar cache de npm
npm cache clean --force

# Reinstalar
npm install

# Iniciar de nuevo
npx expo start --clear
```

### Solución 4: Si el error persiste

El error puede venir de:

1. **Props Boolean como String**: Verifica que no uses `disabled="false"` sino `disabled={false}`
2. **StyleSheet con undefined**: Asegúrate que todas las propiedades de estilo tengan valores
3. **Version de React Native**: Este proyecto usa React Native 0.81.5

### Solución 5: Usar iOS o Web temporalmente

Mientras se soluciona el problema de Android:

```bash
# Probar en iOS (requiere Mac)
npm run ios

# Probar en Web
npm run web
# Luego instala las dependencias web si no las tienes:
npx expo install react-dom react-native-web
```

### Solución 6: Verificar que el problema no sea de las propiedades eliminadas

Hemos eliminado la propiedad `gap` que causaba problemas. Si sigues viendo el error:

1. Verifica que ningún archivo tenga `gap:` en los estilos
2. Busca: `grep -r "gap:" screens/ components/`

### Contacto

Si el problema persiste, revisa:
- Versión de Expo: `npx expo --version`
- Versión de Node: `node --version`
- Versión de npm: `npm --version`

Versiones recomendadas:
- Node: 18.x o superior
- npm: 9.x o superior
- Expo: 54.x
