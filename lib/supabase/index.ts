import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'
import env from '@/services/env'

const supabaseUrl = env.supabaseUrl
const supabaseKey = env.supabaseKey

const supabase = createClient<Database>(supabaseUrl!, supabaseKey!)
export default supabase