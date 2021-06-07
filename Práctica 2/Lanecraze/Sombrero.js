import * as THREE from '../libs/three.module.js'
import { OBJLoader } from '../libs/OBJLoader.js'
import { MTLLoader } from '../libs/MTLLoader.js'

class Sombrero extends THREE.Object3D {
	constructor(tipo) {
		super();
		this.anchura = 4;

		switch(tipo) {
			case "fedora":
				this.crearFedora();
			break;
			case "gorra":
				this.crearGorra();
			break;
			case "sombrero_copa":
				this.crearSombreroCopa();
			break;
		}

		this.add(this.sombrero);
	}

	crearFedora(){
		const obj_loader = new OBJLoader();
		const mtl_loader = new MTLLoader();

		mtl_loader.load('../models/fedora/fedora.mtl', (mtl)=>{
			mtl.preload();
			obj_loader.setMaterials(mtl);
			obj_loader.load('../models/fedora/fedora.obj', (root) =>{
				root.scale.set(4,4,4);
				root.translateY(1);
				this.add(root);
			});
		});
	}

	crearGorra(){
		const obj_loader = new OBJLoader();
		const mtl_loader = new MTLLoader();

		mtl_loader.load('../models/gorra/cap.mtl', (mtl)=>{
			mtl.preload();
			obj_loader.setMaterials(mtl);
			obj_loader.load('../models/gorra/cap.obj', (root) =>{
				root.scale.set(1,1,1);
				root.translateY(1);
				this.add(root);
			});
		});
	}

	crearSombreroCopa(){
		const obj_loader = new OBJLoader();
		const mtl_loader = new MTLLoader();

		mtl_loader.load('../models/s_copa/s_copa.mtl', (mtl)=>{
			mtl.preload();
			obj_loader.setMaterials(mtl);
			obj_loader.load('../models/s_copa/s_copa.obj', (root) =>{
				root.scale.set(0.1,0.1,0.1);
				root.translateY(1);
				this.add(root);
			});
		});
	}

	getAnchura(){
		return this.anchura;
	}
}

export{ Sombrero }
