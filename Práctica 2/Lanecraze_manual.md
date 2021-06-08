# SG Práctica 2: Lanecraze

###### Leire Requena García y Clara María Romero Lara

## Manual de usuario

### Ejecución

Para ejecutar el juego, debe disponer de la carpeta `Lanecraze`. Desde este directorio, ejecute:

```
python -m http.server
```

Abra un navegador y vaya a la dirección http://0.0.0.0:8000/.

En esa pestaña encontrará un enlace al directorio Lanecraze - cuando lo pulse, le llevará a la *pantalla de inicio*.

### Pantalla de inicio

La pantalla de inicio dispone del título del juego; y tres sombreros que representan los distintos niveles. Cuando pose su ratón sobre uno de estos sombreros, este realizará una breve animación.

Si hace click sobre cualquiera de los sombreros, se le redirigirá al nivel seleccionado con la partida iniciada. Antes de esto, consulte las siguientes instrucciones sobre el *juego* y su *personaje*.

### El juego

Debe avanzar por un mapa hasta llegar a la meta, que es el sombrero representativo del nivel.

En el camino encontrará obstáculos de distinta naturaleza que pueden ralentizarle o dar un 'Game Over'.

##### Terrenos y obstáculos

Los obstáculos que se encuentre están asociados al tipo de terreno sobre el que se ubican. Estos son:

- **Hierba**: puede caminar por este terreno.

  - **Árboles y arbustos**: estos obstáculos le impiden el paso, pero no finalizan la partida si choca contra ellos.

- **Carretera**: puede caminar por este terreno.

  - **Coches**: los coches pueden tener velocidad, color y tamaño variable. Al chocar con un coche, la partida finalizará. 

    Los coches se mueven de forma predecible en la carretera, de adelante a atrás.

- **Agua**: no puede caminar por este terreno.

  - **Nenúfares**: en este caso, el obstáculo no es tal, sino que es beneficioso. Los nenúfares crean un camino sobre el agua que puede atravesar.

##### Game Over

El juego finalizará si:

- Se impacta con un coche
- La cámara avanza demasiado lejos del personaje

### El personaje

Su personaje es un ornitorrinco verde que empieza el nivel al principio del mapa.

##### Movimiento

Su personaje se mueve con las flechas de dirección del teclado (⇦⇧⇨⇩). Si intenta avanzar en una dirección bloqueada por un obstáculo o fuera de límites, su personaje no se moverá.

### Niveles

##### Nivel 1

El nivel 1 tiene por sombrero una fedora. Transcurre de día y sirve a modo de tutorial.

##### Nivel 2

El nivel  2 tiene por sombrero una gorra. Transcurre al atardecer. Destaca la gran cantidad de carreteras.

##### Nivel 3

El nivel 3 tiene por sombrero un sombrero de copa. Transcurre por la noche, y lo iluminan farolas.



