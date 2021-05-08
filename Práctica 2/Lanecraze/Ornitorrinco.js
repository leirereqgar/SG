import * as THREE from '../libs/three.module.js'


class Ornitorrinco extends THREE.Object3D {
	constructor(gui,titleGui) {
		super();

		this.a_cuerpo = 7;
		this.l_cuerpo = 5;
		this.h_cuerpo = 15;
		this.a_pico   = 4;
		this.l_pico   = 3;
		this.h_pico   = 1;

		// Se crea la parte de la interfaz que corresponde a la Ornitorrinco
		// Se crea primero porque otros métodos usan las variables que se definen para la interfaz
		this.createGUI(gui,titleGui);

		this.crearMateriales();

		this.crearCuerpo();
		this.crearCola();
		this.crearPatas();

		this.add(this.cuerpo);
		this.add(this.cola);
		this.add(this.pata_del_izq);
		this.add(this.pata_del_der);
		this.add(this.pata_tras_izq);
		this.add(this.pata_tras_der);
	}

	crearMateriales() {
		this.verde   = new THREE.MeshPhongMaterial({color:0x00b1b1});
		this.naranja = new THREE.MeshPhongMaterial({color:0xfcb034});
		this.marron  = new THREE.MeshPhongMaterial({color:0x69321e});
	}

	crearCuerpo (){
		this.cuerpo = new THREE.Object3D();

		var geom = new THREE.BoxGeometry(this.a_cuerpo, this.l_cuerpo, this.h_cuerpo);
		this.torax = new THREE.Mesh(geom,this.verde);
		this.cuerpo.add(this.torax);

		var geom_pico = new THREE.BoxGeometry(this.a_pico, this.h_pico, this.l_pico);
		this.pico = new THREE.Mesh(geom_pico, this.naranja);
		this.pico.geometry.translate(0,-1,9);
		this.cuerpo.add(this.pico);

		var geom_ojo = new THREE.BoxGeometry(1, 1, 1);
		var parte_blanca = new THREE.Mesh(geom_ojo);
		var pupila = new THREE.Mesh(geom_ojo, this.marron);
		pupila.position.x = 1;
		this.ojo_derecho = new THREE.Object3D();
		this.ojo_derecho.add(parte_blanca);
		this.ojo_derecho.add(pupila);
		this.ojo_derecho.position.x = 1.5;
		this.ojo_derecho.position.y = 1.25;
		this.ojo_derecho.position.z = 7.5;
		this.cuerpo.add(this.ojo_derecho);

		var parte_blanca_i = new THREE.Mesh(geom_ojo);
		var pupila_i = new THREE.Mesh(geom_ojo, this.marron);
		pupila_i.position.x = -1;
		this.ojo_izquierdo = new THREE.Object3D();
		this.ojo_izquierdo.add(parte_blanca_i);
		this.ojo_izquierdo.add(pupila_i);
		this.ojo_izquierdo.position.x = -1.5;
		this.ojo_izquierdo.position.y = 1.25;
		this.ojo_izquierdo.position.z = 7.5;
		this.cuerpo.add(this.ojo_izquierdo);
	}

	crearCola() {
		var puntos = [];
		puntos.push (new THREE.Vector3 (0, 0, 0));
		puntos.push (new THREE.Vector3 (1, 0, 0));
		puntos.push (new THREE.Vector3 (2, 3, 0));
		puntos.push (new THREE.Vector3 (1.25, 5, 0));
		puntos.push (new THREE.Vector3 (-1.25, 5, 0));
		puntos.push (new THREE.Vector3 (-2, 3, 0));
		puntos.push (new THREE.Vector3 (-1, 0, 0));
		puntos.push (new THREE.Vector3 (0, 0, 0))

		var forma_cola = new THREE.Shape(puntos);

		var extrudeSettings =  { depth: 0.5, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 0.5, bevelOffset: 0, bevelThickness: 0.1 };
		var geom_cola = new THREE.ExtrudeGeometry(forma_cola, extrudeSettings);
		this.cola = new THREE.Mesh(geom_cola, this.naranja);
		this.cola.position.z = -8;
	}

	crearPatas() {
		var geom_pata = new THREE.CylinderGeometry(1, 0.5, 2, 4);
		geom_pata.translate(0,-3,0);
		var pata = new THREE.Mesh(geom_pata, this.naranja);

		this.pata_del_izq = pata.clone();
		this.pata_del_izq.position.x = 1.75
		this.pata_del_izq.position.z = 5.5;

		this.pata_del_der = pata.clone();
		this.pata_del_der.position.x = -1.75
		this.pata_del_der.position.z = 5.5;

		this.pata_tras_izq = pata.clone();
		this.pata_tras_izq.position.x = 1.75
		this.pata_tras_izq.position.z = -5.5;

		this.pata_tras_der = pata.clone();
		this.pata_tras_der.position.x = -1.75
		this.pata_tras_der.position.z = -5.5;
	}


	createGUI (gui,titleGui) {
	}


	update () {
		this.cola.rotation.x = (1 - Math.sin(Date.now()/100)) * 0.5 -Math.PI/2;
		this.pata_del_izq.rotation.x = (1 + Math.sin(Date.now()/100)) * 0.2;
		this.pata_tras_izq.rotation.x = (1 + Math.sin(Date.now()/100)) * 0.2;

		this.pata_del_der.rotation.x = (1 - Math.sin(Date.now()/100)) * 0.2;
		this.pata_tras_der.rotation.x = (1 - Math.sin(Date.now()/100)) * 0.2;
	}
}

export { Ornitorrinco }
