import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ParseDatePipe } from './parse-date.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ParseDatePipe()); //when we add the pipes globlay, then not required to add the pipename or anything in controller or method, its directly apply.
  await app.listen(3000).then(() => console.log('Server Start'));
}
bootstrap();
