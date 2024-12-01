const fs = require('fs');

const inputText = fs.readFileSync('./day01_input.txt', { encoding: 'utf-8' });

const lists = inputText.split('\n').map(e => e.split(/\s+/)).reduce((a, b) => {
    a[0].push(b[0]);
    a[1].push(b[1]);
    return a;
}, [[], []]);

lists[0].sort();
lists[1].sort();

let similarity = 0;

const cache = new Map();

for (let i = 0; i < lists[0].length; i++) {
    while (lists[0][i] > lists[1][0]) {
        lists[1].shift();
    }

    let nbFound = 0;
    while (lists[0][i] === lists[1][0]){
        lists[1].shift();
        nbFound++;
    }

    if (cache.get(lists[0][i])) {
        nbFound = cache.get(lists[0][i]);
    } else {
        cache.set(lists[0][i], nbFound);
    }

    similarity += lists[0][i] * nbFound;
}

console.log(similarity);