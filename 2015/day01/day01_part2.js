const fs = require('fs');

const inputText = fs.readFileSync('./day01_input.txt', { encoding: 'utf-8' });

let sum = 0;
let pos = 0;
for (const move of inputText.split('')) {
	pos++;
	sum += move === ')' ? -1 : 1;
	if (sum === -1) {
		console.log(pos);
		break;
	}
}
