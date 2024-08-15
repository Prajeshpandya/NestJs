import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ParseDatePipe } from './parse-date.pipe';
import { AppExceptionFilter } from './exception/app-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ParseDatePipe()); //when we add the pipes globlay, then not required to add the pipename or anything in controller or method, its directly apply.
  // const httpAdapterHost = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AppExceptionFilter(httpAdapterHost)); //if we not want to add the exception here so we can also pass this in the module. 

  //we can also use the env in the main.ts 
  const configService = app.get(ConfigService)
  const port = configService.get<number>("PORT")
  await app.listen(port).then(() => console.log('Server Start'));
}
bootstrap();
