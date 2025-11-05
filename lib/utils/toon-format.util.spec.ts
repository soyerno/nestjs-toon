import { toToonFormat } from './toon-format.util';

describe('toToonFormat', () => {
  describe('Arrays de objetos uniformes (formato tabular)', () => {
    it('debe convertir array de objetos a formato tabular TOON', () => {
      const input = {
        users: [
          { id: 1, name: 'Alice', role: 'admin' },
          { id: 2, name: 'Bob', role: 'user' },
        ],
      };

      const result = toToonFormat(input);

      expect(result).toContain('users[2]{id,name,role}:');
      expect(result).toContain('1,Alice,admin');
      expect(result).toContain('2,Bob,user');
    });

    it('debe manejar array vacío', () => {
      const input = { users: [] };
      const result = toToonFormat(input);
      expect(result).toBeDefined();
    });
  });

  describe('Objetos simples', () => {
    it('debe convertir objeto simple a formato indentado', () => {
      const input = {
        message: 'Hello',
        code: 200,
      };

      const result = toToonFormat(input);

      expect(result).toContain('message:');
      expect(result).toContain('Hello');
      expect(result).toContain('code:');
      expect(result).toContain('200');
    });

    it('debe manejar objeto con un solo campo', () => {
      const input = { status: 'ok' };
      const result = toToonFormat(input);
      expect(result).toContain('status');
      expect(result).toContain('ok');
    });
  });

  describe('Arrays primitivos', () => {
    it('debe manejar array de números', () => {
      const input = { numbers: [1, 2, 3, 4, 5] };
      const result = toToonFormat(input);
      expect(result).toBeDefined();
      expect(result).toContain('numbers');
    });

    it('debe manejar array de strings', () => {
      const input = { tags: ['typescript', 'nestjs', 'toon'] };
      const result = toToonFormat(input);
      expect(result).toBeDefined();
      expect(result).toContain('tags');
    });
  });

  describe('Valores especiales', () => {
    it('debe manejar null correctamente', () => {
      const input = { value: null };
      const result = toToonFormat(input);
      expect(result).toBeDefined();
    });

    it('debe manejar strings con caracteres especiales', () => {
      const input = { text: 'Hello, "World"!' };
      const result = toToonFormat(input);
      expect(result).toBeDefined();
    });

    it('debe manejar objetos anidados', () => {
      const input = {
        user: {
          name: 'Alice',
          profile: {
            age: 30,
            city: 'NYC',
          },
        },
      };
      const result = toToonFormat(input);
      expect(result).toBeDefined();
      expect(result).toContain('user');
    });
  });

  describe('Tipos de retorno', () => {
    it('debe retornar string', () => {
      const input = { test: 'value' };
      const result = toToonFormat(input);
      expect(typeof result).toBe('string');
    });

    it('debe retornar string no vacío para objeto válido', () => {
      const input = { a: 1 };
      const result = toToonFormat(input);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
