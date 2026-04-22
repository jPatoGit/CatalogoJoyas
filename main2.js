import { selectJoyas, insertJoya, updateJoya, deleteJoya, imagenes, singleJoya } from "./api.js";

document.addEventListener("DOMContentLoaded", async ()=>{
    console.log(document.body.scrollWidth + " vs " + window.innerWidth);
    let index = 0;
   // mostrarDB();
    //await mostrarCatalogo();
})

// --------------------- FUNCIONES PARA MOSTRAR MODAL ---------------------------



// ----------------------- SLIDER MODAL ----------------------------------





// ------------------------ FUNCIONES PARA MOSTRAR CATALOGO ------------------

async function mostrarDB() {
    const data = await selectJoyas();
    console.log(data);
}

async function mostrarCatalogo() {
    const data = await selectJoyas();
    const contenedor = document.querySelector(".container_catalogo");
    let contenidoHTML = ``;
    for(let i = 0; i <data.length; i++){
        let ruta = data[i].imagenes.split(",")[0];
        const img = await imagenes(ruta)
        let item = `
                    <div class="catalogo_joya" data-id="${data[i].joya_id}">
                        <div class="catalogo_joya--imagen">
                            <img src="${img}" alt="">   
                        </div>
                        <div class="catalogo_joya--descripcion">
                            <h3>${data[i].nombre}</h3>
                        </div>
                        <button class="btn_ver">VER IMAGENES</button>
                    </div>`;
        contenidoHTML = contenidoHTML + item;
    }
    contenedor.innerHTML = contenidoHTML;
}

function contacto(){
    const btn = document.querySelector(".container_whatsapp")
    btn.addEventListener("click",()=>{
        alert("vas a redirigir a tu chat");
    })
    
}


