import * as THREE from '../libs/three.module.js'

import { OBJLoader } from '../libs/OBJLoader.js'
import { MTLLoader } from '../libs/MTLLoader.js'

class Modelo extends THREE.Object3D {
	constructor() {
		super();

		//var that = this;

		const obj_loader = new OBJLoader();
		const mtl_loader = new MTLLoader();

		mtl_loader.load('../models/porsche911/911.mtl', (mtl)=>{
			mtl.preload();
			obj_loader.setMaterials(mtl);
			obj_loader.load('../models/porsche911/Porsche_911_GT2.obj', (root) =>{
				root.scale.set(5,5,5);
				root.translateY(3);
				this.add(root);
			});
		});
	}

	update () {
		this.rotation.y += 0.01;
	}
}

export { Modelo };
