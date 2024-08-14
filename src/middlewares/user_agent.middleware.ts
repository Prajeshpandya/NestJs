import {
  HttpStatus,
  Injectable,
  NestMiddleware,
  Optional,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function userAgent(req: Request, res: Response, next: NextFunction) {
  const user_a = req.headers['user-agent'];

  console.log(user_a);

  req['user_a'] = user_a;

  if (!user_a)
    return res.json({
      success: false,
    });

  next();
}

export class UserAgentOptions {
  accepted?: string[];
}

@Injectable()
export class UserAgentMiddleware implements NestMiddleware {
  constructor(@Optional() private options: UserAgentOptions) {}

  use(req: Request, res: Response, next: NextFunction) {
    const user_a = req.headers['user-agent'];

    if (!this.isUserAgentAcceptable(user_a)) {
      res.status(HttpStatus.FORBIDDEN).json({ message: 'not allowed!' });
      return;
    }

    req['user_a'] = user_a;
    next();
  }

  private isUserAgentAcceptable(userAgent: string) {
    // const acceptedAgent = ['chrome', 'firefox'];
    const acceptedAgent = this.options.accepted || [];
    console.log('acceptedAgent', acceptedAgent);

    if (!acceptedAgent.length) {
      return true;
    }

    return acceptedAgent.some((agent) =>
      userAgent.toLowerCase().includes(agent.toLowerCase()),
    );
  }
}
