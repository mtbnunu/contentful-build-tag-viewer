export interface Config {
  images: Image[]
  pollingInterval: number
}
export type Image = ImageBase & (ImageWithUrl | ImageWithField)

export type ImageWithUrl = {
  url: string
}

export type ImageWithField = {
  urlField: string
}

export interface ImageBase {
  altText?: string
  condition?: Condition
  pollingInterval?: number
}

export interface Condition {
  tag?: string
  id?: string
}
