
import { selectJoyas, insertJoya, updateJoya, deleteJoya, imagenes, singleJoya } from "./api.js";

document.addEventListener("DOMContentLoaded", async ()=>{
    await mostrarCatalogo();
    mostrarModal();
    cerrarModal();
    mostrarDB();

})

// --------------------- FUNCIONES PARA MOSTRAR MODAL ---------------------------
function bloquearScroll(e) {
    e.preventDefault();
}

async function mostrarImagenes(joya) {
    const imgs = document.querySelectorAll(".modal--img");
    console.log(imgs[0]);
        for(let i = 0; i < 4; i++){
            const img = imgs[i]
            const ruta = joya.imagenes.split(",")[i];
            console.log(ruta);
            img.src = await imagenes(ruta);
        }
}

async function mostrarModal(){
    const item = document.querySelectorAll(".catalogo_joya");
    const modal = document.querySelector(".modal");
    
    item.forEach(it =>{
        it.addEventListener("click", async (e)=>{
            const id = e.currentTarget.dataset.id;
            const joya = await singleJoya(id);
            mostrarImagenes(joya);
            console.log(joya);
            window.addEventListener("wheel", bloquearScroll, { passive: false });
            window.addEventListener("touchmove", bloquearScroll, { passive: false });
            modal.classList.add("active");
        })
    })
    
}

function cerrarModal(){
    const btn = document.querySelector(".btn_modal")
    const modal = document.querySelector(".modal");
    const imgs = document.querySelectorAll(".modal--img");
    btn.addEventListener("click",()=>{
        imgs.forEach(item=>{
            item.src = "";
        })
        window.removeEventListener("wheel", bloquearScroll);
        window.removeEventListener("touchmove", bloquearScroll);
        modal.classList.remove("active");
    })
    modal.addEventListener("click",(e)=>{
        if(e.target === modal){
            imgs.forEach(item=>{
                item.src = "";
            })
            window.removeEventListener("wheel", bloquearScroll);
            window.removeEventListener("touchmove", bloquearScroll);
            modal.classList.remove("active");
        }
    })
    
}

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


