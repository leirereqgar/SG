class TipoSuelo {
	constructor() {
		this.tipo = 0; // 0 =>grass, 1=>road, 2=>water
	}

	getTipo(){
		return this.tipo;
	}

	setTipo(t) {
		this.tipo = t;
	}
}

export { TipoSuelo }
