import { Module } from '@nestjs/common';
import { FromsModule } from './modules/froms/froms.module';
import { HealthCheckModule } from './modules/health-check/health-check.module';

@Module({
  imports: [FromsModule, HealthCheckModule],
})
export class AppModule {}
