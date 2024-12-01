const fs = require('fs');

const inputText = fs.readFileSync('./day01_input.txt', { encoding: 'utf-8' });

const lists = inputText.split('\n').map(e => e.split(/\s+/)).reduce((a, b) => {
    a[0].push(b[0]);
    a[1].push(b[1]);
    return a;
}, [[], []]);

lists[0].sort();
lists[1].sort();

let distance = 0;
for (let i = 0; i < lists[0].length; i++) {
    distance += Math.abs(lists[0][i] - lists[1][i]);
}

console.log(distance);