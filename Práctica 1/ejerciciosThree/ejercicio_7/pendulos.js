import * as THREE from '../libs/three.module.js'

class Pendulos extends THREE.Object3D {
	constructor(gui, titleGui) {
		super();

		// Se crea la parte de la interfaz
		// Se crea primero porque otros métodos usan las variables que se definen para la interfaz
		this.createGUI(gui, titleGui);


		// Creación de la geometría del péndulo pequeño
		this.crearPenduloPequeño();

		// Creación de la geometría del péndulo grande
		this.crearPenduloGrande();

		this.pendulo_completo = new THREE.Object3D; //Los péndulos colgarán de este nodo
		this.pendulo_completo.add(this.p_pequeño);
		this.pendulo_completo.add(this.p_grande);

		// Y añadirlo como hijo del Object3D (el this)
		this.add(this.pendulo_completo);
	}

	crearPenduloPequeño() {
		this.pendulo_azul = new THREE.Mesh(new THREE.BoxGeometry(2.0, 10.0, 1.0),
		                                   new THREE.MeshPhongMaterial({color: "#0000ff"}));
		this.pendulo_azul.geometry.translate(0.0,-5.0,1.5);

		var contornoEje = new THREE.Shape();
		contornoEje.absarc(0, 0.25, 0.25, 0, 2 * Math.PI);
		var geomEje = new THREE.ExtrudeGeometry(contornoEje, {depth: 0.3, bevelEnabled: false});
		this.eje_p_azul = new THREE.Mesh(geomEje,
		                                 new THREE.MeshPhongMaterial({color: "#006600"}));
		this.eje_p_azul.geometry.translate(0,-0.25,2.0);

		// Formar nodos del modelo jerárquico
		this.p_pequeño_movil = new THREE.Object3D();
		this.p_pequeño_movil.translateY(1);
		this.p_pequeño_movil.add(this.pendulo_azul);
		this.p_pequeño = new THREE.Object3D();
		this.p_pequeño.add(this.p_pequeño_movil);
		this.p_pequeño.add(this.eje_p_azul);
	}

	crearPenduloGrande() {
		this.p_movil = new THREE.Mesh(new THREE.BoxGeometry(2, 5, 2),
		                                 new THREE.MeshPhongMaterial({color: "#ff0000"}));
		this.p_movil.geometry.translate(0, -2.5, 0);
		this.p_movil.translateY(-2);

		var g_partes_verdes = new THREE.BoxGeometry(2, 4, 2);
		var mat_verde = new THREE.MeshPhongMaterial({color: "#00ff00"});
		this.p_fija_sup = new THREE.Mesh(g_partes_verdes, mat_verde);
		this.p_fija_inf = new THREE.Mesh(g_partes_verdes, mat_verde);
		this.add(this.p_fija_inf);
		this.add(this.p_fija_sup);

		var contornoEje = new THREE.Shape();
		contornoEje.absarc(0, 0.7, 0.7, 0, 2 * Math.PI);
		var geomEje = new THREE.ExtrudeGeometry(contornoEje, {depth: 0.3, bevelEnabled: false});
		this.eje_p_grande = new THREE.Mesh(geomEje,
		                                   new THREE.MeshPhongMaterial({color: "#ffc0cb"}));
		this.eje_p_grande.geometry.translate(0, -0.7, 1);

		// Formar nodos del modelo jerárquico
		this.p_grande = new THREE.Object3D();
		this.p_grande.add(this.p_movil);
		this.p_grande.add(this.p_fija_sup);
		this.p_grande.add(this.p_fija_inf);
		this.p_grande.add(this.eje_p_grande);
	}

	createGUI(gui, titleGui) {
		this.guiControls = new function () {
			this.alt_rojo = 5.0;
			this.alfa = 0.0;

			this.alt_azul = 10.0;
			this.beta = 0.0;
			this.pos_azul = 10.0;

			// Un botón para dejarlo todo en su posición inicial
			// Cuando se pulse se ejecutará esta función.
			this.reset = function () {
				this.alt_rojo = 5.0;
				this.alfa = 0.0;

				this.alt_azul = 10.0;
				this.beta = 0.0;
				this.pos_azul = 10.0;
			}
		}

		// Carpetas
		var folder = gui.addFolder(titleGui);
		var folder1 = gui.addFolder("Péndulo grande");
		var folder2 = gui.addFolder("Péndulo pequeño");

		var that = this;
		folder1.add(this.guiControls, 'alt_rojo', 5.0, 10.0, 0.1).name('Longitud : ').listen();
		folder1.add(this.guiControls, 'alfa', -Math.PI/4.0, Math.PI/4.0, 0.1).name('Ángulo : ').listen();

		folder2.add(this.guiControls, 'alt_azul', 10.0, 20.0, 0.1).name('Longitud : ').listen();
		folder2.add(this.guiControls, 'beta', -Math.PI/4.0, Math.PI/4.0, 0.1).name('Ángulo : ').listen();
		folder2.add(this.guiControls, 'pos_azul', 10.0, 90.0, 1.0).name('Posicion (%) : ').listen();

		folder.add(this.guiControls, 'reset').name('[ Reset ]');
	}

	update() {
		// Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
		// Primero, el escalado
		// Segundo, la rotación en Z
		// Después, la rotación en Y
		// Luego, la rotación en X
		// Y por último la traslación
		this.p_movil.scale.y = this.guiControls.alt_rojo / 5.0; // Longitud del péndulo superior
		this.pendulo_completo.rotation.z = this.guiControls.alfa; // Oscilación del péndulo superior
		this.p_fija_inf.position.y = -this.guiControls.alt_rojo - 4.0;

		this.p_pequeño_movil.scale.y = this.guiControls.alt_azul / 10.0;  // Longitud del péndulo inferior
		this.p_pequeño.rotation.z = this.guiControls.beta; // Oscilación del péndulo inferior
		this.p_pequeño.position.y = - 2 - ((this.guiControls.pos_azul * this.guiControls.alt_rojo) / 100); // Posición del eje del péndulo inferior
	}
}

export { Pendulos }
