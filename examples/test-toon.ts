import { toToonFormat } from '../lib/utils/toon-format.util';

// Test básico para verificar que TOON funciona correctamente

console.log('=== Testing TOON Format ===\n');

// Test 1: Objeto simple
const test1 = {
  id: 123,
  name: 'Alice',
  active: true,
};

console.log('Test 1 - Objeto simple:');
console.log('Input:', JSON.stringify(test1));
console.log('TOON Output:');
console.log(toToonFormat(test1));
console.log('');

// Test 2: Array de objetos (sweet spot de TOON)
const test2 = {
  users: [
    { id: 1, name: 'Alice', role: 'admin' },
    { id: 2, name: 'Bob', role: 'user' },
  ],
};

console.log('Test 2 - Array de objetos uniformes:');
console.log('Input:', JSON.stringify(test2));
console.log('TOON Output:');
console.log(toToonFormat(test2));
console.log('');

// Test 3: Con tabs (más eficiente)
console.log('Test 3 - Con tabs (más eficiente en tokens):');
console.log('TOON Output:');
console.log(toToonFormat(test2, { delimiter: '\t' }));
console.log('');

// Test 4: Con length marker
console.log('Test 4 - Con length marker (#):');
console.log('TOON Output:');
console.log(toToonFormat(test2, { lengthMarker: '#' }));
console.log('');

// Test 5: Ejemplo complejo
const test5 = {
  message: 'Hello World',
  version: '1.0.0',
  features: ['toon-format', 'interceptors', 'swagger'],
};

console.log('Test 5 - Ejemplo del README:');
console.log('Input:', JSON.stringify(test5));
console.log('TOON Output:');
console.log(toToonFormat(test5));
console.log('');

console.log('=== Tests completados ===');
