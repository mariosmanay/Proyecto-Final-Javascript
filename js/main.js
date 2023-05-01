const usuarios = [{
    nombre: 'Mariano',
    mail: 'mariano@mail.com',
    pass: '123456'
}]

const figuritas = [{
    nombre: "Garfield",
    edad: "12",
    peso: "15",
    animal: "Gato",
    img: './img/garfield.webp',
    mensaje: "Agregar al carrito"
}, {
    nombre: "Oddie",
    edad: "1",
    peso: "8",
    animal: "Perro",
    img: './img/oddie.jpeg',
    mensaje: "Agregar al carrito"
}, {
    nombre: "Orson",
    edad: "9",
    peso: "40",
    animal: "Cerdo",
    img: './img/orson.webp',
    mensaje: "Agregar al carrito"
}, {
    nombre: "Roy",
    edad: "8",
    peso: "12",
    animal: "Gallo",
    img: './img/roy.webp',
    mensaje: "Agregar al carrito"
}]



const inputMailLogin = document.getElementById('emailLogin'),
    inputPassLogin = document.getElementById('passwordLogin'),
    checkRecordar = document.getElementById('recordarme'),
    btnLogin = document.getElementById('login'),
    modalEl = document.getElementById('modalLogin'),
    modal = new bootstrap.Modal(modalEl),
    contTarjetas = document.getElementById('tarjetas'),
    elementosToggleables = document.querySelectorAll('.toggeable');



function validarUsuario(usersDB, user, pass) {
    let encontrado = usersDB.find((userDB) => userDB.mail == user);
    console.log(encontrado)
    console.log(typeof encontrado)

    if (typeof encontrado === 'undefined') {
        return false;
    } else {
        
        if (encontrado.pass != pass) {
            return false;
        } else {
            return encontrado;
        }
    }
}


function guardarDatos(usuarioDB, storage) {
    const usuario = {
        'name': usuarioDB.nombre,
        'user': usuarioDB.mail,
        'pass': usuarioDB.pass
    }

    storage.setItem('usuario', JSON.stringify(usuario));
}


function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}


function recuperarUsuario(storage) {
    return JSON.parse(storage.getItem('usuario'));
}


function saludar(usuario) {
    nombreUsuario.innerHTML = `Bienvenido/a, <span>${usuario.name}</span>`
}


function mostrarInfoFiguritas(figuritas) {
   
    contTarjetas.innerHTML = '';
    figuritas.forEach(element => {
        let tarjeta = `<div class="card cardTarjeta" id="tarjeta${element.nombre}">
        <h3 class="card-header" id="nombreTarjeta">Nombre: ${element.nombre}</h3>
        <img src="${element.img}" alt="${element.nombre}" class="card-img-bottom" id="fotoTarjeta">
        <div class="card-body">
        <p class="card-text" id="edadTarjeta">Edad: ${element.edad}</p>
        <p class="card-text" id="animalTarjeta">Animal: ${element.animal}</p>
        <p class="card-text" id="pesoTarjeta">Peso: ${element.peso} kilogramos</p>
        </div>
        <button id="boton" class="btn-primary mb-3 p-3">${element.mensaje}</button>
        </div>`;
        contTarjetas.innerHTML += tarjeta;
    });
}


function presentarInfo(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}


function estaLogueado(usuario) {

    if (usuario) {
        saludar(usuario);
        mostrarInfoFiguritas(figuritas);
        presentarInfo(elementosToggleables, 'd-none');
    }
}




btnLogin.addEventListener('click', (e) => {
    e.preventDefault();


    if (!inputMailLogin.value || !inputPassLogin.value) {
        alert('Todos los campos son requeridos');
    } else {
     
        let data = validarUsuario(usuarios, inputMailLogin.value, inputPassLogin.value);

        if (!data) {
            alert(`Usuario y/o contraseña erróneos`);
        } else {

   
            if (checkRecordar.checked) {
                guardarDatos(data, localStorage);
                saludar(recuperarUsuario(localStorage));
            } else {
                guardarDatos(data, sessionStorage);
                saludar(recuperarUsuario(sessionStorage));
            }
    
            modal.hide();
         
            mostrarInfoFiguritas(figuritas);
            presentarInfo(elementosToggleables, 'd-none');
        }
    }
});


btnLogout.addEventListener('click', () => {
    borrarDatos();
    presentarInfo(elementosToggleables, 'd-none');
});

estaLogueado(recuperarUsuario(localStorage));

const boton = document.getElementById('boton');
boton.addEventListener('click', () => {
    Swal.fire(
        'Tarjeta Agregada!'
      )
})
