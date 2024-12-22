const fs = require('fs');

const inputText = fs.readFileSync('./day16_example.txt', { encoding: 'utf-8' });

const directions = {
	NORTH: { y: -1, x: 0 },
	EAST: { y: 0, x: 1 },
	SOUTH: { y: 1, x: 0 },
	WEST: { y: 0, x: -1 }
};

let start;
let end;

const map = inputText.split('\n').map((e, i) =>
	e.split('').map((f, j) => {
		const o = {
			y: i,
			x: j,
			tile: f,
			shortestFrom: null,
			gScore: 0
		};

		if (f === 'S') {
			start = o;
		} else if (f === 'E') {
			end = o;
		}

		return o;
	})
);

map.forEach((line, y) => {
	line.forEach((tile, x) => {
		const directionsToTry = [directions.NORTH, directions.EAST, directions.SOUTH, directions.WEST];
		const neighbors = directionsToTry
			.map((e) => [e, { y: tile.y + e.y, x: tile.x + e.x }])
			.filter(([, e]) => e.y > -1 && e.y < map.length && e.x > -1 && e.x < line.length)
			.map(([dir, e]) => ({ dir: dir, tile: map[e.y][e.x] }));

		tile.neighbors = neighbors;
		tile.heuristic = 0;
	});
});

// Starts looking EAST
let currentDirection = directions.EAST;

let openSet = [{ currentDirection: currentDirection, current: start }];
let closedSet = [];

while (openSet.length > 0) {
	// printOpenSet();
	const { currentDirection, current } = openSet.shift();

	if (current === end) {
		let currOnPath = current;
		const path = [];
		while (currOnPath.shortestFrom) {
			path.push(currOnPath);
			currOnPath = currOnPath.shortestFrom;
		}

		console.log(path[0].gScore);

		// printPath(path);
		return;
	}

	closedSet.push(current);

	for (const { dir, tile } of current.neighbors) {
		if (closedSet.includes(tile) || tile.tile === '#') {
			continue;
		}

		const gScore = current.gScore + 1 + (dir === currentDirection ? 0 : 1000);

		const isInOpen = openSet.findIndex((e) => e.current === tile) !== -1;

		if (!isInOpen || gScore < tile.gScore) {
			tile.shortestFrom = current;
			tile.gScore = gScore;

			if (!isInOpen) {
				openSet.push({ currentDirection: dir, current: tile });
				openSet.sort((a, b) => a.current.gScore - b.current.gScore);
			}
		}
	}
}

function printPath(path) {
	let text = map
		.map((e) => {
			return e
				.map((f) => {
					if (path.includes(f) && f.tile !== 'E') {
						return 'X';
					}

					return f.tile;
				})
				.join('');
		})
		.join('\n');

	console.log(text);
}

function printOpenSet() {
	let text =
		'-------------------\n' +
		map
			.map((e) => {
				return e
					.map((f) => {
						if (openSet.find((e) => e.current === f) && f.tile !== 'E' && f.tile !== 'S') {
							return ('' + f.gScore).padStart(4, '0');
						} else if (closedSet.includes(f) && f.tile !== 'E' && f.tile !== 'S') {
							return '£'.repeat(4);
						}

						return f.tile.repeat(4);
					})
					.join('');
			})
			.join('\n');

	console.log(text);
}
