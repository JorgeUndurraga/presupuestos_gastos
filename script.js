// <----------------- INGRESAR PRESUPUESTO---------------------------->
let cantidadPresupuesto = 0;
displayPresupuesto.innerHTML = cantidadPresupuesto.toLocaleString('es-CL', {
    type: 'currency',
    currency: 'CLP',
    });

formularioPresupuesto.addEventListener("submit", (event)=>{
    event.preventDefault();
    console.log(itemPresupuesto.value)

    cantidadPresupuesto = itemPresupuesto.value
    displayPresupuesto.innerHTML = parseInt(cantidadPresupuesto).toLocaleString('es-CL', {
        type: 'currency',
        currency: 'CLP',
        });;
})

// <----------------- INGRESAR GASTO---------------------------->
function ItemGasto(id, gasto, valor){
    this.id=id;
    this.gasto=gasto;
    this.valor=valor
} 

formularioGasto.addEventListener("submit", (event)=>{
    event.preventDefault();
    console.log(itemNombreGasto.value)
    console.log(itemCantidadGasto.value)

    let arrayGastos;

    // arrayDigimon.forEach((x, index) => {
    //     acumulador += `
    //             <tr>
    //                 <td>${index + 1}</td>
    //                 <td>${x.name}</td>
    //                 <td>${x.level}</td>
    //                 <td class="col text-center"><button class="btn btn-primary" onclick="functionMostrarModal('${
    //                   x.img
    //                 }', '${x.name}')" >Imagen </button></td>
    //             </tr>
    //         `;
    //   });

      tableBody.innerHTML = acumulador;
    });

    // cantidadPresupuesto = itemPresupuesto.value
    // displayPresupuesto.innerHTML = parseInt(cantidadPresupuesto).toLocaleString('es-CL', {
    //     type: 'currency',
    //     currency: 'CLP',
    //     }
        
        
})


