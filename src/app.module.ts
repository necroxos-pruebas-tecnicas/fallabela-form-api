import { Module } from '@nestjs/common';
import { FromsModule } from './modules/froms/froms.module';

@Module({
  imports: [FromsModule],
})
export class AppModule {}
