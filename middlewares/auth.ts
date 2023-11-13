import { getUserByAuthJWT } from "@/services/user";
import { NextRequest } from "next/server";


const authRequiredRoutes = ["/dashboard"]
export const authMiddleware = async (req: NextRequest) => {
    const user = await getUserByAuthJWT()
    if(authRequiredRoutes.some( r => req.nextUrl.pathname.startsWith(r)) && !user) {
        return false
    }

    return true
}