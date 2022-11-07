export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input);

    }
    
    if (input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);

    }
}

const tipoDeErrores = ["valueMissing", "typeMismatch", "patternMismatch", "customError"];

const mensajeDeError = {
    nombre:{
        valueMissing: "Este campo no puede estar vacio"
    },
    email:{
        valueMissing: "Este campo no puede estar vacio",
        typeMismatch: "Este correo no es valido"
    },
    password:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres maximo 12, debe tener una letra minuscula, una mayuscula y un caracter especial"
    },
    nacimiento:{
        valueMissing: "Este campo no puede estar vacio",
        customError: "debes tener mas de 18 años para ingresar"
    },
    numero:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es de 10 numeros"
    },
    direccion:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "la direccion debe contener entre 10 y 40 caracteres"
    },
    ciudad:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "este espacio debe contener entre 10 y 40 caracteres"
    },
    estado:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "este espacio debe contener entre 10 y 40 caracteres"
    },
}
const validadores = {
    nacimiento: (imput) => validarNacimiento(imput),
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach( error =>{
        if (input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajeDeError[tipoDeInput][error]);
            mensaje = mensajeDeError[tipoDeInput][error];

        }
    })

    return mensaje
}


function validarNacimiento(input){
    const fechaCliente = new Date (input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "debes tener mas de 18 años para ingresar";
    }
    input.setCustomValidity(mensaje);
}
function mayorDeEdad(fecha){
const fechaActual = new Date();
const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate() );
return diferenciaFechas <= fechaActual;
}