# CHICAGO Football Manager — v1.1.0

## Iniciar el juego en Windows
1. Extrae la carpeta completa del ZIP.
2. Asegúrate de tener Node.js instalado.
3. Ejecuta `start.bat`.
4. Se abrirá `http://localhost:3000` en el navegador y se iniciará el servidor local.

También puedes abrir una terminal en esta carpeta y ejecutar:

```bash
node server.js
```

Después visita `http://localhost:3000`.

## Música automática desde songs
- Copia cualquier cantidad de archivos `.mp3` dentro de la carpeta `songs`.
- El servidor detecta automáticamente los MP3 al cargar el juego; no tienes que editar listas ni modificar JavaScript.
- La música intenta comenzar al abrir la página. Los navegadores pueden bloquear el autoplay con sonido; si ocurre, basta con hacer el primer clic o toque en cualquier parte de la página.
- El botón musical superior permite ocultar/mostrar la música y el deslizador superior cambia el volumen. Las preferencias quedan guardadas.

Si abres `index.html` directamente con doble clic, el navegador no permite enumerar automáticamente los archivos de una carpeta local. Para que se detecten todas las canciones que agregues, inicia el proyecto con `start.bat` o `node server.js`.

## Cambios principales de esta versión
- Calendario mensual compacto dentro de Inicio con fechas de liga y copa resaltadas.
- Avance animado de la fecha, día por día, que se detiene en el próximo partido.
- Noticias recientes del club: movimientos de mercado, mensajes de directiva y entorno de liga.
- Pantalla de transición con `logochicago.png` al navegar entre secciones.
- Mercado limitado a tres jugadores transferibles por día, con filtros por división, posición y nombre.
- Plantilla inicial: capitán elegido de D1 conserva su media real; los otros tres puestos se cubren con jugadores de D4/Academia/D3 y conservan sus medias y posiciones originales. No se inventan medias bajas para jugadores de divisiones superiores.
- Se permiten nombres repetidos en distintas divisiones/clubes, pero no dos futbolistas con el mismo nombre dentro de tu plantilla.
- Tácticas con arrastrar y soltar, además de selectores por posición.
- Entrenamiento: los bloques DISPONIBLE abren el selector de futbolistas elegibles; cada jugador entrena una vez por semana y hay cinco sesiones semanales.
- Competiciones: Liga ida y vuelta, Copa Chicago de eliminación directa, ascensos/descensos y clasificación internacional al terminar D1.
- Clasificación internacional: dos primeros de D1 a Champions League; puestos 3.º y 4.º a Libertadores; puestos 5.º y 6.º disputan playoff por Europa League; puestos 7.º y 8.º disputan playoff por Sudamericana. El campeón de Copa Chicago puede obtener plaza de Sudamericana si no tiene un cupo superior.
- Simulación de partidos con dos tiempos de 30 minutos, cronología, movimiento de jugadores y balón, desempate en competiciones de eliminación directa y presentación ampliada.
- Colores de equipación aplicados a los avatares y graderías visualmente escalables con el nivel.

## Guardado y alcance
La carrera continúa guardándose en `localStorage` del navegador. Esta entrega añade un servidor Node local para servir los archivos y detectar música, pero todavía no sincroniza carreras entre distintos usuarios ni implementa partidas online en tiempo real. Para eso se necesita una base de datos y un backend multiusuario.

**Importante:** esta versión usa un esquema de guardado nuevo. La partida de la versión 1.0 se reinicia automáticamente para evitar conservar las medias incorrectas del equipo inicial. Debes crear una carrera nueva.

## Créditos
CHICAGO Football Manager — Neptunzinho  
Discord: andresneptunzinho
