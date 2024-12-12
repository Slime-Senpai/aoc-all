const fs = require('fs');

const inputText = fs.readFileSync('./day11_input.txt', { encoding: 'utf-8' });

const stones = inputText.split(' ');

let current = [...stones.map((e) => +e)];

for (let i = 0; i < 25; i++) {
	current = current.flatMap((e) => {
		if (e === 0) {
			return 1;
		}

		const str = '' + e;

		if (str.length % 2 === 0) {
			return [+str.substring(0, str.length / 2), +str.substring(str.length / 2)];
		}

		return e * 2024;
	});
}
console.log(current.length);
