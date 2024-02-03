declare const module: any;
import * as express from "express";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "./validation.pipe";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix(configService.get("API_URL"));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true,
  });
  app.use(express.static("."));

  const config = new DocumentBuilder()
    .setTitle("HMS API")
    .setBasePath(configService.get("API_URL"))
    .setDescription("The HMS API description")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "JWT-auth", // This name should be the same as the security name in the controller
    )
    .addSecurityRequirements("JWT-auth")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(5000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
