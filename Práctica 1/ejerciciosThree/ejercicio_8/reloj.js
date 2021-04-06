import * as THREE from '../libs/three.module.js'

class Reloj extends THREE.Object3D {
	constructor(gui, titleGui) {
		super();

		// Se crea la parte de la interfaz
		// Se crea primero porque otros métodos usan las variables que se definen para la interfaz
		this.createGUI(gui, titleGui);

		var radio = 20;
		var geometria_esferas = new THREE.SphereGeometry(1, 20, 20);

		this.esfera_movil = new THREE.Mesh(geometria_esferas, new THREE.MeshPhongMaterial({color: "#ff0000"}));
		this.esfera_movil.translateX(radio - 2);
		this.movil = new THREE.Object3D();
		this.movil.add(this.esfera_movil);
		this.tiempo_anterior = Date.now();

		var mat_esferas_quietas = new THREE.MeshPhongMaterial({color: "#00ff00"});
		this.esferas_quietas    = new Array();

		var angulo     = 0;
		var incremento = (2 * Math.PI) / 12.0;
		for(var i = 0; i < 12; i++) {
			this.esferas_quietas.push(new THREE.Mesh(geometria_esferas, mat_esferas_quietas));
			this.esferas_quietas[i].translateX(Math.cos(angulo) * radio);
			this.esferas_quietas[i].translateZ(-Math.sin(angulo) * radio);
			this.add(this.esferas_quietas[i]);
			angulo += incremento;
		}

		this.add(this.movil);
	}

	createGUI(gui, titleGui) {
		this.guiControls = new function() {
			this.velocidad = 1.0;

			this.reset = function() {
				this.velocidad = 1.0;
			}
		}

		var folder = gui.addFolder(titleGui);
		folder.add(this.guiControls, 'velocidad', -30.0, 30.0, 1.0).name("Velocidad: ").listen();
		folder.add(this.guiControls, 'reset').name('Reset');
	}

	update() {
		// Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
		// Primero, el escalado
		// Segundo, la rotación en Z
		// Después, la rotación en Y
		// Luego, la rotación en X
		// Y por último la traslación
		var ahora = Date.now();

		this.movil.rotation.y -= this.guiControls.velocidad * ((2*Math.PI)/120) * ((ahora-this.tiempo_anterior)/1000.0);

		this.tiempo_anterior = ahora;
	}
}

export { Reloj }
