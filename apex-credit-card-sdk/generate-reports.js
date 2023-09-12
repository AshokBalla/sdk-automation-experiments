import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import generateReport from 'multiple-cucumber-html-reporter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure reports directory exists
const reportsDir = path.join(__dirname, 'reports');
if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
}

// Read JSON report
const jsonReportPath = path.join(reportsDir, 'cucumber-report.json');
if (!fs.existsSync(jsonReportPath)) {
    console.error('❌ JSON report not found. Please run tests first.');
    process.exit(1);
}

let jsonReport = JSON.parse(fs.readFileSync(jsonReportPath, 'utf8'));

// Handle case where JSON report might be an object instead of array
if (!Array.isArray(jsonReport)) {
    // If it's an object, try to extract the array from it
    if (jsonReport.length && Array.isArray(jsonReport.length)) {
        jsonReport = jsonReport.length;
    } else if (Array.isArray(jsonReport)) {
        // Already an array
    } else {
        // Convert single object to array
        jsonReport = [jsonReport];
    }
}

// Generate CSV Report
function generateCSVReport(report) {
    const csvRows = [];
    csvRows.push('Feature,Scenario,Status,Duration (ms),Steps Passed,Steps Failed,Steps Skipped,Steps Undefined');

    let totalScenarios = 0;
    let passedScenarios = 0;
    let failedScenarios = 0;
    let skippedScenarios = 0;

    // Ensure report is an array
    const reportArray = Array.isArray(report) ? report : [report];

    reportArray.forEach(feature => {
        const featureName = feature.name || 'Unknown Feature';

        feature.elements?.forEach(element => {
            if (element.type === 'scenario') {
                totalScenarios++;
                const scenarioName = element.name || 'Unknown Scenario';

                let status = 'UNKNOWN';
                let duration = 0;
                let stepsPassed = 0;
                let stepsFailed = 0;
                let stepsSkipped = 0;
                let stepsUndefined = 0;

                element.steps?.forEach(step => {
                    duration += step.result?.duration || 0;

                    if (step.result) {
                        if (step.result.status === 'passed') {
                            stepsPassed++;
                        } else if (step.result.status === 'failed') {
                            stepsFailed++;
                            status = 'FAILED';
                        } else if (step.result.status === 'skipped') {
                            stepsSkipped++;
                            if (status !== 'FAILED') status = 'SKIPPED';
                        } else if (step.result.status === 'undefined') {
                            stepsUndefined++;
                            if (status !== 'FAILED' && status !== 'SKIPPED') status = 'UNDEFINED';
                        }
                    } else {
                        stepsUndefined++;
                        if (status !== 'FAILED' && status !== 'SKIPPED') status = 'UNDEFINED';
                    }
                });

                if (status === 'UNKNOWN' && stepsPassed > 0 && stepsFailed === 0) {
                    status = 'PASSED';
                }

                if (status === 'PASSED') passedScenarios++;
                else if (status === 'FAILED') failedScenarios++;
                else if (status === 'SKIPPED') skippedScenarios++;

                csvRows.push([
                    featureName,
                    scenarioName,
                    status,
                    Math.round(duration / 1000000), // Convert nanoseconds to milliseconds
                    stepsPassed,
                    stepsFailed,
                    stepsSkipped,
                    stepsUndefined
                ].join(','));
            }
        });
    });

    // Add summary row
    csvRows.push('');
    csvRows.push('SUMMARY');
    csvRows.push(`Total Scenarios,${totalScenarios}`);
    csvRows.push(`Passed,${passedScenarios}`);
    csvRows.push(`Failed,${failedScenarios}`);
    csvRows.push(`Skipped,${skippedScenarios}`);
    csvRows.push(`Pass Rate,${totalScenarios > 0 ? ((passedScenarios / totalScenarios) * 100).toFixed(2) : 0}%`);

    const csvContent = csvRows.join('\n');
    const csvPath = path.join(reportsDir, 'test-results.csv');
    fs.writeFileSync(csvPath, csvContent, 'utf8');

    console.log(`✅ CSV report generated: ${csvPath}`);
    console.log(`📊 Summary: ${passedScenarios} passed, ${failedScenarios} failed, ${skippedScenarios} skipped out of ${totalScenarios} total`);

    return { totalScenarios, passedScenarios, failedScenarios, skippedScenarios };
}

// Generate HTML Report
function generateHTMLReport() {
    // Check if JSON report file exists and is valid
    if (!fs.existsSync(jsonReportPath)) {
        console.error('❌ JSON report file not found for HTML generation');
        return;
    }

    const reportGeneration = {
        jsonDir: reportsDir,
        reportPath: path.join(reportsDir, 'html-report'),
        openReportInBrowser: false,
        saveCollectedJSON: true,
        disableLog: false,
        pageTitle: 'Credit Card SDK Test Results',
        reportName: 'Credit Card SDK Test Execution Report',
        displayDuration: true,
        displayReportTime: true,
        metadata: {
            browser: {
                name: 'puppeteer',
                version: 'latest'
            },
            device: 'Local Test Machine',
            platform: {
                name: process.platform,
                version: process.version
            }
        },
        customData: {
            title: 'Run Info',
            data: [
                { label: 'Project', value: 'Credit Card SDK' },
                { label: 'Execution Date', value: new Date().toLocaleString() }
            ]
        }
    };

    try {
        generateReport.generate(reportGeneration);
        console.log(`✅ HTML report generated: ${path.join(reportsDir, 'html-report', 'index.html')}`);
    } catch (error) {
        console.error('❌ Error generating HTML report:', error.message);
        // Don't exit, just log the error
    }
}

// Main execution
try {
    console.log('📊 Generating test reports...\n');

    const summary = generateCSVReport(jsonReport);
    generateHTMLReport();

    console.log('\n✅ All reports generated successfully!');
    console.log(`📁 Reports location: ${reportsDir}`);
    console.log(`   - CSV: ${path.join(reportsDir, 'test-results.csv')}`);
    console.log(`   - HTML: ${path.join(reportsDir, 'html-report', 'index.html')}`);

} catch (error) {
    console.error('❌ Error generating reports:', error);
    process.exit(1);
}

