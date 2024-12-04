const fs = require('fs');

const inputText = fs.readFileSync('./day04_input.txt', { encoding: 'utf-8' });

const lines = inputText.split('\n').map(e => e.split(''));

function isXMAS(lines, center) {
	const word = 'MAS';

	const directions = [
		{y: 1, x:1},
		{y: 1, x:-1},
		{y: -1, x:-1},
		{y: -1, x:1}
	]

	let nbMasFound = 0;

	for (const direction of directions) {

		const start = {y: center.y - direction.y, x: center.x - direction.x};

		let isCorrect = true;
		for (let i = 0; i < word.length; i++) {
			const charY = start.y + direction.y * i;
			const charX = start.x + direction.x * i;
	
			if (charY < 0 || charY >= lines.length) {
				isCorrect = false;
				break;
			}
	
			if (charX < 0 || charX >= lines[charY].length) {
				isCorrect = false;
				break;
			}
	
			const character = lines[charY][charX];
	
			if (character !== word.charAt(i)) {
				isCorrect = false;
				break;
			}
		}

		if (isCorrect) {
			nbMasFound++;

			if (nbMasFound === 2) {
				return true;
			}
		}
	}

		return false;
}


let nbXMAS = 0;
for (let i = 0; i < lines.length; i++) {
	const line = lines[i]
	for (let j = 0; j < lines.length; j++) {
		const character = line[j];

		if (character !== 'A') {
			continue;
		}

		if (isXMAS(lines, { y: i, x: j })) {
			nbXMAS++;
		}

	}
}

console.log(nbXMAS);
