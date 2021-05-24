import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UrlsDto } from './urls.dto'
import { Urls } from './urls.entity'

@Injectable()
export class UrlsService {
  constructor(
    @InjectRepository(Urls) private urlsRepository: Repository<Urls>,
  ) {}

  async findByOgUrl(ogUrl: string): Promise<Urls> {
    return this.urlsRepository.findOne({ ogUrl })
  }

  async findBySlug(slug: string): Promise<Urls> {
    return this.urlsRepository.findOne({ slug })
  }

  async create(urlsDto: UrlsDto): Promise<Urls> {
    let newSlug: string
    const { ogUrl, slug } = urlsDto
    const og = await this.findByOgUrl(ogUrl)
    if (og) {
      return og
    }
    if (slug) {
      const newOne = await this.findBySlug(slug)
      if (newOne) {
        throw Error(
          'The new URL you specified already exists! Please use another URL.',
        )
      }
      newSlug = slug
    } else {
      newSlug = Math.random().toString(36).substr(2, 6)
    }
    const urlObj: Urls = this.urlsRepository.create()
    urlObj.ogUrl = ogUrl
    urlObj.slug = newSlug
    this.urlsRepository.insert(urlObj)
    return urlObj
  }
}
