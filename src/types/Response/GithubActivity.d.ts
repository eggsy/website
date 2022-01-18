export interface Repo {
  id: number
  name: string
  url: string
}

export interface Forkee {
  full_name: string
}

export interface Payload {
  ref?: string
  ref_type?: string
  size?: number
  forkee?: Forkee
  distinct_size?: number
}

export type Type =
  | "WatchEvent"
  | "PushEvent"
  | "DeleteEvent"
  | "CreateEvent"
  | "ForkEvent"
  | "IssuesEvent"
  | "PullRequestEvent"
  | "ReleaseEvent"
  | "PullRequestReviewCommentEvent"
  | "PullRequestReviewEvent"

export interface GithubActivity {
  id: string
  type: Type
  repo: Repo
  payload: Payload
  public: boolean
  created_at: string
}
