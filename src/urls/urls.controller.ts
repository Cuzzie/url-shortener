import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Redirect,
  Render,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UrlsDto } from './urls.dto'
import { UrlsService } from './urls.service'

@Controller()
export class UrlsController {
  constructor(private urlsService: UrlsService) {}

  @Get()
  @Render('index')
  index() {}

  @Get(':slug')
  @Redirect()
  async redirectUrl(@Param('slug') slug: string) {
    try {
      const { ogUrl: url } = await this.urlsService.findBySlug(slug)
      return { url }
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'URL not found!',
        },
        HttpStatus.NOT_FOUND,
      )
    }
  }

  @Post('urls')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUrl(@Body() urlsDto: UrlsDto) {
    const urls = await this.urlsService.create(urlsDto)
    const url = `https://url.cuzzie.net/${urls.slug}`
    return {
      url,
    }
  }
}
