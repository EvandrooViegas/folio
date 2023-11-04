
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import env from "../env";
import { Provider } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/database.types";
import { createAuthJWT, readAuthJWT } from "./token";
import { iUser } from "@/types/iUser";
import { NewUser } from "./types";


const protectedRoutes = ["/dashboard"]

const getUserByAttr = async (attr: keyof iUser = "id", value: any)
:Promise<iUser | null | undefined> => {
  const supabase = createServerActionClient<Database>({ cookies }, { supabaseKey: env.supabaseKey, supabaseUrl: env.supabaseUrl })
  const qUserArr = await supabase.from("users").select().eq(attr, value)
  return qUserArr.data?.[0]
}

const insertUser = async (nUser: NewUser)
:Promise<iUser | null | undefined > => {
  const supabase = createServerActionClient<Database>({ cookies }, { supabaseKey: env.supabaseKey, supabaseUrl: env.supabaseUrl })
  await supabase.from("users").insert(nUser)
  const insertedUser = await getUserByAttr("email", nUser.email)
  return insertedUser
}

const getAuthedUserAuthJWT = async (provider: Provider = "google") => {
  //this function should be called with the supabase.auth.sigInwithProvider()
  const supabase = createServerActionClient<Database>({ cookies }, { supabaseKey: env.supabaseKey, supabaseUrl: env.supabaseUrl })
  const session = supabase.auth.getSession()
  const sessionUser = (await session).data.session?.user

  if (!sessionUser) return 
  const qUser = await getUserByAttr("email", sessionUser.email)
  if(!qUser) return 
const exists = !!qUser
  let token 
  if (exists) {
    token = await createAuthJWT(qUser.id)
  } else {
    
    const nUser = await insertUser({
      email: sessionUser.email!,
      plan: "default",
      profile_avatar: sessionUser.user_metadata.avatar_url,
    })
    token = await createAuthJWT(nUser?.id)
  }
  return token
};


const canAccessRoute = async (route: string) => {
  const isLogged = await isUserLoggedIn()
  if(!isLogged && protectedRoutes.includes(route)) return false
  return true 
}

const isUserLoggedIn = async () => {
  const token = await getAuthedUserAuthJWT()
  const claims = await readAuthJWT(token)
  const uID = claims?.id
  if(!uID) return false 
  else return true
}

const getAuthedUser = async () => {
  const tkn = await getAuthedUserAuthJWT()
  const claims = await readAuthJWT(tkn)
  if(!claims) return 
  const user = await getUserByAttr("id", claims.id)
  return user
}
const userService = {
  canAccessRoute,
  getAuthedUser,
  isUserLoggedIn
};
export default userService;
