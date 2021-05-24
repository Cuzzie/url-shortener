import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Urls } from './urls.entity'
import { UrlsService } from './urls.service'
import { UrlsController } from './urls.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Urls])],
  providers: [UrlsService],
  controllers: [UrlsController],
})
export class UrlsModule {}
