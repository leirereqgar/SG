import * as THREE from '../libs/three.module.js'

import { ThreeBSP } from '../libs/ThreeBSP.js'

class Taza extends THREE.Object3D {
	constructor() {
		super();

		var cilindro_exterior = new THREE.CylinderGeometry(10.0, 10.0, 20.0, 30);
		var cilindro_interior = new THREE.CylinderGeometry(10.0, 10.0, 20.0, 30);
		var asa               = new THREE.TorusGeometry(4.0, 1.0, 30.0, 30.0);

		cilindro_interior.scale(0.9, 1.0, 0.9);
		cilindro_interior.translate(0.0, 0.4, 0.0);
		asa.scale(1.5, 1.5, 1.5);
		asa.translate(10.0, 0.1, 0.0);

		// Transformar a bsp para hacer las operaciones booleanas
		var cilindro_exterior_bsp = new ThreeBSP(cilindro_exterior);
		var cilindro_interior_bsp = new ThreeBSP(cilindro_interior);
		var asa_bsp               = new ThreeBSP(asa);

		var cuerpo = cilindro_exterior_bsp.union(asa_bsp);
		var final  = cuerpo.subtract(cilindro_interior_bsp);

		var material = new THREE.MeshPhongMaterial({color: 0x141414});
		this.objeto  = final.toMesh(material);
		this.objeto.geometry.computeFaceNormals();
		this.objeto.geometry.computeVertexNormals();

		this.add(this.objeto);
	}

	update () {
	}
}

export { Taza };
