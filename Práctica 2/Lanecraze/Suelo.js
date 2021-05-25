import * as THREE from '../libs/three.module.js'

import {TipoSuelo} from './TipoSuelo.js'

class Suelo extends THREE.Object3D {
	constructor(v_gen) {
		super();
		this.casillas_ancho = 10;
		this.casillas_largo = this.casillas_ancho * 3;
		this.ancho = this.casillas_ancho * 15;
		this.largo = this.casillas_largo * 15;

		this.crearMateriales();

		this.crearTableroVirtual(v_gen);
		this.crearTableroFisico();

		// El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
		this.ground.position.y = -0.1;

		this.add (this.ground);
	}

	crearMateriales() {
		var loader = new THREE.TextureLoader();

		const grass_texture = loader.load('../imgs/grass-texture.jpg');
		grass_texture.wrapS = grass_texture.wrapT = THREE.RepeatWrapping;
		grass_texture.repeat.set(10,1);
		this.grass_material = new THREE.MeshPhongMaterial ({map: grass_texture});

		const water_texture = loader.load('../imgs/water-texture.gif');
		water_texture.wrapS = grass_texture.wrapT = THREE.RepeatWrapping;
		water_texture.repeat.set(10,1);
		this.water_material = new THREE.MeshPhongMaterial ({map: water_texture});

		const road_texture = loader.load('../imgs/road-texture.jpg');
		road_texture.wrapS = road_texture.wrapT = THREE.RepeatWrapping;
		road_texture.repeat.set(10,1);
		this.road_material = new THREE.MeshPhongMaterial ({map: road_texture});
	}

	crearTableroVirtual(v_gen) {
		this.tablero_virtual = new Array(this.casillas_largo);
		for(var i = 0; i < this.casillas_largo; i++){
			this.tablero_virtual[i] = new TipoSuelo();
		}

		var indice = 0;
		for(var i = 0; i < v_gen.length; i++){
			for (var j = 0; j < v_gen[i].x; j++){
				this.tablero_virtual[indice].setTipo(v_gen[i].y);
				indice++;
			}
		}
	}

	crearTableroFisico(){
		this.ground = new THREE.Object3D();
		var offset = this.largo/2;
		for(var i = 0; i < this.casillas_largo; i++) {
			var geometryGround = new THREE.BoxGeometry (this.ancho,0.2,15);
			switch (this.tablero_virtual[i].getTipo()) {
				case 0:
					var fila = new THREE.Mesh(geometryGround, this.grass_material);
					fila.position.z = offset;

					this.ground.add(fila);
				break;

				case 1:
					var fila = new THREE.Mesh(geometryGround, this.road_material);
					fila.position.z = offset;
					this.ground.add(fila);
				break;

				case 2:
					var fila = new THREE.Mesh(geometryGround, this.water_material);
					fila.position.z = offset;
					this.ground.add(fila);
				break;

				default:
					var fila = new THREE.Mesh(geometryGround, this.grass_material);
					fila.position.z = offset;

					this.ground.add(fila);
			}
			offset -= 15;
		}

	}

	getAncho() {
		return this.ancho;
	}

	getLargo(){
		return this.largo;
	}

	inBounds(coord) {
		var in_bounds = true;

		/*Está fuera del borde si se pasa this.ancho/2 a la derecha o izquierda porque
		el tablero está centrado a lo ancho en el origen
		*/
		if(coord.x < -this.ancho/2 || coord.x > this.ancho/2)
			in_bounds = false;

		/* Estará fuera del tablero si coord.z es mayor que 0, porque vamos en sentido del ejeZ negativo
		o si coord.z es menor que this.largo, porque matemáticas
		*/
		if (coord.z > 0 || coord.z < -this.largo)
			in_bounds = false;

		return in_bounds;
	}
}

export { Suelo }
