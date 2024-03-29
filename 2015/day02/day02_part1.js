const fs = require('fs');

const inputText = fs.readFileSync('./day02_input.txt', { encoding: 'utf-8' });

const lengths = inputText.split('\n').map((e) => e.split('x').map((f) => +f));

let sum = 0;
for (const box of lengths) {
	const [min, med] = box.sort((a, b) => a - b);
	const l = box[0];
	const w = box[1];
	const h = box[2];

	sum += 2 * l * w + 2 * w * h + 2 * h * l + min * med;
}

console.log(sum);
