const fs = require('fs');

const inputText = fs.readFileSync('./day12_input.txt', { encoding: 'utf-8' });

// Thanks 2024 day10 for your patronage
const map = inputText.split('\n').map((e, y) =>
	e.split('').map((character, x) => {
		return {
			y: y,
			x: x,
			character: character,
			frens: []
		};
	})
);

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
			.filter((e) => e.character === tile.character);

		tile.frens = nextTiles;

		if (tile.level === 0) {
			starts.push(tile);
		}
	})
);

const cache = new Set();

let totalCost = 0;
for (const line of map) {
	for (const tile of line) {
		if (cache.has(tile)) {
			continue;
		}

		let perimeter = 0;
		let area = 0;

		const tilesToCheck = [tile];
		cache.add(tile);
		while (tilesToCheck.length > 0) {
			const currentTile = tilesToCheck.pop();

			perimeter += 4 - currentTile.frens.length;
			area += 1;

			const friends = currentTile.frens.filter((e) => !cache.has(e));
			tilesToCheck.push(...friends);

			friends.forEach((e) => cache.add(e));
		}

		totalCost += perimeter * area;
	}
}

console.log(totalCost);
