const fs = require('fs');

const inputText = fs.readFileSync('./day15_input.txt', { encoding: 'utf-8' });

const [mapStr, movesStr] = inputText.split('\n\n');

let robot;

const map = mapStr.split('\n').map((line, i) =>
	line.split('').map((tile, j) => {
		const o = {
			y: i,
			x: j,
			tile: tile
		};
		if (tile == '@') {
			robot = o;
		}
		return o;
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

	const newRobot = tryMove(robot, direction);

	if (newRobot) {
		robot = newRobot;
	}

	// console.log(move, map.map((e) => e.map((e) => e.tile).join('')).join('\n'));
}

console.log(
	map.reduce((a, b, y) => {
		return (
			a +
			b.reduce((c, d, x) => {
				if (d.tile !== 'O') {
					return c;
				}

				return c + (100 * y + x);
			}, 0)
		);
	}, 0)
);

function tryMove(thing, direction) {
	if (thing.tile === '#') {
		return null;
	}

	if (thing.tile === '.') {
		return thing;
	}

	const newY = thing.y + direction.y;
	const newX = thing.x + direction.x;

	const nextTile = map[newY][newX];

	// No need to check for out of bound because the walls will prevent that
	if (tryMove(nextTile, direction)) {
		nextTile.tile = thing.tile;
		thing.tile = '.';

		return nextTile;
	}

	return null;
}
