import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

class Recorrido extends THREE.Object3D {
	constructor() {
		super();

		this.definirCurvas();
		this.add(this.curva_derecha);
		this.add(this.curva_izquierda);

		this.crearNave();
		this.add(this.nave);

		var origen  = {p:0};
		var destino = {p:1};
		var that = this;

		this.mov_derecha = new TWEEN.Tween(origen)
			.to(destino, 4000) // 4 segundos en el bucle derecho
			.easing(TWEEN.Easing.Quartic.InOut)
			.onUpdate(function () {
				var t = origen.p;
				var posicion = that.path_derecho.getPointAt(t);
				that.nave.position.copy(posicion);
				var tangente = that.path_derecho.getTangentAt(t);
				posicion.add(tangente);
				that.nave.lookAt(posicion);
			})
			.onComplete(function() {
				origen.p = 0;
			})
			.start();

		this.mov_izquierda = new TWEEN.Tween(origen)
			.to(destino, 8000) // 8 segundos
			.easing(TWEEN.Easing.Quartic.InOut)
			.onUpdate(function () {
				var t = origen.p;
				var posicion = that.path_izquierdo.getPointAt(t);
				that.nave.position.copy(posicion);
				var tangente = that.path_izquierdo.getTangentAt(t);
				posicion.add(tangente);
				that.nave.lookAt(posicion);
			})
			.onComplete(function() {
				origen.p = 0;
			})
			.start();

		this.mov_derecha.chain(this.mov_izquierda);
		this.mov_izquierda.chain(this.mov_derecha);
	}

	definirCurvas() {
		var material = new THREE.LineBasicMaterial( {color : 0xff0000} );

		this.path_derecho = new THREE.CatmullRomCurve3 ([
			new THREE.Vector3 (0,0,0),
			new THREE.Vector3 (13,1,10),
			new THREE.Vector3 (16,3,13),
			new THREE.Vector3 (20,5,13),
			new THREE.Vector3 (24,7,13),
			new THREE.Vector3 (25,12,10),
			new THREE.Vector3 (26,12,0),
			new THREE.Vector3 (24,7,-13),
			new THREE.Vector3 (20,5,-13),
			new THREE.Vector3 (16,3,-12),
			new THREE.Vector3 (13,1,-10),
			new THREE.Vector3 (0,0,0)
		]);
		var geom_derecha = new THREE.Geometry();
		geom_derecha.vertices = this.path_derecho.getPoints(100);
		this.curva_derecha = new THREE.Line(geom_derecha, material);

		this.path_izquierdo = new THREE.CatmullRomCurve3 ([
			new THREE.Vector3 (0,0,0),
			new THREE.Vector3 (-13,0,13),
			new THREE.Vector3 (-13,0,13),
			new THREE.Vector3 (-20,0,15),
			new THREE.Vector3 (-24,0,13),
			new THREE.Vector3 (-25,0,10),
			new THREE.Vector3 (-26,0,0),
			new THREE.Vector3 (-24,0,-13),
			new THREE.Vector3 (-20,0,-15),
			new THREE.Vector3 (-13,0,-13),
			new THREE.Vector3 (-13,0,-13),
			new THREE.Vector3 (0,0,0)
		]);
		var geom_izquierda = new THREE.Geometry();
		geom_izquierda.vertices = this.path_izquierdo.getPoints(100);
		this.curva_izquierda = new THREE.Line(geom_izquierda, material);
	}

	crearNave() {
		this.cono = new THREE.Mesh(new THREE.ConeGeometry(0.5, 3.0, 10), new THREE.MeshPhongMaterial( {color : 0x00CF00} ));
		this.cono.rotation.x = Math.PI/2;

		this.nave = new THREE.Object3D();
		this.nave.add(this.cono);

		this.nave;
	}

	update () {
		TWEEN.update();
	}
}

export { Recorrido }
