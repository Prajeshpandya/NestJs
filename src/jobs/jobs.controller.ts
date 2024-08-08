import { Controller } from '@nestjs/common';
import { jobService } from './jobs.services';

@Controller()
export class jobsController {
  constructor(private jobService: jobService) {
    console.log('jobService' + jobService);
  }
}
