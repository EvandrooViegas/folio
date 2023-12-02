"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import env from "../env";
import { Database } from "@/lib/supabase/database.types";
import { iNewUser, iUser } from "@/types/iUser";
import { createAuthJWT, readAuthJWT } from "./token";
import { AUTH_COOKIE_TOKEN_EXP, AUTH_JWT_COOKIE_NAME } from "./config";

const getUserByAttr = async (
  attr: keyof iUser = "id",
  value: any
): Promise<iUser | null | undefined> => {
  const supabase = createServerActionClient<Database>(
    { cookies },
    { supabaseKey: env.supabaseKey, supabaseUrl: env.supabaseUrl }
  );
  const qUserArr = await supabase.from("users").select().eq(attr, value);
  return qUserArr.data?.[0];
};

export const getUserByEmail = async (email: string) => {
  const usr = getUserByAttr("email", email);
  return usr;
};

export const getUserByID = async (id: string) => {
  const usr = getUserByAttr("id", id);
  return usr;
};

export const createUser = async (usr: iNewUser) => {
  const supabase = createServerActionClient<Database>(
    { cookies },
    { supabaseKey: env.supabaseKey, supabaseUrl: env.supabaseUrl }
  );
  await supabase.from("users").insert({
    ...usr,
    plan: "default",
  });
  const nUser = await getUserByAttr("username", usr.username);
  return nUser;
};

export const updateUser = async (usrID: string, nUser: iUser) => {
  const supabase = createServerActionClient<Database>(
    { cookies },
    { supabaseKey: env.supabaseKey, supabaseUrl: env.supabaseUrl }
  );
  await supabase.from("users").update(nUser).eq("id", usrID);
};

export const userExists = async (attr: keyof iUser = "id", value: any) => {
  const usr = await getUserByAttr(attr, value);
  return Boolean(usr);
};

export const storeAuthJWT = async (id: string | undefined) => {
  const jwt = await createAuthJWT(id);
  const cookiesStore = cookies()
  cookiesStore.set(AUTH_JWT_COOKIE_NAME, jwt || "", {
    expires: Date.now() + AUTH_COOKIE_TOKEN_EXP
  });
};

export const getUserByAuthJWT = async () => {
  const jwt = cookies().get(AUTH_JWT_COOKIE_NAME);
  const { id } = (await readAuthJWT(jwt?.value)) || {};
  if (!id) return;
  const user = await getUserByID(id);
  return user;
};

export const getAuthedUserID = async () => {
  const jwt = cookies().get(AUTH_JWT_COOKIE_NAME);
  const { id } = await readAuthJWT(jwt?.value) || {};
  return id
}

export const getAuthedUser = async () => {
  const user = await getUserByAuthJWT();
  return user;
};
