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

		this.block = 15;
		this.ancho = this.suelo.getAncho()/15;
		this.largo = this.suelo.getLargo()/15;

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
		/*Posicionar:
			1.Tomamos el ancho del tablero y lo dividimos en mitades
			2.Generamos un número aleatorio del entre -ancho_bloques y +ancho_bloques
			3.Para traducir el num_aleatorio a una posición, lo trasladamos multiplicando por el tamaño de bloque,
				y luego le quitamos medio bloque para dejarlo centrado
		*/
		var ancho_bloques = (this.ancho/2) - 1;

		var num_aleatorio = Math.round(Math.random() * (ancho_bloques - (ancho_bloques*-1)) + (ancho_bloques*-1));
		console.log(num_aleatorio);
		var posicion = num_aleatorio * (this.block) - (this.block/2);

		/*if(num_aleatorio == -5){
			posicion += this.block;
		}

		if(num_aleatorio == 5){
			posicion -= this.block;
		}*/

		return posicion;
	}

	generaArboles(){
		this.arboles = [];
		this.arbustos = [];

		this.num_arboles = 0;
		this.num_arbustos = 0;


		var tablero = [];
		tablero = this.suelo.getTableroVirtual();


		for(var i=2; i<this.largo; i++){
			if(tablero[i].getTipo() == 0){
				//Se define el número de obstáculos permitidos en cada fila: un 10% de las casillas de la fila, mas o menos 1.
				//El | 0 se añade para que quede un número entero.
				var num_obstaculos = ((this.ancho * 0.1) | 0) + (Math.random() < 0.5 ? 0 : 1);

				for(var j=0; j<num_obstaculos ; j++){

					//Generador aleatorio de 1 o 0
					//1 = arbol, 0=arbusto
					if(Math.round(Math.random()) == 0){
						this.arboles[this.num_arboles] = new Arbol(2);

						var posicion = this.posicionAleatoriaX();
						this.arboles[this.num_arboles].position.set(posicion, 0,-i*(this.block));

						this.add(this.arboles[this.num_arboles]);
						this.num_arboles++;

					} else{
						this.arbustos[this.num_arbustos] = new Arbol(1);

						var posicion = this.posicionAleatoriaX();
						this.arbustos[this.num_arbustos].position.set(posicion, 0,-i*this.block);

						this.add(this.arbustos[this.num_arbustos]);
						this.num_arbustos++;
					}
				}
			}
		}
	}

	/*generaCoches(){

	}*/

	inBounds(coord) {
		return this.suelo.inBounds(coord);
	}

	/*isWater(coord) {
		var tablero = this.suelo.getTableroVirtual();

		return (tablero[Math.abs(Math.round(coord)/15)].getTipo() == 2);
	}*/

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
