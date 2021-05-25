// BIBLIOTECAS
import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'

import { Suelo } from './Suelo.js'

class Nivel extends THREE.Object3D {
	constructor() {
		super();

		//Vector de generación para el suelo del tablero
		var v_gen = new Array(3);
		v_gen[0] = new THREE.Vector2(10,0);
		v_gen[1] = new THREE.Vector2(10,1);
		v_gen[2] = new THREE.Vector2(10,2);

		this.suelo = new Suelo(v_gen);
		this.suelo.position.set(0,0, -this.suelo.getLargo()/2);
		this.add(this.suelo);
	}

	inBounds(coord) {
		return this.suelo.inBounds(coord);
	}
}

export { Nivel }
