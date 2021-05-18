import * as THREE from '../libs/three.module.js'


class Suelo extends THREE.Object3D {
	constructor() {
		super();

		var geometryGround = new THREE.BoxGeometry (150,0.2,150);

		var materialGround = new THREE.MeshPhongMaterial ({color: 0x00ff00});

		// Ya se puede construir el Mesh
		var ground = new THREE.Mesh (geometryGround, materialGround);

		// Todas las figuras se crean centradas en el origen.
		// El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
		ground.position.y = -0.1;

		// Que no se nos olvide añadirlo a la escena, que en este caso es  this
		var gridhelper = new THREE.GridHelper(150, 10);

		this.add (gridhelper);
		this.add (ground);
	}

	inBounds(coord) {
		var in_bounds = true;
		if(coord.x < -75 || coord.x > 75)
			in_bounds = false;

		if (coord.z < -75 || coord.z > 75)
			in_bounds = false;

		return in_bounds;
	}
}

export { Suelo }
