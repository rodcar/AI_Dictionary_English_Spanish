const DICCIONARIO_URL = 'diccionario.json';

window.onload = () => {
	
	let conceptosView = document.getElementById('conceptos');
	let terminosDataList = document.getElementById('terminos');
	let buscadorView = document.getElementById('buscador');

	async function cargarConceptos() {
		let respuesta = await fetch(DICCIONARIO_URL);
		let conceptos = await respuesta.json();
		console.log(conceptos);
		console.log('El diccionario cargó');
		let conceptosUl = document.createElement('UL');
		conceptos.forEach(concepto => {
			mostrarConcepto(concepto);
			agregarConceptoBusqueda(concepto);
		});
		conceptosView.appendChild(conceptosUl);
	}

	function mostrarConcepto(concepto) {
		let liConcepto = document.createElement('LI');
		liConcepto.classList.add('concepto');
		liConcepto.id = concepto.concepto;

		let conceptoSpan = document.createElement('SPAN');
		conceptoSpan.classList.add('concepto-nombre');
		let conceptoNode = document.createTextNode(concepto.concepto);
		conceptoSpan.appendChild(conceptoNode);
		liConcepto.appendChild(conceptoSpan);

		let traduccionSpan = document.createElement('SPAN');
		traduccionSpan.classList.add('traduccion');
		let traduccionNode = document.createTextNode(`[${concepto.traduccion}]`);
		traduccionSpan.appendChild(traduccionNode);
		liConcepto.appendChild(traduccionSpan);

		let tipoSpan = document.createElement('SPAN');
		tipoSpan.classList.add('tipo');
		let tipoNode = document.createTextNode(`-${concepto.tipo}`);
		tipoSpan.appendChild(tipoNode);
		liConcepto.appendChild(tipoSpan);

		let simpleSpan = document.createElement('SPAN');
		simpleSpan.classList.add('simple');
		let simpleNode = document.createTextNode(concepto.simple);
		simpleSpan.appendChild(simpleNode);
		liConcepto.appendChild(simpleSpan);		

		let detalleSpan = document.createElement('SPAN');
		detalleSpan.classList.add('detalle');
		let detalleNode = document.createTextNode(concepto.detalle);
		detalleSpan.appendChild(detalleNode);
		liConcepto.appendChild(detalleSpan);			

		conceptosView.appendChild(liConcepto);
	}

	function agregarConceptoBusqueda(concepto) {
		let conceptoOption = document.createElement('OPTION');
		conceptoOption.value = concepto.concepto;
		let conceptoNode = document.createTextNode(concepto.concepto);
		conceptoOption.appendChild(conceptoNode);

		terminosDataList.appendChild(conceptoOption);
	}

	buscadorView.onchange = () => {
		let termino = buscadorView.value;
		window.location.hash = `#${termino}`;
		console.log(termino);
	};

	cargarConceptos();
};