const fs = require('fs');

const inputText = fs.readFileSync('./day03_input.txt', { encoding: 'utf-8' });

const directions = inputText.split('');

const visited = new Map();

let x = 0;
let y = 0;
let xR = 0;
let yR = 0;
let isRobo = false;

visited.set('0-0', 1);

for (const direction of directions) {
	const key = isRobo ? `${xR}-${yR}` : `${x}-${y}`;

	if (isRobo) {
		switch (direction) {
			case '^':
				xR--;
				break;
			case '>':
				yR++;
				break;
			case 'v':
				xR++;
				break;
			case '<':
				yR--;
				break;
		}
	} else {
		switch (direction) {
			case '^':
				x--;
				break;
			case '>':
				y++;
				break;
			case 'v':
				x++;
				break;
			case '<':
				y--;
				break;
		}
	}

	isRobo = !isRobo;

	visited.set(key, 1);
}

console.log(visited.size);
