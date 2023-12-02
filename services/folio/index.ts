import supabase from "@/lib/supabase";
import {  iNewFolio } from "@/types/folio";
import { getAuthedUserID } from "../user";

export async function createFolio(folio: Omit<iNewFolio, "user_id">) {
    const userID = await getAuthedUserID()
    if(!userID) return 
    const res = await supabase.from("folios").insert({ ...folio, user_id: userID })
    console.log(res)
}