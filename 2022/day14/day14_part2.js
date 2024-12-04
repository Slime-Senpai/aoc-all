const fs = require('fs');

const inputText = fs.readFileSync('./day14_input.txt', { encoding: 'utf-8' });

const paths = inputText.split('\n');

const caveMap = [];

const coords = paths.map((e) => e.split(' -> ').map((f) => f.split(',').map((g) => parseInt(g))));

coords.forEach((e) => {
	for (let i = 0; i < e.length - 1; i++) {
		const start = e[i];
		const end = e[i + 1];

		const dirX = Math.min(Math.max(-1, end[0] - start[0]), 1);
		const dirY = Math.min(Math.max(-1, end[1] - start[1]), 1);

		let curr = start;

		caveMap.push({ x: curr[0], y: curr[1] });
		while (curr[0] !== end[0] || curr[1] !== end[1]) {
			curr[0] += dirX;
			curr[1] += dirY;

			caveMap.push({ x: curr[0], y: curr[1] });
		}
	}
});

let sand = { sand: true, x: 500, y: 0 };

const maxY = caveMap.reduce((a, b) => (b.y > a ? b.y : a), caveMap[0].y);
while (true) {
	if (sand.y === maxY + 1) {
		caveMap.push(sand);
		sand = { sand: true, x: 500, y: 0 };
		continue;
	}

	if (caveMap.find((a) => a.x === sand.x && a.y === sand.y + 1) === undefined) {
		sand.y += 1;
		continue;
	}

	if (caveMap.find((a) => a.x === sand.x - 1 && a.y === sand.y + 1) === undefined) {
		sand.x -= 1;
		sand.y += 1;
		continue;
	}

	if (caveMap.find((a) => a.x === sand.x + 1 && a.y === sand.y + 1) === undefined) {
		sand.x += 1;
		sand.y += 1;
		continue;
	}

	caveMap.push(sand);

	if (sand.x === 500 && sand.y === 0) {
		break;
	}

	sand = { sand: true, x: 500, y: 0 };
}

function drawCave(caveMap) {
	const minX = caveMap.reduce((a, b) => (b.x < a ? b.x : a), caveMap[0].x);
	const maxX = caveMap.reduce((a, b) => (b.x > a ? b.x : a), caveMap[0].x);
	const minY = caveMap.reduce((a, b) => (b.y < a ? b.y : a), caveMap[0].y);
	const maxY = caveMap.reduce((a, b) => (b.y > a ? b.y : a), caveMap[0].y);
	const drawMap = Array(maxY - minY + 1)
		.fill()
		.map(() => Array(maxX - minX + 1).fill('.'));

	caveMap.forEach((e) => (drawMap[e.y - minY][e.x - minX] = e.sand ? '+' : '#'));

	console.log(drawMap.map((e) => e.join('')).join('\n'));
}

drawCave(caveMap);

console.log(caveMap.filter((a) => a.sand).length);
