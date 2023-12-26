const fs = require('fs');

const inputText = fs.readFileSync('./day03_input.txt', { encoding: 'utf-8' });

const directions = inputText.split('');

const visited = new Map();

let x = 0;
let y = 0;

for (const direction of directions) {
	visited.set(`${x}-${y}`, 1);

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

console.log(visited.size);
