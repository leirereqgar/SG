import * as THREE from '../libs/three.module.js'

class Diamante extends THREE.Object3D {
	constructor() {
		super();

		var contorno = new THREE.Shape();
		contorno.moveTo(0, 4.75);
		contorno.lineTo(2.375, 0);
		contorno.lineTo(0, -4.75);
		contorno.lineTo(-2.375, 0);
		contorno.lineTo(0, 4.75);
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
		this.vertical.position.y = -20; // Transformación fija
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

export { Diamante };
