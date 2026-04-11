const supabaseURL= "https://qmchipkvgkxrvioaygcx.supabase.co";
const supabaseKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtY2hpcGt2Z2t4cnZpb2F5Z2N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NTUzMDgsImV4cCI6MjA5MTMzMTMwOH0.3se4riN8FBYzh2Coufdz4S9VEkEdfRdJYxyqC6Qm1Fc";

const client = supabase.createClient(supabaseURL,supabaseKEY);

export async function selectJoyas() {
    const {data,error} = await client
        .from("joyas")
        .select("*")
        .order("joya_id",{ascending:true});
    if(error){
        console.log(error);
    }
    return data;
}

export async function singleJoya(id){
    const {data,error} = await client
        .from("joyas")
        .select("*")
        .eq("joya_id", id)
        .single();
    if(error){
        console.log(error);
    }
    return data;
}

export async function insertJoya(item) {
    const {data,error} = await client
        .from("joyas")
        .insert(item);
    if(error){
        console.log(error);
    }
}

export async function updateJoya(datos, id) {
    const {data,error} = await client
        .from("joyas")
        .update(datos)
        .eq("joya_id", id); 
}

export async function deleteJoya(id) {
    const {data,error} = await client
        .from("joyas")
        .delete()
        .eq("joya_id",id);
    if(error){
        console.log(error);
    }
}

export async function imagenes(img) {
    const {data,error} = await client
        .storage
        .from("Joyas")
        .getPublicUrl(img);
    if(error){
        console.log(error);
    }
    console.log(data.publicUrl);
    return data.publicUrl;
}
