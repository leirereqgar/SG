import * as THREE from '../libs/three.module.js'

class Cilindro extends THREE.Object3D {
	constructor(gui,titleGui) {
		super();

		// Se crea la parte de la interfaz que corresponde al Cono
		// Se crea primero porque otros métodos usan las variables que se definen para la interfaz
		this.createGUI(gui,titleGui);

		// El material se usa desde varios métodos. Por eso se alamacena en un atributo
		this.material = new THREE.MeshNormalMaterial();
		this.material.flatShading = true;
		this.material.needsUpdate = true;

		// Cada figura, un Mesh, está compuesto de una geometría y un material
		this.cilindro = new THREE.Mesh (new THREE.CylinderGeometry (1,1,1,3), this.material);
		this.cilindro.position.set(-10,5,0);

		// Al nodo  this, la Cono, se le cuelgan como hijos la base y la parte móvil
		this.add (this.cilindro);
	}

	createGUI (gui,titleGui) {
		// Controles para el movimiento de la parte móvil
		this.guiControls = new function () {
        this.radio_sup  = 1;
        this.radio_inf  = 1;
        this.altura     = 1;
        this.resolucion = 3;
      }

      var that = this;
      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder(titleGui);
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
      folder.add(this.guiControls, 'radio_sup', 1, 3, 0.1).name('Radio Superior: ').onChange(function () {
        that.cilindro.geometry = new THREE.CylinderGeometry(that.guiControls.radio_sup, that.guiControls.radio_inf, that.guiControls.altura, that.guiControls.resolucion);
      });
      folder.add(this.guiControls, 'radio_inf', 1, 3, 0.1).name('Radio Inferior: ').onChange(function () {
        that.cilindro.geometry = new THREE.CylinderGeometry(that.guiControls.radio_sup, that.guiControls.radio_inf, that.guiControls.altura, that.guiControls.resolucion);
      });
      folder.add(this.guiControls, 'altura', 1, 5, 0.1).name('Altura: ').onChange(function () {
        that.cilindro.geometry = new THREE.CylinderGeometry(that.guiControls.radio_sup, that.guiControls.radio_inf, that.guiControls.altura, that.guiControls.resolucion);
      });
      folder.add(this.guiControls, 'resolucion', 3, 20, 1).name('Resolucion: ').onChange(function () {
        that.cilindro.geometry = new THREE.CylinderGeometry(that.guiControls.radio_sup, that.guiControls.radio_inf, that.guiControls.altura, that.guiControls.resolucion);
      });
	}

	update () {
		this.cilindro.rotation.y += 0.03;
		this.cilindro.rotation.x += 0.03;
	}
}

export { Cilindro }
