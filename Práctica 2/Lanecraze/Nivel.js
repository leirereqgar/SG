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

class Nivel extends THREE.Object3D {
	constructor() {
		super();

		const block = 15;
		const ancho = 20;
		const largo = 60;

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

		/*var arbol = new Arbol(2);
		arbol.position.set(-30+15/2,0,-30);

		var arbusto = new Arbol(2);
		arbusto.position.set(30+15/2,0,-30);*/

		this.generaArboles()

		this.obstaculos = new Array();

		for(var k=0; k<this.num_arboles; k++ ){
			this.obstaculos.push(this.arboles[k]);
		}

		for(var l=0; l<this.num_arbustos; l++ ){
			this.obstaculos.push(this.arbustos[l]);
		}


		/*this.obstaculos.push(arbol);
		this.obstaculos.push(arbusto);
		this.add(arbol);
		this.add(arbusto);*/

	}

	posicionAleatoriaX(){
		const ancho = 20;
		const block = 15;
		/*Posicionar:
			1.Tomamos el ancho del tablero y lo dividimos entre 2 (ya que una mitad es x positiva y la otra x negativa)
			2.Generamos un número aleatorio del 0 al 10 y hacemos módulo del número anterior. Esta será la "casilla" de x
			3.Para traducir la casilla a una posición, lo trasladamos multiplicando por el tamaño de bloque entre 2 (el centro)
			4.Finalmente, aleatorizamos si la posición será positiva o negativa con el operador terciario
		*/

		var ancho_posible = (ancho / 2) - 1;
		var casilla  = (Math.random() * 10) % ancho_posible;
		var posicion = (casilla * block/2 ) * (Math.random() < 0.5 ? -1 : 1);

		return posicion;
	}

	generaArboles(){
		const block = 15;
		const ancho = 20;
		const largo = 60;

		this.arboles = [];
		this.arbustos = [];

		this.num_arboles = 0;
		this.num_arbustos = 0;

		for(var i=3; i<largo; i++){
			if(this.suelo.getTipo() == 0){
				//Se define el número de obstáculos permitidos en cada fila: un 5% de las casillas de la fila, mas o menos 1.
				//El | 0 se añade para que quede un número entero.
				var num_obstaculos = ((ancho * 0.05) | 0) + (Math.random() < 0.5 ? -1 : 1);

				for(var j=0; j<num_obstaculos ; j++){

					//Generador aleatorio de 1 o 0
					//1 = arbol, 0=arbusto
					if(Math.round(Math.random()) == 0){
						this.arboles[this.num_arboles] = new Arbol(2);

						var posicion = this.posicionAleatoriaX();
						this.arboles[this.num_arboles].position.set(posicion, 0,-i*block/2);

						this.num_arboles++;

					} else{
						this.arbustos[this.num_arbustos] = new Arbol(1);

						var posicion = this.posicionAleatoriaX();
						this.arbustos[this.num_arbustos].position.set(posicion, 0,-i*block/2);

						this.num_arbustos++;
					}
				}

				for(var k=0; k<this.num_arboles; k++ ){
					this.add(this.arboles[k]);
				}

				for(var l=0; l<this.num_arbustos; l++ ){
					this.add(this.arbustos[l]);
				}
			}
		}
	}

	/*generaCoches(){

	}*/

	inBounds(coord) {
		return this.suelo.inBounds(coord);
	}

	intersect(nueva_pos){
		var colision = false;

		var caja_pj = new THREE.Box3().setFromCenterAndSize(nueva_pos, new THREE.Vector3(15/2,15/2,15/2));

		for(var i = 0; i < this.obstaculos.length && !colision; i++){
			var caja_obs = new THREE.Box3().setFromObject(this.obstaculos[i]);

			colision = caja_pj.intersectsBox(caja_obs);
		}

		return colision;
	}
}

export { Nivel }
