const fs = require('fs');

const inputText = fs.readFileSync('./day06_input.txt', { encoding: 'utf-8' });

const map = inputText.split('\n').map((line) => {
	return line.split('');
});

const blocksLines = new Map();
const blocksColumns = new Map();

let guardPos = {};

const ogGuardPos = {};

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
			ogGuardPos.y = i;
			ogGuardPos.x = j;
		}
	}
}

const DIRECTIONS = {
	NORTH: [-1, 0],
	EAST: [0, 1],
	SOUTH: [1, 0],
	WEST: [0, -1]
};

const nextDirection = new Map();
nextDirection.set(DIRECTIONS.NORTH, DIRECTIONS.EAST);
nextDirection.set(DIRECTIONS.EAST, DIRECTIONS.SOUTH);
nextDirection.set(DIRECTIONS.SOUTH, DIRECTIONS.WEST);
nextDirection.set(DIRECTIONS.WEST, DIRECTIONS.NORTH);

function drawBoard(visited, col, lines) {
	let drawing = '';
	for (let i = 0; i < map.length; i++) {
		let line = '';
		for (let j = 0; j < map.length; j++) {
			let char = map[i][j];
			if (visited.has(i + '-' + j)) {
				if (col.get(j).includes(i) && lines.get(i).includes(j)) {
					char = '£';
				} else {
					char = 'X';
				}
			} else if (col.get(j).includes(i) && lines.get(i).includes(j) && char !== '#') {
				char = 'H';
			}

			line += char;
		}

		drawing += line + '\n';
	}

	return drawing;
}

function getVisited(blocksColumns, blocksLines) {
	let currentDirection = DIRECTIONS.NORTH;
	guardPos = {
		y: ogGuardPos.y,
		x: ogGuardPos.x
	};

	const visited = new Map();

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
				const key = currentPos.y + '-' + currentPos.x;
				if (visited.has(key)) {
					visited.get(key).push(currentDirection);
				} else {
					visited.set(key, [currentDirection]);
				}

				currentPos = {
					y: currentPos.y + currentDirection[0],
					x: currentPos.x + currentDirection[1]
				};
			}

			break;
		}

		while (currentPos.x !== nextBlockX || currentPos.y !== nextBlockY) {
			const key = currentPos.y + '-' + currentPos.x;
			if (visited.has(key)) {
				if (visited.get(key).includes(currentDirection)) {
					// LOOP DETECTED
					return null;
				}

				visited.get(key).push(currentDirection);
			} else {
				visited.set(key, [currentDirection]);
			}

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

	return visited;
}

// The first time, the map will be returned as there is no loop
const visitedPos = getVisited(blocksColumns, blocksLines);

// drawBoard(visitedPos, blocksColumns, blocksLines);

let nbLoops = 0;
for (const [position] of visitedPos.entries()) {
	const split = position.split('-');
	const obstructionPosition = {
		y: +split[0],
		x: +split[1]
	};

	// We remove the position where the guard is standing
	if (obstructionPosition.x === ogGuardPos.x && obstructionPosition.y === ogGuardPos.y) {
		continue;
	}

	const newBlocksColumns = new Map(blocksColumns);
	for (const [key, value] of newBlocksColumns) {
		newBlocksColumns.set(key, [...value]);
	}
	newBlocksColumns.get(obstructionPosition.x).push(obstructionPosition.y);
	newBlocksColumns.get(obstructionPosition.x).sort((a, b) => a - b);

	const newBlocksLines = new Map(blocksLines);
	for (const [key, value] of newBlocksLines) {
		newBlocksLines.set(key, [...value]);
	}
	newBlocksLines.get(obstructionPosition.y).push(obstructionPosition.x);
	newBlocksLines.get(obstructionPosition.y).sort((a, b) => a - b);

	const visited = getVisited(newBlocksColumns, newBlocksLines);

	const isLoop = !visited;

	if (isLoop) {
		nbLoops++;
	}
}

console.log(nbLoops);
