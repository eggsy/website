/* Converted with JSON to TS VSC extension */

export interface Lanyard {
  success: boolean
  data: Data
}

export interface Data {
  spotify?: any
  listening_to_spotify: boolean
  discord_user: Discorduser
  discord_status: string
  activities: Activity[]
  active_on_discord_mobile: boolean
  active_on_discord_desktop: boolean
}

export interface Activity {
  type: number
  state: string
  name: string
  id: string
  emoji?: Emoji
  created_at: number
  application_id?: string
  timestamps?: Timestamps
  session_id?: string
  details?: string
  buttons?: string[]
  assets?: Assets
}

export interface Assets {
  small_text: string
  small_image: string
  large_text: string
  large_image: string
}

export interface Timestamps {
  start: number
}

export interface Emoji {
  name: string
}

export interface Discorduser {
  username: string
  public_flags: number
  id: string
  discriminator: string
  avatar: string
}
