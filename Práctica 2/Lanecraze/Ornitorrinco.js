import * as THREE from '../libs/three.module.js'

class Ornitorrinco extends THREE.Object3D {
	constructor(gui,titleGui) {
		super();

		this.a_cuerpo = 7;
		this.l_cuerpo = 5;
		this.h_cuerpo = 15;

		// Se crea la parte de la interfaz que corresponde a la Ornitorrinco
		// Se crea primero porque otros métodos usan las variables que se definen para la interfaz
		this.createGUI(gui,titleGui);

		this.crearCuerpo();

		this.add(this.cuerpo);
	}

	crearMateriales() {
		this.verde   = THREE.MeshPhongMaterial({color:0x00b1b1});
		this.naranja = THREE.MeshPhongMaterial({color:0xfcb034});
	}

	crearCuerpo (){
		var geom = new THREE.BoxGeometry(this.a_cuerpo, this.h_cuerpo, this.l_cuerpo);
		this.cuerpo = THREE.Mesh(geom,new THREE.MeshNormalMaterial());
	}

	crearCola() {

	}

	crearPatas() {

	}


	createGUI (gui,titleGui) {
	}



	update () {
	}
}

export { Ornitorrinco }
