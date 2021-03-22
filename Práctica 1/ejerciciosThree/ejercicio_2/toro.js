import * as THREE from '../libs/three.module.js'

class Toro extends THREE.Object3D {
	constructor(gui, titleGui) {
		super();

		// Se crea la parte de la interfaz que corresponde al Cono
		// Se crea primero porque otros métodos usan las variables que se definen para la interfaz
		this.createGUI(gui,titleGui);

		// El material se usa desde varios métodos. Por eso se alamacena en un atributo
		this.material = new THREE.MeshNormalMaterial();
		this.material.flatShading = true;
		this.material.needsUpdate = true;

		// Cada figura, un Mesh, está compuesto de una geometría y un material
		this.toro = new THREE.Mesh (new THREE.TorusGeometry (1,1,3,3), this.material);
		this.toro.position.set(0,-5,0);

		// Al nodo  this, la Cono, se le cuelgan como hijos la base y la parte móvil
		this.add (this.toro);
	}

	createGUI(gui, titleGui) {
		// Controles para el movimiento de la parte móvil
		this.guiControls = new function () {
			this.radio    = 1;
			this.tubo     = 1;
			this.res_toro = 3;
			this.res_tubo = 3;
		}

		var that = this;
		// Se crea una sección para los controles de la caja
		var folder = gui.addFolder (titleGui);
		// Estas lineas son las que añaden los componentes de la interfaz
		// Las tres cifras indican un valor mínimo, un máximo y el incremento
		folder.add(this.guiControls, 'radio', 1, 5, 0.1).name('Radio principal: ').onChange(function () {
			that.toro.geometry = new THREE.TorusBufferGeometry(that.guiControls.radio, that.guiControls.tubo, that.guiControls.res_toro, that.guiControls.res_tubo);
      });
		folder.add(this.guiControls, 'tubo', 1, 3, 0.1).name('Radio tubo: ').onChange(function () {
			that.toro.geometry = new THREE.TorusBufferGeometry(that.guiControls.radio, that.guiControls.tubo, that.guiControls.res_toro, that.guiControls.res_tubo);
		});
		folder.add(this.guiControls, 'res_toro', 3, 20, 0.1).name('Resolución Toro: ').onChange(function () {
			that.toro.geometry = new THREE.TorusBufferGeometry(that.guiControls.radio, that.guiControls.tubo, that.guiControls.res_toro, that.guiControls.res_tubo);
		});
		folder.add(this.guiControls, 'res_tubo', 3, 20, 0.1).name('Resolución Tubo: ').onChange(function () {
			that.toro.geometry = new THREE.TorusBufferGeometry(that.guiControls.radio, that.guiControls.tubo, that.guiControls.res_toro, that.guiControls.res_tubo);
		});
	}

	update () {
		this.toro.rotation.y += 0.03;
		this.toro.rotation.x += 0.03;
	}
}

export { Toro }
