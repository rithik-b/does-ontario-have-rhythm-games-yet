"use server"

import { createClient } from "@supabase/supabase-js"
import { env } from "@seethe/env"
import { Database } from "@seethe/types/supabase"

const getSupabaseClient = () =>
  createClient<Database>(env.SUPABASE_URL, env.SUPABASE_KEY)

export default getSupabaseClient
