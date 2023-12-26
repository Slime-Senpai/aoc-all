const fs = require('fs');

const inputText = fs.readFileSync('./day01_input.txt', { encoding: 'utf-8' });

let sum = 0;
for (const move of inputText.split('')) {
	sum += move === ')' ? -1 : 1;
}

console.log(sum);
