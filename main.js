// textContent ignora las etiquetas html en medio y obtiene el texto de los nodos padres e hijos
// inner text solo recibe el nodo padre
// innerTextdevuelve el texto visible contenido en un nodo, mientras que textContentdevuelve el texto completo . Por ejemplo, en el siguiente HTML <span>Hello <span style="display: none;">World</span></span>, innerTextdevolverá 'Hola', mientras textContentque devolverá 'Hola mundo'.
// Variable Btn buscar
const buscar = document.getElementById(`buscar`);

// Completar el combo
const listar_combo = item => {
	// Creando al fragment
	const fragment = document.createDocumentFragment();
	// Obteniendo el contenido del template
	const template = document.getElementById(`template_combo`).content;
	// Creando una variable donde va ir colocado todo la info <div class="container__input">
	const div = document.querySelector(`.container__input`);
	// Seleccionando el selelect que ESTA DENTRO DEL TEMPLATE

	const select_template = template.querySelector(`#option_perro`);
	// Añadiendole una clase al select dentro del template
	select_template.setAttribute(`class`, `option_cbo`);
	// Este forEach se encargara de recorrer el arreglo que le pasemos como parametro (en este caso un arreglo con la lista de perros);y cada vz va crear un option dentro del select y lo va agregar al template.
	// Recorriendo el parametro que nos pide la funcion
	item.forEach(element => {
		const option = document.createElement(`option`);
		option.setAttribute(`value`, element);
		option.textContent = element;
		select_template.appendChild(option);
		fragment.appendChild(template);
		div.appendChild(fragment);
	});
};

// LLamda de la Api para listar el cbo
const fechtCombo = async () => {
	try {
		const url = await fetch(`https://dog.ceo/api/breeds/list/all`);
		const data = await url.json();
		// Funcion para obtener un array con los perros
		const lista_perros = () => {
			// Variable donde almacenaremos el arreglo
			const arreglo = [];
			// Usando un  for in para recorrer data.message el cual contiene una lista de los perros
			for (const property in data.message) {
				// Agregnado cada vez que se recorre al arreglo vacio que hemos creado
				arreglo.push(`${property}`);
			}
			// Hacer que retorne la funcion el arreglo con la lista de los perros
			return arreglo;
		};
		// LLamando a la funcion lista combo para que nos muestre los options del cbo
		listar_combo(lista_perros());
	} catch (error) {
		console.log("Ocurrio un error conectando con la Api");
	}
};
// LLamando a la funcion fetch
fechtCombo();

// Accion click del boton buscar
buscar.addEventListener(`click`, () => {
	const select = document.getElementById(`option_perro`);
	fetch(`https://dog.ceo/api/breed/${select.value}/images/random`)
		.then(respuesta => respuesta.json())
		.then(respuesta => {
			const img = document.getElementById(`id_imagen_perro`);
			img.setAttribute(`class`, `img_perro`);
			img.setAttribute(`src`, `${respuesta.message}`);
			img.setAttribute(`alt`, `imagen de perro ${select.value}`);
		});
});
