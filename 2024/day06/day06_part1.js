const fs = require('fs');

const inputText = fs.readFileSync('./day06_input.txt', { encoding: 'utf-8' });

const map = inputText.split('\n').map((line) => {
	return line.split('');
});

const blocksLines = new Map();
const blocksColumns = new Map();

let guardPos = {};

for (let i = 0; i < map.length; i++) {
	const line = map[i];
	blocksLines.set(i, []);

	for (let j = 0; j < line.length; j++) {
		if (!blocksColumns.has(j)) {
			blocksColumns.set(j, []);
		}

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

const DIRECTIONS = {
	NORTH: [-1, 0],
	EAST: [0, 1],
	SOUTH: [1, 0],
	WEST: [0, -1]
};

let currentDirection = DIRECTIONS.NORTH;

const nextDirection = new Map();
nextDirection.set(DIRECTIONS.NORTH, DIRECTIONS.EAST);
nextDirection.set(DIRECTIONS.EAST, DIRECTIONS.SOUTH);
nextDirection.set(DIRECTIONS.SOUTH, DIRECTIONS.WEST);
nextDirection.set(DIRECTIONS.WEST, DIRECTIONS.NORTH);

while (true) {
	let nextBlockY;
	let nextBlockX;

	switch (currentDirection) {
		case DIRECTIONS.NORTH:
			nextBlockY = blocksColumns.get(guardPos.x).findLast((blockY) => {
				return blockY < guardPos.y;
			});
			nextBlockX = guardPos.x;

			break;
		case DIRECTIONS.EAST:
			nextBlockX = blocksLines.get(guardPos.y).find((blockX) => {
				return blockX > guardPos.x;
			});
			nextBlockY = guardPos.y;
			break;
		case DIRECTIONS.SOUTH:
			nextBlockY = blocksColumns.get(guardPos.x).find((blockY) => {
				return blockY > guardPos.y;
			});
			nextBlockX = guardPos.x;
			break;
		case DIRECTIONS.WEST:
			nextBlockX = blocksLines.get(guardPos.y).findLast((blockX) => {
				return blockX < guardPos.x;
			});
			nextBlockY = guardPos.y;
			break;
	}

	let currentPos = {
		y: guardPos.y,
		x: guardPos.x
	};

	if (nextBlockY === undefined || nextBlockX === undefined) {
		while (currentPos.x >= 0 && currentPos.x < map.length && currentPos.y >= 0 && currentPos.y < map.length) {
			visited.add(currentPos.y + '-' + currentPos.x);

			currentPos = {
				y: currentPos.y + currentDirection[0],
				x: currentPos.x + currentDirection[1]
			};
		}

		break;
	}

	while (currentPos.x !== nextBlockX || currentPos.y !== nextBlockY) {
		visited.add(currentPos.y + '-' + currentPos.x);

		currentPos = {
			y: currentPos.y + currentDirection[0],
			x: currentPos.x + currentDirection[1]
		};
	}

	guardPos = {
		y: currentPos.y - currentDirection[0],
		x: currentPos.x - currentDirection[1]
	};
	currentDirection = nextDirection.get(currentDirection);
}

// drawBoard();

console.log(visited.size);

function drawBoard() {
	let drawing = '';
	for (let i = 0; i < map.length; i++) {
		let line = '';
		for (let j = 0; j < map.length; j++) {
			let char = map[i][j];
			if (visited.has(i + '-' + j)) {
				char = 'X';
			}

			line += char;
		}

		drawing += line + '\n';
	}

	console.log(drawing);
}
