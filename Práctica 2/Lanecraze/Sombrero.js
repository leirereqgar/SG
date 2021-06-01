import * as THREE from '../libs/three.module.js'


class Sombrero extends THREE.Object3D {
	constructor() {
		super();

		this.crearSombrero();

		this.add(this.sombrero);
	}

	crearSombrero() {
		this.marron  = new THREE.MeshPhongMaterial({color:0x69321e});
		
		var ala = new THREE.Mesh(new THREE.BoxGeometry(4.1,1,4.1), this.marron);
		var copa = new THREE.Mesh(new THREE.CylinderGeometry(1,2,2,4), this.marron);
		copa.position.y = 1;

		this.sombrero = new THREE.Object3D();
		this.sombrero.add(ala);
		this.sombrero.add(copa);
		this.sombrero.position.y = 3;
		this.sombrero.position.z = 3.5;
	}
}

export{ Sombrero }
