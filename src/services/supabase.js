import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nhdnjgozjcbdrarwliwg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oZG5qZ296amNiZHJhcndsaXdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MTM3NjIsImV4cCI6MjA3NjE4OTc2Mn0.3u2eWiFG64UkwhGVr2UDJXOoDS1navJiOWH-zrnVivA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
