const fs = require('fs');

const inputText = fs.readFileSync('./day14_input.txt', { encoding: 'utf-8' });

const size = { y: 103, x: 101 };

const regex = /p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/;

const robots = inputText.split('\n').map((e) => {
	const robotMatch = e.match(regex);
	return {
		x: +robotMatch[1],
		y: +robotMatch[2],
		initX: +robotMatch[1],
		initY: +robotMatch[2],
		vx: +robotMatch[3],
		vy: +robotMatch[4]
	};
});

let nbSeconds = 0;
while (true) {
	nbSeconds++;
	robots.forEach((e) => {
		e.x = e.initX;
		e.y = e.initY;
	});

	robots.forEach((robot) => {
		robot.x += robot.vx * nbSeconds;
		if (robot.x < 0) {
			while (robot.x < 0) robot.x += size.x;
		} else {
			robot.x %= size.x;
		}
		robot.y += robot.vy * nbSeconds;
		if (robot.y < 0) {
			while (robot.y < 0) robot.y += size.y;
		} else {
			robot.y %= size.y;
		}
	});

	const map = new Array(size.y).fill(0).map((e) => new Array(size.x).fill('.'));

	robots.forEach((e) => {
		map[e.y][e.x] = map[e.y][e.x] === '.' ? 1 : map[e.y][e.x] + 1;
	});

	if (map.some((e) => e.some((a) => a !== '.' && a > 1))) {
		continue;
	}
	console.log(nbSeconds + map.map((e) => e.join('')).join('\n'));
	break;
}
