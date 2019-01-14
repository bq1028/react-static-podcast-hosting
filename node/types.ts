// from https://github.com/jpmonette/feed
export interface Item {
  title: string
  id?: string
  link: string
  date: Date
  description?: string
  content?: string
  guid?: string
  image?: string
  author?: Author[]
  contributor?: Author[]
  published?: Date
  copyright?: string
  extensions?: Extension[]
  itunes?: ITunesItem
  [index: string]: any
}

export interface ITunesItem {
  mp3URL: string
  enclosureLength: number
  image?: string
  duration: number
  explicit?: boolean
  keywords?: string[]
  subtitle: string
  episodeType: 'full' | 'trailer' | 'bonus'
  episode?: number
  season?: number
  contentEncoded?: string
}

export interface Author {
  name?: string
  email?: string
  link?: string
}

export interface FeedOptions {
  id: string
  title: string
  updated?: Date
  generator?: string

  feed?: string
  feedLinks?: any
  hub?: string

  author?: Author
  link?: string
  description?: string
  image?: string
  favicon?: string
  copyright: string
}

export interface Feed {
  options: FeedOptions
  items: Item[]
  categories: string[]
  contributors: Author[]
  extensions: Extension[]
}

export interface Extension {
  name: string
  objects: string
}

export type ITunesCategory = {
  cat: string
  child?: string
}
export type ITunesOwner = {
  name: string
  email: string
}
export type ITunesChannelFields = {
  summary: string
  author: string
  keywords: string[]
  categories: ITunesCategory[]
  image: string
  explicit: boolean
  owner: ITunesOwner
  subtitle?: string
  type: 'episodic' | 'serial'
}
