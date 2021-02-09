// Un fetch recibe dos parametros,
// uno obligatorio y uno optativo

// El parametro obligatorio es un string que representa una URL

// Si no pongo un segundo parametro JS asume que quiero hacer un GET

// GET
// Traerme informacion para que yo pueda leerla

const usuarioAModificar = (objData) => {
	return `

	<form id="form-modificar">
	<p><span data-id = ${objData.id}>${objData.id}</span></p>
    <input type="text" placeholder="Nombre completo" name="fullname" id="fullname-m" value="${objData.fullname}">
    <input type="email" placeholder="Email" name="email" id="email-m" value="${objData.email}">
    <input type="text" placeholder="Direccion" name="address" id="address-m" value="${objData.address}">
    <input type="text" placeholder="Telefono" name="phone" id="phone-m" value="${objData.phone}">

    <input type="submit" value="modificar usuario">
  </form>

  `


}


const modificarUser = (id) => {
	const fullname = document.querySelector("#fullname-m").value
	const address = document.querySelector("#address-m").value
	const phone = document.querySelector("#phone-m").value
	const email = document.querySelector("#email-m").value

	fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${id}`, {
		method: 'put',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			fullname: fullname,
			addres: address,
			phone: phone,
			email: email
		})
	})
		.then(res => res.json())
		.then(data => {
			obtenerUsuariosyHacerHTML()
		})
}

const obtenerUsuariosyHacerHTML = () => {
	fetch('https://601da02bbe5f340017a19d60.mockapi.io/users')
		.then(res => res.json())
		.then(data => {
			const lista = document.querySelector('ul');

			lista.innerHTML = ''
			data.map(usuario => {
				lista.innerHTML += `<li>
		${usuario.fullname}
		<button data-userId=${usuario.id}>Borrar</button>
		<button data-userId=${usuario.id} class="modificar">Modificar</button>
		</li>`;
			});
			const listaDeBotones = document.querySelectorAll('button');
			const listaDeBotonesModificar = document.querySelectorAll('.modificar')
			console.log(listaDeBotonesModificar)
			// tengo que usar forEach, en lugar de map, porque listaDeBotones es una lista de nodos
			// de HTML, que no se puede recorrer con map (pero si con forEach)
			listaDeBotones.forEach(boton => {
				boton.onclick = () => {
					const id = boton.dataset.userid;

					// DELETE
					// Borra informacion de la API
					fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${id}`, {
						method: 'delete',
					})
						.then(res => res.json())
						.then(usuarioBorrado => {

							// funcion recursiva (se llama a si misma, para hacer de nuevo el HTML)
							obtenerUsuariosyHacerHTML()
						});
				};
			});



			listaDeBotonesModificar.forEach(modificar => {

				modificar.onclick = () => {
					const modal = document.querySelector('.modal')
					const id = modificar.dataset.userid
					fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${id}`)
						.then(res => res.json())
						.then(data2 => {
							modal.innerHTML = usuarioAModificar(data2)
							const formularioModificar = document.querySelector('#form-modificar')
							formularioModificar.onsubmit = (e) => {
								e.preventDefault()
								modificarUser(id)
							}

						})
				}
			})

		});
};

obtenerUsuariosyHacerHTML();

const formulario = document.querySelector("form")

formulario.onsubmit = (e) => {
	e.preventDefault()

	const fullname = document.querySelector("#fullname").value
	const address = document.querySelector("#address").value
	const phone = document.querySelector("#phone").value
	const email = document.querySelector("#email").value
	// POST
	fetch('https://601da02bbe5f340017a19d60.mockapi.io/users', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			fullname: fullname,
			addres: address,
			phone: phone,
			email: email
		})
	})
		.then(res => res.json())
		.then(data => {
			obtenerUsuariosyHacerHTML()
		})
}
