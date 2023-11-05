"use server"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import env from "../env";
import { Provider } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/database.types";
import { createAuthJWT, readAuthJWT } from "./token";
import { iNewUser, iUser } from "@/types/iUser";


const protectedRoutes = ["/dashboard"]

const getUserByAttr = async (attr: keyof iUser = "id", value: any)
:Promise<iUser | null | undefined> => {
  const supabase = createServerActionClient<Database>({ cookies }, { supabaseKey: env.supabaseKey, supabaseUrl: env.supabaseUrl })
  const qUserArr = await supabase.from("users").select().eq(attr, value)
  return qUserArr.data?.[0]
}

export const getUserByEmail = async (email: string) => {
  const usr = getUserByAttr("email", email)
  return usr
}

export const userExists = async (attr: keyof iUser = "id", value: any) => {
  const usr = await getUserByAttr(attr, value)
  return Boolean(usr)
}


