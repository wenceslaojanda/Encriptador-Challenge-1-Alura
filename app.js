const encriptador = {
    e: 'enter',
    i: 'imes',
    a: 'ai',
    o: 'ober',
    u: 'ufat'
};

const desencriptador = {
    enter: 'e',
    imes: 'i',
    ai: 'a',
    ober: 'o',
    ufat: 'u'
};

let botonEncriptar = document.querySelector("#btn-encriptar");
let inputTexto = document.querySelector("#input-texto");
let msg = document.querySelector("#msg");
let botonCopiar = document.querySelector("#btn-copy");
let botonCopy = document.querySelector(".btn-copiar");
let botonDesencriptar = document.querySelector("#btn-desencriptar");
let msgError = document.querySelector(".mensaje-error");

//Boton encriptar
botonEncriptar.addEventListener("click", (event) =>{
    console.log("ate"); 
    event.preventDefault();
    let textoParaEncriptar = inputTexto.value;
    let esCadenaValida = validarCadena(textoParaEncriptar);
    if(!esCadenaValida){
        mensajeError();
        return;
    }

    let textoEncriptado = encriptar(textoParaEncriptar);
    mostrarMensaje(textoEncriptado);

});

//Boton copiar
botonCopiar.addEventListener("click", () => {
    navigator.clipboard.writeText(msg.textContent);
    inputTexto.focus();
});

//Boton desencriptar
botonDesencriptar.addEventListener("click", (event)=> {
    event.preventDefault();
    let textoParaDesencriptar = inputTexto.value;
    let esCadenaValida = validarCadena(textoParaDesencriptar);
    if(!esCadenaValida){
        mensajeError();
        return;
    }
    let txtDesencriptado = desencriptar(textoParaDesencriptar);
     mostrarMensaje(txtDesencriptado);

});


function encriptar(texto){
    let textoEncriptado = "";
    let caracteres = texto.split("");
    for(let i = 0; i < caracteres.length; i++){
        
        if(encriptador.hasOwnProperty(caracteres[i])){
            textoEncriptado += encriptador[caracteres[i]];
        } else{
            textoEncriptado += caracteres[i];
        }
    }
    return textoEncriptado;
}

//funcion para mostrar mensaje
function mostrarMensaje(textoEncriptado){
       // paso el texto a la otra caja de texto
       msg.textContent = textoEncriptado;
       //limpiamos el input que tiene el mensaje
       inputTexto.value = "";
       botonCopy.classList.add("visible");
       msgError.classList.remove("visible");
       inputTexto.focus();
}

//funcion para desencriptar
function desencriptar(texto){
    let llaves = Object.keys(desencriptador);
    llaves.forEach(elemento => {
        let reg = new RegExp(elemento,"g");
        texto = texto.replace(reg, desencriptador[elemento]);
    })
    return texto;  
}

//funcion validar cadena
function validarCadena(texto){
    let validacion = new RegExp(/^[a-z0-9\s]+$/g);
    return validacion.test(texto);
}

 //funcion para mensaje de error
function mensajeError(){
    msgError.classList.add("visible");
    botonCopy.classList.remove("visible");
    msg.textContent = "";
}  