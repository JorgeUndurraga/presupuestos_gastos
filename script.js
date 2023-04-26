import { v4 as uuidv4 } from "https://jspm.dev/uuid";

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

    // if(cantidadPresupuesto==0){
    //   alert("ingrese presupusto")
    //   formularioGasto.reset();
    // }


    let descripcionGasto = itemNombreGasto.value;
    let valorGasto = itemCantidadGasto.value;
    let idGasto = uuidv4().slice(0, 6);

    arrayDeGastos = creadorArrayGasto(descripcionGasto, valorGasto, idGasto);

    console.log(arrayDeGastos)//nooooooooo

    despliegueDeGastos(arrayDeGastos);

// Rellenado de la  tabla de Gastos
let rellenarGastos = () => {
        // declaración de la variables par el relleno de las tablas
        tableBody.innerHTML = "";
        let acumulador = "";
        // recorrido de la tabla e instalación de los datos en ella
        arrayDeGastos.forEach((e) => {

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

    };
    rellenarGastos();    
});

$(document).on('click', '.borrarTd', function(event) {
  event.preventDefault();
  event.stopImmediatePropagation(); //para que no repeta la accion sucesivamente
  
  let idTr = $(this).closest('tr').attr('id');

console.log(arrayDeGastos);
let arraydeGastosRenovado = borrandoDato(idTr, arrayDeGastos);


function borrandoDato(idTr, arrayDeGastos) {
  let arrayRestado = arrayDeGastos.filter((item)=>item.id !== idTr)
  return arrayRestado;
};

$(this).closest('tr').remove(); //BORRA LA LINEA

arrayDeGastos=arraydeGastosRenovado;//actualiza el array con los productos restados
console.log(arrayDeGastos)// esta la lleva
// document.getElementById("formularioGasto").reset();
despliegueDeGastos(arrayDeGastos);

});

// ---------------------------------FUNCIONES--------------------------------


function despliegueDeGastos(arrayDeGastos){
  let gastosTotales = sumadeGastos(arrayDeGastos);
  displayGastos.innerHTML  = gastosTotales;
  displaySaldo.innerHTML = cantidadPresupuesto - gastosTotales;
}


let gastoNuevo =[];
let arrayDeGastos = [];

// creador de array
    function creadorArrayGasto(descripcionGasto, valorGasto, idGasto) {
        gastoNuevo = new ItemGasto(descripcionGasto, valorGasto, idGasto);
        arrayDeGastos.push(gastoNuevo);
        return arrayDeGastos;
    }

// suma de gastos
function sumadeGastos(arrayDeGastos){
    let  suma = 0;
    arrayDeGastos.forEach((e) => {
    suma += parseInt(e.valor);
    });
    return suma;
}