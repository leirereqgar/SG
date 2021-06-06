import * as THREE from '../libs/three.module.js'

class Arbol extends THREE.Object3D {
	constructor(altura) {
		super();

		this.altura = altura;

		this.crearMateriales();

		var geom_hojas = new THREE.BoxGeometry(15,this.altura*15,15);
		var hojas = new THREE.Mesh(geom_hojas, this.leaves_material);

		var geom_tronco = new THREE.BoxGeometry(7.5,7.5,7.5);
		var tronco = new THREE.Mesh(geom_tronco, this.wood_material);

		hojas.position.set(0,this.altura*15/2+7.5,0);
		tronco.position.set(0,7.5/2,0);

		this.add(hojas);
		this.add(tronco);
	}

	crearMateriales() {
		var loader = new THREE.TextureLoader();

		const wood_texture = loader.load('../imgs/wood-texture.jpg');
		this.wood_material = new THREE.MeshPhongMaterial ({map: wood_texture});

		const leaves_texture = loader.load('../imgs/leaves-texture.png');
		leaves_texture.wrapS = leaves_texture.wrapT = THREE.RepeatWrapping;
		leaves_texture.repeat.set(1,this.altura);
		this.leaves_material = new THREE.MeshPhongMaterial ({map: leaves_texture,transparent: true});
		this.leaves_matrial
	}
}

export { Arbol }
