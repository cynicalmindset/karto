import { supabase } from "@/lib/supabase";

export async function createitem(
    name:string,
    note:string,
    urgency:string,
    purchased:string

){
    const{data,error} = await supabase
    .from("user_items")
    .insert([{name,note,urgency,purchased},])
    .select()
    .single();
    if(error){
        console.log("create error: ",error)
        throw error
    }
    return data;
}

export async function getitem(){
    const{data,error} = await supabase
    .from("user_items")
    .select("*")
    .eq("purchased","done")
    .order("urgency",{ascending:true});
    if(error){
        console.log("read error: ",error);
        throw error;
    }
    return data;
}