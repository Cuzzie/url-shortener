import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmConfigService } from './config/type-orm-config.service'
import { UrlsModule } from './urls/urls.module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UrlsModule,
  ],
  controllers: [],
  providers: [TypeOrmConfigService],
})
export class AppModule {}
