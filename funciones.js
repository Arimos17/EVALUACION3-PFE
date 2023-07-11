//Api--------------------------------------------------------------------

let array = []; //es un array o variable global
let url = 'https://restcountries.com/v3.1/lang/spanish';
fetch(url)
    .then(response => response.json())
    .then(data => {
        array=[];
        data.forEach(ob=>{
            const data_api={
                pais:ob.name.common,
                capital:ob.capital[0],
                region:ob.region,
                continente:ob.continents[0]        
            };
            array.push(data_api);
        });

        actualizarTablaHtml();

    })
    .catch(error => {
        // Aquí se ejecuta en caso de error en la solicitud
        console.error('Error:', error);
    })

//Validaciones--------------------------------------------------------------------

function validarCampo(campoId, spanId) {
    const campo = document.getElementById(campoId);
    const span = document.getElementById(spanId);
    const regex = /^[A-Za-z]+$/;
  
    if (campo.value === '') {
      campo.className = "form-control";
      span.innerText = "";
      span.style.display = "none";
      return true;
    } else {
      if (!regex.test(campo.value)) {
        span.style.display = "block";
        span.innerText = "Por favor, introduce solo caracteres de texto.";
        span.className = "text-danger";
        campo.className = "form-control border-input-error";
        return false;
      } else {
        span.innerText = "";
        span.style.display = "none";
        campo.className = "form-control border-input-ok";
        return true;
      }
    }
  }
  
  function validarPais() {
    return validarCampo("Pais", "validPais");
  }
  
  function validarCapital() {
    return validarCampo("capital", "validCapital");
  }
  
  function validarRegion() {
    return validarCampo("region", "validRegion");
  }
  
  function validarContinente() {
    return validarCampo("continente", "validContinente");
  }

// Event Listeners para las validaciones----------------------------------------

document.getElementById("Pais").addEventListener('input', validarPais);
document.getElementById("capital").addEventListener('input', validarCapital);
document.getElementById("region").addEventListener('input', validarRegion);
document.getElementById("continente").addEventListener('input', validarContinente);

//Funciones---------------------------------------------------------------------

function leerForms() {

    let valid0 = validarPais();
    let valid1 = validarCapital();
    let valid2 = validarRegion();
    let valid3 = validarContinente();

    if (valid0 && valid1 && valid2 && valid3 == true) {
        // crear un objeto en javascript
        let objeto = {
            "pais": Pais.value,
            "capital": capital.value,
            "region": region.value,
            "continente": continente.value

        };
        array.push(objeto); //agregar el objeto al array

        actualizarTablaHtml();
    }

}

function actualizarTablaHtml() {
    let data = document.getElementById('data');
    data.innerHTML = "";
    //recorrer el array que tiene los datos
    for (let i = 0; i < array.length; i++) {

        //crear la fila
        let fila = document.createElement('tr');
        //crear la columna Pais
        let columnaPais = document.createElement('td');
        columnaPais.textContent = array[i].pais; //pasar el dato
        fila.appendChild(columnaPais); // add columna a la fila

        //crear la columna Capital
        let columnaCapital = document.createElement('td');
        columnaCapital.textContent = array[i].capital; //pasar el dato
        fila.appendChild(columnaCapital); // add columna a la fila

        //crear la columna Region
        let columnaRegion = document.createElement('td');
        columnaRegion.textContent = array[i].region; //pasar el dato
        fila.appendChild(columnaRegion); // add columna a la fila

        //crear la columna Continente
        let columnaContinente = document.createElement('td');
        columnaContinente.textContent = array[i].continente; //pasar el dato
        fila.appendChild(columnaContinente); // add columna a la fila

        let columnaOPciones = document.createElement('td');

        //crear boton eliminar
        let btneliminar = document.createElement('button');
        btneliminar.textContent = "Eliminar";
        btneliminar.className = "btn btn-danger me-2";
        btneliminar.addEventListener('click', function () {
            eliminar(i);
        });
        columnaOPciones.appendChild(btneliminar);

        fila.appendChild(columnaOPciones);


        if (array[i].estado) {
            fila.className = "marcar-ok";
        }
        data.appendChild(fila);
    }

}
function eliminar(i) {
    array.splice(i, 1);
    actualizarTablaHtml();
}


actualizarTablaHtml();

