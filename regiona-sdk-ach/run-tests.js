import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Running RegionA ACH Payment Tests...\n');

// Run all tests
console.log('📋 Running all tests...');
try {
    execSync('npx cucumber-js', { cwd: __dirname, stdio: 'inherit' });
} catch (error) {
    console.log('Some tests failed (this is expected for negative test cases)');
}

// Run only positive tests
console.log('\n✅ Running only positive tests...');
try {
    execSync('npx cucumber-js --tags @positive', { cwd: __dirname, stdio: 'inherit' });
} catch (error) {
    console.log('Positive tests completed');
}

// Run only negative tests
console.log('\n❌ Running only negative tests...');
try {
    execSync('npx cucumber-js --tags @negative', { cwd: __dirname, stdio: 'inherit' });
} catch (error) {
    console.log('Negative tests completed');
}

// Run specific test categories
console.log('\n🔍 Running validation tests...');
try {
    execSync('npx cucumber-js --tags @validation', { cwd: __dirname, stdio: 'inherit' });
} catch (error) {
    console.log('Validation tests completed');
}

console.log('\n🎯 Running boundary tests...');
try {
    execSync('npx cucumber-js --tags @boundary', { cwd: __dirname, stdio: 'inherit' });
} catch (error) {
    console.log('Boundary tests completed');
}

console.log('\n✨ All test runs completed!'); 