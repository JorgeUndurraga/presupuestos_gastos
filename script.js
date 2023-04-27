import { v4 as uuidv4 } from "https://jspm.dev/uuid";

//----------------- INGRESAR PRESUPUESTO------------------------//
let cantidadPresupuesto = 0;
displayPresupuesto.innerHTML = cantidadPresupuesto.toLocaleString("es-CL", {type: "currency", currency: "CLP",});


formularioPresupuesto.addEventListener("submit", (event) => {
      event.preventDefault();
      cantidadPresupuesto = itemPresupuesto.value;
      
      if(cantidadPresupuesto == 0){
        alert("Ingrese su Presupuesto")
        formularioPresupuesto.reset();
      }
      else{
        despliegueDeGastos(arrayDeGastos);
        displayPresupuesto.innerHTML = parseInt(cantidadPresupuesto).toLocaleString( "es-CL",{type: "currency", currency: "CLP",});
      }
});

// ----------------- CREACION DE OBJETO------------------------//
// creacion Objeto
function ItemGasto(gasto, valor, id) {
  this.gasto = gasto;
  this.valor = valor;
  this.id = id;
}

let arrayDeGastos = [];//variable que guarda los datos de cada uno de los gastos.

// Rescatar datos del Fomulario de Gastos y Desplegarlos en la Tabla
formularioGasto.addEventListener("submit", (event) => {
      event.preventDefault();

      if(cantidadPresupuesto == 0){
        alert("Ingrese su Presupuesto")
      }
      else{
        let descripcionGasto = itemNombreGasto.value;
        let valorGasto = itemCantidadGasto.value;
        let idGasto = uuidv4().slice(0, 6);
        arrayDeGastos = creadorArrayGasto(descripcionGasto, valorGasto, idGasto);
      }


      despliegueDeGastos(arrayDeGastos);

      // Rellenado de la  tabla de Gastos
      let rellenarGastos = () => {
              let acumulador = "";
              arrayDeGastos.forEach((e) => {

                  acumulador += `
                  <tr id ="${e.id}">
                      <td>${e.gasto}</td>
                      <td>${e.valor}</td>
                      <td><button><i class="bi bi-trash3-fill borrarTd"></button></i></td>
                  </tr> `;
              });
              tableBody.innerHTML = acumulador;
          }; // FIN Rellenado de la  tabla de Gastos-------------------
        rellenarGastos();    
});// FIN Rescatar datos del Fomulario de Gastos y Desplegarlos en la Tabla


// Borra los datos de la línea de la tabla
$(document).on('click', '.borrarTd', function(event) {
  event.preventDefault();
  event.stopImmediatePropagation(); //para que no repita la accion sucesivamente
  
  let idTr = $(this).closest('tr').attr('id'); //Variable que rescata la id de la línea(sirve para borralo del array).
  $(this).closest('tr').remove(); //Borra la línea de la tabla.
  arrayDeGastos = borrandoDato(idTr, arrayDeGastos); //Borra el objeto y devuelve el array actualizado.
  despliegueDeGastos(arrayDeGastos);//Despliega los datos de gastos en la Tabla de Gastos.
}); // FIN Borra los datos de la línea de la tabla



// ---------------------------------FUNCIONES--------------------------------//

//Elimina el gato seleccionado y actualiza el array de gastos.
function borrandoDato(idTr, arrayDeGastos) {
    let arrayActualizado = arrayDeGastos.filter((item)=>item.id !== idTr)
    return arrayActualizado;
};

//Despliega los Gastos en la Tabla de Gastos.
function despliegueDeGastos(arrayDeGastos){
    let gastosTotales = sumadeGastos(arrayDeGastos);
    displayGastos.innerHTML  = gastosTotales;
    displaySaldo.innerHTML = cantidadPresupuesto - gastosTotales;
}

// Creador de array de Gastos ingresados en el formulario
function creadorArrayGasto(descripcionGasto, valorGasto, idGasto) {
    let gastoNuevo = new ItemGasto(descripcionGasto, valorGasto, idGasto);
    arrayDeGastos.push(gastoNuevo);
    return arrayDeGastos;
}

// suma de gastos
function sumadeGastos(arrayDeGastos){
    let  suma = 0;
    arrayDeGastos.forEach((e) => {
        suma += parseInt(e.valor); //e.valor es el dato numérico valor de cada objeto del array
    });
    return suma;
}