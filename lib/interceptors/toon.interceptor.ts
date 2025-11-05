import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { toToonFormat } from '../utils/toon-format.util';

/**
 * Interceptor que transforma la respuesta al formato TOON
 * cuando el header Accept es "application/toon"
 */
@Injectable()
export class ToonInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // Obtener el header Accept
    const acceptHeader = request.headers['accept'] || '';

    // Verificar si se solicita formato TOON
    const useToonFormat = acceptHeader.includes('application/toon');

    return next.handle().pipe(
      map((data) => {
        if (useToonFormat) {
          // Establecer Content-Type para TOON
          response.setHeader('Content-Type', 'application/toon');

          // Transformar al formato TOON
          return toToonFormat(data);
        }

        // Devolver JSON normal
        return data;
      }),
    );
  }
}
