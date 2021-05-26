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
import { Request } from 'express'
import { UrlsDto } from './urls.dto'
import { UrlsService } from './urls.service'

@Controller('urls')
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

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUrl(@Body() urlsDto: UrlsDto, @Req() request: Request) {
    const urls = await this.urlsService.create(urlsDto)
    const url = `${request.protocol}://${request.get('host')}/urls/${urls.slug}`
    return {
      url
    }
  }
}
