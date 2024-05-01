import { NestFactory } from "@nestjs/core";
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { PrismaModel } from "./gen";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ["http://localhost:5174", "http://localhost:4173"],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle("BirtyTask API")
    .setDescription("BirdyTask API description")
    .setVersion("1.0")
    .addTag("birdytask")
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_: string, methodKey: string) => methodKey,
    extraModels: [...PrismaModel.extraModels],
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
