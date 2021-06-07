// BIBLIOTECAS
import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'

import { Suelo } from './Suelo.js'
import { TipoSuelo } from './TipoSuelo.js'
import { Arbol } from './Arbol.js'
import { Nenufar } from './Nenufar.js'
import { Coche } from './Coche.js'
import { Ornitorrinco } from './Ornitorrinco.js'
import { Sombrero } from './Sombrero.js'
import { Farola } from './Farola.js'

import { Nivel } from './Nivel.js'

class NivelNoche extends Nivel {
	constructor(v_gen) {
		super(v_gen);

		this.crearFarolas();

	}

	crearFarolas() {
		for (var i = 1; i < this.suelo.getTableroVirtual().length; i+=3) {
			var farola = new Farola();

			if (i%2 == 0){
				farola.position.set(30,0,-i*15);
			}

			else {
				farola.position.set(-30,0,-i*15);
			}

			this.add(farola);
		}
	}
}

export { NivelNoche }
