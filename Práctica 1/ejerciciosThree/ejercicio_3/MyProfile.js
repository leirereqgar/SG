import * as THREE from '../libs/three.module.js'

class MyProfile extends THREE.Object3D {
	constructor(gui,titleGui) {
		super();

		this.createGUI(gui,titleGui);

		var material = new THREE.MeshNormalMaterial();

		var points = [];

		points.push (new THREE.Vector3 (0, 0, 0));
		points.push (new THREE.Vector3 (1.22, 0, 0));
		points.push (new THREE.Vector3 (1.2, 0.5, 0));
		points.push (new THREE.Vector3 (0.8, 0.8, 0));
		points.push (new THREE.Vector3 (0.4, 1, 0));
		points.push (new THREE.Vector3 (0.2, 1.8, 0));
		points.push (new THREE.Vector3 (0.2, 2.2, 0));
		points.push (new THREE.Vector3 (0.4, 2.4, 0));
		points.push (new THREE.Vector3 (0.4, 2.8, 0));
		points.push (new THREE.Vector3 (0.2, 2.9, 0));
		points.push (new THREE.Vector3 (0, 2.95, 0));


		var revObject = new THREE.Mesh ( new THREE.LatheGeometry (points), material);
		var revObject2 = new THREE.Mesh ( new THREE.LatheGeometry (points), material);

		var lineGeometry = new THREE.Geometry();
		lineGeometry.vertices = points;
		var line = new THREE.Line (lineGeometry, material);

		this.add(revObject);
		this.add(revObject2);
		this.add(line);

		line.position.set(-5,0,0);
		revObject2.position.set(5,0,0);
	}

	createGUI (gui,titleGui) {
		this.guiControls = new function () {
			this.sizeX = 1.0;
			this.sizeY = 1.0;
			this.sizeZ = 1.0;

			this.rotX = 0.0;
			this.rotY = 0.0;
			this.rotZ = 0.0;

			this.posX = 0.0;
			this.posY = 0.0;
			this.posZ = 0.0;

			this.reset = function () {
				this.sizeX = 1.0;
				this.sizeY = 1.0;
				this.sizeZ = 1.0;

				this.rotX = 0.0;
				this.rotY = 0.0;
				this.rotZ = 0.0;

				this.posX = 0.0;
				this.posY = 0.0;
				this.posZ = 0.0;
			}
		}

		var folder = gui.addFolder (titleGui);

		folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name ('Tamaño X : ').listen();
		folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name ('Tamaño Y : ').listen();
		folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name ('Tamaño Z : ').listen();

		folder.add (this.guiControls, 'rotX', 0.0, Math.PI/2, 0.1).name ('Rotación X : ').listen();
		folder.add (this.guiControls, 'rotY', 0.0, Math.PI/2, 0.1).name ('Rotación Y : ').listen();
		folder.add (this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.1).name ('Rotación Z : ').listen();

		folder.add (this.guiControls, 'posX', -20.0, 20.0, 0.1).name ('Posición X : ').listen();
		folder.add (this.guiControls, 'posY', 0.0, 10.0, 0.1).name ('Posición Y : ').listen();
		folder.add (this.guiControls, 'posZ', -20.0, 20.0, 0.1).name ('Posición Z : ').listen();

		folder.add (this.guiControls, 'reset').name ('[ Reset ]');
	}

	update () {
		this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
		this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
		this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
	}
}

export { MyProfile };
