# The Dailyverse

Ascensor art déco para cinco universos de dailies. React + TypeScript + Vite, sin backend, iframes ni librerías de animación.

## Desarrollo

```sh
npm install
npm run dev
```

## Producción

```sh
npm run build
npm run preview
```

`build` comprueba TypeScript y genera `dist/`. Netlify utiliza `netlify.toml`: comando `npm run build`, directorio `dist` y Node 22. Conecta el repositorio o sube `dist/` a Netlify.

## Destinos y componentes

Edita `src/apps.ts` para configurar los destinos. Cada entrada tiene `id`, `floor`, `name`, `emoji`, `url`, `shortDescription`, `themeColor` y `travelMessage`. Usa identificadores y pisos únicos y URLs HTTPS. Los pisos se ordenan automáticamente de mayor a menor.

`Elevator` coordina `idle → selected → moving → arriving → opening → redirecting`. Los eventos `animationend` encadenan la secuencia de 2,18 segundos; un temporizador de recuperación evita bloqueos si no se emite un evento. Los botones se bloquean inmediatamente. Al finalizar, `window.location.assign` navega en la misma pestaña. Un enlace permite continuar si el navegador impide la redirección.

`FloorPanel` y `FloorButton` presentan los destinos; `FloorIndicator` muestra el piso y `ElevatorDoors` revela `DestinationPreview`. Los estilos y tokens base están en `src/styles.css`. `src/cabin.css` construye la vista inmersiva desde dentro de la cabina: techo iluminado, paredes y pasamanos en perspectiva, suelo y panel grande integrado en el frente. En móvil, el panel pasa a primer plano y se desvanece durante la apertura de las puertas.

Con movimiento reducido la navegación es directa. Los botones funcionan con Tab, Enter y Espacio, tienen foco visible y una región viva anuncia el estado. Volver con el historial restablece el ascensor, también con caché de navegación.

Las tipografías Cormorant Garamond y DM Sans se cargan desde Google Fonts, con alternativas locales Georgia y Arial. El resto del diseño utiliza CSS y no depende de imágenes remotas.

## Comprobación manual

La cabina adapta su altura al contenido. En móvil (hasta 700 px), el panel ocupa el primer plano con filas táctiles de al menos 44 px y sin descripciones secundarias. En pantallas bajas se permite desplazamiento vertical; el copyright conserva espacio propio al final. En tablet y escritorio se mantienen puertas y panel en paralelo. Los estilos base se cargan antes de los de la cabina.

Validación responsive realizada en Chrome con viewports de 320, 360, 390, 430, 640, 700, 701, 768, 820, 1024, 1440 y 1920 px: controles dentro del ancho visible y sin desbordamiento horizontal. También se comprobó la apertura en móvil y la navegación con movimiento reducido, interceptando el destino externo durante la prueba.

- Recorrer los cinco pisos con teclado y ratón: mensaje, indicador, bloqueo, apertura y URL.
- Probar a 320 y 390 px y en escritorio, sin scroll horizontal.
- Activar movimiento reducido y comprobar navegación directa.
- Volver desde un destino y comprobar que se puede elegir otro.
