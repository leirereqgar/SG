// BIBLIOTECAS
import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'

//PROYECTO
import { Ornitorrinco } from './Ornitorrinco.js'
import { Nivel } from './Nivel.js'

class MyScene extends THREE.Scene {
	constructor (myCanvas) {
		super();


		// Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
		this.renderer = this.createRenderer(myCanvas);


		// Crear las luces
		this.createLights ();


		this.nivel = new Nivel();
		this.add(this.nivel);

		this.model = new Ornitorrinco();
		this.model.position.set(7.5,3.5,0);
		this.add (this.model);
		// Tendremos una cámara con un control de movimiento con el ratón
		this.createCamera ();
	}

	createCamera () {
		// Para crear una cámara le indicamos
		//   El ángulo del campo de visión vértical en grados sexagesimales
		//   La razón de aspecto ancho/alto
		//   Los planos de recorte cercano y lejano
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		// También se indica dónde se coloca
		this.camera.position.set (this.model.position.x+10, this.model.position.y + 40 , this.model.position.z + 50);
		// Y hacia dónde mira
		var look = new THREE.Vector3 (this.model.position.x, this.model.position.y + 5 , this.model.position.z + 5);
		this.camera.lookAt(look);
		this.add (this.camera);

		// Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
		/*this.cameraControl = new TrackballControls (this.camera, this.renderer.domElement);

		// Se configuran las velocidades de los movimientos
		this.cameraControl.rotateSpeed = 5;
		this.cameraControl.zoomSpeed = -2;
		this.cameraControl.panSpeed = 0.5;
		//this.cameraControl.enabled = false;
		// Debe orbitar con respecto al punto de mira de la cámara
		this.cameraControl.target = look;*/
	}

	cameraUpdate() {
		this.camera.position.set (this.model.position.x+10, this.model.position.y + 40 , this.model.position.z + 50);
		var look = new THREE.Vector3 (this.model.position.x, this.model.position.y + 5 , this.model.position.z + 5);
		this.camera.lookAt(look);
	}

	createLights () {
		// Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
		// La luz ambiental solo tiene un color y una intensidad
		// Se declara como   var   y va a ser una variable local a este método
		//    se hace así puesto que no va a ser accedida desde otros métodos
		var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
		// La añadimos a la escena
		this.add (ambientLight);

		// Se crea una luz focal que va a ser la luz principal de la escena
		// La luz focal, además tiene una posición, y un punto de mira
		// Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
		// En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
		this.spotLight = new THREE.SpotLight( 0xffffff, 0.5);
		this.spotLight.position.set( 60, 1000, 40 );
		this.add (this.spotLight);
	}

	createRenderer (myCanvas) {
		// Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.

		// Se instancia un Renderer   WebGL
		var renderer = new THREE.WebGLRenderer();

		// Se establece un color de fondo en las imágenes que genera el render
		renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);

		// Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
		renderer.setSize(window.innerWidth, window.innerHeight);

		// La visualización se muestra en el lienzo recibido
		$(myCanvas).append(renderer.domElement);

		return renderer;
	}

	getCamera () {
		// En principio se devuelve la única cámara que tenemos
		// Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
		return this.camera;
	}

	setCameraAspect (ratio) {
		// Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
		// su sistema operativo hay que actualizar el ratio de aspecto de la cámara
		this.camera.aspect = ratio;
		// Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
		this.camera.updateProjectionMatrix();
	}

	onWindowResize () {
		// Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
		// Hay que actualizar el ratio de aspecto de la cámara
		this.setCameraAspect (window.innerWidth / window.innerHeight);

		// Y también el tamaño del renderizador
		this.renderer.setSize (window.innerWidth, window.innerHeight);
	}

	update () {
		// Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
		this.renderer.render (this, this.getCamera());


		// Se actualiza la posición de la cámara según su controlador
		//this.cameraControl.update();
		this.cameraUpdate();

		// Se actualiza el resto del modelo
		this.model.update();

		// Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
		// Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
		// Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
		requestAnimationFrame(() => this.update())
	}

	onKeyDown(event) {
		var key = event.which || event.keyCode;
		console.log(key);

		switch(key) {
			case 37:
				var nueva_pos = this.model.siguientePos("LEFT");
				if(this.nivel.inBounds(nueva_pos))
					this.model.mover("LEFT"); //Izquierda
			break;
			case 38:
				var nueva_pos = this.model.siguientePos("UP");
				if(this.nivel.inBounds(nueva_pos))
					this.model.mover("UP"); //Arriba
			break;
			case 39:
				var nueva_pos = this.model.siguientePos("RIGHT");
				if(this.nivel.inBounds(nueva_pos))
					this.model.mover("RIGHT");// Derecha
			break;
			case 40:
				var nueva_pos = this.model.siguientePos("DOWN");
				if(this.nivel.inBounds(nueva_pos))
					this.model.mover("DOWN"); // abajo
			break;
		}
	}
}

/// La función   main
$(function () {

	// Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
	var scene = new MyScene("#WebGL-output");

	// Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
	window.addEventListener ("resize", () => scene.onWindowResize());
	window.addEventListener ("keydown", (event) => scene.onKeyDown(event));

	// Que no se nos olvide, la primera visualización.
	scene.update();
});
