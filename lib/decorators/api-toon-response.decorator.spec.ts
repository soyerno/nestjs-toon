import { ApiToonResponse } from './api-toon-response.decorator';

describe('ApiToonResponse Decorator', () => {
  it('debe ser una función', () => {
    expect(typeof ApiToonResponse).toBe('function');
  });

  it('debe retornar un decorador (función)', () => {
    const decorator = ApiToonResponse('Test description');
    expect(typeof decorator).toBe('function');
  });

  it('debe aceptar description como parámetro', () => {
    expect(() => {
      ApiToonResponse('Custom description');
    }).not.toThrow();
  });

  it('debe aceptar example data como parámetro', () => {
    expect(() => {
      ApiToonResponse('Description', { test: 'data' });
    }).not.toThrow();
  });

  it('debe funcionar sin parámetros (valores por defecto)', () => {
    expect(() => {
      ApiToonResponse();
    }).not.toThrow();
  });
});
