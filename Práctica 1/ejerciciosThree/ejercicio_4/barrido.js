import * as THREE from '../libs/three.module.js'

class Barrido extends THREE.Object3D {
	constructor() {
		super();

		var contorno = new THREE.Shape();
		contorno.moveTo(0, 4.75);
		contorno.lineTo(2.375, 0);
		contorno.lineTo(0, -4.75);
		contorno.lineTo(-2.375, 0);
		contorno.lineTo(0, 4.75);

		var vector_recorrido = [];
		vector_recorrido.push(new THREE.Vector3(0.0, 0.0, 0.0));
		vector_recorrido.push(new THREE.Vector3(0.0, 0.0, 5.0));
		vector_recorrido.push(new THREE.Vector3(0.0, 10.0, 10.0));
		vector_recorrido.push(new THREE.Vector3(-10.0, 0.0, 15.0));

		var recorrido = new THREE.CatmullRomCurve3(vector_recorrido);

		const opciones = {
			steps: 1,
			depth: 1,
			extrudePath: recorrido
		};

		var geometria = new THREE.ExtrudeGeometry(contorno, opciones);
		var material  = new THREE.MeshNormalMaterial();

		this.objeto   = new THREE.Mesh(geometria, opciones);

		this.add(this.objeto);
	}

	update () {
		this.objeto.rotation.x += 0.02;
		this.objeto.rotation.y += 0.02;
		this.objeto.rotation.z += 0.02;
	}
}

export { Barrido };
