import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const slackScript = path.resolve(__dirname, '../../scripts/slack-notify.js');
let testResult = 'success';

console.log('🚀 Starting test execution with full reporting...\n');

// Ensure reports directory exists
const reportsDir = path.join(__dirname, 'reports');
if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
}

// Step 1: Run tests with coverage AND JSON output
console.log('📝 Step 1: Running Cucumber tests with coverage...');
try {
    // Run tests with c8 for coverage, and also generate JSON report
    execSync('c8 --reporter=html --reporter=text --reporter=lcov --reporter=json cucumber-js --config achsdkcucumber.js --format json:reports/cucumber-report.json', {
        cwd: __dirname,
        stdio: 'inherit'
    });
    console.log('✅ Tests completed with coverage\n');
} catch (error) {
    testResult = 'failure';
    console.error('⚠️  Tests completed (some may have failed), continuing with report generation...\n');
}

// Step 2: Generate CSV and HTML reports from JSON
console.log('📊 Step 2: Generating CSV and HTML test reports...');
try {
    execSync('node generate-reports.js', {
        cwd: __dirname,
        stdio: 'inherit'
    });
    console.log('✅ Test reports generated\n');
} catch (error) {
    console.error('❌ Error generating test reports:', error.message);
}

// Step 3: Send Slack notification
console.log('📣 Step 3: Sending Slack notification...');
try {
    execSync(`node "${slackScript}" ${testResult}`, {
        cwd: __dirname,
        stdio: 'inherit'
    });
    console.log('✅ Slack notification step finished\n');
} catch (error) {
    console.error('⚠️  Slack notification failed, continuing without blocking the run.\n');
}

// Summary
console.log('\n📋 Report Summary:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

const coverageDir = path.join(__dirname, 'coverage');

if (fs.existsSync(path.join(reportsDir, 'test-results.csv'))) {
    console.log('✅ CSV Report: reports/test-results.csv');
}
if (fs.existsSync(path.join(reportsDir, 'html-report', 'index.html'))) {
    console.log('✅ HTML Test Report: reports/html-report/index.html');
}
if (fs.existsSync(path.join(coverageDir, 'index.html'))) {
    console.log('✅ HTML Coverage Report: coverage/index.html');
}
if (fs.existsSync(path.join(coverageDir, 'lcov.info'))) {
    console.log('✅ LCOV Coverage Report: coverage/lcov.info');
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('\n✨ All reports generated successfully!');
