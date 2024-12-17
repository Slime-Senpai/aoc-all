const fs = require('fs');

const inputText = fs.readFileSync('./day15_input.txt', { encoding: 'utf-8' });

const [mapStr, movesStr] = inputText.split('\n\n');

let robot;

const map = mapStr.split('\n').map((line, i) =>
	line.split('').flatMap((tile, j) => {
		const o1 = {
			y: i,
			x: 2 * j,
			tile: tile
		};
		const o2 = {
			y: i,
			x: 2 * j + 1,
			tile: tile
		};

		if (tile == '@') {
			robot = o1;
			o2.tile = '.';
		} else if (tile == 'O') {
			o1.tile = '[';
			o2.tile = ']';
		}
		return [o1, o2];
	})
);

if (!robot) {
	throw new Error('No roboto foundo');
}

const moves = movesStr.split('').filter((e) => e !== '\n');

for (const move of moves) {
	let direction;

	switch (move) {
		case '^':
			direction = { y: -1, x: 0 };
			break;
		case 'v':
			direction = { y: 1, x: 0 };
			break;
		case '<':
			direction = { y: 0, x: -1 };
			break;
		case '>':
			direction = { y: 0, x: 1 };
			break;
	}

	const newRobot = tryMove(robot, direction, true);

	if (newRobot) {
		robot = newRobot;
	}

	// console.log(move, map.map((e) => e.map((e) => e.tile).join('')).join('\n'));
}

// console.log(map.map((e) => e.map((e) => e.tile).join('')).join('\n'));

console.log(
	map.reduce((a, b, y) => {
		return (
			a +
			b.reduce((c, d, x) => {
				if (d.tile !== '[') {
					return c;
				}

				return c + (100 * y + x);
			}, 0)
		);
	}, 0)
);

function tryMove(thing, direction, realMove = true) {
	if (thing.tile === '#') {
		return null;
	}

	if (thing.tile === '.') {
		return thing;
	}

	// For x moves, it's the same as before
	if (thing.tile === '@' || direction.y === 0) {
		const newY = thing.y + direction.y;
		const newX = thing.x + direction.x;

		const nextTile = map[newY][newX];

		// No need to check for out of bound because the walls will prevent that
		if (tryMove(nextTile, direction, realMove)) {
			if (realMove) {
				nextTile.tile = thing.tile;
				thing.tile = '.';
			}

			return nextTile;
		}

		return null;
	}

	// Vertical move

	let nextTileLeft;
	let nextTileRight;
	let brotherTile;
	if (thing.tile === '[') {
		const newY = thing.y + direction.y;
		const newX = thing.x + direction.x;

		nextTileLeft = map[newY][newX];
		nextTileRight = map[newY][newX + 1];
		brotherTile = map[thing.y][thing.x + 1];
	} else {
		const newY = thing.y + direction.y;
		const newX = thing.x + direction.x;

		nextTileLeft = map[newY][newX - 1];
		nextTileRight = map[newY][newX];
		brotherTile = map[thing.y][thing.x - 1];
	}

	if (tryMove(nextTileLeft, direction, false) && tryMove(nextTileRight, direction, false)) {
		tryMove(nextTileLeft, direction, realMove);
		tryMove(nextTileRight, direction, realMove);

		if (realMove) {
			nextTileLeft.tile = '[';
			nextTileRight.tile = ']';
			thing.tile = '.';
			brotherTile.tile = '.';
		}

		return thing;
	} else {
		return null;
	}
}
