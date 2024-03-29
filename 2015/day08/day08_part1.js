const fs = require('fs');

const inputText = fs.readFileSync('./day08_input.txt', { encoding: 'utf-8' });

const lines = inputText.split('\n').map((e) => {
	return {
		original: e,
		// In most cases this is a terrible idea. Always make sure that day08_input is safe before running this
		evaluated: eval(e)
	};
});

let sum = 0;

for (const { original, evaluated } of lines) {
	sum += original.length - evaluated.length;
}

console.log(sum);
