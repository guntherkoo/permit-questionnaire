import { AddPermitEntryRequest } from '../constants'
import { createClient } from './server'
import { v4 as uuidv4 } from 'uuid'

export async function addPermitEntry(req: AddPermitEntryRequest) {
  'use server'
  const supabase = createClient()

  const { data, error } = await supabase
    .from('permit_requests')
    .insert({ id: uuidv4(), ...req })
    .select()

  // logging response in server
  console.log(data, error)
}
