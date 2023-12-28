const fs = require('fs');

const inputText = fs.readFileSync('./day08_input.txt', { encoding: 'utf-8' });

const lines = inputText.split('\n').map((e) => {
	return {
		original: e,
		evaluated: '"' + e.replaceAll('\\', '\\\\').replaceAll('"', '\\"') + '"'
	};
});

let sum = 0;

for (const { original, evaluated } of lines) {
	sum += evaluated.length - original.length;
}

console.log(sum);
