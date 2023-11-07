"use server"

import { Plan } from "@/types/iUser";
import env from "../env";
import Stripe from "stripe"

const stripe = new Stripe(env.stripeSecretKey!)
const plansIDmap = new Map<Plan | undefined, string | undefined>([
    ["default", undefined],
    ["premium", env.premiumProductID],
    ["premium+", env.premiumPlusProductID],
])

export async function newSubscription(plan: Plan | undefined) {
    const productID = plansIDmap.get(plan)
    if(!productID) return 
    const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [{
            price: productID,
            quantity: 1
        }],
        success_url: `${env.appOrigin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${env.appOrigin}/payment/cancel`,
    })
    return session.url
}
export async function isCheckoutSessionComplete(sessionID: string | undefined ) {
    if(!sessionID) return
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionID)
    console.log(checkoutSession)
    return checkoutSession.status === "complete"    
}