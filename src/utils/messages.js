import { supabase } from './supabase.js'

export async function submitMessage(message) {
  if (!supabase) {
    throw new Error('La connexion à la base de données n’est pas configurée.')
  }

  const { error } = await supabase.from('messages').insert(message)
  if (error) throw error
}