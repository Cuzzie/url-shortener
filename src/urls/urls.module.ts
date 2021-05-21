import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Urls } from './urls.entity'
import { UrlsService } from './urls.service'

@Module({
  imports: [TypeOrmModule.forFeature([Urls])],
  providers: [UrlsService],
})
export class UrlsModule {}
