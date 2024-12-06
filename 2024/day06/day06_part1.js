const fs = require('fs');

const inputText = fs.readFileSync('./day06_example.txt', { encoding: 'utf-8' });

const map = inputText.split('\n').map(line => {
	return line.split('');
});


const blocksLines = new Map();
const blocksColumns = new Map();

let guardPos = {};

for (let i = 0; i < map.length; i++) {
	const line = map[i];
	blocksLines.set(i, []);
	// This works because the input text is a square
	blocksColumns.set(i, []);

	for (let j = 0; j < line.length; j++) {
		const character = line[j];

		if (character === '#') {
			blocksLines.get(i).push(j);
			blocksColumns.get(j).push(i);
		} else if (character === '^') {
			guardPos = {
				y: i,
				x: j
			};
		}

	}
}

const visited = new Set();

let currentDirection = [1, 0];

const nextDirection = new Map();
nextDirection.set([-1, 0], [0, 1]);
nextDirection.set([0, 1], [1, 0]);
nextDirection.set([1, 0], [0, -1]);
nextDirection.set([0, -1], [-1, 0]);

while (true) {
	let nextBlock;
	switch (currentDirection) {
		case [-1, 0]:
			nextBlock = blocksColumns.get(guardPos.x).find(blockY => {
				blockY < guardPos.y
			});
			break;
		case [0, 1]:
			nextBlock = blocksColumns.get(guardPos.y).find(blockX => {
				blockX > guardPos.x
			});
			break;
		case [1, 0]:
			nextBlock = blocksColumns.get(guardPos.x).find(blockY => {
				blockY > guardPos.y
			});
			break;
		case [0, -1]:
			nextBlock = blocksColumns.get(guardPos.y).find(blockX => {
				blockX < guardPos.x
			});
			break;
	}

	if (!nextBlock) {
		break;
	}
	
}