const fs = require('fs');

const inputText = fs.readFileSync('./day10_input.txt', { encoding: 'utf-8' });

const map = inputText.split('\n').map((e, y) =>
	e.split('').map((character, x) => {
		return {
			y: y,
			x: x,
			level: +character,
			next: []
		};
	})
);

const starts = [];

map.forEach((line, y) =>
	line.forEach((tile, x) => {
		const nextTiles = [
			{ y: y - 1, x: x },
			{ y: y, x: x + 1 },
			{ y: y + 1, x: x },
			{ y: y, x: x - 1 }
		]
			.filter((e) => e.y >= 0 && e.x >= 0 && e.y < map.length && e.x < line.length)
			.map((e) => map[e.y][e.x])
			.filter((e) => e.level === tile.level + 1);

		tile.next = nextTiles;

		if (tile.level === 0) {
			starts.push(tile);
		}
	})
);

let totalTrails = 0;
for (const start of starts) {
	const nbTrails = handleTrail(start);

	totalTrails += nbTrails;
}

console.log(totalTrails);

function handleTrail(currentTile) {
	if (currentTile.level === 9) {
		return 1;
	}

	return currentTile.next.reduce((a, b) => a + handleTrail(b), 0);
}
