class TipoSuelo {
	constructor() {
		this.tipo = 0; // 0 =>grass, 1=>road, 2=>water
		this.obstaculo = false; //false=>libre, true=>hay un obstáculo
	}

	getTipo(){
		return this.tipo;
	}

	getObstaculo(){
		return this.obstaculo;
	}

	setTipo(t) {
		this.tipo = t;
	}

	setObstaculo(o){
		this.obstaculo = o;
	}
}

export { TipoSuelo }
