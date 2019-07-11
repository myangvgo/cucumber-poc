const report = require('multiple-cucumber-html-reporter');
 
report.generate({
    jsonDir: './reports/',
    reportPath: './reports/',
    metadata:{
        browser: {
            name: 'chrome',
            version: '60'
        },
        device: 'Local test machine',
        platform: {
            name: 'ubuntu',
            version: '16.04'
        }
    },
    customData: {
        title: 'Run info',
        data: [
            {label: 'Project', value: 'Custom project'},
            {label: 'Release', value: '1.0.0'},
            {label: 'Cycle', value: 'B11221.34321'}
        ]
    }
});