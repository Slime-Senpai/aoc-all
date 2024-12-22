const fs = require('fs');

const inputText = fs.readFileSync('./day16_input.txt', { encoding: 'utf-8' });

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
			tile: f
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
		tile.heuristic = Math.abs(tile.y - end.y) * 1001 + Math.abs(tile.x - end.x) * 1001;
	});
});

// Starts looking EAST
let currentDirection = directions.EAST;

let openSet = [{ currentDirection: currentDirection, current: start, from: [], gScore: 0 }];
let closedSet = [];

let currentBest = start.heuristic;

let visitedByBestOnly = new Set();

while (openSet.length > 0) {
	// printOpenSet();
	const { currentDirection, current, gScore, from } = openSet.shift();

	if (current === end) {
		if (currentBest > gScore) {
			currentBest = gScore;

			openSet = openSet.filter((e) => e.gScore <= currentBest);
		}
		from.forEach((e) => visitedByBestOnly.add(e));

		// console.log(gScore);

		// printPath(from);
		continue;
	}

	for (const { dir, tile } of current.neighbors) {
		if (
			(dir === directions.EAST && currentDirection === directions.WEST) ||
			(dir === directions.WEST && currentDirection === directions.EAST) ||
			(dir === directions.NORTH && currentDirection === directions.SOUTH) ||
			(dir === directions.SOUTH && currentDirection === directions.NORTH)
		) {
			continue;
		}
		if (tile.tile === '#') {
			continue;
		}

		const newGScore = gScore + 1 + (dir === currentDirection ? 0 : 1000);

		const closedTile = closedSet.find((e) => e.tile === tile && e.dir === dir);

		if (!closedTile || newGScore <= closedTile.gScore) {
			closedSet.push({ tile: tile, gScore: newGScore, dir: dir });

			if (newGScore <= currentBest) {
				openSet.push({ currentDirection: dir, current: tile, gScore: newGScore, from: [...from, current] });
				openSet.sort((a, b) => a.gScore - b.gScore);
			}
		}
	}
}

console.log(visitedByBestOnly.size + 1);

// printPath([...visitedByBestOnly.values()]);

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
						const tile = openSet.find((e) => e.current === f);
						if (tile && f.tile !== 'E' && f.tile !== 'S') {
							return ('' + tile.gScore).padStart(4, '0');
						}

						return f.tile.repeat(4);
					})
					.join('');
			})
			.join('\n');

	console.log(text);
}
