import * as THREE from '../libs/three.module.js'


class Suelo extends THREE.Object3D {
	constructor() {
		super();

		this.ancho = 10 * 15;
		this.largo = 30 * 15;

		var geometryGround = new THREE.BoxGeometry (this.ancho,0.2,this.largo);

		var materialGround = new THREE.MeshPhongMaterial ({color: 0x00ff00});

		// Ya se puede construir el Mesh
		var ground = new THREE.Mesh (geometryGround, materialGround);

		// Todas las figuras se crean centradas en el origen.
		// El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
		ground.position.y = -0.1;

		// Que no se nos olvide añadirlo a la escena, que en este caso es  this
		var gridhelper = new THREE.GridHelper(this.ancho*2, 20);

		//this.add (gridhelper);
		this.add (ground);
	}

	getLargo(){
		return this.largo;
	}

	inBounds(coord) {
		var in_bounds = true;

		/*Está fuera del borde si se pasa this.ancho/2 a la derecha o izquierda porque
		el tablero está centrado a lo ancho en el origen
		*/
		if(coord.x < -this.ancho/2 || coord.x > this.ancho/2)
			in_bounds = false;

		/* Estará fuera del tablero si coord.z es mayor que 0, porque vamos en sentido del ejeZ negativo
		o si coord.z es menor que this.largo, porque matemáticas
		*/
		if (coord.z > 0 || coord.z < -this.largo)
			in_bounds = false;

		return in_bounds;
	}
}

export { Suelo }
