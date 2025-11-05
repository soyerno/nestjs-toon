import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ToonInterceptor } from '../lib/interceptors/toon.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ============================================
  // APLICACIÓN GLOBAL DEL INTERCEPTOR TOON
  // ============================================
  // Esto hace que TODOS los endpoints soporten el formato TOON
  // automáticamente cuando reciben el header Accept: application/toon
  app.useGlobalInterceptors(new ToonInterceptor());

  // ============================================
  // CONFIGURACIÓN DE SWAGGER
  // ============================================
  const config = new DocumentBuilder()
    .setTitle('API Tools - TOON Format Example')
    .setDescription(
      'Ejemplo de uso del interceptor TOON. ' +
        'Envía el header "Accept: application/toon" para recibir respuestas en formato TOON.',
    )
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Servidor local')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);

  console.log('🚀 Aplicación iniciada en: http://localhost:3000');
  console.log('📚 Documentación Swagger: http://localhost:3000/api/docs');
  console.log('\n💡 Prueba los endpoints con:');
  console.log('   - Accept: application/json (respuesta normal)');
  console.log('   - Accept: application/toon (respuesta TOON)\n');
}

bootstrap();
