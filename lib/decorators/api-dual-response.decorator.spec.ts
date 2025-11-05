import { ApiDualResponse } from './api-dual-response.decorator';

describe('ApiDualResponse Decorator', () => {
  it('debe ser una función', () => {
    expect(typeof ApiDualResponse).toBe('function');
  });

  it('debe retornar un decorador (función)', () => {
    const decorator = ApiDualResponse({});
    expect(typeof decorator).toBe('function');
  });

  it('debe aceptar opciones básicas', () => {
    expect(() => {
      ApiDualResponse({
        description: 'Test description',
        status: 200,
      });
    }).not.toThrow();
  });

  it('debe aceptar jsonExample', () => {
    expect(() => {
      ApiDualResponse({
        jsonExample: { test: 'data' },
      });
    }).not.toThrow();
  });

  it('debe aceptar toonExample', () => {
    expect(() => {
      ApiDualResponse({
        toonExample: 'test: data',
      });
    }).not.toThrow();
  });

  it('debe aceptar flags jsonOnly y toonOnly', () => {
    expect(() => {
      ApiDualResponse({ jsonOnly: true });
      ApiDualResponse({ toonOnly: true });
    }).not.toThrow();
  });

  it('debe funcionar con opciones vacías', () => {
    expect(() => {
      ApiDualResponse({});
    }).not.toThrow();
  });
});
