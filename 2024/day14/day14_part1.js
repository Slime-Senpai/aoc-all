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

robots.forEach((robot) => {
	robot.x += robot.vx * 100;
	if (robot.x < 0) {
		while (robot.x < 0) robot.x += size.x;
	} else {
		robot.x %= size.x;
	}
	robot.y += robot.vy * 100;
	if (robot.y < 0) {
		while (robot.y < 0) robot.y += size.y;
	} else {
		robot.y %= size.y;
	}
});

const map = new Array(size.y).fill(0).map((e) => new Array(size.x).fill('.'));

let total = {
	q1: 0,
	q2: 0,
	q3: 0,
	q4: 0
};

robots
	.filter((e) => e.x !== Math.floor(size.x / 2) && e.y !== Math.floor(size.y / 2))
	.forEach((e) => {
		map[e.y][e.x] = map[e.y][e.x] === '.' ? 1 : map[e.y][e.x] + 1;

		if (e.x < Math.floor(size.x / 2)) {
			if (e.y < Math.floor(size.y / 2)) {
				total.q1++;
			} else {
				total.q2++;
			}
		} else {
			if (e.y < Math.floor(size.y / 2)) {
				total.q4++;
			} else {
				total.q3++;
			}
		}
	});

console.log(map.map((e) => e.join('')).join('\n'));

console.log(total.q1 * total.q2 * total.q3 * total.q4);
