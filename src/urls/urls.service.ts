import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Urls } from './urls.entity'

@Injectable()
export class UrlsService {
  constructor(
    @InjectRepository(Urls) private urlsRepository: Repository<Urls>,
  ) {}

  async findByOgUrl(ogUrl: string): Promise<Urls> {
    return this.urlsRepository.findOne({ ogUrl })
  }

  async findByNewUrl(newUrl: string): Promise<Urls> {
    return this.urlsRepository.findOne({ newUrl })
  }

  async create(ogUrl: string, newUrl?: string): Promise<Urls> {
    let urlObj: Urls
    let urlStr: string
    const og = await this.findByOgUrl(ogUrl)
    if (og) {
      return og
    }
    if (newUrl) {
      const newOne = await this.findByNewUrl(newUrl)
      if (newOne) {
        throw Error(
          'The new URL you specified already exists! Please use another URL.',
        )
      }
      urlStr = newUrl
    } else {
      urlStr = Math.random().toString(36).substr(2, 6)
    }
    urlObj = this.urlsRepository.create()
    urlObj.ogUrl = ogUrl
    urlObj.newUrl = urlStr
    this.urlsRepository.insert(urlObj)
    return urlObj
  }
}
