
import { selectJoyas, insertJoya, updateJoya, deleteJoya, imagenes } from "./api.js";

document.addEventListener("DOMContentLoaded", async ()=>{
    await mostrarCatalogo();
    mostrar();
    cerrarModal();
    mostrarDB();
})

// --------------------- FUNCIONES PARA MOSTRAR MODAL ---------------------------
function bloquearScroll(e) {
    e.preventDefault();
}

function mostrar(){
    const item = document.querySelectorAll(".catalogo_joya");
    const modal = document.querySelector(".modal");
    item.forEach(it =>{
        it.addEventListener("click",()=>{
            window.addEventListener("wheel", bloquearScroll, { passive: false });
            window.addEventListener("touchmove", bloquearScroll, { passive: false });
            modal.classList.add("active");
        })
    })
    
}

function cerrarModal(){
    const btn = document.querySelector(".btn_modal")
    const modal = document.querySelector(".modal");
    btn.addEventListener("click",()=>{
        window.removeEventListener("wheel", bloquearScroll);
        window.removeEventListener("touchmove", bloquearScroll);
        modal.classList.remove("active");
    })
    modal.addEventListener("click",(e)=>{
        if(e.target === modal){
            window.removeEventListener("wheel", bloquearScroll);
            window.removeEventListener("touchmove", bloquearScroll);
            modal.classList.remove("active");
        }
    })
}

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
                    <div class="catalogo_joya">
                        <div class="catalogo_joya--imagen">
                            <img src="${img}" alt="">
                        </div>
                        <div class="catalogo_joya--descripcion">
                            <h3>${data[i].nombre}</h3>
                        </div>
                    </div>`;
        contenidoHTML = contenidoHTML + item;
    }
    contenedor.innerHTML = contenidoHTML;
}