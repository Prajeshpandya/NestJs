import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { Userservices } from '../services/users.services';

@Injectable()
export class RecentSearchInterceptor implements NestInterceptor {
  constructor(private UserService: Userservices) {}
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    console.log(request.params);

    return next.handle().pipe(
      tap((result) => {
        console.log(result);
        if (request.params) {
          this.UserService.recentSearch(request.params, result);
        }
      }),
    );
  }
}
