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

		let nbSides = 0;
		let area = 0;

		const tilesToCheck = [tile];
		cache.add(tile);
		while (tilesToCheck.length > 0) {
			const currentTile = tilesToCheck.pop();

			if (currentTile.frens.length === 0) {
				nbSides += 4;
			}

			if (currentTile.frens.length === 1) {
				nbSides += 2;
			}

			// external corner
			if (
				currentTile.frens.length === 2 &&
				currentTile.frens[0].x !== currentTile.frens[1].x &&
				currentTile.frens[0].y !== currentTile.frens[1].y
			) {
				nbSides++;
			}

			// inner corner
			if (currentTile.frens.length > 1) {
				// If we have more than 2 friends, it can happen that the array is made in a "bad" way where it is harder to exploit it
				// To avoid the hassle of finding which order to use, we'll simply add the first one at the end to check one more corner
				// This also removes the issue of length 4 where we need to check all 4 corners
				// at the cost of doing extra useless computations (checking friend tiles uselessly)
				let friendArr = currentTile.frens.length === 2 ? currentTile.frens : [...currentTile.frens, currentTile.frens[0]];
				for (let i = 0; i < friendArr.length - 1; i++) {
					const cornerTileX = friendArr[i].x === currentTile.x ? friendArr[i + 1].x : friendArr[i].x;
					const cornerTileY = friendArr[i].y === currentTile.y ? friendArr[i + 1].y : friendArr[i].y;
					if (!(map[cornerTileY][cornerTileX].character === currentTile.character)) {
						nbSides++;
					}
				}
			}

			area += 1;

			const friends = currentTile.frens.filter((e) => !cache.has(e));
			tilesToCheck.push(...friends);

			friends.forEach((e) => cache.add(e));
		}

		totalCost += nbSides * area;
	}
}

console.log(totalCost);
