import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Server-only Client mit Schreibrechten (z. B. für den Download-Zähler).
// Erfordert SANITY_API_WRITE_TOKEN (Editor-Token aus manage.sanity.io) in der Umgebung.
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})
