//variables
//campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('citas');

//obejto con valores de la cita

citaObj = {
  mascota: '',
  propietario: '',
  telefono: '',
  fecha: '',
  hora: '',
  sintomas: ''
}

// CLASES

class Citas{
  constructor(){
    this.citas = [];
  }

  agregarCita(cita){
    this.citas = [...this.citas, cita];
    console.log(this.citas);
  }
}

class UI{
  imprimirAlerta(mensaje, tipo){
    //crear div
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

    //validacion de si es tipo error o normal

    if(tipo === 'error'){
      divMensaje.classList.add('alert-danger');
    }else{
      divMensaje.classList.add('alert-success');
    }

    divMensaje.textContent = mensaje;

    //insertarlo en el html

    document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'))

    //eliminar el div

    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }
}

const administrarCitas = new Citas();
const ui = new UI();

//eventos

eventListeners();

function eventListeners() {
  mascotaInput.addEventListener('input', datosCita);
  propietarioInput.addEventListener('input', datosCita);
  telefonoInput.addEventListener('input', datosCita);
  fechaInput.addEventListener('input', datosCita);
  horaInput.addEventListener('input', datosCita);
  sintomasInput.addEventListener('input', datosCita);

  formulario.addEventListener('submit', nuevaCita);
}



//funciones

function datosCita(e) {
  citaObj[e.target.name] = e.target.value;
}

function nuevaCita(e) {
  e.preventDefault();
  const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;
  //validacion de si falta uno
  if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
    ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

    return;
  }

  //agregando id al objeto
  citaObj.id = Date.now();

  // debido a que el objeto es global siempre toma el mismo valor y asi se manda una copia de cada uno
  administrarCitas.agregarCita({...citaObj});

  //resetear el formulario

  reiniciarObjeto();
  
  formulario.reset();

}

function reiniciarObjeto(){
  citaObj.mascota = '';
  citaObj.propietario = '';
  citaObj.telefono = '';
  citaObj.fecha = '';
  citaObj.hora = '';
  citaObj.sintomas = '';

}
