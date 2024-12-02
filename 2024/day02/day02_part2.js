const fs = require('fs');

const inputText = fs.readFileSync('./day02_input.txt', { encoding: 'utf-8' });

const reports = inputText.split('\n').map(e => e.split(/\s+/).map(level => +level));

// Being smart is for smart people, I am stupid therefore I'll check EVERY COMBINATION
const allReportsPossibilities = reports.map(report => {
    const combination = [[...report]];

    for (let i = 0; i < report.length; i++) {
        combination.push([...report.slice(0, i), ...report.slice(i + 1)]);
    }

    return combination;
});

const safeReports = allReportsPossibilities.filter(reportCombination => {
    for (const report of reportCombination) {
        const isDown = report[0] > report[1];

        let lastLevel = report[0];

        let isOk = true;

        for (const level of report.slice(1)) {
            if ((isDown && level > lastLevel) || (!isDown && level < lastLevel)) {
                isOk = false;
                break;
            }

            const diff = Math.abs(level - lastLevel);

            if (diff < 1 || diff > 3) {
                isOk = false;
                break;
            }

            lastLevel = level;
        }

        if (isOk) {
            return true;
        }

    }
})

console.log(safeReports.length);