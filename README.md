# Perfumería de Navidad 🎄💄

Minijuego de compras para **móvil en vertical** (y escritorio), hecho con **HTML5 Canvas** y **JavaScript ES6+**, sin dependencias ni imágenes externas. Es un regalo de Navidad para **Laura**: hay que recorrer una perfumería, encontrar los productos de la lista y llenar la cesta antes de que se acabe el tiempo. Los productos cambian de estantería cada pocos segundos y el juego tiene sonido sintetizado, con botón de silencio.

La idea: doble toque (o doble clic) para coger un producto. Si no estaba en la lista, devuelves a la estantería uno de los que ya tenías. Nada de reiniciar la partida de golpe.

## Archivos

```text
perfumeria-navidad/
├── index.html   · canvas, panel de menús, botón de sonido, aviso de orientación y aria-live
├── styles.css   · panel, zonas seguras, botón de sonido y adaptación a pantallas pequeñas
├── game.js      · catálogo, niveles, lógica, arte vectorial y audio sintetizado
└── README.md
```

No necesita build, bundler, servidor ni conexión. También funciona abriendo `index.html` directamente.

Para probarlo en un móvil de la misma red:

```bash
cd perfumeria-navidad
python -m http.server 8142
# abre http://IP-DEL-ORDENADOR:8142
```

## Cómo se juega

- **Arrastra** el dedo (o el ratón) para recorrer las estanterías. En escritorio también sirven la rueda y las flechas ↑/↓.
- Haz **doble toque** en un producto, o **doble clic** con el ratón, para cogerlo. El primer toque muestra su nombre y lo marca con unas esquinas doradas; el segundo lo mete en la cesta.
- La lista de la compra está arriba. En los dos últimos niveles se oculta sola: pulsa **VER LISTA** para consultarla durante unos segundos (o la tecla `L`).
- **Las estanterías se recolocan**: cada 10–20 segundos los productos cambian de sitio con una animación corta. Durante ese movimiento los toques quedan bloqueados para no coger nada sin querer.
- Si coges un producto que **no** está en la lista:
  - devuelves a la estantería el último producto que habías cogido;
  - aparece el aviso «¡Eso no estaba en la lista!»;
  - la pantalla se agita y se tiñe de rojo (y vibra si el móvil lo permite);
  - tienes **1,3 s de invulnerabilidad** para no encadenar pérdidas;
  - si la cesta estaba vacía, no pierdes nada.
- El tiempo no se detiene mientras consultas la lista. Cuando llega a cero, la tienda cierra: puedes **reintentar el nivel** o volver al inicio.
- Al completar el nivel aparecen las estrellas según el tiempo sobrante. Al superar los cinco niveles, aparece el mensaje navideño personalizado para Laura y el botón **JUGAR OTRA VEZ**.

## Sonido y silencio

Todo el audio se sintetiza en tiempo real con **Web Audio API**; no hay archivos `.mp3` ni `.wav`.

- **Coger un producto:** un pop/burbuja suave que sube de tono con la cesta, más un brillo apenas audible.
- **Equivocarse:** un tono grave y corto, suave, sin pitidos agresivos.
- **Completar un nivel:** un arpegio de campanas dulce y navideño, con un colchón cálido.
- **Victoria final:** una melodía de campanas más larga y tranquila, con acorde final.
- **Extras:** un pequeño tintineo al empezar el nivel, un destello al completar la cesta y un tono bajo y calmado al agotarse el tiempo.

El **AudioContext** se crea y se desbloquea en el primer gesto (puntero, toque, clic o tecla), como exigen los navegadores móviles. Todo pasa por una **ganancia moderada** y un **compresor suave** para que no sature ni con auriculares ni con el altavoz del móvil.

El botón de sonido está en la **esquina superior derecha**, respeta `safe-area-inset-*` y tiene una zona táctil de 44 px. Se puede alternar con la tecla **M**. La preferencia se guarda en `localStorage` con la clave `perfumeria-navidad:muted` y se recupera al volver a abrir el juego.

## Los cinco niveles

| Nivel | Zona | Lista | Distractores | Tiempo | Lista |
|---|---|---|---|---|---|
| 1 | El escaparate | 3 | 4 | 60 s | siempre visible |
| 2 | Pasillo de perfumes | 4 | 6 | 65 s | siempre visible |
| 3 | Rincón de maquillaje | 5 | 8 | 70 s | siempre visible |
| 4 | La trastienda | 5 | 10 | 70 s | se oculta a los 7 s |
| 5 | Nochebuena | 6 | 12 | 75 s | se oculta a los 6 s |

Los productos de la lista se eligen al azar del catálogo; los distractores se eligen del resto (pueden repetirse). La posición de cada producto cambia en cada partida y, además, se recolocan entre estanterías cada 10–20 segundos. La animación dura 0,7 s y los toques se pausan durante el movimiento.

## Personalización rápida

Todo lo importante está al principio de `game.js`, en bloques comentados.

### `PERSONAL`

- `startText`: texto de la portada.
- `victoryTitle`: título del cierre (por defecto, «¡Feliz Navidad, Laura!»).
- `victoryMessage`: carta final. Respeta los `\n` para los saltos de línea.
- `signature`: firma en cursiva.

Laura aparece en `startText` y `victoryTitle`; cambia esas cadenas si el regalo es para otra persona.

### `PRODUCTS_CATALOG`

Cada producto tiene:

```js
{
  id: 'pintalabios',
  name: 'Pintalabios Fenty',   // nombre completo en la etiqueta y los avisos
  short: 'Pintalabios',        // nombre corto de la lista
  shape: 'lipstick',           // silueta: debe existir en SHAPES
  aspect: 0.42,                // ancho / alto del dibujo
  colors: { body, accent, dark, glass, liquid },
}
```

Para cambiar solo nombres o colores, edita el catálogo. Para cambiar una silueta, edita la función correspondiente en el bloque `SHAPES` (sección 15 de `game.js`). Los productos se dibujan en una caja normalizada: `x` de −0,5 a 0,5 e `y` de −1 a 0.

### `LEVELS_CONFIG`

```js
{
  items: 5,               // productos de la lista
  distractors: 10,        // productos equivocados en las estanterías
  seconds: 70,            // tiempo límite
  hideListAfter: 7,       // segundos antes de ocultar la lista (null = visible siempre)
  label: 'La trastienda', // nombre de la zona
  clearTip: '...',        // frase del panel de nivel superado
}
```

Puedes añadir o quitar niveles; el HUD, los puntos de progreso, los totales de la victoria y el reparto se adaptan a `LEVELS_CONFIG`.

### `GAME_RULES`

Aquí están el margen del doble toque (`doubleTapMs`), la invulnerabilidad (`invulnerableMs`), los segundos que se queda la lista al consultarla (`peekSeconds`), el alto del pie y la recolocación de productos (`shuffleMinSeconds`, `shuffleMaxSeconds`, `shuffleDuration`). Los valores están pensados para que el juego sea cómodo con un dedo.

### `AUDIO_CONFIG`

- `masterGain`: volumen general (0,5 por defecto).
- `compressor`: umbral, rodilla, ratio, ataque y release del compresor.
- `storageKey`: clave de `localStorage` para el silencio.

Los sonidos concretos están en `playAudio()`, en la sección de audio de `game.js`, con sus notas, envolventes y filtros. Se pueden afinar sin tocar el resto del juego.

## Detalles técnicos

- **Canvas con `devicePixelRatio` limitado a 3** y `dt` limitado a `Math.min(dt, 0.05)`. El mundo se redibuja con `requestAnimationFrame`.
- **Resize limpio**: se escuchan `resize`, `orientationchange` y `visualViewport.resize`; al cambiar el tamaño se recalculan el escenario, las estanterías, el HUD, el scroll y la posición del botón de sonido.
- **Zonas seguras**: `styles.css` define `--safe-*` con `env(safe-area-inset-*)`; `readSafeInsets()` las lee para colocar el HUD, el pie y el mundo. El botón de sonido también se posiciona desde JS dentro del escenario.
- **Escenario**: móvil a pantalla completa; escritorio con marco centrado de 548 px de ancho como máximo. El fondo, las estanterías, los productos, el árbol, los regalos, la nieve y el confeti son arte vectorial dibujado en canvas. El ornamento de los paneles es SVG inline.
- **Estados**: `START`, `PLAYING`, `LEVEL_CLEAR`, `GAME_OVER` y `VICTORY`.
- **Entrada**: Pointer Events (ratón y táctil), rueda y teclado. El doble toque solo cuenta si se hace sobre el mismo producto y dentro de la ventana de `doubleTapMs`.
- **Scroll**: arrastre vertical con inercia, rebote suave y barra indicadora. El primer nivel está pensado para que quepa casi entero; los últimos obligan a bajar por la tienda.
- **Recolocación de estanterías**: cada producto tiene una posición reservada. Solo se mueven los productos que siguen en la estantería, así que al devolver uno de la cesta siempre encuentra su hueco libre. La animación los dibuja por encima de las estanterías y bloquea los toques mientras dura.
- **Accesibilidad**: botones reales en el panel, foco visible, diálogo `aria-modal`, descripción del canvas, región `aria-live`, botón de sonido con `role="switch"`, `aria-checked` y atajo `M`.

## Modo de depuración

Añadiendo `?debug=1` a la URL se expone `window.__perfumeria`, con un `snapshot()` del estado y utilidades para probar el flujo: empezar un nivel, coger un producto, recolocar las estanterías, forzar el final, silenciar, etc. No se carga en la partida normal.

## Para seguir jugando con él

- Ajustar `AUDIO_CONFIG.masterGain` si se quiere un volumen general más bajo o más alto.
- Cambiar los acordes y notas de `playAudio()` por otra melodía navideña.
- Añadir más productos a `PRODUCTS_CATALOG` (y su silueta en `SHAPES`) para listas más variadas.
- Cambiar `shuffleMinSeconds` y `shuffleMaxSeconds` si se quiere una tienda más tranquila o más caótica.
