import { v4 as uuidv4 } from "https://jspm.dev/uuid";

//$(document).ready(function(){


// <----------------- INGRESAR PRESUPUESTO---------------------------->
let cantidadPresupuesto = 0;
displayPresupuesto.innerHTML = cantidadPresupuesto.toLocaleString("es-CL", {type: "currency", currency: "CLP",});

formularioPresupuesto.addEventListener("submit", (event) => {
  event.preventDefault();
  
  cantidadPresupuesto = itemPresupuesto.value;
  displayPresupuesto.innerHTML = parseInt(cantidadPresupuesto).toLocaleString( "es-CL",{type: "currency", currency: "CLP",}
  );
});

// <----------------- CREACION DE OBJETO---------------------------->
// creacion Objeto
function ItemGasto(gasto, valor, id) {
  this.gasto = gasto;
  this.valor = valor;
  this.id = id;
}



// Creación del array para la tabla
formularioGasto.addEventListener("submit", (event) => {
    event.preventDefault();
  
    let descripcionGasto = itemNombreGasto.value;
    let valorGasto = itemCantidadGasto.value;
    let idGasto = uuidv4().slice(0, 6);

    let arraydeItemGasto = creadorArrayGasto(descripcionGasto, valorGasto, idGasto);

    console.log(arraydeItemGasto)//nooooooooo

    despliegueDeGastos(arraydeItemGasto);

    function despliegueDeGastos(arraydeItemGasto){
      let gastosTotales = sumadeGastos(arraydeItemGasto);
      displayGastos.innerHTML  = gastosTotales;
      displaySaldo.innerHTML = cantidadPresupuesto - gastosTotales;
    }

// Rellenado de la  tabla de Gastos
let rellenarGastos = () => {
        // declaración de la variables par el relleno de las tablas
        tableBody.innerHTML = "";
        let acumulador = "";
        // recorrido de la tabla e instalación de los datos en ella
        arraydeItemGasto.forEach((e) => {

          console.log(e);

            acumulador += `
            <tr id ="${e.id}">
                <td>${e.gasto}</td>
                <td>${e.valor}</td>
                <td><button><i class="bi bi-trash3-fill borrarTd"></button></i></td>
            </tr> `;
        });
        tableBody.innerHTML = acumulador;
        // <td><input onclick="borrarFila();"><i class="bi bi-trash3-fill borrarFila"></i></td>

          $(document).on('click', '.borrarTd', function(event) {
            event.preventDefault();
            event.stopImmediatePropagation(); //para que no repeta laccion sucesivamente
            
            let idTr = $(this).closest('tr').attr('id');

            var borrandoDato = function(idTr, arraydeItemGasto) {
              let arrayRestado = arraydeItemGasto.filter((item)=>item.id !== idTr)
              return arrayRestado;
            };

          arraydeItemGastoRenovado = borrandoDato(idTr, arraydeItemGasto);

          $(this).closest('tr').remove();

          console.log(arraydeItemGastoRenovado)// esta la lleva
          despliegueDeGastos(arraydeItemGastoRenovado);

          });

    };

    rellenarGastos();

});

// ---------------------------------FUNCIONES--------------------------------

let arrayDeGastos = [];
let gastoNuevo =[];
// creador de array
    function creadorArrayGasto(descripcionGasto, valorGasto, idGasto) {
      gastoNuevo = new ItemGasto(descripcionGasto, valorGasto, idGasto);
      arrayDeGastos.push(gastoNuevo);
      console.log(arrayDeGastos)
      return arrayDeGastos;
    }


// suma de gastos
function sumadeGastos(arraydeItemGasto){
    let  suma = 0;
    arraydeItemGasto.forEach((e) => {
    suma += parseInt(e.valor);
    });
    return suma;
}


//})






