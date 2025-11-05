/**
 * Test para verificar que el servidor soporta ambos formatos (JSON y TOON)
 * Prueba los endpoints con diferentes headers Accept
 */

import * as http from 'http';

interface TestResult {
  endpoint: string;
  acceptHeader: string;
  statusCode: number;
  contentType: string;
  bodyPreview: string;
  passed: boolean;
}

const BASE_URL = 'http://localhost:3000';
const results: TestResult[] = [];

function makeRequest(
  path: string,
  acceptHeader: string,
): Promise<{ statusCode: number; contentType: string; body: string }> {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path,
      method: 'GET',
      headers: {
        Accept: acceptHeader,
      },
    };

    const req = http.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        resolve({
          statusCode: res.statusCode || 0,
          contentType: res.headers['content-type'] || '',
          body,
        });
      });
    });

    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

async function testEndpoint(
  endpoint: string,
  acceptHeader: string,
  expectedContentType: string,
  validateBody: (body: string) => boolean,
): Promise<void> {
  try {
    const response = await makeRequest(endpoint, acceptHeader);
    const contentTypeMatch = response.contentType.includes(expectedContentType);
    const bodyValid = validateBody(response.body);
    const passed = response.statusCode === 200 && contentTypeMatch && bodyValid;

    results.push({
      endpoint,
      acceptHeader,
      statusCode: response.statusCode,
      contentType: response.contentType,
      bodyPreview: response.body.substring(0, 100),
      passed,
    });

    const icon = passed ? '✅' : '❌';
    console.log(`${icon} ${endpoint} with Accept: ${acceptHeader}`);
    console.log(`   Status: ${response.statusCode}`);
    console.log(`   Content-Type: ${response.contentType}`);
    console.log(`   Body preview: ${response.body.substring(0, 80)}...`);
    console.log('');
  } catch (error) {
    results.push({
      endpoint,
      acceptHeader,
      statusCode: 0,
      contentType: 'error',
      bodyPreview: (error as Error).message,
      passed: false,
    });

    console.log(`❌ ${endpoint} with Accept: ${acceptHeader}`);
    console.log(`   Error: ${(error as Error).message}`);
    console.log('');
  }
}

function isValidJSON(body: string): boolean {
  try {
    JSON.parse(body);
    return true;
  } catch {
    return false;
  }
}

function isValidTOON(body: string): boolean {
  // TOON no debe tener formato JSON
  // Debe tener formato tabular o key: value
  return (
    !body.startsWith('{') &&
    !body.startsWith('[') &&
    (body.includes(':') || body.includes('\t') || body.includes(','))
  );
}

async function runTests() {
  console.log('🧪 Testing Dual Format Support (JSON + TOON)\n');
  console.log('================================================\n');

  // Test 1: Endpoint normal con JSON
  await testEndpoint('/api/normal', 'application/json', 'application/json', isValidJSON);

  // Test 2: Endpoint normal con TOON
  await testEndpoint('/api/normal', 'application/toon', 'application/toon', isValidTOON);

  // Test 3: Endpoint toon-method con JSON
  await testEndpoint('/api/toon-method', 'application/json', 'application/json', isValidJSON);

  // Test 4: Endpoint toon-method con TOON
  await testEndpoint('/api/toon-method', 'application/toon', 'application/toon', isValidTOON);

  // Test 5: Endpoint dual-format con JSON
  await testEndpoint('/api/dual-format', 'application/json', 'application/json', isValidJSON);

  // Test 6: Endpoint dual-format con TOON
  await testEndpoint('/api/dual-format', 'application/toon', 'application/toon', isValidTOON);

  // Test 7: Endpoint json-only debe devolver JSON siempre
  await testEndpoint('/api/json-only', 'application/json', 'application/json', isValidJSON);

  // Test 8: Endpoint json-only con Accept TOON (debe devolver JSON igual)
  await testEndpoint('/api/json-only', 'application/toon', 'application/json', isValidJSON);

  // Test 9: Endpoint sin Accept header (default JSON)
  await testEndpoint('/api/normal', '*/*', 'application/json', isValidJSON);

  // Test 10: Endpoint con Accept múltiple
  await testEndpoint(
    '/api/normal',
    'application/json, application/toon',
    'application/json',
    isValidJSON,
  );

  console.log('================================================\n');
  console.log('📊 Test Summary:\n');

  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;
  const total = results.length;

  console.log(`Total tests: ${total}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`Success rate: ${((passed / total) * 100).toFixed(1)}%\n`);

  if (failed > 0) {
    console.log('❌ Failed tests:\n');
    results
      .filter((r) => !r.passed)
      .forEach((r) => {
        console.log(`   ${r.endpoint} (Accept: ${r.acceptHeader})`);
        console.log(`   Reason: ${r.bodyPreview}`);
      });
    console.log('');
  }

  // Detalles adicionales
  console.log('================================================\n');
  console.log('🔍 Detailed Results:\n');

  results.forEach((r, i) => {
    console.log(`Test ${i + 1}:`);
    console.log(`   Endpoint: ${r.endpoint}`);
    console.log(`   Accept: ${r.acceptHeader}`);
    console.log(`   Status: ${r.statusCode}`);
    console.log(`   Content-Type: ${r.contentType}`);
    console.log(`   Passed: ${r.passed ? '✅' : '❌'}`);
    console.log('');
  });

  // Exit code
  process.exit(failed > 0 ? 1 : 0);
}

// Verificar que el servidor esté corriendo
console.log('🔍 Checking if server is running...\n');

makeRequest('/api/normal', 'application/json')
  .then(() => {
    console.log('✅ Server is running!\n');
    runTests();
  })
  .catch((error) => {
    console.error('❌ Server is not running!');
    console.error('Please start the server first with: npm run example');
    console.error(`Error: ${error.message}\n`);
    process.exit(1);
  });
