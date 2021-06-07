// BIBLIOTECAS
import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'

import { Farola } from './Farola.js'
import { Sombrero } from './Sombrero.js'

import { Nivel } from './Nivel.js'

class NivelNoche extends Nivel {
	constructor(v_gen) {
		super(v_gen);

		this.crearFarolas();

		this.sombrero = new Sombrero("sombrero_copa");
		this.sombrero.position.set(this.sombrero.getAnchura()/2+7.5, 3, -this.suelo.getLargo()+30);
		this.add(this.sombrero);

	}

	crearFarolas() {
		for (var i = 1; i < this.suelo.getTableroVirtual().length; i+=3) {

			if(this.suelo.getTableroVirtual()[i].getTipo() == 0){
				var farola = new Farola();

				if (i%2 == 0){
					farola.position.set(37.5,0,-i*15);
				}

				else {
					farola.position.set(-37.5,0,-i*15);
				}

				this.obstaculos.push(farola);

				this.add(farola);
			}
		}
	}
}

export { NivelNoche }
