import { Module } from '@nestjs/common';
import { jobService } from './jobs.services';
import { jobsController } from './jobs.controller';

@Module({
  controllers: [jobsController],
  providers: [jobService],
  exports: [jobService],
})
export class jobs {}
