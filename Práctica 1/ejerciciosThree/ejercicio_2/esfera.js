import * as THREE from '../libs/three.module.js'

class Esfera extends THREE.Object3D {
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
		this.esfera = new THREE.Mesh (new THREE.SphereGeometry (1,3,3), this.material);
		this.esfera.position.set(10,-5,0);

		// Al nodo  this, la Cono, se le cuelgan como hijos la base y la parte móvil
		this.add (this.esfera);
	}

	createGUI (gui,titleGui) {
		// Controles para el movimiento de la parte móvil
		this.guiControls = new function () {
			this.radio         = 1;
			this.res_ecuador   = 3;
			this.res_meridiano = 3;
		}

		var that = this;
		// Se crea una sección para los controles de la caja
		var folder = gui.addFolder (titleGui);
		// Estas lineas son las que añaden los componentes de la interfaz
		// Las tres_meridiano cifras indican un valor mínimo, un máximo y el incremento
		folder.add(this.guiControls, 'radio', 1, 3, 0.1).name('Radio: ').onChange(function () {
			that.esfera.geometry = new THREE.SphereGeometry(that.guiControls.radio, that.guiControls.res_ecuador, that.guiControls.res_meridiano);
		});
		folder.add(this.guiControls, 'res_ecuador', 3, 20, 0.1).name('Res. Ecuador: ').onChange(function () {
			that.esfera.geometry = new THREE.SphereGeometry(that.guiControls.radio, that.guiControls.res_ecuador, that.guiControls.res_meridiano);
		});
		folder.add(this.guiControls, 'res_meridiano', 3, 20, 1).name('Res. Meridiano: ').onChange(function () {
			that.esfera.geometry = new THREE.SphereGeometry(that.guiControls.radio, that.guiControls.res_ecuador, that.guiControls.res_meridiano);
		});
	}

	update () {
		this.esfera.rotation.y += 0.03;
		this.esfera.rotation.x += 0.03;
	}
}

export { Esfera }
