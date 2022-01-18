interface Props {
  href?: string
  className?: string[]
  id?: string
}

interface Child {
  type?: string
  value?: string
  tag?: string
  props?: Props
  children?: Child[]
}

interface Body {
  type?: string
  children?: Child[]
}

interface Toc {
  id?: string
  depth?: number
  text?: string
}

export interface Post {
  header?: string
  slug?: string
  description?: string
  title?: string
  related?: string[]
  toc?: Toc[]
  body?: Body
  dir?: string
  path?: string
  extension?: string
  createdAt?: Date
  updatedAt?: Date
  /* Custom properties */
  tags?: string[]
  special?: boolean
  image?: string
}
