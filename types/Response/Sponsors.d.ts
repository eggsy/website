interface Sponsor {
  login: string
  name: string
  avatarUrl: string
  type: string
  avatarUrlHighRes: string
  avatarUrlMediumRes: string
  avatarUrlLowRes: string
}

export interface ISponsor {
  sponsor: Sponsor
  isOneTime: boolean
  monthlyDollars: number
  privacyLevel: string
  tierName: string
  createdAt: string
}
