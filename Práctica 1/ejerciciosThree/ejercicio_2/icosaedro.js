import * as THREE from '../libs/three.module.js'

class Icosaedro extends THREE.Object3D {
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
		this.icosaedro = new THREE.Mesh (new THREE.IcosahedronGeometry(1,0), this.material);
		this.icosaedro.position.set(-10,-5,0);

		// Al nodo  this, la Cono, se le cuelgan como hijos la base y la parte móvil
		this.add (this.icosaedro);
	}

	createGUI (gui,titleGui) {
		// Controles para el movimiento de la parte móvil
		this.guiControls = new function () {
			this.radio   = 1;
			this.detalle = 0;
		}

		var that = this;
		// Se crea una sección para los controles de la caja
		var folder = gui.addFolder (titleGui);
		// Estas lineas son las que añaden los componentes de la interfaz
		// Las tres_meridiano cifras indican un valor mínimo, un máximo y el incremento
		folder.add(this.guiControls, 'radio', 1, 5, 0.1).name('Radio: ').onChange(function () {
			that.icosaedro.geometry = new THREE.IcosahedronBufferGeometry(that.guiControls.radio, that.guiControls.detalle);
		});
		folder.add(this.guiControls, 'detalle', 0, 3, 1).name('Subdivisión: ').onChange(function () {
			that.icosaedro.geometry = new THREE.IcosahedronBufferGeometry(that.guiControls.radio, that.guiControls.detalle);
		});
	}

	update () {
		this.icosaedro.rotation.y += 0.03;
		this.icosaedro.rotation.x += 0.03;
	}
}

export { Icosaedro }
