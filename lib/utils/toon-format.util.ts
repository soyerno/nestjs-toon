import { encode } from '@toon-format/toon';

/**
 * Convierte cualquier objeto a formato TOON
 * TOON (Token-Oriented Object Notation) es un formato optimizado para LLMs
 * que reduce el uso de tokens comparado con JSON
 *
 * Ejemplo:
 * Input:  { users: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }] }
 * Output: users[2]{id,name}:
 *           1,Alice
 *           2,Bob
 *
 * @param data - Datos a convertir al formato TOON
 * @param options - Opciones de encoding (delimiter, indent, lengthMarker)
 * @returns String en formato TOON
 */
export function toToonFormat(
  data: any,
  options?: {
    indent?: number;
    delimiter?: ',' | '\t' | '|';
    lengthMarker?: '#' | false;
  },
): string {
  return encode(data, options);
}
