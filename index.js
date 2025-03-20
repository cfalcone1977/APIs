
cuit=document.getElementById('CUIT');
boton_consulta=document.getElementById('boton');
panel=document.getElementById('panelInformacion');
const urlConsultaCuit="https://api.bcra.gob.ar/centraldedeudores/v1.0/Deudas/";

function consultaCUIT(numero_cuit) {
    try {
        console.log(urlConsultaCuit+numero_cuit.value);
        fetch(urlConsultaCuit+numero_cuit.value)
         .then(res=>res.json())
         .then(data=>{console.log(" NOMBRE: "+data.results.denominacion);
            console.log("   CUIT: "+data.results.identificacion);
            console.log("PERIODO: "+data.results.periodos[0].periodo);
            const CantBancosOperados=data.results.periodos[0].entidades.length;
            console.log("BANCOS: ");
            console.log("====================================");            
            for (let i = 0; i < CantBancosOperados; i=i+1) {    //FALTA ORDENAR BANCOS POR MAYOR DEUDA
              const pEntidad=document.createElement('pre');
              const monto=(Number(data.results.periodos[0].entidades[i].monto))*1000
              const montoS=monto.toLocaleString();
              const situacion=data.results.periodos[0].entidades[i].situacion;
              if ((situacion>1) && (situacion<=2)){
                                        panel.style.backgroundColor='yellow';
                              } else if (situacion>=3) {
                                                        panel.style.backgroundColor='red';
                                                       }

              const situacionS=situacion.toLocaleString();
              pEntidad.textContent=data.results.periodos[0].entidades[i].entidad.padStart(45) +"   $"+ montoS.padStart(12) + "   " + situacionS.padStart(3);
              panelInformacion.appendChild(pEntidad);
              console.log(data.results.periodos[0].entidades[i].entidad);
              console.log(" DEUDA: "+"$ "+(Number(data.results.periodos[0].entidades[i].monto))*1000+" expresada en miles (x 1000)");
              console.log(data.results.periodos[0].entidades[i].situacion)
              console.log("====================================");
            }
            return data;
           })
    } catch (error) {
        console.error("Error al cargar consulta CUIT:", error);
    }
}

function mostrarEntidadesOperadas(objetoCliente){
    console.log(objetoCliente);
}

boton_consulta.addEventListener(`click`, ()=>{
                  const CLIENTE=consultaCUIT(cuit);
                  //console.log(CLIENTE);
                  //mostrarEntidadesOperadas(CLIENTE);
})


/*
async function consultaCUIT(numero_cuit) {
    try {
        console.log(urlConsultaCuit+numero_cuit.value);
        const response = await fetch(urlConsultaCuit+numero_cuit.value);
        const estadoCuit = await response.json();
        return estadoCuit;// devuelvo un objeto con el estado del CUIT en tipo json
    } catch (error) {
        console.error("Error al cargar consulta CUIT:", error);
        return [];//si da error se devuelve una array vacio
    }
}

async function mostrarEntidadesOperadas(objetoCliente){
    console.log(objetoCliente.results.periodos[0].entidades.length);
}

boton_consulta.addEventListener(`click`, ()=>{
                  const CLIENTE=consultaCUIT(cuit);
                  console.log(CLIENTE);
                  mostrarEntidadesOperadas(CLIENTE);
})

*/


/*
{console.log(" NOMBRE: "+data.results.denominacion);
            console.log("   CUIT: "+data.results.identificacion);
            console.log("INFORME: "+data.results.periodos[0].periodo);
            const CantBancosOperados=data.results.periodos[0].entidades.length;
            console.log("BANCOS: ");
            console.log("====================================");              
            for (let i = 0; i < CantBancosOperados; i=i+1) {    //FALTA ORDENAR BANCOS POR MAYOR DEUDA
              console.log(data.results.periodos[0].entidades[i].entidad);
              console.log(" DEUDA: "+"$ "+data.results.periodos[0].entidades[i].monto+" expresada en miles (x 1000)");
              console.log(data.results.periodos[0].entidades[i].situacion)
              console.log("====================================");
            }
           })
*/