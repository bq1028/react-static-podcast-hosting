// export interface Post {
//   body: string
//   id: number
//   title: string
// }
export interface Episode {
  slug: string
  frontmatter: FMType
  body: any
}
export type FMType = {
  title: string
  mp3URL: string
  date: Date
  description: string
  episodeType?: 'full' | 'trailer' | 'bonus'
  episode?: number
  season?: number
}
