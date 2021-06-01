// BIBLIOTECAS
import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'

import { Suelo } from './Suelo.js'
import { Arbol } from './Arbol.js'
import { Ornitorrinco } from './Ornitorrinco.js'

class Nivel extends THREE.Object3D {
	constructor() {
		super();

		//Vector de generación para el suelo del tablero
		var v_gen = new Array(7);
		v_gen[0] = new THREE.Vector2(5,0);
		v_gen[1] = new THREE.Vector2(2,1);
		v_gen[2] = new THREE.Vector2(5,2);
		v_gen[3] = new THREE.Vector2(3,0);
		v_gen[4] = new THREE.Vector2(1,1);
		v_gen[5] = new THREE.Vector2(1,2);
		v_gen[6] = new THREE.Vector2(13,0);

		this.suelo = new Suelo(v_gen);
		this.suelo.position.set(0,0, -this.suelo.getLargo()/2);
		this.add(this.suelo);


		this.arbol = new Arbol(2);
		this.arbol.position.set(-30+15/2,0,-30);
		this.obstaculos = new Array();
		this.obstaculos.push(this.arbol);
		this.add(this.arbol);
	}

	inBounds(coord) {
		return this.suelo.inBounds(coord);
	}

	intersect(caja_pj){
		var colision = false;
		//var caja_pj = new THREE.Box3().setFromObject(pj);

		for(var i = 0; i < this.obstaculos.length; i++){
			var caja_obs = new THREE.Box3().setFromObject(this.obstaculos[i]);

			colision = caja_pj.intersectsBox(caja_obs);
		}

		return colision;
	}
}

export { Nivel }
