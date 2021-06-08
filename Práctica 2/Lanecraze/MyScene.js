// BIBLIOTECAS
import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'

//PROYECTO
import { Ornitorrinco } from './Ornitorrinco.js'
import { Menu } from './Menu.js'
import { Scoreboard } from './Scoreboard.js'
import { Sombrero } from './Sombrero.js'
import { Nivel } from './Nivel.js'
import { NivelNoche } from './NivelNoche.js'

class MyScene extends THREE.Scene {
	constructor (myCanvas) {
		super();

		this.renderer = this.createRenderer(myCanvas);

		this.createLights ();

		this.contador_meta = 0;
		this.contador_muerte = 0;

		//Definimos el menú, que consiste en un plano y texto
		this.menu = new Menu();

		this.scoreboard = new Scoreboard(this.contador_meta, this.contador_muerte);
		this.scoreboard.position.y = 55;

		this.add(this.scoreboard);

		this.add (this.menu);
		this.menu.position.y = 60;

		//Definimos las opciones del menú, que son sombreros. Serán clickeables
		this.objetos_menu = [];

		this.sombrero1 = new Sombrero("fedora");
		this.sombrero2 = new Sombrero("gorra");
		this.sombrero3 = new Sombrero("sombrero_copa");

		this.sombrero1.position.x=5;
		this.sombrero2.position.x=20;
		this.sombrero3.position.x=35;

		this.sombrero1.position.y=45;
		this.sombrero2.position.y=45;
		this.sombrero3.position.y=45;


		this.objetos_menu.push(this.sombrero1);
		this.objetos_menu.push(this.sombrero2);
		this.objetos_menu.push(this.sombrero3);

		this.add(this.sombrero1);
		this.add(this.sombrero2);
		this.add(this.sombrero3);

		//Definimos el modelo del ornitorrinco
		this.model = new Ornitorrinco();
		this.model.position.set(7.5,3.5,0);
		this.add (this.model);

		//Definimos varias cámaras
		this.createCamera ();
		this.camera_actual = 2;

	}

	createCamera () {
		// Para crear una cámara le indicamos
		//   El ángulo del campo de visión vértical en grados sexagesimales
		//   La razón de aspecto ancho/alto
		//   Los planos de recorte cercano y lejano
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		// También se indica dónde se coloca
		this.camera.position.set (this.model.position.x+10, this.model.position.y + 75 , this.model.position.z + 45);
		// Y hacia dónde mira
		var look = new THREE.Vector3 (this.model.position.x, this.model.position.y + 5 , this.model.position.z + 5);
		this.camera.lookAt(look);
		this.add (this.camera);

		//Y otra cámara para el menu
		this.camera2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.camera2.position.set (20,40,35);
		this.camera2.lookAt(20,50,0);
		this.add(this.camera2);
	}

	cameraUpdate() {
		if(this.nivel != null){
			this.camera.position.z -= 0.35;
		}

		var look = new THREE.Vector3 (this.camera.position.x - 15, this.camera.position.y - 50 , this.camera.position.z - 40);
		this.camera.lookAt(look);
	}

	createLights () {
		// Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
		// La luz ambiental solo tiene un color y una intensidad
		// Se declara como   var   y va a ser una variable local a este método
		//    se hace así puesto que no va a ser accedida desde otros métodos
		var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
		// La añadimos a la escena

		this.spotLight = new THREE.SpotLight( 0xffffff, 1);
		this.spotLight.position.set( 60, 1000, 40 );
		this.add (this.spotLight);

		//Y otra luz focal para el menú
		this.spotLightMenu = new THREE.SpotLight( 0xffffff, 0.7);
		this.spotLightMenu.position.set( 0, 50, 100 );
		this.spotLightMenu.lookAt(0,50,0);
		this.add (this.spotLightMenu);
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
		var cam_actual;
		switch (this.camera_actual){
			case 1:
				cam_actual = this.camera;
			break;
			case 2:
				cam_actual = this.camera2;
			break;
		}

		return cam_actual;
	}

	putMenu () {
		this.camera_actual = 2;
		this.activeCamera = this.camera;
		this.renderer.render(this, this.camera);
		this.setCameraAspect(window.innerWidth / window.innerHeight);

		this.scoreboard = new Scoreboard(this.contador_meta, this.contador_muerte);
		this.scoreboard.position.y = 55;
		this.add(this.scoreboard);

		this.add(this.menu);
		this.add(this.sombrero1);
		this.add(this.sombrero2);
		this.add(this.sombrero3);
	}

	leaveMenu () {
		this.remove(this.scoreboard);

		this.camera_actual = 1;
		this.activeCamera = this.camera;
		this.renderer.render (this, this.camera);
		this.setCameraAspect (window.innerWidth / window.innerHeight);
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

	onPointerMove (event) {
		//Definimos a dónde apunta el ratón
		this.pointer = new THREE.Vector2();
		this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		//Definimos el raycaster: sirve para saber si el ratón está posado encima de un objeto que se pueda seleccionar
		var raycaster = new THREE.Raycaster();
		raycaster.setFromCamera(this.pointer, this.getCamera());
		var seleccion = raycaster.intersectObjects(this.objetos_menu, true);

		var seleccionado = false;

		if ( seleccion.length > 0 ) {
				seleccion[0].object.rotation.y += 0.2;
		}
	}

	onClick (event) {
		//Definimos a dónde apunta el ratón
		this.pointer = new THREE.Vector2();
		this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		//Definimos el raycaster: sirve para saber si el ratón está posado encima de un objeto que se pueda seleccionar
		var raycaster = new THREE.Raycaster();
		raycaster.setFromCamera(this.pointer, this.getCamera());
		var seleccion = raycaster.intersectObjects(this.objetos_menu, true);

		var seleccionado = false;

		if ( seleccion.length > 0 ) {
			this.leaveMenu();
			this.remove(this.scoreboard);
			this.remove(this.menu);
			this.remove(this.sombrero1);
			this.remove(this.sombrero2);
			this.remove(this.sombrero3);

			var obj = seleccion[0].point;

			if(obj.x > this.sombrero1.position.x-this.sombrero1.getAnchura() &&
			        obj.x < this.sombrero1.position.x+this.sombrero1.getAnchura()){
				this.spotLight.intensity = 0.7;
				var v_gen = new Array(10);
				v_gen[0] = new THREE.Vector2(5,0);
				v_gen[1] = new THREE.Vector2(2,1);
				v_gen[2] = new THREE.Vector2(5,2);
				v_gen[3] = new THREE.Vector2(3,0);
				v_gen[4] = new THREE.Vector2(1,1);
				v_gen[5] = new THREE.Vector2(1,2);
				v_gen[6] = new THREE.Vector2(1,0);
				v_gen[7] = new THREE.Vector2(5,1);
				v_gen[8] = new THREE.Vector2(2,2);
				v_gen[9] = new THREE.Vector2(5,0);

				this.nivel = new Nivel(v_gen, "fedora");
				this.add(this.nivel);
			}
			else if(obj.x > this.sombrero2.position.x-this.sombrero2.getAnchura() &&
			        obj.x < this.sombrero2.position.x+this.sombrero2.getAnchura()){
				this.spotLight.color.setHex(0xffe878);
				this.spotLight.intensity = 0.5;

				var v_gen = new Array(8);
				v_gen[0] = new THREE.Vector2(5,0);
				v_gen[1] = new THREE.Vector2(4,2);
				v_gen[2] = new THREE.Vector2(3,1);
				v_gen[3] = new THREE.Vector2(3,0);
				v_gen[4] = new THREE.Vector2(4,1);
				v_gen[5] = new THREE.Vector2(3,2);
				v_gen[6] = new THREE.Vector2(3,1);
				v_gen[7] = new THREE.Vector2(5,0);

				this.nivel = new Nivel(v_gen, "gorra");
				this.add(this.nivel);
			}
			else if(obj.x > this.sombrero3.position.x-this.sombrero3.getAnchura() &&
			        obj.x < this.sombrero3.position.x+this.sombrero3.getAnchura()){
				this.spotLight.intensity = 0;

				var v_gen = new Array(10);
				v_gen[0] = new THREE.Vector2(5,0);
				v_gen[1] = new THREE.Vector2(2,1);
				v_gen[2] = new THREE.Vector2(5,2);
				v_gen[3] = new THREE.Vector2(3,0);
				v_gen[4] = new THREE.Vector2(1,1);
				v_gen[5] = new THREE.Vector2(1,2);
				v_gen[6] = new THREE.Vector2(1,0);
				v_gen[7] = new THREE.Vector2(5,1);
				v_gen[8] = new THREE.Vector2(2,2);
				v_gen[9] = new THREE.Vector2(5,0);

				this.nivel = new NivelNoche(v_gen, "sombrero_copa");
				this.add(this.nivel);
			}
		}
	}

	update () {
		// Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
		this.renderer.render (this, this.getCamera());

		this.cameraUpdate();

		// Se actualiza el resto del modelo
		this.model.update();

		this.muerteCamara();
		this.muerteCoche();

		if(this.nivel != null){
			this.nivel.update();
		}

		// Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
		// Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
		// Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
		requestAnimationFrame(() => this.update())
	}

	meta() {
		var final = false;

		if(this.nivel.meta(this.model)){
			this.scoreboard = null;
			this.contador_meta++;
			this.putMenu();
			this.model.position.set(7.5,3.5,0);
			this.add (this.model);
			this.remove(this.nivel);
			this.nivel = null;

			this.camera.position.set (this.model.position.x+10, this.model.position.y + 75 , this.model.position.z + 45);
			var look = new THREE.Vector3 (this.model.position.x, this.model.position.y + 5 , this.model.position.z + 5);
			this.camera.lookAt(look);
			this.add (this.camera);

			final = true;
		}

		return final;
	}

	muerteCamara(){
		var z_modelo = this.model.position.z;
		var z_camara = this.camera.position.z;

		if(z_camara-z_modelo < -15){
			this.muerte();
		}
	}

	muerteCoche() {
		if(this.nivel!=null && this.nivel.colisionCoche(this.model.position))
			this.muerte();
	}

	muerte() {
			this.contador_muerte++;
			this.scoreboard = null;
			this.putMenu();
			this.model.position.set(7.5,3.5,0);
			this.add (this.model);
			this.remove(this.nivel);
			this.nivel = null;

			this.camera.position.set (this.model.position.x+10, this.model.position.y + 75 , this.model.position.z + 45);
			var look = new THREE.Vector3 (this.model.position.x, this.model.position.y + 5 , this.model.position.z + 5);
			this.camera.lookAt(look);
			this.add (this.camera);
	}

	onKeyDown(event) {
		var key = event.which || event.keyCode;
		//console.log(key);
		if (this.nivel != null) {
			switch(key) {
				case 37:
					var nueva_pos = this.model.siguientePos("LEFT");
					if(this.nivel.inBounds(nueva_pos) && !this.nivel.intersect(nueva_pos) && !this.nivel.isWater(nueva_pos))
						this.model.mover("LEFT"); //Izquierda

					this.meta();
				break;
				case 38:
					var nueva_pos = this.model.siguientePos("UP");
					if(this.nivel.inBounds(nueva_pos) && !this.nivel.intersect(nueva_pos) && !this.nivel.isWater(nueva_pos))
						this.model.mover("UP"); //Arriba

					this.meta();
				break;
				case 39:
					var nueva_pos = this.model.siguientePos("RIGHT");
					if(this.nivel.inBounds(nueva_pos) && !this.nivel.intersect(nueva_pos) && !this.nivel.isWater(nueva_pos))
						this.model.mover("RIGHT");// Derecha

					this.meta();
				break;
				case 40:
					var nueva_pos = this.model.siguientePos("DOWN");
					if(this.nivel.inBounds(nueva_pos) && !this.nivel.intersect(nueva_pos) && !this.nivel.isWater(nueva_pos))
						this.model.mover("DOWN"); // abajo

					this.meta();
				break;
			}
		}
	}
}

/// La función   main
$(function () {

	// Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
	var scene = new MyScene("#WebGL-output");

	// Se añaden los listener de la aplicación.
	window.addEventListener ("resize", () => scene.onWindowResize());
	window.addEventListener ("keydown", (event) => scene.onKeyDown(event));
	window.addEventListener ("mousemove", (event) => scene.onPointerMove(event));
	window.addEventListener ("click", (event) => scene.onClick(event));

	// Que no se nos olvide, la primera visualización.
	scene.update();
});
