const fs = require('fs');

const inputText = fs.readFileSync('./day20_input.txt', { encoding: 'utf-8' });

const MIN_SAVE = 100;

const directions = {
	NORTH: { y: -1, x: 0 },
	EAST: { y: 0, x: 1 },
	SOUTH: { y: 1, x: 0 },
	WEST: { y: 0, x: -1 }
};

let start;
let end;

const map = inputText.split('\n').map((line, y) => {
	return line.split('').map((tile, x) => {
		const o = {
			y: y,
			x: x,
			tile: tile,
			nbPico: 0
		};

		if (tile === 'S') {
			start = o;
		} else if (tile === 'E') {
			end = o;
		}

		return o;
	});
});

map.forEach((line) => {
	line.forEach((tile) => {
		const neighbors = [directions.NORTH, directions.EAST, directions.SOUTH, directions.WEST]
			.map((e) => ({ y: tile.y + e.y, x: tile.x + e.x }))
			.filter((e) => e.y > -1 && e.y < map.length && e.x > -1 && e.x < line.length)
			.map((e) => map[e.y][e.x]);

		tile.neighbors = neighbors;
	});
});

const path = [start];

let last;
let current = start;
while (current !== end) {
	const next = current.neighbors.find((e) => e !== last && e.tile !== '#');
	next.nbPico = current.nbPico + 1;

	path.push(next);

	last = current;
	current = next;
}

const cheats = new Set();

for (const current of path) {
	const nextAfterCheat = current.neighbors
		.filter((e) => e.tile === '#')
		.flatMap((n) => {
			return n.neighbors.filter((e) => {
				return e.nbPico >= current.nbPico + 2 + MIN_SAVE;
			});
		});

	for (const next of nextAfterCheat) {
		cheats.add(`${next.nbPico - current.nbPico - 2}|${current.x}-${current.y}|${next.x}-${next.y}`);
	}
}

console.log(cheats.size);
