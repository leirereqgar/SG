import * as THREE from '../libs/three.module.js'

class Coche extends THREE.Object3D {
	constructor(largo) {
		super();

		this.largo = largo;

		this.crearMateriales();

		var geom_cabina = new THREE.BoxGeometry(15,7.5,14);
		var cabina = new THREE.Mesh(geom_cabina, this.blanco);

		var geom_coche = new THREE.BoxGeometry(this.largo*15,7.5,15);
		var coche = new THREE.Mesh(geom_coche, this.escogerColor());

		var geom_ruedas = new THREE.CylinderGeometry(3.25,3.25,14,32);
		var rueda1 = new THREE.Mesh(geom_ruedas, this.negro);
		var rueda2 = new THREE.Mesh(geom_ruedas, this.negro);

		rueda1.rotateX(Math.PI/2);
		rueda2.rotateX(Math.PI/2);

		cabina.position.set(0,20,0);
		coche.position.set(0,15,0);
		rueda1.position.set(this.largo*15/3,7.5,0);
		rueda2.position.set(-this.largo*15/3,7.5,0);

		this.ruedas = new THREE.Object3D();

		this.add(this.ruedas);
		this.ruedas.add(rueda1);
		this.ruedas.add(rueda2);

		this.add(cabina);
		this.add(coche);
		this.add(this.ruedas);
	}

	crearMateriales() {
		this.rojo   = new THREE.MeshPhongMaterial({color:0xeb4034});
		this.azul = new THREE.MeshPhongMaterial({color:0x5862e8});
		this.amarillo  = new THREE.MeshPhongMaterial({color:0xffea29});

		this.negro = new THREE.MeshPhongMaterial({color:0x575543});
		this.blanco  = new THREE.MeshPhongMaterial({color:0xffffff});
	}

	escogerColor(){
		const colores = [this.rojo, this.azul, this.amarillo];
		const random = Math.floor(Math.random() * colores.length);

		return colores[random];
	}
}

export { Coche }
