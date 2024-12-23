const fs = require('fs');

const inputText = fs.readFileSync('./day18_input.txt', { encoding: 'utf-8' });
const length = 71;

const directions = {
	NORTH: { y: -1, x: 0 },
	EAST: { y: 0, x: 1 },
	SOUTH: { y: 1, x: 0 },
	WEST: { y: 0, x: -1 }
};

const bytes = inputText.split('\n').map((e) => {
	const split = e.split(',');

	return {
		y: +split[1],
		x: +split[0]
	};
});

const map = new Array(length).fill(0).map((_, y) =>
	new Array(length).fill(0).map((_, x) => ({
		y: y,
		x: x,
		tile: '.',
		gScore: 0
	}))
);

map.forEach((line) => {
	line.forEach((tile) => {
		const neighbors = [directions.NORTH, directions.EAST, directions.SOUTH, directions.WEST]
			.map((e) => ({ y: tile.y + e.y, x: tile.x + e.x }))
			.filter((e) => e.y > -1 && e.y < map.length && e.x > -1 && e.x < line.length)
			.map((e) => map[e.y][e.x]);

		tile.neighbors = neighbors;
	});
});

let nbFallDown = 1024;

for (let i = 0; i < nbFallDown; i++) {
	const byte = bytes[i];

	map[byte.y][byte.x].tile = '#';
}

while (true) {
	// very inefficient, we could binary search, but I'm lazy
	nbFallDown++;
	const newByteToFall = bytes[nbFallDown];
	map[newByteToFall.y][newByteToFall.x].tile = '#';

	map.forEach((e) => e.forEach((f) => (f.gScore = 0)));

	// Time for A* again
	let start = map[0][0];
	let end = map[length - 1][length - 1];

	let openSet = [{ current: start, from: [] }];
	let closedSet = [];

	let foundExit = false;
	while (openSet.length > 0) {
		const { current, from } = openSet.shift();

		if (current === end) {
			// printPath(from);

			foundExit = true;
			break;
		}

		closedSet.push(current);

		for (const neighbor of current.neighbors) {
			if (closedSet.includes(neighbor) || neighbor.tile === '#') {
				continue;
			}

			const gScore = current.gScore + 1;

			const isInOpen = openSet.some((e) => e.current === neighbor);

			if (!isInOpen || gScore < neighbor.gScore) {
				neighbor.gScore = gScore;

				openSet.push({ current: neighbor, from: [...from, current] });
				openSet.sort((a, b) => a.current.gScore - b.current.gScore);
			}
		}
	}

	if (!foundExit) {
		console.log(newByteToFall.x + ',' + newByteToFall.y);
		return;
	}
}

function printPath(path) {
	let text = map
		.map((e) => {
			return e
				.map((f) => {
					if (path.includes(f)) {
						return 'O';
					}

					return f.tile;
				})
				.join('');
		})
		.join('\n');

	console.log(text);
}
