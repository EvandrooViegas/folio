type Plans = "default" | "premium"
export type NewUser = {
    email: string, 
    plan: Plans,
    profile_avatar: string
}