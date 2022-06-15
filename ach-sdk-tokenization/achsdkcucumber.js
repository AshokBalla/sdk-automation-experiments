const configs = {
    parallel: 2,
    import: ['features/**/*.js'],
    format: [
        'progress',
        ['json', 'reports/cucumber-report.json']
    ],
};

export default configs;
