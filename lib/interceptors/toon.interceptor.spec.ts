import { ToonInterceptor } from './toon.interceptor';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of } from 'rxjs';
import { Test } from '@nestjs/testing';

describe('ToonInterceptor', () => {
  let interceptor: ToonInterceptor;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ToonInterceptor],
    }).compile();

    interceptor = module.get<ToonInterceptor>(ToonInterceptor);
  });

  const createMockExecutionContext = (acceptHeader?: string): ExecutionContext => {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            accept: acceptHeader,
          },
        }),
        getResponse: () => ({
          setHeader: jest.fn(),
        }),
      }),
    } as any;
  };

  const createMockCallHandler = (data: any): CallHandler => {
    return {
      handle: () => of(data),
    } as any;
  };

  describe('Content Negotiation', () => {
    it('debe transformar respuesta cuando Accept header es application/toon', (done) => {
      const context = createMockExecutionContext('application/toon');
      const next = createMockCallHandler({ message: 'Hello', code: 200 });

      interceptor.intercept(context, next).subscribe({
        next: (value) => {
          expect(value).toBeDefined();
          expect(typeof value).toBe('string');
          done();
        },
      });
    });

    it('NO debe transformar cuando Accept header es application/json', (done) => {
      const testData = { message: 'Hello', code: 200 };
      const context = createMockExecutionContext('application/json');
      const next = createMockCallHandler(testData);

      interceptor.intercept(context, next).subscribe({
        next: (value) => {
          expect(value).toEqual(testData);
          expect(typeof value).toBe('object');
          done();
        },
      });
    });

    it('NO debe transformar cuando no hay Accept header', (done) => {
      const testData = { message: 'Hello' };
      const context = createMockExecutionContext(undefined);
      const next = createMockCallHandler(testData);

      interceptor.intercept(context, next).subscribe({
        next: (value) => {
          expect(value).toEqual(testData);
          done();
        },
      });
    });

    it('NO debe transformar cuando Accept header es text/html', (done) => {
      const testData = { data: 'test' };
      const context = createMockExecutionContext('text/html');
      const next = createMockCallHandler(testData);

      interceptor.intercept(context, next).subscribe({
        next: (value) => {
          expect(value).toEqual(testData);
          done();
        },
      });
    });
  });

  describe('Response Handling', () => {
    it('debe preservar datos cuando no se transforma', (done) => {
      const testData = {
        users: [{ id: 1, name: 'Alice' }],
        count: 1,
      };
      const context = createMockExecutionContext('application/json');
      const next = createMockCallHandler(testData);

      interceptor.intercept(context, next).subscribe({
        next: (value) => {
          expect(value).toEqual(testData);
          expect(value.users).toEqual(testData.users);
          expect(value.count).toBe(1);
          done();
        },
      });
    });

    it('debe manejar respuestas vacías', (done) => {
      const context = createMockExecutionContext('application/toon');
      const next = createMockCallHandler({});

      interceptor.intercept(context, next).subscribe({
        next: (value) => {
          expect(value).toBeDefined();
          done();
        },
      });
    });

    it('debe manejar arrays en respuesta', (done) => {
      const testData = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ];
      const context = createMockExecutionContext('application/toon');
      const next = createMockCallHandler(testData);

      interceptor.intercept(context, next).subscribe({
        next: (value) => {
          expect(value).toBeDefined();
          expect(typeof value).toBe('string');
          done();
        },
      });
    });
  });

  describe('Edge Cases', () => {
    it('debe manejar null en respuesta', (done) => {
      const context = createMockExecutionContext('application/json');
      const next = createMockCallHandler(null);

      interceptor.intercept(context, next).subscribe({
        next: (value) => {
          expect(value).toBeNull();
          done();
        },
      });
    });

    it('debe manejar undefined en respuesta', (done) => {
      const context = createMockExecutionContext('application/json');
      const next = createMockCallHandler(undefined);

      interceptor.intercept(context, next).subscribe({
        next: (value) => {
          expect(value).toBeUndefined();
          done();
        },
      });
    });

    it('debe manejar strings en respuesta', (done) => {
      const testString = 'Simple string response';
      const context = createMockExecutionContext('application/json');
      const next = createMockCallHandler(testString);

      interceptor.intercept(context, next).subscribe({
        next: (value) => {
          expect(value).toBe(testString);
          done();
        },
      });
    });
  });
});
