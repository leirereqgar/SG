import * as THREE from '../libs/three.module.js'


class Menu extends THREE.Object3D {
	constructor() {
		super();

		this.crearMateriales();
		this.crearFondo();
		this.crearTitulo();
		//this.crearScoreboard(0,0);

		this.add(this.fondo);
		//this.add(this.titulo);
	}

	crearMateriales(){
		this.blanco  = new THREE.MeshPhongMaterial({color:0xffffff});
		this.azul = new THREE.MeshPhongMaterial({color:0x5edcff});
	}

	crearFondo(){
		var fondo_geom = new THREE.PlaneGeometry( 500, 500 );
		this.fondo = new THREE.Mesh(fondo_geom, this.azul);
	}

	crearTitulo(){
		var that = this;
		var loader = new THREE.FontLoader();

		loader.load('../fonts/SigmarOne_Regular.json', function ( font ) {
			var size = 4;

			var geometry = new THREE.TextGeometry( 'LaneCraze', {
				font: font,
				size: size,
				height: size/5,
				curveSegments: 5,
				bevelEnabled: true,
				bevelThickness: size/5,
				bevelSize: size/200,
				bevelOffset: 0,
				bevelSegments: 2
			});

			var titulo = new THREE.Mesh(geometry, that.blanco);
			that.add(titulo);
		});
	}

	crearScoreboard(win, lose){
		var that = this;
		var loader = new THREE.FontLoader();

		var scoreboard = null;

		loader.load('../fonts/SigmarOne_Regular.json', function ( font ) {
			var size = 1;

			var geometry = new THREE.TextGeometry( 'Victorias: '+win+ ' Derrotas: ' +lose, {
				font: font,
				size: size,
				height: size/5,
				curveSegments: 5,
				bevelEnabled: false,
				bevelThickness: size/5,
				bevelSize: size/200,
				bevelOffset: 0,
				bevelSegments: 2
			});

			geometry.translate(0, -5, 0);

			var scoreboard = new THREE.Mesh(geometry, that.blanco);
			that.add(scoreboard);
		});
	}


}

export { Menu }
