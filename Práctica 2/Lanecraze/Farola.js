import * as THREE from '../libs/three.module.js'
import { OBJLoader } from '../libs/OBJLoader.js'
import { MTLLoader } from '../libs/MTLLoader.js'

class Farola extends THREE.Object3D {
	constructor() {
		super();

		const obj_loader = new OBJLoader();
		const mtl_loader = new MTLLoader();

		mtl_loader.load('../models/farola/farola.mtl', (mtl)=>{
			mtl.preload();
			obj_loader.setMaterials(mtl);
			obj_loader.load('../models/farola/farola.obj', (root) =>{
				root.scale.set(2,1,2);
				root.translateY(1);
				this.add(root);
			});
		});

		this.luz = new THREE.PointLight( 0xffb700, 0.7, 500 );
		this.luz.position.set( 0, 3, 0 );
		this.luz.castShadow = true;

		this.add(this.luz)
	}
}

export { Farola }
