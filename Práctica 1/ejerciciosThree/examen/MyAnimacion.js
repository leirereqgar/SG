import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'


class MyAnimacion extends THREE.Object3D {
	constructor() {
		super();

		this.definirRecorrido();
		this.add(this.curva_superior);
		this.add(this.curva_inferior);

		this.crearPacMan();
		this.add(this.pacman);
		this.abre = true;

		var origen = {p: 0};
		var destino = {p: 1};
		var that = this;

		this.mov_superior = new TWEEN.Tween(origen)
			.to(destino, 6000)
			.easing(TWEEN.Easing.Quartic.InOut)
			.onUpdate(function () {
				var t = origen.p;
				var posicion = that.path_superior.getPointAt(t);
				that.pacman.position.copy(posicion);
				var tangente = that.path_superior.getTangentAt(t);
				posicion.add(tangente);
				that.pacman.lookAt(posicion);
			})
			.onComplete(function() {
				origen.p = 0;
			})
			.start();

		this.mov_inferior = new TWEEN.Tween(origen)
			.to(destino, 4000)
			.easing(TWEEN.Easing.Quartic.InOut)
			.onUpdate(function () {
				var t = origen.p;
				var posicion = that.path_inferior.getPointAt(t);
				that.pacman.position.copy(posicion);
				var tangente = that.path_inferior.getTangentAt(t);
				posicion.add(tangente);
				that.pacman.lookAt(posicion);
			})
			.onComplete(function() {
				origen.p = 0;
			})
			.start();

		this.mov_superior.chain(this.mov_inferior);
		this.mov_inferior.chain(this.mov_superior);
	}

	definirRecorrido() {
		var m_linea = new THREE.LineBasicMaterial({color: 0xff0000});

		this.path_superior = new THREE.CatmullRomCurve3([
			new THREE.Vector3 (-2,0,0),
			new THREE.Vector3 (-2,0,-3),
			new THREE.Vector3 (-2,0,-5),
			new THREE.Vector3 (-1,0,-5),
			new THREE.Vector3 (3,0,-5),
			new THREE.Vector3 (4,0,-3),
			new THREE.Vector3 (4,0,-1),
			new THREE.Vector3 (3,0,0),
			new THREE.Vector3 (1,0,0)
		]);
		var geom_superior = new THREE.Geometry();
		geom_superior.vertices = this.path_superior.getPoints(100);
		this.curva_superior = new THREE.Line(geom_superior, m_linea);

		this.path_inferior = new THREE.CatmullRomCurve3([
			new THREE.Vector3 (1,0,0),
			new THREE.Vector3 (0.75,0,0),
			new THREE.Vector3 (1,0,1),
			new THREE.Vector3 (1,0,3),
			new THREE.Vector3 (1,0,5),
			new THREE.Vector3 (0,0,5),
			new THREE.Vector3 (-2,0,5),
			new THREE.Vector3 (-2.25,0,4),
			new THREE.Vector3 (-2,0,0),
		]);
		var geom_inferior = new THREE.Geometry();
		geom_inferior.vertices = this.path_inferior.getPoints(100);
		this.curva_inferior = new THREE.Line(geom_inferior, m_linea);
	}

	crearPacMan() {
		var m_amarillo = new THREE.MeshPhongMaterial({color: 0xffff00, side:THREE.DoubleSide});

		var cabeza = new THREE.SphereGeometry(1,20,20, Math.PI, Math.PI);
		var cabezaBSP = new ThreeBSP(cabeza);

		const ojo  = new THREE.CylinderGeometry(0.1, 0.1, 5, 20);
		ojo.translate(0.5 , 0, 0.5);
		ojo.rotateZ(Math.PI/2);
		ojo.rotateY(Math.PI);
		var ojoBSP = new ThreeBSP(ojo);

		var geom_cabeza = cabezaBSP.subtract(ojoBSP);

		this.cabeza_obj = geom_cabeza.toMesh(m_amarillo);
		this.cabeza_obj.geometry.computeFaceNormals();
		this.cabeza_obj.geometry.computeVertexNormals();

		var boca = new THREE.SphereGeometry(1,20,20, 0, Math.PI);
		var bocaBSP = new ThreeBSP(boca);
		this.boca_obj = bocaBSP.toMesh(m_amarillo);

		this.pacman = new THREE.Object3D();
		this.pacman.add(this.cabeza_obj);
		this.pacman.add(this.boca_obj);
	}

	update() {
		TWEEN.update();
		if(this.boca_obj.rotation.x < Math.PI/2 && this.abre){
			this.boca_obj.rotation.x = (this.boca_obj.rotation.x + 0.05);
			if(this.boca_obj.rotation.x >= Math.PI/2)
				this.abre = false;
		}
		else {
			this.boca_obj.rotation.x = (this.boca_obj.rotation.x - 0.05);
			if(this.boca_obj.rotation.x <= 0)
				this.abre = true;
		}
	}
}

export { MyAnimacion }
