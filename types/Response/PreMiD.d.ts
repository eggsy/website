import { PresenceMetadata } from "../PreMiD"

export interface Premid {
  error?: number | boolean
  message?: string
  name: string
  url: string
  metadata: PresenceMetadata
}
