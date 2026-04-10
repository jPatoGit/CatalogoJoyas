
const supabaseURL= "https://qmchipkvgkxrvioaygcx.supabase.co";
const supabaseKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtY2hpcGt2Z2t4cnZpb2F5Z2N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NTUzMDgsImV4cCI6MjA5MTMzMTMwOH0.3se4riN8FBYzh2Coufdz4S9VEkEdfRdJYxyqC6Qm1Fc";

const client = supabase.createClient(supabaseURL,supabaseKEY);

document.addEventListener("DOMContentLoaded", ()=>{
    mostrar();
    cerrarModal();
    mostraDB();
})

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

async function mostraDB() {
    const {data,error} = await client
        .from("joyas")
        .select("*")
    if(error){
        console.log(error);
    }
    console.log(data);
}