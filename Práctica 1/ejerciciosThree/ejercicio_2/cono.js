import * as THREE from '../libs/three.module.js'

class Cono extends THREE.Object3D {
	constructor(gui,titleGui) {
		super();

		// Se crea la parte de la interfaz que corresponde al Cono
		// Se crea primero porque otros métodos usan las variables que se definen para la interfaz
		this.createGUI(gui,titleGui);

		// El material se usa desde varios métodos. Por eso se alamacena en un atributo
		this.material = new THREE.MeshNormalMaterial();
		this.material.flatShading = true;
		this.material.needsUpdate = true;

		// Cada figura, un Mesh, está compuesto de una geometría y un material
		this.cono = new THREE.Mesh (new THREE.ConeGeometry (1,1,3), this.material);
		this.cono.position.set(0,5,0);

		// Al nodo  this, la Cono, se le cuelgan como hijos la base y la parte móvil
		this.add (this.cono);
	}

	createGUI (gui,titleGui) {
		// Controles para el movimiento de la parte móvil
		this.guiControls = new function () {
			this.radio = 1;
			this.altura = 1;
			this.res = 3;
		}

		var that = this;
		// Se crea una sección para los controles de la caja
		var folder = gui.addFolder (titleGui);
		// Estas lineas son las que añaden los componentes de la interfaz
		// Las tres cifras indican un valor mínimo, un máximo y el incremento
		folder.add(this.guiControls, 'radio', 1, 3, 0.1).name('Radio: ').onChange(function () {
			that.cono.geometry = new THREE.ConeGeometry(that.guiControls.radio, that.guiControls.altura, that.guiControls.res);
		});
		folder.add(this.guiControls, 'altura', 1, 3, 0.1).name('Altura: ').onChange(function () {
			that.cono.geometry = new THREE.ConeGeometry(that.guiControls.radio, that.guiControls.altura, that.guiControls.res);
		});
		folder.add(this.guiControls, 'res', 3, 10, 1).name('Resolución: ').onChange(function () {
			that.cono.geometry = new THREE.ConeGeometry(that.guiControls.radio, that.guiControls.altura, that.guiControls.res);
		});
	}

	update () {
		this.cono.rotation.y += 0.03;
		this.cono.rotation.x += 0.03;
	}
}

export { Cono }
