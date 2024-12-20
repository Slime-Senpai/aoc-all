const fs = require('fs');

const inputText = fs.readFileSync('./day02_input.txt', { encoding: 'utf-8' });

const reports = inputText.split('\n').map(e => e.split(/\s+/).map(level => +level));

const safeReports = reports.filter(report => {
    const isDown = report[0] > report[1];

    let lastLevel = report[0];

    for (const level of report.slice(1)) {
        if ((isDown && level > lastLevel) || (!isDown && level < lastLevel)) {
            return false;
        }

        const diff = Math.abs(level - lastLevel);

        if (diff < 1 || diff > 3) {
            return false;
        }

        lastLevel = level;
    }

    return true;
});

console.log(safeReports.length);