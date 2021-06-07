import * as THREE from '../libs/three.module.js'


class Scoreboard extends THREE.Object3D {
	constructor(win, lose) {
		super();

		this.win = win;
		this.lose = lose;

		this.blanco  = new THREE.MeshPhongMaterial({color:0xffffff});

		this.crearScoreboard(this.win, this.lose);
	}

	crearScoreboard(win, lose){
		var that = this;
		var loader = new THREE.FontLoader();

		loader.load('../fonts/SigmarOne_Regular.json', function ( font ) {
			var size = 2;

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


			var scoreboard = new THREE.Mesh(geometry, that.blanco);
			that.add(scoreboard);
		});
	}
}


export { Scoreboard }
