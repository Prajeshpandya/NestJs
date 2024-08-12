import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ParseDatePipe } from './parse-date.pipe';
import { AppExceptionFilter } from './exception/app-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ParseDatePipe()); //when we add the pipes globlay, then not required to add the pipename or anything in controller or method, its directly apply.
  // const httpAdapterHost = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AppExceptionFilter(httpAdapterHost)); //if we not want to add the exception here so we can also pass this in the module. 
  await app.listen(3000).then(() => console.log('Server Start'));
}
bootstrap();
