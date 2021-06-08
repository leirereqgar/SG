// BIBLIOTECAS
import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
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

class Nivel extends THREE.Object3D {
	constructor(v_gen, sombrero) {
		super();

		//Vector de generación para el suelo del tablero

		this.suelo = new Suelo(v_gen);
		this.suelo.position.set(0,0, -this.suelo.getLargo()/2);
		this.add(this.suelo);

		this.block = 15;
		this.ancho = this.suelo.getAncho()/15;
		this.largo = this.suelo.getLargo()/15;

		this.generaArboles();
		this.generaNenufares();
		this.generaCoches();

		this.obstaculos = new Array();

		for(var k=0; k<this.num_arboles; k++ ){
			this.obstaculos.push(this.arboles[k]);
		}

		for(var l=0; l<this.num_arbustos; l++ ){
			this.obstaculos.push(this.arbustos[l]);
		}


		this.sombrero = new Sombrero(sombrero);
		this.sombrero.position.set(this.sombrero.getAnchura()/2+7.5, 3, -this.suelo.getLargo()+30);
		this.add(this.sombrero);
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
		//console.log(num_aleatorio);
		var posicion = num_aleatorio * (this.block) - (this.block/2);

		return posicion;
	}

	generaArboles(){
		this.arboles = [];
		this.arbustos = [];

		this.num_arboles = 0;
		this.num_arbustos = 0;


		var tablero = [];
		tablero = this.suelo.getTableroVirtual();


		for(var i=2; i<this.largo-3; i++){
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

	generaCoches(){
		this.coches = [];
		this.num_coches = 0;

		this.coches_hitbox = [];

		var that = this;

		var tablero = [];
		tablero = this.suelo.getTableroVirtual();

		for(var i=2; i<this.largo-3; i++){
			if(tablero[i].getTipo() == 1){

				var direccion = (Math.random() < 0.5 ? "IZDA" : "DCHA");

				this.coches[this.num_coches] = new Coche(Math.random() < 0.5 ? 1 : 2);

				if(direccion == "IZDA"){
					this.coches[this.num_coches].position.x = -4 * (this.block) - (this.block/2);
					var box = new THREE.Box3().setFromObject(this.coches[this.num_coches]);
					this.coches_hitbox.push(box);
				}

				if(direccion == "DCHA"){
					this.coches[this.num_coches].position.x = 4 * (this.block) - (this.block/2);
					this.coches[this.num_coches].position.x = -4 * (this.block) - (this.block/2);
					var box = new THREE.Box3().setFromObject(this.coches[this.num_coches]);
					this.coches_hitbox.push(box);
				}

					this.coches[this.num_coches].position.z = -i*(this.block);

				this.add(this.coches[this.num_coches]);

				this.num_coches++;

			}
		}
	}

	generaNenufares() {
		this.nenufares = [];
		this.num_nenufares = 0;

		var tablero = this.suelo.getTableroVirtual();


		for(var i=4; i<this.largo-5; i++){
			if(tablero[i].getTipo() == 2){

				const num_nenufares_actuales = Math.random() * (11 - 7) + 7;

				for(let n=0; n<num_nenufares_actuales ; n++){
					const pos_nuevo_nenufar = ~~(Math.random() * 10);

					this.nenufares[this.num_nenufares] = new Nenufar();

					var posicion = this.posicionAleatoriaX();
					this.nenufares[this.num_nenufares].position.set(posicion, 0,-i*(this.block));

					this.add(this.nenufares[this.num_nenufares]);
					this.num_nenufares++;
				}
			}
		}
	}

	inBounds(coord) {
		return this.suelo.inBounds(coord);
	}

	isWater(coord) {
		var agua = false;
		var tablero = this.suelo.getTableroVirtual();

		if(tablero[Math.abs(Math.round(coord.z)/this.suelo.getBloque())].getTipo() == 2) {
			var colision = false;

			var caja_pj = new THREE.Box3().setFromCenterAndSize(coord,
				                  new THREE.Vector3(15/2,15/2,15/2));

			for(var i = 0; i < this.nenufares.length && !colision; i++){
				//console.log(this.obstaculos[i].position)
				var caja_obs = new THREE.Box3().setFromObject(this.nenufares[i]);

				colision = caja_pj.intersectsBox(caja_obs);
			}

			agua = !colision;
		}

		return agua;
	}

	intersect(nueva_pos){
		var colision = false;
		var tablero = this.suelo.getTableroVirtual();

		if(tablero[Math.abs(Math.round(nueva_pos.z)/this.suelo.getBloque())].getTipo() == 0) {
			var caja_pj = new THREE.Box3().setFromCenterAndSize(nueva_pos,
				                  new THREE.Vector3(15/2,15/2,15/2));

			for(var i = 0; i < this.obstaculos.length && !colision; i++){
				var caja_obs = new THREE.Box3().setFromObject(this.obstaculos[i]);

				colision = caja_pj.intersectsBox(caja_obs);
			}
		}

		return colision;
	}

	colisionCoche(pos){
		var colision = false;
		var tablero = this.suelo.getTableroVirtual();

		if(tablero[Math.abs(Math.round(pos.z)/this.suelo.getBloque())].getTipo() == 1) {
			var caja_pj = new THREE.Box3().setFromCenterAndSize(pos,
				                  new THREE.Vector3(15/2,15/2,15/2));

			for(var i = 0; i < this.coches.length && !colision; i++){
				var caja_obs = new THREE.Box3().setFromObject(this.coches[i]);
				colision = caja_pj.intersectsBox(caja_obs);
			}

		}

		return colision;
	}

	meta(pj) {
		var caja_pj = new THREE.Box3().setFromObject(pj);
		var caja_sombrero = new THREE.Box3().setFromObject(this.sombrero);

		return caja_pj.intersectsBox(caja_sombrero);
	}

	update(){
		for(var i=0; i<this.num_coches; i++){
			var velocidad = 1 / this.coches[i].getLargo();
			var bonus = this.coches[i].getVelocidad();

			this.coches[i].position.x = Math.sin(Date.now() * 0.001 * velocidad + bonus) * Math.PI * 20;
		}
	}
}

export { Nivel }
