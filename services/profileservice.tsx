import { supabase } from "@/lib/supabase";

//updaeet profile

export async function updateprofile(
    userId:string,
    updates:{
        full_name?:string,
        bio?:string,
        address?:string,
        profile_pic?:string
    }){
    const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return true;
}


//read profiles
export async function getusers(userId:string){
const {error,data} = await supabase
.from("profiles")
.select("*")
.eq("id",userId)
.single();

if(error){
    throw new Error(error.message);
}
return data;
}
          