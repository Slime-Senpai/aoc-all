const fs = require('fs');

const inputText = fs.readFileSync('./day13_input.txt', { encoding: 'utf-8' });

const regex = /Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)/;

const claws = inputText.split('\n\n').map((e) => {
	const matches = e.match(regex);

	return {
		Ax: +matches[1],
		Ay: +matches[2],
		Bx: +matches[3],
		By: +matches[4],
		X: +matches[5] + 10000000000000,
		Y: +matches[6] + 10000000000000
	};
});

const tokens = claws.reduce((a, { Ax, Ay, Bx, By, X, Y }, i) => {
	const m = (Y * Ax - X * Ay) / (By * Ax - Bx * Ay);

	const n = (X - m * Bx) / Ax;

	if (Number.isInteger(m) && Number.isInteger(n) && n > 0 && m > 0) {
		a += 3 * n + m;
	}

	return a;
}, 0);

console.log(tokens);
