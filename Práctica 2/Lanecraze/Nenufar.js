import * as THREE from '../libs/three.module.js'
import {ThreeBSP} from '../libs/ThreeBSP.js'

class Nenufar extends THREE.Object3D {
	constructor(largo) {
		super();

		this.crearMateriales();

		var geom_muesca = new THREE.CylinderGeometry( 7.5, 7.5, 3, 3 );
		var muesca = new THREE.Mesh(geom_muesca, this.verde);

		geom_muesca.translate(0,0,-9);

		var geom_hoja = new THREE.CylinderGeometry( 7.5, 7.5, 1, 17);
		var hoja = new THREE.Mesh(geom_hoja, this.verde);


		var muesca_bsp = new ThreeBSP(geom_muesca);
		var hoja_bsp = new ThreeBSP(geom_hoja);

		var nenufar_bsp = hoja_bsp.subtract(muesca_bsp);

		this.nenufar = nenufar_bsp.toMesh(this.verde);

		this.add(this.nenufar);
	}

	crearMateriales() {
		this.verde   = new THREE.MeshPhongMaterial({color:0x55b56b});
		this.verde.side = THREE.DoubleSide;
	}
}

export { Nenufar }
