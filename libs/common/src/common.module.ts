import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';

@Module({
  providers: [],
  exports: [],
  imports: [LoggerModule],
})
export class CommonModule {}
