const env = 
{ 
    jwtSecret: process.env.NEXT_PUBLIC_JWT_SECRET, 
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    premiumProductID:    process.env.NEXT_PUBLIC_PREMIUM_PRODUCT_ID,
    premiumPlusProductID:    process.env.NEXT_PUBLIC_PREMIUM_PLUS_PRODUCT_ID,
    stripeSecretKey: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
    appOrigin: process.env.NEXT_PUBLIC_APP_ORIGIN
}
export default env