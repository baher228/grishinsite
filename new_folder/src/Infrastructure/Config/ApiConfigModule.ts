import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiConfigService } from './ApiConfigService';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env' })],
  providers: [ApiConfigService],
  exports: [ApiConfigService],
})
export class ApiConfigModule {}
