import * as THREE from '../libs/three.module.js'

class Pica extends THREE.Object3D {
	constructor() {
		super();

		var contorno = new THREE.Shape();
		contorno.moveTo(2.5, 2.5);
		contorno.bezierCurveTo(2.5, 2.5, 2, 0, 0, 0);
		contorno.bezierCurveTo(-3, 0, -3, 3.5, -3, 3.5);
		contorno.bezierCurveTo(-3, 5.5, -1.5, 7.7, 2.5, 9.5);
		contorno.bezierCurveTo(6, 7.7, 8, 5.5, 8, 3.5);
		contorno.bezierCurveTo(8, 3.5, 8, 0, 5, 0);
		contorno.bezierCurveTo(3.5, 0, 2.5, 2.5, 2.5, 2.5);
		var opciones = {
			steps: 2,
			amount: 1,
			bevelEnabled: true,
			bevelThickness: 1,
			bevelSize: 1,
			bevelOffset: 0,
			bevelSegments: 10
		};

		var geometria  = new THREE.ExtrudeGeometry(contorno, opciones);
		var material   = new THREE.MeshNormalMaterial();
		this.objeto    = new THREE.Mesh(geometria, material);

		this.vertical = new THREE.Object3D();  // Nodo que mantiene verticalidad y se fija a una distancia x
		this.vertical.position.x = -20; // Transformación fija
		this.vertical.add(this.objeto);

		this.circulos = new THREE.Object3D();   // Nodo que rota sobre el eje z a la distancia definida
		this.circulos.add(this.vertical);

		// Y añadirlo como hijo del Object3D (el this)
		this.add(this.circulos);
	}

	update () {
		this.circulos.rotation.z += 0.01; // Rotar sobre Z
		this.vertical.rotation.z -= 0.01;   // Mantener verticalidad
		this.objeto.rotation.y += 0.02;   // Rotar sobre si mismo
	}
}

export { Pica };
