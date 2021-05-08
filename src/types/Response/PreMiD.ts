import { PresenceMetadata } from "../PreMiD"

export interface PreMiDResponse {
  error?: number | boolean
  message?: string
  name: string
  url: string
  metadata: PresenceMetadata
}
