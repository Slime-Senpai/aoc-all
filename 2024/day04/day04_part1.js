const fs = require('fs');

const inputText = fs.readFileSync('./day04_input.txt', { encoding: 'utf-8' });

const lines = inputText.split('\n').map(e => e.split(''));

function isXMAS(lines, start, direction) {
	const word = 'XMAS';

	for (let i = 0; i < word.length; i++) {
		const charY = start.y + direction.y * i;
		const charX = start.x + direction.x * i;

		if (charY < 0 || charY >= lines.length) {
			return false;
		}

		if (charX < 0 || charX >= lines[charY].length) {
			return false;
		}

		const character = lines[charY][charX];

		if (character !== word.charAt(i)) {
			return false;
		}
	}

	return true;
}

const directions = [
	{y: 0, x:1},
	{y: 1, x:1},
	{y: 1, x:0},
	{y: 1, x:-1},
	{y: 0, x:-1},
	{y: -1, x:-1},
	{y: -1, x:0},
	{y: -1, x:1}
]


let nbXMAS = 0;
for (let i = 0; i < lines.length; i++) {
	const line = lines[i]
	for (let j = 0; j < lines.length; j++) {
		const character = line[j];

		if (character !== 'X') {
			continue;
		}

		for (const direction of directions)
		if (isXMAS(lines, { y: i, x: j }, direction)) {
			nbXMAS++;
		}

	}
}

console.log(nbXMAS);
