import { IsNotEmpty, IsUrl } from 'class-validator'

export class UrlsDto {
  @IsUrl()
  @IsNotEmpty()
  ogUrl: string

  slug: string
}
