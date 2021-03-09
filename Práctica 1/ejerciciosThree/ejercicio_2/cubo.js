import * as THREE from '../libs/three.module.js'

class Cubo extends THREE.Object3D {
	constructor(gui,titleGui) {
		super();

		// Se crea la parte de la interfaz que corresponde a la Cubo
		// Se crea primero porque otros métodos usan las variables que se definen para la interfaz
		this.createGUI(gui,titleGui);

		// El material se usa desde varios métodos. Por eso se alamacena en un atributo
		this.material = new THREE.MeshNormalMaterial();
		this.material.flatShading = true;
		this.material.needsUpdate = true;

		// A la base no se accede desde ningún método. Se almacena en una variable local del constructor.
		this.box = this.createCubo();

		// Al nodo  this, la Cubo, se le cuelgan como hijos la base y la parte móvil
		this.add (this.box);
	}

	createCubo() {
		// Cada figura, un Mesh, está compuesto de una geometría y un material
		var cubo = new THREE.Mesh (new THREE.BoxGeometry (1,1,1), this.material);

		return cubo;
	}

	createGUI (gui,titleGui) {
		// Controles para el movimiento de la parte móvil
		this.guiControls = new function () {
			this.sizeX = 1;
			this.sizeY = 1;
			this.sizeZ = 1;
		}

		var that = this;
		// Se crea una sección para los controles de la caja
		var folder = gui.addFolder (titleGui);
		// Estas lineas son las que añaden los componentes de la interfaz
		// Las tres cifras indican un valor mínimo, un máximo y el incremento
		folder.add(this.guiControls, 'sizeX', 1, 3, 0.1).name('Dimensión X: ').onChange(function () {
			that.box.geometry = new THREE.BoxGeometry(that.guiControls.sizeX, that.guiControls.sizeY, that.guiControls.sizeZ);
		});
		folder.add(this.guiControls, 'sizeY', 1, 3, 0.1).name('Dimensión Y: ').onChange(function () {
			that.box.geometry = new THREE.BoxGeometry(that.guiControls.sizeX, that.guiControls.sizeY, that.guiControls.sizeZ);
		});
		folder.add(this.guiControls, 'sizeZ', 1, 3, 0.1).name('Dimensión Z: ').onChange(function () {
			that.box.geometry = new THREE.BoxGeometry(that.guiControls.sizeX, that.guiControls.sizeY, that.guiControls.sizeZ);
		});
	}

	update () {
		this.box.rotation.y += 0.05;
	}
}

export { Cubo }
