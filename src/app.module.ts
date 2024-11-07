import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FromsModule } from './modules/froms/froms.module';

@Module({
  imports: [FromsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
