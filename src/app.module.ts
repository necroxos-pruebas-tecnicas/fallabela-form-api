import { Module } from '@nestjs/common';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { FormsModule } from './modules/forms/forms.module';
import { FormAnswersModule } from './modules/form-answers/form-answers.module';

@Module({
  imports: [FormsModule, HealthCheckModule, FormAnswersModule],
})
export class AppModule {}
